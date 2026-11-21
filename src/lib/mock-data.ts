import type { Insight, Kpi, Project, RevenuePeriod, RevenuePoint } from "@/types";

export const kpis: Kpi[] = [
  {
    id: "revenue",
    label: "Revenus totaux",
    value: 48294,
    prefix: "$",
    delta: 12.8,
    trend: "up",
  },
  {
    id: "users",
    label: "Utilisateurs actifs",
    value: 8421,
    delta: 8.2,
    trend: "up",
  },
  {
    id: "conversion",
    label: "Taux de conversion",
    value: 6.24,
    suffix: "%",
    delta: 2.4,
    trend: "up",
  },
];

const sevenDayValues = [2850, 3420, 3160, 3980, 3620, 4410, 4820];
const thirtyDayValues = [
  1840, 2260, 1980, 2840, 2520, 3160, 2940, 3520, 3180, 3860,
  3420, 4180, 3760, 4520, 3980, 4680, 4260, 4920, 4480, 5160,
  4720, 5480, 4960, 5720, 5280, 6040, 5520, 6280, 5840, 6620,
];
const ninetyDayValues = Array.from({ length: 30 }, (_, index) => {
  const baseline = 1900 + index * 138;
  const wave = [0, 220, -90, 310, -160, 140][index % 6];
  return baseline + wave;
});

function makeRevenuePoints(values: number[], intervalDays: number): RevenuePoint[] {
  const today = new Date("2026-11-21T12:00:00Z");
  return values.map((value, index) => {
    const daysAgo = (values.length - index - 1) * intervalDays;
    const date = new Date(today);
    date.setUTCDate(date.getUTCDate() - daysAgo);
    return {
      date: date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" }),
      value,
    };
  });
}

export const revenueByPeriod: Record<RevenuePeriod, RevenuePoint[]> = {
  "7j": makeRevenuePoints(sevenDayValues, 1),
  "30j": makeRevenuePoints(thirtyDayValues, 1),
  "90j": makeRevenuePoints(ninetyDayValues, 3),
};

export const activityByDay = [
  { day: "Lun", newUsers: 420, returning: 280 },
  { day: "Mar", newUsers: 570, returning: 360 },
  { day: "Mer", newUsers: 490, returning: 330 },
  { day: "Jeu", newUsers: 680, returning: 410 },
  { day: "Ven", newUsers: 610, returning: 390 },
  { day: "Sam", newUsers: 790, returning: 470 },
  { day: "Dim", newUsers: 720, returning: 440 },
];

export const projects: Project[] = [
  { id: "pulse", name: "Pulse Analytics", category: "Product design", progress: 82, color: "violet", status: "En cours" },
  { id: "orbit", name: "Orbit Mobile App", category: "Développement", progress: 64, color: "cyan", status: "En cours" },
  { id: "northstar", name: "Northstar CRM", category: "Intégration", progress: 45, color: "green", status: "En cours" },
  { id: "canvas", name: "Canvas Studio", category: "Identité visuelle", progress: 91, color: "pink", status: "En revue" },
];

export const aiInsight: Insight = {
  title: "Votre croissance prend de l’élan",
  description:
    "Les revenus récurrents ont progressé de 18 % ce mois-ci. Le segment Équipes convertit particulièrement bien depuis le lancement de votre nouvelle page tarifaire.",
  metric: "+18.4%",
  metricLabel: "revenus récurrents",
};