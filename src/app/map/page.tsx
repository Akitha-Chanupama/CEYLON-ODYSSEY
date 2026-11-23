import Link from "next/link";
import { days } from "@/content/days";
import { places } from "@/content/places";
import { getGoogleMapsUrl, getAppleMapsUrl } from "@/lib/navigation";
import {
  MapPin,
  Navigation,
  ExternalLink,
  Calendar,
  Compass,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

export default function MapDirectoryPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-line/60 px-4 py-3">
        <div className="max-w-md mx-auto">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-antique-gold">
            Navigation Directory
          </span>
          <h1 className="text-xl font-serif font-bold text-ink">
            Route & Destination Map
          </h1>
          <p className="text-xs text-muted">Genuine navigation links for all 7 tour days</p>
        </div>
      </header>

      <div className="mobile-container py-5 space-y-6">
        {/* Transparent navigation notice */}
        <div className="bg-sage/40 rounded-xl p-3.5 border border-line text-xs text-ink/85 flex items-start gap-2.5 leading-relaxed">
          <Navigation size={16} className="text-forest shrink-0 mt-0.5" />
          <div>
            <strong>Authentic External Navigation: </strong>
            Tap any destination below to launch directions in Google Maps or Apple Maps with validated coordinates or queries.
          </div>
        </div>

        {/* Day-by-Day Route Sequence */}
        <div className="space-y-5">
          {days.map((day) => (
            <section
              key={day.date}
              className="bg-white rounded-card p-4 border border-line shadow-card space-y-3"
            >
              <div className="flex items-center justify-between border-b border-line/60 pb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-antique-gold">
                    Day {day.dayNumber} · {day.date.slice(5)}
                  </span>
                  <h2 className="text-sm font-bold text-ink leading-tight">
                    {day.title}
                  </h2>
                </div>

                <Link
                  href={`/day/${day.date}`}
                  className="text-xs font-semibold text-forest hover:underline flex items-center gap-0.5"
                >
                  <span>Route</span>
                  <ChevronRight size={13} />
                </Link>
              </div>

              <div className="space-y-2">
                {day.stops.map((stop, i) => {
                  const place = places[stop.placeId];
                  if (!place) return null;

                  return (
                    <div
                      key={stop.id}
                      className="p-2.5 rounded-xl bg-sage/20 border border-line/60 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-forest/10 text-forest text-[11px] font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <h3 className="text-xs font-bold text-ink truncate">
                            {place.title}
                          </h3>
                        </div>
                        <p className="text-[10px] text-muted truncate mt-0.5 pl-6.5">
                          {place.region}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <a
                          href={getGoogleMapsUrl(place.mapQuery, place.latitude, place.longitude)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-forest text-white text-[11px] font-semibold flex items-center gap-1 hover:bg-forest-light transition-colors"
                          title="Open Google Maps"
                        >
                          <Navigation size={10} />
                          <span>Maps</span>
                        </a>

                        <a
                          href={getAppleMapsUrl(place.mapQuery, place.latitude, place.longitude)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-white border border-line text-forest text-[11px] font-semibold flex items-center gap-1 hover:bg-sage/40 transition-colors"
                          title="Open Apple Maps"
                        >
                          <ExternalLink size={10} />
                          <span>Apple</span>
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
