/** Pure release validation. Reports names and reasons, never configured values. */
export const RELEASE_REQUIRED = [
  "LOVABLE_API_KEY", "NEON_API_KEY", "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL", "NEXT_PUBLIC_APP_URL", "PUBLIC_SITE_URL", "PUBLIC_ORIGIN",
] as const;

export function validateReleaseEnvironment(env: Record<string, string | undefined>) {
  const issues: { key: string; reason: string }[] = [];
  for (const key of RELEASE_REQUIRED) {
    if (!env[key]?.trim()) issues.push({ key, reason: "Missing required setting" });
  }
  const origins = ["BETTER_AUTH_URL", "NEXT_PUBLIC_APP_URL", "PUBLIC_SITE_URL", "PUBLIC_ORIGIN"] as const;
  let expected: string | undefined;
  for (const key of origins) {
    const value = env[key];
    if (!value?.trim()) continue;
    try {
      const url = new URL(value);
      if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/" || value.endsWith("/")) {
        issues.push({ key, reason: "Use an HTTPS origin without credentials, path or trailing slash" });
        continue;
      }
      if (expected && expected !== url.origin) issues.push({ key, reason: "Public origins must match the authentication origin" });
      expected ??= url.origin;
    } catch {
      issues.push({ key, reason: "Use a valid HTTPS origin" });
    }
  }
  for (const key of ["VITE_APP_MODE", "APP_MODE"]) {
    if (env[key] && !["public", "admin"].includes(env[key] ?? "")) issues.push({ key, reason: "Expected public or admin" });
  }
  if (env["VITE_APP_MODE"] && env["APP_MODE"] && env["VITE_APP_MODE"] !== env["APP_MODE"]) {
    issues.push({ key: "APP_MODE", reason: "Must match VITE_APP_MODE" });
  }
  return issues;
}