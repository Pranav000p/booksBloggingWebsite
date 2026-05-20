# Books Blog Website — Full Design & Animation Implementation Blueprint

---

## 1. Theme Overview

### Concept: "Dark Literary Editorial"

The theme is inspired by high-end literary magazines, rare bookshops at night, and the tactile warmth of aged paper against dark wood shelves. Think *The New Yorker* meets *Kinfolk* — but dark, dramatic, and alive with motion.

**Mood:** Sophisticated · Warm · Immersive · Intellectual  
**Visual Feel:** Deep ink backgrounds, warm amber candlelight accents, aged cream typography, editorial whitespace, and quiet but purposeful animation throughout.

---

### Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary Background | Midnight Ink | `#0A1628` |
| Secondary Surface | Deep Navy | `#112240` |
| Card Surface | Slate Blue | `#1A3050` |
| Primary Text | Aged Cream | `#F4E8C1` |
| Secondary Text | Warm Sand | `#B8A88A` |
| Accent / CTA | Amber Gold | `#D4873A` |
| Accent Hover | Burnished Gold | `#F0A955` |
| Highlight / Tag | Dusty Rose | `#8B4560` |
| Subtle Border | Ghost Cream | `rgba(244,232,193,0.10)` |
| Gradient Glow | Amber Haze | `rgba(212,135,58,0.08)` |

---

### Typography

| Element | Font Family | Style | Weight |
|---------|-------------|-------|--------|
| Logo / Display Titles | **Cormorant Garamond** | Normal + Italic | 700–900 |
| Section Headings | **Playfair Display** | Normal + Italic | 700 |
| Body / Descriptions | **Lora** | Normal | 400–500 |
| Labels / Tags / Monospace | **DM Mono** | Normal | 400 |
| Nav Links | **DM Mono** | Uppercase | 400 |

**Source:** Google Fonts — all free and web-optimized.

**Pairing Logic:** Cormorant's extreme contrast serifs feel like letterpress printing. Lora's warm curves handle reading comfort. DM Mono adds a modern editorial reference number and metadata feel. Never use sans-serif as the primary typeface — it would kill the literary atmosphere.

---

### Texture & Atmosphere

- **Grain overlay** — a subtle SVG noise filter layered at ~4% opacity over the entire page, giving the impression of textured paper or aged film. Applied via a CSS pseudo-element (`::before`) on the `<body>`.
- **Radial amber glow** — a large radial gradient positioned at the top-center of the hero, like a single warm lamp illuminating the page. Fades to transparent within 60% radius.
- **Horizontal rule dividers** — 1px borders at `rgba(244,232,193,0.10)`, acting as ruled notebook lines between sections.
- **No box shadows** — depth is created through background color contrast between layers, not drop shadows.

---

## 2. Animation Strategy

### Philosophy
Animation should feel like turning a page — deliberate, graceful, never frantic. Every element earns its motion. The rule: one surprising moment per section, then stillness.

### Animation Libraries

| Library | Purpose | CDN / Source |
|---------|---------|--------------|
| **GSAP** (GreenSock) | Master timeline, scroll triggers, text reveals | `cdn.jsdelivr.net/npm/gsap` |
| **GSAP ScrollTrigger** | Pin sections, scrub parallax, trigger on scroll | Plugin bundled with GSAP |
| **Lenis** | Smooth scroll / inertia scrolling (replaces native scroll) | `cdn.jsdelivr.net/npm/lenis` |
| **Splitting.js** | Splits headlines into individual characters/words for GSAP text animation | `cdn.jsdelivr.net/npm/splitting` |
| **anime.js** (optional alt) | Lightweight alternative to GSAP for simpler sequences | `cdn.jsdelivr.net/npm/animejs` |

> **Note on Dribbble / Animated UI inspiration:** Browse Dribbble for "dark editorial book UI" and "literary blog animation" shots to align with the visual direction. The animation patterns here are directly inspired by award-winning Awwwards sites like *Obys Agency*, *Locomotive Scroll demos*, and *Active Theory* — smooth, scrub-based parallax with typographic reveals.

---

### Global Animation Tokens

| Token | Value | Used For |
|-------|-------|---------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | All reveals, slides |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Hover transitions |
| `--duration-fast` | `300ms` | Hover states, micro-interactions |
| `--duration-med` | `700ms` | Card reveals, fade-ins |
| `--duration-slow` | `1200ms` | Hero headline, section titles |
| `--stagger` | `80ms` | Per-word / per-item stagger delay |

---

## 3. Section-by-Section Specification

---

### 3.1 — Navbar (Navigation Bar)

**Layout:** Fixed, full-width, sits above all content.

**Structure:**
```
[ Logo: FOLIO ]    [ Blogs · Reviews · Summaries · Authors · About ]    [ Subscribe → ]
```

**Visual Design:**
- Background: `rgba(10, 22, 40, 0.85)` with `backdrop-filter: blur(16px)` — frosted glass over page content on scroll.
- Bottom border: `1px solid rgba(244,232,193,0.08)` — barely visible ruled line.
- Logo uses Cormorant Garamond Italic, accent color on one letter (e.g., the "O").
- Nav links: DM Mono, 11px, 0.18em letter-spacing, uppercase. Active link gets a small amber underline.
- CTA button (Subscribe): amber background, dark text, 2px border-radius (sharp, editorial). No rounded pill.

**Animation — Navbar:**
- On page load: slides down from `translateY(-100%)` to `0` with a 600ms ease-out-expo delay of 200ms.
- On scroll down past 80px: background transitions from transparent to the frosted dark state over 300ms.
- Nav links: on hover, each letter individually scales up 1.05× via Splitting.js + GSAP (character hover effect).
- Active page indicator: a thin 1px amber line underscores the current link, transitioning with a `scaleX` wipe from left on route change.

---

### 3.2 — Hero Section

**Layout:** Full viewport height (100vh). Content centered vertically and horizontally.

**Structure:**
```
[ Eyebrow tag: "Est. 2024 · Literary Reviews" ]
[ MAIN HEADLINE — 3 lines, large ]
[ Subheadline description ]
[ Two CTA buttons: "Explore Blogs" | "Browse Reviews" ]
[ Stats row: 1,200+ Books · 340 Authors · 48K Readers ]
[ Decorative book spine floaters — left and right edges ]
[ Scroll indicator — bottom center ]
```

**Visual Design:**
- Background: the main midnight ink base with the amber radial glow at top.
- Grain texture overlay at full height.
- Floating book spines: vertical colored rectangles at ±15° angles on the left and right edges of the viewport, partially cropped. Colors: muted red, teal, and purple matching the tag system.
- Headline uses Cormorant Garamond at ~90px, with one word or line in italic amber color.
- Stats row separated by a `1px rgba(244,232,193,0.10)` horizontal rule with `margin-top: 40px`.

**Animation — Hero (the most elaborate section):**

**① Parallax Background (GSAP ScrollTrigger scrub)**
- The grain layer and radial glow move at `0.3x` scroll speed (slower than content) — classic parallax depth.
- The decorative book spines move at `0.6x` scroll speed.
- The hero headline moves at `0.85x` scroll speed (slightly slower than normal, creating a floating sensation).
- Implemented with GSAP `ScrollTrigger` and `scrub: true` on each layer separately.

**② Headline Text Reveal (Splitting.js + GSAP)**
- Splitting.js splits the headline into individual words (or characters for the first word).
- GSAP timeline animates each word from `{ opacity: 0, y: 40, skewY: 3, filter: blur(8px) }` to `{ opacity: 1, y: 0, skewY: 0, filter: blur(0) }`.
- Stagger: 80ms per word, starting at page load after a 400ms initial delay.
- Total reveal duration per word: 900ms with `ease-out-expo`.
- The italic accent word fades in from `opacity: 0` with a golden color crossfade, 200ms after the surrounding words.

**③ Floating Book Spines (CSS keyframes + GSAP float)**
- Each book spine loops with `translateY` oscillation — a gentle 12–18px float over 6–9 seconds.
- Each spine has a unique animation duration and delay for organic asynchrony.
- On scroll: GSAP ScrollTrigger rotates each spine slightly (`rotation: ±5deg`) as the page moves, enhancing the parallax depth feeling.

**④ Subheadline & CTA Fade-In (GSAP sequential)**
- After headline completes: subheadline fades in `{ opacity: 0, y: 20 }` → `{ opacity: 1, y: 0 }` over 600ms.
- CTA buttons appear 150ms after, each sliding in from `{ y: 16, opacity: 0 }` with 100ms stagger between them.
- Stats row fades in last, 300ms after buttons.

**⑤ Scroll Indicator**
- A vertical line with a dot that loops — the line "draws" downward using `scaleY` from 0 to 1 (origin: top), then the dot slides down it, then both fade out and repeat.
- Disappears after scroll passes 120px.

**⑥ Lenis Smooth Scroll**
- Lenis wraps the entire page scroll, adding 1.2x lerp smooth inertia. This makes the parallax scrub feel silky rather than janky.

---

### 3.3 — Features / Services Section

**What this section shows:** What the blog offers — Reviews, Summaries, Essays, Author Spotlights, Reading Lists, Genre Deep-Dives.

**Layout:** 2-column intro text + 3-column feature cards below.

**Card Structure (each feature):**
```
[ Icon — thin line icon (Phosphor Icons or Lucide) ]
[ Feature Title ]
[ One-sentence description ]
[ "Explore →" micro-link ]
```

**Visual Design:**
- Cards: `background: #112240`, `border: 1px solid rgba(244,232,193,0.08)`, sharp `border-radius: 3px`.
- On hover: border brightens to `rgba(244,232,193,0.25)`, card lifts `translateY(-6px)`.
- Icon: 28px, amber stroke color, Phosphor Icons (outline style).
- A thin amber top-border accent appears on hover using `::after` pseudo-element, animating width from 0% to 100% via `scaleX`.

**Animation — Features:**
- **Scroll-triggered stagger reveal** via GSAP ScrollTrigger.
- Cards enter from `{ opacity: 0, y: 50 }` to `{ opacity: 1, y: 0 }` with 120ms stagger.
- Section title does a **character-by-character reveal** (Splitting.js), each character sliding up from `translateY(100%)` (parent clips with `overflow: hidden`), creating a "text wipe up" effect — a Dribbble/Awwwards staple.
- The amber top-border hover accent uses CSS `transform: scaleX(0)` → `scaleX(1)` with `transform-origin: left`.

---

### 3.4 — About Us Section

**Layout:** Asymmetric 2-column — left is a large editorial pull quote, right is descriptive text + team stats.

**Structure:**
```
LEFT COLUMN (60%):
  [ Giant italic pull quote in Cormorant, 3–4 lines ]
  [ Amber decorative quotation mark, 120px, behind the text ]

RIGHT COLUMN (40%):
  [ "Our Story" eyebrow ]
  [ About paragraph ]
  [ Two stat pills: "Since 2024" · "12 Contributors" ]
  [ "Meet the Team →" link ]
```

**Visual Design:**
- The section has a slightly lighter background (`#112240`) to differentiate from the hero.
- Pull quote uses Cormorant Garamond Italic at 48px, line-height 1.1. One key phrase is underlined with an amber wavy underline (CSS `text-decoration: underline wavy #D4873A`).
- Right column text is Lora at 16px, comfortable reading line-length (~65 characters).

**Animation — About:**
- On scroll into view: left column slides in from `translateX(-60px)` with opacity 0 → 1. Duration: 900ms.
- Right column slides in from `translateX(60px)`, 150ms delayed — creating a converging effect.
- The large background quotation mark has its own parallax: moves at `0.5x` scroll speed within the section (GSAP ScrollTrigger pinned to section).
- Stat pills count up from 0 to their values using GSAP's `snap` and a custom number incrementer — numbers roll upward like an odometer.

---

### 3.5 — Testimonials / Social Proof

**Layout:** Horizontal auto-scroll carousel (marquee-style) + below it, 3 featured testimonial cards in a grid.

**Structure:**
```
[ Marquee strip — reviewer names + star ratings, auto-scrolling left ]
---
[ 3 featured testimonial cards in a row ]
  Each card:
    [ Star rating (1–5 filled amber stars) ]
    [ Quote text in Lora italic ]
    [ Reviewer name + "Verified Reader" badge ]
    [ Book cover placeholder (colored rectangle) ]
```

**Visual Design:**
- Marquee strip: `background: #112240`, continuous left-scroll with a mask fade on left and right edges using CSS `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)`.
- Cards: same dark surface card style as Features, but with a subtle amber left-border accent (`border-left: 3px solid #D4873A`).
- Star ratings: solid amber stars (★), empty stars use `rgba(212,135,58,0.25)`.
- Reviewer avatars: initials in a circle, background using a muted color from the palette.

**Animation — Testimonials:**
- **Marquee strip:** Pure CSS `@keyframes marquee` animation — no JS needed. Duplicated content for seamless loop. Pauses on hover (`animation-play-state: paused`).
- **Cards:** GSAP ScrollTrigger stagger — each card fades in with `{ opacity: 0, y: 40 }` → `{ opacity: 1, y: 0 }`, 100ms stagger, 700ms duration.
- **On card hover:** GSAP `mouseenter` handler scales the card up `1.03×` and brightens the left amber border to full amber — smooth 250ms ease.
- **Star ratings:** On scroll into view, stars fill in one by one with a 100ms stagger using GSAP — each star transitions from `rgba(212,135,58,0.25)` to full amber `#D4873A`.

---

### 3.6 — Call to Action (CTA) Section

**Layout:** Full-width section, centered content, bold and visually distinct.

**Structure:**
```
[ Decorative large italic quote mark — background element ]
[ Eyebrow: "Start Reading Today" ]
[ Large headline: "Your Next Favourite Book Is One Click Away" ]
[ Subtext ]
[ Email input + Subscribe button (inline form) ]
[ Trust signal: "Join 12,000 readers · No spam · Unsubscribe anytime" ]
```

**Visual Design:**
- Background: a slightly elevated `#0D1F35` with the amber glow centered (not top-biased like hero).
- Large decorative `"` character: Cormorant Garamond, 240px, `rgba(212,135,58,0.06)` — purely atmospheric.
- Headline: Cormorant Garamond, 56px, italic accent on "Favourite Book".
- Email input + button: inline flex row — input `background: rgba(244,232,193,0.05)`, `border: 1px solid rgba(244,232,193,0.15)`. Button is amber fill, sharp corners.
- Input focus state: border transitions to full amber with a subtle amber glow `box-shadow: 0 0 0 3px rgba(212,135,58,0.2)`.

**Animation — CTA:**
- On scroll into view: headline does the same character-wipe-up as Features section title.
- The background decorative quote mark slowly rotates `5deg` over 8 seconds using a CSS keyframe loop — barely perceptible, adds organic life.
- The email input row slides up `{ y: 30, opacity: 0 }` → `{ y: 0, opacity: 1 }` after headline completes, 200ms delayed.
- On Subscribe button click: button shrinks to a loading dot, then expands to a ✓ checkmark with a GSAP morphSVG or simple opacity swap — success micro-animation.

---

### 3.7 — Footer

**Layout:** 4-column grid (top) + a single copyright bar (bottom).

**Structure:**
```
[ Logo + tagline ]  [ Navigation ]  [ Categories ]  [ Social Links ]
---
[ © 2024 Folio · All Rights Reserved ] ---- [ Made with ♥ for readers ]
```

**Visual Design:**
- Background: darkest layer `#060F1C` — slightly darker than the page base, grounding the page.
- Top border: `1px solid rgba(244,232,193,0.08)`.
- Column headings: DM Mono, 10px, uppercase, 0.18em letter-spacing, amber color.
- Links: Lora, 14px, `#B8A88A` — hover transitions to cream `#F4E8C1` with an amber underline drawing in from left.
- Social icons: Phosphor Icons (32px), muted color, amber on hover with a `rotate(8deg) scale(1.1)` hover transform.
- Copyright bar: `border-top: 1px solid rgba(244,232,193,0.06)`, DM Mono 10px, centered or space-between.

**Animation — Footer:**
- On scroll into view: each column fades in with `{ opacity: 0, y: 20 }` → `{ opacity: 1, y: 0 }`, 80ms stagger per column.
- Footer link hover: `::after` underline pseudo-element uses `transform: scaleX(0)` → `scaleX(1)` with `transform-origin: left`, 250ms ease.
- Social icons: GSAP `mouseenter` triggers a quick `rotation: 360` spin (360deg, 500ms) — playful but restrained.

---

## 4. Parallax Effect — Detailed Plan

Parallax is applied in three tiers across the page, using GSAP ScrollTrigger with `scrub: 1.5` (smooth follow):

### Tier 1 — Hero Deep Parallax (most prominent)
- **Layer A (grain + glow):** moves at `y: 0` to `y: +80px` over the hero scroll distance. Speed: `0.25x`.
- **Layer B (book spines):** moves at `y: 0` to `y: +50px`. Speed: `0.5x`.
- **Layer C (headline text):** moves at `y: 0` to `y: +30px`. Speed: `0.8x`.
- **Layer D (CTA buttons + stats):** moves at native scroll speed. Speed: `1x`.
- Result: a 4-depth layered parallax as the user scrolls off the hero.

### Tier 2 — Section Background Parallax (subtle)
- Applied to the decorative background elements in About Us and CTA sections.
- Each decorative element (large quote mark, large number, etc.) moves at `0.6x` scroll speed within its section's viewport pin.
- Implemented as a `ScrollTrigger` scoped to `trigger: ".about-section"` with `start: "top bottom"` and `end: "bottom top"`.

### Tier 3 — Card Entrance Parallax (micro)
- Review cards, genre cards, and feature cards each enter from a slightly lower `y: 60px` offset.
- Not a continuous scrub — just a one-time entrance animation triggered by scroll position.
- This creates the sensation that cards are "rising" from below as you scroll down.

---

## 5. Icon System

**Library:** [Phosphor Icons](https://phosphoricons.com/) — outline/thin weight.  
**Why:** More literary and refined than Heroicons or FontAwesome. The thin stroke weight matches the typography's elegance. Available as a web font or SVG sprite.

**Usage in sections:**
- Features: `book-open`, `magnifying-glass`, `pen-nib`, `user-circle`, `list`, `folders`
- Footer social: `instagram-logo`, `twitter-logo`, `rss`, `envelope-simple`
- CTA: `arrow-right`, `check-circle`
- Nav: `list` (hamburger on mobile)

---

## 6. Scroll Behavior

**Library:** [Lenis](https://lenis.darkroom.engineering/) — smooth scroll with lerp inertia.

**Settings:**
- `lerp: 0.1` — gentle inertia, feels like scrolling through thick cream.
- `duration: 1.4` — slightly longer scroll duration for a luxurious feel.
- `easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` — exponential ease out.
- Lenis integrates directly with GSAP's `ScrollTrigger` via `lenis.on('scroll', ScrollTrigger.update)`.

**Scroll-to on nav link click:** GSAP `scrollTo` plugin with `duration: 1.2` and `ease: "power4.inOut"` — section transitions feel intentional and editorial, not instant.

---

## 7. Responsive Strategy

| Breakpoint | Changes |
|-----------|---------|
| `> 1200px` | Full desktop layout as described |
| `768px–1200px` | Tablet: feature grid goes 2-col, about section stacks, book spines hidden |
| `< 768px` | Mobile: single column everything, hero headline drops to 48px, parallax layers disabled (performance), marquee still runs |
| `< 480px` | Compact hero: headline 36px, CTA buttons stack vertically, stats wrap to 2×2 grid |

**Performance on mobile:** Parallax and GSAP ScrollTrigger animations are conditionally disabled using `window.matchMedia('(max-width: 768px)')`. CSS-only animations (floating book spines, marquee) still run.

---

## 8. Performance Notes

- GSAP and Lenis load deferred (`<script defer>`).
- Splitting.js runs after DOM ready to avoid layout shift.
- Grain texture uses an inline SVG data URI — no external image request.
- All animations use `transform` and `opacity` only — GPU-accelerated, no layout thrashing.
- `will-change: transform` applied sparingly only to the hero parallax layers.
- Google Fonts loaded with `display=swap` to prevent FOUT blocking the headline reveal.

---

## 9. Accessibility

- All animations wrapped in `@media (prefers-reduced-motion: reduce)` — when enabled, all GSAP animations are replaced with instant `opacity: 1` reveals.
- Lenis is disabled under reduced motion (native scroll is used instead).
- Navbar keyboard-navigable with visible focus rings (`outline: 2px solid #D4873A`).
- Marquee strip has `aria-hidden="true"` — it's decorative; the real testimonials are in the card grid below.
- Color contrast: all text on dark backgrounds passes WCAG AA (cream on navy = ~9:1 ratio).

---

## 10. File & Folder Structure (Suggested)

```
/books-blog
├── index.html
├── /css
│   ├── reset.css
│   ├── tokens.css          ← All CSS variables (colors, fonts, spacing)
│   ├── typography.css
│   ├── navbar.css
│   ├── hero.css
│   ├── sections.css        ← Features, About, Testimonials, CTA
│   └── footer.css
├── /js
│   ├── main.js             ← Lenis init, GSAP setup
│   ├── hero-animations.js  ← Parallax, headline reveal
│   ├── scroll-animations.js← ScrollTrigger for all sections
│   └── nav.js              ← Scroll state, mobile menu
├── /assets
│   ├── /icons              ← Phosphor SVGs
│   └── /fonts              ← Optional local font files
└── /components             ← If using a component framework
    ├── Navbar.jsx
    ├── Hero.jsx
    ├── Features.jsx
    ├── About.jsx
    ├── Testimonials.jsx
    ├── CTA.jsx
    └── Footer.jsx
```

---

## 11. Key Dribbble / Animated UI References

Browse these for direct visual inspiration matching this theme:

| Reference | What to look for |
|-----------|-----------------|
| **Dribbble: "dark editorial book blog"** | Typographic layout, large serif on dark bg |
| **Awwwards: Obys Agency** | Character-by-character text wipe animation |
| **Awwwards: Locomotive Scroll demos** | Parallax scrub depth, smooth scroll feel |
| **Animated UI — "marquee testimonial"** | Auto-scroll social proof strip |
| **Animated UI — "stagger card reveal"** | Cards entering from below on scroll |
| **Dribbble: "literary magazine UI"** | Asymmetric layouts, pull-quote styling |
| **Dribbble: "book review website dark"** | Color palette validation, card styling |

> Search these terms directly on Dribbble.com and save the shots that resonate. Each animation described above has a direct Awwwards/Dribbble precedent — this is proven, award-level UI motion design applied to the books blog context.
