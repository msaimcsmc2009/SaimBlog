"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons/social-icons";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const mobileMenuContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const mobileMenuItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const socialLinks = [
  { label: "GitHub", href: siteConfig.social.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
  { label: "X", href: siteConfig.social.twitter, icon: XIcon },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const lastScrollY = useRef(0);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 16);

      if (currentY < 80) {
        setHidden(false);
      } else if (currentY > lastScrollY.current) {
        setHidden(true);
      } else if (currentY < lastScrollY.current) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled || open
            ? "border-b border-border bg-bg/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-lg font-medium tracking-tight text-fg"
        >
          {siteConfig.name.toLowerCase()}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-1 text-sm transition-colors",
                  active ? "text-fg" : "text-fg-muted hover:text-fg"
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/iletisim" size="md">
            İletişime Geç
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-fg md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {pathname.startsWith("/blog/") && pathname !== "/blog" && <ReadingProgress />}
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-bg md:hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--color-fg) 1px, transparent 1px), linear-gradient(90deg, var(--color-fg) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />
            <div
              aria-hidden
              className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full opacity-[0.14] blur-[120px]"
              style={{ background: "var(--color-accent)" }}
            />

            <Container className="relative flex flex-1 flex-col pt-24">
              <motion.nav
                initial="hidden"
                animate="show"
                variants={mobileMenuContainer}
                className="flex flex-col"
              >
                {siteConfig.nav.map((item, i) => {
                  const active =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <motion.div key={item.href} variants={mobileMenuItem}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-baseline gap-4 border-b border-border py-6 font-display text-3xl font-semibold transition-colors",
                          active ? "text-accent" : "text-fg hover:text-accent"
                        )}
                      >
                        <span className="font-mono text-xs tracking-wider text-fg-subtle">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              <div className="relative mt-auto pb-10">
                <Button href="/iletisim" size="lg" className="w-full">
                  İletişime Geç
                </Button>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent"
                  >
                    <Mail size={15} />
                    {siteConfig.email}
                  </a>
                  <div className="flex gap-3">
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={label}
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-fg-muted transition-all hover:border-accent-border hover:text-accent"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
