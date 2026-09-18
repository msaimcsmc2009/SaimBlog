import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <span className="font-mono text-sm uppercase tracking-[0.2em] text-accent">404</span>
      <h1 className="mt-4 text-balance font-display text-4xl font-semibold sm:text-5xl">
        Bu sayfa henüz kodlanmadı.
      </h1>
      <p className="mt-4 max-w-md text-fg-muted">
        Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.
      </p>
      <Button href="/" size="lg" className="mt-8" icon={<ArrowRight size={18} />}>
        Ana Sayfaya Dön
      </Button>
      <span className="mt-4 text-xs text-fg-subtle">
        <Link href="/projeler" className="hover:text-fg">
          Projelere göz at
        </Link>
        <span aria-hidden className="mx-2 text-fg-subtle/50">·</span>
        <Link href="/blog" className="hover:text-fg">
          Blog yazılarına göz at
        </Link>
      </span>
    </Container>
  );
}
