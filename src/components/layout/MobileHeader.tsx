import Link from "next/link";
import { Info } from "lucide-react";

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
}

export function MobileHeader({
  title = "Discover Sri Lanka",
  subtitle = "Our Island Journey",
}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-line/60 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-antique-gold">
              ☼ Ayubowan
            </span>
          </div>
          <h1 className="text-base font-bold text-ink leading-tight">{title}</h1>
        </div>
        <Link
          href="/welcome"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-sage/60 text-forest hover:bg-sage transition-colors"
          title="Trip orientation and welcome"
          aria-label="Trip orientation"
        >
          <Info size={18} />
        </Link>
      </div>
    </header>
  );
}

