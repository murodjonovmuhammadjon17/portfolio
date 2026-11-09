import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";
import { getSiteSettings } from "@/lib/content/settings";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  variable: "--font-lora",
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: s.name, template: `%s | ${s.name}` },
    description: s.description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: s.name,
      title: s.name,
      description: s.description,
      url: "/",
      images: ["/og"],
    },
    twitter: {
      card: "summary_large_image",
      title: s.name,
      description: s.description,
      images: ["/og"],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
