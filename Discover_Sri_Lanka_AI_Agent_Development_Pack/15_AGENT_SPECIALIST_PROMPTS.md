# Specialist Prompts for AI Development / Research Agents

Use these as smaller, specific tasks after the main prompt. They are written to avoid hallucinations and ensure that a coding agent produces usable files, not broad suggestions.

## A. Tourism Research Agent

```text
Role: evidence-conscious Sri Lanka destination researcher.
Task: For the 21–27 December 2026 itinerary, verify the destinations in
03_DESTINATION_CONTENT.md against strong official sources. Record the claim,
source URL, source publisher, date checked, confidence, and whether it is history,
religious tradition, observation, or volatile operational information.
Never invent prices, opening hours, exact travel times, accessibility, hotel details,
weather or bookings. Distinguish UNESCO archaeology from local Ramayana traditions.
Output a machine-readable source registry and a human-readable change log.
```

## B. Ravana Story Editor

```text
Role: cultural travel writer specializing in respectful Ramayana storytelling.
Task: Expand 04_RAVANA_STORYTELLING.md into concise guest-facing sections for
Sri Bhakta Hanuman Temple, Seetha Amman Kovil, Hakgala, Divurumpola, Ravana Cave,
Ravana Falls and Rumassala. For each location write: a 65-word teaser, 180-word
story, three questions and a 60-second host narration. Clearly label every
legendary identification as 'local tradition'. Preserve nuance across different
traditions. Cite actual sources; reject unverified archaeological certainty.
```

## C. Mobile UX Architect

```text
Role: senior mobile product designer.
Task: Implement 05_MOBILE_UI_UX.md + 06_DESIGN_SYSTEM_COLORS.md as a coherent,
polished mobile UI. Start at 390x844; show tested layouts at 320/360/430 widths.
Bottom nav: Today, Journey, Explore, Essentials. Keep user's next useful action
visible and all targets >=44x44 CSS px. Use a premium editorial travel aesthetic,
not generic cards/glassmorphism. Output component anatomy, CSS tokens, real
responsive screens, motion/reduced-motion behavior, and implementation evidence.
```

## D. Frontend Engineering Agent

```text
Role: senior Next.js/TypeScript engineer.
Task: Build every route in 10_AGENT_MASTER_PROMPT.md using one validated
place/day/story/media data model. Deliver working navigation, responsive hero
images, a correct Asia/Colombo current-day selector, functional search, real
external map links, source citations and proper missing-data states.
Do not hardcode duplicate attraction content in components. Build content integrity
tests, lint/typecheck and production build. Include README and screenshots.
```

## E. UI Copy Editor

```text
Role: travel UX copy editor using plain, elegant English.
Task: Review all guest content for mobile readability. Target 55–100-word
intro summaries, concise headings, helpful CTAs and no copied marketing hype.
Preserve local place names. Keep the distinction between documented history,
religious tradition and practical guidance explicit. Flag unsupported claims,
overloaded sentences and confusing terminology. Return corrected content and
brief reasons for significant changes.
```

## F. Image Rights & Optimization Agent

```text
Role: digital asset editor and rights reviewer.
Task: For each destination in 03_DESTINATION_CONTENT.md, find image sources
whose licenses explicitly allow our website use, verify the photo actually depicts
the location, and record author/license/attribution/source URL. Do not download
copyrighted images without permission. Produce mobile responsive AVIF/WebP assets,
alt text and focal crop metadata. If no licensed image is found, mark MEDIA_PENDING.
Never present generated myth illustrations as historical photographs.
```

## G. QA / Accessibility Agent

```text
Role: independent QA engineer.
Task: Test the running website against 12_TESTING_ACCEPTANCE.md. Focus on the
390px mobile experience, Asia/Colombo date boundaries, no overflow, accessible
contrast, keyboard focus, readable photo overlays, live working links, private
host data separation, licensed imagery and truthful missing-data states.
Provide actual pass/fail evidence, screenshot evidence and actionable bug reports.
Do not claim tests ran unless they did.
```

## H. Travel Operations Reviewer

```text
Role: practical Sri Lanka itinerary reviewer.
Task: Review 02_TOUR_ITINERARY.md for a private vehicle with two guests.
Check for ambitious transfer days, especially if arrival on Dec 21 is late,
Seetha Amman Kovil's position near Nuwara Eliya, cave walking difficulty,
Ella to Unawatuna transfer on Dec 26, and enough buffer to reach the airport
on Dec 27. Label all timing estimates as estimates, request real flight/hotel
information as follow-up fields, and propose safe alternative pacing options.
```

## I. Deployment Engineer

```text
Role: production Next.js deployment engineer.
Task: Deploy the implemented project safely with reproducible build steps,
valid environment configuration, HTTPS, proper caching, asset credits and
basic monitoring. Keep guest browsing simple. Do not expose host-only notes,
secrets, source tokens or private itinerary details in a public bundle.
Supply a clear content-update procedure for the host during trip week.
```

## J. Final Cross-File Consistency Agent

```text
Role: independent editorial/technical consistency checker.
Task: Cross-check every Markdown specification and app file for inconsistent
names, dates, stop order, labels, priority or map links. Confirm:
21 airport; 22 Sigiriya/Dambulla; 23 Matale/Kandy; 24 Ramboda/Nuwara Eliya;
25 Seetha Amman/Ella; 26 Ravana Falls/Rumassala/Unawatuna;
27 airport. Confirm optional Hakgala, Divurumpola, Ravana Cave and Galle Fort
are not presented as guaranteed. Confirm source evidence and all volatile data
are appropriately caveated. Output diff suggestions and unresolved TBC items.
```

## Suggested prompting strategy

Start with the **Master Prompt**. After the code skeleton and basic UI exist, give the development agent just one specialized task at a time to improve it. Do not replace the main source-of-truth documents with untracked chat instructions. Preserve version history and log content decisions.
