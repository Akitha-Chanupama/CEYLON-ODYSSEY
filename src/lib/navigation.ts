/**
 * Generates an external Google Maps navigation query URL.
 * Never invents fake GPS coordinates; relies on verified place query strings or explicit lat/lng.
 */
export function getGoogleMapsUrl(query: string, lat?: number, lng?: number): string {
  if (lat !== undefined && lng !== undefined) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Generates an external Apple Maps URL for iOS devices.
 */
export function getAppleMapsUrl(query: string, lat?: number, lng?: number): string {
  if (lat !== undefined && lng !== undefined) {
    return `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
  }
  return `https://maps.apple.com/?q=${encodeURIComponent(query)}`;
}
