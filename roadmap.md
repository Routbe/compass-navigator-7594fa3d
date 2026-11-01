# Production and security fixes

- [x] Restrict release validation to DATABASE_URL and PUBLIC_ORIGIN; URL formatting warns without blocking.
- [x] Make PUBLIC_ORIGIN authoritative for Better Auth/Bluesky and preserve secure host-only cookies.
- [x] Audit runtime coupling: the connected Neon gateway remains required; removing it conflicts with the supported access boundary.
- [x] Enforce fixed wallet tiers inside server helpers and RPC schemas; Stripe verifies paid EUR amounts, bunq does not credit the wallet.
- [x] Remove raw contact/provider/database/Bluesky messages from diagnostics.
- [x] Release validation passes without platform keys; full suite passes (1348 tests); TypeScript verified.
- [ ] Live Vercel sign-in/callback and paid wallet settlement verification: requires deployed domain/provider access and an authenticated session.
