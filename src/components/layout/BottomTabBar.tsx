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
      isActive:
        pathname.startsWith("/journey") ||
        pathname.startsWith("/day") ||
        pathname.startsWith("/map"),
    },
    {
      label: "Explore",
      href: "/explore",
      icon: Compass,
      isActive:
        pathname.startsWith("/explore") ||
        pathname.startsWith("/places") ||
        pathname.startsWith("/ravana-trail"),
    },
    {
      label: "Essentials",
      href: "/essentials",
      icon: BookOpen,
      isActive:
        pathname.startsWith("/essentials") ||
        pathname.startsWith("/welcome") ||
        pathname.startsWith("/saved"),
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-line/85 shadow-dock pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="max-w-lg mx-auto grid grid-cols-4 h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.isActive;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`min-h-[56px] flex flex-col items-center justify-center gap-1 transition-colors select-none ${
                active ? "text-forest font-semibold" : "text-muted hover:text-ink"
              }`}
            >
              <div
                className={`px-3 py-1 rounded-full transition-all ${
                  active ? "bg-sage/85 scale-[1.03]" : ""
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.25 : 1.8} />
              </div>
              <span className="text-[11px] leading-none tracking-tight">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

