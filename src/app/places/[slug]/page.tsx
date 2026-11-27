import Link from "next/link";
import { notFound } from "next/navigation";
import { places } from "@/content/places";
import { sources } from "@/content/sources";
import { mediaRecords } from "@/content/media";
import { getAppleMapsUrl, getGoogleMapsUrl } from "@/lib/navigation";
import { formatPlaceTag, isRavanaPlace } from "@/lib/tags";
import { HeroFrame } from "@/components/common/HeroFrame";
import { Badge } from "@/components/common/Badge";
import { SaveButton } from "@/components/place/SaveButton";
import {
  BookOpen,
  Camera,
  CheckCircle,
  ChevronLeft,
  Clock,
  Compass,
  ExternalLink,
  Navigation,
  ShieldAlert,
  Shirt,
  Sparkles,
  Ticket,
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

  const heroMedia = place.heroMediaId ? mediaRecords[place.heroMediaId] : null;
  const isRavanaTrail = isRavanaPlace(place.tags);
  const relevantSources = sources.filter((s) => place.sourceIds.includes(s.id));
  const googleMapsUrl = getGoogleMapsUrl(place.mapQuery, place.latitude, place.longitude);
  const appleMapsUrl = getAppleMapsUrl(place.mapQuery, place.latitude, place.longitude);

  return (
    <div className="bg-ivory">
      {/* Mobile-only context bar */}
      <header className="md:hidden sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-line/70 px-4 py-2.5">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link
            href="/explore"
            className="tap-row inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-forest-deep"
          >
            <ChevronLeft size={16} />
            <span>Explore All</span>
          </Link>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
            Destination Guide
          </span>
        </div>
      </header>

      <div className="app-container pt-4 pb-10 md:py-8 space-y-6 md:space-y-8 animate-fade-rise">
        {/* Desktop Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="hidden md:flex items-center justify-between text-xs text-muted"
        >
          <div className="flex items-center gap-2">
            <Link href="/explore" className="hover:text-forest font-medium transition-colors">
              Explore Destinations
            </Link>
            <span aria-hidden="true">/</span>
            <span>{place.region}</span>
            <span aria-hidden="true">/</span>
            <span className="text-ink font-semibold">{place.title}</span>
          </div>
          <Link
            href="/map"
            className="inline-flex items-center gap-1 font-semibold text-forest hover:underline"
          >
            <span>Open Route Directory</span>
          </Link>
        </nav>

        {/* Split Editorial Hero */}
        <HeroFrame
          variant="split"
          media={heroMedia}
          fallbackTitle={place.title}
          eyebrow={place.region}
          title={place.title}
          subtitle={place.subtitle}
          showCredit={false}
          badges={place.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/14 border border-white/20 text-[11px] font-medium text-white whitespace-nowrap"
            >
              {formatPlaceTag(tag)}
            </span>
          ))}
          actions={
            <>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-forest text-xs font-semibold shadow-sm hover:bg-sage transition-colors"
              >
                <Navigation size={14} />
                <span>Google Maps</span>
              </a>
              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-row inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/12 text-white border border-white/25 text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                <span>Apple Maps</span>
                <ExternalLink size={12} />
              </a>
              <SaveButton placeId={place.id} />
            </>
          }
        />

        {/* Photo Attribution & License Strip */}
        <div className="rounded-xl bg-sage/55 px-4 py-2.5 border border-line/80 text-xs text-muted flex flex-wrap items-center justify-between gap-2">
          {heroMedia ? (
            <>
              <span className="inline-flex items-center gap-1.5">
                <Camera size={13} className="text-forest shrink-0" />
                <span>Photo: {heroMedia.credit}</span>
              </span>
              {heroMedia.creditUrl ? (
                <a
                  href={heroMedia.creditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest font-semibold underline hover:text-forest-deep"
                >
                  {heroMedia.license}
                </a>
              ) : (
                <span className="text-forest font-semibold">{heroMedia.license}</span>
              )}
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5">
                <Camera size={13} className="text-forest shrink-0" />
                <span>Editorial illustration placeholder</span>
              </span>
              <span className="text-forest font-semibold">Licensed photo pending</span>
            </>
          )}
        </div>

        {/* Two-Column Editorial Reading & Practical Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Primary Reading Column */}
          <div className="lg:col-span-8 space-y-6">
            {isRavanaTrail && (
              <div className="bg-gradient-to-r from-[#F9EFE0] to-[#F4E4C8] p-5 rounded-card border border-[#E8D0B1] text-[#6D4813] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-antique-gold-dark">
                    <Sparkles size={14} className="text-antique-gold" />
                    <span>Part of the Ravana Trail</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5C3C0E] leading-relaxed">
                    This site belongs to Sri Lanka&apos;s living Ramayana pilgrimage tradition. Historical archaeology and traditional lore are labeled separately below.
                  </p>
                </div>
                <Link
                  href="/ravana-trail"
                  className="tap-row shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/90 text-antique-gold-dark border border-[#E8D0B1] text-xs font-semibold hover:bg-white transition-colors"
                >
                  <span>Full Trail Guide</span>
                </Link>
              </div>
            )}

            {/* Overview */}
            <section className="bg-white rounded-card p-6 border border-line/90 shadow-card space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-antique-gold-dark">
                Overview &amp; Sense of Place
              </span>
              <div className="reading-container mx-0 space-y-3 text-[15px] leading-relaxed text-ink/90">
                <p className="font-medium text-ink">{place.shortIntro}</p>
                <p className="text-ink/80">{place.overview}</p>
              </div>
            </section>

            {/* Highlights */}
            {place.highlights.length > 0 && (
              <section className="bg-white rounded-card p-6 border border-line/90 shadow-card space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-ink flex items-center gap-2">
                  <Compass size={20} className="text-forest" />
                  <span>What to Look For</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {place.highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-mist/55 border border-line/70 flex items-start gap-2.5 text-xs sm:text-[13px] text-ink/90 leading-relaxed"
                    >
                      <CheckCircle size={15} className="text-forest mt-0.5 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Stories & Heritage */}
            {place.stories.length > 0 && (
              <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                  <h2 className="font-serif text-2xl sm:text-[28px] font-semibold text-ink flex items-center gap-2">
                    <BookOpen size={20} className="text-forest" />
                    <span>Stories &amp; Heritage</span>
                  </h2>
                  <span className="text-xs text-muted">
                    History vs. tradition clearly labeled
                  </span>
                </div>

                <div className="space-y-4">
                  {place.stories.map((story, i) => (
                    <article
                      key={i}
                      className="bg-white rounded-card p-5 sm:p-6 border border-line/90 shadow-card space-y-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="font-serif text-xl font-semibold text-ink leading-snug">
                          {story.title}
                        </h3>
                        <Badge type={story.classification} />
                      </div>
                      <p className="text-sm text-ink/90 leading-relaxed">{story.short}</p>
                      {story.full && (
                        <p className="text-sm text-muted leading-relaxed pt-1 border-t border-line/50">
                          {story.full}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Practical Sidebar */}
          <aside className="lg:col-span-4 space-y-5">
            {/* Operational Transparency Card */}
            <section className="bg-white rounded-card p-5 border border-line/90 shadow-card space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-forest">
                  Visitor Status
                </h2>
                <Badge
                  type={
                    place.operationalInfoStatus === "verified" ? "verified" : "check-again"
                  }
                />
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Clock size={15} className="text-forest mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-ink">Hours</p>
                    <p className="text-muted mt-0.5 leading-relaxed">
                      {place.openHours || "To confirm locally with your accompanying host."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 pt-2.5 border-t border-line/60">
                  <Ticket size={15} className="text-forest mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-ink">Entry &amp; Tickets</p>
                    <p className="text-muted mt-0.5 leading-relaxed">
                      {place.ticketPrice || "Fee schedules checked at official ticket counters on arrival."}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Attire, Mobility & Safety */}
            <section className="bg-white rounded-card p-5 border border-line/90 shadow-card space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-forest">
                Before You Go
              </h2>

              {place.attireAndEtiquette && place.attireAndEtiquette.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                    <Shirt size={14} className="text-forest" />
                    <span>Attire &amp; Temple Etiquette</span>
                  </div>
                  <ul className="text-xs text-ink/85 space-y-1.5 pl-4 list-disc leading-relaxed">
                    {place.attireAndEtiquette.map((att, i) => (
                      <li key={i}>{att}</li>
                    ))}
                  </ul>
                </div>
              )}

              {place.mobilityNotes && (
                <div className="space-y-1.5 pt-3 border-t border-line/65">
                  <p className="text-xs font-semibold text-ink">Walking &amp; Mobility</p>
                  <p className="text-xs text-ink/80 leading-relaxed">{place.mobilityNotes}</p>
                </div>
              )}

              {place.safetyNotes && place.safetyNotes.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-line/65">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-warning-text">
                    <ShieldAlert size={14} className="text-antique-gold-dark" />
                    <span>Safety &amp; Precautions</span>
                  </div>
                  <ul className="text-xs text-warning-text space-y-1.5 pl-4 list-disc leading-relaxed">
                    {place.safetyNotes.map((sn, i) => (
                      <li key={i}>{sn}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Verified Sources */}
            <section className="bg-sage/45 rounded-card p-5 border border-line/80 space-y-3 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                Verified Source Authorities
              </span>
              <p className="text-xs text-muted leading-relaxed">
                Historical, site location, and Ramayana tradition details draw strictly on these documented references:
              </p>

              <div className="space-y-2">
                {relevantSources.map((source) => (
                  <a
                    key={source.id}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-row flex items-center justify-between gap-2 p-3 rounded-xl bg-white border border-line/85 text-forest hover:bg-sage-light transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-xs truncate font-semibold">{source.title}</p>
                      <p className="text-[11px] text-muted truncate mt-0.5">
                        {source.publisher}
                      </p>
                    </div>
                    <ExternalLink size={14} className="shrink-0 text-muted" />
                  </a>
                ))}
              </div>

              <p className="text-[11px] text-muted pt-1">
                Last reviewed: {place.lastReviewedAt || "2026-11-23"}
              </p>
            </section>
          </aside>
        </div>

        {/* Return CTA */}
        <div className="pt-2">
          <Link
            href="/explore"
            className="tap-row inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-line text-forest text-xs font-semibold hover:bg-sage-light transition-colors shadow-sm"
          >
            <ChevronLeft size={15} />
            <span>Back to All Destinations</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
