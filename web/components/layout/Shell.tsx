import { Header } from "./Header";
import { Footer } from "./Footer";
import { ElasticCard } from "./ElasticCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/lib/content/settings";
import { siteConfig } from "@/lib/site";

export async function Shell({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const items = [
    ...settings.nav,
    ...(settings.links.cv ? [{ label: "CV", href: settings.links.cv }] : []),
  ];
  const sameAs = [settings.links.linkedin, settings.links.telegram].filter(
    Boolean,
  );

  return (
    <div className="px-3 py-3 md:px-8 md:py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: settings.name,
          jobTitle: "Product designer",
          url: siteConfig.url,
          ...(sameAs.length > 0 ? { sameAs } : {}),
        }}
      />
      <ElasticCard>
        <Header name={settings.name} items={items} />
        <main>{children}</main>
        <Footer settings={settings} />
      </ElasticCard>
    </div>
  );
}