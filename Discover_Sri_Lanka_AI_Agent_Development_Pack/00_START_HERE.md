# DISCOVER SRI LANKA — AI Agent Handoff Pack

**Project:** A private, premium, mobile-first travel companion for two international visitors travelling through Sri Lanka from **21–27 December 2026** with their local host.

**Primary brief:** Make the trip easy to follow, beautiful to remember, and interesting to learn about. Strongly foreground **King Ravana and Sri Lankan Ramayana traditions**, while clearly distinguishing belief/legend from historically established facts.

**Status:** Developer-ready product specification and editorial starter pack. This is NOT a published website and NOT a finalized booking itinerary.

## The one-sentence product vision

> A beautifully designed Sri Lankan travel companion that gives guests the day's plan, inspiring destination photography, clear cultural stories, reliable practical details, and an enjoyable Ravana-focused thematic journey — all with one hand, on a phone.

## Hard requirements

1. **Mobile first, not desktop shrunk down.** Design for 360–430 px screens before scaling up.
2. Dates: **Mon 21 to Sun 27 December 2026**, Asia/Colombo time zone; two guests plus host.
3. Route: **Bandaranaike Airport → Sigiriya/Dambulla → Matale → Kandy → Nuwara Eliya → Ella → Unawatuna/Galle south coast → Bandaranaike Airport**.
4. Seetha Amman Kovil is near **Nuwara Eliya**, not the south coast. Put it on **25 December** (or optionally late 24 December).
5. Include **Ravana Falls, Ravana Cave**, and **Rumassala** prominently. Add optional sites only when route/time permits.
6. Every destination must have: overview, quick facts, what to look for, story/history, logistics, cultural etiquette where relevant, photo guidance, source links, and an optional **Host Notes** script.
7. Keep live or volatile travel facts (prices, hours, road closures, weather, visas, train schedules) **editable and explicitly marked for reconfirmation**.
8. Use **lawfully licensed images**, not hotlinked random web photos. Never invent attraction photographs or imply a myth is proven history.
9. Entire guest experience must remain usable without sign-in; host-only editing must have real access control if enabled.
10. Launch with real content, functioning buttons, tested mobile screens, accessible contrast, good image performance, and a graceful poor-connectivity experience.

## Read in this order

| File | Why it matters |
|---|---|
| `01_PRODUCT_REQUIREMENTS.md` | Scope, audience, exact features and priorities |
| `02_TOUR_ITINERARY.md` | Seven-day route, timing assumptions, contingency planning |
| `03_DESTINATION_CONTENT.md` | Prewritten, fact-checked starter content for attractions |
| `04_RAVANA_STORYTELLING.md` | Ravana/Ramayana narrative, myth-vs-history guardrails |
| `05_MOBILE_UI_UX.md` | Complete mobile navigation and screen specifications |
| `06_DESIGN_SYSTEM_COLORS.md` | Color schemes, typography, spacing, components and tokens |
| `07_TECH_ARCHITECTURE.md` | Recommended stack, app structure, performance, privacy |
| `08_CONTENT_SCHEMA.md` | Structured data definitions with realistic example records |
| `09_IMAGE_MEDIA_GUIDELINES.md` | Image shot list, licensing, optimization, alt text |
| `10_AGENT_MASTER_PROMPT.md` | Copy/paste build instructions for the coding AI |
| `11_IMPLEMENTATION_ROADMAP.md` | Build order and deliverable checkpoints |
| `12_TESTING_ACCEPTANCE.md` | QA matrix and ship/no-ship requirements |
| `13_SOURCES_AND_RESEARCH.md` | Official sources, links, factual caveats |
| `14_READY_TO_USE_COPY.md` | Guest-facing copy, stories, short guide scripts |
| `15_AGENT_SPECIALIST_PROMPTS.md` | Research, content, UI, engineering and QA sub-prompts |
| `16_DEPLOYMENT_AND_OPERATIONS.md` | Publishing, editing, backups and trip-week operations |

## Start here: copy this into your coding agent

> Read **every Markdown file** in this directory, beginning with `00_START_HERE.md`, then `10_AGENT_MASTER_PROMPT.md`. Treat them as the source of truth. Build the actual mobile-first website, with all specified pages, real itinerary data, Ravana-focused content and visual design. Use validated sources and licensed media. Do not invent prices, opening hours, hotels, train times, weather, route travel times or booking confirmations. If required details are missing, create editable `TBC` content and provide a host checklist. Run the listed tests before marking the build complete.

## Key decisions and unknowns

**Deliberate assumptions:** 2026 dates; two guests; private car/driver or host driving; English UI; Nuwara Eliya on 24th, Ella on 25th, south coast on 26th. These can be edited in site config.

**Must be provided by the host later:** flight arrival and departure times; nationalities/visa status; hotel bookings; vehicle/driver setup; guests' mobility preferences; food or accessibility needs; exact interests beyond Ravana; preferred photography/language; host contact information if they consent to publish it privately.

**Critical planning warning:** If guests arrive late on 21 December and sleep near the airport, **22 December is too full to guarantee a relaxed Sigiriya climb plus Dambulla visit** after the long drive. Display a conservative alternative, not a fictitious guarantee. For departure on 27 December, allow generous ground transfer time **plus the airport's published early-arrival guidance**.

## Definition of done

Guests can open the site on a phone and answer in under 10 seconds:
- What are we doing today?
- Where are we going next and how do I navigate there?
- Why is this place special, and how does it connect with Ravana (if applicable)?
- What should I bring or respect at this site?
- What's confirmed, what might change, and who can help?

---

**Evidence standard:** Where travel facts are included here, the linked sources are in `13_SOURCES_AND_RESEARCH.md`. Dates and travel windows are proposed plans, **not real-time reservations or traffic predictions**.
