# Webhook Integration Guide

This document explains how to integrate LendyWendy's lead management system with external CRMs and services using webhooks.

## Overview

LendyWendy automatically sends webhook notifications when important lead events occur. These webhooks allow you to integrate with:
- CRM systems (Salesforce, HubSpot, Pipedrive, etc.)
- Marketing automation tools
- Notification services (Slack, Email, SMS)
- Custom internal systems

## Webhook Events

### `lead.created`
Triggered when a new lead submits the lead capture form.

**Payload:**
```json
{
  "event": "lead.created",
  "timestamp": "2025-01-10T12:34:56.789Z",
  "data": {
    "leadId": "clr123abc456",
    "email": "john@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "segment": "RESIDENTIAL",
    "score": 75,
    "status": "NEW",
    "tier": "warm",
    "qualification": "medium",
    "loanType": "PURCHASE",
    "timeline": "ONE_TO_THREE_MONTHS"
  }
}
```

### `lead.hot`
Triggered when a lead scores >= 80 points (highly qualified).

**Payload:**
```json
{
  "event": "lead.hot",
  "timestamp": "2025-01-10T12:34:56.789Z",
  "data": {
    "leadId": "clr123abc456",
    "email": "john@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "segment": "RESIDENTIAL",
    "score": 87,
    "status": "NEW",
    "tier": "hot",
    "qualification": "high",
    "recommendations": [
      "Fast-track pre-approval process",
      "Prioritize lender with quick closing times"
    ],
    "breakdown": {
      "creditScore": 25,
      "downPayment": 18,
      "timeline": 13,
      "employment": 10,
      "income": 9,
      "completeness": 8,
      "segment": 3,
      "loanType": 5
    }
  }
}
```

### `lead.qualified`
Triggered when a lead's status changes to QUALIFIED.

### `lead.updated`
Triggered when a lead's information is updated.

## Configuration

### Environment Variables

Add these to your `.env` file:

```env
# Salesforce Webhook
SALESFORCE_WEBHOOK_URL=https://your-instance.salesforce.com/services/apexrest/lead-webhook
SALESFORCE_WEBHOOK_SECRET=your-secret-key

# HubSpot Webhook
HUBSPOT_WEBHOOK_URL=https://api.hubspot.com/webhooks/v3/your-id
HUBSPOT_WEBHOOK_SECRET=your-secret-key

# Slack Notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Custom CRM
CUSTOM_CRM_WEBHOOK_URL=https://your-crm.com/api/webhooks/leads
CUSTOM_CRM_WEBHOOK_SECRET=your-secret-key
```

### Webhook Configuration

Edit `lib/webhooks.ts` to configure which events each endpoint receives:

```typescript
const WEBHOOK_ENDPOINTS: WebhookConfig[] = [
  {
    url: process.env.SALESFORCE_WEBHOOK_URL || "",
    secret: process.env.SALESFORCE_WEBHOOK_SECRET,
    events: ["lead.created", "lead.qualified", "lead.hot"],
    enabled: !!process.env.SALESFORCE_WEBHOOK_URL,
  },
  {
    url: process.env.HUBSPOT_WEBHOOK_URL || "",
    secret: process.env.HUBSPOT_WEBHOOK_SECRET,
    events: ["lead.created", "lead.hot"],
    enabled: !!process.env.HUBSPOT_WEBHOOK_URL,
  },
];
```

## Security

### Webhook Signatures

All webhooks include an HMAC SHA-256 signature in the `X-Webhook-Signature` header for verification.

**Verifying Signatures:**

```javascript
// Node.js example
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return signature === expectedSignature;
}

// Usage
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const payload = JSON.stringify(req.body);

  if (!verifySignature(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }

  // Process webhook...
  res.status(200).send('OK');
});
```

### Best Practices

1. **Always verify signatures** - Prevents unauthorized webhook calls
2. **Respond quickly** - Return 200 OK within 10 seconds
3. **Process asynchronously** - Queue long-running tasks
4. **Implement idempotency** - Handle duplicate webhooks gracefully
5. **Log everything** - Keep audit trail of all webhooks

## CRM-Specific Integration Examples

### Salesforce

```javascript
// Salesforce Apex REST endpoint
@RestResource(urlMapping='/lead-webhook')
global class LeadWebhookHandler {
    @HttpPost
    global static void handleLead() {
        RestRequest req = RestContext.request;
        String payload = req.requestBody.toString();

        // Verify signature
        String signature = req.headers.get('X-Webhook-Signature');
        if (!verifySignature(payload, signature)) {
            RestContext.response.statusCode = 401;
            return;
        }

        // Parse webhook
        Map<String, Object> webhook = (Map<String, Object>) JSON.deserializeUntyped(payload);
        Map<String, Object> data = (Map<String, Object>) webhook.get('data');

        // Create Lead in Salesforce
        Lead newLead = new Lead(
            FirstName = getFirstName((String) data.get('name')),
            LastName = getLastName((String) data.get('name')),
            Email = (String) data.get('email'),
            Phone = (String) data.get('phone'),
            Company = 'Unknown',
            LeadSource = 'Website',
            Description = 'Score: ' + data.get('score') + ', Tier: ' + data.get('tier')
        );

        insert newLead;

        RestContext.response.statusCode = 200;
    }
}
```

### HubSpot

```javascript
// HubSpot webhook handler
const hubspot = require('@hubspot/api-client');

async function handleHubSpotWebhook(webhookData) {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN
  });

  const { data } = webhookData;

  // Create contact in HubSpot
  const contactObj = {
    properties: {
      email: data.email,
      firstname: data.name.split(' ')[0],
      lastname: data.name.split(' ').slice(1).join(' '),
      phone: data.phone,
      lead_score: data.score,
      lead_tier: data.tier,
      loan_segment: data.segment,
      loan_type: data.loanType,
    }
  };

  await hubspotClient.crm.contacts.basicApi.create(contactObj);
}
```

### Slack Notifications

```javascript
// Send Slack notification for hot leads
async function sendSlackNotification(webhookData) {
  if (webhookData.event !== 'lead.hot') return;

  const { data } = webhookData;

  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: '🔥 Hot Lead Alert!',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🔥 Hot Lead Detected'
          }
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*Name:*\n${data.name}` },
            { type: 'mrkdwn', text: `*Score:*\n${data.score}/100` },
            { type: 'mrkdwn', text: `*Email:*\n${data.email}` },
            { type: 'mrkdwn', text: `*Phone:*\n${data.phone || 'N/A'}` },
            { type: 'mrkdwn', text: `*Segment:*\n${data.segment}` },
            { type: 'mrkdwn', text: `*Timeline:*\n${data.timeline || 'Unknown'}` }
          ]
        }
      ]
    })
  });
}
```

## Testing Webhooks

### Local Testing with ngrok

1. Install ngrok: `npm install -g ngrok`
2. Start your local server: `npm run dev`
3. Create tunnel: `ngrok http 3000`
4. Use ngrok URL as webhook endpoint
5. Submit test lead through the form

### Webhook Testing Tools

- [Webhook.site](https://webhook.site) - Inspect webhook payloads
- [RequestBin](https://requestbin.com) - Capture and debug webhooks
- Postman - Test webhook endpoints

## Monitoring

### Webhook Logs

All webhook attempts are logged with:
- Event type
- Target URL
- Success/failure status
- Response time
- Error details (if any)

View logs in the application logs under the `webhooks` component.

### Retry Logic

Failed webhooks are automatically retried with exponential backoff:
- Attempt 1: Immediate
- Attempt 2: 1 second delay
- Attempt 3: 2 seconds delay
- Attempt 4: 4 seconds delay

After 3 retries, the webhook is marked as failed and logged for manual review.

## Troubleshooting

### Common Issues

**Webhook not received:**
- Check firewall rules
- Verify URL is publicly accessible
- Check webhook configuration in `.env`
- Review application logs

**Invalid signature errors:**
- Verify webhook secret matches
- Ensure payload hasn't been modified
- Check signature verification implementation

**Timeout errors:**
- Endpoint must respond within 10 seconds
- Move long-running tasks to async queue
- Return 200 OK immediately

## Support

For webhook integration support:
- Email: integrations@lendywendy.com
- Documentation: https://docs.lendywendy.com/webhooks
- API Reference: https://api.lendywendy.com/docs
