"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("E-posta adresi kopyalandı.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Kopyalanamadı.");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="E-posta adresini kopyala"
      className={cn(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-fg-subtle transition-all hover:border-accent-border hover:text-accent",
        className
      )}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}