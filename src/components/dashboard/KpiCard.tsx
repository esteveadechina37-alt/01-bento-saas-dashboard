import { ArrowDownRight, ArrowUpRight, MousePointer2, UsersRound, Wallet } from "lucide-react";
import type { Kpi } from "@/types";
import { cn } from "@/lib/cn";
import { BentoCard } from "@/components/ui/BentoCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

const iconByKpi = {
  revenue: Wallet,
  users: UsersRound,
  conversion: MousePointer2,
};

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const Icon = iconByKpi[kpi.id as keyof typeof iconByKpi] ?? Wallet;
  const isPositive = kpi.trend === "up";
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <BentoCard className="kpi-card" glow>
      <div className="kpi-card__top">
        <span className={cn("metric-icon", `metric-icon--${kpi.id}`)}><Icon size={17} aria-hidden="true" /></span>
        <span className={cn("metric-delta", isPositive ? "metric-delta--positive" : "metric-delta--negative")}>
          <TrendIcon size={14} aria-hidden="true" />
          {kpi.delta}%
        </span>
      </div>
      <p className="kpi-card__label">{kpi.label}</p>
      <p className="kpi-card__value">
        <AnimatedNumber value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} decimals={kpi.id === "conversion" ? 2 : 0} />
      </p>
      <p className="kpi-card__comparison">vs. période précédente</p>
    </BentoCard>
  );
}