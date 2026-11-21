"use client";

import { useEffect, useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlowBorderProps = {
  children: ReactNode;
  className?: string;
};

export function GlowBorder({ children, className }: GlowBorderProps) {
  const animationFrame = useRef<number | null>(null);

  function trackPointer(event: MouseEvent<HTMLDivElement>) {
    const element = event.currentTarget;
    const pointerX = event.clientX;
    const pointerY = event.clientY;

    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      const bounds = element.getBoundingClientRect();
      element.style.setProperty("--mouse-x", `${pointerX - bounds.left}px`);
      element.style.setProperty("--mouse-y", `${pointerY - bounds.top}px`);
      animationFrame.current = null;
    });
  }

  useEffect(() => () => {
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
    }
  }, []);

  return (
    <div className={cn("glow-border", className)} onMouseMove={trackPointer}>
      <div className="glow-border__content">{children}</div>
    </div>
  );
}