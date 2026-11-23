# Product Requirements Document (PRD)

## 1. Context and users

The host is accompanying two international visitors for a one-week journey in Sri Lanka. The host is not a professional guide and wants the guests to have a beautifully designed, informative phone website. The guests are unusually interested in the **Ravana/Ramayana story world**. The website has two distinct functions:

- **Guest mode:** effortlessly understand, appreciate and enjoy the trip.
- **Host mode:** confidently narrate short stories, check details, and change the schedule as plans evolve.

This is an **editorial travel companion**, not a hotel booking marketplace, a generic tour directory, or a fake live concierge.

## 2. Product principles

1. **Today first**: opening the app during the trip should show today's plan, not a long sales-page introduction.
2. **Beauty with purpose**: cinematic images + functional destination information.
3. **Short first, deep second**: every place offers a concise summary and optional detailed story.
4. **Legend with integrity**: badge narrative statements as `Tradition / Legend`, `History / Archaeology`, or `Practical information` when ambiguity arises.
5. **One-handed and outdoor-friendly**: readable in bright sun, thumb-sized controls, minimal taps.
6. **Respect the visitor**: inclusive, no unsolicited religious assumptions; temples explained respectfully.
7. **Offline resilience**: itinerary, cached guides and navigation addresses readable when connectivity is poor.
8. **Never fabricate**: unverified, time-sensitive facts are labeled `To confirm`, not confidently invented.

## 3. Core information architecture

Bottom navigation on phones (maximum four primary destinations):

1. **Today** — day summary and next stop, weather link/status, important notice.
2. **Journey** — full seven-day itinerary in a compact vertical timeline.
3. **Explore** — attraction cards, regions, the Ravana Trail collection, story pages.
4. **Essentials** — travel help, etiquette, contacts (if provided), about trip.

Supplemental entry points: `Map`, `Saved`, `Guide notes` (host only), `Photo gallery`, `My trip` settings. **Do not put six or seven icons in the bottom bar.**

## 4. Must-have functionality / P0

| Feature | Required behavior |
|---|---|
| Welcome / intro | Personalized but do not invent guests' names; beautiful hero, exact dates |
| Today's plan | Local-date awareness in Asia/Colombo; manual day selection for preview |
| Itinerary | All seven dates, ordered stops, primary/optional status, realistic transfer warnings |
| Destination detail | Hero image, location, summaries, stories, highlights, practical notes, sources |
| Ravana Trail | Dedicated thematic collection + linked stops and myth/history labels |
| Navigation | Open Google Maps / Apple Maps or equivalent using grounded coordinates/place queries; no fake in-app live location |
| Compact host notes | 45–90-second factual intro + likely guest questions, on protected host view |
| Mobile | Works at 320, 360, 390, 430 px, both portrait and landscape |
| Accessibility | Keyboard, reduced motion, semantic markup, visible focus, alternative text |
| Image loading | Responsive licensed images; do not ship broken placeholders in production |
| Robustness | Functional empty states, network error states, offline content fallback |
| Editing | File-based content edits or protected admin interface; no public write access |

## 5. Nice-to-have / P1

- Offline-capable PWA with install prompt *only if supported*.
- Bookmark attractions locally (no account needed).
- Copy-to-clipboard short facts and useful Sinhala phrases.
- Guest-facing bilingual labels where the translations are checked.
- Audio narration only with clear user start/pause controls and proper audio accessibility.
- Expandable route map (host embeds or map API with appropriate keys/terms).
- Guest photo memories **only if uploads and permissions are designed**, otherwise avoid it.
- Discrete notification banner for host-edited schedule changes, no push dependency.

## 6. Explicitly out of scope / P2

- Payment collection, bookings, ticket selling, public travel marketplace.
- Automatically generated factual information without human review.
- Scraping copyrighted photography or copying third-party travel articles.
- Real-time traffic, precise ETAs or live weather unless a real, licensed API is integrated.
- Passport/visa number storage, public guest contact details, live location surveillance.
- Interactive AI assistant calling third-party models at runtime unless separately budgeted, moderated and clearly disclosed. The editorial content is sufficient for v1.

## 7. User stories

- **Guest arriving:** "I want to feel welcomed and know what happens next without reading a long document."
- **Guest riding in a car:** "Tell me where we're heading, why it matters and how long this leg may take."
- **Guest at Seetha Amman:** "Show the Ramayana connection while clarifying what belongs to belief."
- **Guest on a weak mobile network:** "Let me read today's plan and cached destination guides."
- **Host before a stop:** "Give me a memorable 60-second explanation I can deliver naturally."
- **Host after route change:** "Let me mark optional stops skipped without rewriting the whole app."

## 8. Success criteria

- On the Today screen, **today's date and primary next stop** are visible without hunting.
- Attraction detail requires at most **2 taps** from Today or Journey.
- Relevant legend content at Seetha Amman, Ravana Cave, Ravana Falls and Rumassala is discoverable within one screen scroll or one tap.
- No knowingly false price, timestamp, hotel, opening-hour, traffic or archaeological claim.
- Text has adequate contrast and can be zoomed to 200% without loss of information.
- Tested on a real iPhone-sized viewport and Android-sized viewport.

## 9. Content governance

Each attraction needs `lastVerified`, `sourceUrls`, `verifiedFields`, `needsVerification`, and `traditionNote`. Design allows the admin to edit a note, stop order, hotel, or time. Only designated host/editor may modify content. Guests are read-only.

## 10. Brand positioning

**Working name:** `Discover Sri Lanka — Our Island Journey`.

Tagline: `Seven days. A thousand stories.`

Voice: warm, thoughtful, curious, visually rich, straightforward English; no exaggerated or fictional certainty. Avoid "magical secrets revealed" marketing and avoid saying Ravana's legend has been archaeologically confirmed.
