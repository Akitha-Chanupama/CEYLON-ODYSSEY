"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Info, Map, Menu, Sparkles, X } from "lucide-react";

const QUICK_MENU_ITEMS = [
  {
    label: "Route & Destination Map",
    description: "Stylized Sri Lanka schematic & GPS links",
    href: "/map",
    icon: Map,
  },
  {
    label: "Saved Places",
    description: "Your personal island bookmarks",
    href: "/saved",
    icon: Heart,
  },
  {
    label: "The Ravana Trail",
    description: "Five sacred Ramayana stops & lore",
    href: "/ravana-trail",
    icon: Sparkles,
  },
  {
    label: "Guest Welcome & Orientation",
    description: "Trip notes, principles & seven-day arc",
    href: "/welcome",
    icon: Info,
  },
];

/**
 * Refined deep-emerald mobile top app bar with Ceylon compass crest and a single
 * concise navigation drawer toggle. Detail routes (/day, /places) use dedicated back bars.
 */
export function MobileHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Detail views provide their own sticky back-navigation bar
  if (pathname.startsWith("/day/") || pathname.startsWith("/places/")) {
    return null;
  }

  return (
    <div className="md:hidden sticky top-0 z-40">
      <header className="relative bg-gradient-to-r from-forest-dark via-forest-deep to-[#134E41] text-white shadow-[0_8px_24px_-10px_rgba(9,30,26,0.5)]">
        {/* Subtle antique-gold botanical hairline along bottom edge */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-antique-gold/15 via-antique-gold/75 to-antique-gold/15"
        />

        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/" className="tap-row flex items-center gap-3 min-w-0 group">
            {/* Signature Ceylon Compass Medallion Crest */}
            <span
              aria-hidden="true"
              className="w-10 h-10 rounded-full bg-white/10 border border-antique-gold/55 shadow-inner flex items-center justify-center shrink-0 group-hover:bg-white/15 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-antique-gold-light"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="8.5" strokeOpacity="0.6" />
                <path
                  d="M12 2.5 L14.1 9.9 L21.5 12 L14.1 14.1 L12 21.5 L9.9 14.1 L2.5 12 L9.9 9.9 Z"
                  fill="currentColor"
                  fillOpacity="0.22"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
              </svg>
            </span>

            <div className="min-w-0">
              <span className="block font-serif text-[21px] font-semibold text-white leading-none tracking-tight truncate">
                Discover Sri Lanka
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-antique-gold-light/95 mt-1 truncate">
                Dec 21 – 27 · Ceylon Odyssey
              </span>
            </div>
          </Link>

          {/* Single refined quick-menu trigger icon */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-concierge-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`tap-target flex items-center justify-center w-11 h-11 rounded-full border transition-all shrink-0 ${
              menuOpen
                ? "bg-antique-gold text-forest-dark border-antique-gold-light shadow-sm"
                : "bg-white/10 text-white border-white/20 hover:bg-white/18 hover:border-antique-gold/50"
            }`}
          >
            {menuOpen ? <X size={19} strokeWidth={2.2} /> : <Menu size={19} strokeWidth={2} />}
          </button>
        </div>
      </header>

      {/* Dropdown Concierge Menu Sheet */}
      {menuOpen && (
        <>
          <div
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-[66px] z-30 bg-forest-dark/45 backdrop-blur-[2px]"
          />
          <nav
            id="mobile-concierge-menu"
            aria-label="Quick Companion Links"
            className="absolute left-0 right-0 z-40 px-3 pt-2"
          >
            <div className="max-w-lg mx-auto rounded-2xl bg-forest-deep border border-antique-gold/35 shadow-elevated p-2 space-y-1">
              {QUICK_MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`tap-row flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                      active
                        ? "bg-white/15 text-white border border-antique-gold/40"
                        : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        active
                          ? "bg-antique-gold text-forest-dark"
                          : "bg-white/10 text-antique-gold-light"
                      }`}
                    >
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <span className="block text-sm font-semibold leading-tight text-white">
                        {item.label}
                      </span>
                      <span className="block text-[11px] text-white/70 mt-0.5 truncate">
                        {item.description}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
