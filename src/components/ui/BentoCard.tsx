"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { GlowBorder } from "@/components/ui/GlowBorder";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  id?: string;
};

export function BentoCard({ children, className, glow = false, id }: BentoCardProps) {
  return (
    <motion.article
      id={id}
      className={cn("bento-card", className)}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
      }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
    >
      {glow ? <GlowBorder>{children}</GlowBorder> : children}
    </motion.article>
  );
}