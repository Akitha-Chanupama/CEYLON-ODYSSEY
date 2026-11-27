import { days } from "@/content/days";
import { places } from "@/content/places";
import { SriLankaRouteMap } from "@/components/map/SriLankaRouteMap";
import { Navigation } from "lucide-react";

export default function MapDirectoryPage() {
  return (
    <div className="bg-ivory">
      <div className="app-container pt-6 pb-10 md:py-10 space-y-6 md:space-y-8 animate-fade-rise">
        <header className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-antique-gold-dark">
            Navigation Directory
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink tracking-tight leading-tight">
            Route &amp; Destination Map
          </h1>
          <p className="text-sm text-muted max-w-2xl leading-relaxed">
            Follow the island route schematic across all seven days and open verified turn-by-turn coordinates in Google Maps or Apple Maps.
          </p>
        </header>

        <div className="bg-sage/60 rounded-2xl p-4 border border-line text-xs sm:text-[13px] text-ink/90 flex items-start gap-3 leading-relaxed">
          <Navigation size={17} className="text-forest shrink-0 mt-0.5" />
          <div>
            <strong className="text-forest font-semibold">Authentic External Navigation: </strong>
            All destinations below use validated Sri Lanka coordinates and query links—no guessed shortcuts or third-party map tiles required offline.
          </div>
        </div>

        <SriLankaRouteMap days={days} placesMap={places} />
      </div>
    </div>
  );
}
