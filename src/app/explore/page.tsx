"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { places } from "@/content/places";
import { mediaRecords } from "@/content/media";
import { HeroFrame } from "@/components/common/HeroFrame";
import { PlaceCard } from "@/components/common/PlaceCard";
import { isRavanaPlace } from "@/lib/tags";
import { ArrowRight, Compass, Heart, Map, Search, Sparkles, X } from "lucide-react";

const CATEGORIES = [
  { id: "All", label: "All Destinations" },
  { id: "Ravana Trail", label: "Ravana Trail" },
  { id: "HERITAGE", label: "Heritage & UNESCO" },
  { id: "HINDUISM", label: "Hindu Kovils" },
  { id: "BUDDHISM", label: "Buddhist Temples" },
  { id: "NATURE", label: "Nature & Highlands" },
  { id: "COAST", label: "South Coast" },
] as const;

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const placeList = useMemo(() => Object.values(places), []);

  const filteredPlaces = useMemo(() => {
    return placeList.filter((place) => {
      let matchesCategory = true;
      if (selectedCategory === "Ravana Trail") {
        matchesCategory = isRavanaPlace(place.tags);
      } else if (selectedCategory !== "All") {
        matchesCategory = place.tags.includes(selectedCategory);
      }

      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        matchesSearch =
          place.title.toLowerCase().includes(query) ||
          place.region.toLowerCase().includes(query) ||
          place.subtitle.toLowerCase().includes(query) ||
          place.shortIntro.toLowerCase().includes(query) ||
          place.tags.some((t) => t.toLowerCase().includes(query));
      }

      return matchesCategory && matchesSearch;
    });
  }, [placeList, selectedCategory, searchQuery]);

  const showFeaturedBanner = selectedCategory === "All" && !searchQuery.trim();
  const hasActiveFilter = selectedCategory !== "All" || searchQuery.trim().length > 0;

  return (
    <div className="bg-ivory">
      <div className="app-container pt-6 pb-10 md:py-10 space-y-7 animate-fade-rise">
        {/* Editorial Page Header */}
        <header className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-antique-gold-dark">
                Destination Library · 19 Landmarks
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-tight">
                Explore Sri Lanka
              </h1>
              <p className="text-sm text-muted max-w-2xl leading-relaxed">
                Search citadels, temples, tea estates, Ramayana landmarks, and coastal bays—with clear heritage notes and etiquette before arrival.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Link
                href="/saved"
                className="tap-row inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-line text-xs font-semibold text-forest hover:bg-sage-light transition-colors"
              >
                <Heart size={14} className="text-antique-gold fill-antique-gold/25" />
                <span>Saved Places</span>
              </Link>
              <Link
                href="/map"
                className="tap-row inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-line text-xs font-semibold text-forest hover:bg-sage-light transition-colors"
              >
                <Map size={14} />
                <span>Route Map</span>
              </Link>
            </div>
          </div>

          {/* Search & Category Controls */}
          <div className="bg-white rounded-card p-3.5 sm:p-4 border border-line/90 shadow-card space-y-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              />
              <input
                type="text"
                aria-label="Search destinations"
                placeholder="Search places, cities, legends, or temples..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="tap-row w-full pl-10 pr-10 py-2.5 bg-mist/45 border border-line rounded-xl text-sm text-ink placeholder:text-muted focus:outline-none focus:bg-white focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="tap-target absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-lg text-muted hover:text-ink"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div
              role="group"
              aria-label="Filter destinations by theme"
              className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none"
            >
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    aria-pressed={active}
                    className={`tap-row inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors select-none border shrink-0 ${
                      active
                        ? "bg-forest text-white border-forest shadow-sm"
                        : "bg-white text-ink/80 border-line hover:border-forest/40 hover:bg-sage-light"
                    }`}
                  >
                    {cat.id === "Ravana Trail" && (
                      <Sparkles
                        size={12}
                        className={active ? "text-antique-gold-light" : "text-antique-gold-dark"}
                      />
                    )}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Featured Editorial Banner */}
        {showFeaturedBanner && (
          <HeroFrame
            variant="split"
            media={mediaRecords["ravana-falls-hero"]}
            fallbackTitle="The Ravana Trail Across Sri Lanka"
            eyebrow="Curated Collection · 5 Sacred Stops"
            title="The Ravana Trail Across Sri Lanka"
            subtitle="Journey from Hanuman's highland ridges at Ramboda to Seetha Amman Kovil, Ella's mountain caves, Ravana Falls, and coastal Rumassala."
            actions={
              <Link
                href="/ravana-trail"
                className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-forest text-xs font-semibold shadow-sm hover:bg-sage transition-colors"
              >
                <span>Open Full Trail Guide</span>
                <ArrowRight size={14} />
              </Link>
            }
          />
        )}

        {/* Results Meta Strip */}
        <div className="flex items-center justify-between gap-2 px-1">
          <span className="text-xs font-semibold text-muted">
            Showing {filteredPlaces.length} of {placeList.length} destinations
          </span>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="tap-row text-xs font-semibold text-forest hover:underline px-2"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Places Grid */}
        {filteredPlaces.length === 0 ? (
          <div className="bg-white rounded-card p-10 text-center border border-line shadow-card space-y-3">
            <div className="w-12 h-12 rounded-full bg-sage-light text-forest flex items-center justify-center mx-auto">
              <Compass size={22} />
            </div>
            <p className="font-serif text-xl font-semibold text-ink">
              No matching destinations found
            </p>
            <p className="text-sm text-muted max-w-sm mx-auto">
              Try clearing your search terms or switching back to all destination categories.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest text-white text-xs font-semibold hover:bg-forest-light transition-colors"
              >
                Show All 19 Destinations
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place, index) => {
              const heroMedia = place.heroMediaId ? mediaRecords[place.heroMediaId] : null;
              return (
                <PlaceCard
                  key={place.id}
                  place={place}
                  media={heroMedia}
                  priority={index < 3}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
