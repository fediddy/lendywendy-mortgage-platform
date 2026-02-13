"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  FileText,
  BookOpen,
  Eye,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  status: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  category: { name: string; slug: string; segment?: string };
  author: { name: string | null; email: string };
}

const statusColors: Record<string, string> = {
  DRAFT: "bg-gray-200 text-gray-700",
  IN_REVIEW: "bg-amber-50 text-amber-700",
  SCHEDULED: "bg-blue-50 text-blue-700",
  PUBLISHED: "bg-emerald-50 text-emerald-700",
  ARCHIVED: "bg-gray-100 text-gray-600",
};

export default function ContentAdminPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [type, setType] = useState("article");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ type });
    if (status) params.set("status", status);
    const res = await fetch(`/api/admin/content?${params}`);
    if (res.ok) {
      const json = await res.json();
      setItems(json.data || []);
      setTotal(json.total || 0);
    }
    setLoading(false);
  }, [type, status]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const res = await fetch(`/api/admin/content?type=${type}&id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) fetchContent();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id, status: newStatus }),
    });
    if (res.ok) fetchContent();
  };

  const filtered = items.filter(
    (item) =>
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Manager</h1>
            <p className="text-gray-500 mt-1">
              {total} {type === "article" ? "articles" : "guides"} total
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-200 text-gray-700" asChild>
              <Link href="/admin/leads">Leads</Link>
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold" asChild>
              <Link href={`/admin/content/new?type=${type}`}>
                <Plus className="mr-2 h-4 w-4" />
                New {type === "article" ? "Article" : "Guide"}
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-gray-50 border-gray-200 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex gap-2">
                <Button
                  variant={type === "article" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setType("article")}
                  className={
                    type === "article"
                      ? "bg-teal-600 text-white"
                      : "border-gray-200 text-gray-700"
                  }
                >
                  <FileText className="mr-1.5 h-4 w-4" />
                  Articles
                </Button>
                <Button
                  variant={type === "guide" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setType("guide")}
                  className={
                    type === "guide"
                      ? "bg-teal-600 text-white"
                      : "border-gray-200 text-gray-700"
                  }
                >
                  <BookOpen className="mr-1.5 h-4 w-4" />
                  Guides
                </Button>
              </div>

              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-40 bg-gray-100 border-gray-200 text-gray-900">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="IN_REVIEW">In Review</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by title or slug..."
                  className="pl-9 bg-gray-100 border-gray-200 text-gray-900"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Table */}
        <Card className="bg-white border-gray-200">
          <CardContent className="p-0">
            {loading ? (
              <div className="p-12 text-center text-gray-500">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500 mb-4">
                  No {type === "article" ? "articles" : "guides"} found.
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white" asChild>
                  <Link href={`/admin/content/new?type=${type}`}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create your first {type}
                  </Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 hover:bg-transparent">
                    <TableHead className="text-gray-500">Title</TableHead>
                    <TableHead className="text-gray-500">Category</TableHead>
                    <TableHead className="text-gray-500">Status</TableHead>
                    <TableHead className="text-gray-500 text-right">Views</TableHead>
                    <TableHead className="text-gray-500">Updated</TableHead>
                    <TableHead className="text-gray-500 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((item) => (
                    <TableRow key={item.id} className="border-gray-200">
                      <TableCell>
                        <div>
                          <p className="text-gray-900 font-medium">{item.title}</p>
                          <p className="text-gray-500 text-xs">/{item.slug}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-200 text-gray-700">
                          {item.category.name}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={item.status}
                          onValueChange={(v) => handleStatusChange(item.id, v)}
                        >
                          <SelectTrigger
                            className={`w-32 text-xs border-0 ${statusColors[item.status] || ""}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                            <SelectItem value="IN_REVIEW">In Review</SelectItem>
                            <SelectItem value="PUBLISHED">Published</SelectItem>
                            <SelectItem value="ARCHIVED">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right text-gray-500">
                        {item.viewCount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900" asChild>
                            <Link href={`/admin/content/edit?type=${type}&id=${item.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-600"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
