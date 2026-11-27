const TAG_LABELS: Record<string, string> = {
  RAMAYANA_TRADITION: "Ramayana Tradition",
  "Ravana Trail": "Ravana Trail",
  "Thematic Priority": "Trail Highlight",
  HERITAGE: "Heritage",
  UNESCO: "UNESCO Site",
  History: "History",
  HINDUISM: "Hindu Kovil",
  BUDDHISM: "Buddhist Temple",
  CULTURE: "Living Culture",
  "Living Tradition": "Living Tradition",
  NATURE: "Nature & Landscapes",
  COAST: "South Coast",
  Highlands: "Highlands",
  Gateway: "Arrival & Departure",
  Transit: "Airport Transit",
  Scenic: "Scenic View",
  Restorative: "Coastal Retreat",
};

/**
 * Formats internal editorial tag enums into readable guest-facing labels.
 */
export function formatPlaceTag(tag: string): string {
  if (TAG_LABELS[tag]) return TAG_LABELS[tag];
  return tag
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function isRavanaPlace(tags: string[]): boolean {
  return tags.includes("Ravana Trail") || tags.includes("RAMAYANA_TRADITION");
}
