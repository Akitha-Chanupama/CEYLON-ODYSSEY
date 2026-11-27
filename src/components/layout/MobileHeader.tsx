import Link from "next/link";
import { Heart, Info, Map } from "lucide-react";

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
}

export function MobileHeader({
  title = "Discover Sri Lanka",
  subtitle = "Our Island Journey",
}: MobileHeaderProps) {
  return (
    <header className="md:hidden sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-line/70 px-4 py-2.5">
      <div className="max-w-lg mx-auto flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-antique-gold-dark truncate">
            Ayubowan · {subtitle}
          </p>
          <h1 className="font-serif text-lg font-semibold text-ink leading-tight truncate">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Link
            href="/map"
            className="tap-target flex items-center justify-center w-11 h-11 rounded-full bg-white border border-line text-forest hover:bg-sage/50 transition-colors"
            title="Island route map"
            aria-label="Island route map"
          >
            <Map size={17} />
          </Link>
          <Link
            href="/saved"
            className="tap-target flex items-center justify-center w-11 h-11 rounded-full bg-white border border-line text-forest hover:bg-sage/50 transition-colors"
            title="Saved places"
            aria-label="Saved places"
          >
            <Heart size={17} />
          </Link>
          <Link
            href="/welcome"
            className="tap-target flex items-center justify-center w-11 h-11 rounded-full bg-sage/75 border border-line text-forest hover:bg-sage transition-colors"
            title="Trip orientation and welcome"
            aria-label="Trip orientation"
          >
            <Info size={17} />
          </Link>
        </div>
      </div>
    </header>
  );
}

