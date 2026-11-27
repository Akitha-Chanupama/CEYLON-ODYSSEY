"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HeroFrame } from "@/components/common/HeroFrame";
import { Badge } from "@/components/common/Badge";
import { StopTimeline } from "@/components/itinerary/StopTimeline";
import { PlaceCard } from "@/components/common/PlaceCard";
import { days } from "@/content/days";
import { places } from "@/content/places";
import { mediaRecords } from "@/content/media";
import { formatTourDate, getActiveTourDay, getSriLankaDateString } from "@/lib/dates";
import { getGoogleMapsUrl } from "@/lib/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Bed,
  Calendar,
  Compass,
  Luggage,
  MapPin,
  Navigation,
  Sparkles,
} from "lucide-react";

const STATUS_LABELS: Record<"before-trip" | "active-trip" | "after-trip", string> = {
  "before-trip": "Upcoming Journey · Dec 21–27",
  "active-trip": "Live Today · Asia/Colombo",
  "after-trip": "Journey Recap · Dec 21–27",
};

export default function TodayPage() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [tripStatus, setTripStatus] = useState<"before-trip" | "active-trip" | "after-trip">(
    "before-trip"
  );

  useEffect(() => {
    const todayColombo = getSriLankaDateString();
    const activeInfo = getActiveTourDay(todayColombo);
    setSelectedDayIndex(activeInfo.day.dayNumber - 1);
    setTripStatus(activeInfo.status);
  }, []);

  const currentDay = days[selectedDayIndex];
  const heroMedia = currentDay.heroMediaId
    ? mediaRecords[currentDay.heroMediaId]
    : mediaRecords["hero-sri-lanka"];

  const primaryStop = currentDay.stops[0];
  const spotlightPlace = primaryStop ? places[primaryStop.placeId] : null;
  const spotlightMedia =
    spotlightPlace?.heroMediaId ? mediaRecords[spotlightPlace.heroMediaId] : null;

  return (
    <div className="bg-ivory">
      <div className="app-container pt-4 pb-10 md:py-8 space-y-6 md:space-y-8 animate-fade-rise">
        {/* Status & Day Selector Bar */}
        <section aria-label="Day selection" className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-antique-gold-dark">
              <Compass size={13} className="text-antique-gold" />
              <span>{STATUS_LABELS[tripStatus]}</span>
            </span>
            <Link
              href="/journey"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-forest-deep transition-colors"
            >
              <span>Full 7-Day Overview</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {days.map((d, idx) => {
              const isSelected = idx === selectedDayIndex;
              return (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => setSelectedDayIndex(idx)}
                  aria-pressed={isSelected}
                  className={`tap-row px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all select-none border shrink-0 ${
                    isSelected
                      ? "bg-forest text-white border-forest shadow-sm"
                      : "bg-white text-ink/80 border-line hover:border-forest/40 hover:bg-sage-light"
                  }`}
                >
                  Day {d.dayNumber} · {d.date.slice(5)}
                </button>
              );
            })}
          </div>
        </section>

        {/* Bounded Editorial Split Hero */}
        <HeroFrame
          variant="split"
          media={heroMedia}
          fallbackTitle={currentDay.title}
          eyebrow={`Day ${currentDay.dayNumber} of 7 · ${formatTourDate(currentDay.date)}`}
          title={currentDay.title}
          subtitle={`${currentDay.from} → ${currentDay.to} — ${currentDay.teaser}`}
          badges={
            <>
              <Badge
                type={currentDay.operationalStatus === "verified" ? "verified" : "check-again"}
                label={
                  currentDay.operationalStatus === "verified"
                    ? "Verified Sequence"
                    : "Host Reconfirms Live"
                }
              />
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/12 border border-white/20 text-[11px] font-medium text-white/95 max-w-full">
                <MapPin size={11} className="text-antique-gold-light shrink-0" />
                <span className="truncate">{currentDay.regionLabel}</span>
              </span>
            </>
          }
          actions={
            <>
              <Link
                href={`/day/${currentDay.date}`}
                className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-forest text-xs font-semibold shadow-sm hover:bg-sage transition-colors"
              >
                <Calendar size={14} />
                <span>Open Day {currentDay.dayNumber} Route</span>
              </Link>
              <Link
                href="/ravana-trail"
                className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/12 text-white border border-white/25 text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                <Sparkles size={14} className="text-antique-gold-light" />
                <span>Ravana Trail</span>
              </Link>
            </>
          }
        />

        {/* Desktop 2-Column Editorial Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Primary Column: Today's Stop Timeline */}
          <section className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <div>
                <h2 className="font-serif text-2xl sm:text-[28px] font-semibold text-ink tracking-tight">
                  Scheduled Sequence
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  {currentDay.stops.length} curated stops in recommended travel order
                </p>
              </div>
              <Link
                href={`/day/${currentDay.date}`}
                className="tap-row inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest-deep"
              >
                <span>Full Day View</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <StopTimeline
              stops={currentDay.stops}
              placesMap={places}
              mediaMap={mediaRecords}
            />
          </section>

          {/* Companion Column: First Stop Spotlight, Advisories & Practical Notes */}
          <aside className="lg:col-span-4 space-y-5">
            {currentDay.estimatedRoadTransfer && (
              <div className="rounded-card bg-warning-bg/85 p-4 border border-[#EED7B0] flex items-start gap-3 text-xs text-warning-text leading-relaxed shadow-sm">
                <AlertTriangle size={17} className="shrink-0 mt-0.5 text-antique-gold-dark" />
                <div>
                  <p className="font-bold text-warning-text mb-0.5">Road Planning Estimate</p>
                  <p>{currentDay.estimatedRoadTransfer}</p>
                </div>
              </div>
            )}

            {spotlightPlace && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-antique-gold-dark">
                    First Stop Spotlight
                  </span>
                  <a
                    href={getGoogleMapsUrl(
                      spotlightPlace.mapQuery,
                      spotlightPlace.latitude,
                      spotlightPlace.longitude
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:underline"
                  >
                    <Navigation size={12} />
                    <span>Start Navigation</span>
                  </a>
                </div>
                <PlaceCard
                  place={spotlightPlace}
                  media={spotlightMedia}
                  variant="compact"
                />
              </div>
            )}

            <section className="bg-white rounded-card p-5 border border-line/90 shadow-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest">
                <Bed size={15} className="text-antique-gold-dark" />
                <span>Overnight Base</span>
              </div>
              <p className="font-serif text-xl font-semibold text-ink">
                {currentDay.overnightLocation || "Departure Evening"}
              </p>
              <p className="text-xs text-muted leading-relaxed">
                {currentDay.hotelName
                  ? currentDay.hotelName
                  : "Confirmed hotel details and exact check-in timings are shared privately by your accompanying host."}
              </p>
            </section>

            {currentDay.notes.length > 0 && (
              <section className="bg-white rounded-card p-5 border border-line/90 shadow-card space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest">
                  <Luggage size={15} className="text-antique-gold-dark" />
                  <span>Day Preparation</span>
                </div>
                <ul className="space-y-2 text-xs text-ink/85 leading-relaxed">
                  {currentDay.notes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-antique-gold-dark font-bold mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <p className="text-center text-xs text-muted px-2 leading-relaxed">
              Timings and road windows are planning guides; your host confirms live departure times daily.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
