import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { getAllProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";

export function Stats() {
  const projects = getAllProjects();
  const posts = getAllPosts();
  const liveCount = projects.filter((p) => p.status === "canli").length;

  const stats = [
    { value: String(projects.length), label: "Proje Geliştirdim" },
    { value: String(posts.length), label: "Blog Yazısı Yazdım" },
    { value: String(liveCount), label: "Canlı Proje" },
    { value: "2026", label: "İlk Proje Yılı" },
  ];

  return (
    <section className="border-y border-border bg-bg-elevated/40 py-24 md:py-32">
      <Container>
        <Reveal>
          <Eyebrow>Rakamlarla</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold sm:text-4xl">
            Şimdiye kadar ürettiklerimin özeti.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="flex h-full flex-col justify-between gap-6 bg-bg-elevated p-6">
                <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">{stat.label}</span>
                <span className="font-display text-5xl font-semibold tracking-tight text-fg">{stat.value}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}