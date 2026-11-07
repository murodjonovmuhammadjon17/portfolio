import { siteConfig } from "@/lib/site";

export function Footer() {
  const links = [
    { label: "LinkedIn", href: siteConfig.links.linkedin },
    { label: "Telegram", href: siteConfig.links.telegram },
    { label: "Email", href: siteConfig.links.email },
    { label: "CV", href: siteConfig.links.cv },
  ].filter((l) => l.href);

  return (
    <footer className="flex flex-col gap-6 border-t border-line px-6 py-8 md:flex-row md:items-end md:justify-between md:px-12">
      <div>
        <p className="font-serif text-xl">{siteConfig.name}</p>
        <p className="mt-1 text-xs text-muted">{siteConfig.tagline}</p>
        <p className="mt-4 text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
      {links.length > 0 && (
        <ul className="flex flex-wrap gap-4 text-xs font-semibold">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="hover:underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </footer>
  );
}
