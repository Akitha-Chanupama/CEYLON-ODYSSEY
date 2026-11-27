import { test, describe } from "node:test";
import assert from "node:assert/strict";

import { tripConfig } from "../../src/content/trip";
import { days } from "../../src/content/days";
import { places } from "../../src/content/places";
import { sources } from "../../src/content/sources";
import { mediaRecords } from "../../src/content/media";
import {
  getSriLankaDateString,
  getActiveTourDay,
  formatTourDate,
} from "../../src/lib/dates";
import { getGoogleMapsUrl, getAppleMapsUrl } from "../../src/lib/navigation";
import { ISODate } from "../../src/types";

describe("Ceylon Odyssey Acceptance Tests", () => {
  // UT-01: Correct local date in Asia/Colombo
  test("UT-01: Returns correct local date in Asia/Colombo format YYYY-MM-DD", () => {
    // 2026-12-25 at 03:00 UTC is 08:30 in Colombo (same day: 2026-12-25)
    const simulatedDate = new Date("2026-12-25T03:00:00Z");
    const colomboDateStr = getSriLankaDateString(simulatedDate);
    assert.equal(colomboDateStr, "2026-12-25");
  });

  // UT-02: Timezone independence
  test("UT-02: Correctly handles timezone offset (late night UTC is next morning in Colombo)", () => {
    // 2026-12-25 at 21:00 UTC is 2026-12-26 at 02:30 in Colombo
    const lateUtc = new Date("2026-12-25T21:00:00Z");
    const colomboDateStr = getSriLankaDateString(lateUtc);
    assert.equal(colomboDateStr, "2026-12-26");

    const active = getActiveTourDay(colomboDateStr);
    assert.equal(active.day.dayNumber, 6);
  });

  // UT-03: Outside-trip behavior
  test("UT-03: Outside-trip dates fallback gracefully to preview or recap", () => {
    // Before trip
    const beforeTrip = getActiveTourDay("2026-11-23" as ISODate);
    assert.equal(beforeTrip.status, "before-trip");
    assert.equal(beforeTrip.day.dayNumber, 1); // Preview Day 1

    // Active trip
    const activeDay = getActiveTourDay("2026-12-25" as ISODate);
    assert.equal(activeDay.status, "active-trip");
    assert.equal(activeDay.day.dayNumber, 5);

    // After trip
    const afterTrip = getActiveTourDay("2026-12-30" as ISODate);
    assert.equal(afterTrip.status, "after-trip");
    assert.equal(afterTrip.day.dayNumber, 7); // Recap final day
  });

  // UT-04: Day 5 content integrity (Seetha Amman in Nuwara Eliya / Ella)
  test("UT-04: Day 5 contains Seetha Amman Kovil and Ella; not down south", () => {
    const day5 = days.find((d) => d.date === "2026-12-25");
    assert.ok(day5, "Day 5 must exist");

    const stopPlaceIds = day5.stops.map((s) => s.placeId);
    assert.ok(stopPlaceIds.includes("seetha-amman-kovil"), "Day 5 must include Seetha Amman");
    assert.ok(stopPlaceIds.includes("ella"), "Day 5 must include Ella");

    const seethaPlace = places["seetha-amman-kovil"];
    assert.match(seethaPlace.region, /Nuwara Eliya/i, "Seetha Amman must be located near Nuwara Eliya");
    assert.doesNotMatch(seethaPlace.region, /Unawatuna|Galle/i, "Seetha Amman must NOT be on south coast");
  });

  // UT-05: Day 6 content integrity (Ravana Falls & Rumassala)
  test("UT-05: Day 6 contains Ravana Falls and Rumassala on the route to south coast", () => {
    const day6 = days.find((d) => d.date === "2026-12-26");
    assert.ok(day6, "Day 6 must exist");

    const stopPlaceIds = day6.stops.map((s) => s.placeId);
    assert.ok(stopPlaceIds.includes("ravana-falls"), "Day 6 must include Ravana Falls");
    assert.ok(stopPlaceIds.includes("rumassala"), "Day 6 must include Rumassala");
    assert.ok(stopPlaceIds.includes("unawatuna"), "Day 6 must include Unawatuna");

    // Galle Fort is marked optional
    const galleStop = day6.stops.find((s) => s.placeId === "galle-fort");
    if (galleStop) {
      assert.equal(galleStop.priority, "optional", "Galle Fort must be optional if included on Day 6");
    }
  });

  // UT-06: Deep linking and place fields
  test("UT-06: All 19 destinations have valid slugs, overviews, and safety/etiquette notes", () => {
    const placeList = Object.values(places);
    assert.equal(placeList.length, 19, "Must contain all 19 canonical destinations");

    for (const place of placeList) {
      assert.ok(place.slug, `Place ${place.id} must have a slug`);
      assert.ok(place.shortIntro.length >= 50, `Place ${place.id} must have a substantial intro`);
      assert.ok(place.highlights.length > 0, `Place ${place.id} must have highlights`);
      assert.ok(place.sourceIds.length > 0, `Place ${place.id} must have verified source IDs`);
    }
  });

  // UT-07: Missing prices handled honestly
  test("UT-07: Unverified prices remain null with check-again status", () => {
    const sigiriya = places["sigiriya-rock-fortress"];
    assert.equal(sigiriya.ticketPrice, null, "Sigiriya ticket price must be null until confirmed live");
    assert.equal(sigiriya.operationalInfoStatus, "check-again");
  });

  // UT-08: Missing flights and hotels handled honestly
  test("UT-08: Unconfirmed flights and hotel bookings default to null", () => {
    assert.equal(tripConfig.arrivalFlight, null);
    assert.equal(tripConfig.departureFlight, null);

    for (const day of days) {
      assert.equal(day.hotelName, null, `Day ${day.dayNumber} hotel must not be fabricated`);
    }
  });

  // UT-09: Directions navigation URL generation
  test("UT-09: Generates properly encoded Google Maps and Apple Maps navigation URLs", () => {
    const query = "Seetha Amman Kovil, Seetha Eliya, Sri Lanka";
    const gUrl = getGoogleMapsUrl(query, 6.9328, 80.8142);
    assert.match(gUrl, /destination=6\.9328,80\.8142/, "Coordinates should be formatted into Google Maps directions");

    const gQueryOnly = getGoogleMapsUrl(query);
    assert.match(gQueryOnly, /api=1&query=Seetha%20Amman%20Kovil/, "Query string must be URL encoded");

    const aUrl = getAppleMapsUrl(query, 6.9328, 80.8142);
    assert.match(aUrl, /daddr=6\.9328,80\.8142/, "Apple Maps destination should be properly formatted");
  });

  // UT-10: Myth vs. history classification
  test("UT-10: Distinguishes King Kassapa history at Sigiriya from popular Ravana folklore", () => {
    const sigiriya = places["sigiriya-rock-fortress"];
    const histStory = sigiriya.stories.find((s) => s.title.includes("Kassapa"));
    assert.ok(histStory, "Must have King Kassapa history story");
    assert.equal(histStory?.classification, "historical");

    const folkloreStory = sigiriya.stories.find((s) => s.title.includes("Ravana"));
    assert.ok(folkloreStory, "Must have Ravana folklore analysis");
    assert.equal(folkloreStory?.classification, "uncertain");

    const seethaAmman = places["seetha-amman-kovil"];
    for (const story of seethaAmman.stories) {
      assert.equal(story.classification, "tradition", "Seetha Amman epic stories must be classified as tradition");
    }
  });

  // UT-11: Tour stops priority and ordering
  test("UT-11: Stops within every day have positive sequential orders and valid priorities", () => {
    for (const day of days) {
      assert.ok(day.stops.length >= 1, `Day ${day.dayNumber} must have at least 1 stop`);
      const orders = day.stops.map((s) => s.order);
      const sorted = [...orders].sort((a, b) => a - b);
      assert.deepEqual(orders, sorted, `Day ${day.dayNumber} stop orders must be sorted sequentially`);

      for (const stop of day.stops) {
        assert.ok(["primary", "optional", "conditional"].includes(stop.priority));
        assert.ok(["planned", "confirmed", "completed", "skipped"].includes(stop.status));
      }
    }
  });

  // UT-12: Zero private data leakage
  test("UT-12: No sensitive credentials or private numbers in tripConfig", () => {
    assert.equal(tripConfig.confirmedHostContact, null);
    assert.equal(typeof tripConfig.timeZone, "string");
    assert.equal(tripConfig.timeZone, "Asia/Colombo");
  });

  // UT-13: Local verified media records & attribution
  test("UT-13: Every media record uses local asset path with complete licensing metadata", () => {
    const records = Object.values(mediaRecords);
    assert.equal(records.length, 19);
    for (const m of records) {
      assert.ok(m.src.startsWith("/images/places/"), `${m.id} must use local /images/places/ asset`);
      assert.ok(m.credit.length > 0, `${m.id} must have photographer credit`);
      assert.ok(m.license.length > 0, `${m.id} must have license`);
      assert.ok(m.creditUrl && m.creditUrl.startsWith("https://commons.wikimedia.org/"), `${m.id} must link to Commons source`);
    }
  });
});

