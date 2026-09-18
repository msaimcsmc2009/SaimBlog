import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CopyButton } from "@/components/ui/copy-button";
import { siteConfig } from "@/lib/site-config";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons/social-icons";

const socialLinks = [
  { label: "GitHub", href: siteConfig.social.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
  { label: "X", href: siteConfig.social.twitter, icon: XIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg">
      <Container className="py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Link href="/" className="font-mono text-lg font-medium text-fg">
              {siteConfig.name.toLowerCase()}
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent"
              >
                <Mail size={16} />
                {siteConfig.email}
              </a>
              <CopyButton value={siteConfig.email} />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
                Site
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="/feed.xml"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    RSS
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
                Bağlan
              </p>
              <ul className="mt-4 flex gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-fg-muted transition-all hover:border-accent-border hover:text-accent"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-6">
          <p className="font-mono text-xs text-fg-subtle">
            © {year} {siteConfig.fullName}. Tüm hakları saklıdır.
          </p>
        </div>
      </Container>
    </footer>
  );
}
