"use client";

import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";

export function OfflineNotice() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    function handleOffline() {
      setIsOffline(true);
    }
    function handleOnline() {
      setIsOffline(false);
    }

    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine);
      window.addEventListener("offline", handleOffline);
      window.addEventListener("online", handleOnline);
    }

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-forest-deep text-white text-xs px-4 py-2 flex items-center justify-center gap-2 border-b border-forest-light sticky top-0 z-50 shadow-md"
    >
      <WifiOff size={14} className="text-antique-gold shrink-0" />
      <span>
        You are offline. Itinerary, place guides, and stories remain accessible. External maps require internet.
      </span>
    </div>
  );
}
