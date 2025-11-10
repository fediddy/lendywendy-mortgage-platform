import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { LeadStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    // Filters
    const status = searchParams.get("status") as LeadStatus | null;
    const segment = searchParams.get("segment");
    const minScore = searchParams.get("minScore");
    const search = searchParams.get("search");

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (segment) {
      where.segment = segment;
    }

    if (minScore) {
      where.score = { gte: parseInt(minScore) };
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
        { phone: { contains: search } },
      ];
    }

    // Fetch leads with pagination
    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.lead.count({ where }),
    ]);

    // Calculate stats
    const stats = await prisma.lead.groupBy({
      by: ["status"],
      _count: { id: true },
    });

    const statusCounts = Object.fromEntries(
      stats.map((s) => [s.status, s._count.id])
    );

    // Score distribution
    const scoreStats = await prisma.lead.groupBy({
      by: ["score"],
      _count: { id: true },
    });

    const hotLeads = scoreStats
      .filter((s) => s.score >= 80)
      .reduce((sum, s) => sum + s._count.id, 0);

    const warmLeads = scoreStats
      .filter((s) => s.score >= 60 && s.score < 80)
      .reduce((sum, s) => sum + s._count.id, 0);

    const coldLeads = scoreStats
      .filter((s) => s.score < 60)
      .reduce((sum, s) => sum + s._count.id, 0);

    logger.info("Leads fetched", {
      component: "admin-leads-api",
      metadata: { page, limit, total },
    });

    return NextResponse.json({
      success: true,
      data: {
        leads,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        stats: {
          total,
          byStatus: statusCounts,
          byTier: {
            hot: hotLeads,
            warm: warmLeads,
            cold: coldLeads,
          },
        },
      },
    });
  } catch (error) {
    logger.error("Failed to fetch leads", error as Error, {
      component: "admin-leads-api",
    });

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch leads",
      },
      { status: 500 }
    );
  }
}

// Update lead status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, status, notes, assignedTo } = body;

    if (!leadId) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;

    // Update timestamps based on status
    if (status === "CONTACTED") {
      updateData.contactedAt = new Date();
    } else if (status === "CONVERTED") {
      updateData.convertedAt = new Date();
    }

    const lead = await prisma.lead.update({
      where: { id: leadId },
      data: updateData,
    });

    logger.info("Lead updated", {
      component: "admin-leads-api",
      metadata: { leadId, status },
    });

    return NextResponse.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    logger.error("Failed to update lead", error as Error, {
      component: "admin-leads-api",
    });

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update lead",
      },
      { status: 500 }
    );
  }
}
