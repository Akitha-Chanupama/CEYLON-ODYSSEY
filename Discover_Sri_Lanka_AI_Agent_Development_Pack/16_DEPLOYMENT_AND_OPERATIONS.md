# Deployment, Content Editing & Trip-Week Operations

## 1. Deployment options

**Recommended simple route:** managed Next.js hosting with HTTPS and automatic Git deployment. If content is static and no host editor is needed, no database is necessary. Keep backups and control who can push code.

Optional: custom domain such as `our-sri-lanka-journey.example` (illustrative only; do not claim it exists). A standard platform URL is perfectly fine. Verify deployment and DNS before sharing.

## 2. Recommended setup

- Production environment separate from local development.
- Environment variables for genuine map/API integrations only if used.
- No credentials committed in the repository.
- Image license records committed with content files.
- Secure hosting, HTTPS and reasonable security headers.
- Optional password-protected site if this itinerary is private; **use actual authentication/access controls**, not a guessed password in frontend JS.
- If no auth, **avoid publishing guest names, flight references, phone numbers, room numbers or exact private meeting instructions** publicly.

## 3. Host editing model

### Version 1 — simplest safe flow

Host edits content in `src/content` (or a clearly documented JSON/MD directory), commits the change, hosting automatically redeploys. The site includes `Last updated` notice. This is preferable to a rushed unauthenticated CMS.

### Future version — lightweight protected dashboard

Only if needed, implement real user login with server-side authorization. Host can:
- Adjust date/day titles and ordered stops.
- Mark `primary`, `optional`, `skipped`, `confirmed`.
- Update hotel/vehicle/pickup info with privacy controls.
- Add source-verified fees, hours or access notes.
- Add image media with license/credit metadata.
- Preview before publishing; maintain edit history.

Guest mode remains read-only.

## 4. Pre-departure checklist

At least once in the period leading up to 21 December:
- [ ] Confirm actual arrival/departure flights and local times.
- [ ] Decide whether night of 21st is near airport or Sigiriya area.
- [ ] Confirm all hotels and driver/car logistics.
- [ ] Confirm whether guests are comfortable climbing Sigiriya and Ravana Cave; present alternatives with dignity.
- [ ] Confirm temple access policies for intended day, particularly 25 Dec.
- [ ] Reconfirm official ticketing via CCF, not blog screenshots.
- [ ] Check forecasts and advisory sources for the next planned area.
- [ ] Verify a safe approach/viewpoint at Ravana Falls and Rumassala.
- [ ] Upload only permissioned, licensed images.
- [ ] Check every published page on actual Android/iPhone-sized browsers.
- [ ] Save offline version of itinerary/content if claimed.
- [ ] Test network-offline behavior; test external links on mobile.
- [ ] Confirm guest privacy and whether personalized details may be published.
- [ ] Print/save a separate backup itinerary in case of phone outage.

## 5. Daily operational routine for the host

**Evening before:**
1. Check planned stops and whether the next day is travel heavy.
2. Confirm hotel/pickup details with driver and site access where practical.
3. Look for official weather advisories and any route disruption.
4. Mark optional stops honestly; publish updated order/notes.
5. Review 60-second host intro scripts for the next day's main places.

**Morning of:**
1. Verify next stop and transport setup.
2. Recheck weather, road status and any temple/attraction notice.
3. Keep schedule relaxed where needed and refresh site info.
4. Warn guests if the internet may be weak; point to saved itinerary.

**If delayed:**
1. Preserve confirmed essentials and safety.
2. Skip optional stop rather than rushing.
3. Update guest-readable itinerary, status and reason.
4. Avoid exact live ETAs unless backed by a real map/navigation provider.

## 6. Editorial change log template

```md
## YYYY-MM-DD HH:mm Asia/Colombo
- Edited by: [host/editor]
- Day / stop: [date and place]
- Change: [description]
- Why: [traffic / weather / guest preference / verified opening info]
- Source / confirmation: [URL or host confirmed]
- Guest-facing note: [short text]
```

## 7. Before sharing the guest URL

Test using a browser **not logged into the developer's accounts**. Verify no private `/host` data or draft flight information leaks into page source, static payloads or client-side JSON. Confirm all licensed photos display with attribution. Review metadata and social-share preview: no guest private information.

## 8. Domain & SEO preferences

This is a private trip, not a public travel directory. Prioritize user convenience over search ranking. If truly private, protect access and consider `noindex` as a *supplement* (not a substitute for access controls). Set page titles and social preview to generic journey content rather than identifiable trip details. If fully public, use clean semantic destination summaries and accurate meta descriptions.

## 9. Analytics and feedback

Anonymous aggregate page metrics optional only if privacy expectations are clear. No trip tracking, background location recording, camera uploads or third-party marketing trackers without informed permission. You do not need personal analytics to make this good.

## 10. Hosting and cost guardrails

Most v1 needs are static content and optimized images. Avoid paid API dependencies until their value is clear. If building a real map API, calculate map loads and configure appropriate usage limits. Ensure image storage/CDN terms are compatible with original licenses and credits.

## 11. Contingency plan for site outage

Keep a simple offline PDF or local text copy of the seven-day route and essential phone numbers **if the host chooses to make one separately**. The mobile site should fail gracefully. Do not make any safety-critical journey decision depend on a single web service.

## 12. Post-tour experience

After 27 December, the site can switch from `Today` into **"Our Journey"** recap mode showing all seven days and existing galleries. Do not upload personal guest pictures or private stories without consent. It can remain a beautiful keepsake without pretending active logistics are still current.
