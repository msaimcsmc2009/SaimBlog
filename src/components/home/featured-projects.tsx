import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { getFeaturedProjects } from "@/lib/projects";

export function FeaturedProjects() {
  const projects = getFeaturedProjects(3);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Öne Çıkan Projeler</Eyebrow>
              <h2 className="mt-4 text-balance font-display text-3xl font-semibold sm:text-4xl">
                Fikirden ürüne giden yolun izleri.
              </h2>
            </div>
            <Link
              href="/projeler"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-accent"
            >
              Tüm projeler
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {projects[0] && (
            <Reveal delay={0.05} className="md:col-span-2">
              <ProjectCard project={projects[0]} index={1} featured />
            </Reveal>
          )}
          {projects.slice(1).map((project, i) => (
            <Reveal key={project.slug} delay={0.1 + i * 0.05}>
              <ProjectCard project={project} index={i + 2} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
