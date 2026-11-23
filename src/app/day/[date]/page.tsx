import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { days } from "@/content/days";
import { places } from "@/content/places";
import { mediaRecords } from "@/content/media";
import { formatTourDate } from "@/lib/dates";
import { getGoogleMapsUrl } from "@/lib/navigation";
import { Badge } from "@/components/common/Badge";
import {
  MapPin,
  Clock,
  Navigation,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Sparkles,
  Luggage,
  Bed,
  Compass,
} from "lucide-react";

export function generateStaticParams() {
  return days.map((day) => ({
    date: day.date,
  }));
}

interface DayPageProps {
  params: Promise<{ date: string }>;
}

export default async function DayDetailPage({ params }: DayPageProps) {
  const { date } = await params;
  const dayIndex = days.findIndex((d) => d.date === date);

  if (dayIndex === -1) {
    notFound();
  }

  const currentDay = days[dayIndex];
  const prevDay = dayIndex > 0 ? days[dayIndex - 1] : null;
  const nextDay = dayIndex < days.length - 1 ? days[dayIndex + 1] : null;

  const heroMedia = currentDay.heroMediaId
    ? mediaRecords[currentDay.heroMediaId]
    : mediaRecords["hero-sri-lanka"];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Top Bar with back link */}
      <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-line/60 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link
            href="/journey"
            className="flex items-center gap-1 text-xs font-semibold text-forest hover:text-forest-light"
          >
            <ChevronLeft size={16} />
            <span>All 7 Days</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-antique-gold">
            Day {currentDay.dayNumber} of 7
          </span>
        </div>
      </header>

      {/* Hero Header */}
      <div className="relative aspect-[16/10] w-full bg-forest-deep">
        <Image
          src={heroMedia.src}
          alt={heroMedia.alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 480px) 100vw, 600px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-antique-gold text-ink text-[11px] font-bold uppercase">
              Day {currentDay.dayNumber}
            </span>
            <span className="text-xs text-ivory/90 font-medium">
              {formatTourDate(currentDay.date)}
            </span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white leading-tight">
            {currentDay.title}
          </h1>
          <p className="text-xs text-ivory/85 flex items-center gap-1 font-medium">
            <MapPin size={12} className="text-antique-gold shrink-0" />
            <span>{currentDay.from} → {currentDay.to}</span>
          </p>
        </div>
      </div>

      <div className="mobile-container py-5 space-y-6">
        {/* Day Teaser */}
        <section className="bg-white rounded-card p-4 border border-line shadow-card space-y-2">
          <h2 className="text-sm font-bold text-ink">Day Summary</h2>
          <p className="text-xs text-ink/80 leading-relaxed">
            {currentDay.teaser}
          </p>
        </section>

        {/* Road Planning Alert */}
        {currentDay.estimatedRoadTransfer && (
          <div className="rounded-xl bg-warning-bg/80 p-3.5 border border-[#EED7B0] flex items-start gap-2.5 text-xs text-warning-text leading-relaxed">
            <AlertTriangle size={16} className="shrink-0 mt-0.5 text-antique-gold" />
            <div>
              <span className="font-bold">Road Planning Estimate: </span>
              {currentDay.estimatedRoadTransfer}
            </div>
          </div>
        )}

        {/* Ordered Tour Stops Timeline */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-ink tracking-tight">
              Tour Sequence ({currentDay.stops.length} Stops)
            </h2>
            <span className="text-[11px] text-muted">Ordered route</span>
          </div>

          <div className="space-y-3">
            {currentDay.stops.map((stop, idx) => {
              const place = places[stop.placeId];
              if (!place) return null;

              const isRavanaTrail = place.tags.includes("Ravana Trail") || place.tags.includes("RAMAYANA_TRADITION");

              return (
                <div
                  key={stop.id}
                  className="bg-white rounded-card p-4 border border-line shadow-card space-y-3"
                >
                  {/* Stop Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-forest text-white text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-ink leading-snug">
                          {place.title}
                        </h3>
                        <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                          <Clock size={12} />
                          <span>
                            {stop.approximatePartOfDay
                              ? stop.approximatePartOfDay.toUpperCase()
                              : "TIME TBC"}
                          </span>
                          <span>· {place.region}</span>
                        </p>
                      </div>
                    </div>
                    <Badge type={stop.priority} />
                  </div>

                  {/* Ravana theme marker */}
                  {isRavanaTrail && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F7EAD7] text-[#7A4B13] text-[11px] font-semibold border border-[#E8D0B1]">
                      <Sparkles size={11} className="text-antique-gold" />
                      <span>Ravana & Ramayana Tradition</span>
                    </div>
                  )}

                  {/* Stop Intro */}
                  <p className="text-xs text-ink/80 leading-relaxed">
                    {place.shortIntro}
                  </p>

                  {/* Host/Guest Note */}
                  {stop.guestNote && (
                    <div className="p-2.5 rounded-lg bg-sage/40 border border-line text-[11px] text-ink/85 italic leading-relaxed">
                      &ldquo;{stop.guestNote}&rdquo;
                    </div>
                  )}

                  {/* Action Links */}
                  <div className="pt-2 flex items-center justify-between border-t border-line/60">
                    <Link
                      href={`/places/${place.slug}`}
                      className="text-xs font-semibold text-forest hover:text-forest-light flex items-center gap-1 py-1"
                    >
                      <span>Read Full Story</span>
                      <ChevronRight size={14} />
                    </Link>

                    <a
                      href={getGoogleMapsUrl(place.mapQuery, place.latitude, place.longitude)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sage/80 hover:bg-sage text-forest text-xs font-semibold transition-colors"
                    >
                      <Navigation size={12} />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Day Operational Notes & Tips */}
        {currentDay.notes.length > 0 && (
          <section className="bg-white rounded-card p-4 border border-line shadow-card space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-forest flex items-center gap-1.5">
              <Luggage size={14} />
              <span>Prepare for Today</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-ink/80 leading-relaxed">
              {currentDay.notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-antique-gold font-bold">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Overnight Base Status */}
        <section className="bg-white rounded-card p-4 border border-line shadow-card space-y-1.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
            <Bed size={14} />
            <span>Overnight Base</span>
          </h3>
          <p className="text-xs font-semibold text-ink">
            {currentDay.overnightLocation || "To Confirm"}
          </p>
          <p className="text-[11px] text-muted">
            Hotel confirmation and address will be provided by your host before check-in.
          </p>
        </section>

        {/* Previous / Next Navigation Controls */}
        <div className="flex items-center justify-between pt-2 pb-6 border-t border-line">
          {prevDay ? (
            <Link
              href={`/day/${prevDay.date}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-forest-light py-2"
            >
              <ChevronLeft size={16} />
              <span>Day {prevDay.dayNumber} ({prevDay.date.slice(5)})</span>
            </Link>
          ) : (
            <div />
          )}

          {nextDay ? (
            <Link
              href={`/day/${nextDay.date}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-forest-light py-2"
            >
              <span>Day {nextDay.dayNumber} ({nextDay.date.slice(5)})</span>
              <ChevronRight size={16} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
