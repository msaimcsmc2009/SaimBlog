import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { CopyButton } from "@/components/ui/copy-button";
import { ContactForm } from "@/components/contact/contact-form";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons/social-icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${siteConfig.name} ile staj, proje ya da iş birliği için iletişime geç.`,
};

const socialLinks = [
  { label: "GitHub", href: siteConfig.social.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
  { label: "X", href: siteConfig.social.twitter, icon: XIcon },
];

export default function ContactPage() {
  return (
    <div className="pb-24 pt-32 md:pb-32 md:pt-40">
      <Container>
        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <Reveal>
            <Eyebrow>İletişim</Eyebrow>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Birlikte çalışalım.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-fg-muted">
              Staj fırsatları, ekip projeleri ya da sadece bir fikir alışverişi için
              buradayım. Aşağıdaki formu doldur, ya da doğrudan yaz.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-3 text-sm text-fg-muted transition-colors hover:text-accent"
                >
                  <Mail size={16} />
                  {siteConfig.email}
                </a>
                <CopyButton value={siteConfig.email} />
              </div>
              <span className="inline-flex items-center gap-3 text-sm text-fg-muted">
                <MapPin size={16} />
                {siteConfig.location}
              </span>
            </div>

            <div className="mt-8 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-fg-muted transition-all hover:border-accent-border hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-xl border border-border bg-bg-elevated p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
