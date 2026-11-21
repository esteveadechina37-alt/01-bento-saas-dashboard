import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { activityByDay } from "@/lib/mock-data";
import { BentoCard } from "@/components/ui/BentoCard";

export function UserActivityChart() {
  return (
    <BentoCard className="chart-card activity-card">
      <div className="chart-card__header chart-card__header--compact">
        <div>
          <p className="card-kicker">ENGAGEMENT</p>
          <h2>Activité</h2>
        </div>
        <span className="chart-period-label">Cette semaine</span>
      </div>
      <div className="activity-legend">
        <span><i className="legend-dot legend-dot--violet" />Nouveaux</span>
        <span><i className="legend-dot legend-dot--cyan" />Récurrents</span>
      </div>
      <div className="activity-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activityByDay} margin={{ top: 8, right: -14, left: -24, bottom: 0 }} barGap={4}>
            <CartesianGrid vertical={false} stroke="var(--line)" strokeDasharray="4 6" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--subtle)", fontSize: 10 }} dy={8} />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "rgba(124, 58, 237, .08)" }}
              contentStyle={{ background: "var(--surface-raised)", border: "1px solid var(--line)", borderRadius: 10, color: "var(--foreground)" }}
            />
            <Bar dataKey="newUsers" name="Nouveaux" fill="#7c3aed" radius={[4, 4, 0, 0]} maxBarSize={12} animationDuration={900} />
            <Bar dataKey="returning" name="Récurrents" fill="#22d3ee" radius={[4, 4, 0, 0]} maxBarSize={12} animationDuration={1100} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="activity-total"><strong>3,460</strong><span>interactions cette semaine</span></div>
    </BentoCard>
  );
}