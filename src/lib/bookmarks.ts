"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "ceylon_odyssey_saved_places";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not load bookmarks from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  const toggleBookmark = (placeId: string) => {
    setBookmarks((prev) => {
      const updated = prev.includes(placeId)
        ? prev.filter((id) => id !== placeId)
        : [...prev, placeId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("Could not save bookmark to localStorage", e);
      }
      return updated;
    });
  };

  const isBookmarked = (placeId: string) => bookmarks.includes(placeId);

  return { bookmarks, toggleBookmark, isBookmarked, isLoaded };
}
