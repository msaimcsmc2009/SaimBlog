import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-config";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Hakkımda",
  description: `${siteConfig.name} kimdir, yazılıma nasıl başladı ve şu an neler üretiyor.`,
};

const values = [
  {
    title: "Bitirmeden konuşmam",
    description: "Bir fikri, çalışan bir prototipe dönüştürmeden kimseyle paylaşmam.",
  },
  {
    title: "Öğrenmeyi belgelerim",
    description: "Her hatayı ve çözümü not alırım — bu sitedeki blog da bu alışkanlığın bir sonucu.",
  },
  {
    title: "Basit, çalışan; karmaşık, plandan iyidir",
    description: "Küçük bir kapsamla başlar, çalışan bir sürümü yayınlayıp üzerine çıkarım.",
  },
  {
    title: "Sorumluluk alırım",
    description: "Söz verdiğim bir şeyi zamanında teslim etmek benim için ilke meselesi.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-24 pt-32 md:pb-32 md:pt-40">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-16">
          <Reveal>
            <div className="relative isolate aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-xl border border-border bg-bg-elevated">
              <Image
                src={withBasePath("/saimblogpp.jpg")}
                alt={`${siteConfig.fullName} portresi`}
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                className="object-cover md:-translate-x-5 md:scale-[1.16]"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Hakkımda</Eyebrow>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Merhaba, ben {siteConfig.name}.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-fg-muted">
              {siteConfig.tagline} Bu sayfada kod yazmaya nasıl başladığımı, şu an neyle uğraştığımı ve
              nasıl çalıştığımı anlatıyorum.
            </p>
            <div className="mt-8">
              <Button href="/cv.pdf" variant="secondary" icon={<Download size={16} />}>
                Özgeçmişi İndir
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      <Container className="mt-24 md:mt-32">
        <div className="grid gap-12 md:grid-cols-[220px_1fr] md:gap-16">
          <Reveal>
            <Eyebrow>Hikayem</Eyebrow>
          </Reveal>
          <div className="space-y-8">
            <Reveal delay={0}>
              <h3 className="font-display text-xl font-semibold text-fg">Nasıl başladım</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-fg-muted">
                Küçüklüğümden beri bilgisayarımla sürekli vakit geçirdim ve her zaman kodlama alanına ilgi duydum.
                Ve hala daha en büyük hayallerimden bir tanesi yazılım alanında ilerlemek — ilgi duyduğum günden beri her boş vaktimde ya bir şey kodluyorum ya da
                birinin nasıl kodladığını izliyorum ve kendimi geliştiriyorum.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="font-display text-xl font-semibold text-fg">Şu an neler yapıyorum</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-fg-muted">
                Lise son sınıftayım ve okul dışındaki zamanımın büyük kısmını kendi projelerimi
                kodlayarak ve projeler üretmeye çalışarak geçirmeye çalışıyorum. Şu anda geliştirmekte olduğum sitelerime zaman ayırıyorum.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <h3 className="font-display text-xl font-semibold text-fg">İlgi alanlarım</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-fg-muted">
                Web ve mobil uygulama geliştirmenin yanında ürün tarafına da meraklıyım —
                bir özelliği kodlamadan önce neden gerekli olduğunu düşünmeyi seviyorum. Boş
                zamanlarımda satranç oynuyor ve kendime ve sevdiklerime zaman ayırıyorum.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>

      <Container className="mt-24 md:mt-32">
        <div className="grid gap-12 md:grid-cols-[220px_1fr] md:gap-16">
          <Reveal>
            <Eyebrow>Eğitim</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-2xl rounded-lg border border-border bg-bg-elevated p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-fg">Meslek Lisesi · Yazılım Bölümü</h3>
                <span className="font-mono text-xs text-fg-subtle">2022 — 2026</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                Yazılım ve kodlama alanında yoğunlaşırken web geliştirme ve
                algoritma üzerine kendi kendime çalıştım. Hedefim, kendi işimi sıfırdan kurmak.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>

      <Container className="mt-24 md:mt-32">
        <div className="grid gap-12 md:grid-cols-[220px_1fr] md:gap-16">
          <Reveal>
            <Eyebrow>Deneyim</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-2xl rounded-lg border border-border bg-bg-elevated p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-fg">
                  Wagner Kablo · Bilgi İşlem Stajyeri
                </h3>
                <span className="font-mono text-xs text-fg-subtle">Eylül 2026 — Haziran 2027</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                Antalya Serbest Bölge&apos;de faaliyet gösteren ulusal şirket Wagner Kablo&apos;nun bilgi işlem
                departmanında stajyer olarak çalışıyorum.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>

      <Container className="mt-24 md:mt-32">
        <div className="grid gap-12 md:grid-cols-[220px_1fr] md:gap-16">
          <Reveal>
            <Eyebrow>Değerlerim</Eyebrow>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="rounded-lg border border-border bg-bg-elevated p-5">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-2 font-display text-base font-semibold text-fg">{value.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
