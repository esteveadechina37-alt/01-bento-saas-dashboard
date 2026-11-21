"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import type { Theme } from "@/types";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "bento-dashboard-theme";

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
}

function subscribeToTheme(onChange: () => void) {
  function syncTheme() {
    document.documentElement.dataset.theme = getThemeSnapshot();
    onChange();
  }

  window.addEventListener("storage", syncTheme);
  window.addEventListener("bento-theme-change", syncTheme);
  return () => {
    window.removeEventListener("storage", syncTheme);
    window.removeEventListener("bento-theme-change", syncTheme);
  };
}

function toggleTheme() {
  const nextTheme = getThemeSnapshot() === "dark" ? "light" : "dark";
  window.localStorage.setItem(STORAGE_KEY, nextTheme);
  document.documentElement.dataset.theme = nextTheme;
  window.dispatchEvent(new Event("bento-theme-change"));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, (): Theme => "dark");

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme doit être utilisé dans ThemeProvider.");
  }
  return context;
}