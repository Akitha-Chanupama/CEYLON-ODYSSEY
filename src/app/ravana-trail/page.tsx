import Image from "next/image";
import Link from "next/link";
import { mediaRecords } from "@/content/media";
import { places } from "@/content/places";
import { Badge } from "@/components/common/Badge";
import {
  Sparkles,
  MapPin,
  ChevronRight,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Compass,
} from "lucide-react";

export default function RavanaTrailPage() {
  const heroMedia = mediaRecords["ravana-falls-hero"];

  const chapters = [
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
        "The world's only temple dedicated solely to Princess Sita. Located 5 km from Nuwara Eliya beside a mountain stream, venerated as the Ashoka Vatika of epic lore.",
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
        "A genuine geological cavern situated high in the Ella cliffs where folklore places Ravana's mountain refuge. Excavations also proved 25,000-year-old prehistoric human habitation.",
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
        "A dramatic 25-meter multi-tiered waterfall cascading down sheer rock faces, carrying King Ravana's name right on the descent to the southern plains.",
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
        "A verdant coastal promontory believed in folklore to be a piece of the Himalayan Sanjeevani medicinal mountain dropped by Hanuman as he flew across Lanka.",
      badge: "tradition" as const,
    },
  ];

  const comparisons = [
    {
      question: "Was Sigiriya King Ravana's palace?",
      verdict: "Documented History vs Folklore",
      detail:
        "While romantic tourist folklore links Sigiriya to Ravana, established archaeology and UNESCO evidence record Sigiriya as the 5th-century CE royal citadel built by King Kassapa I.",
    },
    {
      question: "Did Princess Sita live at today's Seetha Amman site?",
      verdict: "Living Sacred Tradition",
      detail:
        "Devotees and local traditions associate Seetha Eliya with Sita's captivity. This is a meaningful place of living devotion rather than an archaeologically confirmed ancient palace.",
    },
    {
      question: "Is Ravana Cave a real cave?",
      verdict: "Physical Reality + Prehistoric Archaeology",
      detail:
        "Yes, the cave physically exists and was inhabited by prehistoric humans 25,000 years ago. Its identification with King Ravana belongs to traditional folklore.",
    },
    {
      question: "Is Rumassala part of the Sanjeevani story?",
      verdict: "Folk Legend & Unique Botany",
      detail:
        "Sri Lanka Tourism registers the Sanjeevani tradition here. The headland also possesses unique medicinal herbs distinct from the southern maritime flora, feeding the legend.",
    },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Header */}
      <div className="relative aspect-[16/10] w-full bg-forest-deep">
        <Image
          src={heroMedia.src}
          alt={heroMedia.alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 480px) 100vw, 600px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white space-y-2">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-antique-gold text-ink text-[11px] font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            <span>Thematic Collection</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white leading-tight">
            The Ravana Trail
          </h1>
          <p className="text-xs text-ivory/90 leading-relaxed font-medium">
            Stories across the island: landscapes, temples, and living traditions of the Ramayana.
          </p>
        </div>
      </div>

      <div className="mobile-container py-5 space-y-6">
        {/* Curated Editorial Introduction */}
        <section className="bg-white rounded-card p-5 border border-line shadow-card space-y-2.5 text-xs text-ink/80 leading-relaxed">
          <span className="text-[11px] font-bold uppercase tracking-wider text-antique-gold">
            The Story World
          </span>
          <h2 className="text-base font-serif font-bold text-ink">
            Appreciating Legend with Integrity
          </h2>
          <p>
            Ravana is one of the most memorable and complex figures in world literature. Across South Asia, different cultures, poets, and communities portray him in varied lights: as an astute monarch, a master musician, a devout devotee of Lord Shiva, and an epic antagonist.
          </p>
          <p>
            In Sri Lanka, scores of mountain ridges, hidden caverns, waterfalls, and shrines carry names from the Ramayana. On this trip, we visit these remarkable places to experience how epic narratives have intertwined with a living landscape—always celebrating the beauty of the stories while respecting historical and archaeological facts.
          </p>
        </section>

        {/* Trail Chapters Flow */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-ink tracking-tight flex items-center gap-1.5">
              <Compass size={16} className="text-forest" />
              <span>Our 5 Trail Chapters</span>
            </h2>
            <span className="text-[11px] text-muted">Tour Progression</span>
          </div>

          <div className="space-y-3">
            {chapters.map((chap) => (
              <div
                key={chap.chapterNumber}
                className="bg-white rounded-card p-4 border border-line shadow-card space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-antique-gold/20 text-antique-gold text-xs font-bold shrink-0">
                      {chap.chapterNumber}
                    </span>
                    <div>
                      <span className="text-[11px] font-semibold text-muted uppercase">
                        Day {chap.dayNumber} · {chap.date.slice(5)}
                      </span>
                      <h3 className="text-sm font-bold text-ink leading-tight">
                        {chap.title}
                      </h3>
                    </div>
                  </div>
                  <Badge type={chap.badge} />
                </div>

                <div className="text-xs text-forest font-semibold flex items-center gap-1">
                  <MapPin size={12} className="text-antique-gold" />
                  <span>{chap.siteName}</span>
                  <span className="text-muted font-normal">({chap.region})</span>
                </div>

                <p className="text-xs text-ink/80 leading-relaxed">
                  {chap.storySnippet}
                </p>

                <div className="pt-2 border-t border-line/60 flex items-center justify-between">
                  <Link
                    href={`/places/${chap.placeSlug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-forest hover:text-forest-light py-1"
                  >
                    <span>Read Full Place Story</span>
                    <ChevronRight size={14} />
                  </Link>

                  <Link
                    href={`/day/${chap.date}`}
                    className="text-[11px] font-medium text-muted hover:text-ink"
                  >
                    View Day {chap.dayNumber} Route →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Myth vs. History Comparison Matrix */}
        <section className="bg-white rounded-card p-5 border border-line shadow-card space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest">
            <ShieldCheck size={16} />
            <span>Myth vs. Archaeology Explainer</span>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Quick reference guide to questions often asked by international travelers:
          </p>

          <div className="space-y-3 pt-1">
            {comparisons.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-sage/30 border border-line/80 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-ink">
                    &ldquo;{item.question}&rdquo;
                  </h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-line text-forest shrink-0">
                    {item.verdict}
                  </span>
                </div>
                <p className="text-xs text-ink/80 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Dive Questions */}
        <section className="bg-gradient-to-br from-forest-deep to-forest rounded-card p-5 text-white shadow-card border border-forest-light/40 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-antique-gold">
            <HelpCircle size={15} />
            <span>Questions to Explore</span>
          </div>

          <div className="space-y-2.5 text-xs text-ivory/85 leading-relaxed">
            <div>
              <h4 className="font-bold text-white mb-0.5">
                • Why does Ravana have ten heads in classical iconography?
              </h4>
              <p>
                In symbolic tradition, the ten heads (Dashamukha) represent mastery over the six Shastras and the four Vedas, illustrating extraordinary intellectual prowess.
              </p>
            </div>

            <div className="pt-2 border-t border-forest-light/30">
              <h4 className="font-bold text-white mb-0.5">
                • What is the significance of the Sanjeevani Mountain?
              </h4>
              <p>
                When Lakshmana was gravely injured in battle, Hanuman carried an entire Himalayan mountain ridge containing four divine healing herbs (including Mrita Sanjeevani), demonstrating heroic loyalty.
              </p>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <div className="pt-2 pb-6">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-forest text-white text-xs font-semibold shadow-sm hover:bg-forest-light transition-colors"
          >
            <span>Return to Today&apos;s Plan</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
