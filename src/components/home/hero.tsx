"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-fg) 1px, transparent 1px), linear-gradient(90deg, var(--color-fg) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-40 top-24 h-[28rem] w-[28rem] rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--color-accent)" }}
      />

      <Container className="relative">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.h1
            variants={item}
            className="mt-6 break-words text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl"
          >
            Fikirleri{" "}
            <span className="bg-gradient-to-r from-fg via-accent to-fg bg-[length:200%_auto] bg-clip-text text-transparent [animation:gradient-pan_6s_ease-in-out_infinite]">
              çalışan yazılıma
            </span>{" "}
            dönüştürüyorum.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-fg-muted">
            {siteConfig.tagline} SaaS fikirlerini ve mobil uygulamaları uçtan uca kodluyor, öğrendiğim her şeyi bu sitede belgeliyorum.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/projeler" size="lg" icon={<ArrowRight size={18} />}>
              Projelerimi Gör
            </Button>
            <Button href="/iletisim" variant="secondary" size="lg">
              İletişime Geç
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle">Kaydır</span>
        <ArrowDown size={16} className="animate-bounce text-fg-subtle" />
      </motion.div>
    </section>
  );
}
