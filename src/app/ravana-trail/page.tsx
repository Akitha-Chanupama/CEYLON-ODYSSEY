import Link from "next/link";
import { mediaRecords } from "@/content/media";
import { places } from "@/content/places";
import { HeroFrame } from "@/components/common/HeroFrame";
import { Badge } from "@/components/common/Badge";
import { PlaceImage } from "@/components/common/PlaceImage";
import {
  ArrowRight,
  ChevronRight,
  Compass,
  HelpCircle,
  Map,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const CHAPTERS = [
  {
    chapterNumber: 1,
    title: "Hanuman's Search in the Hills",
    siteName: "Sri Bhakta Hanuman Temple",
    placeSlug: "ramboda-hanuman-temple",
    dayNumber: 4,
    date: "2026-12-24",
    region: "Ramboda Pass, Central Highlands",
    storySnippet:
      "In living Sri Lankan pilgrimage tradition, the cloud-cloaked ridges of Ramboda are where Hanuman paused to survey the mountains during his search for Sita.",
    badge: "tradition" as const,
  },
  {
    chapterNumber: 2,
    title: "Sita's Sanctuary at Seetha Eliya",
    siteName: "Seetha Amman Kovil",
    placeSlug: "seetha-amman-kovil",
    dayNumber: 5,
    date: "2026-12-25",
    region: "Seetha Eliya (near Nuwara Eliya)",
    storySnippet:
      "A vibrant hillside kovil beside a mountain stream ~5 km from Nuwara Eliya, revered by pilgrims as the Ashoka Vatika sanctuary described in the Ramayana.",
    badge: "tradition" as const,
  },
  {
    chapterNumber: 3,
    title: "The Mountain Cavern of Ella",
    siteName: "Ravana Cave",
    placeSlug: "ravana-cave",
    dayNumber: 5,
    date: "2026-12-25",
    region: "Ella Hills, Uva Province",
    storySnippet:
      "A genuine limestone cavern high in the Ella cliffs linked in folklore to King Ravana, and confirmed by archaeologists to hold 25,000-year-old prehistoric remains.",
    badge: "tradition" as const,
  },
  {
    chapterNumber: 4,
    title: "The Roaring Cascade",
    siteName: "Ravana Falls (Rawana Ella)",
    placeSlug: "ravana-falls",
    dayNumber: 6,
    date: "2026-12-26",
    region: "Ella–Wellawaya Descent",
    storySnippet:
      "A dramatic multi-tiered waterfall dropping down sheer rock faces on your morning descent from Ella toward the southern coast.",
    badge: "observable" as const,
  },
  {
    chapterNumber: 5,
    title: "The Healing Mountain by the Sea",
    siteName: "Rumassala Sanctuary",
    placeSlug: "rumassala",
    dayNumber: 6,
    date: "2026-12-26",
    region: "Unawatuna & Galle Bay",
    storySnippet:
      "A forested southern headland believed in folk tradition to be a fragment of the Himalayan Sanjeevani mountain carried across Lanka by Hanuman.",
    badge: "tradition" as const,
  },
];

const COMPARISONS = [
  {
    question: "Was Sigiriya King Ravana's palace?",
    verdict: "Documented History vs Folklore",
    detail:
      "While modern tourist lore links Sigiriya to Ravana, established archaeology and UNESCO inscriptions record Sigiriya as the 5th-century CE royal citadel of King Kassapa I.",
  },
  {
    question: "Did Princess Sita live at today's Seetha Amman site?",
    verdict: "Living Sacred Tradition",
    detail:
      "Devotees and local Sri Lankan traditions honor Seetha Eliya as Sita's sacred grove—a place of living pilgrimage rather than an archaeologically excavated palace.",
  },
  {
    question: "Is Ravana Cave a real cave?",
    verdict: "Physical Reality + Prehistory",
    detail:
      "Yes, the cavern exists in Ella's limestone cliffside and yielded artifacts dating back around 25,000 years; its association with King Ravana comes from traditional folklore.",
  },
  {
    question: "Why is Rumassala tied to the Sanjeevani legend?",
    verdict: "Folk Legend & Coastal Botany",
    detail:
      "Official tourism directories preserve the Sanjeevani hill narrative alongside Rumassala's unusually diverse microclimate of coastal medicinal plants.",
  },
];

export default function RavanaTrailPage() {
  const heroMedia = mediaRecords["ravana-falls-hero"];

  return (
    <div className="bg-ivory">
      <div className="app-container pt-5 pb-10 md:py-10 space-y-8 animate-fade-rise">
        {/* Hero */}
        <HeroFrame
          variant="split"
          media={heroMedia}
          fallbackTitle="The Ravana Trail"
          eyebrow="Curated Thematic Collection · 5 Stops"
          title="The Ravana Trail Across Sri Lanka"
          subtitle="Highland passes, stream-side shrines, mountain caves, and coastal headlands—told alongside clear archaeological context."
          badges={
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-antique-gold text-forest-dark text-[11px] font-bold uppercase tracking-wider">
              <Sparkles size={12} />
              <span>Myth &amp; Heritage Clarity</span>
            </span>
          }
          actions={
            <>
              <Link
                href="/journey"
                className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-forest text-xs font-semibold shadow-sm hover:bg-sage transition-colors"
              >
                <span>See Days 4–6 Schedule</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/map"
                className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/12 text-white border border-white/25 text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                <Map size={14} />
                <span>Route Schematic</span>
              </Link>
            </>
          }
        />

        {/* Curated Introduction */}
        <section className="bg-white rounded-card p-6 sm:p-7 border border-line/90 shadow-card">
          <div className="reading-container mx-0 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-antique-gold-dark">
              The Story World
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
              Appreciating Living Legend with Integrity
            </h2>
            <p className="text-[15px] text-ink/85 leading-relaxed">
              Ravana stands among the most storied and multi-faceted figures in classical literature—portrayed across traditions as scholar, devout Shiva worshipper, veena musician, and monarch. Across central and southern Sri Lanka, ridges, caverns, waterfalls, and shrines carry living Ramayana memory.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              On this seven-day route, you visit five key landmarks across Ramboda, Nuwara Eliya, Ella, and Galle Bay—celebrating traditional storytelling while keeping historical and archaeological evidence unmistakable.
            </p>
          </div>
        </section>

        {/* Five Trail Chapters */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <h2 className="font-serif text-2xl sm:text-[28px] font-semibold text-ink flex items-center gap-2">
              <Compass size={20} className="text-forest" />
              <span>Your 5 Trail Chapters</span>
            </h2>
            <span className="text-xs text-muted">North-to-South Tour Progression</span>
          </div>

          <div className="space-y-4">
            {CHAPTERS.map((chap) => {
              const place = places[chap.placeSlug];
              const thumb = place?.heroMediaId ? mediaRecords[place.heroMediaId] : null;

              return (
                <article
                  key={chap.chapterNumber}
                  className="bg-white rounded-card p-4 sm:p-5 border border-line/90 shadow-card hover:border-forest/25 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
                    <Link
                      href={`/places/${chap.placeSlug}`}
                      className="relative w-full sm:w-44 h-44 sm:h-32 rounded-2xl overflow-hidden bg-forest-deep shrink-0 border border-line/70 block"
                      aria-label={`Read guide for ${chap.siteName}`}
                    >
                      <PlaceImage
                        media={thumb}
                        fallbackTitle={chap.siteName}
                        sizes="(max-width: 640px) 100vw, 180px"
                        className="object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-forest-dark/85 text-antique-gold-light text-[10px] font-bold uppercase tracking-wider">
                        Chapter {chap.chapterNumber}
                      </span>
                    </Link>

                    <div className="flex-1 min-w-0 space-y-2.5 w-full">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-antique-gold-dark">
                            Day {chap.dayNumber} · {chap.date.slice(5)} · {chap.region}
                          </span>
                          <Link href={`/places/${chap.placeSlug}`} className="block group">
                            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink group-hover:text-forest transition-colors mt-0.5">
                              {chap.title}
                            </h3>
                          </Link>
                        </div>
                        <Badge type={chap.badge} />
                      </div>

                      <p className="text-xs font-semibold text-forest flex items-center gap-1.5">
                        <MapPin size={13} className="text-antique-gold-dark shrink-0" />
                        <span>{chap.siteName}</span>
                      </p>

                      <p className="text-sm text-ink/80 leading-relaxed">{chap.storySnippet}</p>

                      <div className="pt-2 border-t border-line/65 flex flex-wrap items-center justify-between gap-2">
                        <Link
                          href={`/places/${chap.placeSlug}`}
                          className="tap-row inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-forest-deep"
                        >
                          <span>Read Full Place Story</span>
                          <ChevronRight size={14} />
                        </Link>
                        <Link
                          href={`/day/${chap.date}`}
                          className="tap-row inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-forest"
                        >
                          <span>Day {chap.dayNumber} Itinerary →</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Myth vs Archaeology Matrix */}
        <section className="bg-white rounded-card p-6 border border-line/90 shadow-card space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest">
              <ShieldCheck size={16} className="text-antique-gold-dark" />
              <span>Myth vs. Archaeology Explainer</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Balanced context separating verified UNESCO &amp; archaeological findings from living devotion:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPARISONS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-mist/60 border border-line/85 space-y-2"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-serif text-lg font-semibold text-ink leading-snug">
                    &ldquo;{item.question}&rdquo;
                  </h3>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white border border-line text-forest whitespace-nowrap shrink-0">
                    {item.verdict}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-ink/85 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Questions to Explore + Navigation */}
        <section className="bg-gradient-to-br from-forest-deep via-forest to-forest-dark rounded-card p-6 sm:p-7 text-white shadow-elevated border border-forest-light/30 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-antique-gold-light">
            <HelpCircle size={16} />
            <span>Cultural Context for the Drive</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-white/90 leading-relaxed">
            <div className="space-y-1.5">
              <h3 className="font-serif text-xl font-semibold text-white">
                Why ten heads in classical iconography?
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Symbolically known as Dashamukha, Ravana&apos;s ten heads traditionally represent mastery across the six Shastras and four Vedas—an artistic symbol of immense scholarship.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif text-xl font-semibold text-white">
                What is the Sanjeevani Mountain motif?
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                When Lakshmana was injured in the epic, Hanuman carried an entire Himalayan medicinal ridge toward Lanka—remembered around Rumassala Bay with its distinctive herbal flora.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/explore"
              className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-forest text-xs font-semibold hover:bg-sage transition-colors"
            >
              <span>Browse All 19 Destinations</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/"
              className="tap-row inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/12 text-white border border-white/25 text-xs font-semibold hover:bg-white/20 transition-colors"
            >
              <span>Return to Today&apos;s Plan</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
