import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Section } from "@/components/ui/Section";
import { CoverImage } from "@/components/ui/CoverImage";
import { Facts, projectFacts } from "@/components/ui/Facts";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { pageMetadata } from "@/lib/seo";
import { CardGrid } from "@/components/case/CardGrid";
import { ImageGrid } from "@/components/case/ImageGrid";
import { SectionNav } from "@/components/case/SectionNav";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
} from "@/lib/content/caseStudies";
import { getProjectBySlug, getAdjacentProjects } from "@/lib/content/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const cases = await getAllCaseStudies();
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return {};
  return pageMetadata({
    title: `${cs.title}: case study`,
    description: cs.summary,
    path: `/case-studies/${cs.slug}`,
    image: cs.coverImage?.src,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const project = await getProjectBySlug(cs.projectSlug);
  if (!project) notFound();

  const { prev, next } = await getAdjacentProjects(project.slug);
  const neighbour = next ?? prev;

  const nav: { id: string; label: string }[] = [];
  if (cs.overview) nav.push({ id: "overview", label: "Overview" });
  if (cs.problem) nav.push({ id: "problem", label: "Problem" });
  if (cs.goals?.length) nav.push({ id: "goals", label: "Goals" });
  if (cs.process?.length) nav.push({ id: "process", label: "Process" });
  if (cs.decisions?.length) nav.push({ id: "decisions", label: "Decisions" });
  if (cs.finalUI?.length) nav.push({ id: "final-ui", label: "Final UI" });
  if (cs.outcomes?.length) nav.push({ id: "outcome", label: "Outcome" });

  const cover = cs.coverImage ?? project.coverImage;

  return (
    <>
      <section className="px-6 pb-12 pt-4 md:px-12">
        <Link
          href={`/projects/${project.slug}`}
          className="text-xs font-semibold hover:underline"
        >
          ← Back to project
        </Link>
        <div className="mt-4 flex flex-wrap gap-2">
          <Tag>Case study</Tag>
          {project.type && <Tag>{project.type}</Tag>}
        </div>
        <h1 className="mt-4 text-3xl font-bold italic md:text-5xl">
          {cs.title}
        </h1>
        <p className="mt-3 max-w-2xl text-muted">{cs.summary}</p>
        <SectionNav items={nav} />

        <div className="mt-8">
          <CoverImage
            src={cover?.src}
            alt={cover?.alt ?? ""}
            label="Cover image"
            aspect="aspect-[16/9]"
            sizes="(min-width: 1304px) 1200px, 100vw"
          />
        </div>
        <div className="mt-6">
          <Facts items={projectFacts(project)} />
        </div>
      </section>

      {cs.overview && (
        <Section id="overview" title="Overview">
          <p className="max-w-3xl text-lg">{cs.overview}</p>
        </Section>
      )}

      {cs.problem && (
        <Section id="problem" title="Context and problem">
          <p className="max-w-3xl text-lg">{cs.problem}</p>
        </Section>
      )}

      {cs.goals && cs.goals.length > 0 && (
        <Section id="goals" title="Goals and constraints">
          <CardGrid cards={cs.goals} />
        </Section>
      )}

      {cs.users && (
        <Section id="users" title="Target users">
          <p className="max-w-3xl text-lg">{cs.users}</p>
        </Section>
      )}

      {cs.research && cs.research.length > 0 && (
        <Section id="research" title="Research and insights">
          <CardGrid cards={cs.research} />
        </Section>
      )}

      {cs.process && cs.process.length > 0 && (
        <Section id="process" title="User flow and wireframes">
          <ImageGrid images={cs.process} columns={2} label="Process image" />
        </Section>
      )}

      {cs.decisions && cs.decisions.length > 0 && (
        <Section id="decisions" title="Design decisions">
          <CardGrid cards={cs.decisions} kickerPrefix="Decision" />
        </Section>
      )}

      {cs.finalUI && cs.finalUI.length > 0 && (
        <Section id="final-ui" title="Final UI">
          <ImageGrid
            images={cs.finalUI}
            columns={3}
            label="Final screen"
            aspect="aspect-[9/16]"
          />
        </Section>
      )}

      {cs.designSystem && (
        <Section id="design-system" title="Design system">
          {cs.designSystem.text && (
            <p className="mb-6 max-w-3xl text-lg">{cs.designSystem.text}</p>
          )}
          <CoverImage
            src={cs.designSystem.image?.src}
            alt={cs.designSystem.image?.alt ?? ""}
            label="Components and tokens"
            aspect="aspect-[16/7]"
            sizes="(min-width: 1304px) 1200px, 100vw"
          />
        </Section>
      )}

      {cs.prototypeUrl && (
        <Section id="prototype" title="Prototype">
          <p className="mb-6 max-w-3xl text-lg">
            Link to the interactive prototype.
          </p>
          <Button href={cs.prototypeUrl}>Open prototype</Button>
        </Section>
      )}

      {cs.outcomes && cs.outcomes.length > 0 && (
        <Section id="outcome" title="Outcomes and lessons learned">
          <CardGrid cards={cs.outcomes} />
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
