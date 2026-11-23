import { z } from "zod";

export const ISODateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/) as z.ZodType<`${number}-${number}-${number}`>;

export const StoryClassificationSchema = z.enum([
  "historical",
  "tradition",
  "observable",
  "uncertain",
]);

export const StopPrioritySchema = z.enum(["primary", "optional", "conditional"]);
export const StopStatusSchema = z.enum(["planned", "confirmed", "completed", "skipped"]);
export const VerificationStatusSchema = z.enum(["verified", "check-again", "unverified"]);

export const SourceRecordSchema = z.object({
  id: z.string(),
  title: z.string(),
  publisher: z.string(),
  url: z.string().url(),
  checkedAt: ISODateSchema.nullable(),
  supports: z.array(z.string()),
  trust: z.enum(["official", "heritage-authority", "reputable-secondary"]),
});

export const MediaRecordSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  width: z.number().positive(),
  height: z.number().positive(),
  credit: z.string(),
  license: z.string(),
  creditUrl: z.string().optional(),
  focalX: z.number().min(0).max(100).optional(),
  focalY: z.number().min(0).max(100).optional(),
});

export const StoryBlockSchema = z.object({
  title: z.string(),
  classification: StoryClassificationSchema,
  short: z.string(),
  full: z.string().optional(),
  sources: z.array(z.string()),
});

export const PlaceRecordSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  region: z.string(),
  tags: z.array(z.string()),
  heroMediaId: z.string().nullable(),
  galleryMediaIds: z.array(z.string()),
  mapQuery: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  shortIntro: z.string(),
  overview: z.string(),
  highlights: z.array(z.string()),
  stories: z.array(StoryBlockSchema),
  attireAndEtiquette: z.array(z.string()).optional(),
  mobilityNotes: z.string().optional(),
  safetyNotes: z.array(z.string()).optional(),
  openHours: z.string().nullable().optional(),
  ticketPrice: z.string().nullable().optional(),
  operationalInfoStatus: VerificationStatusSchema,
  sourceIds: z.array(z.string()),
  lastReviewedAt: ISODateSchema.nullable(),
  hostScriptId: z.string().optional(),
});

export const TripStopSchema = z.object({
  id: z.string(),
  placeId: z.string(),
  order: z.number().int().positive(),
  priority: StopPrioritySchema,
  status: StopStatusSchema,
  approximatePartOfDay: z.enum(["morning", "afternoon", "evening", "flexible"]).optional(),
  plannedLocalTime: z.string().nullable().optional(),
  guestNote: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const DayRecordSchema = z.object({
  date: ISODateSchema,
  dayNumber: z.number().int().min(1).max(7),
  title: z.string(),
  from: z.string(),
  to: z.string(),
  regionLabel: z.string(),
  teaser: z.string(),
  heroMediaId: z.string().nullable(),
  stops: z.array(TripStopSchema),
  notes: z.array(z.string()),
  estimatedRoadTransfer: z.string().optional(),
  overnightLocation: z.string().nullable().optional(),
  hotelName: z.string().nullable().optional(),
  operationalStatus: VerificationStatusSchema,
});

export const TripConfigSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  startDate: ISODateSchema,
  endDate: ISODateSchema,
  timeZone: z.literal("Asia/Colombo"),
  numberOfGuests: z.literal(2),
  primaryLanguage: z.literal("en"),
  arrivalFlight: z.string().nullable().optional(),
  departureFlight: z.string().nullable().optional(),
  confirmedHostContact: z.string().nullable().optional(),
  notes: z.array(z.string()),
});

