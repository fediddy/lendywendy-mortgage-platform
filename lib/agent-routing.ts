/**
 * Agent Routing Algorithm
 *
 * Matches qualified leads with the best available local agent based on:
 * 1. Location match (state) — required
 * 2. Loan type match — required
 * 3. Capacity available (weekly cap not exceeded) — required
 * 4. Round-robin within qualified agents (lowest currentWeekLeads first)
 */

import { Lead, Agent } from "@prisma/client";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";

/**
 * Find the best available agent for a lead.
 * Returns null if no suitable agent is found.
 */
export async function findBestAgent(lead: Lead): Promise<Agent | null> {
  // Only route qualified leads (score >= 60)
  if (lead.score < 60) {
    return null;
  }

  // Parse location to extract state
  const locationParts = lead.propertyLocation?.split(",") || [];
  const state = locationParts[locationParts.length - 1]?.trim().toUpperCase() || "CA";

  // Fetch active agents matching state and loan type
  // Prisma can't compare field-to-field, so we fetch and filter in JS
  const candidates = await prisma.agent.findMany({
    where: {
      status: "ACTIVE",
      states: { has: state },
      loanTypes: { has: lead.loanType },
    },
    orderBy: [
      { currentWeekLeads: "asc" },
      { rating: "desc" },
    ],
  });

  // Filter for capacity (currentWeekLeads < weeklyCapacity)
  const available = candidates.filter(
    (agent) => agent.currentWeekLeads < agent.weeklyCapacity
  );

  if (available.length === 0) {
    logger.info("No matching agent found", {
      component: "agent-routing",
      metadata: { leadId: lead.id, state, loanType: lead.loanType },
    });
    return null;
  }

  return available[0];
}

/**
 * Assign a lead to the best available agent.
 * Sets assignedAgentId, assignedAt, and increments agent's weekly count.
 */
export async function assignLeadToAgent(lead: Lead): Promise<Agent | null> {
  const agent = await findBestAgent(lead);

  if (!agent) return null;

  // Assign lead and increment agent's weekly count in parallel
  await Promise.all([
    prisma.lead.update({
      where: { id: lead.id },
      data: {
        assignedAgentId: agent.id,
        assignedAt: new Date(),
      },
    }),
    prisma.agent.update({
      where: { id: agent.id },
      data: {
        currentWeekLeads: { increment: 1 },
      },
    }),
  ]);

  logger.info("Lead assigned to agent", {
    component: "agent-routing",
    metadata: {
      leadId: lead.id,
      agentId: agent.id,
      agentName: agent.name,
    },
  });

  return agent;
}
