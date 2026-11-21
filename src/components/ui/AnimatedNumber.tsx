"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }: AnimatedNumberProps) {
  const count = useMotionValue(0);
  const formattedCount = useTransform(count, (current) =>
    new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(current),
  );
  const [displayValue, setDisplayValue] = useState(
    new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(0),
  );

  useEffect(() => {
    const unsubscribe = formattedCount.on("change", setDisplayValue);
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [count, formattedCount, value]);

  return (
    <motion.span aria-label={`${prefix}${value}${suffix}`}>
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
}