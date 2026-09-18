import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { StatusBadge, TagBadge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ShareButtons } from "@/components/ui/share-buttons";
import { GithubIcon } from "@/components/icons/social-icons";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title || "Proje Detayı",
    description: project.oneLiner || "Proje detayları",
  };
}

const sections = [
  { key: "problem" as const, label: "Problem Neydi" },
  { key: "solution" as const, label: "Nasıl Çözdüm" },
  { key: "challenges" as const, label: "Zorluklar & Öğrendiklerim" },
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="pb-24 pt-32 md:pb-32 md:pt-40">
      <Container>
        <Reveal>
          <Link
            href="/projeler"
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={14} />
            Tüm projeler
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_260px] md:gap-16">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="font-mono text-xs text-fg-subtle">{project.year}</span>
            </div>
            <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {project.title || "Proje Detayı"}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-fg-muted">
              {project.oneLiner || "Bu proje hakkında henüz detay eklenmedi."}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-lg border border-border bg-bg-elevated p-5">
              <p className="font-mono text-[11px] uppercase tracking-wide text-fg-subtle">Teknolojiler</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech && project.tech.length > 0 ? (
                  project.tech.map((tech) => (
                    <TagBadge key={tech}>{tech}</TagBadge>
                  ))
                ) : (
                  <span className="text-xs italic text-fg-subtle">Belirtilmedi</span>
                )}
              </div>

              {(project.links?.demo || project.links?.github) && (
                <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5">
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-sm text-fg transition-colors hover:text-accent"
                    >
                      Canlı Demo
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-sm text-fg transition-colors hover:text-accent"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {project.image && (
          <Reveal delay={0.12} className="mt-12">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-bg-elevated">
              <Image
                src={project.image}
                alt={project.title || "Proje görseli"}
                fill
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
        )}

        {sections.some((s) => Boolean(project[s.key])) && (
          <div className="mt-20 max-w-2xl space-y-14">
            {sections
              .filter((section) => Boolean(project[section.key]))
              .map((section, i) => (
                <Reveal key={section.key} delay={i * 0.06}>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{section.label}</p>
                  <p className="mt-4 text-balance leading-relaxed text-fg">{project[section.key]}</p>
                </Reveal>
              ))}
          </div>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Ekran Görüntüleri</p>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {project.gallery.map((caption, i) => (
                <Reveal key={caption} delay={i * 0.06}>
                  <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-bg-elevated px-4 text-center">
                    <span className="font-mono text-[11px] text-fg-subtle">görsel yakında</span>
                    <span className="text-xs text-fg-muted">{caption}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {project.impact && (
          <div className="mt-20 max-w-2xl">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Sonuç & Etki</p>
              <p className="mt-4 text-balance leading-relaxed text-fg">{project.impact}</p>
            </Reveal>
          </div>
        )}

        <div className="mt-16 max-w-2xl border-t border-border pt-10">
          <Reveal>
            <ShareButtons
              title={project.title || "Proje"}
              url={`${siteConfig.url}/projeler/${project.slug}`}
            />
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
