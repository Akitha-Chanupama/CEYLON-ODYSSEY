import React from "react";
import { MediaRecord } from "@/types";
import { PlaceImage } from "@/components/common/PlaceImage";
import { Camera } from "lucide-react";

interface HeroFrameProps {
  media: MediaRecord | null | undefined;
  fallbackTitle: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  badges?: React.ReactNode;
  actions?: React.ReactNode;
  sizes?: string;
  priority?: boolean;
  variant?: "banner" | "split";
  showCredit?: boolean;
  className?: string;
}

/**
 * Responsive editorial hero container constrained in height so titles and primary
 * actions remain visible above the fold across mobile and desktop viewports.
 */
export function HeroFrame({
  media,
  fallbackTitle,
  eyebrow,
  title,
  subtitle,
  badges,
  actions,
  sizes = "(max-width: 768px) 100vw, 1080px",
  priority = true,
  variant = "banner",
  showCredit = true,
  className = "",
}: HeroFrameProps) {
  const creditPill =
    showCredit && media ? (
      media.creditUrl ? (
        <a
          href={media.creditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] font-medium text-white/90 hover:bg-black/65 hover:text-white transition-colors"
        >
          <Camera size={11} className="shrink-0 text-antique-gold-light" />
          <span className="truncate max-w-[200px] sm:max-w-[260px]">{media.credit}</span>
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-[10px] font-medium text-white/90">
          <Camera size={11} className="shrink-0 text-antique-gold-light" />
          <span className="truncate max-w-[200px] sm:max-w-[260px]">{media.credit}</span>
        </span>
      )
    ) : null;

  if (variant === "split") {
    return (
      <section
        className={`relative rounded-card overflow-hidden border border-line/80 bg-forest-deep text-white shadow-elevated md:grid md:grid-cols-12 ${className}`}
      >
        <div className="relative h-[240px] sm:h-[300px] md:h-auto md:min-h-[360px] md:max-h-[440px] md:col-span-7 overflow-hidden bg-forest-dark">
          <PlaceImage
            media={media}
            fallbackTitle={fallbackTitle}
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-transparent to-black/15 md:bg-gradient-to-r md:from-transparent md:to-forest-deep/35" />
          {creditPill && <div className="absolute bottom-3 left-3 z-10">{creditPill}</div>}
        </div>

        <div className="p-5 sm:p-7 lg:p-8 md:col-span-5 flex flex-col justify-between gap-5 bg-gradient-to-br from-forest-deep via-forest to-forest-dark">
          <div className="space-y-3">
            {eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-antique-gold-light">
                {eyebrow}
              </p>
            )}
            {badges && <div className="flex flex-wrap items-center gap-2">{badges}</div>}
            <h1 className="font-serif text-3xl sm:text-[2.25rem] lg:text-[2.5rem] font-semibold tracking-tight leading-[1.08] text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-[15px] text-white/85 leading-relaxed">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2.5 pt-1">{actions}</div>}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative rounded-card overflow-hidden border border-line/60 bg-forest-dark text-white shadow-elevated min-h-[300px] aspect-[4/3] sm:aspect-auto sm:h-[360px] lg:h-[420px] max-h-[460px] ${className}`}
    >
      <PlaceImage
        media={media}
        fallbackTitle={fallbackTitle}
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-deep/60 to-forest-dark/20" />

      {creditPill && (
        <div className="hidden sm:block absolute top-4 right-4 z-10">{creditPill}</div>
      )}

      <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-7 lg:p-9 gap-3">
        <div className="space-y-2 max-w-3xl">
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-antique-gold-light">
              {eyebrow}
            </p>
          )}
          {badges && <div className="flex flex-wrap items-center gap-1.5">{badges}</div>}
          <h1 className="font-serif text-[28px] sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.08] text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2.5 pt-1">{actions}</div>}
      </div>
    </section>
  );
}
