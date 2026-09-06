# Build Prompt: "Sorry" Envelope Webpage (QR-Triggered)

Use this entire document as the prompt for Antigravity. It describes a single-page, mobile-first, animated web experience.

---

## 1. Concept Summary

A single HTML page that simulates opening a physical envelope and pulling out a card that says "Sorry." The page is reached by scanning a QR code (so it must be mobile-first, fast-loading, and touch-friendly). The tone is minimalist, soft, handwritten/doodle-style, and emotionally warm — not flashy.

**User flow:**
1. Person scans QR code → page loads showing a closed beige envelope centered on a plain, soft background.
2. A small prompt below it (e.g. "Tap to open") gently pulses.
3. On tap/click: envelope flap animates open (folds back like a real flap).
4. A card slides/peeks out of the opened envelope.
5. On tap of the card: it animates out fully and "opens" (like a booklet or a simple flip/scale reveal) to show:
   - The word **"Sorry"** in large, elegant dark maroon script/serif type.
   - A short handwritten-style apology message beneath it.
6. Small hand-drawn flowers (matching the reference doodle style) are scattered around and gently animate (soft sway, fade-in, tiny floating motion) throughout the experience — never distracting, just ambient.
7. Optional: a tiny "close"/replay button to seal the envelope again and re-watch the animation.

---

## 2. Visual Style / Design System

**Overall mood:** minimalist, aesthetic, soft, slightly handmade/journal-like. Think a cream stationery card, not a corporate UI.

### Color Palette
- Background: warm off-white / beige, e.g. `#F7F0E4` or `#FAF3E7`
- Envelope body: beige/tan, e.g. `#E8D9BF` with a slightly darker flap `#DCC7A3`
- Card paper: warmer cream `#FFF8EC`
- Primary accent / "Sorry" text: deep maroon, e.g. `#6E2C3B` or `#7A2E35`
- Secondary accent: dusty pink `#E7B5C0` and soft mustard/yellow `#E8C468` (matching the uploaded floral doodle reference — pink peonies, yellow daisies, line-art stems)
- Subtle shadows: soft warm grey, low opacity, no harsh black shadows

### Typography
- Headline ("Sorry"): an elegant script or refined serif font (e.g. Google Fonts: "Playfair Display", "Cormorant Garamond", or a script like "Dancing Script" / "Caveat" for a handwritten feel)
- Body message: a clean handwriting-style or soft serif font (e.g. "Caveat", "Patrick Hand", or "Nunito" for a more neutral soft sans if handwriting feels too busy)
- Keep font sizes generous and readable on mobile (min 16px body, large hero word for "Sorry")

### Decorative Elements
- Use small, minimal line-art flowers inspired by the attached reference sheet (single-line botanical doodles with light pink/yellow watercolor-style fills, thin black outlines, small scattered dot clusters as pollen/accents).
- Recreate 4–6 of these flowers as lightweight inline SVGs (not raster images) so they're crisp, small in file size, and easy to animate/recolor.
- Scatter them around the envelope and around the card edges — asymmetrically, not in a rigid grid. Corners and margins, not covering center content.
- Avoid clutter: whitespace is part of the aesthetic.

---

## 3. Layout Structure

Single page, full viewport height, centered content, mobile-first responsive (this will be opened almost entirely on phones via QR scan).

```
[Soft beige background, a few faint floating flower doodles]
        [ Envelope graphic, centered ]
        [ "Tap to open" hint text, subtle pulse ]

-- after tap --

        [ Envelope with flap open, card peeking out ]
        [ "Pull the card" hint text ]

-- after pulling card out & tapping it --

        [ Full-screen or centered card ]
        [ "Sorry" in maroon script, large ]
        [ Short apology message below, smaller ]
        [ Tiny flower accents framing the text ]
        [ Optional: small "seal it back up" / replay icon ]
```

Keep total page height to one screen where possible (no scrolling needed) so it works cleanly when opened straight from a QR scan.

---

## 4. Animation Details

Use CSS transitions/keyframes (or a lightweight JS animation approach) — nothing heavy, no large libraries needed unless Antigravity defaults to one.

1. **Idle state (envelope closed):**
   - Envelope has a very subtle idle animation (e.g. gentle scale/breathing 1–2% every few seconds) to invite interaction.
   - "Tap to open" text has a slow opacity pulse.

2. **Envelope opening:**
   - Flap rotates open on its top edge (like a real envelope flap), using `transform-origin: top` and a rotateX or scaleY-based fold effect, ~0.6–0.8s ease.
   - Slight paper-shadow appears as it opens to add depth.

3. **Card emerging:**
   - Card slides upward/outward from inside the envelope (translateY + slight scale-up), ~0.5s ease-out, appearing to "peek out."
   - A subtle bounce/settle at the end (small overshoot with ease) feels tactile.

4. **Card opening / message reveal:**
   - On tap, the card can either:
     - (a) scale up and expand to fill more of the screen, then fade in the "Sorry" text and message with a slight staggered delay (headline first, then message ~0.2s later), or
     - (b) do a simple "book-style" flip/fold reveal if a two-panel card is used.
   - Choose whichever is simpler to implement cleanly and reliably across mobile browsers — reliability and smoothness matter more than complexity here.

5. **Flowers:**
   - Each flower doodle fades/floats in with a slight delay stagger as the page loads (not all at once).
   - Optional: very slow, subtle sway (a few degrees of rotation back and forth) using an infinite keyframe animation, at low amplitude so it reads as "gentle," not busy.

6. **Performance notes:**
   - All animations should use `transform` and `opacity` only (GPU-friendly) — avoid animating layout properties like `width`/`height`/`top` for smoothness on mobile.
   - Respect `prefers-reduced-motion`: if set, skip decorative sway/pulse animations and just fade content in.

---

## 5. Content / Copy

- Headline: **"Sorry"**
- Suggested short message (placeholder — replace with your own personal note to the teacher):
  > "I know I made a mistake, and I'm truly sorry. Thank you for your patience and for always guiding me — I'll do better."
- Keep the message short (2–4 sentences max) so it reads well inside a small card shape.
- Consider adding a small signature line at the bottom (e.g. "— [Your Name]") in a smaller script font.

---

## 6. Technical Requirements

- **Single HTML page** (inline CSS and JS is fine, or separated into `index.html`, `style.css`, `script.js` — Antigravity's default structure is fine).
- **Mobile-first**: design for a phone screen first (this is opened via QR code), then make sure it doesn't look broken on desktop/tablet — center everything with sensible max-widths.
- **No external heavy dependencies** — vanilla HTML/CSS/JS is preferred so it loads instantly on mobile data. Google Fonts import is fine (small footprint).
- **Touch-friendly**: all interactive elements (envelope, card) should have generously sized tap targets and clear `:active` feedback states.
- **Fast load**: SVGs for flowers/envelope/card instead of large images, so the page loads instantly when scanned.
- **Deployment-ready**: should be a static site (no backend needed) so it can be hosted anywhere (GitHub Pages, Netlify, Vercel) and linked to directly from the QR code.
- **Replay option**: include a subtle way to reset the animation (e.g. tap a small icon to "seal it back up") so it can be shown again without reloading the page.

---

## 7. Accessibility

- Add `alt`/`aria-label` text describing the envelope and card interactions for screen readers.
- Ensure color contrast between maroon text and cream background meets readability standards.
- Support keyboard interaction (Enter/Space to open envelope and card) in addition to tap/click.
- Respect `prefers-reduced-motion` as noted above.

---

## 8. Deliverable

A single, self-contained, deployable static webpage matching the above flow, style, and animation behavior — ready to be linked from a QR code.
