import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Section } from "@/components/ui/Section";
import { InfoCard } from "@/components/ui/InfoCard";
import { CoverImage } from "@/components/ui/CoverImage";
import { Facts, projectFacts } from "@/components/ui/Facts";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { getAllProjects } from "@/lib/content/projects";
import { home } from "@/lib/content/home";
import { getSiteSettings } from "@/lib/content/settings";

const num = (i: number) => String(i + 1).padStart(2, "0");

export default async function HomePage() {
  const projects = await getAllProjects();
  const selected = projects.filter((p) => p.featured);
  const featured = selected[0];
  const settings = await getSiteSettings();

  const contactLinks = [
    { label: "Email", href: settings.links.email },
    { label: "LinkedIn", href: settings.links.linkedin },
    { label: "Telegram", href: settings.links.telegram },
    { label: "Download CV", href: settings.links.cv },
  ].filter((l) => l.href);

  return (
    <>
      <section className="px-6 pb-12 pt-10 md:px-12 md:pb-20 md:pt-16">
        <div className="flex flex-col-reverse items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="max-w-3xl text-[28px] font-bold italic leading-tight md:text-5xl">
              {home.hero.headline}{" "}
              <span className="text-muted">{home.hero.accent}</span>
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/#work">View projects</Button>
              <Button href="/#contact" variant="outline">
                Contact
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted">{home.hero.status}</p>
          </div>
          <Image
            src="/img/avatarfoto.png"
            alt="Muhammad Murodjonov"
            width={4347}
            height={4769}
            priority
            sizes="(min-width: 768px) 330px, 210px"
            className="h-auto w-[210px] shrink-0 self-center md:w-[330px] md:self-auto"
          />
        </div>
      </section>

      <Section id="work" title="Selected work" intro={home.workIntro}>
        <div className="grid gap-6 md:grid-cols-3">
          {selected.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section
        id="what-i-do"
        title="What I do"
        intro="Four areas I work in, from the first sketch to a design system developers can use."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {home.whatIDo.map((item, i) => (
            <InfoCard
              key={item.title}
              kicker={num(i)}
              title={item.title}
              text={item.text}
            />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted">Tools</span>
          {home.tools.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Section>

      {featured && (
        <Section
          id="featured"
          title={`Featured case: ${featured.title}`}
          intro={featured.shortDescription}
        >
          <CoverImage
            src={featured.coverImage?.src}
            alt={featured.coverImage?.alt ?? ""}
            label="Cover image: key screens"
            aspect="aspect-[16/9]"
            sizes="(min-width: 1304px) 1200px, 100vw"
          />
          <div className="mt-6">
            <Facts items={projectFacts(featured)} />
          </div>
          {featured.overview && (
            <p className="mt-6 max-w-3xl">{featured.overview}</p>
          )}
          <div className="mt-6">
            {featured.caseStudySlug ? (
              <Button
                href={`/case-studies/${featured.caseStudySlug}`}
                variant="outline"
              >
                Read case study &rarr;
              </Button>
            ) : (
              <Button href={`/projects/${featured.slug}`} variant="outline">
                View project &rarr;
              </Button>
            )}
          </div>
        </Section>
      )}

      <Section
        id="how-i-work"
        title="How I work"
        intro="A simple loop I repeat on every project."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {home.howIWork.map((step, i) => (
            <InfoCard
              key={step.title}
              kicker={num(i)}
              title={step.title}
              text={step.text}
            />
          ))}
        </div>
      </Section>

      <Section id="about" title="About">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_minmax(0,400px)]">
          <div>
            <p className="max-w-xl text-lg">{home.about.text}</p>
            <div className="mt-6">
              <Facts
                items={[
                  { label: "Education", value: home.about.education },
                  { label: "Study", value: home.about.study },
                ]}
              />
            </div>
          </div>
          <Image
            src="/img/site-my-foto-1.png"
            alt="Muhammad presenting a project"
            width={1647}
            height={1194}
            sizes="(min-width: 768px) 400px, 100vw"
            className="h-auto w-full"
          />
        </div>
      </Section>

      <Section
        id="contact"
        title="Contact"
        intro="Open to internships in UX/UI and product design."
      >
        {contactLinks.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {contactLinks.map((l, i) => (
              <Button
                key={l.label}
                href={l.href}
                variant={i === 0 ? "primary" : "outline"}
              >
                {l.label}
              </Button>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}