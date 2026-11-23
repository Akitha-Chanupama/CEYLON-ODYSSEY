import { DayRecord, ISODate } from "@/types";
import { days } from "@/content/days";

/**
 * Returns current date in Sri Lanka (Asia/Colombo) formatted as YYYY-MM-DD
 */
export function getSriLankaDateString(customDate?: Date): ISODate {
  const targetDate = customDate || new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(targetDate) as ISODate;
}

/**
 * Determines which tour day corresponds to the given date string.
 * If the date is before the trip starts (before 2026-12-21), returns Day 1 as preview.
 * If the date is after the trip ends (after 2026-12-27), returns Day 7.
 * Otherwise returns the matching day.
 */
export function getActiveTourDay(currentDateStr: ISODate): {
  day: DayRecord;
  status: "before-trip" | "active-trip" | "after-trip";
} {
  const matchingDay = days.find((d) => d.date === currentDateStr);
  if (matchingDay) {
    return { day: matchingDay, status: "active-trip" };
  }

  if (currentDateStr < "2026-12-21") {
    return { day: days[0], status: "before-trip" };
  }

  return { day: days[days.length - 1], status: "after-trip" };
}

/**
 * Formats an ISO date into a readable Sri Lanka local display format, e.g. "Friday, 25 December"
 */
export function formatTourDate(isoDate: ISODate): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const dateObj = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(dateObj);
}

