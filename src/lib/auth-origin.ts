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