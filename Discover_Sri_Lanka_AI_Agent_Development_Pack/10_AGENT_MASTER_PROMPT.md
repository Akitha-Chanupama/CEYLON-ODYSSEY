# MASTER PROMPT — Give This to the Coding AI Agent

Copy the block below, together with **all Markdown files** in this directory, into the coding AI's project context. This is an execution brief, not a brainstorming request.

---

## COPY FROM HERE

You are a senior full-stack engineer, experienced mobile UX designer, accessibility specialist, technical writer, and evidence-conscious Sri Lanka travel content editor working together to deliver one polished production-ready application.

### Product to build

Build a **complete, beautiful, mobile-first web application** named **"Discover Sri Lanka — Our Island Journey"** for **two international guests travelling 21–27 December 2026** with a local host. The site is a personalized day-by-day travel companion with real destination stories, practical travel details, image galleries, a guide-friendly **Ravana/Ramayana Trail**, external map directions, a seven-day itinerary, travel essentials, and optional protected host notes.

This project is not a template mockup. Build a working, data-driven website with functioning routes, visible real content, clean responsive design and tested interactions.

### Read and obey the specification package

Start with `00_START_HERE.md`. Then read `01_PRODUCT_REQUIREMENTS.md` through `16_DEPLOYMENT_AND_OPERATIONS.md`, prioritizing:
- `02_TOUR_ITINERARY.md` as the trip-route source of truth;
- `03_DESTINATION_CONTENT.md` for starter factual content;
- `04_RAVANA_STORYTELLING.md` for legend/history classifications;
- `05_MOBILE_UI_UX.md` and `06_DESIGN_SYSTEM_COLORS.md` for mobile visual experience;
- `07_TECH_ARCHITECTURE.md` and `08_CONTENT_SCHEMA.md` for engineering;
- `12_TESTING_ACCEPTANCE.md` for release criteria.

If another document conflicts, use this order: **verified official evidence + user-provided dates/route > itinerary spec > content schema > UI preferences**. Record any conflict in `ASSUMPTIONS_AND_TBC.md` and choose the least misleading guest-facing result.

### User-provided route

- 21 Dec: arrive at Bandaranaike International Airport, Katunayake.
- 22 Dec: Sigiriya and Dambulla area.
- 23 Dec: Kandy via Matale.
- 24/25 Dec: Nuwara Eliya and Ella.
- 26 Dec: Unawatuna and south coast.
- 27 Dec: departure via airport.

Guests have a special interest in **Ravana**, so include **Ravana Falls**, **Ravana Cave**, **Seetha Amman Kovil**, **Ramboda Hanuman Temple**, and **Rumassala** as priority thematic sites, with optional **Hakgala** and **Divurumpola** if time allows.

**Important itinerary correction:** Seetha Amman Kovil is near Nuwara Eliya, NOT Unawatuna. Prefer Nuwara Eliya overnight 24th; Seetha Amman on 25th en route toward Ella. Ravana Falls is placed on the Ella–Wellawaya southbound road on 26th. Rumassala is near Unawatuna. Late arrival on 21st may make completing both Sigiriya + Dambulla on 22nd too rushed; include an honest conditional schedule.

### Visual standards

- Mobile FIRST: target 360–430 px viewports, test at 320 too.
- Premium Sri Lankan travel editorial aesthetic: forest green, warm ivory, soft sage, restrained antique-gold accents, original high-quality spacing and typography.
- Cinematic, **authentic** licensed attraction photos. No photo hotlinking from arbitrary sites, and no generative fantasy images passed off as historical documentation.
- Prefer editorial display serif for large headings and exceptionally readable sans font for interfaces/body.
- Fixed four-tab bottom navigation: Today, Journey, Explore, Essentials.
- Hero photos with safe gradients, beautiful day cards, ordered timeline, storytelling sections, meaningful iconography.
- Use informative content rather than decorative filler. No fake map pin coordinates, fake live data or generic placeholder lorem ipsum.
- Responsive from 320 px to desktop; tap targets >=44 px, accessible contrast and focus, reduced-motion support.

### Page checklist (implement ALL)

1. **Today `/`** — trip progress, current local day in Sri Lanka, day's hero, next stop, route timeline, quick Ravana snippet where relevant, travel tips.
2. **Welcome `/welcome`** — warm concise orientation, hero, link to journey, optional guest name placeholder disabled unless provided.
3. **Journey `/journey`** — 7 days with dates, regions, and linked detailed day cards.
4. **Day `/day/[date]`** — hero, summary, ordered stops, optional status, packing notes, directions, unconfirmed items.
5. **Explore `/explore`** — searchable real places, categories, detail cards.
6. **Destination `/places/[slug]`** — genuine descriptions, images, history/tradition distinctions, practical details and source links.
7. **Ravana Trail `/ravana-trail`** — premium chapter flow with Ramayana context and verified/legend labels.
8. **Map `/map`** — either genuine provider-integrated map if configured, OR attractive destination list with working external map links. Never pretend a static photo is a live map.
9. **Essentials `/essentials`** — culture, temple etiquette, phrases, packing, safety, official service links, host contact if authorized.
10. **Saved `/saved`** — optional if implemented; if shown, bookmark state must actually work.
11. **Host guide `/host`** — if implemented, really authenticated/authorized and private; otherwise omit public route and expose no private guest/host data.
12. **Error/loading/offline/not-found states** — considered and tested.

### Content rules

- Include actual named destinations from `03_DESTINATION_CONTENT.md` and trip details from `02_TOUR_ITINERARY.md`.
- Start each place with a compelling 70–100-word visitor-friendly summary, deeper story, practical tips, and source links.
- Use labels `Tradition`, `History`, `What you can see` as appropriate.
- Preserve names accurately: Ravana/Rawana; Seetha/Sita; Nuwara Eliya; Matale; Unawatuna; Rumassala/Rumasala.
- NEVER present Ramayana traditions or contested King Ravana stories as archeologically proven fact.
- Keep exact fee, hours, ETA, hotel, flight, access and real-time weather as editable null/TBC until verified.
- Verify official ticketing against CCF, temple details against provincial or official sources, airport instructions against official airport, and visas against immigration. Do not hardcode speculative values.
- Do not build a false booking engine, chat assistant, push notification system or "live weather" UI without a functional integration.

### Engineering rules

- Use a stable, supported Next.js + TypeScript + Tailwind implementation with maintainable architecture; resolve current package versions yourself.
- Centralize all content in typed data files and validate content links with Zod/build scripts.
- Date awareness must use `Asia/Colombo` and a correct day-selection fallback outside the trip.
- Build working Google Maps/Apple Maps navigation links using validated places; a real map provider is optional.
- Use local licensed image files with responsive sizes, credits, alt text and optimized delivery.
- Add installable PWA/offline support only if genuinely tested, not simulated; important text should render without a live API.
- Protect any admin/host-only notes server-side and do not expose secrets/client-only access gates.
- Include semantic HTML, WCAG AA basics, keyboard access and mobile image/focus testing.
- Implement clear fallback UI for missing data; no broken empty button action.

### Deliverables (create these files in the real app repository)

- Fully implemented web app and all routes/components.
- Real itinerary content for 7 dates, destination data, and Ravana Trail.
- Credited, licensed imagery or explicit `MEDIA_PENDING` content manifest (no rights violations).
- `README.md` with start/build/test/deploy instructions.
- `.env.example` without any real credentials.
- `ASSUMPTIONS_AND_TBC.md` listing precisely what the host must fill in.
- `CONTENT_VERIFICATION.md` with every volatile item and official source URLs.
- `ASSET_LICENSES.md` listing original photographers, links and rights.
- Unit/e2e/a11y tests and a short test-results report.
- Preview screenshots at **390×844** and **1440×900**; include at least Today, Journey, Ravana Trail and a place page.
- A concise `RELEASE_CHECKLIST.md` with actual pass/fail outcomes, no false claims.

### Mandatory workflow

**Phase 1: Plan and model.** Read the documents. Briefly document the app's routes, reusable components, data entities and editorial dependencies. Record unknowns but do NOT stall for answers; ship labeled editable placeholders. Fix misleading itinerary assumptions.

**Phase 2: Build core.** Implement design tokens, layout, bottom navigation, date logic, data validation, Today/Journey/Explore, destination pages and Ravana Trail with real copy.

**Phase 3: Complete practical features.** Wire directions, source links, optional saved list, safe external linking and host data separation; add offline support only if reliable.

**Phase 4: Media.** Source/verify licensing; process optimized images; replace placeholders only with real media and metadata.

**Phase 5: QA.** Run type checking, lint, production build, content validation, links and responsive/a11y tests. Fix issues, not just report them.

**Phase 6: Final handover.** Explain what works, which content was checked, what remains TBC, how to update daily itinerary/guest details and how to deploy.

### Avoid these failure modes

- Screens with beautiful images but no useful words.
- Copy/pasted card layouts where every attraction has the same text.
- Fake real-time map, climate, opening hours, tickets, hotel and flight details.
- Broken links, placeholder buttons or nonworking icon controls.
- Guest-visible private host data or pseudosecurity via a secret URL.
- Image copyright violations.
- Cramming four significant sites into a travel-heavy day just to check boxes.
- Ravana myths asserted as historical certainty.
- Mobile navbar covering content or short pages having unusable scroll.

**Proceed to implementation now**. Do not return only a proposed plan, component list or sample mockup. Build the functioning project, report its validation results, and explicitly identify any external assets or service integrations the host must supply.

## COPY ENDS HERE

---

## How the human host should use this

1. Put the ZIP contents in the AI coding agent's workspace.
2. Paste the prompt above into the coding agent, instructing it to read all files.
3. Verify any licensed image acquisitions it proposes.
4. Add the actual flights, hotels and public/authorized contact information when known.
5. Review live site on at least two physical phones before distributing the link.

The agent may need authorization to access domains, install packages, or deploy; **do not invent approvals**.
