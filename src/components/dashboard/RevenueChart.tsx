"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { revenueByPeriod } from "@/lib/mock-data";
import type { RevenuePeriod } from "@/types";
import { BentoCard } from "@/components/ui/BentoCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

const periods: RevenuePeriod[] = ["7j", "30j", "90j"];

export function RevenueChart() {
  const [period, setPeriod] = useState<RevenuePeriod>("30j");
  const chartData = revenueByPeriod[period];
  const latestRevenue = chartData[chartData.length - 1].value;

  return (
    <BentoCard id="analytics" className="chart-card revenue-card">
      <div className="chart-card__header">
        <div>
          <p className="card-kicker">PERFORMANCE</p>
          <h2>Revenus</h2>
          <p className="chart-card__summary">
            <AnimatedNumber value={latestRevenue} prefix="$" />
            <span className="chart-card__summary-caption">Dernier relevé</span>
          </p>
        </div>
        <div className="period-switch" role="group" aria-label="Période du graphique des revenus">
          {periods.map((option) => (
            <button
              key={option}
              className={period === option ? "period-switch__active" : ""}
              type="button"
              aria-pressed={period === option}
              onClick={() => setPeriod(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="revenue-chart">
        <AnimatePresence mode="wait">
          <motion.div
            key={period}
            className="chart-motion-layer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 4, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.34} />
                    <stop offset="92%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="var(--line)" strokeDasharray="4 6" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  interval={period === "7j" ? 0 : period === "30j" ? 5 : 4}
                  tick={{ fill: "var(--subtle)", fontSize: 10 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--subtle)", fontSize: 10 }}
                  tickFormatter={(value: number) => `$${Math.round(value / 1000)}k`}
                />
                <Tooltip
                  cursor={{ stroke: "rgba(124, 58, 237, .4)", strokeDasharray: "4 4" }}
                  contentStyle={{ background: "var(--surface-raised)", border: "1px solid var(--line)", borderRadius: 10, color: "var(--foreground)" }}
                  labelStyle={{ color: "var(--muted)", marginBottom: 4 }}
                  formatter={(value) => [`$${Number(value).toLocaleString("fr-FR")}`, "Revenus"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#9b72f2"
                  strokeWidth={2.5}
                  fill="url(#revenueFill)"
                  activeDot={{ r: 5, fill: "#c4b5fd", stroke: "#7c3aed", strokeWidth: 3 }}
                  dot={(dotProps) => {
                    if (
                      dotProps.index !== chartData.length - 1 ||
                      typeof dotProps.cx !== "number" ||
                      typeof dotProps.cy !== "number"
                    ) {
                      return null;
                    }

                    return (
                      <g aria-hidden="true">
                        <circle className="revenue-chart__pulse" cx={dotProps.cx} cy={dotProps.cy} r={8} />
                        <circle className="revenue-chart__point" cx={dotProps.cx} cy={dotProps.cy} r={3.5} />
                      </g>
                    );
                  }}
                  style={{ filter: "drop-shadow(0 0 5px rgba(155, 114, 242, 0.55))" }}
                  animationDuration={650}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    </BentoCard>
  );
}