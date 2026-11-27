import React from "react";
import Link from "next/link";
import { MediaRecord, PlaceRecord, TripStop } from "@/types";
import { Badge } from "@/components/common/Badge";
import { PlaceImage } from "@/components/common/PlaceImage";
import { isRavanaPlace } from "@/lib/tags";
import { getAppleMapsUrl, getGoogleMapsUrl } from "@/lib/navigation";
import { ArrowRight, Clock, ExternalLink, MapPin, Navigation, Sparkles } from "lucide-react";

interface StopTimelineProps {
  stops: TripStop[];
  placesMap: Record<string, PlaceRecord>;
  mediaMap?: Record<string, MediaRecord>;
  compact?: boolean;
  className?: string;
}

const PART_OF_DAY_LABEL: Record<NonNullable<TripStop["approximatePartOfDay"]>, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  flexible: "Flexible Window",
};

/**
 * Connected vertical itinerary timeline for daily stops with priority rings,
 * guest notes, Ravana Trail attribution, and separated navigation links.
 */
export function StopTimeline({
  stops,
  placesMap,
  mediaMap,
  compact = false,
  className = "",
}: StopTimelineProps) {
  const orderedStops = [...stops].sort((a, b) => a.order - b.order);

  return (
    <ol className={`relative space-y-4 ${className}`}>
      {orderedStops.map((stop, idx) => {
        const place = placesMap[stop.placeId];
        if (!place) return null;

        const media = place.heroMediaId && mediaMap ? mediaMap[place.heroMediaId] : null;
        const ravana = isRavanaPlace(place.tags);
        const isLast = idx === orderedStops.length - 1;
        const partLabel = stop.approximatePartOfDay
          ? PART_OF_DAY_LABEL[stop.approximatePartOfDay]
          : "Time TBC";

        const markerStyle =
          stop.priority === "primary"
            ? "bg-forest text-white border-forest shadow-sm"
            : stop.priority === "conditional"
              ? "bg-warning-bg text-warning-text border-antique-gold border-dashed"
              : "bg-white text-forest border-forest/40";

        const googleMapsUrl = getGoogleMapsUrl(place.mapQuery, place.latitude, place.longitude);
        const appleMapsUrl = getAppleMapsUrl(place.mapQuery, place.latitude, place.longitude);

        return (
          <li key={stop.id} className="relative pl-10 sm:pl-11">
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute left-[13px] top-8 -bottom-5 w-px bg-gradient-to-b from-forest/35 via-line to-line/50"
              />
            )}

            <span
              className={`absolute left-0 top-1.5 flex items-center justify-center w-7 h-7 rounded-full border-2 text-xs font-bold ${markerStyle}`}
              aria-hidden="true"
            >
              {idx + 1}
            </span>

            <article className="bg-white rounded-card border border-line/90 shadow-card p-4 sm:p-5 space-y-3 transition-colors hover:border-forest/25">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5 min-w-0">
                  {media && !compact && (
                    <Link
                      href={`/places/${place.slug}`}
                      className="hidden sm:block relative w-20 h-16 rounded-xl overflow-hidden bg-sage/40 shrink-0 border border-line/70"
                      aria-label={`View photo and guide for ${place.title}`}
                    >
                      <PlaceImage
                        media={media}
                        fallbackTitle={place.title}
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>
                  )}

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium text-muted mb-1">
                      <span className="inline-flex items-center gap-1 text-forest font-semibold">
                        <Clock size={12} />
                        <span>{partLabel}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 truncate">
                        <MapPin size={11} />
                        <span className="truncate">{place.region}</span>
                      </span>
                      {stop.plannedLocalTime && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{stop.plannedLocalTime}</span>
                        </>
                      )}
                    </div>

                    <Link href={`/places/${place.slug}`} className="group/stop inline-block">
                      <h3 className="font-serif text-xl sm:text-[22px] font-semibold text-ink leading-[1.18] group-hover/stop:text-forest transition-colors">
                        {place.title}
                      </h3>
                    </Link>
                  </div>
                </div>

                <Badge type={stop.priority} className="mt-0.5" />
              </div>

              {ravana && (
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F9EFE0] text-antique-gold-dark text-[11px] font-semibold border border-[#E8D0B1]">
                    <Sparkles size={11} className="text-antique-gold" />
                    <span>Ravana &amp; Ramayana Tradition</span>
                  </span>
                </div>
              )}

              {!compact && (
                <p className="text-sm text-ink/80 leading-relaxed">{place.shortIntro}</p>
              )}

              {stop.guestNote && (
                <div className="px-3.5 py-2.5 rounded-xl bg-sage-light/85 border-l-2 border-forest text-xs text-ink/85 leading-relaxed">
                  {stop.guestNote}
                </div>
              )}

              <div className="pt-2.5 border-t border-line/65 flex flex-wrap items-center justify-between gap-2">
                <Link
                  href={`/places/${place.slug}`}
                  className="tap-row inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest-deep transition-colors"
                >
                  <span>Read Story &amp; Etiquette</span>
                  <ArrowRight size={14} />
                </Link>

                <div className="flex items-center gap-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-row inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-mist hover:bg-sage text-forest text-xs font-semibold border border-line/80 transition-colors"
                  >
                    <Navigation size={12} />
                    <span>Google Maps</span>
                  </a>
                  {!compact && (
                    <a
                      href={appleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-row hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-muted hover:text-forest hover:bg-mist transition-colors"
                      aria-label={`Open ${place.title} in Apple Maps`}
                    >
                      <span>Apple Maps</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
