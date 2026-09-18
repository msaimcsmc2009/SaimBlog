"use client";

import { toast } from "sonner";
import { Link2, Check } from "lucide-react";
import { useState } from "react";
import { XIcon } from "@/components/icons/social-icons";

export function ShareButtons({
  title,
  url,
  className,
}: {
  title: string;
  url: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Bağlantı kopyalandı.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Bağlantı kopyalanamadı.");
    }
  }

  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  return (
    <div className={className}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Paylaş</p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={copyLink}
          aria-label="Bağlantıyı kopyala"
          className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-3.5 text-sm text-fg-muted transition-all hover:border-accent-border hover:text-accent"
        >
          {copied ? <Check size={16} /> : <Link2 size={16} />}
          {copied ? "Kopyalandı" : "Linki Kopyala"}
        </button>
        <a
          href={shareUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="X'te paylaş"
          className="inline-flex h-10 items-center justify-center rounded-md border border-border px-3.5 text-fg-muted transition-all hover:border-accent-border hover:text-accent"
        >
          <XIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}