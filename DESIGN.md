# Órbita Streaming — Design System & Visual World

## Visual Language: "Cosmic Cinema / High-End Celestial Tech"
A dramatic, immersive aesthetic merging deep space mechanics with premier cinema production values. No generic AI cyan/blue flood; instead, a curated dark palette of deep cosmic obsidian, ultraviolet, astral magenta, supernova orange, and pure starlight contrast.

### 1. Color Palette & Tokens
- **Backgrounds:**
  - Base Deep Space: `#06050b`
  - Cosmic Void Alt: `#0b0816`
  - Atmospheric Card: `rgba(18, 14, 34, 0.72)`
  - Elevated Popover / Dialog: `rgba(22, 17, 42, 0.92)`
- **Accents:**
  - Primary Orbit Violet: `#8b5cf6` (Glow: `rgba(139, 92, 246, 0.45)`)
  - Stellar Magenta / Orchid: `#d946ef` (Glow: `rgba(217, 70, 239, 0.4)`)
  - Supernova Solar Amber: `#f97316` (Glow: `rgba(249, 115, 22, 0.4)`)
  - Starlight Pure White: `#ffffff`
  - Celestial Cyan Accent: `#06b6d4`
- **Text & Foreground:**
  - Heading & Primary: `#ffffff`
  - Subheadings & Labels: `#e2e8f0`
  - Muted Body: `#94a3b8`
  - Subtle Telemetry: `#64748b`
- **Borders & Glass:**
  - Glass Border: `1px solid rgba(255, 255, 255, 0.08)`
  - Active Glow Border: `1px solid rgba(168, 85, 247, 0.45)`
  - Backdrop Filter: `blur(20px) saturate(180%)`

### 2. Typography
- **Headings & Display:** `Plus Jakarta Sans` / `Syne` / `Space Grotesk` (tight letter-spacing `-0.03em`, cinematic font weights 700 to 900)
- **Body & Microcopy:** `Inter` (high readability on dark backgrounds, line-height 1.6, weight 400/500/600)
- **Telemetry & Badges:** `Space Grotesk` (clean tech feeling, tabular figures)

### 3. Motion & Micro-Interactions
- **Entrance:** Cinematic fade-in with slight vertical ascension and blur resolution (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Cards:** Subtle 3D lift (`transform: translateY(-6px) scale(1.02)`), border illumination transition, and backdrop flare.
- **Buttons:** Magnetic aura, subtle radial shine, and tactile scale down on click (`active: scale(0.98)`).
- **Hero 3D:** Interactive Three.js concentric Keplerian orbits with gravitational star core and satellite nodes reacting smoothly to mouse/touch.

### 4. Accessibility & Performance
- WCAG AA contrast ratio ≥ 4.5:1 on all text elements.
- Visible focus rings with high-contrast violet/amber glow (`outline: 2px solid #a855f7`).
- Zero scroll-jacking; natural scroll behavior maintained at all times.
- WebGL GPU pause via `IntersectionObserver` when Hero is scrolled out of view.
