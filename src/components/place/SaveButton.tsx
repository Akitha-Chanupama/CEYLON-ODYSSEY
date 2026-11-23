"use client";

import { useBookmarks } from "@/lib/bookmarks";
import { Heart } from "lucide-react";

interface SaveButtonProps {
  placeId: string;
}

export function SaveButton({ placeId }: SaveButtonProps) {
  const { toggleBookmark, isBookmarked, isLoaded } = useBookmarks();
  const saved = isLoaded && isBookmarked(placeId);

  return (
    <button
      onClick={() => toggleBookmark(placeId)}
      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
        saved
          ? "bg-amber-50 text-amber-900 border-amber-200"
          : "bg-white text-ink border-line hover:bg-sage/40"
      }`}
      aria-label={saved ? "Remove from saved places" : "Save this place"}
    >
      <Heart
        size={14}
        className={saved ? "fill-antique-gold text-antique-gold" : "text-muted"}
      />
      <span>{saved ? "Saved" : "Save Place"}</span>
    </button>
  );
}
