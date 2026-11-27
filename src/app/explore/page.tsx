"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { places } from "@/content/places";
import { mediaRecords } from "@/content/media";
import { useBookmarks } from "@/lib/bookmarks";
import { PlaceImage } from "@/components/common/PlaceImage";
import {
  Search,
  Sparkles,
  MapPin,
  Heart,
  ChevronRight,
  Filter,
} from "lucide-react";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toggleBookmark, isBookmarked, isLoaded } = useBookmarks();

  const placeList = useMemo(() => Object.values(places), []);

  const categories = [
    "All",
    "Ravana Trail",
    "HERITAGE",
    "HINDUISM",
    "BUDDHISM",
    "NATURE",
    "COAST",
  ];

  const filteredPlaces = useMemo(() => {
    return placeList.filter((place) => {
      // Category filter
      let matchesCategory = true;
      if (selectedCategory === "Ravana Trail") {
        matchesCategory =
          place.tags.includes("Ravana Trail") ||
          place.tags.includes("RAMAYANA_TRADITION");
      } else if (selectedCategory !== "All") {
        matchesCategory = place.tags.includes(selectedCategory);
      }

      // Search filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        matchesSearch =
          place.title.toLowerCase().includes(query) ||
          place.region.toLowerCase().includes(query) ||
          place.subtitle.toLowerCase().includes(query) ||
          place.tags.some((t) => t.toLowerCase().includes(query));
      }

      return matchesCategory && matchesSearch;
    });
  }, [placeList, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-line/60 px-4 py-3">
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-antique-gold">
                Discover The Island
              </span>
              <h1 className="text-xl font-serif font-bold text-ink">
                Explore Destinations
              </h1>
            </div>
            <Link
              href="/saved"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-line text-xs font-semibold text-forest hover:bg-sage/40 transition-colors"
            >
              <Heart size={14} className="text-antique-gold fill-antique-gold/20" />
              <span>Saved</span>
            </Link>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              placeholder="Search places, temples, or stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-line rounded-xl text-xs text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors select-none ${
                    active
                      ? "bg-forest text-white"
                      : "bg-white text-muted border border-line hover:border-forest/40 hover:text-ink"
                  }`}
                >
                  {cat === "Ravana Trail" ? "✦ Ravana Trail" : cat}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="mobile-container py-4 space-y-4">
        {/* Featured Editorial Banner: Ravana Trail */}
        {selectedCategory === "All" && !searchQuery && (
          <div className="bg-gradient-to-br from-forest-deep to-forest rounded-card overflow-hidden p-4 text-white shadow-card border border-forest-light/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-antique-gold text-ink text-[10px] font-bold uppercase tracking-wider">
                <Sparkles size={11} />
                <span>Featured Trail</span>
              </span>
              <span className="text-[11px] text-ivory/80">Special Edition</span>
            </div>
            <h2 className="text-lg font-serif font-bold text-white">
              The Ravana Trail Across Sri Lanka
            </h2>
            <p className="text-xs text-ivory/85 leading-relaxed">
              Explore the five signature Ramayana landmarks: Ramboda Hanuman Temple, Seetha Amman Kovil, Ravana Cave, Ravana Falls, and Rumassala.
            </p>
            <div className="pt-1">
              <Link
                href="/ravana-trail"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-forest text-xs font-semibold shadow-sm hover:bg-sage transition-colors"
              >
                <span>View Full Trail Guide</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        )}

        {/* Results Counter */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-muted">
            Showing {filteredPlaces.length} Destinations
          </span>
          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="text-xs text-forest font-semibold hover:underline"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Places Grid */}
        <div className="space-y-3">
          {filteredPlaces.length === 0 ? (
            <div className="bg-white rounded-card p-8 text-center border border-line space-y-2">
              <p className="text-sm font-semibold text-ink">No destinations found</p>
              <p className="text-xs text-muted">
                Try a different search query or select &apos;All&apos; categories.
              </p>
            </div>
          ) : (
            filteredPlaces.map((place) => {
              const heroMedia = place.heroMediaId
                ? mediaRecords[place.heroMediaId]
                : null;
              const bookmarked = isLoaded && isBookmarked(place.id);
              const isRavanaThemed =
                place.tags.includes("Ravana Trail") ||
                place.tags.includes("RAMAYANA_TRADITION");

              return (
                <div
                  key={place.id}
                  className="bg-white rounded-card overflow-hidden border border-line shadow-card hover:shadow-elevated transition-shadow flex flex-col"
                >
                  <div className="relative aspect-[16/9] w-full bg-forest-deep">
                    <PlaceImage
                      media={heroMedia}
                      fallbackTitle={place.title}
                      sizes="(max-width: 480px) 100vw, 480px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />

                    {/* Bookmark action */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleBookmark(place.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-sm text-forest hover:bg-white transition-all shadow-sm"
                      aria-label={bookmarked ? "Remove bookmark" : "Save destination"}
                    >
                      <Heart
                        size={16}
                        className={bookmarked ? "fill-antique-gold text-antique-gold" : "text-forest"}
                      />
                    </button>

                    {/* Tags overlay */}
                    <div className="absolute bottom-2.5 left-3 flex flex-wrap gap-1">
                      {isRavanaThemed && (
                        <span className="px-2 py-0.5 rounded-full bg-antique-gold text-ink text-[10px] font-bold uppercase tracking-wider">
                          Ravana Trail
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] font-medium backdrop-blur-sm">
                        {place.region}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-serif font-bold text-ink leading-snug">
                        {place.title}
                      </h3>
                      <p className="text-xs text-muted mt-0.5">{place.subtitle}</p>
                      <p className="text-xs text-ink/80 leading-relaxed mt-2 line-clamp-2">
                        {place.shortIntro}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-line/60 flex items-center justify-between">
                      <Link
                        href={`/places/${place.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-forest-light py-1"
                      >
                        <span>View Place Guide</span>
                        <ChevronRight size={14} />
                      </Link>

                      <span className="text-[11px] text-muted">
                        {place.stories.length} stories
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
