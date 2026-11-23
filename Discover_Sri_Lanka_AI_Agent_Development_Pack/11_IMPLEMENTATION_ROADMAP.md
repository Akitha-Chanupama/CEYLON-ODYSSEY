# Implementation Roadmap and Build Checklist

## Objective

Implement a real, mobile-first travel product in a focused series of deliverables. The complete project should be small enough to maintain easily during a one-week trip yet polished enough to feel bespoke.

## Phase 0 — Content and dependency audit

- [ ] Read every spec and create a one-page technical execution plan.
- [ ] Confirm assumed date is **21–27 December 2026**, Asia/Colombo.
- [ ] Normalize slugs across all days and place definitions.
- [ ] Establish `TBC` policy for flights, hotels, times, fees, access.
- [ ] Create one source registry and one media-rights registry.
- [ ] Verify that Seetha Amman is scheduled in Nuwara Eliya section; Ravana Falls on Ella→Wellawaya road; Rumassala near Unawatuna.
- [ ] Define `primary`, `optional`, `conditional` stops.

**Output:** documented model, no broken references; explicit assumptions.

## Phase 1 — Visual foundations

- [ ] Project setup, TS strict config, lint and formatter.
- [ ] Design tokens, typography and card components.
- [ ] Responsive mobile shell with four-tab bottom nav.
- [ ] Top header, hero photo with overlay, page container, sticky actions.
- [ ] Implement loading, empty, error and long-label states.
- [ ] Screenshot at 320, 360, 390, 430 px before desktop styling.

**Output:** coherent mobile design foundations.

## Phase 2 — Trip and destination data

- [ ] Add 7 day records.
- [ ] Add destination records from `03_DESTINATION_CONTENT.md`.
- [ ] Add Ravana story blocks with appropriate classifications.
- [ ] Add source links + checked-at dates.
- [ ] Zod schema validation for place/day/media/source IDs.
- [ ] Test duplicate/missing stop IDs.

**Output:** functioning data layer and source-backed content.

## Phase 3 — Essential pages

- [ ] `/` Today with correct Sri Lanka date fallback.
- [ ] `/welcome`, `/journey`, `/day/[date]`.
- [ ] `/explore` filter/search, `/places/[slug]`.
- [ ] `/ravana-trail`, `/essentials`.
- [ ] Real directions links, place back/forward navigation.
- [ ] Responsive images, alt text and credits.

**Output:** guests can navigate the entire seven-day journey without a dead end.

## Phase 4 — Polishing and meaningful optional features

- [ ] Saved/bookmarks with local persistence, if included.
- [ ] External map routing, optional embedded map only if configured.
- [ ] `Source checked` and `Confirm before visit` labels.
- [ ] Subtle transitions + reduced-motion.
- [ ] PWA/offline text caching if testable and maintainable.
- [ ] Host page only if real authentication and access control are configured.
- [ ] English editorial proofreading.

**Output:** refined guest-facing experience.

## Phase 5 — Content and trip-week operations

- [ ] Verified photo license for each published image.
- [ ] Validate source-backed factual claims.
- [ ] Confirm real hotels, vehicle, arrival/departure flight times.
- [ ] Reconfirm admission fees, temple/garden opening details, seasonal conditions.
- [ ] Test revised route if host modifies a day.
- [ ] Review extra time needed for 22 Dec if staying near airport on 21st.
- [ ] Check airport early-arrival advice before fixing 27 Dec pickup time.

**Output:** operational readiness.

## Phase 6 — QA and release

- [ ] Typecheck, lint, unit tests, e2e tests and production build PASS.
- [ ] 320/360/390/430/768/1024/1440px layouts reviewed.
- [ ] Day boundaries tested for `Asia/Colombo` (including a visitor using another time zone).
- [ ] Offline and slow-network fallback verified (if PWA advertised).
- [ ] Image credits, alt text, contrast and 200% zoom pass.
- [ ] Every main CTA/link works.
- [ ] No invented cost, opening hour, flight, hotel or confirmed route.
- [ ] Validate 21–27 December day count and 25 December temple visit placement.
- [ ] Test guest access/privacy controls.
- [ ] Document any outstanding issues honestly.

**Output:** published working site or deployable production artifact with release notes.

## Recommended prioritization if scope needs reducing

**Never cut:** Today, Journey, destination pages, Ravana Trail, practical safety/etiquette, verified sources, mobile usability.

**Cut first:** audio narration, fancy in-app maps, photo upload, admin dashboard, advanced animations, multi-language support.

**Build last:** analytic dashboards, notifications, live weather, chatbot integration, complex authentication for a static-only site.

## Maintenance simplicity target

The host should be able to make a schedule change by editing **one day record**, not six repeated pages. Updating a destination fact should happen in **one place record**, not the itinerary and three hardcoded components.
