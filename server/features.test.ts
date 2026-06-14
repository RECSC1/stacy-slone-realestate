import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock DB + notifications so tests run without a live database.
vi.mock("./db", async () => {
  const actual = await vi.importActual<typeof import("./db")>("./db");
  return {
    ...actual,
    createLead: vi.fn(async () => ({ insertId: 1 })),
    listLeads: vi.fn(async () => [
      {
        id: 1,
        formName: "contact",
        name: "Test Person",
        email: "test@example.com",
        phone: "9199721180",
        propertyAddress: null,
        message: "Hello",
        details: null,
        status: "new" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
    updateLeadStatus: vi.fn(async () => ({})),
    logChatMessage: vi.fn(async () => {}),
  };
});

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async () => true),
}));

function publicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

function adminCtx(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "owner",
      email: "owner@example.com",
      name: "Owner",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

function userCtx(): TrpcContext {
  const c = adminCtx();
  c.user!.role = "user";
  return c;
}

describe("lead capture", () => {
  beforeEach(() => vi.clearAllMocks());

  it("accepts a valid home valuation submission", async () => {
    const caller = appRouter.createCaller(publicCtx());
    const result = await caller.leads.homeValuation({
      name: "Jane Buyer",
      email: "jane@example.com",
      phone: "9199721180",
      propertyAddress: "123 Main St, Raleigh NC",
      timeline: "3 months",
    });
    expect(result).toEqual({ success: true });
    const { notifyOwner } = await import("./_core/notification");
    expect(notifyOwner).toHaveBeenCalledOnce();
  });

  it("rejects an invalid email on the contact form", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(
      caller.leads.contact({
        name: "No Email",
        email: "not-an-email",
        message: "Hi there",
      }),
    ).rejects.toThrow();
  });

  it("still succeeds when owner notification fails", async () => {
    const { notifyOwner } = await import("./_core/notification");
    (notifyOwner as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("upstream down"),
    );
    const caller = appRouter.createCaller(publicCtx());
    const result = await caller.leads.contact({
      name: "Resilient",
      email: "ok@example.com",
      message: "Should still save",
    });
    expect(result).toEqual({ success: true });
  });
});

describe("admin access control", () => {
  it("blocks anonymous users from reading leads", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(caller.admin.leads()).rejects.toThrow();
  });

  it("blocks non-admin authenticated users from reading leads", async () => {
    const caller = appRouter.createCaller(userCtx());
    await expect(caller.admin.leads()).rejects.toThrow();
  });

  it("allows an admin to read leads", async () => {
    const caller = appRouter.createCaller(adminCtx());
    const leads = await caller.admin.leads();
    expect(Array.isArray(leads)).toBe(true);
    expect(leads[0]?.email).toBe("test@example.com");
  });

  it("blocks non-admins from the AI listing writer", async () => {
    const caller = appRouter.createCaller(userCtx());
    await expect(
      caller.ai.writeListing({ features: "nice home", tone: "warm" }),
    ).rejects.toThrow();
  });
});

describe("AI input validation", () => {
  it("rejects an empty school search query", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(caller.ai.schoolSearch({ query: "" })).rejects.toThrow();
  });

  it("rejects neighborhood comparison with a missing area", async () => {
    const caller = appRouter.createCaller(publicCtx());
    await expect(
      caller.ai.compareNeighborhoods({ areaA: "Cary", areaB: "" }),
    ).rejects.toThrow();
  });
});
