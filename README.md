# Discover Sri Lanka — Our Island Journey (Ceylon Odyssey)

A bespoke, mobile-first travel companion designed for two international guests and their local host traveling through Sri Lanka from **21–27 December 2026** (Asia/Colombo timezone).

---

## 🌴 Project Highlights

- **Mobile-First UX**: Optimized for 360–430px viewports (and down to 320px) with 44px+ touch targets, outdoor contrast, and bottom tab navigation.
- **Thematic Depth**: Highlights **King Ravana and Sri Lankan Ramayana traditions** while strictly distinguishing faith/folklore from documented archaeological history.
- **Accurate Itinerary Architecture**: Seetha Amman Kovil correctly scheduled in Nuwara Eliya / Seetha Eliya (Day 5), Ravana Falls on the Ella–Wellawaya route (Day 6), and Rumassala on the south coast (Day 6).
- **Zero Fabrication**: All time-sensitive and volatile details (flight numbers, hotels, ticket prices, opening hours) are explicitly flagged as editable `To Confirm` (`TBC`).
- **Fully Typed Data Layer**: Centralized data records validated via Zod schemas and automated build-time integrity audits.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Custom Design Tokens (Emerald Heritage palette)
- **Icons**: Lucide React
- **Validation**: Zod + tsx audit scripts

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Verify Content Integrity
Audit all place references, tour days, media IDs, and source citations:
```bash
npm run verify-content
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser (switch to Mobile Device Mode in DevTools).

### 4. Build for Production
```bash
npm run typecheck
npm run build
```

---

## 📁 Key Documentation

- [ASSUMPTIONS_AND_TBC.md](file:///d:/akitha_react/SL%20Tour%20Web/ASSUMPTIONS_AND_TBC.md): Host checklist for flights, hotels, and vehicle confirmations.
- [CONTENT_VERIFICATION.md](file:///d:/akitha_react/SL%20Tour%20Web/CONTENT_VERIFICATION.md): Verified sources and editorial guidelines.
- [ASSET_LICENSES.md](file:///d:/akitha_react/SL%20Tour%20Web/ASSET_LICENSES.md): Photographic credits and licenses.
- [RELEASE_CHECKLIST.md](file:///d:/akitha_react/SL%20Tour%20Web/RELEASE_CHECKLIST.md): Quality assurance matrix and test records.
