import { ArrowRight, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/lib/mock-data";
import { BentoCard } from "@/components/ui/BentoCard";

export function ProjectStatusCard() {
  return (
    <BentoCard id="projects" className="projects-card">
      <div className="projects-card__header">
        <div><p className="card-kicker">EN COURS</p><h2>Projets</h2></div>
        <button className="icon-button projects-more" type="button" aria-label="Plus d’options sur les projets">
          <MoreHorizontal size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <div className="project-row" key={project.id}>
            <div className="project-row__top">
              <div className="project-row__identity">
                <span className={`project-mark project-mark--${project.color}`} aria-hidden="true">{project.name.slice(0, 1)}</span>
                <span className="project-row__copy"><strong>{project.name}</strong><small>{project.category}</small></span>
              </div>
              <span className="project-row__progress-label">{project.progress}%</span>
            </div>
            <div className="progress-track" role="progressbar" aria-label={`Avancement de ${project.name}`} aria-valuenow={project.progress} aria-valuemin={0} aria-valuemax={100}>
              <motion.span
                className={`progress-fill progress-fill--${project.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="projects-link" type="button">Tous les projets <ArrowRight size={14} aria-hidden="true" /></button>
    </BentoCard>
  );
}