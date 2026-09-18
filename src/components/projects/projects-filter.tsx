"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/project-card";
import { type Project } from "@/lib/projects";
import { type ProjectStatus } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusOptions: { value: ProjectStatus | "hepsi"; label: string }[] = [
  { value: "hepsi", label: "Tümü" },
  { value: "canli", label: "Canlı" },
  { value: "gelistiriliyor", label: "Geliştiriliyor" },
  { value: "mvp", label: "MVP" },
  { value: "konsept", label: "Konsept" },
];

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide transition-all duration-200",
        active
          ? "border-accent-border bg-accent-dim text-accent"
          : "border-border text-fg-muted hover:border-border-strong hover:text-fg"
      )}
    >
      {children}
    </button>
  );
}

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [status, setStatus] = useState<ProjectStatus | "hepsi">("hepsi");
  const [tech, setTech] = useState<string>("hepsi");

  const allTech = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tech?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const statusMatch = status === "hepsi" || p.status === status;
      const techMatch = tech === "hepsi" || (p.tech && p.tech.includes(tech));
      return statusMatch && techMatch;
    });
  }, [projects, status, tech]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-wide text-fg-subtle">Durum</span>
          {statusOptions.map((opt) => (
            <FilterChip key={opt.value} active={status === opt.value} onClick={() => setStatus(opt.value)}>
              {opt.label}
            </FilterChip>
          ))}
        </div>
        {allTech.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[11px] uppercase tracking-wide text-fg-subtle">Teknoloji</span>
            <FilterChip active={tech === "hepsi"} onClick={() => setTech("hepsi")}>
              Tümü
            </FilterChip>
            {allTech.map((t) => (
              <FilterChip key={t} active={tech === t} onClick={() => setTech(t)}>
                {t}
              </FilterChip>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} index={i + 1} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-fg-muted">
          Bu filtrelere uyan bir proje yok.
        </p>
      )}
    </div>
  );
}
