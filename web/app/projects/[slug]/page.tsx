import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Section } from "@/components/ui/Section";
import { InfoCard } from "@/components/ui/InfoCard";
import { CoverImage } from "@/components/ui/CoverImage";
import { Facts, projectFacts } from "@/components/ui/Facts";
import { ProjectCard } from "@/components/cards/ProjectCard";
import {
  getAllProjects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/lib/content/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.shortDescription };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = await getAdjacentProjects(slug);
  const neighbour = next ?? prev;

  return (
    <>
      <section className="px-6 pb-12 pt-4 md:px-12">
        <Link href="/#work" className="text-xs font-semibold hover:underline">
          ← Back to projects
        </Link>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.categories.map((c) => (
            <Tag key={c}>{c}</Tag>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-bold italic md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-2xl text-muted">{project.shortDescription}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.caseStudySlug && (
            <Button href={`/case-studies/${project.caseStudySlug}`}>
              Read case study
            </Button>
          )}
          {project.prototypeUrl && (
            <Button href={project.prototypeUrl} variant="outline">
              Open prototype
            </Button>
          )}
        </div>

        <div className="mt-8">
          <CoverImage
            src={project.coverImage?.src}
            alt={project.coverImage?.alt ?? ""}
            label="Cover image: hero screens"
            aspect="aspect-[16/9]"
            sizes="(min-width: 1304px) 1200px, 100vw"
          />
        </div>
        <div className="mt-6">
          <Facts items={projectFacts(project)} />
        </div>
      </section>

      {project.overview && (
        <Section title="Overview">
          <p className="max-w-3xl text-lg">{project.overview}</p>
        </Section>
      )}

      {project.highlights && project.highlights.length > 0 && (
        <Section title="What is inside">
          <div className="grid gap-4 md:grid-cols-3">
            {project.highlights.map((h, i) => (
              <InfoCard
                key={h.title}
                kicker={String(i + 1).padStart(2, "0")}
                title={h.title}
                text={h.text}
              />
            ))}
          </div>
        </Section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <Section title="Selected screens">
          <div className="grid gap-4 md:grid-cols-2">
            {project.gallery.map((img, i) => (
              <figure key={i}>
                <CoverImage
                  src={img.src}
                  alt={img.alt}
                  label={`Screen ${String(i + 1).padStart(2, "0")}`}
                  aspect="aspect-[4/3]"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                {img.caption && (
                  <figcaption className="mt-2 text-xs text-muted">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </Section>
      )}

      <Section title={next ? "Next project" : "Previous project"}>
        {neighbour && (
          <div className="max-w-sm">
            <ProjectCard project={neighbour} />
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          {prev && (
            <Button href={`/projects/${prev.slug}`} variant="outline">
              ← Previous
            </Button>
          )}
          <Button href="/#work" variant="outline">
            All projects
          </Button>
          {next && <Button href={`/projects/${next.slug}`}>Next →</Button>}
        </div>
      </Section>
    </>
  );
}
