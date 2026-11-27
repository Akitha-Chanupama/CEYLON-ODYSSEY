import React from "react";
import Link from "next/link";
import { MediaRecord, PlaceRecord } from "@/types";
import { PlaceImage } from "@/components/common/PlaceImage";
import { SaveButton } from "@/components/place/SaveButton";
import { formatPlaceTag, isRavanaPlace } from "@/lib/tags";
import { getGoogleMapsUrl } from "@/lib/navigation";
import { ArrowRight, MapPin, Navigation, Sparkles } from "lucide-react";

interface PlaceCardProps {
  place: PlaceRecord;
  media?: MediaRecord | null;
  variant?: "grid" | "compact";
  showSave?: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * Editorial destination card pairing verified imagery, readable place tags,
 * serif title, separate bookmark action, and clean Place Guide / Maps links.
 */
export function PlaceCard({
  place,
  media,
  variant = "grid",
  showSave = true,
  priority = false,
  className = "",
}: PlaceCardProps) {
  const ravana = isRavanaPlace(place.tags);
  const displayTags = place.tags
    .filter((tag) => tag !== "Ravana Trail" && tag !== "RAMAYANA_TRADITION")
    .slice(0, variant === "compact" ? 1 : 2);
  const mapsUrl = getGoogleMapsUrl(place.mapQuery, place.latitude, place.longitude);

  return (
    <article
      className={`group relative bg-white rounded-card border border-line/90 shadow-card hover:shadow-elevated hover:border-forest/25 transition-all duration-200 overflow-hidden flex flex-col ${className}`}
    >
      {/* Top photo container — link and floating save button remain siblings */}
      <div
        className={`relative w-full overflow-hidden bg-sage/30 shrink-0 ${
          variant === "compact" ? "aspect-[4/3]" : "aspect-[16/10]"
        }`}
      >
        <Link
          href={`/places/${place.slug}`}
          className="block relative w-full h-full focus-visible:outline-none"
          aria-label={`Explore ${place.title}`}
        >
          <PlaceImage
            media={media}
            fallbackTitle={place.title}
            sizes={
              variant === "compact"
                ? "(max-width: 640px) 280px, 320px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
            }
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-dark/75 backdrop-blur-sm text-[11px] font-medium text-white/95 truncate max-w-full">
              <MapPin size={11} className="shrink-0 text-antique-gold-light" />
              <span className="truncate">{place.region}</span>
            </span>
          </div>
        </Link>

        {ravana && (
          <div className="pointer-events-none absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-dark/80 backdrop-blur-sm border border-antique-gold/40 text-[10px] font-semibold uppercase tracking-wider text-antique-gold-light">
            <Sparkles size={10} />
            <span>Ravana Trail</span>
          </div>
        )}

        {showSave && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <SaveButton placeId={place.id} variant="icon" />
          </div>
        )}
      </div>

      {/* Card body */}
      <div
        className={`flex-1 flex flex-col justify-between gap-3.5 ${
          variant === "compact" ? "p-4" : "p-5"
        }`}
      >
        <div>
          {displayTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-sage-light text-forest border border-line/70 text-[11px] font-medium"
                >
                  {formatPlaceTag(tag)}
                </span>
              ))}
            </div>
          )}

          <Link href={`/places/${place.slug}`} className="block group/title">
            <h3
              className={`font-serif font-semibold text-ink leading-[1.18] tracking-tight group-hover/title:text-forest transition-colors ${
                variant === "compact" ? "text-xl" : "text-[22px] sm:text-2xl"
              }`}
            >
              {place.title}
            </h3>
          </Link>

          <p className="text-xs font-medium text-muted mt-1 line-clamp-1">{place.subtitle}</p>

          <p
            className={`text-sm text-ink/80 leading-relaxed mt-2.5 ${
              variant === "compact" ? "line-clamp-2" : "line-clamp-3"
            }`}
          >
            {place.shortIntro}
          </p>
        </div>

        <div className="pt-3 border-t border-line/65 flex items-center justify-between gap-2">
          <Link
            href={`/places/${place.slug}`}
            className="tap-row inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-forest-deep transition-colors"
          >
            <span>View Place Guide</span>
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-row inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-muted hover:text-forest hover:bg-sage-light transition-colors"
            aria-label={`Open ${place.title} in Google Maps`}
          >
            <Navigation size={12} />
            <span>Map</span>
          </a>
        </div>
      </div>
    </article>
  );
}
