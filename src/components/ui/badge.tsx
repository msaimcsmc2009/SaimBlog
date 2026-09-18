import { cn } from "@/lib/utils";

export type ProjectStatus = "canli" | "gelistiriliyor" | "mvp" | "konsept";

const statusMeta: Record<ProjectStatus, { label: string; fg: string; bg: string }> = {
  canli: { label: "Canlı", fg: "var(--color-status-live)", bg: "var(--color-status-live-dim)" },
  gelistiriliyor: {
    label: "Geliştiriliyor",
    fg: "var(--color-status-building)",
    bg: "var(--color-status-building-dim)",
  },
  mvp: { label: "MVP", fg: "var(--color-status-mvp)", bg: "var(--color-status-mvp-dim)" },
  konsept: {
    label: "Konsept",
    fg: "var(--color-status-concept)",
    bg: "var(--color-status-concept-dim)",
  },
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const meta = statusMeta[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide",
        className
      )}
      style={{ color: meta.fg, background: meta.bg }}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: meta.fg }} />
      {meta.label}
    </span>
  );
}

export function TagBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-bg-elevated px-2.5 py-1 font-mono text-[11px] text-fg-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
