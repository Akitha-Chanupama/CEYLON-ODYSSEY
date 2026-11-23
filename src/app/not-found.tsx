import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-sage/60 flex items-center justify-center text-forest mb-4">
        <Compass size={32} />
      </div>
      <h1 className="text-2xl font-serif font-bold text-ink mb-2">Destination Not Found</h1>
      <p className="text-sm text-muted max-w-xs mb-6">
        The trail path you requested is not part of this seven-day Sri Lanka itinerary.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest text-white text-sm font-medium shadow-sm hover:bg-forest-light transition-colors"
      >
        <Home size={16} />
        <span>Return to Today</span>
      </Link>
    </div>
  );
}

