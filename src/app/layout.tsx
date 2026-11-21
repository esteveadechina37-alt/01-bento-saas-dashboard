import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/hooks/useTheme";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Overview | Forma",
  description: "Votre espace de pilotage pour suivre les performances et les projets.",
};

const themeScript = `try{var t=localStorage.getItem("bento-dashboard-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch{document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <body>
        <Script id="theme-preference" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
