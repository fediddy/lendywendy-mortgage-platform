"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LeadStatus, LeadSource } from "@prisma/client";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  segment: string;
  score: number;
  status: LeadStatus;
  loanType: string;
  leadSource: LeadSource;
  timeline: string | null;
  propertyValue: number | null;
  createdAt: string;
  assignedAgentId: string | null;
  notes: string | null;
}

interface LeadDetail extends Lead {
  tcpaConsent: boolean;
  consentTimestamp: string | null;
  propertyLocation: string | null;
  creditRange: string | null;
  conversation: {
    id: string;
    messages: { id: string; role: "USER" | "ASSISTANT" | "SYSTEM"; content: string; createdAt: string }[];
  } | null;
  readinessAssessment: {
    id: string;
    responses: string;
    totalScore: number;
    creditScore: number;
    employmentScore: number;
    incomeScore: number;
    debtScore: number;
    downPaymentScore: number;
    preApprovalScore: number;
    noNegativeEventsScore: number;
    category: string;
  } | null;
  assignedAgent: { id: string; name: string; email: string } | null;
}

interface LeadsResponse {
  success: boolean;
  data: {
    leads: Lead[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    stats: {
      total: number;
      byStatus: Record<string, number>;
      byTier: {
        hot: number;
        warm: number;
        cold: number;
      };
    };
  };
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<LeadDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [agents, setAgents] = useState<{ id: string; name: string; email: string }[]>([]);

  // Filters
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [segmentFilter, setSegmentFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [minScore, setMinScore] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  // Sorting
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Pagination and stats
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [stats, setStats] = useState({
    total: 0,
    byStatus: {} as Record<string, number>,
    byTier: { hot: 0, warm: 0, cold: 0 },
  });

  // Form data for updating leads
  const [updateForm, setUpdateForm] = useState({
    status: "",
    notes: "",
    assignedTo: "",
  });

  // Fetch leads
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        sortBy,
        sortOrder,
      });

      if (statusFilter !== "all") params.append("status", statusFilter);
      if (segmentFilter !== "all") params.append("segment", segmentFilter);
      if (sourceFilter !== "all") params.append("source", sourceFilter);
      if (tierFilter !== "all") params.append("tier", tierFilter);
      if (searchQuery) params.append("search", searchQuery);
      if (minScore) params.append("minScore", minScore);
      if (dateFrom) params.append("dateFrom", dateFrom);
      if (dateTo) params.append("dateTo", dateTo);

      const response = await fetch(`/api/admin/leads?${params.toString()}`);
      const data: LeadsResponse = await response.json();

      if (data.success) {
        setLeads(data.data.leads);
        setPagination(data.data.pagination);
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, statusFilter, segmentFilter, sourceFilter, tierFilter, searchQuery, minScore, dateFrom, dateTo, sortBy, sortOrder]);

  // Fetch active agents for assignment dropdown
  useEffect(() => {
    fetch("/api/admin/agents")
      .then((res) => res.json())
      .then((data) => { if (data.success) setAgents(data.data); })
      .catch(() => {});
  }, []);

  // Toggle sorting on column click
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  // Sort indicator
  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) return <span className="text-muted-foreground/30 ml-1">↕</span>;
    return <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>;
  };

  // Open lead detail dialog — fetch full details
  const openLeadDetail = async (lead: Lead) => {
    setIsDialogOpen(true);
    setLoadingDetail(true);
    setSelectedLead(null);

    try {
      const response = await fetch(`/api/admin/leads/${lead.id}`);
      const data = await response.json();

      if (data.success) {
        const detail: LeadDetail = data.data;
        setSelectedLead(detail);
        setUpdateForm({
          status: detail.status,
          notes: detail.notes || "",
          assignedTo: detail.assignedAgentId || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch lead detail:", error);
    } finally {
      setLoadingDetail(false);
    }
  };

  // Update lead
  const updateLead = async () => {
    if (!selectedLead) return;

    setUpdating(true);
    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: selectedLead.id,
          status: updateForm.status,
          notes: updateForm.notes,
          assignedAgentId: updateForm.assignedTo || null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsDialogOpen(false);
        fetchLeads(); // Refresh list
      }
    } catch (error) {
      console.error("Failed to update lead:", error);
    } finally {
      setUpdating(false);
    }
  };

  // Get tier badge
  const getTierBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-red-500">Hot</Badge>;
    if (score >= 60) return <Badge className="bg-orange-500">Warm</Badge>;
    return <Badge variant="secondary">Cold</Badge>;
  };

  // Get status badge
  const getStatusBadge = (status: LeadStatus) => {
    const statusColors: Record<LeadStatus, string> = {
      NEW: "bg-blue-500",
      CONTACTED: "bg-yellow-500",
      QUALIFIED: "bg-green-500",
      QUOTE_SENT: "bg-purple-500",
      IN_PROCESS: "bg-indigo-500",
      CONVERTED: "bg-emerald-500",
      CLOSED_LOST: "bg-gray-500",
      NURTURE: "bg-orange-400",
    };

    return <Badge className={statusColors[status]}>{status}</Badge>;
  };

  // Get source badge
  const getSourceBadge = (source: LeadSource) => {
    const sourceConfig: Record<LeadSource, { color: string; label: string }> = {
      AI_ADVISOR: { color: "bg-purple-500", label: "AI Advisor" },
      READINESS_SCORE: { color: "bg-blue-500", label: "Readiness Score" },
      FORM: { color: "bg-gray-500", label: "Form" },
      CALCULATOR: { color: "bg-teal-500", label: "Calculator" },
    };
    const config = sourceConfig[source] || { color: "bg-gray-500", label: source };
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  // Format currency
  const formatCurrency = (value: number | null) => {
    if (!value) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Lead Management</h1>
        <p className="text-muted-foreground">View and manage all your mortgage leads</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Hot Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{stats.byTier.hot}</div>
            <p className="text-xs text-muted-foreground mt-1">Score &ge; 80</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Warm Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">{stats.byTier.warm}</div>
            <p className="text-xs text-muted-foreground mt-1">Score 60-79</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Cold Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-500">{stats.byTier.cold}</div>
            <p className="text-xs text-muted-foreground mt-1">Score &lt; 60</p>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div key={status} className="flex items-center gap-2">
                {getStatusBadge(status as LeadStatus)}
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Search</Label>
              <Input
                placeholder="Name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <Label>Source</Label>
              <Select value={sourceFilter} onValueChange={(v) => { setSourceFilter(v); setPage(1); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="AI_ADVISOR">AI Advisor</SelectItem>
                  <SelectItem value="READINESS_SCORE">Readiness Score</SelectItem>
                  <SelectItem value="FORM">Form</SelectItem>
                  <SelectItem value="CALCULATOR">Calculator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Score Tier</Label>
              <Select value={tierFilter} onValueChange={(v) => { setTierFilter(v); setPage(1); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="hot">Hot (80+)</SelectItem>
                  <SelectItem value="warm">Warm (60-79)</SelectItem>
                  <SelectItem value="cold">Cold (&lt;60)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="NEW">New</SelectItem>
                  <SelectItem value="CONTACTED">Contacted</SelectItem>
                  <SelectItem value="QUALIFIED">Qualified</SelectItem>
                  <SelectItem value="QUOTE_SENT">Quote Sent</SelectItem>
                  <SelectItem value="IN_PROCESS">In Process</SelectItem>
                  <SelectItem value="CONVERTED">Converted</SelectItem>
                  <SelectItem value="CLOSED_LOST">Closed Lost</SelectItem>
                  <SelectItem value="NURTURE">Nurture</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div>
              <Label>Segment</Label>
              <Select value={segmentFilter} onValueChange={(v) => { setSegmentFilter(v); setPage(1); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  <SelectItem value="RESIDENTIAL">Residential</SelectItem>
                  <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                  <SelectItem value="INVESTMENT">Investment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>From Date</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
              />
            </div>

            <div>
              <Label>To Date</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
              />
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setStatusFilter("all");
                  setSegmentFilter("all");
                  setSourceFilter("all");
                  setTierFilter("all");
                  setSearchQuery("");
                  setMinScore("");
                  setDateFrom("");
                  setDateTo("");
                  setSortBy("createdAt");
                  setSortOrder("desc");
                  setPage(1);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Leads ({pagination.total})</CardTitle>
            <CardDescription>Click on a lead to view details and update status</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const params = new URLSearchParams();
              if (statusFilter !== "all") params.append("status", statusFilter);
              if (segmentFilter !== "all") params.append("segment", segmentFilter);
              if (sourceFilter !== "all") params.append("source", sourceFilter);
              if (tierFilter !== "all") params.append("tier", tierFilter);
              if (searchQuery) params.append("search", searchQuery);
              if (dateFrom) params.append("dateFrom", dateFrom);
              if (dateTo) params.append("dateTo", dateTo);
              window.open(`/api/admin/leads/export?${params.toString()}`, "_blank");
            }}
          >
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No leads found</div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="cursor-pointer select-none" onClick={() => handleSort("name")}>
                        Name<SortIcon field="name" />
                      </TableHead>
                      <TableHead className="cursor-pointer select-none" onClick={() => handleSort("email")}>
                        Email<SortIcon field="email" />
                      </TableHead>
                      <TableHead className="cursor-pointer select-none" onClick={() => handleSort("leadSource")}>
                        Source<SortIcon field="leadSource" />
                      </TableHead>
                      <TableHead className="cursor-pointer select-none" onClick={() => handleSort("score")}>
                        Score<SortIcon field="score" />
                      </TableHead>
                      <TableHead className="cursor-pointer select-none" onClick={() => handleSort("status")}>
                        Status<SortIcon field="status" />
                      </TableHead>
                      <TableHead className="cursor-pointer select-none" onClick={() => handleSort("createdAt")}>
                        Date<SortIcon field="createdAt" />
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openLeadDetail(lead)}>
                        <TableCell className="font-medium">
                          {lead.name}
                          {lead.phone && <div className="text-xs text-muted-foreground">{lead.phone}</div>}
                        </TableCell>
                        <TableCell className="text-sm">{lead.email}</TableCell>
                        <TableCell>{getSourceBadge(lead.leadSource)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{lead.score}</span>
                            {getTierBadge(lead.score)}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(lead.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); openLeadDetail(lead); }}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-muted-foreground">
                  Showing {(page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(page * pagination.limit, pagination.total)} of {pagination.total} leads
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      Page {page} of {pagination.totalPages}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === pagination.totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Lead Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>View and update lead information</DialogDescription>
          </DialogHeader>

          {loadingDetail && (
            <div className="text-center py-8">Loading lead details...</div>
          )}

          {selectedLead && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Name</Label>
                  <div className="font-medium">{selectedLead.name}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <div className="font-medium">{selectedLead.email}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <div className="font-medium">{selectedLead.phone || "N/A"}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Source</Label>
                  <div>{getSourceBadge(selectedLead.leadSource)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Score</Label>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{selectedLead.score}</span>
                    {getTierBadge(selectedLead.score)}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Segment / Loan Type</Label>
                  <div className="font-medium">{selectedLead.segment} — {selectedLead.loanType.replace(/_/g, " ")}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Property Value</Label>
                  <div className="font-medium">{formatCurrency(selectedLead.propertyValue)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Location</Label>
                  <div className="font-medium">{selectedLead.propertyLocation || "N/A"}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Timeline</Label>
                  <div className="font-medium">{selectedLead.timeline?.replace(/_/g, " ") || "N/A"}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Created</Label>
                  <div className="font-medium">{formatDate(selectedLead.createdAt)}</div>
                </div>
              </div>

              {/* TCPA Consent */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">TCPA Consent</h3>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant={selectedLead.tcpaConsent ? "default" : "destructive"}>
                    {selectedLead.tcpaConsent ? "Consented" : "No Consent"}
                  </Badge>
                  {selectedLead.consentTimestamp && (
                    <span className="text-muted-foreground">
                      {formatDate(selectedLead.consentTimestamp)}
                    </span>
                  )}
                </div>
              </div>

              {/* Assessment Score Breakdown */}
              {selectedLead.readinessAssessment && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Readiness Score Breakdown</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Credit Score", value: selectedLead.readinessAssessment.creditScore, max: 25 },
                      { label: "Employment", value: selectedLead.readinessAssessment.employmentScore, max: 15 },
                      { label: "Income", value: selectedLead.readinessAssessment.incomeScore, max: 15 },
                      { label: "Debt", value: selectedLead.readinessAssessment.debtScore, max: 15 },
                      { label: "Down Payment", value: selectedLead.readinessAssessment.downPaymentScore, max: 15 },
                      { label: "Pre-Approval", value: selectedLead.readinessAssessment.preApprovalScore, max: 10 },
                      { label: "No Negatives", value: selectedLead.readinessAssessment.noNegativeEventsScore, max: 5 },
                    ].map((dim) => (
                      <div key={dim.label} className="flex items-center gap-3">
                        <span className="text-sm w-28 text-muted-foreground">{dim.label}</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary rounded-full h-2"
                            style={{ width: `${(dim.value / dim.max) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{dim.value}/{dim.max}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-3 pt-1 border-t">
                      <span className="text-sm w-28 font-semibold">Total</span>
                      <div className="flex-1" />
                      <span className="text-sm font-bold w-12 text-right">{selectedLead.readinessAssessment.totalScore}/100</span>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Conversation Transcript */}
              {selectedLead.conversation && selectedLead.conversation.messages.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">AI Conversation ({selectedLead.conversation.messages.length} messages)</h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto bg-muted/30 rounded-lg p-4">
                    {selectedLead.conversation.messages
                      .filter((m) => m.role !== "SYSTEM")
                      .map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.role === "USER" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                              msg.role === "USER"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                            <p className="text-xs opacity-60 mt-1">
                              {new Date(msg.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Update Form */}
              <div className="border-t pt-4 space-y-4">
                <h3 className="font-semibold">Update Lead</h3>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={updateForm.status}
                    onValueChange={(value) => setUpdateForm({ ...updateForm, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW">New</SelectItem>
                      <SelectItem value="CONTACTED">Contacted</SelectItem>
                      <SelectItem value="QUALIFIED">Qualified</SelectItem>
                      <SelectItem value="QUOTE_SENT">Quote Sent</SelectItem>
                      <SelectItem value="IN_PROCESS">In Process</SelectItem>
                      <SelectItem value="CONVERTED">Converted</SelectItem>
                      <SelectItem value="CLOSED_LOST">Closed Lost</SelectItem>
                      <SelectItem value="NURTURE">Nurture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="assignedTo">Assigned Agent</Label>
                  <Select
                    value={updateForm.assignedTo || "none"}
                    onValueChange={(value) => setUpdateForm({ ...updateForm, assignedTo: value === "none" ? "" : value })}
                  >
                    <SelectTrigger id="assignedTo">
                      <SelectValue placeholder="Select agent..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Unassigned</SelectItem>
                      {agents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.name} ({agent.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add notes about this lead..."
                    rows={4}
                    value={updateForm.notes}
                    onChange={(e) => setUpdateForm({ ...updateForm, notes: e.target.value })}
                  />
                </div>

                <Button onClick={updateLead} disabled={updating} className="w-full">
                  {updating ? "Updating..." : "Update Lead"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
