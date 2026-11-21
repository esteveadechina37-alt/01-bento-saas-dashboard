"use client";

import { useState } from "react";
import {
  Activity,
  ChevronLeft,
  CircleHelp,
  FolderKanban,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Sparkles,
  Settings2,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";

const navigation = [
  { label: "Dashboard", href: "#overview", icon: LayoutDashboard },
  { label: "Analytics", href: "#analytics", icon: Activity },
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "Settings", href: "#settings", icon: Settings2 },
  { label: "Help center", href: "#help", icon: CircleHelp },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <>
      <button
        className="icon-button mobile-menu-trigger"
        type="button"
        aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((open) => !open)}
      >
        {mobileOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
      </button>
      {mobileOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Fermer la navigation"
          onClick={closeMobileMenu}
        />
      )}
      <aside
        className={cn("sidebar", collapsed && "sidebar--collapsed", mobileOpen && "sidebar--open")}
        aria-label="Navigation principale"
      >
        <div className="sidebar__topline">
          <a className="brand" href="#overview" aria-label="Forma, accueil">
            <span className="brand__mark" aria-hidden="true">f</span>
            <span className="brand__name">forma<span>.</span></span>
          </a>
          <button
            className="icon-button sidebar__collapse"
            type="button"
            aria-label={collapsed ? "Développer la barre latérale" : "Réduire la barre latérale"}
            title={collapsed ? "Développer" : "Réduire"}
            onClick={() => setCollapsed((value) => !value)}
          >
            <ChevronLeft size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="workspace-switcher">
          <span className="workspace-switcher__avatar">S</span>
          <span className="workspace-switcher__copy"><strong>Studio North</strong><small>Workspace</small></span>
          <button className="workspace-switcher__more" type="button" aria-label="Options de Studio North">
            <MoreHorizontal size={17} aria-hidden="true" />
          </button>
        </div>

        <p className="sidebar__label">Workspace</p>
        <nav className="sidebar__nav">
          {navigation.map(({ label, href, icon: Icon }, index) => (
            <a
              key={label}
              className={cn("nav-link", index === 0 && "nav-link--active")}
              href={href}
              aria-current={index === 0 ? "page" : undefined}
              title={collapsed ? label : undefined}
              onClick={closeMobileMenu}
            >
              <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>{label}</span>
              {label === "Projects" && <span className="nav-link__count">4</span>}
            </a>
          ))}
        </nav>

        <div className="sidebar__bottom">
          <div className="sidebar__upgrade">
            <span className="upgrade-spark"><Sparkles size={15} aria-hidden="true" /></span>
            <strong>Passer à Pro</strong>
            <span>Débloquez tous les outils</span>
            <button type="button" onClick={closeMobileMenu}>Découvrir le plan <span aria-hidden="true">↗</span></button>
          </div>
          <button className="profile-row" type="button" aria-label="Ouvrir le profil de Julie David">
            <span className="profile-avatar">JD</span>
            <span className="profile-copy"><strong>Julie David</strong><small>Admin</small></span>
            <span className="profile-more" aria-hidden="true"><MoreHorizontal size={17} /></span>
          </button>
        </div>
      </aside>
    </>
  );
}