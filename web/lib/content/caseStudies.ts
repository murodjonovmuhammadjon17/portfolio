import { client } from "@/lib/sanity/client";
import {
  allCaseStudiesQuery,
  caseStudyBySlugQuery,
} from "@/lib/sanity/queries";
import { toImage, type RawImage } from "@/lib/content/projects";
import type { CaseCard, CaseStudy, ProjectImage } from "@/types/content";

type RawCard = {
  kicker: string | null;
  title: string;
  text: string;
};

type RawCase = {
  slug: string;
  projectSlug: string | null;
  title: string;
  summary: string;
  overview: string | null;
  problem: string | null;
  users: string | null;
  prototypeUrl: string | null;
  coverImage: RawImage;
  goals: RawCard[] | null;
  research: RawCard[] | null;
  decisions: RawCard[] | null;
  outcomes: RawCard[] | null;
  process: RawImage[] | null;
  finalUI: RawImage[] | null;
  designSystem: { text: string | null; image: RawImage } | null;
};

function toCards(raw: RawCard[] | null): CaseCard[] | undefined {
  if (!raw?.length) return undefined;
  return raw.map((c) => ({
    kicker: c.kicker ?? undefined,
    title: c.title,
    text: c.text,
  }));
}

function toImages(raw: RawImage[] | null): ProjectImage[] | undefined {
  const list = raw
    ?.map(toImage)
    .filter((i): i is ProjectImage => i !== undefined);
  return list?.length ? list : undefined;
}

// Кейс без связанного опубликованного проекта показывать нельзя.
function toCase(raw: RawCase): CaseStudy | undefined {
  if (!raw.projectSlug) return undefined;
  const ds = raw.designSystem;
  const designSystem =
    ds && (ds.text || toImage(ds.image))
      ? { text: ds.text ?? undefined, image: toImage(ds.image) }
      : undefined;

  return {
    slug: raw.slug,
    projectSlug: raw.projectSlug,
    title: raw.title,
    summary: raw.summary,
    coverImage: toImage(raw.coverImage),
    overview: raw.overview ?? undefined,
    problem: raw.problem ?? undefined,
    goals: toCards(raw.goals),
    users: raw.users ?? undefined,
    research: toCards(raw.research),
    process: toImages(raw.process),
    decisions: toCards(raw.decisions),
    finalUI: toImages(raw.finalUI),
    designSystem,
    prototypeUrl: raw.prototypeUrl ?? undefined,
    outcomes: toCards(raw.outcomes),
  };
}

const fetchOptions = {
  cache: "force-cache" as const,
  next: { tags: ["caseStudy", "project"] },
};

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const raw = await client.fetch<RawCase[]>(
    allCaseStudiesQuery,
    {},
    fetchOptions,
  );
  return raw.map(toCase).filter((c): c is CaseStudy => c !== undefined);
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | undefined> {
  const raw = await client.fetch<RawCase | null>(
    caseStudyBySlugQuery,
    { slug },
    fetchOptions,
  );
  return raw ? toCase(raw) : undefined;
}
