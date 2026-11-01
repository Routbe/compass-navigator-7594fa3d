// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import { probeServices } from "./env-health.server";
const query = vi.hoisted(() => vi.fn(async () => []));
vi.mock("./neon", () => ({ sql: query }));
afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks(); });

it("checks the linked Neon gateway without requiring a direct database URL", async () => {
  vi.stubEnv("LOVABLE_API_KEY", "test-only");
  vi.stubEnv("NEON_API_KEY", "test-only");
  vi.stubEnv("DATABASE_URL", undefined);
  vi.stubEnv("BREVO_API_KEY", undefined);
  vi.stubEnv("STRIPE_SECRET_KEY", undefined);
  const report = await probeServices();
  expect(report.services.find(s => s.key === "neon")?.ok).toBe(true);
  expect(query).toHaveBeenCalledTimes(1);
});
it("does not treat a direct database URL as a configured runtime connection", async () => {
  vi.stubEnv("LOVABLE_API_KEY", undefined);
  vi.stubEnv("NEON_API_KEY", undefined);
  vi.stubEnv("DATABASE_URL", "postgresql://unused.example/app");
  vi.stubEnv("BREVO_API_KEY", undefined);
  vi.stubEnv("STRIPE_SECRET_KEY", undefined);
  expect((await probeServices()).services.find(s => s.key === "neon")?.ok).toBe(false);
  expect(query).not.toHaveBeenCalled();
});