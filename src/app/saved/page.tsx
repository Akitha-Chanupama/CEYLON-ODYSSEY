"use client";

import Image from "next/image";
import Link from "next/link";
import { places } from "@/content/places";
import { mediaRecords } from "@/content/media";
import { useBookmarks } from "@/lib/bookmarks";
import { Heart, MapPin, ChevronRight, Compass, Trash2 } from "lucide-react";

export default function SavedPage() {
  const { bookmarks, toggleBookmark, isLoaded } = useBookmarks();

  const savedPlaces = Object.values(places).filter((p) =>
    bookmarks.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-line/60 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-antique-gold">
              Personal Collection
            </span>
            <h1 className="text-xl font-serif font-bold text-ink">
              Saved Places
            </h1>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sage text-forest">
            {savedPlaces.length} Saved
          </span>
        </div>
      </header>

      <div className="mobile-container py-5 space-y-4">
        {!isLoaded ? (
          <div className="text-center py-12 text-xs text-muted">
            Loading your bookmarks...
          </div>
        ) : savedPlaces.length === 0 ? (
          <div className="bg-white rounded-card p-8 text-center border border-line shadow-card space-y-3">
            <div className="w-12 h-12 rounded-full bg-sage/60 flex items-center justify-center text-forest mx-auto">
              <Heart size={24} className="text-muted" />
            </div>
            <h2 className="text-base font-serif font-bold text-ink">
              No places saved yet
            </h2>
            <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
              Browse destinations in Explore and tap the heart icon to save places you want to revisit.
            </p>
            <div className="pt-2">
              <Link
                href="/explore"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-forest text-white text-xs font-semibold shadow-sm hover:bg-forest-light transition-colors"
              >
                <Compass size={14} />
                <span>Explore Destinations</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {savedPlaces.map((place) => {
              const heroMedia = place.heroMediaId
                ? mediaRecords[place.heroMediaId]
                : mediaRecords["hero-sri-lanka"];

              return (
                <div
                  key={place.id}
                  className="bg-white rounded-card overflow-hidden border border-line shadow-card flex items-center gap-3 p-3"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-forest-deep">
                    <Image
                      src={heroMedia.src}
                      alt={heroMedia.alt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-ink truncate">
                      {place.title}
                    </h3>
                    <p className="text-[11px] text-muted truncate mt-0.5">
                      {place.region}
                    </p>
                    <Link
                      href={`/places/${place.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-forest hover:underline mt-2"
                    >
                      <span>View Guide</span>
                      <ChevronRight size={12} />
                    </Link>
                  </div>

                  <button
                    onClick={() => toggleBookmark(place.id)}
                    className="p-2 text-muted hover:text-error transition-colors"
                    title="Remove from saved"
                    aria-label={`Remove ${place.title} from saved`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
