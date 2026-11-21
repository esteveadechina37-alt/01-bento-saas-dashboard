import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar__heading">
        <p className="eyebrow">SAMEDI 21 NOVEMBRE 2026</p>
        <h1>Vue d’ensemble</h1>
      </div>
      <div className="topbar__actions">
        <label className="search-box">
          <Search size={16} aria-hidden="true" />
          <input type="search" aria-label="Rechercher dans le dashboard" placeholder="Rechercher" />
          <kbd>⌘ K</kbd>
        </label>
        <button className="icon-button notification-button" type="button" aria-label="Notifications, 3 non lues">
          <Bell size={18} aria-hidden="true" />
          <span className="notification-dot" aria-hidden="true" />
        </button>
        <ThemeToggle />
        <button className="topbar-avatar" type="button" aria-label="Profil de Julie David">JD</button>
      </div>
    </header>
  );
}