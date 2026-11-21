export type Theme = "dark" | "light";

export type Kpi = {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta: number;
  trend: "up" | "down";
};

export type RevenuePoint = {
  date: string;
  value: number;
};

export type RevenuePeriod = "7j" | "30j" | "90j";

export type Project = {
  id: string;
  name: string;
  category: string;
  progress: number;
  color: string;
  status: string;
};

export type Insight = {
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
};