---
name: "theheart-frontend"
description: "Build on-brand frontends and UI for The Heart. Use whenever generating React/Tailwind components, pages, or visual artifacts for The Heart products. Loads brand tokens, the canonical component library, and copy/colour/typography rules from the theheart-design-system repo so the output is always on-brand without guessing."
---

# The Heart — Frontend Companion

You are building UI for **The Heart**. The brand is opinionated; every
output must match its tokens, components, and rules verbatim.

The source of truth is a published design system. Treat it as a hard
contract — never invent colour, font, spacing, or pattern values.

---

## Source of truth

Two repos, two roles:

| Repo | Role |
|---|---|
| **theheart-design-system** — https://github.com/wojtekczuba/theheart-design-system | The canonical React + Tailwind design system. `tokens.json`, `tailwind.preset.cjs`, `src/tokens/tokens.css`, `src/components/`, `src/patterns/`, `src/icons/`, `src/logos/`, `src/assets/`. Pull from here. |
| **The-Heart-Vibe/claude-code-marketplace** (`plugins/pptx-generator`) | Source plugin that *generates* the design system. Edit `brand.yaml` and widgets here, then re-export. |

The instructional brand toolkit (Pitch Deck Toolkit) is the
human-readable spec. It is distributed as a **PDF** (the original
`.pptx` exceeds Claude Design's 20 MB upload limit, so it is flattened
to PDF — same content, same page order, page N in the PDF = slide N
in the deck). Page 11 carries the canonical guideline (Wytyczne).
If code is ambiguous, defer to the PDF's intent.

---

## Setup — bring the design system into the project

Three integration modes, pick the one that fits.

### A) As an npm dependency (preferred for new projects)

```bash
npm install github:wojtekczuba/theheart-design-system
```

Then in `tailwind.config.cjs`:

```js
module.exports = {
  presets: [require("@the-heart-vibe/design-system/tailwind.preset.cjs")],
  content: ["./src/**/*.{ts,tsx}"],
};
```

In `src/main.tsx`:

```ts
import "@the-heart-vibe/design-system/src/tokens/tokens.css";
```

### B) Copy-paste tokens + a single component

If the consumer can't add a dependency, copy:
1. `src/tokens/tokens.css` → into the project's global CSS
2. `tailwind.preset.cjs` → into the project's Tailwind config
3. The specific components you need from `src/components/` /
   `src/patterns/` — they have no implicit dependencies beyond Tailwind
   + Lucide-style SVGs.

### C) For Claude Design / Figma generation

Point the design tool at the design-system repo URL. Paste the
"Other notes" prompt from `prompts/claude-design-other-notes.md` in
the design-system repo, and attach the brand toolkit PDF in the
project's assets (the original `.pptx` is too large to upload — use
the PDF export, page numbering matches the deck 1:1).

---

## Hard brand rules — break these and the output is wrong

### Colour palette

| Token | Hex | Role |
|---|---|---|
| `--th-color-primary` | `#E61B25` | Main brand red. Dominant accent. Headlines, primary CTAs, key bars, status pills. |
| `--th-color-black` | `#000000` | Primary text + dominant heavy accents. |
| `--th-color-green` | `#13A538` | Positive / done state. |
| `--th-color-blue` | `#0056A4` | **"Accent if needed" — use sparingly.** Never the status colour for "in progress". |
| `--th-color-red-light` | `#E9787E` | Soft accent / "at risk" state. |
| `--th-color-gray-1` | `#969696` | Secondary text, captions. |
| `--th-color-gray-2` | `#E6E6E6` | Borders, dividers. |
| `--th-color-gray-3` | `#F0F0F0` | Subtle surfaces. |

### Status palette (fixed and intentional)

```
done / on_track     → green   (#13A538)
in_progress / active → BLACK   (#000000)   ← NEVER blue
at_risk / warning   → red_light (#E9787E)
blocked / off_track → red     (#E61B25)
planned / tbd       → gray    (#969696)
```

The "in progress" pill is **black** on purpose. Blue is reserved as an
opt-in accent (e.g. SWOT "Opportunities" quadrant) — using blue for an
in-progress badge breaks the guideline.

### Typography

- **Raleway** (regular / SemiBold / Light). Arial is the documented
  fallback only — never the default choice.
- Size hierarchy lives in `--th-text-*`: `title 36 · h1 28 · h2 20 ·
  section 12 · body 14 · supporting 12 · caption 10`.
- Min font size is **10pt**. Steps between hierarchy levels are
  **≥ 2pt**, prefer even sizes.
- Captions / 10pt are reserved for *reporting* slides — don't use them
  for normal UI body.
- Use Tailwind utilities: `text-th-h1`, `font-heading`, `font-body`,
  `font-light`. Never hardcode `text-2xl` or `text-[28px]`.

### Punctuation in copy

- Em-dash `—` is **banned**. Use a period or comma.
- En-dash `–` is allowed **only** in numeric ranges (`2–4 weeks`).
- Ellipsis `…` is banned.
- No tricolons ("Fast. Simple. Reliable.").
- No rhetorical questions in headlines.

---

## Component library — what to use, when

### Atomic widgets (`src/components/`)

| Component | Use for |
|---|---|
| `KPITile` | Single metric with optional trend arrow and status colour. |
| `PersonCard` | Team member: name + role + 1-sentence bio. |
| `BigStat` | One huge number with caption — for hero / cover moments. |
| `StatusPill` | Status badge (`done`/`in_progress`/`at_risk`/`blocked`/`planned`). |
| `Badge` | Generic filled pill — `primary`/`black`/`gray`/`outline`. |
| `BulletList` | 4 variants from guideline: `filled-circle`, `filled-square`, `numbered`, `plain`. Nested children render with the secondary marker automatically. |
| `Arrow` | Solid / dotted arrow in any direction. Black by default. |
| `Symbol` | Standalone glyphs: `check` (green), `cross` (red), `dot` (amber). |
| `TimelineEvent` | Dot + date + label, optionally coloured by status. |
| `ComparisonRow` | Row in a competitor matrix: label + booleans/strings per column. |
| `Divider` | Thin horizontal line. |
| `SectionLabel` | Small uppercase red eyebrow for section headers. |
| `BrandFooter` | "The Heart. All rights reserved." + page number. Wired into `SlideShell`. |
| `DecorativeCorner` | Branded polygon triangle network for slide corners. Default `variant="image"` uses `trojkaty.png`; `variant="svg"` for inline SVG fallback. Supports all 4 corner positions. |

### Slide patterns (`src/patterns/`)

Wrap content. Most use `SlideShell` automatically — don't duplicate
chrome inside the body.

| Pattern | Use for |
|---|---|
| `SlideShell` | Standard chrome: vertical red bar left, eyebrow, decorative corner, footer + page number. |
| `Cover` | First slide. Signature red triangle bottom-right. |
| `SectionDivider` | Transition slide between major sections. Full-bleed office photo with dark overlay, white headline, optional red accent word, footer. |
| `Problem3Col` | Problem framed as 3 stats with supporting text. |
| `OKRBoard` | Single objective + up to 3 KRs with current/target + status pill. |
| `SWOTGrid` | 4-quadrant SWOT analysis. |
| `Roadmap` | Horizontal timeline of milestones. |
| `CompetitiveMatrix` | Feature × competitor table. Own column highlighted red. |
| `BigQuote` | Full-screen quote on red background. |
| `BeforeAfter` | A → B comparison with arrow between. |
| `ValueProp` | Per-segment value proposition (pain / gain). |
| `CustomerJourney` | Numbered steps connected by a horizontal line. |
| `WeeklyStatus` | RAG status by workstream. |

### Logos (`src/logos/`)

```tsx
<Logo variant="horizontal" height={32} />
<Logo variant="vertical"   theme="white" height={96} />
<Logo variant="icon"       theme="black" height={64} />
```

- **3 variants**: `horizontal` (2.86:1), `vertical` (1.24:1), `icon` (0.66:1).
  Ratios extracted from real PNGs — pass **one** of `width`/`height`,
  never both.
- **3 themes**: `color` (default brand red) / `white` (for dark
  surfaces) / `black` (monochrome for photo overlays).

### Icons (`src/icons/`)

```tsx
<Icon name="building-2" size={36} />
<Icon name="bank" />              {/* alias resolves to building-2 */}
<Icon name="shield" color="var(--th-color-black)" />
```

41 Lucide icons bundled. Defaults to brand red. `name` accepts canonical
names or any alias from `icon-manifest.json`.

---

## Office photos — context-based selection

The design system ships 15 branded office photos in `src/assets/office/`.
A TypeScript catalog (`src/assets/office-catalog.ts`) tags each photo with
semantic contexts, mood, and prominence so the right image is picked automatically.

### Setup — copy photos into the repo

Run once from the repo root (requires `~/The Heart zm/` on the local machine):

```bash
bash scripts/copy-office-photos.sh
git add src/assets/office && git commit -m "feat: add office photo assets"
```

### PhotoContext values

| Context | Use when the section introduces... |
|---|---|
| `"brand-identity"` | Company overview, about us, corporate identity |
| `"collaboration"` | Team, partnerships, how we work together |
| `"culture"` | Values, team spirit, company DNA |
| `"focus"` | Deep work, technology, research, innovation |
| `"social"` | Community, events, casual moments |
| `"dramatic"` | Investment memo dividers, high-stakes announcements |
| `"energy"` | Vision, ambition, call to action, mission |
| `"fun"` | Perks, benefits, creative sections |
| `"workspace"` | Operations, office environment, everyday work |

### Using SectionDivider

```tsx
// Context-aware — picks the best hero photo automatically
<SectionDivider
  context="dramatic"
  eyebrow="INVESTMENT MEMO · MAY 2026 · CONFIDENTIAL"
  title="Building Poland's leading"
  titleAccent="deep tech"
  titleSuffix="investment platform"
  subtitle="Poland's first listed deep tech venture builder and VC platform."
/>

// Rotate photos within the same context (consecutive dividers)
<SectionDivider context="culture" photoIndex={0} title="Our team" titleAccent="makes the difference" />
<SectionDivider context="culture" photoIndex={1} title="Our values" titleAccent="drive everything" />

// Fully explicit — absolute path or public URL
<SectionDivider photo="/assets/office/lounge-night-city.jpg" title="Section title" />
```

### Photo selection logic

`selectPhoto(context, index, preferHero)` in `office-catalog.ts`:
1. Filter `OFFICE_PHOTOS` to those whose `contexts` includes the key.
2. If `preferHero = true` (default), narrow to `prominence === "hero"`.
3. Use `index % candidates.length` to cycle through variety.
4. Falls back to all photos if no match.

### Hero photos at a glance

| Photo | Context(s) | Character |
|---|---|---|
| `reception-desk.jpg` | brand-identity | Strong brand mark, city view, daylight |
| `do-something-great.jpg` | energy | High-contrast neon, motivational |
| `heartcore-team-lounge.jpg` | culture, energy | Neon sign, depth, cinematic |
| `lounge-neon-city.jpg` | brand-identity, dramatic | The Heart neon + Warsaw panorama |
| `lounge-night-city.jpg` | dramatic | Night cityscape, maximum atmosphere |

---

## Decorative triangle artwork

The Heart uses a branded polygon triangle network (`trojkaty.png`) as background decoration.
It mirrors the geometric mesh of the logo: scattered low-opacity triangles with thin grey lines.

**Asset:** `src/assets/trojkaty.png`
**Raw URL (for Claude Design / no-install contexts):**
`https://raw.githubusercontent.com/wojtekczuba/theheart-design-system/main/src/assets/trojkaty.png`

### Rule 1 — use selectively, not on every slide

The artwork is atmosphere, not wallpaper. A deck where every slide has triangles in the same corner
looks mechanical. Vary position and skip it on dense slides.

### Rule 2 — pick position based on slide layout

Read the slide's visual weight before choosing a corner. The artwork should occupy empty space,
never compete with primary content.

| Slide layout / content weight | Recommended position | Reasoning |
|---|---|---|
| Headline top-left, content below (most text slides) | `top-right` | Top-right is empty; artwork doesn't fight the headline |
| Full-width headline, stats/columns centred | `bottom-right` | Bottom-right softens the footer zone |
| Portrait photo or logo on the right | `top-left` or `bottom-left` | Balances the heavy right side |
| Cover slide (logo top-left, tagline bottom-left) | `bottom-right` | Opposite corner from logo, creates diagonal tension |
| Two-column layout (text left, visual right) | `top-right` or omit | Only if right column has breathing room at top |
| Timeline or roadmap (horizontal, full-width) | `top-right` | Timeline sits mid/bottom; top-right is clear |
| Quote or statement (centred text, minimal) | `bottom-left` | Grounds the composition without crowding the text |
| Dense table / matrix / data-heavy | omit (`decorations={false}`) | Clutter kills readability |
| BigQuote (red background) | omit | Red-on-red is invisible and adds nothing |
| SectionDivider (full-bleed photo) | optional `bottom-right`, opacity 0.12 | Very subtle only; photo is the hero |

### Rule 3 — vary across the deck

In a multi-slide sequence, rotate positions so the artwork feels alive, not stamped:
- Slides 1–3: `top-right`
- Slide 4 (section divider): omit or `bottom-right` at low opacity
- Slides 5–7: `top-right` or `bottom-left` depending on layout
- Never use the same position on four consecutive slides

### Usage

```tsx
// SlideShell: position, opacity, and size are all controllable
<SlideShell
  decorations
  decorationPosition="top-right"   // "top-right" | "top-left" | "bottom-right" | "bottom-left"
  decorationOpacity={0.35}         // 0.12 (subtle) to 0.40 (present)
  decorationSize={260}             // px; 220–320 typical
>
  ...
</SlideShell>

// Turn off for dense data slides
<SlideShell decorations={false}>...</SlideShell>

// Direct component — for patterns that don't wrap SlideShell
<DecorativeCorner position="bottom-left" size={320} opacity={0.20} />

// SVG fallback (no image fetch)
<DecorativeCorner variant="svg" position="top-right" />
```

### For Claude Design (inline without npm)

Reference the PNG directly by CDN URL — no package install needed.
Apply the CSS transform so the cluster anchors to the chosen corner:

```html
<!-- top-right (most common content slides) -->
<img
  src="https://raw.githubusercontent.com/wojtekczuba/theheart-design-system/main/src/assets/trojkaty.png"
  style="position:absolute;top:0;right:0;width:270px;height:270px;opacity:0.35;
         transform:scale(-1,-1);transform-origin:center;pointer-events:none;"
  aria-hidden alt=""
/>

<!-- bottom-right -->
<img
  src="https://raw.githubusercontent.com/wojtekczuba/theheart-design-system/main/src/assets/trojkaty.png"
  style="position:absolute;bottom:0;right:0;width:270px;height:270px;opacity:0.25;
         transform:scaleX(-1);transform-origin:center;pointer-events:none;"
  aria-hidden alt=""
/>

<!-- bottom-left (cover, quote) -->
<img
  src="https://raw.githubusercontent.com/wojtekczuba/theheart-design-system/main/src/assets/trojkaty.png"
  style="position:absolute;bottom:0;left:0;width:340px;height:340px;opacity:0.18;
         pointer-events:none;"
  aria-hidden alt=""
/>

<!-- top-left -->
<img
  src="https://raw.githubusercontent.com/wojtekczuba/theheart-design-system/main/src/assets/trojkaty.png"
  style="position:absolute;top:0;left:0;width:270px;height:270px;opacity:0.30;
         transform:scaleY(-1);transform-origin:center;pointer-events:none;"
  aria-hidden alt=""
/>
```

### Transform reference

The PNG's triangle cluster sits in the **bottom-left** of the canvas.
Flip axes to anchor it to each corner:

| Corner | CSS transform |
|---|---|
| `top-right` | `scale(-1,-1)` |
| `top-left` | `scaleY(-1)` |
| `bottom-right` | `scaleX(-1)` |
| `bottom-left` | none |

---

## Content density limits

Every slide communicates **one idea**. Overloaded slides force the presenter to read aloud.
These are hard maximums — if content does not fit, split into two slides.

| Slide / Pattern | Maximum content |
|---|---|
| `Cover` | 1 headline + 1 subtitle + optional tagline (≤ 12 words each) |
| `SectionDivider` | 1 headline + optional accent word + 1 subtitle (≤ 15 words) |
| `BigQuote` | 1 quote + 1 attribution — nothing else |
| `Problem3Col` | 3 columns; each: 1 stat + 1 label + 2–3 lines of supporting text |
| `OKRBoard` | 1 objective + 3 key results max |
| `SWOTGrid` | 4 quadrants; 3–5 bullets per quadrant |
| `Roadmap` | 5–7 milestones; label ≤ 5 words each |
| `CompetitiveMatrix` | 4 competitors × 8 features max |
| `CustomerJourney` | 5–7 steps; label ≤ 6 words each |
| `WeeklyStatus` | 6 workstreams max |
| `BeforeAfter` | 1 state each side; 2–3 bullets or 1 visual |
| `ValueProp` | 2 segments; each: 1 pain + 1 gain + 2–3 bullets |
| Generic content (`SlideShell`) | 1 heading + **4–6 bullets** OR 2 short paragraphs OR ≤ 6 `KPITile` |
| People grid (`PersonCard`) | 4 cards per slide max |
| Stats hero (`BigStat`) | 1–3 stats per slide |

### Copy rules

- **Headlines**: ≤ 10 words. Active voice. No question marks.
- **Bullets**: ≤ 10 words per bullet. Start with a noun or verb. No full sentences ending in a period.
- **Subtitles / supporting text**: ≤ 20 words. One idea only.
- **Labels** (pill, badge, eyebrow): ≤ 3 words.
- **Numbers**: always include units (%, PLN, ×, k, M); use space as thousands separator (`1 200`, not `1200`).

### Split triggers — create a second slide when

- More than 6 bullets are needed to cover the topic
- Two distinct ideas could each stand alone as a message
- A table and a visual appear on the same slide
- The presenter would need to reference the same slide for more than 90 seconds

---

## Decision tree — which pattern fits the brief?

| Brief | Pattern |
|---|---|
| First slide, title + tagline | `Cover` |
| Transition between major deck sections | `SectionDivider` |
| State a single bold claim | `BigQuote` |
| Three stats / 3 root causes | `Problem3Col` |
| Quarterly OKR review | `OKRBoard` |
| SWOT analysis | `SWOTGrid` |
| Show a timeline of milestones | `Roadmap` |
| Compare us vs N competitors | `CompetitiveMatrix` |
| Show how a user flows through the product | `CustomerJourney` |
| Per-segment value prop | `ValueProp` |
| Project status per workstream (RAG) | `WeeklyStatus` |
| Before / after change | `BeforeAfter` |

For non-slide UI (dashboards, forms, settings): compose from atomic
widgets. `KPITile` grids and `StatusPill` rows cover most cases.

---

## Showcase as living spec

`src/examples/Showcase.tsx` in the design-system repo is the canonical
visual reference. It contains:

1. A **Wytyczne** section replicating slide 11 of the brand toolkit
   (Fonts / Icons / Bullets / Arrows / Symbols + Main vs Accent palette).
2. A **Logotypes** section: 3 variants × 3 themes = 9 lock-ups.
3. A full catalogue of every widget and every slide pattern with
   realistic data.

When in doubt, mirror what Showcase does for a similar shape.

---

## What to do when the brief asks for something not in the system

1. **First, compose.** Almost everything reduces to atomic widgets + a
   `SlideShell` or plain Tailwind container.
2. **Reach for free tokens, never raw colours.** Even when extending,
   use `var(--th-color-*)` / `bg-th-*` so the result tracks future
   brand updates.
3. **Don't introduce new fonts, new accent colours, or new bullet
   styles.** Those are guideline-level decisions — flag the gap to the
   user rather than improvising.
4. **If you need a new pattern**, propose it as an addition to the
   plugin (`layouts/generic/*.py` and `design_system/patterns.py`).

---

## Quick checks before declaring a UI done

- [ ] Every colour comes from a `--th-color-*` token or Tailwind `th-*`
      utility — no hardcoded hex.
- [ ] Every text element uses Raleway via `font-heading` / `font-body`
      or `font-light`.
- [ ] No blue in headings or status colours.
- [ ] No em-dashes in copy, no ellipses, no tricolons.
- [ ] If a status appears, it uses one of the five fixed values.
- [ ] Logo is rendered via `<Logo/>`, not as a free `<img>`.
- [ ] If the screen mirrors a slide pattern, it wraps in `SlideShell`.
- [ ] Photo dividers use `SectionDivider` with a `context` or explicit `photo` prop.
- [ ] Decorative triangles use `<DecorativeCorner />` (or the CDN URL) — never ad-hoc shapes.
- [ ] Triangle position chosen based on slide layout — not defaulted to top-right blindly.
- [ ] Dense data slides (`decorations={false}`) don't carry the triangle artwork.
- [ ] No four consecutive slides with triangles in the same corner.
