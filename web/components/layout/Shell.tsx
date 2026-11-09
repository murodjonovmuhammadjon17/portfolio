import { Header } from "./Header";
import { Footer } from "./Footer";
import { getSiteSettings } from "@/lib/content/settings";

export async function Shell({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const items = [
    ...settings.nav,
    ...(settings.links.cv ? [{ label: "CV", href: settings.links.cv }] : []),
  ];

  return (
    <div className="px-3 py-3 md:px-8 md:py-8">
      <div className="mx-auto max-w-[1304px] overflow-hidden rounded-md bg-surface">
        <Header name={settings.name} items={items} />
        <main>{children}</main>
        <Footer settings={settings} />
      </div>
    </div>
  );
}
