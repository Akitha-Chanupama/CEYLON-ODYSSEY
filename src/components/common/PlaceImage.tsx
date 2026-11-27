import React from "react";
import Image from "next/image";
import { MediaRecord } from "@/types";
import { Compass } from "lucide-react";

interface PlaceImageProps {
  media: MediaRecord | null | undefined;
  fallbackTitle: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export function PlaceImage({
  media,
  fallbackTitle,
  sizes = "(max-width: 768px) 100vw, 600px",
  priority = false,
  className = "object-cover",
}: PlaceImageProps) {
  if (!media) {
    return (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-forest-deep via-forest to-[#1B5E4F] text-ivory/90 p-6 text-center"
        role="img"
        aria-label={`Illustrated placeholder for ${fallbackTitle} — licensed photograph coming soon`}
      >
        <div className="w-12 h-12 rounded-full border border-antique-gold/50 bg-white/10 flex items-center justify-center mb-2.5">
          <Compass size={22} className="text-antique-gold-light" />
        </div>
        <span className="text-[11px] uppercase tracking-widest text-antique-gold-light font-semibold">
          Editorial Illustration
        </span>
        <span className="text-xs text-ivory/80 mt-1 max-w-[220px]">
          Licensed photograph coming soon for {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      priority={priority}
      className={className}
      sizes={sizes}
      style={
        media.focalX !== undefined && media.focalY !== undefined
          ? { objectPosition: `${media.focalX}% ${media.focalY}%` }
          : undefined
      }
    />
  );
}
