"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Compass, MapPin, BookOpen } from "lucide-react";

export function BottomTabBar() {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Today",
      href: "/",
      icon: Sun,
      isActive: pathname === "/",
    },
    {
      label: "Journey",
      href: "/journey",
      icon: MapPin,
      isActive: pathname.startsWith("/journey") || pathname.startsWith("/day"),
    },
    {
      label: "Explore",
      href: "/explore",
      icon: Compass,
      isActive: pathname.startsWith("/explore") || pathname.startsWith("/places") || pathname.startsWith("/ravana-trail"),
    },
    {
      label: "Essentials",
      href: "/essentials",
      icon: BookOpen,
      isActive: pathname.startsWith("/essentials"),
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-line transition-all"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.isActive;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors select-none ${
                active ? "text-forest font-semibold" : "text-muted hover:text-ink"
              }`}
            >
              <div
                className={`p-1 rounded-full transition-transform ${
                  active ? "bg-sage/70 scale-105" : ""
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.3 : 1.8} />
              </div>
              <span className="text-[11px] tracking-tight">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

