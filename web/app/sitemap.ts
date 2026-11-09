import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllProjects } from "@/lib/content/projects";
import { getAllCaseStudies } from "@/lib/content/caseStudies";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, cases] = await Promise.all([
    getAllProjects(),
    getAllCaseStudies(),
  ]);
  return [
    { url: siteConfig.url },
    ...projects.map((p) => ({ url: `${siteConfig.url}/projects/${p.slug}` })),
    ...cases.map((c) => ({ url: `${siteConfig.url}/case-studies/${c.slug}` })),
  ];
}
