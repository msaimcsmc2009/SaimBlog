"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/reveal";
import { techStack } from "@/lib/tech-stack";

export function TechStackGrid() {
  return (
    <section className="border-y border-border bg-bg-elevated/40 py-24 md:py-32">
      <Container>
        <Reveal>
          <Eyebrow>Kullandığım Araçlar</Eyebrow>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold sm:text-4xl">
            Bir fikri üretime taşımak için yeterli araç seti.
          </h2>
        </Reveal>

        <RevealGroup
          stagger={0.06}
          className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9"
        >
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              variants={revealItem}
              className="group flex flex-col items-center justify-center gap-3 rounded-lg border border-border bg-bg-elevated p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent-border hover:bg-bg-elevated-2"
            >
              <span className="font-mono text-sm font-medium text-fg-muted transition-colors group-hover:text-accent">
                {tech.code}
              </span>
              <span className="text-xs text-fg-subtle">{tech.name}</span>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
