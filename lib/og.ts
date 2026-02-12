const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://lendywendy.com";

export function getOgImageUrl(title: string, subtitle: string, badge?: string): string {
  const params = new URLSearchParams({ title, subtitle });
  if (badge) params.set("badge", badge);
  return `${BASE_URL}/api/og?${params.toString()}`;
}
