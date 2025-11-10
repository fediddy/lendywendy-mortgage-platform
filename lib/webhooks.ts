import { logger } from "./logger";

export interface WebhookPayload {
  event: "lead.created" | "lead.updated" | "lead.qualified" | "lead.hot";
  timestamp: string;
  data: {
    leadId: string;
    email: string;
    name: string;
    phone?: string;
    segment: string;
    score: number;
    status: string;
    [key: string]: any;
  };
}

interface WebhookConfig {
  url: string;
  secret?: string;
  events: string[];
  enabled: boolean;
}

// Webhook endpoints configuration
// In production, these would come from environment variables or database
const WEBHOOK_ENDPOINTS: WebhookConfig[] = [
  // Example CRM webhooks - configure in production
  // {
  //   url: process.env.SALESFORCE_WEBHOOK_URL || "",
  //   secret: process.env.SALESFORCE_WEBHOOK_SECRET,
  //   events: ["lead.created", "lead.qualified", "lead.hot"],
  //   enabled: !!process.env.SALESFORCE_WEBHOOK_URL,
  // },
  // {
  //   url: process.env.HUBSPOT_WEBHOOK_URL || "",
  //   secret: process.env.HUBSPOT_WEBHOOK_SECRET,
  //   events: ["lead.created", "lead.hot"],
  //   enabled: !!process.env.HUBSPOT_WEBHOOK_URL,
  // },
];

/**
 * Send webhook notification to configured endpoints
 */
export async function sendWebhook(payload: WebhookPayload): Promise<void> {
  const enabledWebhooks = WEBHOOK_ENDPOINTS.filter(
    (webhook) => webhook.enabled && webhook.events.includes(payload.event)
  );

  if (enabledWebhooks.length === 0) {
    logger.info("No webhooks configured for event", {
      component: "webhooks",
      metadata: { event: payload.event },
    });
    return;
  }

  // Send to all configured webhooks (in parallel)
  await Promise.allSettled(
    enabledWebhooks.map((webhook) => sendToEndpoint(webhook, payload))
  );
}

/**
 * Send payload to a single webhook endpoint
 */
async function sendToEndpoint(
  webhook: WebhookConfig,
  payload: WebhookPayload
): Promise<void> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": "LendyWendy-Webhook/1.0",
      "X-Webhook-Event": payload.event,
    };

    // Add signature if secret is configured
    if (webhook.secret) {
      const signature = await generateSignature(
        JSON.stringify(payload),
        webhook.secret
      );
      headers["X-Webhook-Signature"] = signature;
    }

    const response = await fetch(webhook.url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(
        `Webhook failed with status ${response.status}: ${await response.text()}`
      );
    }

    logger.info("Webhook sent successfully", {
      component: "webhooks",
      metadata: {
        url: webhook.url,
        event: payload.event,
        leadId: payload.data.leadId,
      },
    });
  } catch (error) {
    logger.error("Webhook send failed", error as Error, {
      component: "webhooks",
      metadata: {
        url: webhook.url,
        event: payload.event,
        leadId: payload.data.leadId,
      },
    });
    // Don't throw - webhook failures shouldn't block lead creation
  }
}

/**
 * Generate HMAC SHA256 signature for webhook verification
 */
async function generateSignature(
  payload: string,
  secret: string
): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );

  // Convert to hex string
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Verify webhook signature (for receiving webhooks)
 */
export async function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    const expectedSignature = await generateSignature(payload, secret);
    return signature === expectedSignature;
  } catch (error) {
    logger.error("Signature verification failed", error as Error, {
      component: "webhooks",
    });
    return false;
  }
}

/**
 * Retry failed webhook with exponential backoff
 */
export async function retryWebhook(
  payload: WebhookPayload,
  maxRetries: number = 3
): Promise<void> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await sendWebhook(payload);
      return; // Success
    } catch (error) {
      if (attempt === maxRetries) {
        logger.error("Webhook retry exhausted", error as Error, {
          component: "webhooks",
          metadata: { attempts: maxRetries, event: payload.event },
        });
        throw error;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt - 1) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
