import { Segment } from "@prisma/client";
import { getSegmentName } from "@/lib/url-utils";
import { Home, TrendingUp, Building2 } from "lucide-react";

interface SegmentHubHeroProps {
  segment: Segment;
  title?: string;
  description?: string;
}

const segmentIcons = {
  RESIDENTIAL: Home,
  INVESTMENT: TrendingUp,
  COMMERCIAL: Building2,
};

const defaultDescriptions: Record<Segment, string> = {
  RESIDENTIAL: "Everything you need to know about residential mortgages, from first-time homebuyer programs to refinancing your dream home.",
  INVESTMENT: "Maximize your real estate investment returns with expert guidance on investment property financing, cash flow analysis, and portfolio strategies.",
  COMMERCIAL: "Navigate commercial real estate financing with confidence. Get insights on loans, terms, and strategies for business properties.",
};

export function SegmentHubHero({
  segment,
  title,
  description,
}: SegmentHubHeroProps) {
  const Icon = segmentIcons[segment];
  const displayTitle = title || getSegmentName(segment);
  const displayDescription = description || defaultDescriptions[segment];

  return (
    <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Icon className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {displayTitle}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {displayDescription}
          </p>
        </div>
      </div>
    </div>
  );
}
