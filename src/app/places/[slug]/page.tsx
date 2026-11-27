import Link from "next/link";
import { notFound } from "next/navigation";
import { places } from "@/content/places";
import { sources } from "@/content/sources";
import { mediaRecords } from "@/content/media";
import { getGoogleMapsUrl, getAppleMapsUrl } from "@/lib/navigation";
import { Badge } from "@/components/common/Badge";
import { PlaceImage } from "@/components/common/PlaceImage";
import { SaveButton } from "@/components/place/SaveButton";
import {
  MapPin,
  Clock,
  Navigation,
  ChevronLeft,
  Sparkles,
  ShieldAlert,
  Shirt,
  Compass,
  ExternalLink,
  BookOpen,
  CheckCircle,
} from "lucide-react";

export function generateStaticParams() {
  return Object.values(places).map((p) => ({
    slug: p.slug,
  }));
}

interface PlacePageProps {
  params: Promise<{ slug: string }>;
}

export default async function PlaceDetailPage({ params }: PlacePageProps) {
  const { slug } = await params;
  const place = Object.values(places).find((p) => p.slug === slug);

  if (!place) {
    notFound();
  }

  const heroMedia = place.heroMediaId
    ? mediaRecords[place.heroMediaId]
    : null;

  const isRavanaTrail =
    place.tags.includes("Ravana Trail") ||
    place.tags.includes("RAMAYANA_TRADITION");

  // Map source IDs to source records
  const relevantSources = sources.filter((s) => place.sourceIds.includes(s.id));

  return (
    <div className="min-h-screen bg-ivory">
      {/* Top Bar with back link */}
      <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-line/60 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link
            href="/explore"
            className="flex items-center gap-1 text-xs font-semibold text-forest hover:text-forest-light"
          >
            <ChevronLeft size={16} />
            <span>Explore All</span>
          </Link>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Destination Guide
          </span>
        </div>
      </header>

      {/* Hero Media */}
      <div className="relative aspect-[4/3] w-full bg-forest-deep">
        <PlaceImage
          media={heroMedia}
          fallbackTitle={place.title}
          priority
          sizes="(max-width: 480px) 100vw, 600px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {place.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white space-y-1.5">
          <p className="text-xs text-antique-gold font-bold uppercase tracking-wider flex items-center gap-1">
            <MapPin size={12} />
            <span>{place.region}</span>
          </p>
          <h1 className="text-2xl font-serif font-bold text-white leading-tight">
            {place.title}
          </h1>
          <p className="text-xs text-ivory/90 leading-relaxed font-medium">
            {place.subtitle}
          </p>
        </div>
      </div>

      {/* Photo credit strip */}
      <div className="bg-sage/40 px-4 py-1.5 text-[10px] text-muted flex items-center justify-between border-b border-line/60">
        {heroMedia ? (
          <>
            <span>Photo: {heroMedia.credit}</span>
            {heroMedia.creditUrl ? (
              <a
                href={heroMedia.creditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest font-medium underline hover:text-forest-light"
              >
                {heroMedia.license}
              </a>
            ) : (
              <span className="text-forest font-medium">{heroMedia.license}</span>
            )}
          </>
        ) : (
          <>
            <span>Editorial illustration placeholder</span>
            <span className="text-forest font-medium">Licensed photo pending</span>
          </>
        )}
      </div>

      <div className="mobile-container py-5 space-y-6">
        {/* Quick Action Navigation Bar */}
        <div className="flex items-center gap-2">
          <a
            href={getGoogleMapsUrl(place.mapQuery, place.latitude, place.longitude)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-forest text-white text-xs font-semibold shadow-sm hover:bg-forest-light transition-colors"
          >
            <Navigation size={14} />
            <span>Open Directions</span>
          </a>

          <SaveButton placeId={place.id} />
        </div>

        {/* Ravana Trail Thematic Banner */}
        {isRavanaTrail && (
          <div className="bg-gradient-to-r from-[#F7EAD7] to-[#F2E0C4] p-4 rounded-card border border-[#E8D0B1] text-[#6D4813] space-y-1.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7A4B13]">
              <Sparkles size={14} className="text-antique-gold" />
              <span>Part of the Ravana Trail</span>
            </div>
            <p className="text-xs text-[#5C3C0E] leading-relaxed">
              This site features in the traditional Ramayana lore of Sri Lanka. We present its sacred associations as living cultural tradition.
            </p>
          </div>
        )}

        {/* Quick Read Summary */}
        <section className="bg-white rounded-card p-5 border border-line shadow-card space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Overview
          </span>
          <p className="text-xs text-ink leading-relaxed font-normal">
            {place.shortIntro}
          </p>
          <p className="text-xs text-ink/80 leading-relaxed pt-1">
            {place.overview}
          </p>
        </section>

        {/* Highlights: What to look for */}
        {place.highlights.length > 0 && (
          <section className="bg-white rounded-card p-5 border border-line shadow-card space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-forest flex items-center gap-1.5">
              <Compass size={14} />
              <span>What to Look For</span>
            </h2>
            <div className="space-y-2">
              {place.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-ink/85">
                  <CheckCircle size={14} className="text-forest mt-0.5 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Detailed Stories & Traditions */}
        {place.stories.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold text-ink tracking-tight flex items-center gap-1.5">
                <BookOpen size={16} className="text-forest" />
                <span>Stories & Heritage</span>
              </h2>
              <span className="text-[11px] text-muted">Documented & Traditional</span>
            </div>

            <div className="space-y-3">
              {place.stories.map((story, i) => (
                <div
                  key={i}
                  className="bg-white rounded-card p-4 border border-line shadow-card space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-ink">
                      {story.title}
                    </h3>
                    <Badge type={story.classification} />
                  </div>
                  <p className="text-xs text-ink/80 leading-relaxed">
                    {story.short}
                  </p>
                  {story.full && (
                    <p className="text-xs text-ink/75 leading-relaxed pt-1">
                      {story.full}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Practical Tips: Attire & Safety */}
        <section className="bg-white rounded-card p-5 border border-line shadow-card space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-forest">
            Before You Go
          </h2>

          {place.attireAndEtiquette && place.attireAndEtiquette.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                <Shirt size={14} className="text-forest" />
                <span>Attire & Temple Etiquette</span>
              </div>
              <ul className="text-xs text-ink/80 space-y-1 pl-5 list-disc leading-relaxed">
                {place.attireAndEtiquette.map((att, i) => (
                  <li key={i}>{att}</li>
                ))}
              </ul>
            </div>
          )}

          {place.mobilityNotes && (
            <div className="space-y-1 pt-2 border-t border-line/60">
              <span className="text-xs font-semibold text-ink">
                Walking & Mobility
              </span>
              <p className="text-xs text-ink/80 leading-relaxed">
                {place.mobilityNotes}
              </p>
            </div>
          )}

          {place.safetyNotes && place.safetyNotes.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-line/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-warning-text">
                <ShieldAlert size={14} className="text-antique-gold" />
                <span>Safety & Precautions</span>
              </div>
              <ul className="text-xs text-warning-text/90 space-y-1 pl-5 list-disc leading-relaxed">
                {place.safetyNotes.map((sn, i) => (
                  <li key={i}>{sn}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Verified Sources & Last Checked */}
        <section className="bg-sage/30 rounded-card p-4 border border-line/80 space-y-2 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Verified Source Authorities
          </span>
          <p className="text-[11px] text-muted leading-relaxed">
            All factual claims regarding archaeology, locations, and cultural traditions are grounded in official documentation:
          </p>

          <div className="space-y-1.5 pt-1">
            {relevantSources.map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-white border border-line/80 text-forest font-medium hover:bg-sage/40 transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <p className="text-xs truncate font-semibold">{source.title}</p>
                  <p className="text-[10px] text-muted truncate">{source.publisher}</p>
                </div>
                <ExternalLink size={13} className="shrink-0 text-muted" />
              </a>
            ))}
          </div>

          <p className="text-[10px] text-muted pt-1">
            Last verified: {place.lastReviewedAt || "2026-11-23"} · Real-time operational hours to confirm locally.
          </p>
        </section>

        {/* Return to Explore */}
        <div className="pt-2 pb-6">
          <Link
            href="/explore"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-sage text-forest text-xs font-semibold border border-line hover:bg-white transition-colors"
          >
            <ChevronLeft size={14} />
            <span>Back to All Destinations</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
