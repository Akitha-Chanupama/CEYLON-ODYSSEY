# Design System & Color Schemes

## 1. Visual direction

**Brand concept:** *Emerald Heritage* — a contemporary Sri Lankan travel journal, inspired by forest canopies, tea gardens, aged parchment, warm sunshine, and the Indian Ocean.

**Primary scheme:** warm light. **Optional secondary scheme:** deep forest night mode. Use the primary for v1; do not sacrifice readability for ornamental color.

## 2. Primary palette — Emerald Heritage

| Token | HEX | Role |
|---|---|---|
| `--color-ink` | `#142B26` | Primary text on light surfaces |
| `--color-forest` | `#145143` | Primary CTA, active nav, section headings |
| `--color-forest-deep` | `#0B332C` | Dark hero overlay and special story panels |
| `--color-ivory` | `#FAF9F4` | Page background |
| `--color-white` | `#FFFFFF` | Elevated cards |
| `--color-sage` | `#E3ECE5` | Gentle highlight surfaces |
| `--color-mist` | `#F0F3EE` | Secondary panels |
| `--color-muted` | `#4C625A` | Secondary text |
| `--color-line` | `#D8E2DA` | Dividers, borders |
| `--color-antique-gold` | `#C0914E` | Decorative accent ONLY (not small text on ivory) |
| `--color-ocean` | `#235D6C` | Navigation/map secondary actions |
| `--color-clay` | `#9B533C` | Warm editorial accent |
| `--color-warning-bg` | `#FFF1D5` | Timings/road warnings |
| `--color-warning-text` | `#6D4813` | Warning text |
| `--color-error` | `#9C332D` | Error state |
| `--color-success` | `#216A51` | Success, confirmed-only |

**Accessibility note:** Verify all final text/background pairings using WCAG contrast tooling. Never use antique gold for body text on ivory; for a gold look, use decorative lines and large imagery instead.

## 3. Dark alternative — Forest After Dusk

| Token | HEX | Role |
|---|---|---|
| `--night-bg` | `#091E1A` | Page background |
| `--night-surface` | `#12352D` | Card surface |
| `--night-elevated` | `#1A4438` | Elevated panels |
| `--night-text` | `#F2F5EE` | Primary text |
| `--night-muted` | `#C7D8CE` | Secondary text |
| `--night-action` | `#E8BC72` | CTA background on dark |
| `--night-action-ink` | `#142B26` | CTA text |
| `--night-divider` | `#31574A` | Border |

Dark mode is optional; when implemented, test every chart, badge and image overlay separately. Do not map the light palette to dark mode automatically without contrast checks.

## 4. CSS variables (starter)

```css
:root {
  color-scheme: light;
  --background: #FAF9F4;
  --surface: #FFFFFF;
  --surface-soft: #F0F3EE;
  --foreground: #142B26;
  --muted-foreground: #4C625A;
  --primary: #145143;
  --primary-foreground: #FFFFFF;
  --secondary: #E3ECE5;
  --secondary-foreground: #142B26;
  --accent: #C0914E;
  --ocean: #235D6C;
  --border: #D8E2DA;
  --radius-card: 20px;
  --radius-pill: 999px;
  --shadow-card: 0 8px 28px rgba(12, 36, 27, 0.075);
}

@media (prefers-color-scheme: dark) {
  :root[data-theme='system'] {
    color-scheme: dark;
    --background: #091E1A;
    --surface: #12352D;
    --surface-soft: #1A4438;
    --foreground: #F2F5EE;
    --muted-foreground: #C7D8CE;
    --primary: #E8BC72;
    --primary-foreground: #142B26;
    --secondary: #1A4438;
    --secondary-foreground: #F2F5EE;
    --border: #31574A;
  }
}
```

Implement with design tokens in Tailwind or plain CSS. A host-selected manual theme should override system preference cleanly; if only shipping light mode, omit nonfunctional dark toggles.

## 5. Typography

Recommended licensed/free fonts:
- **Display serif:** `DM Serif Display` or `Cormorant Garamond`, for large editorial headings only.
- **Body sans:** `Inter` or `Manrope`, for mobile readability and interface text.
- Use appropriate Sinhala font only if Sinhala translations are actually shipped and linguistically reviewed; ensure Unicode line-height is generous.

| Role | Mobile size | Leading / notes |
|---|---|---|
| Display hero | 36–42px | 1.04–1.12, weight appropriate to font |
| H1 | 30–34px | 1.12–1.18 |
| H2 | 24–28px | 1.2 |
| H3 | 19–22px | 1.3 |
| Body | **16–17px** | **1.55–1.7**, max 68–72 characters per line |
| Secondary text | 14–15px | 1.5 |
| Small metadata | 12–13px | 1.35, avoid overuse |
| Button label | 15–16px | Medium/semibold |

Implement responsive typography with `clamp`, not a large number of breakpoints. Avoid long all-caps headings.

## 6. Spacing scale

Base **4px** spacing unit. Use `4, 8, 12, 16, 20, 24, 32, 40, 48, 64` px. Default mobile page gutter **18px**, desktop **32px**. Card gap **12–16px**; section gap **32–40px**.

Touch targets at least **44px high**; primary CTAs **48–52px**. Chips have 36–40px visual height but need sufficiently large interaction targets.

## 7. Components and tokens

| Component | Visual spec |
|---|---|
| Primary button | Forest fill, ivory/white text, 14–16px radius or pill; high contrast |
| Secondary button | Pale sage background, forest text, visible border |
| Card | White, 16–20px radius, soft shadow, optional 1px border |
| Photo card | Cropped real landscape, protected text overlay, 16–20px corners |
| Badge | Mostly muted neutrals; `Tradition` distinct but subdued; no badge rainbow |
| Date chip | Small rounded neutral surface, active forest fill |
| Bottom tab | White/ivory surface, forest active indicator, explicit active text label |
| Story panel | Dark forest background, warm ivory text, gold decorative line |
| Notice panel | Warm neutral warning background, dark brown text; icon and label |
| Divider | Sage-gray thin line, generous section breathing room |
| Photo gallery | Consistent crop/margins, no forced stretched images |

## 8. Distinct destination treatments

- **Heritage / Sigiriya:** ivory + deep green + warm natural stone photographs.
- **Sacred / Seetha Amman:** warm muted gold detail and balanced architectural photography, no artificial devotional imagery.
- **Ravana Trail / Cave/Falls:** deep forest/teal + a thin gold thread + dramatic real place photography.
- **Highlands:** misty sage, white content cards, tea-green imagery.
- **South coast:** ocean accent in map/tags; overall app remains brand-consistent.

Do not change the entire color system per destination: use photo, accent and section title to differentiate rather than making separate unrelated mini-sites.

## 9. Image overlays

Hero: background gradient from `rgba(5,19,16,.04)` at top to `rgba(5,19,16,.80)` at bottom **behind white text**. Verify contrast on each image; some require stronger overlay or separate solid text panel. Never bury source credit in a low-contrast corner.

## 10. Iconography, illustration, motion

Use one outline icon family (e.g., Lucide) consistently; 20–24px interface icons. Avoid piles of tourist icons and stock illustration collages. Decorative motifs may subtly reference a route line/compass/tea-leaf shape without claiming historical symbolism.

Motion: 150–220ms tactile states; photo crossfade 180–250ms; no excessive page parallax. Honor reduced-motion preference.

## 11. Sample mobile component anatomy

**Stop card:** 96×96 responsive thumbnail → optional `Ravana Trail` mini label → `Seetha Amman Kovil` title (max 2 lines) → one-line descriptor → small `Directions` link. Entire card should have an accessible main link; the directions button is a separate button/link outside it to avoid nested interactive controls.

**Guide-note panel:** protected route, simple 60-second script with `Read`, `Copy`, `Sources`. Never expose raw host notes in public HTML or static build JSON if intended to be private.

## 12. Contrast validation checklist

1. Body, muted and metadata text must meet WCAG AA normal-text contrast (at least 4.5:1).
2. Large heading text at least 3:1; icons and nontext boundaries at least 3:1 where required.
3. Focus indicator visible on all surfaces.
4. Photo overlay copy manually verified with actual photos.
5. 200% browser text zoom remains fully usable.
