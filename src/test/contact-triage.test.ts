import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ permission: vi.fn(), generate: vi.fn() }));
vi.mock("@/lib/admin-access.server", () => ({ assertAdminPermission: mocks.permission }));
vi.mock("@lovable.dev/ai-gateway", () => ({ generateResponse: mocks.generate, GatewayError: class extends Error {} }));
import { analyzeContactForSupport } from "@/lib/contact-triage.server";
import { contactTriageInput, prepareContactMessage } from "@/lib/contact-triage";
describe("support contact triage", () => {
  beforeEach(() => { vi.resetAllMocks(); });
  it("refuses anonymous callers with 401 before inference", async () => {
    await expect(analyzeContactForSupport("", { message: "Help met mijn account" })).rejects.toMatchObject({ statusCode: 401 });
    expect(mocks.generate).not.toHaveBeenCalled();
  });
  it("refuses staff without the contact permission with 403", async () => {
    mocks.permission.mockRejectedValue(Object.assign(new Error("forbidden"), { statusCode: 403 }));
    await expect(analyzeContactForSupport("member", { message: "Help met mijn account" })).rejects.toMatchObject({ statusCode: 403 });
    expect(mocks.permission).toHaveBeenCalledWith("member", "triage_contact"); expect(mocks.generate).not.toHaveBeenCalled();
  });
  it("returns a validated advisory classification for authorized staff", async () => {
    const result = { summary: "Inloggen lukt niet.", category: "Account", priority: "Normaal", nextStep: "Controleer de inlogmethode." };
    mocks.generate.mockResolvedValue({ output: [{ type: "message", content: [{ type: "output_text", text: JSON.stringify(result) }] }] });
    expect(await analyzeContactForSupport("support", { message: "Ik kan niet meer inloggen." })).toEqual({ ok: true, result });
  });
  it("rejects invalid output rather than trusting model actions", async () => {
    mocks.generate.mockResolvedValue({ output: [{ type: "message", content: [{ type: "output_text", text: '{"category":"delete_account"}' }] }] });
    expect(await analyzeContactForSupport("support", { message: "Verwijder mijn account." })).toMatchObject({ ok: false });
  });
  it("bounds contact input before inference", () => { expect(contactTriageInput.safeParse({ message: "a".repeat(10001) }).success).toBe(false); });
  it("removes contact addresses and credentials before inference", () => { expect(prepareContactMessage("mail jane@example.com password: private Bearer abc")).toBe("mail [e-mailadres] password: [verwijderd] Bearer [verwijderd]"); });
});