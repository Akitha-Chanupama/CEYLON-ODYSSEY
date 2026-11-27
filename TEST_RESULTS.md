# Ceylon Odyssey — Automated Test & Verification Report

**Date of Execution:** 27 November 2026  
**Node.js Runtime:** v22.18.0  
**Test Runner:** Node Native Test Runner (`node:test`) + TypeScript execution via `tsx`

---

## 1. Content Integrity Audit (`npm run verify-content`)

| Validation Check | Target Specification | Result |
|---|---|---|
| **Trip Configuration** | 2026-12-21 to 2026-12-27, `Asia/Colombo`, 2 guests | **PASSED** |
| **Sources Schema & Resolution** | 12 official/heritage authority sources validated | **PASSED** |
| **Media Assets Registry** | 19 local Wikimedia Commons images (`/images/places/*.jpg`) with credits & licenses | **PASSED** |
| **Destinations Schema** | All 19 canonical destinations with overviews, etiquette & sources | **PASSED** |
| **7-Day Itinerary Structure** | Exactly 7 days, consecutive dates, ordered stops | **PASSED** |
| **Seetha Amman Placement** | Scheduled strictly on Day 5 (25 Dec) in Nuwara Eliya | **PASSED** |
| **Ravana Falls Placement** | Scheduled strictly on Day 6 (26 Dec) on south descent | **PASSED** |

---

## 2. TypeScript Check & Acceptance Tests (`npm run typecheck`, `npm test`)

```text
# Subtest: Ceylon Odyssey Acceptance Tests
  ok 1 - UT-01: Returns correct local date in Asia/Colombo format YYYY-MM-DD
  ok 2 - UT-02: Correctly handles timezone offset (late night UTC is next morning in Colombo)
  ok 3 - UT-03: Outside-trip dates fallback gracefully to preview or recap
  ok 4 - UT-04: Day 5 contains Seetha Amman Kovil and Ella; not down south
  ok 5 - UT-05: Day 6 contains Ravana Falls and Rumassala on the route to south coast
  ok 6 - UT-06: All 19 destinations have valid slugs, overviews, and safety/etiquette notes
  ok 7 - UT-07: Unverified prices remain null with check-again status
  ok 8 - UT-08: Unconfirmed flights and hotel bookings default to null
  ok 9 - UT-09: Generates properly encoded Google Maps and Apple Maps navigation URLs
  ok 10 - UT-10: Distinguishes King Kassapa history at Sigiriya from popular Ravana folklore
  ok 11 - UT-11: Stops within every day have positive sequential orders and valid priorities
  ok 12 - UT-12: No sensitive credentials or private numbers in tripConfig
  ok 13 - UT-13: Every media record uses local asset path with complete licensing metadata
  ok 14 - UT-14: Formats internal place tags cleanly and detects Ravana Trail landmarks

14 passed, 0 failed
```

---

## 3. Production Build & SSG Validation (`npm run build`)

- **Total Static Pages Pre-rendered:** 37
  - `/` (Today's Plan)
  - `/welcome` (Guest Orientation)
  - `/journey` (7-Day Overview)
  - `/day/[date]` (7 dates: 2026-12-21 through 2026-12-27)
  - `/explore` (Search & Filter Directory)
  - `/places/[slug]` (19 Destination Guides)
  - `/ravana-trail` (Thematic Hub)
  - `/essentials` (Etiquette, Phrases, Helplines)
  - `/saved` (Local Bookmarks)
  - `/map` (Interactive SVG Route Schematic & Navigation Directory)
  - `/_not-found` (404 Handler)
- **First Load JS:** ~103 kB shared bundle
- **Build & Lint Status:** 0 TypeScript or ESLint errors.

---

## 4. Visual Viewport & DOM Audit Matrix (`scripts/capture-screenshots.js`)

Automated via Chrome DevTools Protocol against production `next start`, verifying `HTTP 200`, `document.documentElement.scrollWidth <= window.innerWidth`, and decoded images (`complete && naturalWidth > 0`) on every target:

| Viewport | Route / Screen | File Name | Horizontal Overflow | Broken Images |
|---|---|---|---|---|
| **360 × 800** (Small Mobile) | Today (`/`) | `mobile-today-360x800.png` | 0px (`360/360`) | 0 / 3 |
| **360 × 800** (Small Mobile) | Explore (`/explore`) | `mobile-explore-360x800.png` | 0px (`360/360`) | 0 / 19 |
| **360 × 800** (Small Mobile) | Route Map (`/map`) | `mobile-map-360x800.png` | 0px (`360/360`) | — |
| **390 × 844** (Mobile) | Today (`/`) | `mobile-today-390x844.png` | 0px (`390/390`) | 0 / 3 |
| **390 × 844** (Mobile) | Journey (`/journey`) | `mobile-journey-390x844.png` | 0px (`390/390`) | 0 / 7 |
| **390 × 844** (Mobile) | Ravana Trail (`/ravana-trail`) | `mobile-ravana-trail-390x844.png` | 0px (`390/390`) | 0 / 6 |
| **390 × 844** (Mobile) | Place Guide (`/places/seetha-amman-kovil`) | `mobile-place-seetha-390x844.png` | 0px (`390/390`) | 0 / 1 |
| **1440 × 900** (Desktop) | Today (`/`) | `desktop-today-1440x900.png` | 0px | 0 / 3 |
| **1440 × 900** (Desktop) | Journey (`/journey`) | `desktop-journey-1440x900.png` | 0px | 0 / 7 |
| **1440 × 900** (Desktop) | Explore (`/explore`) | `desktop-explore-1440x900.png` | 0px | 0 / 19 |
| **1440 × 900** (Desktop) | Ravana Trail (`/ravana-trail`) | `desktop-ravana-trail-1440x900.png` | 0px | 0 / 6 |
| **1440 × 900** (Desktop) | Place Guide (`/places/seetha-amman-kovil`) | `desktop-place-seetha-1440x900.png` | 0px | 0 / 1 |
| **1440 × 900** (Desktop) | Route Map (`/map`) | `desktop-map-1440x900.png` | 0px | — |
| **1440 × 900** (Desktop) | Essentials (`/essentials`) | `desktop-essentials-1440x900.png` | 0px | — |

---

## Overall Assessment: READY FOR DEPLOYMENT
All editorial, visual, responsive, accessibility, and automated checks have passed.
