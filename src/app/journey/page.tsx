import Link from "next/link";
import { days } from "@/content/days";
import { places } from "@/content/places";
import { mediaRecords } from "@/content/media";
import { formatTourDate } from "@/lib/dates";
import { PlaceImage } from "@/components/common/PlaceImage";
import { Badge } from "@/components/common/Badge";
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  Compass,
  Map,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function JourneyPage() {
  return (
    <div className="bg-ivory">
      <div className="app-container pt-6 pb-10 md:py-10 space-y-8 animate-fade-rise">
        {/* Editorial Page Header */}
        <header className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-antique-gold-dark">
                Itinerary Overview · Asia/Colombo
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-tight">
                Your 7-Day Island Journey
              </h1>
              <p className="text-sm text-muted max-w-2xl leading-relaxed">
                From Bandaranaike arrival on 21 December through the Cultural Triangle, misty highlands, and southern coast through 27 December 2026.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/map"
                className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-line text-forest text-xs font-semibold shadow-sm hover:bg-sage-light transition-colors"
              >
                <Map size={15} />
                <span>Interactive Route Map</span>
              </Link>
              <Link
                href="/ravana-trail"
                className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest text-white text-xs font-semibold shadow-sm hover:bg-forest-light transition-colors"
              >
                <Sparkles size={15} className="text-antique-gold-light" />
                <span>Ravana Trail</span>
              </Link>
            </div>
          </div>

          {/* Route Arc Strip */}
          <div className="bg-sage/65 rounded-2xl px-4 py-3.5 border border-line flex items-start sm:items-center gap-2.5 text-xs sm:text-[13px] text-ink/90">
            <MapPin size={16} className="text-forest shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong className="text-forest font-semibold">Route Arc: </strong>
              Katunayake → Sigiriya &amp; Dambulla → Kandy → Ramboda &amp; Nuwara Eliya → Ella → Unawatuna Coast
            </span>
          </div>
        </header>

        {/* 7-Day Grid + Closing Companion Card (balanced 2x4 desktop grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {days.map((day, idx) => {
            const heroMedia = day.heroMediaId
              ? mediaRecords[day.heroMediaId]
              : mediaRecords["hero-sri-lanka"];

            return (
              <article
                key={day.date}
                className="group bg-white rounded-card overflow-hidden border border-line/90 shadow-card hover:shadow-elevated hover:border-forest/25 transition-all duration-200 flex flex-col"
              >
                <Link
                  href={`/day/${day.date}`}
                  className="relative aspect-[16/9] w-full bg-forest-deep overflow-hidden block"
                  aria-label={`Open Day ${day.dayNumber}: ${day.title}`}
                >
                  <PlaceImage
                    media={heroMedia}
                    fallbackTitle={day.title}
                    priority={idx < 2}
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-deep/45 to-black/15" />

                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-forest text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                      Day {day.dayNumber} of 7
                    </span>
                    <Badge
                      type={day.operationalStatus === "verified" ? "verified" : "check-again"}
                      label={day.operationalStatus === "verified" ? "Verified" : "To Confirm"}
                    />
                  </div>

                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <p className="text-xs text-antique-gold-light font-semibold tracking-wide">
                      {formatTourDate(day.date)}
                    </p>
                    <h2 className="font-serif text-2xl font-semibold text-white leading-tight mt-0.5">
                      {day.title}
                    </h2>
                  </div>
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <p className="text-xs text-forest font-semibold flex items-center gap-1.5">
                      <Compass size={14} className="text-antique-gold-dark shrink-0" />
                      <span>
                        {day.from} → {day.to}
                      </span>
                    </p>

                    <p className="text-sm text-ink/85 leading-relaxed">{day.teaser}</p>

                    <div className="space-y-2 pt-2 border-t border-line/65">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                        Scheduled Stops ({day.stops.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {day.stops.map((stop) => {
                          const place = places[stop.placeId];
                          if (!place) return null;
                          const isPrimary = stop.priority === "primary";
                          return (
                            <Link
                              key={stop.id}
                              href={`/places/${place.slug}`}
                              className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                                isPrimary
                                  ? "bg-sage-light text-forest border-line font-semibold hover:bg-sage"
                                  : "bg-ivory text-muted border-line/80 hover:text-ink"
                              }`}
                            >
                              {place.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {day.estimatedRoadTransfer && (
                      <div className="p-3 rounded-xl bg-warning-bg/75 border border-[#EED7B0] text-xs text-warning-text flex items-start gap-2 leading-relaxed">
                        <AlertTriangle
                          size={14}
                          className="shrink-0 mt-0.5 text-antique-gold-dark"
                        />
                        <span>{day.estimatedRoadTransfer}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-line/65 flex items-center justify-between gap-3">
                    <span className="text-xs text-muted truncate">
                      {day.overnightLocation ? `Base: ${day.overnightLocation}` : "Arrival / Departure"}
                    </span>
                    <Link
                      href={`/day/${day.date}`}
                      className="tap-row inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-forest/8 hover:bg-forest text-forest hover:text-white text-xs font-semibold transition-colors shrink-0"
                    >
                      <span>View Day {day.dayNumber}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Companion Summary Card balancing the 8-tile desktop layout */}
          <aside className="bg-gradient-to-br from-forest-deep via-forest to-forest-dark text-white rounded-card p-6 sm:p-7 border border-forest-light/30 shadow-elevated flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/12 border border-white/20 text-[11px] font-semibold uppercase tracking-wider text-antique-gold-light">
                <Calendar size={12} />
                <span>Planning Companion</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white leading-tight">
                Maps, Legends &amp; Island Etiquette
              </h2>
              <p className="text-sm text-white/85 leading-relaxed">
                Switch effortlessly from daily road schedules to the stylized Sri Lanka route schematic, curated Ravana Trail storytelling, and practical packing &amp; kovil guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Link
                href="/map"
                className="tap-row inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white text-forest text-xs font-semibold hover:bg-sage transition-colors"
              >
                <span>Open Route Map</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/essentials"
                className="tap-row inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white/12 text-white border border-white/25 text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                <span>Trip Essentials</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/explore"
                className="tap-row inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white/12 text-white border border-white/25 text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                <span>Browse All 19 Places</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/welcome"
                className="tap-row inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white/12 text-white border border-white/25 text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                <span>Guest Orientation</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
