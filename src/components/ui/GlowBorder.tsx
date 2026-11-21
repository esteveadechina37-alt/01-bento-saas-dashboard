"use client";

import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlowBorderProps = {
  children: ReactNode;
  className?: string;
};

export function GlowBorder({ children, className }: GlowBorderProps) {
  function trackPointer(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <div className={cn("glow-border", className)} onMouseMove={trackPointer}>
      <div className="glow-border__content">{children}</div>
    </div>
  );
}