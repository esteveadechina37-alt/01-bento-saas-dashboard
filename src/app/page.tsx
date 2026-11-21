"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine, Check } from "lucide-react";
import { AiInsightsCard } from "@/components/dashboard/AiInsightsCard";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ProjectStatusCard } from "@/components/dashboard/ProjectStatusCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { UserActivityChart } from "@/components/dashboard/UserActivityChart";
import { kpis } from "@/lib/mock-data";

const gridVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

export default function Home() {
  return (
    <div className="app-shell" id="overview">
      <Sidebar />
      <main className="main-column">
        <div className="page-content">
          <Topbar />
          <section className="welcome-row" aria-label="Résumé du workspace">
            <div>
              <p className="card-kicker">VOTRE ESPACE, EN UN COUP D’ŒIL</p>
              <h2>Bonjour, Julie <span aria-hidden="true">✦</span></h2>
              <p className="welcome-row__description">Voici les performances de votre workspace cette semaine.</p>
            </div>
            <div className="welcome-row__status"><span><Check size={13} aria-hidden="true" /></span>Tout est à jour</div>
          </section>

          <motion.section
            className="bento-grid"
            aria-label="Indicateurs et rapports"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {kpis.map((kpi) => <KpiCard key={kpi.id} kpi={kpi} />)}
            <AiInsightsCard />
            <RevenueChart />
            <UserActivityChart />
            <ProjectStatusCard />
          </motion.section>

          <footer className="dashboard-footer">
            <span>© 2026 Forma Studio</span>
            <span className="footer-status"><i /> Tous les systèmes sont opérationnels</span>
            <button type="button" aria-label="Télécharger le rapport de performance">
              <ArrowDownToLine size={14} aria-hidden="true" /> Exporter le rapport
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}
