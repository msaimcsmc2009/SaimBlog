import Image from "next/image";
import { cn } from "@/lib/utils";

function hashSeed(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function ProjectCover({
  title,
  index,
  image,
  className,
}: {
  title: string;
  index: number;
  image?: string;
  className?: string;
}) {
  if (image) {
    return (
      <div
        className={cn(
          "relative isolate aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-bg-elevated",
          className
        )}
      >
        <Image
          src={image}
          alt={title || "Proje görseli"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-4 rounded bg-bg/75 px-1.5 py-0.5 font-mono text-[11px] text-fg-subtle backdrop-blur-sm">
          {String(index).padStart(2, "0")}
        </span>
      </div>
    );
  }

  const safeTitle = title?.trim() || "";
  const seed = hashSeed(safeTitle || String(index));
  const glowX = 20 + (seed % 60);
  const glowY = 15 + ((seed >> 3) % 50);
  const initial = safeTitle ? safeTitle.charAt(0).toUpperCase() : String(index);

  return (
    <div
      className={cn(
        "relative isolate flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-bg-elevated",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-fg) 1px, transparent 1px), linear-gradient(90deg, var(--color-fg) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="absolute h-56 w-56 rounded-full blur-3xl"
        style={{
          left: `${glowX}%`,
          top: `${glowY}%`,
          background: "var(--color-accent)",
          opacity: 0.16,
          transform: "translate(-50%, -50%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none select-none font-display text-8xl font-semibold text-fg/[0.06]"
      >
        {initial}
      </span>
      <span className="absolute bottom-3 left-4 font-mono text-xs text-fg-subtle">
        {String(index).padStart(2, "0")}
      </span>
    </div>
  );
}
