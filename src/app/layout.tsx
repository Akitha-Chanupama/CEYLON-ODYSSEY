import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { OfflineNotice } from "@/components/common/OfflineNotice";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discover Sri Lanka — Our Island Journey",
  description:
    "A private mobile-first travel companion for two international guests exploring ancient citadels, misty tea country, the Ravana Trail, and golden southern beaches.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ceylon Odyssey",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF9F4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-ivory text-ink">
      <body className="min-h-screen flex flex-col bg-ivory font-sans antialiased selection:bg-sage selection:text-forest">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-forest focus:text-white focus:text-xs focus:font-semibold focus:shadow-elevated"
        >
          Skip to main content
        </a>
        <OfflineNotice />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <BottomTabBar />
      </body>
    </html>
  );
}

