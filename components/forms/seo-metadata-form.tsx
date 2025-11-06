"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/editor/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateSeoMetadataInput } from "@/types/content";
import { validateSeoMetadata } from "@/lib/content-utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface SeoMetadataFormProps {
  initialData?: Partial<CreateSeoMetadataInput>;
  onChange: (data: CreateSeoMetadataInput) => void;
  defaultTitle?: string;
  defaultDescription?: string;
}

export function SeoMetadataForm({
  initialData,
  onChange,
  defaultTitle = "",
  defaultDescription = "",
}: SeoMetadataFormProps) {
  const [metaTitle, setMetaTitle] = useState(
    initialData?.metaTitle || defaultTitle
  );
  const [metaDescription, setMetaDescription] = useState(
    initialData?.metaDescription || defaultDescription
  );
  const [focusKeyword, setFocusKeyword] = useState(
    initialData?.focusKeyword || ""
  );
  const [canonicalUrl, setCanonicalUrl] = useState(
    initialData?.canonicalUrl || ""
  );
  const [ogTitle, setOgTitle] = useState(initialData?.ogTitle || "");
  const [ogDescription, setOgDescription] = useState(
    initialData?.ogDescription || ""
  );
  const [ogImage, setOgImage] = useState(initialData?.ogImage || "");
  const [twitterCard, setTwitterCard] = useState(
    initialData?.twitterCard || "summary_large_image"
  );
  const [noIndex, setNoIndex] = useState(initialData?.noIndex || false);
  const [noFollow, setNoFollow] = useState(initialData?.noFollow || false);

  const validation = validateSeoMetadata({ metaTitle, metaDescription });

  // Auto-fill OG fields from meta fields if empty
  useEffect(() => {
    if (!ogTitle && metaTitle) setOgTitle(metaTitle);
  }, [metaTitle, ogTitle]);

  useEffect(() => {
    if (!ogDescription && metaDescription) setOgDescription(metaDescription);
  }, [metaDescription, ogDescription]);

  // Notify parent of changes
  useEffect(() => {
    onChange({
      metaTitle,
      metaDescription,
      focusKeyword: focusKeyword || undefined,
      canonicalUrl: canonicalUrl || undefined,
      ogTitle: ogTitle || undefined,
      ogDescription: ogDescription || undefined,
      ogImage: ogImage || undefined,
      twitterCard: twitterCard || undefined,
      noIndex,
      noFollow,
    });
  }, [
    metaTitle,
    metaDescription,
    focusKeyword,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    noIndex,
    noFollow,
    onChange,
  ]);

  const getCharacterCountColor = (length: number, min: number, max: number) => {
    if (length < min) return "text-destructive";
    if (length > max) return "text-destructive";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      {/* Basic SEO */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Basic SEO</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="metaTitle">Meta Title *</Label>
              <span
                className={`text-xs ${getCharacterCountColor(
                  metaTitle.length,
                  30,
                  60
                )}`}
              >
                {metaTitle.length} / 60 characters
              </span>
            </div>
            <Input
              id="metaTitle"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Optimized page title for search engines"
              required
            />
            {!validation.valid && metaTitle && (
              <div className="flex items-start gap-2 mt-2 text-xs text-destructive">
                <AlertCircle className="h-3 w-3 mt-0.5" />
                <span>{validation.errors[0]}</span>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="metaDescription">Meta Description *</Label>
              <span
                className={`text-xs ${getCharacterCountColor(
                  metaDescription.length,
                  120,
                  160
                )}`}
              >
                {metaDescription.length} / 160 characters
              </span>
            </div>
            <Textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Compelling description that appears in search results"
              rows={3}
              required
            />
            {validation.valid && metaDescription && (
              <div className="flex items-center gap-2 mt-2 text-xs text-green-600">
                <CheckCircle2 className="h-3 w-3" />
                <span>Optimal length for search engines</span>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="focusKeyword">Focus Keyword</Label>
            <Input
              id="focusKeyword"
              value={focusKeyword}
              onChange={(e) => setFocusKeyword(e.target.value)}
              placeholder="Primary keyword to rank for"
            />
            <p className="text-xs text-muted-foreground mt-1">
              The main keyword you want this content to rank for
            </p>
          </div>

          <div>
            <Label htmlFor="canonicalUrl">Canonical URL</Label>
            <Input
              id="canonicalUrl"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              placeholder="https://example.com/canonical-url"
              type="url"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Prevent duplicate content issues (optional)
            </p>
          </div>
        </div>
      </Card>

      {/* Open Graph (Social Sharing) */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Social Media Preview (Open Graph)
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="ogTitle">OG Title</Label>
            <Input
              id="ogTitle"
              value={ogTitle}
              onChange={(e) => setOgTitle(e.target.value)}
              placeholder={metaTitle || "Title for social media"}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Defaults to meta title if empty
            </p>
          </div>

          <div>
            <Label htmlFor="ogDescription">OG Description</Label>
            <Textarea
              id="ogDescription"
              value={ogDescription}
              onChange={(e) => setOgDescription(e.target.value)}
              placeholder={metaDescription || "Description for social media"}
              rows={2}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Defaults to meta description if empty
            </p>
          </div>

          <div>
            <Label>OG Image</Label>
            <ImageUpload
              value={ogImage}
              onChange={setOgImage}
              onRemove={() => setOgImage("")}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Recommended: 1200x630px for optimal display on social media
            </p>
          </div>

          <div>
            <Label htmlFor="twitterCard">Twitter Card Type</Label>
            <Select value={twitterCard} onValueChange={setTwitterCard}>
              <SelectTrigger id="twitterCard">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Summary</SelectItem>
                <SelectItem value="summary_large_image">
                  Summary with Large Image
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Advanced Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">No Index</p>
              <p className="text-xs text-muted-foreground">
                Prevent search engines from indexing this page
              </p>
            </div>
            <Badge
              variant={noIndex ? "destructive" : "outline"}
              className="cursor-pointer"
              onClick={() => setNoIndex(!noIndex)}
            >
              {noIndex ? "Enabled" : "Disabled"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">No Follow</p>
              <p className="text-xs text-muted-foreground">
                Tell search engines not to follow links on this page
              </p>
            </div>
            <Badge
              variant={noFollow ? "destructive" : "outline"}
              className="cursor-pointer"
              onClick={() => setNoFollow(!noFollow)}
            >
              {noFollow ? "Enabled" : "Disabled"}
            </Badge>
          </div>
        </div>
      </Card>

      {/* SEO Preview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Search Preview</h3>
        <div className="border rounded-lg p-4 bg-background">
          <div className="text-sm text-primary mb-1">
            {canonicalUrl || "https://lendywendy.com/..."}
          </div>
          <div className="text-xl text-blue-600 mb-1 line-clamp-1">
            {metaTitle || "Your page title will appear here"}
          </div>
          <div className="text-sm text-muted-foreground line-clamp-2">
            {metaDescription || "Your meta description will appear here"}
          </div>
        </div>
      </Card>
    </div>
  );
}
