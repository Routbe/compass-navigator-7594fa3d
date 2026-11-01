<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Repository import architecture
- Preserve the imported TanStack Start routes, source design system, MDX catalog, and server entry together; they form the existing application.
- Keep Neon and Better Auth as the imported account architecture: prefer the linked gateway when configured, otherwise read DATABASE_URL at request time through the same atomic role/context/guard adapter; never apply source database scripts automatically. Why: external deployments must work without weakening least-privilege access.
- Preserve this project’s managed identity, credentials, and repository metadata during source imports.
- Subdirectories have their own AGENTS.md to read before changing files there.
- Release validation is independent of runtime provider credentials; PUBLIC_ORIGIN is normalized and authoritative for authentication, with secure host-only cookies, so build gates and session routing do not disagree.
- Validate wallet tiers in server helpers as well as RPC schemas; provider confirmation must match before atomic crediting, so internal callers cannot bypass the payment rules.
- Fediverse profile ownership uses the existing Mastodon integration row and a server-derived namespace digest; anonymous reads use the narrow read_public_fediverse capability (migration 0156), and path/subdomain/custom-domain heads share one link helper. Why: owner-only users remain private, with no client-assigned proof and changed ownership invalidating the badge.
- Contact AI triage uses the existing delegated triage_contact permission and server-only Gateway SDK with validated advisory output; never log or persist message payloads. Why: support staff need analysis without access to the full contact inbox or autonomous account actions.
- Public image proxy storage caching is optional; fall back to the same DNS-checked, bounded server-side image fetch, never a browser redirect. Why: storage outages must not hide photos or expose visitor addresses.
- Ship profile font families locally and retain complete payment options and colored brand artwork. Why: reference presentation must work without third-party font or icon requests.
- Live profile, showcase and share-card verification marks share verified-mark geometry and color; preview font responses must contain actual font signatures. Why: identical badges and no silent textless PNGs from HTML font fallbacks.
