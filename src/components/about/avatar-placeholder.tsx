import { cn } from "@/lib/utils";

export function AvatarPlaceholder({ initial, className }: { initial: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative isolate flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-bg-elevated",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-fg) 1px, transparent 1px), linear-gradient(90deg, var(--color-fg) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full opacity-25 blur-[90px]"
        style={{ background: "var(--color-accent)" }}
      />
      <span className="relative font-display text-8xl font-semibold text-fg/90">{initial}</span>
      <span className="absolute bottom-4 left-4 font-mono text-[11px] text-fg-subtle">
        fotoğraf yakında
      </span>
    </div>
  );
}
