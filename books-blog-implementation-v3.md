# FOLIO — Books Blog Website
## Master Implementation Blueprint v3.0
### "The Obsidian Library" — Awwwards-Level UI Design Document

> **For the AI implementing this:** Read every section completely before writing a single line of code. This document is the single source of truth. Every design decision, animation, library choice, and interaction is specified here. Deviate only when technically impossible — and note the deviation.

---

## OVERVIEW & NORTH STAR

**Site Name:** FOLIO  
**Tagline:** Where Every Page Tells a Story Worth Telling  
**Purpose:** Literary blog platform — book reviews, summaries, essays  
**Tech Stack:** Next.js 14+ (App Router) + Tailwind CSS v3 + TypeScript  
**Design Goal:** An Awwwards Site of the Day. Not a blog. An *experience*.  
**Closest Reference:** A fusion of [Obys Agency](https://obys.agency) editorial darkness + [Locomotive Scroll demos](https://scroll.locomotive.ca) layered depth + the typographic drama of *The Paris Review* print edition.

**The One Sentence Test:** When someone opens the site and scrolls once, they should say "I've never seen a book blog look like this."

---

## PART 1 — TECH STACK & LIBRARY MANIFEST

### 1.1 Framework & Styling

| Tool | Version | Why |
|------|---------|-----|
| **Next.js** | 14+ (App Router) | SSR, image optimization, routing |
| **TypeScript** | 5+ | Type safety across components |
| **Tailwind CSS** | v3.4+ | Utility-first — config extended with custom tokens |
| **tailwind-merge** | latest | Merge conflicting Tailwind classes cleanly |
| **clsx** | latest | Conditional class logic |

### 1.2 Animation Libraries — FULL STACK

| Library | Version | CDN / Install | Role |
|---------|---------|--------------|------|
| **Framer Motion** | 11+ | `npm i framer-motion` | Page transitions, entrance animations, spring physics, scroll-linked animations via `useScroll` + `useTransform` |
| **GSAP 3** | 3.12+ | `npm i gsap` | Hero parallax master timeline, ScrollTrigger scrub, text character splits |
| **GSAP ScrollTrigger** | bundled | `gsap/ScrollTrigger` | Scroll-scrub parallax on hero, section pin, horizontal scroll |
| **Lenis** | 1.1+ | `npm i lenis` | Smooth scroll with inertia — replaces native scroll everywhere |
| **Three.js** | r162+ | `npm i three` | 3D particle field in hero background (floating dust/ember particles) |
| **@react-three/fiber** | 8+ | `npm i @react-three/fiber` | React wrapper for Three.js |
| **@react-three/drei** | 9+ | `npm i @react-three/drei` | Three.js helpers: Stars, Float, Environment |
| **Splitting.js** | 1.0.6 | `npm i splitting` | Splits text into chars/words for GSAP per-character animation |
| **Animate UI** | latest | `npx animate-ui@latest add` | Micro-interactions: button states, number counters, star fills, hover spring |

### 1.3 UI Component Libraries

| Library | Install | What to Use |
|---------|---------|-------------|
| **shadcn/ui** | `npx shadcn@latest init` | Badge, Sheet, Dialog, Tooltip, Separator |
| **Radix UI** | (via shadcn) | Accessible primitives under shadcn |
| **Phosphor Icons** | `npm i @phosphor-icons/react` | All icons — use `thin` or `light` weight only |
| **Lucide React** | `npm i lucide-react` | Fallback icons if Phosphor doesn't have it |

### 1.4 Tailwind Config Extensions

Add to `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      obsidian:   '#080C14',
      midnight:   '#0A1628',
      'deep-navy':'#0F1E38',
      slate:      '#172A48',
      parchment:  '#F2E6C8',
      sand:       '#B8A070',
      ash:        '#6B7A94',
      ember:      '#C97D2E',
      candle:     '#E8A040',
      'crimson-dust': '#7A2840',
      'sage-dusk':    '#2A5040',
      'slate-blue':   '#2A3F60',
    },
    fontFamily: {
      cormorant: ['Cormorant Garamond', 'serif'],
      playfair:  ['Playfair Display', 'serif'],
      lora:      ['Lora', 'serif'],
      mono:      ['DM Mono', 'monospace'],
    },
    animation: {
      'marquee':       'marquee 30s linear infinite',
      'marquee-rev':   'marquee-rev 30s linear infinite',
      'float-slow':    'float 8s ease-in-out infinite',
      'float-med':     'float 6s ease-in-out infinite',
      'pulse-glow':    'pulseGlow 4s ease-in-out infinite',
      'grain':         'grain 8s steps(10) infinite',
    },
    keyframes: {
      marquee:      { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      'marquee-rev':{ from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
      float: {
        '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
        '33%':      { transform: 'translateY(-12px) rotate(1deg)' },
        '66%':      { transform: 'translateY(-6px) rotate(-0.5deg)' },
      },
      pulseGlow: {
        '0%, 100%': { opacity: '0.04' },
        '50%':      { opacity: '0.10' },
      },
      grain: {
        '0%, 100%': { transform: 'translate(0, 0)' },
        '10%':      { transform: 'translate(-2%, -3%)' },
        '20%':      { transform: 'translate(3%, 2%)' },
        '30%':      { transform: 'translate(-1%, 4%)' },
        '40%':      { transform: 'translate(2%, -1%)' },
        '50%':      { transform: 'translate(-3%, 2%)' },
        '60%':      { transform: 'translate(1%, -3%)' },
        '70%':      { transform: 'translate(-2%, 1%)' },
        '80%':      { transform: 'translate(3%, -2%)' },
        '90%':      { transform: 'translate(-1%, 3%)' },
      },
    },
    backdropBlur: { xs: '2px' },
  },
}
```

---

## PART 2 — DESIGN LANGUAGE

### 2.1 Concept: "The Obsidian Library"

Imagine you're standing inside an ancient library that exists between dimensions — ink-black walls, a thousand books floating in darkness, lit only by the warm amber of a single impossible lantern. The air smells like aged paper and possibility. This is the visual metaphor for every design decision.

**Mood Board Keywords:** Obsidian · Amber candlelight · Ink bleeding into water · Old letterpress · Literary magazine · Silence before thunder · The Paris Review · Tarkovsky film stills

**The Rule of Three:** Every screen must have:
1. One dramatic typographic moment (huge Cormorant Garamond serif)
2. One animated element that surprises (particle, reveal, spring)
3. Absolute generous whitespace — the silence between notes

### 2.2 Color System — "Ink & Candlelight"

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| Obsidian | `#080C14` | `bg-obsidian` | Page base — the void |
| Midnight Ink | `#0A1628` | `bg-midnight` | Card/section surfaces |
| Deep Navy | `#0F1E38` | `bg-deep-navy` | Elevated surfaces |
| Slate | `#172A48` | `bg-slate` | Hover states |
| Aged Parchment | `#F2E6C8` | `text-parchment` | All headings |
| Warm Sand | `#B8A070` | `text-sand` | Body copy |
| Ash | `#6B7A94` | `text-ash` | Metadata, labels |
| Ember Gold | `#C97D2E` | `text-ember` / `bg-ember` | THE accent — use sparingly |
| Candlelight | `#E8A040` | `text-candle` | Hover state of ember |
| Ghost Border | `rgba(242,230,200,0.08)` | `border-white/[0.08]` | All borders |
| Grain Noise | `rgba(242,230,200,0.03)` | CSS only | Body::before texture |
| Amber Atmosphere | `rgba(201,125,46,0.06)` | CSS only | Radial glow overlays |

**Dark Mode Only.** There is no light mode. The darkness is the brand identity.

### 2.3 Typography System — "Letterpress Editorial"

| Role | Font | Weight | Size (fluid) | Class |
|------|------|--------|-------------|-------|
| Logo | Cormorant Garamond Italic | 700 | 22px | `font-cormorant italic font-bold` |
| Hero H1 | Cormorant Garamond | 800 | `clamp(52px, 8vw, 100px)` | `font-cormorant font-extrabold` |
| Section H2 | Playfair Display | 700 | `clamp(36px, 4.5vw, 64px)` | `font-playfair font-bold` |
| Pull Quote | Cormorant Garamond Italic | 600 | `clamp(28px, 3.5vw, 52px)` | `font-cormorant italic` |
| Body | Lora | 400 | 16–18px | `font-lora` |
| Card Title | Playfair Display | 600 | 20–24px | `font-playfair font-semibold` |
| Labels/Tags/Nav | DM Mono | 400 | 10–11px | `font-mono uppercase tracking-[0.2em]` |
| Metadata | DM Mono | 400 | 10px | `font-mono text-ash` |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?
  family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700
  &family=Playfair+Display:ital,wght@0,600;0,700;1,600
  &family=Lora:ital,wght@0,400;0,500;1,400
  &family=DM+Mono:wght@400;500
  &display=swap" rel="stylesheet">
```

### 2.4 Spacing & Layout Rules

- **Max content width:** 1320px, centered with `mx-auto`
- **Section padding:** `py-32 px-16` (desktop) → `py-20 px-6` (mobile)
- **Card gap:** Always `gap-px` (1px gap, creating hairline dividers) or `gap-0.5`
- **Zero border-radius** on editorial cards — sharp corners only (`rounded-none`)
- **Zero box-shadows** — depth through background color contrast only
- **Whitespace is content** — never fear empty space

### 2.5 Cursor

Custom cursor replaces the default on all non-touch devices:
- **Dot:** 8×8px circle, `bg-ember`, `position: fixed`, `pointer-events: none`, z-index 10000
- **Ring:** 36×36px circle outline, `border border-ember/40`, follows with 0.12 lerp lag
- **On hover (links/buttons):** dot scales to 2×, ring scales to 1.5× and shifts color
- **On click:** dot briefly squashes (`scaleY(0.6), scaleX(1.4)`)
- Use Framer Motion for cursor — `motion.div` with `useSpring` for the ring lag

---

## PART 3 — HERO SECTION (THE MASTERPIECE)

This is the most important section. Everything else supports it. Spend 40% of build time here.

### 3.1 The Hero Image

**Source:** The provided photograph — books floating in dramatic darkness, an open book with warm amber glow at center, dark atmospheric background with candlelight warmth.

**File:** Save as `/public/images/hero-books.webp` (convert from JPEG, compress to ~150KB)

**It is NOT a decorative background.** It is the visual soul of the site. Every design decision around it must serve the image, not compete with it.

### 3.2 Three.js Particle System (Background Layer)

**What it creates:** 800 tiny floating particles (dust motes, paper fragments, floating ember sparks) that drift slowly through 3D space behind the hero image. They catch the ambient amber light.

**Implementation with @react-three/fiber:**

```
Component: <HeroParticles />
- 800 points scattered in a 3D volume (width: 20, height: 10, depth: 15)
- Color: mix of rgba(201,125,46,0.6) [amber] and rgba(242,230,200,0.3) [cream]
- Size: 0.015–0.04 (varies per particle)
- Movement: each particle drifts on sin/cos wave at unique phase/speed
- On mousemove: entire particle field shifts ±0.3 units in X/Y (parallax)
- Canvas: position absolute, inset-0, z-index 1, pointerEvents: none
- Background: THREE.Color('#080C14') — matches page base exactly
```

**Three.js scene setup:**
- `OrthographicCamera` or `PerspectiveCamera` with `fov: 60`
- `ambientLight` intensity 0.1
- One `pointLight` at (0, 2, 3) color `#C97D2E` intensity 1.2 — the "candle"
- `frameloop="demand"` on Canvas for performance — only re-renders when needed

### 3.3 Hero Layer Stack (back to front)

```
z-0  THREE.js Canvas — particle field + ambient ember light
z-1  Hero photograph — object-fit cover, 130% height, will-change: transform
z-2  Linear gradient — transparent(40%) → obsidian(100%) bottom fade
z-3  Radial vignette — transparent(35%) → obsidian(85%) edge fade
z-4  Animated radial amber glow — pulses slowly (Tailwind animate-pulse-glow)
z-5  SVG grain noise overlay — animate-grain (position: fixed on body)
z-10 Hero text content — eyebrow + headline + sub + CTAs + stats
z-20 Scroll indicator
```

### 3.4 Hero Content Layout

```
[eyebrow]        ← DM Mono 11px, ash color, uppercase, letter-spacing 0.25em
                    "Est. 2024 · Literary Reviews"
                    flanked by thin 32px ember lines

[HEADLINE]       ← Cormorant Garamond 800, clamp(52px, 8vw, 100px)
                    Line 1: "Where Every"
                    Line 2: "Page Tells a"   ← "Page" in ember gold italic
                    Line 3: "Story"           ← dramatically large, isolated

[subheadline]    ← Lora 18px, sand color, max-width 520px, centered
                    "Thoughtful reviews, deep summaries, and literary essays
                     for readers who believe books are never just books."

[CTAs]           ← Two buttons, side by side
                    Primary: ember bg, obsidian text, sharp corners
                    Secondary: transparent, ghost border, parchment text

[stats row]      ← 3 items, DM Mono, separated by 1px vertical lines
                    "1,200+ Books" | "340 Authors" | "48K Readers"

[scroll line]    ← Thin vertical amber line + bouncing dot, bottom center
```

### 3.5 Hero Parallax — Scroll (GSAP ScrollTrigger)

All layers move at different speeds as the user scrolls down, creating depth:

| Layer | Scroll Speed | GSAP y value at bottom | scrub |
|-------|-------------|----------------------|-------|
| THREE.js canvas | 0.15× | `y: "15%"` | 2 |
| Hero photograph | 0.25× | `y: "28%"` | 1.5 |
| Amber glow | 0.40× | `y: "20%"` | 2 |
| Hero content | 0.65× | `y: "10%"` + opacity fade | 1.2 |
| Eyebrow only | 0.80× | `y: "8%"` + faster fade | 1 |

**GSAP ScrollTrigger config:**
```javascript
// Applied to each layer — trigger: ".hero", start: "top top", end: "bottom top"
gsap.to(".hero-photo", { y: "28%", ease: "none", scrollTrigger: {
  trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.5
}});
```

### 3.6 Hero Parallax — Mouse Movement (GSAP quickTo)

Mouse movement creates a 3D tilt effect — the image feels like a portal you can look into:

| Element | Mouse X range | Mouse Y range | Lag duration |
|---------|--------------|--------------|--------------|
| Photo layer | ±18px | ±10px | 0.8s |
| Particle canvas | ±12px | ±8px | 1.0s |
| Headline | ±32px | ±16px | 0.4s |
| Eyebrow | ±22px | ±10px | 0.5s |
| Amber glow | ±15px | ±8px | 1.2s |

Implementation: `gsap.quickTo(element, "x", { duration: 0.8, ease: "power3.out" })`

**Disable on:** `window.matchMedia("(max-width: 768px)")` and touch devices.

### 3.7 Hero Entrance Animation (Framer Motion + GSAP)

Page loads black. Then the world reveals itself:

```
0ms    → THREE.js canvas fades in (opacity 0→1, 800ms, ease power2.out)
200ms  → Hero photo fades in + scale 1.08→1.0 (1200ms, ease power3.out)
         [This scale-down feels like the camera pulling back from the image]
400ms  → Amber glow pulses in (opacity 0→max, 600ms)
700ms  → Grain texture fades in (opacity 0→0.035, 400ms)
900ms  → Eyebrow tag: y 24→0, opacity 0→1 (600ms, ease expo)
1100ms → Headline: each WORD reveals upward through clip-path
         Every word: clipPath "inset(110% 0 0 0)"→"inset(0% 0 0 0)"
         Stagger: 80ms per word, duration 900ms, ease [0.16, 1, 0.3, 1]
         Simultaneously: slight skewY 4→0 on each word-inner
2000ms → Subheadline fades up (y 20→0, opacity 0→1, 700ms)
2300ms → CTA buttons: staggered 100ms, y 16→0, opacity 0→1
2600ms → Stats row: fades in above a border that draws from left (scaleX 0→1)
2900ms → Scroll indicator draws in, line animates with CSS @keyframes
```

All Framer Motion variants for this:
```typescript
const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
  })
}
```

---

## PART 4 — BACKGROUND ANIMATIONS (GLOBAL)

### 4.1 Grain Texture (Body-Level)

A subtle SVG noise texture that animates to simulate real paper grain:

```css
/* In globals.css */
body::before {
  content: '';
  position: fixed;
  inset: -50%;           /* oversized to allow grain animation movement */
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
  z-index: 9999;
  animation: grain 8s steps(10) infinite;  /* Tailwind custom keyframe */
}
```

The `grain` animation randomly offsets the oversized texture → looks like real paper grain shifting.

### 4.2 Ambient Ember Glow (Hero + CTA sections)

A slow-breathing radial gradient that pulses — like a candle flame:

```css
.ember-glow {
  background: radial-gradient(
    ellipse 75% 55% at 50% 30%,
    rgba(201, 125, 46, 0.09) 0%,
    rgba(201, 125, 46, 0.03) 45%,
    transparent 70%
  );
  animation: pulseGlow 4s ease-in-out infinite;
}
```

This `pulseGlow` animation cycles opacity between 0.04 and 0.10 — barely noticeable, but felt.

### 4.3 Floating Decorative Elements (About + CTA sections)

Large typographic decorations that float slowly using Tailwind's custom `animate-float-slow`:

- The giant `"` quotation mark behind the about section pull-quote
- The `"` behind the newsletter CTA
- Each floats with: `translateY(0) → translateY(-12px)` on 8s ease-in-out infinite loop
- These also respond to scroll with GSAP (move at 0.5× speed of section scroll)

### 4.4 Marquee Animation (Two strips)

**Strip 1** (below hero): Book titles scrolling left → `animate-marquee`  
**Strip 2** (above footer): Genre names scrolling right → `animate-marquee-rev`

Both use Tailwind custom keyframes. Both pause on hover with `hover:[animation-play-state:paused]`. Both have edge-fade masks using Tailwind's `[mask-image:linear-gradient(...)]`.

---

## PART 5 — SECTION-BY-SECTION BLUEPRINT

---

### § 5.1 — NAVBAR

**Component:** `<Navbar />` — `"use client"` — position: fixed

**Layout:**
```
LEFT: Logo "F[O]LIO" (O in ember gold)
CENTER: Nav links — Blogs | Reviews | Summaries | Authors | About
RIGHT: Subscribe CTA button
```

**Tailwind classes (desktop):**
```
nav: fixed top-0 inset-x-0 z-50 h-[72px] flex items-center justify-between px-12
     transition-all duration-500
     [initial] bg-transparent border-b border-transparent
     [scrolled] bg-obsidian/90 backdrop-blur-xl border-b border-white/[0.06]
```

**Scroll state:** Use `useScroll` from Framer Motion or a simple `scroll` event listener. After 80px, add scrolled class.

**Nav link hover animation:**  
Each link uses Framer Motion `whileHover`:
- The text itself doesn't move
- A thin ember underline draws from left: `scaleX: 0→1`, `transformOrigin: "left"`
- Text color transitions from `text-sand` → `text-parchment`
- Duration: 250ms, ease: [0.16, 1, 0.3, 1]

**Subscribe button:**  
```
border border-ember/40 text-ember px-6 py-2.5 text-[11px] font-mono uppercase tracking-[0.15em]
hover: bg-ember text-obsidian
transition: all 250ms ease
```
Use Animate UI's button hover spring for the `bg-ember` fill — animates from bottom up like mercury rising.

**Mobile nav:**  
shadcn `<Sheet>` component. Full-screen overlay with obsidian bg.  
Links cascade in with Framer Motion `staggerChildren: 0.06s`.  
Hamburger icon: custom Framer Motion animation — three lines morph to × on open.

**Entrance animation:** On mount, Framer Motion `animate={{ y: 0, opacity: 1 }}` from `initial={{ y: -100, opacity: 0 }}`, 700ms, ease expo, 200ms delay.

---

### § 5.2 — HERO SECTION

*(Fully specified in Part 3 above — do not re-specify here, implement from Part 3)*

**Component structure:**
```
<section className="hero relative h-screen overflow-hidden">
  <HeroParticles />          ← Three.js canvas, z-0
  <HeroPhoto />              ← Image with GSAP parallax ref, z-10
  <HeroGradients />          ← Gradient + vignette + glow overlays, z-20
  <HeroContent />            ← All text + CTAs, z-30
  <ScrollIndicator />        ← z-40
</section>
```

---

### § 5.3 — RUNNING TITLES MARQUEE (between hero and posts)

**What it is:** A horizontally scrolling strip showing book titles currently being reviewed, creating a "live feed" feeling.

**Layout:** 1 strip, full-width, `overflow: hidden`

**Visual:**
```
bg-midnight border-y border-white/[0.06] py-4
```

Each item:
```
[book title in Cormorant Italic 18px] [separator ·] [category tag DM Mono 10px ember] 
```

**Mask:** `[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]`

**Pause on hover:** `hover:[animation-play-state:paused]`

**Content:** 8 book titles, doubled for seamless loop.

---

### § 5.4 — FEATURED POSTS GRID

**Component:** `<PostsGrid />`

**Layout — Awwwards Editorial Grid:**
```
[LARGE FEATURED POST — spans 2/3 width]    [TALL SIDE POST — 1/3 width]
[POST CARD]   [POST CARD]   [POST CARD]    ← below, full width, 3 columns
```

All cards are separated by `gap-px` (1px hairline dividers) with `bg-parchment/[0.04]` gap color.

**Featured Post Card (large):**
```
- Cover image area: aspect-ratio 16/7, overflow hidden
  - Image (or colored gradient placeholder) fills 115% height
  - On scroll: inner image moves at 0.8× (card-level parallax, GSAP)
  - On hover: image scales 1.05× (CSS transition 600ms)
  - Gradient overlay bottom: transparent→midnight
  - Category badge: bottom-left of image area
- Content area: p-8
  - Category tag (DM Mono, ember, uppercase)
  - Title (Playfair Display, 32px, parchment)
  - Excerpt (Lora, 15px, sand, 3 lines max, line-clamp-3)
  - Meta row: Author · Date · Read time (DM Mono, ash)
  - Read link: "Read Essay →" with arrow that slides right on hover
```

**Smaller Post Cards:**
```
- Cover: aspect-ratio 4/3
- Content: p-6
- Title: Playfair 20px
- Excerpt: 2 lines only
- Same hover/parallax behavior
```

**Card Entrance Animation (Framer Motion):**
```typescript
// Each card uses whileInView
<motion.article
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
  viewport={{ once: true, margin: "-80px" }}
/>
```

**Card hover state:**
- `border-t-2 border-ember` draws from left via `scaleX: 0→1` (Framer Motion `whileHover`)
- Background shifts from `midnight` to `deep-navy` (subtle depth increase)
- Transition: spring, `stiffness: 300, damping: 30`

**Placeholder cover colors (match the hero image palette):**
```
Fiction/Drama:     linear-gradient(135deg, #2A1820, #5C2035, #3A1425) + grain
Non-fiction:       linear-gradient(135deg, #0D2030, #1A4060, #0A2840) + grain
Fantasy/Essays:    linear-gradient(135deg, #151A10, #2A3818, #1A2410) + grain
Biography:         linear-gradient(135deg, #1A1020, #3A2050, #201030) + grain
```

Each placeholder also has an SVG `feTurbulence` grain overlay at 8% opacity for texture.

---

### § 5.5 — GENRE BROWSER (HORIZONTAL SCROLL)

**What it is:** A horizontal scrolling strip of 6 genre cards. On desktop: drag to scroll. On mobile: touch scroll.

**Layout:** `overflow-x-auto scrollbar-hide` — full width, no scroll track visible

**Genre Card:**
```
Size: w-[240px] h-[320px] flex-shrink-0 bg-midnight border border-white/[0.06]
Content (top to bottom):
  - Phosphor icon: 52px, thin weight, ember color, top-left
  - Genre name: Playfair 28px, parchment, italic
  - Post count: DM Mono 10px, ash — "48 Pieces"
  - Hover reveal: "Browse →" slides in from left, ember color
```

**Per-genre colors (subtle background tint, barely visible):**
```
Fiction:     #0D0A14 (hint of purple)
Essays:      #0A0F0A (hint of forest)
Biography:   #0A0D14 (hint of blue)
Poetry:      #14080A (hint of crimson)
Science:     #0A1014 (hint of teal)
Philosophy:  #100A08 (hint of amber)
```

**Framer Motion on hover:**
```typescript
whileHover={{ scale: 1.02, borderColor: "rgba(201,125,46,0.25)" }}
transition={{ type: "spring", stiffness: 400, damping: 25 }}
```

**Animate UI:** Use Animate UI's hover spring component for the "Browse →" reveal animation.

**Edge masks:** `[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]`

---

### § 5.6 — ABOUT / EDITORIAL VOICE

**Layout:** Asymmetric split — 55% left (pull quote) + 45% right (text)

**Left column:**
```
Position: relative, overflow visible
- Giant decorative " at position: absolute, top: -60px, left: -20px
  Font-size: 240px, color: rgba(201,125,46,0.05)
  Floats at 0.5× scroll speed (GSAP scrub: 2)
  Also uses animate-float-slow (subtle vertical bob)
- Pull quote: Cormorant Garamond Italic, clamp(32px, 3.5vw, 52px)
  Line: "We write for readers who treat books as [conversations]..."
  The word "conversations" styled: ember color + CSS wavy underline rgba(201,125,46,0.4)
```

**Right column:**
```
- Section eyebrow label (DM Mono, ember)
- 3 paragraphs (Lora, 16px, sand, line-height 1.85)
- Two stat pills: "Since 2024" | "12 Contributors" | "340+ Reviews"
  Pills: border border-white/[0.08] px-5 py-2.5 text-parchment font-mono
- Arrow link: "Our Philosophy →" (animate on hover)
```

**Entrance animation (Framer Motion):**
- Left: `initial={{ x: -80, opacity: 0 }}` → `whileInView={{ x: 0, opacity: 1 }}`
- Right: `initial={{ x: 80, opacity: 0 }}` → `whileInView={{ x: 0, opacity: 1 }}` with 150ms delay
- Duration: 1.0s, ease: [0.16, 1, 0.3, 1]
- Both: `viewport={{ once: true, margin: "-100px" }}`

---

### § 5.7 — TESTIMONIALS

**Layout:** 3-column grid

**Section header:** Standard eyebrow + h2 with text-reveal animation (same as other sections)

**Testimonial Card:**
```
bg-midnight border-l-2 border-ember p-8 md:p-10
- 5 stars: Phosphor Star icons, animate to amber fill on scroll-enter
  Animate UI's star fill animation — stagger 100ms per star
- Quote text: Lora italic, 15px, sand, line-height 1.85
- Reviewer block:
  - Avatar: 36×36 square (sharp corners), bg-deep-navy, initials in mono
  - Name: DM Mono, 11px, parchment, uppercase
  - "Verified Reader" badge: DM Mono 9px, ember border, ember text, px-2 py-0.5
```

**Hover (Framer Motion + Animate UI spring):**
```typescript
whileHover={{ scale: 1.025, y: -4 }}
transition={{ type: "spring", stiffness: 400, damping: 20 }}
```
This slight overshoot (spring physics) makes the card feel alive.

**Entrance:** `whileInView` stagger, each card 120ms after previous.

---

### § 5.8 — NEWSLETTER CTA SECTION

**Visual identity:** The most typographically dramatic section after the hero.

**Background:**
```
bg-[#0D1A30] (distinct from obsidian — slightly blue-shifted)
Centered radial ember glow (pulseGlow animation)
The giant decorative " — 300px, barely visible, animated float
```

**Layout:** Centered, max-width 600px

```
[eyebrow] "Stay in the Story" — DM Mono, ember

[headline] Cormorant Garamond 800, clamp(40px, 5vw, 68px):
  "Your Next"
  "Favourite Book"        ← "Favourite" in ember italic
  "Is One Email Away"

[sub] Lora 16px, sand — 1 line description

[email form]:
  Input: no bg, bottom-border only, Lora font, focus: amber glow border
  Submit button: bg-ember text-obsidian, sharp corners
  On submit: Animate UI button state machine
    idle → loading (spinner + compresses) → success (✓ + spring expand + green bg)
    Total: 1200ms

[trust line] "12,000 readers · No spam · Unsubscribe anytime" — DM Mono ash
```

**Headline entrance:** Framer Motion word-by-word clip-path reveal (same as hero).

**Section entrance:** Scroll-triggered, entire section fades up with `y: 40→0`.

---

### § 5.9 — FOOTER

**Background:** `#060A10` — the darkest surface on the page. Anchors everything.

**Layout:** 4-column grid + bottom bar

```
Col 1 (2fr): Logo + tagline + decorative horizontal line
Col 2 (1fr): Navigate links
Col 3 (1fr): Categories
Col 4 (1fr): Connect / Socials
```

**Column titles:** DM Mono 9px, uppercase, tracking-[0.25em], `text-ember`

**Links:** Lora 14px, `text-sand`. Hover: `text-parchment` + ember underline draws from left.

**Bottom bar:**
```
flex justify-between items-center pt-8 border-t border-white/[0.04]
Left: © 2024 FOLIO · All Rights Reserved — DM Mono, ash
Right: Made with ♥ for readers — Lora italic, ash (♥ in ember)
```

**Entrance (Framer Motion):** 4 columns stagger in `whileInView`, 80ms between each.

---

## PART 6 — TRANSITION SYSTEM

### 6.1 Page Transition (Framer Motion + Next.js)

Wrap every page in `<AnimatePresence>` in the root layout. Each page uses:

```typescript
// PageWrapper component
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>
```

**Optional:** A full-screen curtain transition — obsidian `div` slides from bottom, covers screen, then slides up to reveal new page. This is the Awwwards-level touch. Use Framer Motion `layoutId` + `AnimatePresence mode="wait"`.

```typescript
// Curtain component
const curtainVariants = {
  initial: { scaleY: 0, originY: "bottom" },
  animate: { scaleY: 1, originY: "bottom", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit:    { scaleY: 0, originY: "top",    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }
}
```

### 6.2 Section-to-Section Scroll Transitions

Every section transition is softened:
- Sections that follow each other use overlapping padding — the bottom of one section "bleeds" into the top of the next
- Color transitions: obsidian → midnight → deep-navy → back to obsidian — each shift happens over ~40px of scroll
- GSAP ScrollTrigger controls opacity cross-fades between adjacent sections

### 6.3 Text Reveal Transition (Standard — used on all section titles)

This is the signature text animation. Every section h2 uses it:

```
Word by word (or line by line for longer text):
  - Each word wrapped in: <span class="overflow-hidden inline-block">
  - Inner span: initial transform translateY(110%)
  - On scroll enter: translateY(0) with stagger 50-80ms
  - Duration: 800ms, ease: [0.16, 1, 0.3, 1]
```

Implement via Splitting.js (`data-splitting="words"`) + GSAP ScrollTrigger, or via Framer Motion `staggerChildren` on a container.

**Do not use** simple `opacity: 0→1` fades for section titles. Every title must reveal.

---

## PART 7 — ANIMATE UI INTEGRATION

[Animate UI](https://animate-ui.com) is used for specific micro-interactions. Install components you need:

```bash
npx animate-ui@latest add text-effect    # For typed/reveal text
npx animate-ui@latest add button         # For submit button state machine
npx animate-ui@latest add number         # For stat count-up
npx animate-ui@latest add stars          # For review star fill animation
```

| Animate UI Component | Where Used | Config |
|---------------------|-----------|--------|
| `<TextEffect>` | Hero subheadline | preset: "fade-in-blur", delay: 2.0s |
| `<AnimatedButton>` | Subscribe CTA | states: idle→loading→success |
| `<NumberTicker>` | Hero stats (1,200+, 340, 48K) | duration: 2s, ease: easeOut, trigger: inView |
| `<AnimatedStars>` | Testimonial cards | fill color: ember, stagger: 100ms |

---

## PART 8 — FRAMER MOTION PATTERNS

### 8.1 Standard `whileInView` Entrance (copy-paste pattern)

```typescript
// For any element that should animate on scroll-enter:
<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  viewport={{ once: true, margin: "-80px" }}
/>
```

### 8.2 Staggered Children Pattern

```typescript
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
const child = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
}

<motion.ul variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {items.map(item => <motion.li key={item.id} variants={child} />)}
</motion.ul>
```

### 8.3 Scroll-Linked Parallax (Framer Motion `useScroll`)

For sections below the hero, use Framer Motion's built-in scroll API:

```typescript
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
// Apply to decorative elements, quote marks, background accents
<motion.div style={{ y }} />
```

### 8.4 Spring Hover Cards

```typescript
<motion.div
  whileHover={{ scale: 1.025, y: -4 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 350, damping: 25 }}
/>
```

### 8.5 Custom Cursor (Framer Motion)

```typescript
const cursorX = useMotionValue(-100);
const cursorY = useMotionValue(-100);
const springConfig = { damping: 25, stiffness: 700 };
const cursorXSpring = useSpring(cursorX, springConfig);
const cursorYSpring = useSpring(cursorY, springConfig);

// Ring uses different spring (more lag):
const ringSpring = { damping: 20, stiffness: 200 };
const ringX = useSpring(cursorX, ringSpring);
const ringY = useSpring(cursorY, ringSpring);
```

---

## PART 9 — LENIS SMOOTH SCROLL SETUP

```typescript
// In layout.tsx or a client-side provider:
"use client";
import Lenis from 'lenis';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function LenisProvider({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove();
    };
  }, []);

  return <>{children}</>;
}
```

Respect `prefers-reduced-motion` — if set, skip Lenis init and keep native scroll.

---

## PART 10 — THREE.JS HERO PARTICLES SPEC

```typescript
// components/HeroParticles.tsx
"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 800;
  
  // Generate positions in 3D volume
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;    // x: ±10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;    // y: ±5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;    // z: ±7.5
    }
    return pos;
  }, []);

  // Animate: gentle drift on sin wave
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.008;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.005) * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C97D2E"           // ember gold
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

export function HeroParticles() {
  return (
    <Canvas
      className="absolute inset-0 z-0 pointer-events-none"
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 2, 3]} color="#C97D2E" intensity={1.2} />
      <ParticleField />
    </Canvas>
  );
}
```

**Performance notes:**
- `frameloop="demand"` → only re-render when mouse moves or clock ticks
- `antialias: false` → saves GPU
- `alpha: true` → transparent canvas, sits on top of photo
- On mobile (`max-width: 768px`): reduce count to 300, disable rotation

---

## PART 11 — PERFORMANCE TARGETS

| Metric | Target | How |
|--------|--------|-----|
| LCP | < 2.5s | Hero image: WebP, `priority`, `fetchpriority="high"` |
| CLS | < 0.05 | Explicit dimensions on all images and placeholder areas |
| FID / INP | < 100ms | No heavy JS on main thread at load |
| Three.js bundle | < 180KB gzipped | Use `@react-three/drei` tree-shaking |
| GSAP bundle | < 55KB gzipped | Only import ScrollTrigger plugin used |
| Framer Motion | < 35KB gzipped | Use `LazyMotion` + `domAnimation` |
| Total JS | < 400KB gzipped | Code-split hero animations |

**Optimization rules:**
- Three.js canvas: `React.lazy` + `Suspense` — don't block first render
- GSAP: `import { gsap } from 'gsap'` then `import { ScrollTrigger } from 'gsap/ScrollTrigger'` — avoid importing all plugins
- Lenis: client-side only, in a provider component
- Google Fonts: `<link rel="preconnect">` + `display=swap`
- `will-change: transform` only on elements currently animating — remove after animation ends

---

## PART 12 — FILE STRUCTURE (Next.js App Router)

```
/folio-books-blog
├── app/
│   ├── layout.tsx              ← Root layout: fonts, metadata, LenisProvider
│   ├── page.tsx                ← Home page — assembles all sections
│   ├── globals.css             ← Tailwind base, grain animation, scrollbar hide
│   └── blog/
│       └── [slug]/
│           └── page.tsx        ← Individual blog post page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          ← Fixed nav with scroll state
│   │   └── Footer.tsx
│   ├── hero/
│   │   ├── Hero.tsx            ← Orchestrates all hero sub-components
│   │   ├── HeroParticles.tsx   ← Three.js particle system
│   │   ├── HeroContent.tsx     ← Text + CTAs + stats
│   │   └── ScrollIndicator.tsx
│   ├── sections/
│   │   ├── Marquee.tsx         ← Running book titles strip
│   │   ├── PostsGrid.tsx       ← Featured + secondary post cards
│   │   ├── PostCard.tsx        ← Reusable post card
│   │   ├── GenreBrowser.tsx    ← Horizontal scroll genre cards
│   │   ├── About.tsx           ← Pull-quote + text section
│   │   ├── Testimonials.tsx    ← Review cards
│   │   └── Newsletter.tsx      ← CTA with email form
│   ├── ui/
│   │   ├── Cursor.tsx          ← Custom cursor with Framer Motion
│   │   ├── TextReveal.tsx      ← Reusable word-by-word reveal
│   │   ├── GrainOverlay.tsx    ← Body grain texture
│   │   └── SectionLabel.tsx    ← Eyebrow label component
│   └── providers/
│       └── LenisProvider.tsx   ← Smooth scroll setup
├── lib/
│   ├── animations.ts           ← Shared Framer Motion variants
│   ├── gsap.ts                 ← GSAP + ScrollTrigger setup utilities
│   └── utils.ts                ← cn() utility (tailwind-merge + clsx)
├── public/
│   └── images/
│       └── hero-books.webp     ← THE uploaded photograph (optimized WebP)
├── tailwind.config.ts          ← Extended with custom tokens (see Part 1.4)
├── next.config.js
└── package.json
```

---

## PART 13 — AWWWARDS CHECKLIST (Verify Before Shipping)

- [ ] Hero has Three.js particle field (800 particles, amber color, animated drift)
- [ ] Hero photo has multi-axis parallax: scroll (GSAP) + mouse (quickTo)
- [ ] Mouse parallax has at least 4 layers moving at different speeds
- [ ] Custom cursor replaces default — dot + lagging ring (Framer Motion spring)
- [ ] Lenis smooth scroll is imperceptible — it just *feels* better
- [ ] Every section h2 uses clip-path word-reveal animation (no plain opacity fades)
- [ ] Grain texture is present on body — animated, barely visible, felt not seen
- [ ] Ember glow pulses in hero and CTA sections (animate-pulse-glow)
- [ ] Zero box-shadows — depth through color contrast only
- [ ] Zero border-radius on post cards — sharp editorial corners
- [ ] Marquee strip pauses on hover
- [ ] Testimonial stars animate to fill individually on scroll-enter (Animate UI)
- [ ] Newsletter submit button has full state machine: idle → loading → success
- [ ] Page transition: curtain or fade between pages (Framer Motion AnimatePresence)
- [ ] Mobile: Three.js count reduced, mouse parallax disabled, all entrance anims work
- [ ] Color contrast WCAG AA everywhere (parchment on obsidian = ~12:1 ✓)
- [ ] LCP < 2.5s — hero image loads first, lazy everything else
- [ ] `prefers-reduced-motion` respected — all animations instant or off
- [ ] The site does not look like any other book blog in existence

---

## PART 14 — CRITICAL IMPLEMENTATION NOTES FOR THE BUILDING AI

1. **The hero image is already provided.** Path: `/public/images/hero-books.webp`. Use `next/image` with `priority={true}` and `fill` or explicit dimensions. This image is the centerpiece — never crop the books out of frame.

2. **Three.js + Next.js = dynamic import.** The `<HeroParticles />` component MUST be dynamically imported: `const HeroParticles = dynamic(() => import('./HeroParticles'), { ssr: false })`. Three.js doesn't work on the server.

3. **GSAP + Framer Motion coexist.** GSAP handles the hero parallax (it's more performant for scrub animations). Framer Motion handles everything else (entrance, hover, transitions). Don't use both on the same element.

4. **Lenis overrides native scroll.** Don't add `overflow: scroll` to any element except horizontally-scrollable containers. Lenis needs to control the main scroll.

5. **Tailwind custom animations.** The `grain`, `marquee`, `float`, `pulseGlow` keyframes MUST be added to `tailwind.config.ts` as shown in Part 1.4. They won't work without it.

6. **Animate UI components need separate installation.** Each component is added via CLI. Don't try to `npm install animate-ui` as a package — it's a CLI-based library.

7. **`"use client"` directives.** Every component using Framer Motion, GSAP, Three.js, or browser APIs needs `"use client"` at the top. Keep Server Components for static content.

8. **The eyebrow label pattern:** Used on every section:
   ```tsx
   <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ember mb-5">
     <span className="w-7 h-px bg-ember" />
     {label}
   </div>
   ```

9. **No Lorem Ipsum.** Write real literary content. Post titles should sound like actual book reviews. Author names should feel real. This is a literary blog — the copy IS the design.

10. **Ship the animations last.** Build the layout, content, and static design first. Add animations in this order: entrance reveals → parallax → hover states → cursor → particles. This prevents animation bugs from blocking layout work.

---

*Blueprint v3.0 — FOLIO Books Blog · Designed for Awwwards. Built for readers. Different by design.*
