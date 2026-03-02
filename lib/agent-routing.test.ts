import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFindMany = vi.fn();
const mockLeadUpdate = vi.fn();
const mockAgentUpdate = vi.fn();

vi.mock("@/lib/db", () => ({
  prisma: {
    agent: {
      findMany: (...args: any[]) => mockFindMany(...args),
      update: (...args: any[]) => mockAgentUpdate(...args),
    },
    lead: {
      update: (...args: any[]) => mockLeadUpdate(...args),
    },
  },
}));

vi.mock("@/lib/logger", () => ({
  logger: { info: vi.fn(), error: vi.fn() },
}));

import { findBestAgent, assignLeadToAgent } from "./agent-routing";

beforeEach(() => {
  vi.clearAllMocks();
});

const mockLead = {
  id: "lead-1",
  score: 85,
  loanType: "PURCHASE",
  propertyLocation: "Los Angeles, CA",
} as any;

const mockAgent = {
  id: "agent-1",
  name: "Test Agent",
  email: "agent@test.com",
  status: "ACTIVE",
  currentWeekLeads: 5,
  weeklyCapacity: 20,
};

describe("findBestAgent", () => {
  it("returns null for leads with score < 60", async () => {
    const result = await findBestAgent({ ...mockLead, score: 50 });
    expect(result).toBeNull();
    expect(mockFindMany).not.toHaveBeenCalled();
  });

  it("finds matching agent by state and loan type", async () => {
    mockFindMany.mockResolvedValue([mockAgent]);

    const result = await findBestAgent(mockLead);

    expect(result).toEqual(mockAgent);
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          status: "ACTIVE",
          states: { has: "CA" },
          loanTypes: { has: "PURCHASE" },
        }),
      })
    );
  });

  it("filters out agents at capacity", async () => {
    mockFindMany.mockResolvedValue([
      { ...mockAgent, currentWeekLeads: 20, weeklyCapacity: 20 },
    ]);

    const result = await findBestAgent(mockLead);
    expect(result).toBeNull();
  });

  it("returns null when no matching agents found", async () => {
    mockFindMany.mockResolvedValue([]);

    const result = await findBestAgent(mockLead);
    expect(result).toBeNull();
  });
});

describe("assignLeadToAgent", () => {
  it("assigns lead and increments agent weekly count", async () => {
    mockFindMany.mockResolvedValue([mockAgent]);
    mockLeadUpdate.mockResolvedValue({});
    mockAgentUpdate.mockResolvedValue({});

    const result = await assignLeadToAgent(mockLead);

    expect(result).toEqual(mockAgent);
    expect(mockLeadUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "lead-1" },
        data: expect.objectContaining({
          assignedAgentId: "agent-1",
          assignedAt: expect.any(Date),
        }),
      })
    );
    expect(mockAgentUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "agent-1" },
        data: { currentWeekLeads: { increment: 1 } },
      })
    );
  });
});
