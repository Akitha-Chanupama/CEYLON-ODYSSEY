export type ISODate = `${number}-${number}-${number}`;
export type PlaceId = string;

export type StoryClassification =
  | "historical"
  | "tradition"
  | "observable"
  | "uncertain";

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
  src: string; // local or public path
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
  mapQuery: string; // validated query for external navigation
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
  hostScriptId?: string;
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
  estimatedRoadTransfer?: string; // labeled as approximate planning estimate
  overnightLocation?: string | null;
  hotelName?: string | null; // null unless confirmed
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
