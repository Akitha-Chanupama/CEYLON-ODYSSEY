# QA Matrix and Acceptance Criteria

## 1. Automated quality gate

The coding agent must run actual commands and include outcomes, not just check boxes:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
# plus configured Playwright/a11y/content-link checks
```

If commands differ, list the real equivalents. Report failures and fix them where possible.

## 2. Mobile viewport matrix

| Screen | 320×700 | 360×800 | 390×844 | 430×932 | 768×1024 | Desktop |
|---|---|---|---|---|---|---|
| Today | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Journey | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Place detail | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ravana Trail | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Essentials | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**These are required target tests, not claims that they have already passed.** Actual run results go into the final app's release report.

Check no overflow, no clipped temple names, no sticky nav covering buttons, no broken hero crops, no link text wrapping into an unusable state.

## 3. Critical functional tests

### UT-01: Correct local date
**Given:** simulated current time is 25 Dec 2026 in Asia/Colombo.  
**Expect:** home shows Day 5, `Friday, 25 December`, Seetha Eliya/Ella itinerary.

### UT-02: Timezone independence
**Given:** visitor device timezone is London or New York, but Sri Lankan local date is 26 Dec.  
**Expect:** app selects Sri Lankan Day 6.

### UT-03: Outside-trip behavior
**Given:** 23 Nov 2026 or 30 Dec 2026.  
**Expect:** before-trip preview or after-trip recap, not wrong "today".

### UT-04: Day 5 content
**Given:** open 25 Dec.  
**Expect:** Seetha Amman Kovil near Nuwara Eliya appears as a primary stop; Ella follows; Ravana Cave is conditional. No Seetha Amman in Day 6 Unawatuna section.

### UT-05: Day 6 content
**Given:** open 26 Dec.  
**Expect:** Ravana Falls, significant transfer and Rumassala/Unawatuna shown. Galle Fort clearly optional.

### UT-06: Deep linking
**Given:** user opens `/places/ravana-cave` directly.  
**Expect:** complete content, image fallback, source link, safety note, working back/navigation paths.

### UT-07: Missing prices
**Given:** an attraction's price is `null`.  
**Expect:** `Confirm current ticket information`; never `Free` or `0`.

### UT-08: Missing flight/hotel
**Given:** no booking data.  
**Expect:** `To confirm` display, no invented hotel or flight number, no nonsense departure countdown.

### UT-09: Directions
**Given:** tap `Open directions` from Seetha Amman or Ravana Falls.  
**Expect:** a valid map URL with correctly encoded real destination query and accessible link name.

### UT-10: Legends vs history
**Given:** read Sigiriya, Seetha Amman, Ravana Cave, Ravana Falls, Rumassala.  
**Expect:** documentary facts separated from `Tradition` claims; Sigiriya linked historically to Kassapa I; no "Ravana archaeological proof" content.

### UT-11: Optional stop editing
**Given:** host marks Hakgala skipped (in content or protected editor).  
**Expect:** it clearly reads as skipped/removed from active plan, not still the next guaranteed stop.

### UT-12: Private notes
**Given:** guest request for `/host` or private notes API.  
**Expect:** no host-only notes/private contact disclosure. If no real auth built, do not ship that interface.

## 4. Accessibility tests

- [ ] Pages have exactly one meaningful H1 and heading hierarchy is sensible.
- [ ] Focus order logical on mobile and desktop.
- [ ] Bottom tabs and cards are keyboard-operable and screen-reader-labeled.
- [ ] At 200% zoom, no content lost and navigation remains functional.
- [ ] Screen reader reads `Tradition` as text, not color alone.
- [ ] Text meets contrast AA: normal ≥4.5:1, large ≥3:1.
- [ ] Input fields ≥16px on mobile.
- [ ] Tap targets at least 44×44 px.
- [ ] Photo images have concise non-deceptive alt text.
- [ ] Source credits and licensing links reachable.
- [ ] Animations respect reduced motion.
- [ ] Error/notice messages convey meaning by icon/text, not only color.

## 5. Performance tests

- [ ] Simulated slow mobile network: important text loads even before photos.
- [ ] Responsive `srcset` and compressed WebP/AVIF where supported.
- [ ] No giant video or map JS loaded on every route.
- [ ] Hero has width/height/aspect ratio to avoid CLS.
- [ ] LCP/CLS/INP evaluated in Lighthouse or field-equivalent; failures reviewed.
- [ ] Images below fold lazy-load; no missing alt/credit.
- [ ] Repeat navigation does not show blank screens.

## 6. Offline/PWA tests (only if PWA claimed)

- [ ] Install / manifest valid.
- [ ] Previously loaded itinerary and essential place text available offline.
- [ ] External map button clearly requires connection and handles unavailability.
- [ ] Content updates when reconnecting; clear stale-data message if appropriate.
- [ ] No authentication secrets, private notes or phone numbers cached beyond authorization.
- [ ] On service-worker upgrades, content not accidentally stranded on outdated itinerary.

## 7. Content and editorial tests

- [ ] All dates exactly 21–27 December 2026, no accidental Dec 2025/2027 references.
- [ ] Weekdays correct: Monday arrival, Sunday departure.
- [ ] Place names and links consistent across Today, Journey and Explore.
- [ ] Seetha Amman in Nuwara Eliya segment, not down south.
- [ ] Rumassala optionality and access realistic after long drive.
- [ ] Tour story offers valuable context, not AI filler or copied web articles.
- [ ] No current admission fees or opening hours displayed without recent validation.
- [ ] No actual hotel, flight or contact invented.
- [ ] All image licenses and credits complete.
- [ ] Host has reviewed religious wording for respect and nuance.
- [ ] Bad weather alternatives written for cave and waterfall.

## 8. Release blockers

Do not release if any of these occurs:
- Critical nav CTA doesn't work.
- Misleading travel schedule with invalid day/place placement.
- Fake or unverified "confirmed" bookings, prices, hours or event timing.
- Unlicensed photography published.
- Private host data exposed publicly.
- Mobile navigation covers content.
- Serious contrast/keyboard access failure.
- Unsafe waterfall or cave advice.
- Production build fails.

## 9. Acceptance report template

```text
Build version: __________
Build date: __________
Project URL / preview: __________
Typecheck: PASS / FAIL
Lint: PASS / FAIL
Unit tests: PASS / FAIL (count)
E2E: PASS / FAIL (count)
Mobile 390px screenshot: attached / missing
Offline test: PASS / FAIL / Not implemented
Content integrity check: PASS / FAIL
Image license audit: PASS / FAIL
Outstanding TBC items: [list]
Critical blockers: [list]
Release decision: GO / NO-GO
```
