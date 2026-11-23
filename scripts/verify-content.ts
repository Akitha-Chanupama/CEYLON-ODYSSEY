import { tripConfig } from "../src/content/trip";
import { days } from "../src/content/days";
import { places } from "../src/content/places";
import { sources } from "../src/content/sources";
import { mediaRecords } from "../src/content/media";
import {
  TripConfigSchema,
  DayRecordSchema,
  PlaceRecordSchema,
  SourceRecordSchema,
  MediaRecordSchema,
} from "../src/lib/validators";

console.log("==========================================");
console.log("CEYLON ODYSSEY: Content Integrity Audit");
console.log("==========================================");

let hasErrors = false;

// 1. Validate Trip Config
const tripResult = TripConfigSchema.safeParse(tripConfig);
if (!tripResult.success) {
  console.error("❌ TripConfig validation failed:", tripResult.error.format());
  hasErrors = true;
} else {
  console.log("✅ TripConfig schema validated.");
}

// 2. Validate Sources
const sourceMap = new Set(sources.map((s) => s.id));
sources.forEach((src) => {
  const res = SourceRecordSchema.safeParse(src);
  if (!res.success) {
    console.error(`❌ SourceRecord [${src.id}] validation failed:`, res.error.format());
    hasErrors = true;
  }
});
console.log(`✅ ${sources.length} sources validated.`);

// 3. Validate Media Records
const mediaMap = new Set(Object.keys(mediaRecords));
Object.values(mediaRecords).forEach((med) => {
  const res = MediaRecordSchema.safeParse(med);
  if (!res.success) {
    console.error(`❌ MediaRecord [${med.id}] validation failed:`, res.error.format());
    hasErrors = true;
  }
});
console.log(`✅ ${Object.keys(mediaRecords).length} media records validated.`);

// 4. Validate Places
const placeKeys = Object.keys(places);
placeKeys.forEach((key) => {
  const place = places[key];
  const res = PlaceRecordSchema.safeParse(place);
  if (!res.success) {
    console.error(`❌ PlaceRecord [${key}] schema validation failed:`, res.error.format());
    hasErrors = true;
  }

  // Cross-reference check: heroMediaId
  if (place.heroMediaId && !mediaMap.has(place.heroMediaId)) {
    console.error(`❌ Place [${key}] references missing heroMediaId: ${place.heroMediaId}`);
    hasErrors = true;
  }

  // Cross-reference check: sourceIds
  place.sourceIds.forEach((srcId) => {
    if (!sourceMap.has(srcId)) {
      console.error(`❌ Place [${key}] references missing sourceId: ${srcId}`);
      hasErrors = true;
    }
  });

  // Cross-reference check: story sources
  place.stories.forEach((st) => {
    st.sources.forEach((stSrc) => {
      if (!sourceMap.has(stSrc)) {
        console.error(`❌ Place [${key}] story [${st.title}] references missing sourceId: ${stSrc}`);
        hasErrors = true;
      }
    });
  });
});
console.log(`✅ ${placeKeys.length} place records validated.`);

// 5. Validate Days and Stops
if (days.length !== 7) {
  console.error(`❌ Expected exactly 7 days, found ${days.length}`);
  hasErrors = true;
}

days.forEach((day) => {
  const res = DayRecordSchema.safeParse(day);
  if (!res.success) {
    console.error(`❌ DayRecord [Day ${day.dayNumber} - ${day.date}] schema error:`, res.error.format());
    hasErrors = true;
  }

  if (day.heroMediaId && !mediaMap.has(day.heroMediaId)) {
    console.error(`❌ Day ${day.dayNumber} references missing heroMediaId: ${day.heroMediaId}`);
    hasErrors = true;
  }

  day.stops.forEach((stop) => {
    if (!places[stop.placeId]) {
      console.error(`❌ Day ${day.dayNumber} stop references unknown placeId: ${stop.placeId}`);
      hasErrors = true;
    }
  });
});
console.log(`✅ ${days.length} day records and their tour stops validated.`);

// 6. Hard Requirements Sanity Checks
// - Seetha Amman Kovil must be on Day 5 (2026-12-25) in Nuwara Eliya / Seetha Eliya
const day5 = days.find((d) => d.date === "2026-12-25");
const hasSeethaAmmanDay5 = day5?.stops.some((s) => s.placeId === "seetha-amman-kovil");
if (!hasSeethaAmmanDay5) {
  console.error("❌ CRITICAL: Seetha Amman Kovil missing from Day 5 (2026-12-25)!");
  hasErrors = true;
} else {
  console.log("✅ Verified: Seetha Amman Kovil correctly scheduled on Day 5 (25 Dec).");
}

// - Ravana Falls must be on Day 6 (2026-12-26)
const day6 = days.find((d) => d.date === "2026-12-26");
const hasRavanaFallsDay6 = day6?.stops.some((s) => s.placeId === "ravana-falls");
const hasRumassalaDay6 = day6?.stops.some((s) => s.placeId === "rumassala");
if (!hasRavanaFallsDay6 || !hasRumassalaDay6) {
  console.error("❌ CRITICAL: Ravana Falls or Rumassala missing from Day 6 (2026-12-26)!");
  hasErrors = true;
} else {
  console.log("✅ Verified: Ravana Falls and Rumassala correctly scheduled on Day 6 (26 Dec).");
}

if (hasErrors) {
  console.error("\n❌ Content integrity check FAILED with errors.");
  process.exit(1);
} else {
  console.log("\n✨ ALL CONTENT INTEGRITY CHECKS PASSED PERFECTLY! ✨");
}
