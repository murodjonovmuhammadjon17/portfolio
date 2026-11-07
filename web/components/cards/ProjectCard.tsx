import Link from "next/link";
import type { Project } from "@/types/content";
import { Tag } from "@/components/ui/Tag";
import { CoverImage } from "@/components/ui/CoverImage";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="relative flex h-full flex-col rounded-md border border-line bg-surface p-4">
      <CoverImage
        src={project.coverImage?.src}
        alt={project.coverImage?.alt ?? ""}
        label="Cover image"
        sizes="(min-width: 768px) 33vw, 100vw"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {project.categories.map((c) => (
          <Tag key={c}>{c}</Tag>
        ))}
      </div>
      <h3 className="mt-3 font-serif text-2xl">
        <Link
          href={`/projects/${project.slug}`}
          className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-accent"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm text-muted">
        {project.shortDescription}
      </p>
      <p className="mt-4 text-sm font-semibold text-accent">
        {project.caseStudySlug ? "View case study →" : "Case study soon"}
      </p>
    </article>
  );
}