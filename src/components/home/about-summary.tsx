import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

export function AboutSummary() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <Reveal>
            <Eyebrow>Hakkımda</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-balance text-2xl font-medium leading-relaxed text-fg sm:text-3xl">
              Her şey küçüklükten gelen bir istekle başladı, şimdi kendi projelerimi üretip
              yayınlamaya çalışıyorum. Kod yazmayı sadece bir hobi olarak değil, fikirleri gerçek
              kullanıcılara ulaştırmanın en direkt yolu olarak görüyorum.
            </p>
            <Link
              href="/hakkimda"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
            >
              Daha Fazla Oku
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
