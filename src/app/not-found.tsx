import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="app-container py-16 flex flex-col items-center justify-center text-center">
      <div className="bg-white rounded-card p-8 sm:p-10 border border-line shadow-card max-w-md w-full space-y-5">
        <div className="w-16 h-16 rounded-full bg-sage-light border border-line flex items-center justify-center text-forest mx-auto">
          <Compass size={30} />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-semibold text-ink">
            Destination Not Found
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            The trail path you requested is not part of this seven-day Sri Lanka itinerary.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link
            href="/"
            className="tap-row inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest text-white text-xs font-semibold shadow-sm hover:bg-forest-light transition-colors"
          >
            <Home size={15} />
            <span>Return to Today</span>
          </Link>
          <Link
            href="/explore"
            className="tap-row inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-line text-forest text-xs font-semibold hover:bg-sage-light transition-colors"
          >
            <span>Explore Destinations</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
