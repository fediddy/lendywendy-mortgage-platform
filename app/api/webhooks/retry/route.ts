import { NextRequest, NextResponse } from "next/server";
import { retryFailedSubmissions } from "@/lib/integrations/maxbounty";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  // Verify cron secret
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const result = await retryFailedSubmissions(100);

    logger.info("Webhook retry completed", {
      component: "webhook-retry",
      metadata: result,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    logger.error("Webhook retry failed", error as Error, {
      component: "webhook-retry",
    });

    return NextResponse.json(
      { success: false, error: "Retry failed" },
      { status: 500 }
    );
  }
}
