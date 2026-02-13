"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function MobileCTA() {
  const pathname = usePathname();

  // Don't show on pages that already have forms
  const hideOnPaths = ["/get-quote", "/readiness-score", "/login", "/admin"];
  const shouldHide = hideOnPaths.some((path) => pathname.startsWith(path));

  if (shouldHide) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 z-50">
      <Link
        href="/get-quote"
        className="flex items-center justify-center gap-2 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-center py-4 rounded-xl transition-colors"
      >
        Compare Rates
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
