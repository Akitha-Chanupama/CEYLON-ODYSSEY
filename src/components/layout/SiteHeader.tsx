"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";

const NAV_LINKS = [
  {
    label: "Today",
    href: "/",
    isActive: (pathname: string) => pathname === "/",
  },
  {
    label: "Journey",
    href: "/journey",
    isActive: (pathname: string) =>
      pathname.startsWith("/journey") || pathname.startsWith("/day"),
  },
  {
    label: "Explore",
    href: "/explore",
    isActive: (pathname: string) =>
      pathname.startsWith("/explore") || pathname.startsWith("/places"),
  },
  {
    label: "Ravana Trail",
    href: "/ravana-trail",
    isActive: (pathname: string) => pathname.startsWith("/ravana-trail"),
  },
  {
    label: "Route Map",
    href: "/map",
    isActive: (pathname: string) => pathname.startsWith("/map"),
  },
  {
    label: "Essentials",
    href: "/essentials",
    isActive: (pathname: string) => pathname.startsWith("/essentials"),
  },
];

/**
 * Desktop top app bar in signature Botanical Emerald with Ceylon compass crest
 * and single Saved collection action, matching MobileHeader's refinement.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isSaved = pathname.startsWith("/saved");

  return (
    <header className="hidden md:block sticky top-0 z-40 relative bg-gradient-to-r from-forest-dark via-forest-deep to-[#134E41] text-white shadow-[0_8px_28px_-12px_rgba(9,30,26,0.45)]">
      {/* Subtle antique-gold hairline along bottom edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-antique-gold/15 via-antique-gold/75 to-antique-gold/15"
      />

      <div className="app-container h-[68px] flex items-center justify-between gap-4">
        <Link href="/" className="tap-row flex items-center gap-3 shrink-0 group">
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

          <div>
            <span className="block font-serif text-[21px] font-semibold text-white leading-none tracking-tight">
              Discover Sri Lanka
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-antique-gold-light/95 mt-1">
              Dec 21 – 27 · Ceylon Odyssey
            </span>
          </div>
        </Link>

        <nav aria-label="Primary Navigation" className="flex items-center gap-1 lg:gap-1.5">
          {NAV_LINKS.map((item) => {
            const active = item.isActive(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`tap-row inline-flex items-center px-3 lg:px-3.5 py-2 rounded-full text-xs lg:text-[13px] font-semibold transition-all whitespace-nowrap ${
                  active
                    ? "bg-ivory text-forest-deep shadow-sm"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Single right-side Saved action */}
        <Link
          href="/saved"
          aria-current={isSaved ? "page" : undefined}
          aria-label="Saved Places"
          title="Saved Places"
          className={`tap-row inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors shrink-0 ${
            isSaved
              ? "bg-antique-gold text-forest-dark border-antique-gold-light shadow-sm"
              : "bg-white/10 text-white border-white/20 hover:bg-white/18 hover:border-antique-gold/50"
          }`}
        >
          <Heart
            size={14}
            className={isSaved ? "fill-forest-dark text-forest-dark" : "text-antique-gold-light"}
          />
          <span className="hidden lg:inline">Saved</span>
        </Link>
      </div>
    </header>
  );
}
