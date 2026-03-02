type GAEvent =
  | { event: "chat_started"; pageUrl: string }
  | { event: "chat_lead_captured"; sessionId: string }
  | { event: "assessment_started" }
  | { event: "assessment_completed"; score: number; category: string }
  | { event: "assessment_lead_captured"; score: number }
  | { event: "assessment_shared"; score: number; platform: string }
  | { event: "lead_submitted"; source: string };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(data: GAEvent): void {
  if (typeof window === "undefined" || !window.gtag) return;

  const { event, ...params } = data;
  window.gtag("event", event, params);
}
