import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent",
        className
      )}
    >
      <span aria-hidden className="h-px w-6 bg-accent/60" />
      {children}
    </span>
  );
}
