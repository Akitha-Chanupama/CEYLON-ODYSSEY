"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Heart, Info } from "lucide-react";

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
 * Editorial desktop navigation bar displayed at md+ breakpoints while mobile
 * viewports use MobileHeader and BottomTabBar.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isSaved = pathname.startsWith("/saved");
  const isWelcome = pathname.startsWith("/welcome");

  return (
    <header className="hidden md:block sticky top-0 z-40 bg-ivory/92 backdrop-blur-md border-b border-line/80">
      <div className="app-container h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="tap-row flex items-center gap-2.5 shrink-0 group"
        >
          <span className="w-9 h-9 rounded-full bg-forest text-white flex items-center justify-center shadow-sm group-hover:bg-forest-light transition-colors">
            <Compass size={18} className="text-antique-gold-light" />
          </span>
          <div>
            <span className="block font-serif text-xl font-semibold text-ink leading-none tracking-tight">
              Discover Sri Lanka
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-antique-gold-dark mt-0.5">
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
                className={`tap-row inline-flex items-center px-3 lg:px-3.5 py-2 rounded-full text-xs lg:text-[13px] font-semibold transition-colors whitespace-nowrap ${
                  active
                    ? "bg-forest text-white shadow-sm"
                    : "text-ink/80 hover:text-forest hover:bg-sage/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 shrink-0">
          <Link
            href="/saved"
            aria-current={isSaved ? "page" : undefined}
            aria-label="Saved Places"
            title="Saved Places"
            className={`tap-row inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-colors ${
              isSaved
                ? "bg-[#F9EFE0] text-antique-gold-dark border-[#E8D0B1]"
                : "bg-white/80 text-ink border-line hover:bg-sage/50"
            }`}
          >
            <Heart
              size={14}
              className={isSaved ? "fill-antique-gold text-antique-gold-dark" : "text-muted"}
            />
            <span className="hidden lg:inline">Saved</span>
          </Link>

          <Link
            href="/welcome"
            aria-current={isWelcome ? "page" : undefined}
            aria-label="Guest Orientation & Welcome"
            title="Guest Orientation & Welcome"
            className={`tap-target inline-flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${
              isWelcome
                ? "bg-forest text-white border-forest"
                : "bg-white/80 text-forest border-line hover:bg-sage/60"
            }`}
          >
            <Info size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
