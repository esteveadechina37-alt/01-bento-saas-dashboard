"use client";

import { useEffect, useMemo, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }: AnimatedNumberProps) {
  const count = useMotionValue(0);
  const formatter = useMemo(
    () => new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
    [decimals],
  );
  const [displayValue, setDisplayValue] = useState(formatter.format(0));

  useEffect(() => {
    const unsubscribe = count.on("change", (current) => setDisplayValue(formatter.format(current)));
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [count, formatter, value]);

  return (
    <motion.span aria-label={`${prefix}${value}${suffix}`}>
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
}