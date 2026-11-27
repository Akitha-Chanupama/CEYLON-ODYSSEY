import Link from "next/link";
import { mediaRecords } from "@/content/media";
import { tripConfig } from "@/content/trip";
import { days } from "@/content/days";
import { HeroFrame } from "@/components/common/HeroFrame";
import {
  ArrowRight,
  Calendar,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function WelcomePage() {
  const heroMedia = mediaRecords["hero-sri-lanka"];

  return (
    <div className="bg-ivory">
      <div className="app-container pt-5 pb-10 md:py-10 space-y-8 animate-fade-rise">
        <HeroFrame
          variant="split"
          media={heroMedia}
          fallbackTitle="Discover Sri Lanka"
          eyebrow="Ayubowan · Private Two-Guest Companion"
          title="Discover Sri Lanka"
          subtitle={tripConfig.subtitle}
          actions={
            <>
              <Link
                href="/"
                className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-forest text-xs font-semibold shadow-sm hover:bg-sage transition-colors"
              >
                <Calendar size={14} />
                <span>Go to Today&apos;s Plan</span>
              </Link>
              <Link
                href="/journey"
                className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/12 text-white border border-white/25 text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                <span>7-Day Overview</span>
                <ArrowRight size={14} />
              </Link>
            </>
          }
        />

        {/* Welcome Letter + Ravana Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <section className="lg:col-span-7 bg-white rounded-card p-6 sm:p-7 border border-line/90 shadow-card space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-antique-gold-dark">
              To Our Honored Guests
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink leading-tight">
              A Journey of Wonder, Heritage &amp; Living Legends
            </h2>
            <p className="text-[15px] text-ink/85 leading-relaxed">
              Welcome to your private travel companion crafted specially for your week across Sri Lanka from{" "}
              <strong>21 to 27 December 2026</strong>.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              Over seven days you will travel from ancient boulder citadels and painted cave sanctuaries in the Cultural Triangle, upward through tea-covered central hills, and south toward the waves of Unawatuna and Galle Fort.
            </p>
          </section>

          <section className="lg:col-span-5 bg-gradient-to-br from-forest-deep via-forest to-forest-dark rounded-card p-6 sm:p-7 text-white shadow-elevated flex flex-col justify-between gap-4 border border-forest-light/30">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-antique-gold-light">
                <Sparkles size={16} />
                <span>Special Narrative Theme</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold leading-snug">
                The Ravana Trail Across Sri Lanka
              </h3>
              <p className="text-sm text-white/85 leading-relaxed">
                Explore five cherished Ramayana landmarks—Ramboda Hanuman Temple, Seetha Amman Kovil, Ravana Cave, Ravana Falls, and Rumassala—with clear distinction between devotion and archaeology.
              </p>
            </div>
            <div>
              <Link
                href="/ravana-trail"
                className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-antique-gold text-forest-dark text-xs font-bold shadow-sm hover:bg-antique-gold-light transition-colors"
              >
                <span>Explore The Ravana Trail</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        </div>

        {/* The Seven-Day Arc */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-serif text-2xl sm:text-[28px] font-semibold text-ink tracking-tight">
              The Seven-Day Arc
            </h2>
            <Link
              href="/journey"
              className="text-xs font-semibold text-forest hover:underline"
            >
              View Detailed Cards →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {days.map((day) => (
              <Link
                key={day.date}
                href={`/day/${day.date}`}
                className="tap-row bg-white rounded-2xl p-4 border border-line/90 flex items-center justify-between gap-3 shadow-sm hover:border-forest/35 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex flex-col items-center justify-center w-11 h-11 rounded-xl bg-sage-light border border-line text-forest font-bold shrink-0">
                    <span className="text-[9px] uppercase font-semibold text-muted leading-none">
                      Day
                    </span>
                    <span className="text-base leading-tight">{day.dayNumber}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg font-semibold text-ink truncate">
                      {day.title}
                    </h3>
                    <p className="text-xs text-muted flex items-center gap-1 mt-0.5 truncate">
                      <MapPin size={11} className="text-antique-gold shrink-0" />
                      <span className="truncate">
                        {day.from} → {day.to}
                      </span>
                    </p>
                  </div>
                </div>

                <span className="text-xs text-forest font-semibold shrink-0">
                  {day.date.slice(5)} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Honest Companion Principles */}
        <section className="bg-sage/55 rounded-card p-6 border border-line/80 space-y-2.5 text-sm text-ink/85 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-forest">
            <ShieldCheck size={16} />
            <span>Honest, Transparent Travel Companion</span>
          </div>
          <p>
            <strong className="text-ink">Legend vs. History:</strong> Archaeological history and living Ramayana cultural tradition are labeled separately on every destination page.
          </p>
          <p>
            <strong className="text-ink">Zero Guessed Operational Details:</strong> Flights, check-in hotels, live opening hours, and entry fees remain marked for private or local confirmation with your host.
          </p>
        </section>
      </div>
    </div>
  );
}
