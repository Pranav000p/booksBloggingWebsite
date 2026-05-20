# Books Blog Website — Full Design & Animation Implementation Blueprint v2.0

> **Design Philosophy:** Less, but better. Every pixel earns its place. Every motion has intention. Inspired by Awwwards SOTD winners — the kind of site people screenshot and save.

---

## 0. Inspiration Sources (Awwwards-Level Reference)

Study these before writing a single line of code. Not to copy — to *understand* the grammar of award-winning UI.

| Source | URL | What to absorb |
|--------|-----|----------------|
| **Awwwards SOTD Archive** | awwwards.com/websites | Scroll rhythm, whitespace ratios, typographic scale |
| **Obys Agency** | obys.agency | Character-reveal text animation, cursor interaction |
| **Locomotive Scroll demos** | scroll.locomotive.ca | Layered parallax depth, scrub transitions |
| **Active Theory** | activetheory.net | Atmospheric lighting, depth on hover |
| **Resn** | resn.co.nz | Minimal-maximal tension — few elements, huge impact |
| **Dribbble: "dark editorial book UI"** | dribbble.com | Typographic pull-quotes, card layouts |
| **Dribbble: "literary magazine dark"** | dribbble.com | Color palette and cover art integration |
| **Dribbble: "book review website"** | dribbble.com | Review card patterns |
| **Animate UI** | animate-ui.com | Micro-interaction patterns, spring physics |
| **shadcn/ui** | ui.shadcn.com | Component architecture and accessibility patterns |

> **Rule:** If it doesn't look like it belongs on Awwwards, rebuild it.

---

## 1. Theme Overview

### Concept: "The Midnight Library — Breathing Darkness"

Not just dark. *Alive* dark. Like walking into an old library at 2am — the amber warmth of a single reading lamp, the smell of aged paper, the silence that hums. The UI breathes: textures shift, type appears like ink bleeding into parchment, images reveal themselves like eyes adjusting to low light.

**Mood:** Obsidian · Amber · Aged Cream · Absolute Silence with Sudden Motion  
**Visual Feel:** Deep ink backgrounds, candlelight amber glows, editorial whitespace so generous it feels luxurious, and animation that feels *earned* not decorative.

**The One Thing People Remember:** The hero — a real photograph of books floating in darkness, with a multi-layer parallax so deep it feels like you could step into the screen. Scroll down and the books drift apart, the light shifts. It moves like a living painting.

---

## 2. Color System

### Palette — "Ink & Candlelight"

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Page Base | Obsidian | `#080C14` | Body background — deeper than before |
| Surface 1 | Midnight Ink | `#0A1628` | Sections, cards |
| Surface 2 | Deep Navy | `#0F1E38` | Elevated surfaces |
| Surface 3 | Slate | `#172A48` | Hover states |
| Primary Text | Aged Parchment | `#F2E6C8` | Headings |
| Secondary Text | Warm Sand | `#B8A070` | Body, descriptions |
| Muted Text | Ash | `#6B7A94` | Labels, metadata |
| Accent | Ember Gold | `#C97D2E` | CTAs, highlights |
| Accent Bright | Candlelight | `#E8A040` | Hover, focus |
| Tag — Warm | Crimson Dust | `#7A2840` | Fiction, Drama |
| Tag — Cool | Sage Dusk | `#2A5040` | Non-fiction, Essays |
| Tag — Neutral | Slate Blue | `#2A3F60` | Biography, History |
| Grain Overlay | Paper Noise | `rgba(242,230,200,0.03)` | Texture pseudo-element |
| Amber Glow | Lamp Haze | `rgba(201,125,46,0.07)` | Radial gradient atmospherics |
| Ghost Border | Whisper | `rgba(242,230,200,0.08)` | All dividers and card borders |

### Dark Mode Only
This site has no light mode. The darkness IS the brand. Attempting a light mode would destroy the aesthetic identity.

---

## 3. Typography System

### Font Stack — "Letterpress Meets Modern Editorial"

| Element | Font | Weight | Size | Notes |
|---------|------|--------|------|-------|
| Site Logo | Cormorant Garamond Italic | 700 | 24px | One letter in ember gold |
| Hero Headline | Cormorant Garamond | 800–900 | 80–96px fluid | Extreme contrast serifs feel like old letterpress |
| Section Titles | Playfair Display | 700 | 48–64px | Italic variant for emphasis |
| Pull Quotes | Cormorant Garamond Italic | 600 | 40–52px | Gold accent on key phrase |
| Body Copy | Lora | 400 | 16–18px | Warm, readable, literary |
| Card Titles | Playfair Display | 600 | 20–24px | |
| Labels / Tags / Nav | DM Mono | 400 | 10–12px | Uppercase, tracked 0.2em |
| Metadata / Dates | DM Mono | 400 | 11px | Muted ash color |

**Fluid Type Scale:** Use `clamp()` everywhere. Headlines scale from mobile to desktop without breakpoint jumps.  
Example: `font-size: clamp(48px, 7vw, 96px)`

**Pairing Logic:**  
Cormorant's razor-thin hairlines next to bold strokes = letterpress tension. Lora's warmth = reading comfort. DM Mono's precision = editorial authority. Never touch a geometric sans-serif — it would shatter the atmosphere.

---

## 4. Parallax Hero — The Centerpiece

### The Uploaded Image
The hero uses the provided photograph: books floating in dramatic darkness, an open book glowing at center, warm amber candlelight emanating from mid-frame. This image is not decorative — it IS the hero.

### Multi-Layer Parallax Architecture

The image is decomposed into conceptual depth layers, each moving at different speeds on scroll (GSAP ScrollTrigger + `scrub: 1.5`):

```
Layer 0 — Static base: `#080C14` background                    (speed: 0x — anchored)
Layer 1 — Hero image: the photograph                           (speed: 0.25x — drifts slowest)
Layer 2 — Amber radial glow overlay                            (speed: 0.4x)
Layer 3 — Grain texture noise overlay                          (speed: 0.5x)
Layer 4 — Floating headline text                               (speed: 0.75x)
Layer 5 — Subheadline + CTAs                                   (speed: 0.85x)
Layer 6 — Scroll indicator                                     (speed: 1x — normal)
```

**Implementation:** All layers are `position: absolute` within a `position: relative` hero container with `overflow: hidden`. The image layer uses `object-fit: cover` on a container 130% the viewport height, allowing it to travel upward on scroll without revealing edges.

### Parallax on Horizontal Scroll / Mouse Movement
In addition to vertical scroll parallax, the hero responds to **mouse position**:
- Move cursor left: image shifts `+8px X`, headline shifts `+12px X`
- Move cursor right: image shifts `-8px X`, headline shifts `-12px X`
- Implemented with JS `mousemove` → GSAP `quickTo()` (spring physics, laggy follow)
- This creates a subtle 3D tilt effect — the "living painting" sensation

### Parallax Direction Support
- **Scroll down:** image moves up slower than content → classic parallax depth
- **Scroll up:** image returns at same rate → seamless
- **Mouse X:** horizontal drift adds a second axis of depth
- **Mouse Y:** slight vertical drift (±4px range) reinforces the 3D feel
- All implemented with GSAP `gsap.quickTo()` for performance (no layout thrashing)

---

## 5. Animation System

### Philosophy — "Deliberate Stillness, Sudden Life"
Inspired by Awwwards winner **Obys Agency**: long periods of calm, then one moment of beautiful, purposeful motion. Never animate more than 2–3 elements simultaneously. Every animation should make the user feel something — curiosity, elegance, satisfaction.

### Libraries Stack

| Library | Version | Purpose | Load Strategy |
|---------|---------|---------|---------------|
| **GSAP 3** | latest | Master timeline, scroll animations, text reveals | defer |
| **GSAP ScrollTrigger** | bundled | Scroll-based triggers, scrub parallax | defer |
| **GSAP ScrollTo** | bundled | Smooth nav link scroll | defer |
| **Lenis** | 1.x | Smooth scroll with inertia (lerp) | defer |
| **Splitting.js** | 1.0.6 | Splits text → chars/words for GSAP | defer |
| **shadcn/ui** | latest | Component primitives (Sheet, Dialog, Badge, Tooltip) | if React |
| **Animate UI** | latest | Spring-physics micro-interactions, hover effects | as needed |
| **Phosphor Icons** | 2.x | All iconography — thin/outline weight | SVG sprite |

> **Note on shadcn:** If building in Next.js/React, use shadcn for Sheet (mobile nav), Badge (tags), Tooltip (author info), and Dialog (book preview modal). It handles accessibility so you can focus on aesthetics.

> **Note on Animate UI:** Use Animate UI for the subscribe button loading state, star-fill animations, and card hover spring effects. Its spring physics feel more natural than CSS transitions.

### Animation Tokens

```css
:root {
  --ease-expo:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-back:    cubic-bezier(0.34, 1.56, 0.64, 1); /* spring overshoot */
  --ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);
  --ease-sharp:   cubic-bezier(0.25, 0, 0, 1);

  --dur-instant:  150ms;
  --dur-fast:     300ms;
  --dur-med:      600ms;
  --dur-slow:     900ms;
  --dur-cinematic: 1400ms;

  --stagger-tight: 50ms;
  --stagger-med:   80ms;
  --stagger-loose: 120ms;
}
```

---

## 6. Section-by-Section Specification

---

### § 6.1 — Navbar

**Layout:** Fixed, full-width, z-index: 1000

```
[ F O L I O (logo) ]    [ Blogs · Reviews · Summaries · Authors · About ]    [ Subscribe → ]
```

**Aesthetic Details:**
- Initially: fully transparent background, no border
- After scrolling 80px: `background: rgba(8, 12, 20, 0.92)`, `backdrop-filter: blur(20px) saturate(180%)`, bottom border `rgba(242,230,200,0.06)` fades in
- Logo: Cormorant Garamond Italic — the "O" in FOLIO is ember gold `#C97D2E`
- Nav links: DM Mono 11px, uppercase, letter-spacing 0.18em. Hover: ember gold, underline draws from left (`scaleX` from 0→1)
- Subscribe CTA: `border: 1px solid rgba(242,230,200,0.25)`, ember gold text. Hover: fills with ember gold, text goes dark. Transition: 250ms.
- Mobile: hamburger → full-screen overlay (shadcn Sheet or pure CSS). Links cascade in with 60ms stagger.

**Animation:**
- Load: slides in from `translateY(-100%)` over 700ms, ease-expo, 200ms delay
- Scroll state transition: 300ms ease-in-out background/border fade
- Letter hover: Splitting.js per-character scale 1.08× on hover with 20ms stagger

---

### § 6.2 — Hero Section (The Parallax Masterpiece)

**Layout:** 100vh, content centered. Parallax layers stack below.

```
[ PARALLAX: photograph background — books in darkness ]
[ LAYER: amber radial glow — center warm, edges dark ]
[ LAYER: SVG grain noise overlay ]
[ LAYER: eyebrow — "Est. 2024 · Literary Reviews" ]
[ LAYER: MAIN HEADLINE — 3 lines, 90px, Cormorant ]
[ LAYER: subheadline — Lora 18px, 60ch max-width ]
[ LAYER: two CTAs — "Begin Reading" | "Browse Reviews" ]
[ LAYER: stats row — 1,200+ Books · 340 Authors · 48K Readers ]
[ scroll indicator — vertical line + bouncing dot ]
```

**Aesthetic Details:**
- The photograph fills the entire hero with `object-fit: cover`, scale 130% height
- A `linear-gradient(to bottom, transparent 40%, #080C14 100%)` fades the photo into the page — seamless
- Headline: "Where Every *Page* / Tells a *Story* / Worth Telling" — italic words in ember gold
- Stats row: DM Mono, separated by thin `|` dividers, fade in last

**Parallax Detail (GSAP ScrollTrigger + mouse):**
- Image drifts up at 0.25× scroll speed — feels like the books are receding into distance
- Glow layer drifts at 0.4× — the warmth chases the content
- Mouse movement: `mousemove` → `gsap.quickTo()` on image (X: ±15px, Y: ±8px, lag: 0.3) and headline (X: ±25px, Y: ±12px, lag: 0.15)
- The result: headline appears to float *in front of* the photograph in 3D space

**Animation Sequence (page load):**
1. `0ms` — hero image fades in from `opacity: 0` over 800ms (cinematic reveal)
2. `300ms` — grain + glow layers fade in
3. `600ms` — eyebrow tag slides up from `y: 20, opacity: 0`
4. `800ms` — headline: each word revealed with `y: 60 → 0, skewY: 4 → 0, opacity: 0 → 1`, 80ms stagger, blur 12px → 0
5. `1400ms` — subheadline fades up
6. `1700ms` — CTAs slide in, 100ms stagger
7. `2000ms` — stats row fades in
8. `2200ms` — scroll indicator draws in

---

### § 6.3 — Featured / Latest Posts (Post Grid)

**Layout:** 1 hero post (full-width) + 3 secondary posts in a row below

**Hero Post Card:**
```
[ Wide image placeholder — colored with book-cover palette ]
[ Category tag ]
[ Post title — Playfair Display 36px ]
[ Excerpt — Lora 16px, 3 lines ]
[ Author avatar + name + date · read time ]
[ "Read Post →" link ]
```

**Secondary Cards:** Same structure, smaller. `aspect-ratio: 3/4`, portrait orientation — like actual book covers.

**Aesthetic Details:**
- Cards have NO border-radius (0px) — sharp editorial corners à la *The New Yorker*
- A thin 1px ember gold top-border appears on hover, drawing from left via `scaleX`
- Image placeholder: a colored rectangle with a faint book-spine texture gradient — the exact colors from the uploaded image (muted crimson, slate, navy)
- On card hover: image scales to 1.05× within its clipped container (CSS `overflow: hidden`)
- Tags: DM Mono 10px, uppercase, color-coded by category

**Animation:**
- Scroll enter: hero card slides up from `y: 80`, secondary cards stagger `y: 60` with 120ms gaps
- Image parallax within card: on scroll, image inside card moves at `0.7x` speed (mild card-level parallax)
- Section title: Splitting.js character wipe — each char clips up from below `translateY(110%)`, overflow hidden on parent

---

### § 6.4 — Genre Browsing

**Layout:** Horizontal scroll strip — 6 genre cards, overflow-x with momentum scroll

**Card Structure:**
```
[ Large genre icon (Phosphor, 48px thin) ]
[ Genre name — Playfair Display ]
[ Post count — DM Mono ]
[ Hover: reveal "Browse →" with slide-right animation ]
```

**Aesthetic:** Each genre has a unique muted color — no two alike. The strip has edge-fade masks (CSS `mask-image` gradient) hiding overflow. Drag to scroll (pointer events for desktop drag).

**Animation:**
- Auto-scrolling marquee that pauses on hover (`animation-play-state: paused`)
- On hover of individual card: background brightens, icon scales 1.2×, text color shifts to candlelight

---

### § 6.5 — About / Editorial Voice

**Layout:** Asymmetric split. 55% left (giant pull-quote) + 45% right (text + stats). Awwwards-style: more quote than description.

```
LEFT:
  [ Decorative " mark — 180px, rgba(201,125,46,0.06), behind text ]
  [ Pull quote: italic Cormorant 52px, 3–4 lines ]
  [ One key phrase: ember gold + CSS wavy underline ]

RIGHT:
  [ "Our Editorial Voice" — DM Mono eyebrow ]
  [ 3 short paragraphs — Lora 16px ]
  [ Two stat pills ]
  [ Arrow link ]
```

**Parallax:** The large `"` quotation mark moves at `0.5×` scroll speed within the section — gives the sense of layers.

**Animation:**
- Left column: `translateX(-80px) → 0`, opacity reveal, 900ms ease-expo
- Right column: `translateX(80px) → 0`, 150ms delayed — converge effect
- Stats count up from 0 using GSAP number increment (odometer style)

---

### § 6.6 — Testimonials / Reader Reviews

**Layout:** Auto-scroll marquee strip (top) + 3 featured cards (below)

**Marquee Strip:** Names + star ratings scrolling continuously left. Edge fade masks. Pauses on hover.

**Featured Cards:**
```
[ Star rating — 5 stars, amber ]
[ Quote — Lora italic 15px ]
[ Reviewer name + "Verified Reader" badge — DM Mono ]
[ Micro book cover (40×60px colored rect) + book title ]
```

**Aesthetic:**
- Cards: `border-left: 3px solid #C97D2E` — the only visible color accent on the card
- Quote text line-height: 1.8 — generous, inviting
- Verified badge: DM Mono 9px, `border: 1px solid rgba(201,125,46,0.4)`, 2px border-radius

**Animation (Animate UI inspiration):**
- Stars fill one by one on scroll-enter: Animate UI spring fill, 100ms stagger
- Card hover: spring scale 1.03× (`cubic-bezier(0.34, 1.56, 0.64, 1)`) — slight overshoot feels alive
- Marquee: pure CSS `@keyframes`, duplicate content for seamless loop

---

### § 6.7 — Newsletter CTA

**Layout:** Full-width, centered, visually distinct.

```
[ Decorative " — 300px, barely visible ]
[ Eyebrow — "Stay in the Story" ]
[ Headline — 56px Cormorant Italic ]
[ Subtext ]
[ Email input + Subscribe button — inline ]
[ Trust line: "12,000 readers · No spam · Leave anytime" ]
```

**Aesthetic:**
- Background: `#0D1A30` — slightly elevated from base. Centered amber glow.
- Input: no background fill — just a bottom border `1px solid rgba(242,230,200,0.2)`. Focus: border glows ember gold.
- Subscribe button: ember gold background, obsidian text, sharp corners, 0px border-radius.

**Animation:**
- Headline character wipe (same as Features title)
- On Subscribe click (Animate UI): button compresses → loading spinner → ✓ check, spring expand. 400ms total.

---

### § 6.8 — Footer

**Layout:** 4-column grid + copyright bar

```
[ FOLIO + tagline ]  [ Navigate ]  [ Categories ]  [ Connect ]
──────────────────────────────────────────────────────────────
[ © 2024 Folio ]  ·  [ RSS · GitHub · Twitter · Instagram ]
```

**Aesthetic:**
- Background: `#060A10` — the darkest surface. Grounds the page.
- Column labels: DM Mono 9px, uppercase, tracked 0.25em, ember gold
- Links: Lora 14px, `#B8A070`. Hover: parchment `#F2E6C8` + ember underline
- Social icons: Phosphor 28px, muted. Hover: rotate 8deg + scale 1.1 + ember color, spring physics

**Animation:**
- Columns: scroll-enter stagger, `y: 24 → 0`, 80ms per column
- Link underlines: `scaleX(0) → scaleX(1)` from left, 250ms ease

---

## 7. Texture & Atmosphere System

### Grain Overlay (applies to entire page)
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG feTurbulence noise */
  opacity: 0.035;
  pointer-events: none;
  z-index: 9999;
}
```

### Radial Amber Glow (hero)
```css
.hero-glow {
  background: radial-gradient(
    ellipse 80% 60% at 50% 30%,
    rgba(201,125,46,0.10) 0%,
    rgba(201,125,46,0.04) 40%,
    transparent 70%
  );
}
```

### No Shadows Rule
Zero box-shadows anywhere. Depth is created purely through background color contrast between stacked surfaces. This keeps the aesthetic clean and uncluttered.

### Image Vignette
The hero photo always has a CSS vignette overlay:
```css
.hero-vignette {
  background: radial-gradient(ellipse at center, transparent 40%, rgba(8,12,20,0.85) 100%);
}
```
This makes the photograph feel like it's lit from one candle at the center — exactly like the actual image.

---

## 8. Parallax — Complete Technical Spec

### Three-Tier System

**Tier 1 — Hero Deep Parallax (GSAP + mouse)**
```javascript
// Scroll parallax
gsap.to(".hero-image", { y: "30%", ease: "none", scrollTrigger: {
  trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.5
}});

// Mouse parallax
const xQuick = gsap.quickTo(".hero-image", "x", { duration: 0.6, ease: "power3" });
const yQuick = gsap.quickTo(".hero-image", "y", { duration: 0.6, ease: "power3" });
window.addEventListener("mousemove", e => {
  const rx = (e.clientX / window.innerWidth - 0.5) * 30;
  const ry = (e.clientY / window.innerHeight - 0.5) * 15;
  xQuick(rx); yQuick(ry);
});
```

**Tier 2 — Section Decorative Parallax (GSAP, subtle)**
- Applied to: large quotation marks, genre section background accents, CTA decorative element
- Speed: 0.5–0.6× within the section's scroll range
- `scrub: 2` — very smooth follow

**Tier 3 — Card Entrance Parallax (one-time)**
- Cards start `y: 60px` off-position, animate to `y: 0` on ScrollTrigger entry
- Not continuous scrub — single transition, `duration: 0.8`, ease-expo

### Mobile Parallax
All Tier 1 (hero) scroll parallax is disabled on `max-width: 768px` via `matchMedia`. Mouse parallax always disabled on touch devices. Tier 3 entrance animations still run (no performance cost).

---

## 9. Scroll Behavior (Lenis)

```javascript
const lenis = new Lenis({
  lerp: 0.08,          // smooth drag — feels like scrolling through warm air
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});

// Sync with GSAP
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

**Scroll-to on nav click:**
```javascript
gsap.to(window, { scrollTo: target, duration: 1.4, ease: "power4.inOut" });
```

---

## 10. Responsive Breakpoints

| Breakpoint | Layout Changes | Animation Changes |
|-----------|---------------|-------------------|
| `> 1440px` | Max-width container 1320px | Full parallax, all animations |
| `1200–1440px` | Desktop layout | Full parallax, all animations |
| `768–1200px` | Tablet: 2-col cards, stacked about | Reduced parallax intensity (50%) |
| `< 768px` | Mobile: single col, hero headline `clamp(40px, 8vw, 60px)` | Scroll parallax off, entrance anims on |
| `< 480px` | Compact mobile: CTAs stack, stats 2×2 | Minimal entrance anims only |

---

## 11. Accessibility

- All GSAP animations wrapped in `prefers-reduced-motion` check — fallback: instant `opacity: 1`
- Lenis disabled under reduced motion (native scroll used)
- Keyboard-navigable navbar with amber `outline: 2px solid #C97D2E` focus rings
- Marquee: `aria-hidden="true"` — decorative duplicate
- Color contrast: Parchment `#F2E6C8` on Obsidian `#080C14` = ~12:1 (WCAG AAA)
- All interactive elements have 44×44px minimum touch target

---

## 12. Performance

- GSAP + Lenis: `defer` load
- Splitting.js: runs post-DOM-ready
- Hero image: WebP format, `loading="eager"` (it's above the fold), `fetchpriority="high"`
- Grain texture: inline SVG data URI (no HTTP request)
- All animations: `transform` + `opacity` only (GPU-composited, no layout reflow)
- `will-change: transform` only on hero parallax layers
- Google Fonts: `display=swap` with `<link rel="preconnect">`
- Phosphor Icons: SVG sprite (one HTTP request for all icons)

---

## 13. Component Library Integration

### shadcn/ui (if React/Next.js)
```bash
npx shadcn@latest init
npx shadcn@latest add badge sheet dialog tooltip
```

| Component | Used For |
|-----------|---------|
| `Badge` | Category tags on blog cards |
| `Sheet` | Mobile navigation drawer |
| `Dialog` | Book preview modal popup |
| `Tooltip` | Author hover info |

Style override: set shadcn's CSS variables to match the Folio palette (obsidian base, ember gold accent, parchment text). The components handle a11y; you handle aesthetics.

### Animate UI
Use for:
- Subscribe button state machine (idle → loading → success)
- Star rating fill animation
- Card hover spring physics (replaces CSS transitions for more organic feel)
- Number count-up (stats section)

---

## 14. File Structure

```
/folio-books-blog
├── index.html                     ← Single page (or Next.js pages/)
├── /css (or /styles)
│   ├── tokens.css                 ← All CSS variables
│   ├── reset.css                  ← Modern CSS reset
│   ├── typography.css
│   ├── grain.css                  ← Texture overlay
│   ├── navbar.css
│   ├── hero.css                   ← Parallax layer structure
│   ├── sections.css
│   └── footer.css
├── /js (or /lib)
│   ├── main.js                    ← Lenis init, GSAP setup
│   ├── parallax.js                ← Hero parallax (scroll + mouse)
│   ├── reveal-animations.js       ← ScrollTrigger for all sections
│   ├── text-animations.js         ← Splitting.js reveals
│   └── nav.js                     ← Scroll state, mobile menu
├── /assets
│   ├── hero-books.webp            ← The uploaded photograph (optimized)
│   ├── /icons                     ← Phosphor SVG sprite
│   └── /fonts                     ← Optional: local font files
└── /components (if React)
    ├── Navbar.jsx
    ├── Hero.jsx
    ├── PostGrid.jsx
    ├── GenreStrip.jsx
    ├── About.jsx
    ├── Testimonials.jsx
    ├── Newsletter.jsx
    └── Footer.jsx
```

---

## 15. The Non-Negotiables (Awwwards Checklist)

Before shipping, verify:

- [ ] Hero parallax has at least 3 distinguishable depth layers
- [ ] Mouse movement creates 3D tilt on hero
- [ ] Lenis smooth scroll is imperceptible — it just *feels* better
- [ ] Every section title uses a text-reveal animation (no plain fades)
- [ ] Zero box-shadows anywhere
- [ ] No border-radius on editorial cards (sharp corners only)
- [ ] Grain texture is present but invisible — you feel it, not see it
- [ ] Color contrast passes WCAG AA minimum everywhere
- [ ] Hero image has both scroll and mouse parallax
- [ ] Mobile works flawlessly (animations gracefully degrade)
- [ ] Page loads fast — LCP under 2.5s
- [ ] The site feels different from every other book blog on the internet

---

*Blueprint v2.0 — Folio Books Blog · Built for Awwwards. Designed for readers.*
