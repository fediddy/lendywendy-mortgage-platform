"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileCTA() {
  const pathname = usePathname();

  // Don't show on pages that already have forms
  const hideOnPaths = ["/get-quote", "/readiness-score", "/login", "/admin"];
  const shouldHide = hideOnPaths.some((path) => pathname.startsWith(path));

  if (shouldHide) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-50">
      <Link
        href="/get-quote"
        className="block w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold text-center py-4 rounded-xl transition-colors"
      >
        Get My Free Rate
      </Link>
    </div>
  );
}
