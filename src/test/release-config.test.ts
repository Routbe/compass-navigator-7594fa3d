// @vitest-environment node
import { expect, it } from "vitest";
import { validateReleaseEnvironment } from "../../scripts/release-config";

const configured = () => ({
  LOVABLE_API_KEY: "test-only", NEON_API_KEY: "test-only", BETTER_AUTH_SECRET: "test-only",
  BETTER_AUTH_URL: "https://rout.be", NEXT_PUBLIC_APP_URL: "https://rout.be",
  PUBLIC_SITE_URL: "https://rout.be", PUBLIC_ORIGIN: "https://rout.be",
});
it("requires the linked Neon gateway even if a direct database URL is configured", () => {
  expect(validateReleaseEnvironment({ ...configured(), NEON_API_KEY: undefined, DATABASE_URL: "postgresql://unused.example/app" }))
    .toContainEqual({ key: "NEON_API_KEY", reason: "Missing required setting" });
});
it("accepts matching secure ROUT origins", () => {
  expect(validateReleaseEnvironment(configured())).toEqual([]);
});
it("rejects an email/link origin different from the authentication domain", () => {
  expect(validateReleaseEnvironment({ ...configured(), NEXT_PUBLIC_APP_URL: "https://other.example" }).some(i => i.key === "NEXT_PUBLIC_APP_URL")).toBe(true);
});
it("rejects insecure public origins", () => {
  expect(validateReleaseEnvironment({ ...configured(), BETTER_AUTH_URL: "http://rout.be" }).some(i => i.key === "BETTER_AUTH_URL")).toBe(true);
});
it("rejects inconsistent public and admin deployment modes", () => {
  expect(validateReleaseEnvironment({ ...configured(), VITE_APP_MODE: "public", APP_MODE: "admin" }))
    .toContainEqual({ key: "APP_MODE", reason: "Must match VITE_APP_MODE" });
});