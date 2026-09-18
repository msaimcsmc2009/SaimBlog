import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/social-icons";
import { ProjectCover } from "@/components/ui/project-cover";
import { StatusBadge } from "@/components/ui/badge";
import { type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  index,
  featured = false,
  showLinks = true,
}: {
  project: Project;
  index: number;
  featured?: boolean;
  showLinks?: boolean;
}) {
  const hasTitle = Boolean(project.title?.trim());
  const hasOneLiner = Boolean(project.oneLiner?.trim());
  const hasTech = Boolean(project.tech && project.tech.length > 0);

  return (
    <div
      className={cn(
        "group flex h-full flex-col rounded-lg border border-border bg-bg-elevated p-3 transition-all duration-300 hover:border-accent-border hover:bg-bg-elevated-2",
        featured && "sm:flex-row sm:items-stretch sm:gap-6 sm:p-4"
      )}
    >
      <div className={cn(featured && "sm:w-1/2")}>
        <ProjectCover
          title={project.title}
          index={index}
          image={project.image}
          className="transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className={cn("flex flex-1 flex-col p-3", featured && "sm:w-1/2 sm:justify-center sm:p-4")}>
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <h3 className="min-w-0 break-words font-display text-xl font-semibold text-fg">
            {hasTitle ? (
              project.title
            ) : (
              <span className="text-fg-subtle/50 font-normal italic">Proje Başlığı</span>
            )}
          </h3>
          <StatusBadge status={project.status} className="shrink-0" />
        </div>

        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {hasOneLiner ? (
            project.oneLiner
          ) : (
            <span className="text-fg-subtle/40 italic">Proje açıklaması buraya gelecek...</span>
          )}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 min-h-[1.5rem]">
          {hasTech ? (
            project.tech.slice(0, featured ? 4 : 3).map((tech) => (
              <span key={tech} className="font-mono text-[11px] text-fg-subtle">
                {tech}{" "}
              </span>
            ))
          ) : (
            <span className="font-mono text-[11px] text-fg-subtle/40 italic">
              Teknoloji etiketleri
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-4 pt-5">
          <Link
            href={`/projeler/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
          >
            Detayları Gör
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          {showLinks && project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              Canlı Demo
              <ArrowUpRight size={14} />
            </a>
          )}
          {showLinks && project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
