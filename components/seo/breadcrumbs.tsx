import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { generateBreadcrumbJsonLd, JsonLd } from "./meta-tags";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://lendywendy.com";

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const allItems = [{ name: "Home", url: "/" }, ...items];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={generateBreadcrumbJsonLd(allItems, BASE_URL)} />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}
      >
        <ol className="flex items-center gap-2">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li key={item.url} className="flex items-center gap-2">
                {index === 0 ? (
                  <Link
                    href={item.url}
                    className="flex items-center hover:text-foreground transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                ) : isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                )}

                {!isLast && <ChevronRight className="h-4 w-4" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
