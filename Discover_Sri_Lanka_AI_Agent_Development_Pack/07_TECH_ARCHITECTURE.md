# Technical Architecture — Agent Implementation Guide

## 1. Recommended stack

Use a stable, modern **Next.js App Router + TypeScript + Tailwind CSS** implementation, with all versions resolved to supported stable releases **at development time**. The site should be mainly pre-rendered and content-driven.

Recommended tools:
- **Framework:** Next.js App Router + React + TypeScript (strict mode).
- **Styling:** Tailwind CSS + CSS custom properties, no huge unneeded UI framework.
- **UI primitives:** accessible Radix/shadcn-style primitives *selectively* or small semantic React components.
- **Icons:** Lucide icon set.
- **Content:** validated local JSON/TypeScript objects or Markdown/MDX files, not a required database for v1.
- **Validation:** Zod for runtime build-time content validation; ESLint and TypeScript checks.
- **Map v1:** safe external links to Google Maps/Apple Maps using verified place names or lat/lng. Optional route map provider only with real API keys and correct licensing.
- **Host editing v1:** structured repository content updated via Git; optional authenticated dashboard after launch, never a fake public admin route.
- **Hosting:** Vercel or a similarly suitable static/Next-compatible host. Domain, secrets and access are host decisions.
- **PWA optional:** web manifest + carefully scoped service worker using a maintained solution compatible with the chosen framework version.
- **Testing:** Playwright, Vitest (or equivalent) and accessibility audits.

**Do not use a database, live chat, auth platform or multiple heavy animation libraries unless the user genuinely needs them.**

## 2. Architectural overview

```text
Verified itinerary + destination files
        |          |
        v          v
      Zod schemas + content checks
                 |
                 v
       Static/SSR Next.js routes
                 |
        Responsive UI components
                 |
   Photos / links / cached content
                 |
     Guest browser (mobile-first)

Optional authenticated host editor
   -> validated content write/publish
   -> rebuild/revalidate safely
```

The default guest mode is publicly readable or behind a simple **genuine access-controlled** guest layer if privacy is preferred. A hidden URL is not security.

## 3. Suggested repository structure

```text
src/
  app/
    layout.tsx
    page.tsx                        # Today
    welcome/page.tsx
    journey/page.tsx
    day/[date]/page.tsx
    explore/page.tsx
    ravana-trail/page.tsx
    places/[slug]/page.tsx
    map/page.tsx
    essentials/page.tsx
    essentials/culture/page.tsx
    essentials/travel/page.tsx
    saved/page.tsx
    host/page.tsx                   # optional, actually protected
    not-found.tsx
    globals.css
  components/
    layout/BottomTabBar.tsx
    layout/MobileHeader.tsx
    home/DayHero.tsx
    home/NextStop.tsx
    itinerary/DayCard.tsx
    itinerary/StopTimeline.tsx
    place/PlaceHero.tsx
    place/PlaceGallery.tsx
    place/PracticalFacts.tsx
    ravana/TraditionBadge.tsx
    ravana/TrailChapter.tsx
    common/SourceLinks.tsx
    common/OfflineNotice.tsx
    common/SafeExternalLink.tsx
  content/
    trip.ts
    days.ts
    places.ts
    stories.ts
    sources.ts
    media.ts
  lib/
    dates.ts
    navigation.ts
    source-status.ts
    validators.ts
  styles/
    tokens.css
public/
  images/
    places/
    people/                        # consent only, if needed
  icons/
  manifest.webmanifest
scripts/
  verify-content.ts
  check-links.ts
  image-audit.ts
  generate-content-report.ts
tests/
  e2e/
  unit/
  a11y/
```

## 4. Data first, UI second

The same structured data must power `/journey`, `/day`, `/places`, `/ravana-trail` and any map overview. Never manually copy place descriptions or dates into JSX in separate components, which leads to contradictions.

Use these concepts:
- **Trip:** start/end date, time zone, guest-safe name, current status, optional public contact.
- **Day:** date, region, summary, hero media ID, ordered stops, practical tips, overnight TBC.
- **Place:** slug, coordinates or verified map query, priority, core copy, history/tradition segments, tips, facts and source references.
- **Stop:** placeId, sequence, time window optional, required/optional, planned/visited/skipped, host notes (private storage if confidential).
- **Media:** asset path, license, creator, attribution URL, alt text, crop focal position.
- **Source:** source URL, publisher, last verified, authoritative type, supported fields.

Examples in `08_CONTENT_SCHEMA.md`.

## 5. Routing and maps

v1 external directions are useful even without in-app geolocation:
- `https://www.google.com/maps/search/?api=1&query=...` for a verified attraction name/address.
- `https://www.google.com/maps/dir/?api=1&destination=...` for destination only (user's app determines origin).
- Apple Maps equivalent on supported devices via official URL schemes, with fallback.

**Validate or encode every query** using `encodeURIComponent`. Do not expose an API key in source where license terms forbid it. Never invent route distance or ETA when user has not requested a live API or provider data.

If building a real in-page map, choose a legitimate mapping provider, obtain a key, and respect attribution, caching and geolocation consent. Without such setup, show elegant location cards and functional external directions.

## 6. Time and date behavior

Use `Asia/Colombo` explicitly for determining `today`. Never rely on the server's UTC date or the guest's home time zone. If outside 21–27 Dec, show a preview/landing state and enable manual selection of each date. After 27th, show a finished-trip lookback rather than 'Day 8'.

Use date-only ISO strings `YYYY-MM-DD`. Avoid parsing `new Date('YYYY-MM-DD')` naïvely and assuming local midnight; use a reliable time-zone-aware date strategy.

## 7. Performance budgets

- Favor static HTML and server components for text-heavy pages.
- Load first-screen hero image with priority; lazy-load remaining media.
- Use responsive `srcset`, AVIF/WebP with JPEG/PNG fallback, properly sized image files.
- Use `next/image` when suitable, but ensure provider terms and remote domains are configured.
- Avoid huge animation/video libraries, auto-play media and maps mounted on every page.
- Target good Core Web Vitals on an actual mid-range smartphone and slowed network: LCP <2.5s, CLS <0.1, INP <200ms under reasonable test conditions.
- Design loading state not to hide itinerary text behind an API call.

## 8. PWA and offline scope

Offline mode should provide **text-based itinerary and saved guides**, plus previously cached images when available. App shell and minimal critical content can be precached. External directions, live weather links and third-party map content **will not necessarily work offline**; communicate clearly.

- Manifest with name, icons, theme color, start URL, display standalone.
- Cache HTML/assets with versioned strategy, avoid stale schedule data on trip week.
- Use service worker only after tested updates; provide manual `Refresh itinerary` action if content can change.
- Don't cache passwords, tokens, private host notes or sensitive guest information in publicly readable assets.

## 9. Security and privacy

- No passport number, birth date, payment card or visa identifier collection.
- Guest names/photos optional, only with permission. Use a generic greeting otherwise.
- If host notes are private, don't statically ship them inside guest bundles or HTML.
- For host-admin functionality: real authentication/authorization checked server-side; anti-CSRF appropriately; validate inputs; rate-limit modifications where needed.
- Sanitize content before rendering Markdown/MDX. Avoid arbitrary user HTML.
- Maintain a CSP and secure headers where feasible; protect API keys and secrets with environment config.
- Link externally using `rel="noopener noreferrer"` where opening a new tab.
- No analytics cookies until necessary and disclosed; privacy-friendly aggregate analytics optional.

## 10. Content quality and failure behavior

When `ticketPrice` / `openingHours` / `hotel` / `flight` unknown: render `Confirm before visit`, not `Free`, `Always open`, or empty fake cards. If media missing: accessible fallback and place title. If map fails: external directions. If offline: last cached itinerary with `May have changed` message. If a stop is cancelled: maintain record and `Skipped` state rather than silently deleting history.

## 11. Localization architecture

Ship English as default. Keep copy in content objects or dictionary; use locale-aware number/date formatting. The addition of Sinhala should not require rewriting UI components. Test longer text and diacritical/transliteration variants (Rawana/Ravana, Seetha/Sita, Nuwara Eliya/Nuwaraeliya).

## 12. Code quality

- TypeScript `strict: true`, no blind `any` in content pipeline.
- Semantic HTML headings, actual buttons/links, clean React server/client boundaries.
- Atomic utility components only where reused; avoid unnecessary generic abstractions.
- Formally validate all supplied content at build.
- Include a readable README with local dev/build/test instructions and sample environment file with no secrets.
- Do not declare functionality completed until it is visible and tested.
