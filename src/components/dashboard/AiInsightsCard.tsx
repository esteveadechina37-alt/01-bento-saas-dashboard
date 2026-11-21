import { ArrowUpRight, Sparkles } from "lucide-react";
import { aiInsight } from "@/lib/mock-data";
import { BentoCard } from "@/components/ui/BentoCard";

export function AiInsightsCard() {
  return (
    <BentoCard className="insight-card" glow>
      <div className="insight-card__glow" aria-hidden="true" />
      <div className="insight-card__heading">
        <span className="insight-icon"><Sparkles size={17} aria-hidden="true" /></span>
        <span className="insight-label">INSIGHT IA</span>
        <span className="insight-live"><i /> LIVE</span>
      </div>
      <p className="insight-card__metric">{aiInsight.metric}</p>
      <p className="insight-card__metric-label">{aiInsight.metricLabel}</p>
      <h2>{aiInsight.title}</h2>
      <p className="insight-card__description">{aiInsight.description}</p>
      <button className="insight-link" type="button" aria-label="Voir l’analyse complète">
        Voir l’analyse <ArrowUpRight size={15} aria-hidden="true" />
      </button>
    </BentoCard>
  );
}