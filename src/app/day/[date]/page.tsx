import Link from "next/link";
import { notFound } from "next/navigation";
import { days } from "@/content/days";
import { places } from "@/content/places";
import { mediaRecords } from "@/content/media";
import { formatTourDate } from "@/lib/dates";
import { HeroFrame } from "@/components/common/HeroFrame";
import { Badge } from "@/components/common/Badge";
import { StopTimeline } from "@/components/itinerary/StopTimeline";
import {
  AlertTriangle,
  Bed,
  ChevronLeft,
  ChevronRight,
  Luggage,
  Map,
  MapPin,
} from "lucide-react";

export function generateStaticParams() {
  return days.map((day) => ({
    date: day.date,
  }));
}

interface DayPageProps {
  params: Promise<{ date: string }>;
}

export default async function DayDetailPage({ params }: DayPageProps) {
  const { date } = await params;
  const dayIndex = days.findIndex((d) => d.date === date);

  if (dayIndex === -1) {
    notFound();
  }

  const currentDay = days[dayIndex];
  const prevDay = dayIndex > 0 ? days[dayIndex - 1] : null;
  const nextDay = dayIndex < days.length - 1 ? days[dayIndex + 1] : null;

  const heroMedia = currentDay.heroMediaId
    ? mediaRecords[currentDay.heroMediaId]
    : mediaRecords["hero-sri-lanka"];

  return (
    <div className="bg-ivory">
      {/* Mobile-only context bar */}
      <header className="md:hidden sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-line/70 px-4 py-2.5">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link
            href="/journey"
            className="tap-row inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-forest-deep"
          >
            <ChevronLeft size={16} />
            <span>All 7 Days</span>
          </Link>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-antique-gold-dark">
            Day {currentDay.dayNumber} of 7
          </span>
        </div>
      </header>

      <div className="app-container pt-4 pb-10 md:py-8 space-y-8 animate-fade-rise">
        {/* Desktop Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="hidden md:flex items-center justify-between text-xs text-muted"
        >
          <div className="flex items-center gap-2">
            <Link href="/journey" className="hover:text-forest font-medium transition-colors">
              7-Day Journey
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink font-semibold">
              Day {currentDay.dayNumber} · {formatTourDate(currentDay.date)}
            </span>
          </div>
          <Link
            href="/map"
            className="inline-flex items-center gap-1.5 font-semibold text-forest hover:underline"
          >
            <Map size={13} />
            <span>View on Route Map</span>
          </Link>
        </nav>

        {/* Split Editorial Hero */}
        <HeroFrame
          variant="split"
          media={heroMedia}
          fallbackTitle={currentDay.title}
          eyebrow={`Day ${currentDay.dayNumber} of 7 · ${formatTourDate(currentDay.date)}`}
          title={currentDay.title}
          subtitle={currentDay.teaser}
          badges={
            <>
              <Badge
                type={currentDay.operationalStatus === "verified" ? "verified" : "check-again"}
                label={
                  currentDay.operationalStatus === "verified"
                    ? "Verified Schedule"
                    : "Host Reconfirms"
                }
              />
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/12 border border-white/20 text-[11px] font-medium text-white/95 whitespace-nowrap">
                <MapPin size={11} className="text-antique-gold-light" />
                <span>
                  {currentDay.from} → {currentDay.to}
                </span>
              </span>
            </>
          }
          actions={
            <a
              href="#tour-sequence"
              className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-forest text-xs font-semibold shadow-sm hover:bg-sage transition-colors"
            >
              <span>Jump to {currentDay.stops.length} Stops</span>
              <ChevronRight size={14} />
            </a>
          }
        />

        {/* Desktop 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Timeline Column */}
          <section id="tour-sequence" className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <div>
                <h2 className="font-serif text-2xl sm:text-[28px] font-semibold text-ink tracking-tight">
                  Tour Sequence ({currentDay.stops.length} Stops)
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  Ordered itinerary for {currentDay.regionLabel}
                </p>
              </div>
            </div>

            <StopTimeline
              stops={currentDay.stops}
              placesMap={places}
              mediaMap={mediaRecords}
            />
          </section>

          {/* Practical Sidebar */}
          <aside className="lg:col-span-4 space-y-5">
            {currentDay.estimatedRoadTransfer && (
              <div className="rounded-card bg-warning-bg/85 p-4 border border-[#EED7B0] flex items-start gap-3 text-xs text-warning-text leading-relaxed shadow-sm">
                <AlertTriangle size={17} className="shrink-0 mt-0.5 text-antique-gold-dark" />
                <div>
                  <p className="font-bold mb-0.5">Road Planning Estimate</p>
                  <p>{currentDay.estimatedRoadTransfer}</p>
                </div>
              </div>
            )}

            {currentDay.notes.length > 0 && (
              <section className="bg-white rounded-card p-5 border border-line/90 shadow-card space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-forest flex items-center gap-1.5">
                  <Luggage size={15} className="text-antique-gold-dark" />
                  <span>Prepare for Today</span>
                </h3>
                <ul className="space-y-2 text-xs text-ink/85 leading-relaxed">
                  {currentDay.notes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-antique-gold-dark font-bold mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="bg-white rounded-card p-5 border border-line/90 shadow-card space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Bed size={15} className="text-forest" />
                <span>Overnight Base</span>
              </h3>
              <p className="font-serif text-xl font-semibold text-ink">
                {currentDay.overnightLocation || "To Confirm"}
              </p>
              <p className="text-xs text-muted leading-relaxed">
                {currentDay.hotelName
                  ? currentDay.hotelName
                  : "Hotel confirmation and check-in details will be shared privately by your accompanying host."}
              </p>
            </section>
          </aside>
        </div>

        {/* Previous / Next Day Editorial Switcher */}
        <nav
          aria-label="Adjacent Tour Days"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-line"
        >
          {prevDay ? (
            <Link
              href={`/day/${prevDay.date}`}
              className="tap-row bg-white rounded-2xl p-4 border border-line/90 hover:border-forest/35 shadow-sm flex items-center gap-3 transition-colors"
            >
              <ChevronLeft size={18} className="text-forest shrink-0" />
              <div className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Previous · Day {prevDay.dayNumber}
                </span>
                <span className="block font-serif text-lg font-semibold text-ink truncate">
                  {prevDay.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextDay ? (
            <Link
              href={`/day/${nextDay.date}`}
              className="tap-row bg-white rounded-2xl p-4 border border-line/90 hover:border-forest/35 shadow-sm flex items-center justify-end gap-3 text-right transition-colors"
            >
              <div className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Next · Day {nextDay.dayNumber}
                </span>
                <span className="block font-serif text-lg font-semibold text-ink truncate">
                  {nextDay.title}
                </span>
              </div>
              <ChevronRight size={18} className="text-forest shrink-0" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </div>
  );
}
