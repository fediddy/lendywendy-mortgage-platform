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
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 p-4 z-50">
      <Link
        href="/get-quote"
        className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-center py-4 rounded-xl transition-colors"
      >
        Get Investor Rates
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
