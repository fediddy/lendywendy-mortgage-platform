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
import { LeadStatus } from "@prisma/client";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  segment: string;
  score: number;
  status: LeadStatus;
  loanType: string;
  timeline: string | null;
  propertyValue: number | null;
  createdAt: string;
  assignedTo: string | null;
  notes: string | null;
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
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Filters
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [segmentFilter, setSegmentFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [minScore, setMinScore] = useState<string>("");

  // Pagination and stats
  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0, totalPages: 0 });
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
        limit: "50",
      });

      if (statusFilter !== "all") params.append("status", statusFilter);
      if (segmentFilter !== "all") params.append("segment", segmentFilter);
      if (searchQuery) params.append("search", searchQuery);
      if (minScore) params.append("minScore", minScore);

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
  }, [page, statusFilter, segmentFilter, searchQuery, minScore]);

  // Open lead detail dialog
  const openLeadDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setUpdateForm({
      status: lead.status,
      notes: lead.notes || "",
      assignedTo: lead.assignedTo || "",
    });
    setIsDialogOpen(true);
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
          assignedTo: updateForm.assignedTo,
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label>Search</Label>
              <Input
                placeholder="Name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
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
                  <SelectItem value="LOST">Lost</SelectItem>
                  <SelectItem value="NURTURE">Nurture</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Segment</Label>
              <Select value={segmentFilter} onValueChange={setSegmentFilter}>
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
              <Label>Min Score</Label>
              <Input
                type="number"
                placeholder="0-100"
                value={minScore}
                onChange={(e) => setMinScore(e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setStatusFilter("all");
                  setSegmentFilter("all");
                  setSearchQuery("");
                  setMinScore("");
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
        <CardHeader>
          <CardTitle>Leads ({pagination.total})</CardTitle>
          <CardDescription>Click on a lead to view details and update status</CardDescription>
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
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Segment</TableHead>
                      <TableHead>Loan Type</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Property Value</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{lead.email}</div>
                            {lead.phone && <div className="text-muted-foreground">{lead.phone}</div>}
                          </div>
                        </TableCell>
                        <TableCell>{lead.segment}</TableCell>
                        <TableCell className="text-sm">{lead.loanType.replace(/_/g, " ")}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{lead.score}</span>
                            {getTierBadge(lead.score)}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                        <TableCell>{formatCurrency(lead.propertyValue)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(lead.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => openLeadDetail(lead)}>
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>View and update lead information</DialogDescription>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-6">
              {/* Lead Info */}
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
                  <Label className="text-muted-foreground">Score</Label>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{selectedLead.score}</span>
                    {getTierBadge(selectedLead.score)}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Segment</Label>
                  <div className="font-medium">{selectedLead.segment}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Loan Type</Label>
                  <div className="font-medium">{selectedLead.loanType.replace(/_/g, " ")}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Property Value</Label>
                  <div className="font-medium">{formatCurrency(selectedLead.propertyValue)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Timeline</Label>
                  <div className="font-medium">
                    {selectedLead.timeline?.replace(/_/g, " ") || "N/A"}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Created</Label>
                  <div className="font-medium">{formatDate(selectedLead.createdAt)}</div>
                </div>
              </div>

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
                      <SelectItem value="LOST">Lost</SelectItem>
                      <SelectItem value="NURTURE">Nurture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input
                    id="assignedTo"
                    placeholder="Agent name or email"
                    value={updateForm.assignedTo}
                    onChange={(e) => setUpdateForm({ ...updateForm, assignedTo: e.target.value })}
                  />
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
