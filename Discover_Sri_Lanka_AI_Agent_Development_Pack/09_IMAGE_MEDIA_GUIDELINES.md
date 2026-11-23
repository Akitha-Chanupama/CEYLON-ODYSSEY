# Imagery, Media Sourcing & Photography Guidelines

## 1. Desired effect

The site should look like a **high-end Sri Lanka travel publication** with real destination imagery: atmospheric, authentic, professionally composed, natural colors, strong framing. Use green highlands, dramatic rock and waterfalls, temple detail, and warm coast imagery to build a journey from north to south.

**Do not replace actual place photographs with generic AI fantasy images** and never use AI imagery as documentary evidence of ancient events. Illustrative art can be used only if conspicuously labeled as an illustration.

## 2. Licensing policy — hard requirement

Do not download and republish arbitrary images from Google Images, travel blogs, Instagram, hotel websites or search-result thumbnails. Those can be copyrighted even if publicly visible.

**Allowed sourcing strategies:**
1. **The host's own photographs** — with rights to publish and consent from recognizable people.
2. **Wikimedia Commons** — inspect each file's license and attribution; some require share-alike and proper credit.
3. **Unsplash / Pexels** — read current applicable licensing terms; choose appropriately licensed photos and retain credits.
4. **Direct written permission** from a photographer/tourism authority.
5. **Paid stock** with an explicit website license.

Store `creator`, `license`, `sourceUrl`, `creditUrl`, `alt`, `width`, `height`, and `attributionText` with each asset. Public-domain and Creative Commons are not interchangeable; follow each actual license.

## 3. Shot list for each page

| Page | Hero image requirement | Secondary imagery |
|---|---|---|
| Welcome | Strong authentic Sri Lankan landscape panorama | collage of temple/highland/coast only if licensed |
| Day 21 | Airport arrival welcome visual / general Sri Lanka | no security-sensitive airport interior photos without permission |
| Day 22 | Real Sigiriya panorama, ideally side lighting | Sigiriya gardens, Dambulla cave details (if photography permitted) |
| Day 23 | Kandy city/lake or authentic temple exterior | Matale kovil architectural detail, Kandy views |
| Day 24 | Tea fields/mountain road in Ramboda | Hanuman temple exterior where permitted, waterfall viewpoint |
| Day 25 | Authentic Seetha Amman temple exterior or Ella landscape | religious architecture, Hakgala, Ella hills, cave trail if licensed |
| Day 26 | Ravana Falls or Rumassala/Unawatuna scenic photo | waterfall safe viewpoint, Rumassala hill, coastline |
| Day 27 | Soft coastal morning / travel farewell image | no flight stock photo falsely presented as the real flight |
| Ravana Trail | Authentic Ella/Ravana Falls hero with editorial text overlay | photos of actual listed pilgrimage/nature sites |

## 4. Specific image search queries for licensed-source discovery

These are **search concepts**, not licenses:

- `Sigiriya Rock Fortress Sri Lanka landscape UNESCO`
- `Rangiri Dambulla Cave Temple Sri Lanka interior photography permitted`
- `Sri Muthumari Amman Kovil Matale facade`
- `Temple of the Tooth Kandy exterior Sri Lanka`
- `Ramboda Sri Bhakta Hanuman Temple Sri Lanka`
- `Nuwara Eliya Sri Lanka tea plantations scenic`
- `Seetha Amman Kovil Seetha Eliya Sri Lanka temple`
- `Hakgala Botanical Gardens Nuwara Eliya Sri Lanka`
- `Divurumpola temple Sri Lanka`
- `Ravana Cave Ella Sri Lanka entrance`
- `Ravana Falls Ella Sri Lanka roadside viewpoint`
- `Nine Arch Bridge Ella Sri Lanka`
- `Rumassala hill Unawatuna Sri Lanka coast`
- `Unawatuna beach Sri Lanka sunset`
- `Galle Fort UNESCO Sri Lanka walls`

Verify each chosen image depicts the correct place and is licensed for your distribution. Avoid common mix-ups between Ravana Cave and Ravana Falls.

## 5. Composition and image design

- Hero crops mobile-first (portrait ratio 4:5, occasionally 5:4); include enough space for readable text.
- Prefer one excellent hero photo over collage noise.
- Local destination photos should have visible landscape identity, not generic stock "woman on a tropical beach".
- Avoid over-saturation, fake dramatic skies, and impossible composites.
- Reuse a photo sparingly; the same image should not appear as every stop card.
- Where temple photography is restricted, use an approved exterior image or text-led card.

## 6. Optimization targets

| Usage | Suggested source rendition | Delivery guideline |
|---|---|---|
| Mobile hero | 800–1200px wide (responsive), up to ~1200–1600px height | AVIF/WebP; optimize to keep reasonable under a few hundred KB when visually acceptable |
| Destination card | 480–720px wide | AVIF/WebP, lazy loaded |
| Gallery | 960–1440px wide | Serve responsive variants, lazy-load offscreen |
| Small thumbnail | 180–360px | Compress and cache |

These are practical targets, not reasons to sacrifice image quality. Use image pipeline compression, modern formats and content negotiation where supported; keep originals backed up separately.

Use image aspect-ratio containers to prevent layout shift. Pin the day's LCP hero and preconnect only to allowed image hosts.

## 7. Alt-text guidance

Good examples:
- `Sigiriya rock rising above green gardens on a clear morning`
- `Exterior shrine buildings at Seetha Amman Kovil near Nuwara Eliya`
- `White water cascading across the rocks at Ravana Falls near Ella`
- `Green hillside overlooking the coast near Rumassala and Unawatuna`

Bad examples:
- `Image 1`, `Beautiful photo`, `Ravana's actual palace` (unsupported claim), and keyword-stuffed SEO text.

Decorative images may use empty alt text only when adjacent text supplies the same meaning. Photo lightboxes must preserve alt and credits.

## 8. Credit and attribution

For each image: visible, unobtrusive link `Photo: Creator · Source · License` beneath photo or within gallery information. Do not hide license obligations in code comments. Confirm whether the license requires modifications to be disclosed.

## 9. Image manifest example

```ts
const media = {
  "sigiriya-hero": {
    src: "/images/places/sigiriya-hero.webp",
    alt: "Sigiriya rock and surrounding landscaped gardens in Sri Lanka",
    width: 1200,
    height: 1500,
    creator: "REPLACE WITH ACTUAL CREATOR",
    license: "REPLACE WITH ACTUAL LICENSE",
    creditUrl: "REPLACE WITH VERIFIED SOURCE URL"
  }
};
```

**Do not ship the `REPLACE` values** as actual licensing. Build pipeline should flag missing required credits for external photos. If licensed photos are not yet available, use clearly labeled neutral placeholders and mark the site media-incomplete.

## 10. Optional illustration policy

Decorative maps, hand-drawn compass line, botanical pattern and non-documentary chapter art can be original illustrations. If representing a historic or epic scene, add a clear caption `Artist's illustration of a traditional story` and avoid suggesting it is an authentic historic photograph.
