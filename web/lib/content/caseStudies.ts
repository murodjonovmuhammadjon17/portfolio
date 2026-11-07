import type { CaseStudy } from "@/types/content";

const caseStudies: CaseStudy[] = [
  {
    slug: "traveller",
    projectSlug: "traveller",
    title: "Traveller",
    summary:
      "Travel and booking app. Mobile and desktop screens, UI kit and a design system.",
    overview:
      "Traveller is a travel and booking app designed as a UX/UI course project. The work covers a UI kit, components with variants, a design system with tokens for light and dark themes, and screens for mobile and desktop.",
    designSystem: {
      text: "A UI kit, components with variants and light and dark design tokens used on every screen.",
      image: { alt: "Traveller components and tokens" },
    },
  },
];

// Phase 4: тела этих функций заменим запросами к Sanity, сигнатуры останутся.
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return caseStudies;
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | undefined> {
  return caseStudies.find((c) => c.slug === slug);
}
