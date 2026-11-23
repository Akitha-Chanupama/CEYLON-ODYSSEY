# Mobile-First UI/UX Specification

## 1. Design goal

Create a **premium travel journal that also works as a practical trip dashboard**. It should feel like a thoughtfully designed editorial product, not a crowded booking app or an AI-generated tourist template.

**Primary device target:** modern phones, **360–430 CSS px** wide, touch interaction, intermittent mobile data, outdoor glare. Desktop is a responsive enhancement, not the starting point.

**Design language:** restrained premium / warm editorial / cinematic landscape photography / subtle microinteractions / polished typography / layered green and ivory tones.

## 2. Navigation and IA

### Mobile bottom navigation (persistent)

| Item | Icon | Screen | Why |
|---|---|---|---|
| Today | house/sun | `/` | Daily focus |
| Journey | route/calendar | `/journey` | Seven dates |
| Explore | compass | `/explore` | Attractions + Ravana Trail |
| Essentials | circle-help | `/essentials` | Etiquette, useful numbers, planning notes |

Use a **fixed bottom bar** with translucent warm surface if contrast remains strong, a clear active label, and safe-area padding. Minimum target size 44×44 CSS px, ideally 48×48. No extra top-level tabs.

### Secondary routes

- `/welcome` — one-time introduction or shareable landing page.
- `/day/2026-12-21` … `/day/2026-12-27` — full day details.
- `/places/[slug]` — destination detail pages.
- `/ravana-trail` — theme hub.
- `/map` — route overview (optional full map provider).
- `/saved` — bookmarked locations (local storage).
- `/essentials/culture` — etiquette + Sinhala phrases.
- `/essentials/travel` — weather links, packing, contacts, trip details.
- `/host` — private entry point, authenticated if deployed; never display host notes to guests by accident.

## 3. The Today screen — highest priority

**Above the fold (~390×844):**
1. Compact personal header: `Ayubowan!` and date, small "Our Sri Lanka Journey" label.
2. Slim progress text: `Day 5 of 7 · Friday, 25 December` (when selected).
3. **Cinematic hero** of day's key destination, 4:5 or 5:4 crop. Strong text contrast using gradient overlay.
4. Big location: `Seetha Eliya → Ella`.
5. Mini intro: `A day following Sita's story into the hills.`
6. Two large tap actions: `View today's route` and `Explore the story`.
7. At least the first scheduled stop visible on scroll, not hidden behind a huge animation.

**Below the hero:**
- `Today's highlights` horizontal cards (small, purposeful, 1.15 cards visible to cue swipe).
- `Next stop` priority card: place name, status, host-confirmed timing or `Time TBC`, `Navigate` link.
- `Today's journey` vertical sequence with primary/optional differentiation.
- `Ravana Connection` editorial teaser on relevant days.
- `Practical tips` (clothing, cultural etiquette, mobility, weather-link not fake forecast).
- Tiny footer: `Times may change. Confirm with your host.`

### Today screen text wireframe

```text
┌──────────────────────────────────────┐
│ ☼ Ayubowan              ◯ Trip info  │
│ Our Sri Lanka Journey                │
│ DAY 5 OF 7    FRIDAY, DEC 25         │
│ ┌──────────────────────────────────┐ │
│ │                                  │ │
│ │       HERO PHOTO OF PLACE        │ │
│ │                                  │ │
│ │   The stories of Seetha Eliya    │ │
│ │   Nuwara Eliya → Ella            │ │
│ └──────────────────────────────────┘ │
│ [ View today's route ] [ The story ] │
│                                      │
│ Today's highlights                   │
│ [ Seetha Kovil ] [ Ravana Cave  → ]  │
│                                      │
│ Next stop                            │
│ Seetha Amman Kovil                   │
│ Tradition · Time to confirm          │
│ [ Directions ↗ ]                     │
│                                      │
│ Our journey today                    │
│ ● Seetha Amman Kovil  MUST VISIT     │
│ │                                    │
│ ○ Hakgala Gardens      OPTIONAL      │
│ │                                    │
│ ● Ella arrival                       │
│                                      │
│ Today  Journey   Explore  Essentials │
└──────────────────────────────────────┘
```

## 4. Journey screen

Top: `Your 7-day journey`, range `21—27 December 2026`, route overview line. Show **seven expandable day cards** with date, hero thumb, title, one-sentence description, approximate region and number of priority stops. Current day is highlighted; completed days visually subdued but still accessible.

Do **not** display fixed precise times where unknown; use `Morning`, `Afternoon`, `Evening`, `Flexible`, `Time TBC`.

Day card click → `/day/[date]` with ordered timeline. Use `Primary`, `Optional`, `Conditional` tags rather than making all stops appear guaranteed.

## 5. Day detail

1. Breadcrumb / back: `Journey / Day 5`.
2. Day photo + title + region, date and guest-friendly description.
3. Notice strip when day is long: `Long scenic drive; timings may change`.
4. `Route` map or external map action.
5. Ordered stop timeline (stop type, status, optional planned window, navigation and place-card links).
6. `Our stories today`: a small Ravana/heritage narrative.
7. `Prepare for today`: 3–5 packing / dress / walking tips.
8. `Where we're staying`: hotel address only once confirmed; otherwise neutral TBC.
9. Host-only note / edit, behind authentication.

## 6. Explore screen

- Search bar (`Search places or stories`).
- Featured editorial card: **"The Ravana Trail"** with distinctive icon and photo.
- Category chips: `All`, `Ravana & Ramayana`, `History`, `Temples`, `Nature`, `Coast`.
- Destination grid/cards stacked 1-column on mobile; use photos with natural aspect ratio 4:3.
- Relevance sorting defaults to the actual upcoming trip, not unrelated places.
- Cards show name, region, one-line description, thematic badge, bookmark heart (optional), and `View story`.
- Search must function offline on shipped local data.

## 7. Destination page

**Structure:**

- Photo hero 4:5 or 5:4; slim back control; image credit accessible.
- H1 site name; short descriptive subtitle; location chip and tags.
- Primary sticky/dock action: `Open directions`; optionally `Save`.
- 3-item practical facts row: `Best part of visit`, `Walking level`, `Visit status` (avoid invented numbers).
- Quick-read editorial paragraph (70–100 words).
- Feature chips: `History`, `Legend`, `What to see`, `Visitor tips`.
- `The story` section with appropriate `Tradition` / `Heritage` marker.
- `Look out for` cards with real photos if licensed.
- `Before you go`: footwear, respectful dress, access, verified/unknown opening info.
- Photo gallery with lightbox, visible credits.
- `Next on our journey` contextual card.
- Sources + `Last checked` date; links open safely.
- Host-only optional expandable 60-second script (secured at server level).

## 8. Ravana Trail experience

This should be the signature editorial page, but **not** the homepage on every date. Use an immersive landscape hero, quote-free evocative prose, a chapter/stop timeline, simple myth-versus-history explainer, and crosslinks to actual itinerary dates.

Suggested chapter markers: `Hanuman's search`, `Seetha Eliya`, `Ravana Cave`, `Ravana Falls`, `Rumassala`.

Visual treatment: restrained warm gold thread or map route, olive/forest background, atmospheric images, no cartoon demons or fantasy imagery masquerading as documentary photography.

## 9. Essentials page

Sections:
- `Before today's visit`: clothing & footwear, rain layer, hydration.
- `Temple etiquette`: modest clothing, shoes where requested, respectful photos, worshippers first.
- `Useful Sinhala`: Ayubowan (greeting), Istuti (thank you), Karunakara (please) — check translations/transliteration before publication.
- `Emergency help`: 1990 ambulance, 1912 tourism hotline — verify the latest before launch; visible but not alarmist.
- `Your host`: contact button only after authorized number has been supplied.
- `Practical links`: official weather, travel advisories, visa/ETA information.
- `About our trip`: exact dates, general destinations, honest note that itinerary may evolve.

## 10. Color and legibility in bright sun

- Ivory and near-white content surfaces; deep dark body text.
- Large imagery balanced with legible solid content panels.
- Key information must **not** be white text on unpredictable photo areas without a tested dark overlay.
- Avoid low-contrast gold as small text on cream; gold for accents and decorative rules.
- Optional `High Contrast` toggle if easy to implement; must not break design.

## 11. Mobile interaction rules

- Tap targets ≥44×44 px; no hover-only content.
- Safe area `env(safe-area-inset-bottom)` for iPhone home bar; account for browser bottom controls.
- Inputs use at least 16px font to avoid iOS zoom.
- Cards clickable with clear visual cues, not nested overlapping links.
- Use native share/copy if supported; show success feedback.
- Loading skeletons only for dynamic media; avoid blocking static itinerary text behind loaders.
- Full-screen photos support swipe and close control, back button and keyboard Escape.
- Honor `prefers-reduced-motion`; no scroll-jacking or heavy parallax.
- Don't autoplay video/audio. Keep decorative animation subtle <250 ms.
- On poor data, show text content immediately and lazy-load lower images.
- Date switching should feel instant, and previous/next day buttons should work.

## 12. Responsive behavior

| Viewport | Layout |
|---|---|
| 320–359 px | Single column, compact paddings, no cut-off labels |
| 360–430 px | **Primary design**; one-column content; peek carousel |
| 431–767 px | Larger phone / small tablet, wider cards |
| 768–1023 px | Two-column explore, comfortable day timeline |
| ≥1024 px | Centered max-width content; editorial split hero; no stretched 80-character lines |

**Content max width:** ~1120 px for landing, ~720 px for long-form text; mobile horizontal padding 16–20 px.

## 13. Motion spec

- Page loads: subtle fade + slight rise 10px, ≤220ms.
- Card selection: subtle pressed state; no bounce.
- Bottom nav indicator transitions ≤180ms.
- Crossfades only when imagery loads, no layout shifts.
- Reduced motion disables nonessential transitions.

## 14. States the designer must show

For each key page: normal, loading, empty, error, offline, 200% text zoom, dark background/photo contrast, and long Sinhala/English names. Show active vs optional vs skipped stops visually and in text.

## 15. Common anti-patterns to avoid

- Oversized full-screen intro that hides practical navigation.
- Six different colored badges and competing gradient backgrounds.
- An AI-generated style with glassmorphic cards over every photo.
- Tiny captions, text with low contrast, inaccessible image-only buttons.
- Disabling pinch zoom, nested horizontal carousels, impossible-to-scroll modals.
- Fake real-time indicators `LIVE`, artificial countdowns, or inaccurate ETA labels.
- Generic vague cards without actually informative destination copy.
