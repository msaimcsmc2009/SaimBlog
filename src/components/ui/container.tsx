import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-6xl px-6 md:px-8", className)}>
      {children}
    </Tag>
  );
}
