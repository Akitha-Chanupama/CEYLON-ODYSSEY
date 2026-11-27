"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { DayRecord, PlaceRecord } from "@/types";
import { Badge } from "@/components/common/Badge";
import { getAppleMapsUrl, getGoogleMapsUrl } from "@/lib/navigation";
import { ChevronRight, Compass, ExternalLink, MapPin, Navigation } from "lucide-react";

interface SriLankaRouteMapProps {
  days: DayRecord[];
  placesMap: Record<string, PlaceRecord>;
}

interface RouteNode {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  dayNumbers: number[];
  anchorAlign?: "left" | "right";
}

const ROUTE_NODES: RouteNode[] = [
  {
    id: "cmb",
    label: "Katunayake (CMB)",
    sublabel: "Days 1 & 7",
    x: 112,
    y: 266,
    dayNumbers: [1, 7],
    anchorAlign: "left",
  },
  {
    id: "sigiriya",
    label: "Sigiriya & Dambulla",
    sublabel: "Days 1–2",
    x: 192,
    y: 172,
    dayNumbers: [1, 2],
    anchorAlign: "right",
  },
  {
    id: "kandy",
    label: "Matale & Kandy",
    sublabel: "Days 3–4",
    x: 184,
    y: 234,
    dayNumbers: [3, 4],
    anchorAlign: "right",
  },
  {
    id: "highlands",
    label: "Ramboda & Nuwara Eliya",
    sublabel: "Days 4–5",
    x: 204,
    y: 274,
    dayNumbers: [4, 5],
    anchorAlign: "right",
  },
  {
    id: "ella",
    label: "Ella Highlands",
    sublabel: "Days 5–6",
    x: 240,
    y: 296,
    dayNumbers: [5, 6],
    anchorAlign: "right",
  },
  {
    id: "coast",
    label: "Unawatuna & Galle",
    sublabel: "Days 6–7",
    x: 158,
    y: 376,
    dayNumbers: [6, 7],
    anchorAlign: "left",
  },
];

// Connects chronological island progression across Sri Lanka
const FULL_ARC_PATH =
  "M 112 266 Q 138 205 192 172 Q 194 205 184 234 Q 192 256 204 274 Q 222 288 240 296 Q 228 355 158 376 Q 112 342 112 266";

const DAY_SEGMENTS: Record<number, string> = {
  1: "M 112 266 Q 138 205 192 172",
  2: "M 188 172 L 196 176",
  3: "M 192 172 Q 194 205 184 234",
  4: "M 184 234 Q 192 256 204 274",
  5: "M 204 274 Q 222 288 240 296",
  6: "M 240 296 Q 228 355 158 376",
  7: "M 158 376 Q 112 342 112 266",
};

/**
 * Interactive stylized schematic of Sri Lanka's tour route paired with authentic
 * per-stop Google Maps and Apple Maps navigation links.
 */
export function SriLankaRouteMap({ days, placesMap }: SriLankaRouteMapProps) {
  const [selectedDay, setSelectedDay] = useState<number | "all">("all");

  const visibleDays = useMemo(() => {
    if (selectedDay === "all") return days;
    return days.filter((d) => d.dayNumber === selectedDay);
  }, [days, selectedDay]);

  return (
    <div className="space-y-6">
      {/* Day Filter Pills */}
      <div
        role="group"
        aria-label="Filter route by tour day"
        className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
      >
        <button
          type="button"
          onClick={() => setSelectedDay("all")}
          aria-pressed={selectedDay === "all"}
          className={`tap-row px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
            selectedDay === "all"
              ? "bg-forest text-white border-forest shadow-sm"
              : "bg-white text-ink/80 border-line hover:bg-sage-light"
          }`}
        >
          All 7 Days ({Object.keys(placesMap).length} Stops)
        </button>

        {days.map((day) => {
          const active = selectedDay === day.dayNumber;
          return (
            <button
              key={day.date}
              type="button"
              onClick={() => setSelectedDay(day.dayNumber)}
              aria-pressed={active}
              className={`tap-row px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                active
                  ? "bg-forest text-white border-forest shadow-sm"
                  : "bg-white text-ink/80 border-line hover:bg-sage-light"
              }`}
            >
              Day {day.dayNumber}
            </button>
          );
        })}
      </div>

      {/* Desktop 2-Column Layout: Sticky SVG Schematic + Day Navigation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Stylized Sri Lanka Route Schematic */}
        <section className="lg:col-span-5 lg:sticky lg:top-24 bg-white rounded-card p-5 border border-line/90 shadow-card space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-antique-gold-dark">
                Island Schematic
              </span>
              <h2 className="font-serif text-2xl font-semibold text-ink leading-tight">
                {selectedDay === "all"
                  ? "Complete Cultural & Coastal Arc"
                  : `Day ${selectedDay} Route Leg`}
              </h2>
            </div>
            <Compass size={20} className="text-forest shrink-0" />
          </div>

          <div className="rounded-2xl bg-gradient-to-b from-[#EAF2F4] to-[#E2ECE9] border border-line/80 p-3 overflow-hidden">
            <svg
              viewBox="0 0 360 430"
              role="img"
              aria-label="Stylized schematic map of Sri Lanka highlighting tour regions across Days 1 to 7"
              className="w-full h-auto max-h-[420px]"
            >
              <defs>
                <linearGradient id="islandLand" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F8FAF3" />
                  <stop offset="100%" stopColor="#DCE8DD" />
                </linearGradient>
              </defs>

              {/* Subtle ocean latitude/longitude guides */}
              <g stroke="#C6D8D8" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.7">
                <line x1="20" y1="100" x2="340" y2="100" />
                <line x1="20" y1="200" x2="340" y2="200" />
                <line x1="20" y1="300" x2="340" y2="300" />
                <line x1="180" y1="20" x2="180" y2="410" />
              </g>

              {/* Stylized Sri Lanka landmass outline */}
              <path
                d="M 154 34
                   C 166 28, 178 38, 176 56
                   C 175 74, 198 102, 224 138
                   C 248 172, 274 206, 282 246
                   C 290 286, 284 326, 256 356
                   C 228 386, 186 402, 152 396
                   C 122 390, 108 358, 106 322
                   C 103 288, 98 258, 98 228
                   C 98 192, 102 162, 108 134
                   C 114 102, 128 74, 134 52
                   C 138 40, 146 36, 154 34 Z"
                fill="url(#islandLand)"
                stroke="#85A798"
                strokeWidth="2"
              />

              {/* Subtle highland relief shading */}
              <ellipse
                cx="206"
                cy="272"
                rx="46"
                ry="48"
                fill="#C5DBC9"
                opacity="0.45"
              />

              {/* Full route dashed path */}
              <path
                d={FULL_ARC_PATH}
                fill="none"
                stroke="#145143"
                strokeWidth={selectedDay === "all" ? "2.6" : "1.8"}
                strokeDasharray="5 4"
                opacity={selectedDay === "all" ? 0.85 : 0.35}
              />

              {/* Active selected day arc highlight */}
              {selectedDay !== "all" && DAY_SEGMENTS[selectedDay] && (
                <path
                  d={DAY_SEGMENTS[selectedDay]}
                  fill="none"
                  stroke="#C0914E"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                />
              )}

              {/* Interactive regional nodes */}
              {ROUTE_NODES.map((node) => {
                const isNodeActive =
                  selectedDay === "all" || node.dayNumbers.includes(selectedDay);
                const labelX = node.anchorAlign === "left" ? node.x - 12 : node.x + 12;
                const textAnchor = node.anchorAlign === "left" ? "end" : "start";

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedDay(node.dayNumbers[0])}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isNodeActive ? 8 : 6}
                      fill={isNodeActive ? "#C0914E" : "#FFFFFF"}
                      stroke="#145143"
                      strokeWidth={isNodeActive ? 2.5 : 1.5}
                      opacity={isNodeActive ? 1 : 0.6}
                    />
                    <text
                      x={labelX}
                      y={node.y - 2}
                      textAnchor={textAnchor}
                      className="text-[10.5px] font-bold"
                      fill={isNodeActive ? "#142B26" : "#4C625A"}
                    >
                      {node.label}
                    </text>
                    <text
                      x={labelX}
                      y={node.y + 10}
                      textAnchor={textAnchor}
                      className="text-[9px] font-medium"
                      fill={isNodeActive ? "#7A4B13" : "#6D7F79"}
                    >
                      {node.sublabel}
                    </text>
                  </g>
                );
              })}

              {/* Compass mark */}
              <g transform="translate(306, 52)">
                <circle r="15" fill="#FFFFFF" fillOpacity="0.8" stroke="#D8E2DA" />
                <text
                  x="0"
                  y="3.5"
                  textAnchor="middle"
                  fill="#145143"
                  className="text-[10px] font-bold"
                >
                  N
                </text>
              </g>
            </svg>
          </div>

          <p className="text-[11px] text-muted leading-relaxed">
            Stylized schematic (not to scale). Select any day above or launch Google Maps / Apple Maps beside any stop for turn-by-turn GPS routing.
          </p>
        </section>

        {/* Day-by-Day Navigation Directory */}
        <div className="lg:col-span-7 space-y-5">
          {visibleDays.map((day) => (
            <section
              key={day.date}
              className="bg-white rounded-card p-5 border border-line/90 shadow-card space-y-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-line/70">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-antique-gold-dark">
                    Day {day.dayNumber} · {day.date.slice(5)} · {day.regionLabel}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink leading-tight mt-0.5">
                    {day.title}
                  </h3>
                  <p className="text-xs text-muted flex items-center gap-1 mt-1">
                    <MapPin size={12} className="text-antique-gold shrink-0" />
                    <span>
                      {day.from} → {day.to}
                    </span>
                  </p>
                </div>

                <Link
                  href={`/day/${day.date}`}
                  className="tap-row inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-mist hover:bg-sage text-forest text-xs font-semibold border border-line/80 transition-colors shrink-0"
                >
                  <span>Day Route</span>
                  <ChevronRight size={14} />
                </Link>
              </div>

              <div className="space-y-2.5">
                {day.stops.map((stop, idx) => {
                  const place = placesMap[stop.placeId];
                  if (!place) return null;

                  return (
                    <div
                      key={stop.id}
                      className="p-3.5 rounded-2xl bg-mist/45 border border-line/75 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-forest text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <Link
                            href={`/places/${place.slug}`}
                            className="font-semibold text-sm text-ink hover:text-forest truncate transition-colors"
                          >
                            {place.title}
                          </Link>
                          <Badge type={stop.priority} className="hidden sm:inline-flex" />
                        </div>
                        <p className="text-xs text-muted truncate pl-8">{place.region}</p>
                      </div>

                      <div className="flex items-center gap-2 pl-8 sm:pl-0 shrink-0">
                        <a
                          href={getGoogleMapsUrl(
                            place.mapQuery,
                            place.latitude,
                            place.longitude
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tap-row inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-forest text-white text-xs font-semibold hover:bg-forest-light transition-colors"
                        >
                          <Navigation size={12} />
                          <span>Google Maps</span>
                        </a>

                        <a
                          href={getAppleMapsUrl(
                            place.mapQuery,
                            place.latitude,
                            place.longitude
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tap-row inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-line text-forest text-xs font-semibold hover:bg-sage-light transition-colors"
                        >
                          <span>Apple</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
