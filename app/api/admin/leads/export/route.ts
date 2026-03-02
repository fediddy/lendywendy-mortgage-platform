import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { LeadStatus, LeadSource } from "@prisma/client";

const MAX_EXPORT = 10000;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Same filter logic as the main leads GET
    const status = searchParams.get("status") as LeadStatus | null;
    const segment = searchParams.get("segment");
    const source = searchParams.get("source") as LeadSource | null;
    const tier = searchParams.get("tier");
    const search = searchParams.get("search");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    const where: any = {};

    if (status) where.status = status;
    if (segment) where.segment = segment;
    if (source) where.leadSource = source;

    if (tier === "hot") {
      where.score = { gte: 80 };
    } else if (tier === "warm") {
      where.score = { gte: 60, lt: 80 };
    } else if (tier === "cold") {
      where.score = { lt: 60 };
    }

    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt.gte = new Date(dateFrom);
      if (dateTo) where.createdAt.lte = new Date(dateTo + "T23:59:59.999Z");
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      take: MAX_EXPORT,
      orderBy: { createdAt: "desc" },
      select: {
        name: true,
        email: true,
        phone: true,
        leadSource: true,
        segment: true,
        loanType: true,
        score: true,
        status: true,
        propertyLocation: true,
        createdAt: true,
        assignedAgent: {
          select: { name: true },
        },
      },
    });

    // Build CSV
    const headers = ["Name", "Email", "Phone", "Source", "Segment", "Loan Type", "Score", "Status", "Location", "Date", "Agent"];

    const escapeCSV = (value: string) => {
      if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    const rows = leads.map((lead) => [
      escapeCSV(lead.name || ""),
      escapeCSV(lead.email || ""),
      escapeCSV(lead.phone || ""),
      lead.leadSource,
      lead.segment,
      lead.loanType.replace(/_/g, " "),
      lead.score.toString(),
      lead.status,
      escapeCSV(lead.propertyLocation || ""),
      new Date(lead.createdAt).toISOString().split("T")[0],
      escapeCSV(lead.assignedAgent?.name || ""),
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    logger.info("CSV export", {
      component: "admin-leads-export",
      metadata: { count: leads.length },
    });

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="leads-export-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    logger.error("Failed to export leads", error as Error, {
      component: "admin-leads-export",
    });

    return NextResponse.json(
      { success: false, error: "Failed to export leads" },
      { status: 500 }
    );
  }
}
