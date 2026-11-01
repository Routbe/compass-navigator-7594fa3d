# Production and security fixes

## Design restoration and support triage
- [ ] Compare the requested earlier repository and restore its presentation without reverting security/authentication fixes.
- [ ] Diagnose and repair image loading; restore payment brand artwork and header details.
- [ ] Add permission-protected AI contact summary and categorization in the existing support environment.
- [ ] Run relevant tests and verify the visible changes; report any unavailable authenticated checks.

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
