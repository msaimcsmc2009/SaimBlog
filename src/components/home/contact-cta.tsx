import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-config";

export function ContactCta() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-xl border border-border bg-bg-elevated px-8 py-16 text-center sm:px-16">
            <div
              aria-hidden
              className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
              style={{ background: "var(--color-accent)" }}
            />
            <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Birlikte Çalışalım
            </p>
            <h2 className="relative mx-auto mt-5 max-w-xl text-balance font-display text-3xl font-semibold sm:text-4xl">
              Aklında bir proje mi var? Konuşmaktan çekinme.
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-balance text-fg-muted">
              Staj, ekip projesi ya da sadece fikir alışverişi — {siteConfig.email} adresinden ya da aşağıdaki formdan ulaşabilirsin.
            </p>
            <div className="relative mt-8">
              <Button href="/iletisim" size="lg" icon={<ArrowRight size={18} />}>
                İletişime Geç
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
