"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="absolute inset-x-0 top-16 z-40 h-0.5 origin-left bg-accent"
      style={{ scaleX: progress }}
    />
  );
}