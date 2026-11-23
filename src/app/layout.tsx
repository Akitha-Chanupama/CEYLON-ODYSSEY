import type { Metadata, Viewport } from "next";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
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
      <body className="min-h-screen flex flex-col bg-ivory antialiased selection:bg-sage selection:text-forest">
        <OfflineNotice />
        <main className="flex-1 pb-safe">{children}</main>
        <BottomTabBar />
      </body>
    </html>
  );
}

