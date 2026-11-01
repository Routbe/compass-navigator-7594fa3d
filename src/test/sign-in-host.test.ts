import { describe, expect, it } from "vitest";
import { canonicalSignInRedirect } from "@/lib/auth-origin";

describe("sign-in stays on one host", () => {
  it("moves sign-in from www to the configured origin, keeping the query", () => {
    expect(canonicalSignInRedirect("https://www.rout.be/auth/sign-in?x=1", null, "https://rout.be"))
      .toBe("https://rout.be/auth/sign-in?x=1");
  });
  it("uses the proxy host behind Vercel", () => {
    expect(canonicalSignInRedirect("http://internal/auth/sign-up", "rout-abc.vercel.app", "https://rout.be"))
      .toBe("https://rout.be/auth/sign-up");
  });
  it("does nothing on the configured host, other pages, local dev or without configuration", () => {
    expect(canonicalSignInRedirect("https://rout.be/auth/sign-in", null, "https://rout.be")).toBeNull();
    expect(canonicalSignInRedirect("https://www.rout.be/dashboard", null, "https://rout.be")).toBeNull();
    expect(canonicalSignInRedirect("http://localhost:8080/auth/sign-in", null, "https://rout.be")).toBeNull();
    expect(canonicalSignInRedirect("https://www.rout.be/auth/sign-in", null, null)).toBeNull();
  });
});
