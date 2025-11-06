"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { ImageUpload } from "@/components/editor/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { CreateArticleInput } from "@/types/content";
import { generateSlug, calculateReadTime } from "@/lib/content-utils";

interface ArticleFormProps {
  initialData?: Partial<CreateArticleInput>;
  onSubmit: (data: CreateArticleInput) => Promise<void>;
  onCancel?: () => void;
}

export function ArticleForm({
  initialData,
  onSubmit,
  onCancel,
}: ArticleFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featuredImage || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!initialData?.slug);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (autoSlug) {
      setSlug(generateSlug(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlug(value);
    setAutoSlug(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const readTime = calculateReadTime(content);

      await onSubmit({
        title,
        slug,
        excerpt: excerpt || undefined,
        content,
        featuredImage: featuredImage || undefined,
        categoryId: "temp", // TODO: Add category selector
        readTime,
      });
    } catch (error) {
      console.error("Failed to submit article:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter article title"
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">URL Slug *</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="article-url-slug"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              URL: /articles/{slug || "article-url-slug"}
            </p>
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of the article (optional)"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {excerpt.length} / 160 characters (optimal for SEO)
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Featured Image</Label>
            <ImageUpload
              value={featuredImage}
              onChange={setFeaturedImage}
              onRemove={() => setFeaturedImage("")}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-2">
          <Label>Content *</Label>
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Write your article content here..."
          />
          <p className="text-xs text-muted-foreground">
            Estimated read time: {calculateReadTime(content)} min
          </p>
        </div>
      </Card>

      <div className="flex gap-4 justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Article"}
        </Button>
      </div>
    </form>
  );
}
