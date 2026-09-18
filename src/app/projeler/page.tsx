import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ProjectsFilter } from "@/components/projects/projects-filter";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projeler",
  description: `${siteConfig.name}'in geliştirdiği SaaS ve mobil uygulama projeleri.`,
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="pb-24 pt-32 md:pb-32 md:pt-40">
      <Container>
        <Reveal>
          <Eyebrow>Projeler</Eyebrow>
          <h1 className="mt-5 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Denediğim, bitirdiğim ve hâlâ üzerinde çalıştığım şeyler.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
            Her proje gerçek bir ihtiyaçtan doğdu. Bazıları canlıda, bazıları hâlâ MVP
            aşamasında — hepsinin hikayesini detay sayfalarında anlatıyorum.
          </p>
        </Reveal>

        <div className="mt-14">
          <ProjectsFilter projects={projects} />
        </div>
      </Container>
    </div>
  );
}
