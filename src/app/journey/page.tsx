import Image from "next/image";
import Link from "next/link";
import { days } from "@/content/days";
import { places } from "@/content/places";
import { mediaRecords } from "@/content/media";
import { formatTourDate } from "@/lib/dates";
import { MapPin, Clock, ChevronRight, Calendar, AlertTriangle } from "lucide-react";

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-line/60 px-4 py-3">
        <div className="max-w-md mx-auto">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-antique-gold">
            Itinerary Overview
          </span>
          <h1 className="text-xl font-serif font-bold text-ink">
            Your 7-Day Journey
          </h1>
          <p className="text-xs text-muted">21–27 December 2026 · Asia/Colombo</p>
        </div>
      </header>

      <div className="mobile-container py-4 space-y-4">
        {/* Route Overview summary banner */}
        <div className="bg-sage/50 rounded-xl p-3 border border-line text-xs text-ink/80 flex items-center gap-2">
          <MapPin size={16} className="text-forest shrink-0" />
          <span>
            <strong>Route Arc: </strong>
            Katunayake → Cultural Triangle → Kandy → Nuwara Eliya → Ella → Unawatuna Coast
          </span>
        </div>

        {/* 7 Day Cards */}
        <div className="space-y-4">
          {days.map((day) => {
            const heroMedia = day.heroMediaId
              ? mediaRecords[day.heroMediaId]
              : mediaRecords["hero-sri-lanka"];

            return (
              <div
                key={day.date}
                className="bg-white rounded-card overflow-hidden border border-line/80 shadow-card hover:shadow-elevated transition-shadow"
              >
                {/* Day Card Header Image */}
                <div className="relative aspect-[16/9] w-full bg-forest-deep">
                  <Image
                    src={heroMedia.src}
                    alt={heroMedia.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 480px) 100vw, 480px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/30 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-forest text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                      Day {day.dayNumber}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] text-ivory/80 font-medium">
                      {formatTourDate(day.date)}
                    </span>
                    <h2 className="text-lg font-serif font-bold text-white leading-tight mt-0.5">
                      {day.title}
                    </h2>
                  </div>
                </div>

                {/* Day Card Details */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-muted flex items-center gap-1 font-medium">
                    <MapPin size={13} className="text-antique-gold shrink-0" />
                    <span>{day.from} → {day.to}</span>
                  </p>

                  <p className="text-xs text-ink/80 leading-relaxed">
                    {day.teaser}
                  </p>

                  {/* Highlights of stops */}
                  <div className="space-y-1.5 pt-1 border-t border-line/60">
                    <span className="text-[11px] font-semibold uppercase text-muted tracking-wide">
                      Scheduled Stops ({day.stops.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {day.stops.map((stop) => {
                        const place = places[stop.placeId];
                        if (!place) return null;
                        const isPrimary = stop.priority === "primary";
                        return (
                          <span
                            key={stop.id}
                            className={`text-[11px] px-2.5 py-0.5 rounded-full border ${
                              isPrimary
                                ? "bg-sage/60 text-forest border-line font-medium"
                                : "bg-ivory text-muted border-line/80"
                            }`}
                          >
                            {place.title}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Road Transfer Warning */}
                  {day.estimatedRoadTransfer && (
                    <div className="p-2 rounded-lg bg-warning-bg/60 border border-[#EED7B0] text-[11px] text-warning-text flex items-start gap-1.5">
                      <AlertTriangle size={13} className="shrink-0 mt-0.5 text-antique-gold" />
                      <span>{day.estimatedRoadTransfer}</span>
                    </div>
                  )}

                  {/* View Details CTA */}
                  <div className="pt-1">
                    <Link
                      href={`/day/${day.date}`}
                      className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-forest/5 hover:bg-forest/10 text-forest text-xs font-semibold transition-colors"
                    >
                      <span>View Day {day.dayNumber} Full Itinerary</span>
                      <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
