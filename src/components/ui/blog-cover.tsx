import { cn } from "@/lib/utils";

function hashSeed(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function BlogCover({ category, className }: { category: string; className?: string }) {
  const seed = hashSeed(category);
  const angle = 20 + (seed % 40);

  return (
    <div
      className={cn(
        "relative isolate flex aspect-[16/9] w-full items-end overflow-hidden rounded-lg border border-border bg-bg-elevated p-4",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(${angle}deg, var(--color-border) 0px, var(--color-border) 1px, transparent 1px, transparent 14px)`,
          opacity: 0.5,
        }}
      />
      <div
        aria-hidden
        className="absolute -left-10 -top-10 h-40 w-40 rounded-full opacity-[0.14] blur-3xl"
        style={{ background: "var(--color-accent)" }}
      />
      <span className="relative font-mono text-xs uppercase tracking-[0.15em] text-fg-subtle">
        {category}
      </span>
    </div>
  );
}
