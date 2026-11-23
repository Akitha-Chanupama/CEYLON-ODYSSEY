"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Badge } from "@/components/common/Badge";
import { days } from "@/content/days";
import { places } from "@/content/places";
import { mediaRecords } from "@/content/media";
import { formatTourDate, getSriLankaDateString, getActiveTourDay } from "@/lib/dates";
import { getGoogleMapsUrl } from "@/lib/navigation";
import {
  Compass,
  Navigation,
  ChevronRight,
  Clock,
  Sparkles,
  Calendar,
  AlertTriangle,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function TodayPage() {
  // Determine real-time tour day in Asia/Colombo or default to first day
  const todayColombo = getSriLankaDateString();
  const activeDayInfo = getActiveTourDay(todayColombo);

  // Allow guest to switch between days 1-7 for previewing
  const [selectedDayIndex, setSelectedDayIndex] = useState(
    activeDayInfo.day.dayNumber - 1
  );

  const currentDay = days[selectedDayIndex];
  const heroMedia = currentDay.heroMediaId
    ? mediaRecords[currentDay.heroMediaId]
    : mediaRecords["hero-sri-lanka"];

  // Find next primary stop
  const primaryStop = currentDay.stops[0];
  const nextPlace = primaryStop ? places[primaryStop.placeId] : null;

  return (
    <div className="min-h-screen bg-ivory">
      <MobileHeader />

      <div className="mobile-container pt-3 pb-8 space-y-5">
        {/* Day selector pills */}
        <section aria-label="Day selection" className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          {days.map((d, idx) => {
            const isSelected = idx === selectedDayIndex;
            return (
              <button
                key={d.date}
                onClick={() => setSelectedDayIndex(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all select-none ${
                  isSelected
                    ? "bg-forest text-white shadow-sm"
                    : "bg-sage/50 text-muted hover:bg-sage hover:text-ink"
                }`}
              >
                Day {d.dayNumber} · {d.date.slice(5)}
              </button>
            );
          })}
        </section>

        {/* Hero Card */}
        <div className="relative rounded-card overflow-hidden shadow-card border border-line/60 bg-forest-deep text-white">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={heroMedia.src}
              alt={heroMedia.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 480px) 100vw, 480px"
            />
            {/* Gradient protection */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-antique-gold/90 text-ink text-[11px] font-bold uppercase tracking-wider">
                Day {currentDay.dayNumber} of 7
              </span>
              <span className="text-xs text-ivory/80 font-medium">
                {formatTourDate(currentDay.date)}
              </span>
            </div>

            <h2 className="text-2xl font-serif font-bold text-white leading-tight">
              {currentDay.title}
            </h2>

            <p className="text-xs text-ivory/90 flex items-center gap-1 font-medium">
              <MapPin size={13} className="text-antique-gold" />
              {currentDay.from} → {currentDay.to}
            </p>

            <p className="text-xs text-ivory/85 line-clamp-2 leading-relaxed pt-1">
              {currentDay.teaser}
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href={`/day/${currentDay.date}`}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-forest text-white font-medium text-xs shadow-sm hover:bg-forest-light transition-colors"
          >
            <Calendar size={15} />
            <span>View Day&apos;s Route</span>
          </Link>

          <Link
            href="/ravana-trail"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sage text-forest font-medium text-xs border border-line hover:bg-white transition-colors"
          >
            <Sparkles size={15} className="text-antique-gold" />
            <span>The Ravana Trail</span>
          </Link>
        </div>

        {/* Priority Next Stop Card */}
        {nextPlace && (
          <section className="bg-white rounded-card p-4 shadow-card border border-line/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-muted">
                First Scheduled Stop
              </span>
              <Badge type={primaryStop.priority} />
            </div>

            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-ink">
                  {nextPlace.title}
                </h3>
                <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                  <Clock size={12} />
                  <span>
                    {primaryStop.approximatePartOfDay
                      ? primaryStop.approximatePartOfDay.toUpperCase()
                      : "TIME TBC"}
                  </span>
                  <span>· {nextPlace.region}</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-ink/80 leading-relaxed">
              {nextPlace.shortIntro}
            </p>

            <div className="pt-1 flex items-center justify-between border-t border-line/60">
              <Link
                href={`/places/${nextPlace.slug}`}
                className="text-xs font-semibold text-forest hover:text-forest-light flex items-center gap-1 py-1"
              >
                <span>Read Story & Details</span>
                <ChevronRight size={14} />
              </Link>

              <a
                href={getGoogleMapsUrl(nextPlace.mapQuery, nextPlace.latitude, nextPlace.longitude)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sage/80 hover:bg-sage text-forest text-xs font-semibold transition-colors"
              >
                <Navigation size={13} />
                <span>Navigate</span>
              </a>
            </div>
          </section>
        )}

        {/* Today's Journey Timeline */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-ink tracking-tight">
              Today&apos;s Tour Sequence ({currentDay.stops.length} stops)
            </h3>
            <span className="text-[11px] text-muted">Order of visit</span>
          </div>

          <div className="space-y-2">
            {currentDay.stops.map((stop, idx) => {
              const place = places[stop.placeId];
              if (!place) return null;
              return (
                <div
                  key={stop.id}
                  className="bg-white rounded-xl p-3 border border-line/70 shadow-sm flex items-start gap-3"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-forest/10 text-forest text-xs font-bold mt-0.5 shrink-0">
                    {idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-ink truncate">
                        {place.title}
                      </h4>
                      <Badge type={stop.priority} />
                    </div>

                    <p className="text-[11px] text-muted truncate mt-0.5">
                      {place.region}
                    </p>

                    {stop.guestNote && (
                      <p className="text-[11px] text-ink/75 mt-1 leading-snug">
                        {stop.guestNote}
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/places/${place.slug}`}
                    className="p-1.5 text-muted hover:text-forest transition-colors self-center"
                    aria-label={`View ${place.title}`}
                  >
                    <ChevronRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Travel Note & Road Planning Warning */}
        {currentDay.estimatedRoadTransfer && (
          <div className="rounded-xl bg-warning-bg/70 p-3.5 border border-[#EED7B0] flex items-start gap-2.5 text-xs text-warning-text leading-relaxed">
            <AlertTriangle size={16} className="shrink-0 mt-0.5 text-antique-gold" />
            <div>
              <span className="font-bold">Road Planning Estimate: </span>
              {currentDay.estimatedRoadTransfer}
            </div>
          </div>
        )}

        {/* Footer Guidance */}
        <p className="text-center text-[11px] text-muted pt-2 pb-4">
          Timings and road conditions may vary. Reconfirm specific daily arrangements with your host.
        </p>
      </div>
    </div>
  );
}
