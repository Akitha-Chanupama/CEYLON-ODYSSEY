"use client";

import Link from "next/link";
import { places } from "@/content/places";
import { mediaRecords } from "@/content/media";
import { useBookmarks } from "@/lib/bookmarks";
import { PlaceCard } from "@/components/common/PlaceCard";
import { Compass, Heart, Sparkles } from "lucide-react";

export default function SavedPage() {
  const { bookmarks, isLoaded } = useBookmarks();

  const savedPlaces = Object.values(places).filter((p) =>
    bookmarks.includes(p.id)
  );

  return (
    <div className="bg-ivory">
      <div className="app-container pt-6 pb-10 md:py-10 space-y-7 animate-fade-rise">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-antique-gold-dark">
              Personal Collection
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-tight">
              Saved Places
            </h1>
            <p className="text-sm text-muted">
              Bookmarks stored privately in this browser for offline reference on the road.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-sage text-forest border border-line text-xs font-semibold w-fit">
            <Heart size={13} className="fill-antique-gold text-antique-gold-dark" />
            <span>{savedPlaces.length} Saved</span>
          </span>
        </header>

        {!isLoaded ? (
          <div className="bg-white rounded-card p-10 text-center border border-line shadow-card text-sm text-muted">
            Loading your saved destinations...
          </div>
        ) : savedPlaces.length === 0 ? (
          <div className="bg-white rounded-card p-10 text-center border border-line shadow-card space-y-4">
            <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center text-forest mx-auto border border-line">
              <Heart size={24} className="text-antique-gold-dark" />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-serif text-2xl font-semibold text-ink">
                No places saved yet
              </h2>
              <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                Tap the heart button on any destination card or guide to keep your personal favorites ready here.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Link
                href="/explore"
                className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest text-white text-xs font-semibold shadow-sm hover:bg-forest-light transition-colors"
              >
                <Compass size={14} />
                <span>Explore All Destinations</span>
              </Link>
              <Link
                href="/ravana-trail"
                className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-line text-forest text-xs font-semibold hover:bg-sage-light transition-colors"
              >
                <Sparkles size={14} className="text-antique-gold-dark" />
                <span>The Ravana Trail</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPlaces.map((place) => {
              const heroMedia = place.heroMediaId
                ? mediaRecords[place.heroMediaId]
                : null;
              return (
                <PlaceCard key={place.id} place={place} media={heroMedia} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
