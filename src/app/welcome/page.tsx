import Image from "next/image";
import Link from "next/link";
import { mediaRecords } from "@/content/media";
import { tripConfig } from "@/content/trip";
import { days } from "@/content/days";
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Heart, MapPin } from "lucide-react";

export default function WelcomePage() {
  const heroMedia = mediaRecords["hero-sri-lanka"];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Visual Header */}
      <div className="relative aspect-[4/3] w-full bg-forest-deep">
        <Image
          src={heroMedia.src}
          alt={heroMedia.alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 480px) 100vw, 600px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-antique-gold/90 text-ink text-xs font-bold uppercase tracking-wider">
            <span>☼ Ayubowan</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white leading-tight">
            Discover Sri Lanka
          </h1>
          <p className="text-sm text-ivory/90 font-medium">
            {tripConfig.subtitle}
          </p>
        </div>
      </div>

      <div className="mobile-container py-6 space-y-6">
        {/* Welcome Letter */}
        <section className="bg-white rounded-card p-5 border border-line shadow-card space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-antique-gold">
            To Our Honored Guests
          </span>
          <h2 className="text-lg font-serif font-bold text-ink">
            A Journey of Wonder, Heritage & Living Legends
          </h2>
          <p className="text-xs text-ink/80 leading-relaxed">
            Welcome to this private travel journal, crafted specially for your one-week journey across Sri Lanka from <strong>21 to 27 December 2026</strong>.
          </p>
          <p className="text-xs text-ink/80 leading-relaxed">
            Over the next seven days, we will travel from the ancient boulder citadels and painted cave temples of the Cultural Triangle, through the cool mist and tea terraces of the central highlands, down to the turquoise waves of the southern coast.
          </p>
        </section>

        {/* Thematic Spotlight: Ravana Trail */}
        <section className="bg-gradient-to-br from-forest-deep to-forest rounded-card p-5 text-white shadow-elevated space-y-3 border border-forest-light/30">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-antique-gold" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-antique-gold">
              Special Narrative Theme
            </h3>
          </div>
          <h4 className="text-xl font-serif font-bold leading-snug">
            The Ravana Trail Across Sri Lanka
          </h4>
          <p className="text-xs text-ivory/85 leading-relaxed">
            Because of your special interest in the stories of King Ravana and the Ramayana epic, this companion highlights key sacred landmarks—from Hanuman&apos;s hill passes at Ramboda to Seetha Amman Kovil, the caves and waterfalls of Ella, and the healing mountain headland of Rumassala.
          </p>
          <div className="pt-1">
            <Link
              href="/ravana-trail"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-antique-gold text-ink text-xs font-bold shadow-sm hover:bg-antique-gold-light transition-colors"
            >
              <span>Explore The Ravana Trail</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* 7-Day Route Overview */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-ink tracking-tight px-1">
            The Seven-Day Arc
          </h3>

          <div className="space-y-2">
            {days.map((day) => (
              <Link
                key={day.date}
                href={`/day/${day.date}`}
                className="bg-white rounded-xl p-3.5 border border-line flex items-center justify-between gap-3 shadow-sm hover:border-forest/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-sage/60 text-forest font-bold shrink-0">
                    <span className="text-[10px] uppercase font-semibold text-muted leading-none">Day</span>
                    <span className="text-sm leading-none">{day.dayNumber}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-ink">
                      {day.title}
                    </h4>
                    <p className="text-[11px] text-muted flex items-center gap-1 mt-0.5">
                      <MapPin size={11} className="text-antique-gold shrink-0" />
                      <span>{day.from} → {day.to}</span>
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

        {/* Editorial Principles & Reassurance */}
        <section className="bg-sage/40 rounded-card p-4 border border-line/70 space-y-2.5 text-xs text-ink/80 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-forest">
            <ShieldCheck size={16} />
            <span>Honest, Transparent Travel Companion</span>
          </div>
          <p>
            • <strong>Legend vs History:</strong> We clearly distinguish ancient archaeological evidence from traditional religious narratives so you can appreciate both with depth.
          </p>
          <p>
            • <strong>No Fabrications:</strong> All flight timings, hotel check-ins, and ticket costs are marked for live reconfirmation with your accompanying host.
          </p>
        </section>

        {/* CTA */}
        <div className="pt-2 pb-6">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-forest text-white text-sm font-semibold shadow-md hover:bg-forest-light transition-colors"
          >
            <Calendar size={16} />
            <span>Go to Today&apos;s Plan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
