"use client";

import { useBookmarks } from "@/lib/bookmarks";
import { Heart } from "lucide-react";

interface SaveButtonProps {
  placeId: string;
  variant?: "default" | "icon";
  className?: string;
}

export function SaveButton({
  placeId,
  variant = "default",
  className = "",
}: SaveButtonProps) {
  const { toggleBookmark, isBookmarked, isLoaded } = useBookmarks();
  const saved = isLoaded && isBookmarked(placeId);

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => toggleBookmark(placeId)}
        aria-pressed={saved}
        aria-label={saved ? "Remove from saved places" : "Save this place"}
        className={`tap-target inline-flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md border shadow-sm transition-colors ${
          saved
            ? "bg-[#FFF5E2]/95 text-antique-gold-dark border-antique-gold/50"
            : "bg-white/90 text-ink border-white/60 hover:bg-white"
        } ${className}`}
      >
        <Heart
          size={18}
          className={saved ? "fill-antique-gold text-antique-gold-dark" : "text-ink/80"}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(placeId)}
      aria-pressed={saved}
      className={`tap-row inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors ${
        saved
          ? "bg-amber-50 text-amber-950 border-amber-200"
          : "bg-white text-ink border-line hover:bg-sage/40"
      } ${className}`}
      aria-label={saved ? "Remove from saved places" : "Save this place"}
    >
      <Heart
        size={15}
        className={saved ? "fill-antique-gold text-antique-gold-dark" : "text-muted"}
      />
      <span>{saved ? "Saved" : "Save Place"}</span>
    </button>
  );
}
