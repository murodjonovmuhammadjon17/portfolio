import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import { siteConfig } from "@/lib/site";

type RawSettings = {
  name: string | null;
  tagline: string | null;
  description: string | null;
  email: string | null;
  linkedin: string | null;
  telegram: string | null;
  cv: string | null;
} | null;

// Данные из админки. Пустое поле заменяется запасным значением из lib/site.ts.
export async function getSiteSettings() {
  const raw = await client.fetch<RawSettings>(
    siteSettingsQuery,
    {},
    { cache: "force-cache", next: { tags: ["siteSettings"] } },
  );
  return {
    name: raw?.name || siteConfig.name,
    tagline: raw?.tagline || siteConfig.tagline,
    description: raw?.description || siteConfig.description,
    nav: siteConfig.nav,
    links: {
      email: raw?.email ? `mailto:${raw.email}` : siteConfig.links.email,
      linkedin: raw?.linkedin || siteConfig.links.linkedin,
      telegram: raw?.telegram || siteConfig.links.telegram,
      cv: raw?.cv || siteConfig.links.cv,
    },
  };
}

export type SiteSettings = Awaited<ReturnType<typeof getSiteSettings>>;
