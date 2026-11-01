import { pageCardImage } from "@/lib/page-cards";
import { createFileRoute } from "@tanstack/react-router";
import Page from "@/components/imported-pages/Index";
import { HostProfile } from "@/components/imported-pages/HostProfile";
import { getRequestLocale } from "@/lib/locale.functions";
import { resolveHostProfile } from "@/lib/domain-routing.functions";
import { OG_IMAGE, canonicalLinks, jsonLdScript, socialMeta } from "@/lib/social-meta";
import { getPublicProfileByHandle } from "@/lib/studio-profile.functions";
import { fediverseHeadLinks, type FediverseIdentity } from "@/lib/fediverse-profile";
import { profileSocialMeta } from "@/lib/social-meta";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [locale, host] = await Promise.all([
      getRequestLocale().catch(() => ({ locale: "en" as const })),
      resolveHostProfile().catch(() => ({ handle: null as string | null })),
    ]);
    const hostProfile = host.handle ? await getPublicProfileByHandle({ data: { handle: host.handle } }).catch(() => null) : null;
    return { ...locale, hostHandle: host.handle, hostProfile };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.hostProfile ? profileSocialMeta({ locale: loaderData.locale, handle: loaderData.hostHandle ?? "", displayName: loaderData.hostProfile["display_name"] as string | null, bio: loaderData.hostProfile["bio"] as string | null, avatarUrl: loaderData.hostProfile["avatar_url"] as string | null, url: "/" }) : socialMeta(loaderData?.locale ?? "en", pageCardImage("home", loaderData?.locale ?? "en")),
    links: [...canonicalLinks("/"), ...fediverseHeadLinks(loaderData?.hostProfile?.["fediverse"] as FediverseIdentity | null)],
    scripts: jsonLdScript({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "ROUT",
      url: "https://rout.be",
      inLanguage: loaderData?.locale ?? "en",
      publisher: { "@type": "Organization", name: "ROUT", url: "https://rout.be" },
    }),
  }),
  component: HomeRoute,
});

/** Op een gekoppeld eigen domein toont "/" het profiel van die eigenaar. */
function HomeRoute() {
  const { hostHandle } = Route.useLoaderData();
  if (hostHandle) return <HostProfile handle={hostHandle} />;
  return <Page />;
}

