import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  icon?: ReactNode;
};

const variantClasses: Record<NonNullable<ButtonBaseProps["variant"]>, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-strong shadow-[0_0_0_1px_var(--color-accent-border)] hover:shadow-[0_0_24px_-4px_var(--color-accent)]",
  secondary:
    "bg-bg-elevated text-fg border border-border hover:border-border-strong hover:bg-bg-elevated-2",
  ghost: "text-fg-muted hover:text-fg",
};

const sizeClasses: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  href,
  ...rest
}: ButtonBaseProps & { href?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
      {icon}
    </button>
  );
}
