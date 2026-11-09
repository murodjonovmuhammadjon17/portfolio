import type { Metadata } from "next";

type Input = {
  title: string;
  description: string;
  path: string; // например "/projects/traveller"
  image?: string; // адрес картинки в Sanity, если есть
};

// Картинка из Sanity в формате для превью ссылок (1200x630).
export function ogImage(src?: string): string {
  return src ? `${src}?w=1200&h=630&fit=crop&auto=format` : "/og";
}

export function pageMetadata({
  title,
  description,
  path,
  image,
}: Input): Metadata {
  const images = [ogImage(image)];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", title, description, url: path, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
