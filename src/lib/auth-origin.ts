/** Canonicalize configured URLs without trusting request-supplied hosts. */
export function normalizeAuthOrigin(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (url.username || url.password) return null;
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol !== "https:" && !(local && url.protocol === "http:")) return null;
    return url.origin;
  } catch { return null; }
}

export function configuredAuthOrigin(env: Record<string, string | undefined>): string | null {
  return normalizeAuthOrigin(env.PUBLIC_ORIGIN) ?? normalizeAuthOrigin(env.BETTER_AUTH_URL)
    ?? normalizeAuthOrigin(env.NEXT_PUBLIC_APP_URL);
}

export const AUTH_COOKIE_ATTRIBUTES = { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" };
const SIGN_IN_PAGES = new Set(["/auth/sign-in", "/auth/sign-up"]);

/**
 * Sign-in must start, call back and finish on one host: Better Auth's state and
 * session cookies are host-only. When the visitor opens a sign-in page on any
 * other host than the configured auth origin, send them there first.
 */
export function canonicalSignInRedirect(
  requestUrl: string,
  forwardedHost: string | null,
  configured: string | null,
): string | null {
  if (!configured) return null;
  const url = new URL(requestUrl);
  if (!SIGN_IN_PAGES.has(url.pathname.replace(/\/+$/, ""))) return null;
  const host = (forwardedHost?.split(",")[0]?.trim() || url.host).toLowerCase();
  const target = new URL(configured);
  if (host === target.host.toLowerCase()) return null;
  if (/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) return null;
  return `${target.origin}${url.pathname}${url.search}`;
}
