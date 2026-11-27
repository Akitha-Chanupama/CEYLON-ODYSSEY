import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, PhoneCall, ShieldCheck } from "lucide-react";

const JOURNEY_LINKS = [
  { label: "Today's Plan", href: "/" },
  { label: "7-Day Overview", href: "/journey" },
  { label: "Highlands & Sita (Day 5)", href: "/day/2026-12-25" },
  { label: "Route Schematic", href: "/map" },
];

const COLLECTION_LINKS = [
  { label: "Explore 19 Places", href: "/explore" },
  { label: "The Ravana Trail", href: "/ravana-trail" },
  { label: "Saved Places", href: "/saved" },
  { label: "Guest Welcome", href: "/welcome" },
];

/**
 * Rich botanical-emerald editorial footer matching the top app bar crest,
 * providing grouped navigation, quick road essentials, and safe dock spacing.
 */
export function SiteFooter() {
  return (
    <footer className="relative bg-gradient-to-b from-forest-deep via-forest-dark to-[#061512] text-white pt-10 md:pt-12 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-10">
      {/* Signature antique-gold top hairline matching MobileHeader & SiteHeader */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-antique-gold/15 via-antique-gold/80 to-antique-gold/15"
      />

      <div className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand Crest & Route Summary */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
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
                <span className="block font-serif text-2xl font-semibold text-white leading-none tracking-tight">
                  Discover Sri Lanka
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-antique-gold-light mt-1">
                  Dec 21 – 27, 2026 · Ceylon Odyssey
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/75 leading-relaxed max-w-md">
              A private island travel companion crafted for two guests—pairing daily schedules and verified heritage scholarship with Sri Lanka&apos;s living Ramayana landmarks.
            </p>

            <div className="inline-flex items-start sm:items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.08] border border-white/15 text-xs text-white/90">
              <MapPin size={14} className="text-antique-gold-light shrink-0 mt-0.5 sm:mt-0" />
              <span>
                Katunayake → Sigiriya → Kandy → Nuwara Eliya → Ella → Unawatuna
              </span>
            </div>
          </div>

          {/* Navigation Directory */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-antique-gold-light">
                The Journey
              </h2>
              <ul className="space-y-1.5">
                {JOURNEY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center py-1 text-xs sm:text-[13px] font-medium text-white/80 hover:text-antique-gold-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-antique-gold-light">
                Collections
              </h2>
              <ul className="space-y-1.5">
                {COLLECTION_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center py-1 text-xs sm:text-[13px] font-medium text-white/80 hover:text-antique-gold-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Assistance & Editorial Guarantee */}
          <div className="md:col-span-3">
            <div className="rounded-2xl bg-white/[0.07] border border-white/15 p-4 space-y-3.5">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-antique-gold-light">
                <PhoneCall size={13} />
                <span>Road Support (Sri Lanka)</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="tel:1990"
                  className="tap-row px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors flex flex-col justify-center"
                >
                  <span className="text-[10px] text-white/70">Ambulance</span>
                  <span className="font-bold text-white tracking-wide">1990</span>
                </a>
                <a
                  href="tel:1912"
                  className="tap-row px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors flex flex-col justify-center"
                >
                  <span className="text-[10px] text-white/70">Tourist Police</span>
                  <span className="font-bold text-white tracking-wide">1912</span>
                </a>
              </div>

              <Link
                href="/essentials"
                className="tap-row w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-ivory text-forest-deep text-xs font-semibold hover:bg-sage transition-colors"
              >
                <span>Etiquette &amp; Packing</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="mt-8 pt-5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/70">
          <div className="inline-flex items-center gap-2">
            <ShieldCheck size={14} className="text-antique-gold shrink-0" />
            <span>
              Ayubowan · Asia/Colombo (UTC+5:30) · Private Two-Guest Edition
            </span>
          </div>
          <span>
            Verified historical sources · Attributed Commons imagery
          </span>
        </div>
      </div>
    </footer>
  );
}
