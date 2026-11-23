# Content Model, Schema and Example Data

## 1. Data architecture requirement

All itinerary and destination data must be centralized. Prefer **TypeScript + Zod** (or strict JSON schema). Other docs describe editorial content; this file describes the contract between data and UI. Unknown facts must be representable without lying to guests.

## 2. TypeScript starter definitions

```ts
export type ISODate = `${number}-${number}-${number}`;
export type PlaceId = string;
export type StoryClassification =
  | "historical" | "tradition" | "observable" | "uncertain";
export type StopPriority = "primary" | "optional" | "conditional";
export type StopStatus = "planned" | "confirmed" | "completed" | "skipped";
export type VerificationStatus = "verified" | "check-again" | "unverified";

export interface SourceRecord {
  id: string;
  title: string;
  publisher: string;
  url: string;
  checkedAt: ISODate | null;
  supports: string[];
  trust: "official" | "heritage-authority" | "reputable-secondary";
}

export interface MediaRecord {
  id: string;
  src: string; // local asset path; do not hotlink random website images
  alt: string;
  width: number;
  height: number;
  credit: string;
  license: string;
  creditUrl?: string;
  focalX?: number; // 0..100
  focalY?: number;
}

export interface StoryBlock {
  title: string;
  classification: StoryClassification;
  short: string;
  full?: string;
  sources: string[]; // source IDs
}

export interface PlaceRecord {
  id: PlaceId;
  slug: string;
  title: string;
  subtitle: string;
  region: string;
  tags: string[];
  heroMediaId: string | null;
  galleryMediaIds: string[];
  mapQuery: string; // validated; coordinates are OPTIONAL
  latitude?: number;
  longitude?: number;
  shortIntro: string;
  overview: string;
  highlights: string[];
  stories: StoryBlock[];
  attireAndEtiquette?: string[];
  mobilityNotes?: string;
  safetyNotes?: string[];
  openHours?: string | null;
  ticketPrice?: string | null;
  operationalInfoStatus: VerificationStatus;
  sourceIds: string[];
  lastReviewedAt: ISODate | null;
  hostScriptId?: string; // server-side if private
}

export interface TripStop {
  id: string;
  placeId: PlaceId;
  order: number;
  priority: StopPriority;
  status: StopStatus;
  approximatePartOfDay?: "morning" | "afternoon" | "evening" | "flexible";
  plannedLocalTime?: string | null; // HH:mm, only if confirmed
  guestNote?: string;
  cancellationReason?: string;
}

export interface DayRecord {
  date: ISODate;
  dayNumber: number;
  title: string;
  from: string;
  to: string;
  regionLabel: string;
  teaser: string;
  heroMediaId: string | null;
  stops: TripStop[];
  notes: string[];
  estimatedRoadTransfer?: string; // clearly labeled as approximate
  overnightLocation?: string | null;
  hotelName?: string | null; // null unless actually booked
  operationalStatus: VerificationStatus;
}

export interface TripConfig {
  title: string;
  subtitle: string;
  startDate: ISODate;
  endDate: ISODate;
  timeZone: "Asia/Colombo";
  numberOfGuests: 2;
  primaryLanguage: "en";
  arrivalFlight?: string | null;
  departureFlight?: string | null;
  confirmedHostContact?: string | null;
  notes: string[];
}
```

**Note:** If TypeScript examples are copied directly, add Zod equivalents plus validation rules. Do not put `hostScriptId` content in guest-public bundles if the actual scripts are private.

## 3. Sample trip config

```ts
export const tripConfig: TripConfig = {
  title: "Discover Sri Lanka",
  subtitle: "Seven days. A thousand stories.",
  startDate: "2026-12-21",
  endDate: "2026-12-27",
  timeZone: "Asia/Colombo",
  numberOfGuests: 2,
  primaryLanguage: "en",
  arrivalFlight: null,
  departureFlight: null,
  confirmedHostContact: null,
  notes: [
    "Personal itinerary for two guests",
    "Strong interest in the Ramayana and Ravana-related places",
    "Times may change based on travel conditions"
  ]
};
```

## 4. Sample place data — Seetha Amman Kovil

```ts
export const seethaAmman: PlaceRecord = {
  id: "seetha-amman-kovil",
  slug: "seetha-amman-kovil",
  title: "Seetha Amman Kovil",
  subtitle: "A sacred place in the story of Sita",
  region: "Seetha Eliya, near Nuwara Eliya",
  tags: ["Hindu temple", "Ramayana tradition", "Ravana Trail"],
  heroMediaId: null,
  galleryMediaIds: [],
  mapQuery: "Seetha Amman Kovil, Seetha Eliya, Nuwara Eliya, Sri Lanka",
  shortIntro: "A living Hindu temple with a special place in Sri Lanka's Ramayana traditions.",
  overview: "Set near Nuwara Eliya, this temple is associated by local belief with Sita's time in Lanka. Today it remains a place of worship, with stories linked to its surrounding landscape.",
  highlights: ["Living temple tradition", "Ramayana stories", "Seetha Eliya highland setting"],
  stories: [{
    title: "Sita and Seetha Eliya",
    classification: "tradition",
    short: "According to local tradition, this area is connected with Sita's stay in Lanka.",
    sources: ["central-province-seetha-amman"]
  }],
  attireAndEtiquette: ["Dress respectfully", "Follow shoe-removal instructions", "Ask before photographing worshippers"],
  mobilityNotes: "Check current site access and walking conditions.",
  safetyNotes: [],
  openHours: null,
  ticketPrice: null,
  operationalInfoStatus: "check-again",
  sourceIds: ["central-province-seetha-amman"],
  lastReviewedAt: "2026-11-23"
};
```

## 5. Sample source registry

```ts
export const sources: SourceRecord[] = [{
  id: "central-province-seetha-amman",
  title: "Seetha Amman Kovil",
  publisher: "Central Province Tourism Department",
  url: "https://tourism.cp.gov.lk/en/seetha-amman-kovil",
  checkedAt: "2026-11-23",
  supports: ["location near Nuwara Eliya", "local Ramayana tradition"],
  trust: "official"
}];
```

## 6. One full day sample — Day 5

```ts
export const dayFive: DayRecord = {
  date: "2026-12-25",
  dayNumber: 5,
  title: "Stories of Sita, Road to Ella",
  from: "Nuwara Eliya",
  to: "Ella",
  regionLabel: "Central Highlands",
  teaser: "Follow living Ramayana traditions from Seetha Eliya toward the Ella hills.",
  heroMediaId: null,
  estimatedRoadTransfer: "Roughly 2–3.5 hours driving, excluding visits; planning estimate only",
  overnightLocation: "Ella",
  hotelName: null,
  operationalStatus: "check-again",
  notes: ["Check temple access on Christmas Day", "Do not overcrowd the day", "Cave hike only in safe conditions"],
  stops: [
    {id:"d5-1",placeId:"seetha-amman-kovil",order:1,priority:"primary",status:"planned",approximatePartOfDay:"morning"},
    {id:"d5-2",placeId:"hakgala-botanical-gardens",order:2,priority:"optional",status:"planned"},
    {id:"d5-3",placeId:"divurumpola",order:3,priority:"optional",status:"planned"},
    {id:"d5-4",placeId:"ella",order:4,priority:"primary",status:"planned",approximatePartOfDay:"afternoon"},
    {id:"d5-5",placeId:"ravana-cave",order:5,priority:"conditional",status:"planned"}
  ]
};
```

## 7. Master day roster for seed data

| Date | Required place IDs | Optional / conditional IDs |
|---|---|---|
| 2026-12-21 | `bandaranaike-international-airport` | `negombo` / `sigiriya-area-hotel` (only if confirmed) |
| 2026-12-22 | `sigiriya-rock-fortress`, `dambulla-cave-temple` (conditional if arrival late) | local scenic stop |
| 2026-12-23 | `matale-muthumari-amman-kovil`, `kandy` | `temple-of-tooth-kandy`, `kandy-lake` |
| 2026-12-24 | `ramboda-hanuman-temple`, `nuwara-eliya` | `ramboda-tea-country`, Seetha Amman if early |
| 2026-12-25 | `seetha-amman-kovil`, `ella` | `hakgala-botanical-gardens`, `divurumpola`, `ravana-cave`, `nine-arch-bridge` |
| 2026-12-26 | `ravana-falls`, `rumassala`, `unawatuna` | `galle-fort` |
| 2026-12-27 | `bandaranaike-international-airport` | none without flight time |

**Important:** These IDs are cross-reference examples. Implement one canonical place list with all referenced IDs, including `kandy` and any placeholder region entries, or change day references to existing exact IDs. Fail the build if a stop references a nonexistent place.

## 8. Validation rules

- Day count exactly 7, consecutive dates from 2026-12-21 through 2026-12-27.
- Every day index 1…7 unique; trip time zone set.
- Every place slug unique; every day stop refers to valid place; every source and media ID resolves.
- Image credit/license/alt mandatory for external photographer photos.
- Story classification must exist for each story block; legendary claims must be `tradition`.
- Hours and prices null when unverified; UI renders `Confirm before visit` rather than invented defaults.
- No route/timeline negative ordering; no duplicated primary stop in same day unless explicitly intended.
- Only actual validated coordinates enter map pins; otherwise mapQuery displayed in an external navigation link.
- Host-only fields never serialized to public client bundles unless they are explicitly non-sensitive and approved.

## 9. Editorial data workflow

1. Read source and record source URLs.
2. Write concise English copy and classification.
3. Add media metadata and license.
4. Validate data schema.
5. Run cross-reference integrity test.
6. Review mobile rendering and navigate route.
7. Log source-check date and unresolved facts.

Never treat AI-generated text as verified merely because it reads convincingly.
