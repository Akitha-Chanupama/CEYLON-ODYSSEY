import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Route Map", href: "/map" },
  { label: "Ravana Trail", href: "/ravana-trail" },
  { label: "Saved Places", href: "/saved" },
  { label: "Essentials", href: "/essentials" },
  { label: "Guest Welcome", href: "/welcome" },
];

/**
 * Editorial footer with safe mobile dock spacing and direct access to utility routes.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-line/80 bg-mist/55 pt-8 pb-safe">
      <div className="app-container flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-forest">
            <Compass size={16} className="text-antique-gold" />
            <span className="font-serif text-lg font-semibold text-ink tracking-tight">
              Discover Sri Lanka
            </span>
          </div>
          <p className="text-xs text-muted">
            Dec 21 – 27, 2026 · Asia/Colombo · Private two-guest edition
          </p>
        </div>

        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-muted hover:text-forest transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
