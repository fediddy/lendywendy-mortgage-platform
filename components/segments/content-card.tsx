import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ContentCardProps {
  title: string;
  excerpt?: string;
  slug: string;
  url: string;
  type: "article" | "guide" | "calculator";
  publishedAt?: Date;
  readTime?: number;
  viewCount?: number;
  featuredImage?: string;
  category?: {
    name: string;
    slug: string;
  };
}

const typeLabels = {
  article: "Article",
  guide: "Guide",
  calculator: "Calculator",
};

const typeColors = {
  article: "bg-teal-50 text-teal-600 border-teal-600/30",
  guide: "bg-emerald-50 text-emerald-600 border-emerald-600/30",
  calculator: "bg-purple-50 text-purple-600 border-purple-600/30",
};

export function ContentCard({
  title,
  excerpt,
  slug,
  url,
  type,
  publishedAt,
  readTime,
  viewCount,
  featuredImage,
  category,
}: ContentCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <Link href={url} className="block">
        {featuredImage && (
          <div className="aspect-video overflow-hidden bg-muted">
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={typeColors[type]} variant="outline">
              {typeLabels[type]}
            </Badge>
            {category && (
              <Badge variant="outline">{category.name}</Badge>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {excerpt && (
              <p className="text-muted-foreground line-clamp-3 text-sm">
                {excerpt}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {publishedAt && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(publishedAt, { addSuffix: true })}
                </span>
              </div>
            )}

            {readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{readTime} min read</span>
              </div>
            )}

            {viewCount !== undefined && viewCount > 0 && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{viewCount.toLocaleString()} views</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
}
