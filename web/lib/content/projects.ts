import { client } from "@/lib/sanity/client";
import { allProjectsQuery, projectBySlugQuery } from "@/lib/sanity/queries";
import type { Project, ProjectImage } from "@/types/content";

export type RawImage = {
  src?: string | null;
  alt?: string | null;
  caption?: string | null;
} | null;

type RawProject = {
  slug: string;
  title: string;
  shortDescription: string;
  categories: string[] | null;
  featured: boolean | null;
  displayOrder: number | null;
  role: string | null;
  type: string | null;
  tools: string[] | null;
  scope: string | null;
  overview: string | null;
  prototypeUrl: string | null;
  highlights: { title: string; text: string }[] | null;
  coverImage: RawImage;
  gallery: RawImage[] | null;
  caseStudySlug: string | null;
};

export function toImage(raw: RawImage | undefined): ProjectImage | undefined {
  if (!raw?.src) return undefined;
  return {
    src: raw.src,
    alt: raw.alt ?? "",
    caption: raw.caption ?? undefined,
  };
}

function toProject(raw: RawProject): Project {
  return {
    slug: raw.slug,
    title: raw.title,
    shortDescription: raw.shortDescription,
    categories: raw.categories ?? [],
    featured: raw.featured ?? false,
    displayOrder: raw.displayOrder ?? 999,
    role: raw.role ?? undefined,
    type: raw.type ?? undefined,
    tools: raw.tools ?? undefined,
    scope: raw.scope ?? undefined,
    overview: raw.overview ?? undefined,
    prototypeUrl: raw.prototypeUrl ?? undefined,
    highlights: raw.highlights ?? undefined,
    coverImage: toImage(raw.coverImage),
    gallery: raw.gallery
      ?.map(toImage)
      .filter((i): i is ProjectImage => i !== undefined),
    caseStudySlug: raw.caseStudySlug ?? undefined,
  };
}

const fetchOptions = { cache: "force-cache" as const, next: { tags: ["project"] } };

export async function getAllProjects(): Promise<Project[]> {
  const raw = await client.fetch<RawProject[]>(
    allProjectsQuery,
    {},
    fetchOptions,
  );
  return raw.map(toProject);
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const raw = await client.fetch<RawProject | null>(
    projectBySlugQuery,
    { slug },
    fetchOptions,
  );
  return raw ? toProject(raw) : undefined;
}

export async function getAdjacentProjects(slug: string) {
  const all = await getAllProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? all[i - 1] : undefined,
    next: i >= 0 && i < all.length - 1 ? all[i + 1] : undefined,
  };
}
