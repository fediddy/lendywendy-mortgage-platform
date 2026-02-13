"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { ArrowLeft, Save } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  segment: string;
}

export default function EditContentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <EditContentInner />
    </Suspense>
  );
}

function EditContentInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "article";
  const id = searchParams.get("id") || "";

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/content?type=${type}&limit=100`)
      .then((res) => res.json())
      .then((data) => {
        const item = (data.data || []).find((i: { id: string }) => i.id === id);
        if (item) {
          setTitle(item.title);
          setSlug(item.slug);
          setExcerpt(item.excerpt || "");
          setContent(item.content || "");
          setCategoryId(item.categoryId || item.category?.id || "");
          setStatus(item.status);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, type]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          id,
          title,
          slug,
          excerpt,
          content,
          categoryId,
          status,
        }),
      });

      if (res.ok) {
        router.push("/admin/content");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save");
      }
    } catch {
      alert("Failed to save content");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-500" asChild>
              <Link href="/admin/content">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Edit {type === "article" ? "Article" : "Guide"}
            </h1>
          </div>
          <div className="flex gap-3">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-36 bg-gray-100 border-gray-200 text-gray-900">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="IN_REVIEW">In Review</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold"
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label className="text-gray-700">Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 bg-gray-100 border-gray-200 text-gray-900 text-lg"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">Slug</Label>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="mt-1 bg-gray-100 border-gray-200 text-gray-900 font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <Label className="text-gray-700 mb-2 block">Content</Label>
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Start writing..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label className="text-gray-700">Category</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger className="mt-1 bg-gray-100 border-gray-200 text-gray-900">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name} ({cat.segment})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-700">Excerpt</Label>
                  <Textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief summary..."
                    className="mt-1 bg-gray-100 border-gray-200 text-gray-900"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-gray-900 font-semibold mb-3">SEO Preview</h3>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-blue-600 text-sm truncate">
                    {title || "Page Title"}
                  </p>
                  <p className="text-emerald-600 text-xs truncate">
                    lendywendy.com/{type === "article" ? "articles" : "guides"}/
                    {slug || "slug"}
                  </p>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                    {excerpt || "Page description will appear here..."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
