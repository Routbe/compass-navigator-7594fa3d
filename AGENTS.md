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
- Keep Neon gateway and Better Auth as the imported account architecture; do not apply source database scripts automatically or substitute unrelated storage.
- Preserve this project’s managed identity, credentials, and repository metadata during source imports.
- Subdirectories have their own AGENTS.md to read before changing files there.
- Release validation is independent of runtime provider credentials; PUBLIC_ORIGIN is normalized and authoritative for authentication, with secure host-only cookies, so build gates and session routing do not disagree.
- Validate wallet tiers in server helpers as well as RPC schemas; provider confirmation must match before atomic crediting, so internal callers cannot bypass the payment rules.
