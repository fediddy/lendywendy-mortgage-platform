import Link from "next/link";
import { Segment } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Home, TrendingUp, Building2, ArrowRight } from "lucide-react";
import { getSegmentUrl, getSegmentName } from "@/lib/url-utils";

const segmentData = [
  {
    segment: Segment.RESIDENTIAL,
    icon: Home,
    description: "First-time buyers, refinancing, and home equity solutions",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    segment: Segment.INVESTMENT,
    icon: TrendingUp,
    description: "Rental properties, REITs, and portfolio financing strategies",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    segment: Segment.COMMERCIAL,
    icon: Building2,
    description: "Office buildings, retail spaces, and commercial loans",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

interface SegmentNavigationProps {
  currentSegment?: Segment;
  title?: string;
  subtitle?: string;
}

export function SegmentNavigation({
  currentSegment,
  title = "Explore All Mortgage Types",
  subtitle = "Find the financing solution that fits your needs",
}: SegmentNavigationProps) {
  const filteredSegments = currentSegment
    ? segmentData.filter((s) => s.segment !== currentSegment)
    : segmentData;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredSegments.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.segment}
                href={getSegmentUrl(item.segment)}
                className="block group"
              >
                <Card className="p-8 h-full hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className="space-y-4">
                    <div className={`w-16 h-16 rounded-2xl ${item.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-8 w-8 ${item.color}`} />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {getSegmentName(item.segment)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <span>Learn more</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
