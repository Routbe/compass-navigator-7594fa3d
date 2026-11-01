# Production and security fixes

## Design restoration and support triage
- [ ] Follow up on remaining design regressions; inspect preview name/text visibility and make preview verification mark match the live site.
- [x] Compared the earlier repository: restored original dark background, compact header buttons, focus accents, complete payment choices/colored artwork and Steam choice; bundled the missing profile fonts, retaining newer security and functionality.
- [x] Diagnosed the image regression: mandatory persistent image caching suppressed all upstream photos without internal storage; public proxy and Mastodon account photos now use the same guarded bounded server fetch as fallback. Static reference images were already present and return 200.
- [x] Added permission-protected AI summary/category/priority/follow-up on contact page and selected-message dialog; Support permission template, no full inbox access for delegated staff, validated output and redacted obvious secrets.
- [x] Verified 42 targeted tests, 1365 full-suite passes (one resource-related signing-key setup timeout; its four tests pass on isolated rerun), clean TypeScript check and live Gateway response for fictional input; desktop/mobile payment selectors show all nine options without overflow or page errors.
- [ ] Verify authenticated support submission and a production member photo: no working Better Auth account/session available here; live proxy request timed out in preview, so production photo rendering is not claimed verified.

## Runtime and Fediverse verification
- [x] Bind DATABASE_URL at request time to the shared, least-privilege database adapter; keep the linked gateway available.
- [x] Verify database/authentication transport tests before implementing Fediverse changes.
- [x] Add verified-email-bound Mastodon profile input and reciprocal-link verification.
- [x] Share rel="me" output across path/subdomain and verified custom-domain profile heads; test impersonation and unsafe fetch rejection.
- [x] Validate all 1360 tests: full suite's only failure (new function missing from snapshot) corrected by offline replay and successful rerun; TypeScript exits 0, sign-in page has no browser errors, session endpoint returns 200.
- [ ] Verify live Vercel login and persisted Mastodon links on both active domains: production configuration/domain access and a working authenticated account are unavailable here.
- [ ] Apply reviewed migration 0156 for anonymous proof reads: owner-level database access is not available and migrations must not be applied automatically.

- [x] Restrict release validation to DATABASE_URL and PUBLIC_ORIGIN; URL formatting warns without blocking.
- [x] Make PUBLIC_ORIGIN authoritative for Better Auth/Bluesky and preserve secure host-only cookies.
- [x] Audit runtime coupling: both gateway and runtime DATABASE_URL retain the same least-privilege role/context guard.
- [x] Enforce fixed wallet tiers inside server helpers and RPC schemas; Stripe verifies paid EUR amounts, bunq does not credit the wallet.
- [x] Remove raw contact/provider/database/Bluesky messages from diagnostics.
- [x] Release validation passes without platform keys; full suite passes (1348 tests); TypeScript verified.
- [ ] Live Vercel sign-in/callback and paid wallet settlement verification: requires deployed domain/provider access and an authenticated session.
