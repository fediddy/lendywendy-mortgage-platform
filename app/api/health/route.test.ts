import { describe, it, expect, vi, beforeEach } from "vitest";

const mockQueryRaw = vi.fn();

vi.mock("@/lib/db", () => ({
  prisma: {
    $queryRaw: (...args: any[]) => mockQueryRaw(...args),
  },
}));

import { GET } from "./route";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/health", () => {
  it("returns healthy when database is reachable", async () => {
    mockQueryRaw.mockResolvedValue([{ "?column?": 1 }]);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe("healthy");
    expect(body.checks.app).toBe("ok");
    expect(body.checks.database).toBe("ok");
    expect(body.timestamp).toBeDefined();
  });

  it("returns degraded when database is unreachable", async () => {
    mockQueryRaw.mockRejectedValue(new Error("Connection refused"));

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.status).toBe("degraded");
    expect(body.checks.app).toBe("ok");
    expect(body.checks.database).toBe("error");
  });
});
