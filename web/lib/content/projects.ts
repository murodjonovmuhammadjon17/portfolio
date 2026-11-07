import type { Project } from "@/types/content";

const projects: Project[] = [
  {
    slug: "traveller",
    title: "Traveller",
    shortDescription:
      "Travel and booking app. Mobile and desktop screens, UI kit and a design system.",
    categories: ["Product design", "Student project"],
    featured: true,
    displayOrder: 1,
    role: "Product designer (UX/UI)",
    type: "Student project",
    tools: ["Figma", "FigJam"],
    scope: "Mobile and desktop screens, UI kit, design system",
    overview:
      "Traveller is a travel and booking app designed as a UX/UI course project. The work covers a UI kit, components with variants, a design system with tokens for light and dark themes, and screens for mobile and desktop.",
    highlights: [
      { title: "UI kit", text: "Colours, type, buttons, inputs, cards and icons." },
      { title: "Components", text: "Variants, states and instance-swap icons." },
      { title: "Tokens", text: "Light and dark design tokens for every screen." },
    ],
    gallery: [
      { alt: "Traveller screen 1" },
      { alt: "Traveller screen 2" },
      { alt: "Traveller screen 3" },
      { alt: "Traveller screen 4" },
    ],
    caseStudySlug: "traveller",
  },
  {
    slug: "lunch-box",
    title: "Lunch Box",
    shortDescription:
      "Food app concept that combines a restaurant lunch subscription with a marketplace of home-cooked meals.",
    categories: ["Concept", "UX/UI"],
    featured: true,
    displayOrder: 2,
  },
  {
    slug: "squaddrop",
    title: "SquadDrop",
    shortDescription:
      "Sci-fi styled app. Wireframes, component kit and a library of components in Figma.",
    categories: ["Wireframes", "Component kit"],
    featured: true,
    displayOrder: 3,
  },
];

// Phase 4: тела этих функций заменим запросами к Sanity, сигнатуры останутся.
export async function getAllProjects(): Promise<Project[]> {
  return [...projects].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug);
}

export async function getAdjacentProjects(slug: string) {
  const all = await getAllProjects();
  const i = all.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? all[i - 1] : undefined,
    next: i >= 0 && i < all.length - 1 ? all[i + 1] : undefined,
  };
}