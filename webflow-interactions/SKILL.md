---
name: webflow-interactions
version: 1.0.0
description: >
  Use this skill whenever working on Webflow custom code — including tab switchers,
  FAQ accordions, sliders, modals, conditional visibility, scroll animations, or any
  JavaScript or GSAP interaction in a Webflow project. Triggers on any request to
  write, debug, or improve a Webflow script in Page Settings, an Embed component,
  or a self-contained Webflow section with JS behavior. Also use when deciding
  between vanilla JS and GSAP for a Webflow animation.
---

# Webflow Interactions Skill

Handles all custom code work for Webflow projects — from self-contained embed
components to page-wide scripts. Covers vanilla JS interactions and GSAP animations,
with documented patterns and known gotchas.

---

## Before Writing Any Code

### 1. Clarify placement (if not explicit, always ask)

Scripts go in one of two places:

| Placement | When to use |
|---|---|
| **Page Settings → Before `</body>`** | Script affects many elements across a page; page-level init; CMS-bound selectors |
| **Embed component (inside the section)** | Component is self-contained and will be reused across pages; CSS + JS live together |

**If the user hasn't specified — ask before writing.** One question, one decision.

### 2. Decide: vanilla JS or GSAP?

Run this check before reaching for GSAP:

```
Is the animation purely CSS-achievable (opacity, height, transform)?
  └─ Yes → vanilla JS with CSS transitions is likely enough
  └─ No (sequence, timeline, scrub, stagger, split text, etc.) → GSAP

Does it involve scroll-linked behavior?
  └─ Yes → GSAP + ScrollTrigger

Does it require animating height from `auto`?
  └─ Yes → GSAP (vanilla CSS transitions break on height: auto)

Is it a simple class toggle with a CSS transition?
  └─ Yes → vanilla JS, no GSAP needed
```

**If genuinely uncertain — ask the user before choosing.** State both options briefly and ask for confirmation.

### 3. GSAP in Webflow — critical rules

- **GSAP is included via Webflow Site Settings** (Site Settings → GSAP Integration). Toggle on Core + any plugins needed. Do not paste CDN links for GSAP or any of its plugins.
- **Plugins are auto-registered** by Webflow. Do not call `gsap.registerPlugin()` unless writing a per-page script tag outside of the site-level loader.
- **Always wrap in `DOMContentLoaded`** — Webflow loads GSAP before the DOM is ready.
- **Plugins available** (all free, activated per-site in settings): see `references/gsap-plugins.md`

```js
// Correct structure for Page Settings or Embed
<script>
  addEventListener("DOMContentLoaded", () => {
    // your GSAP code here
    // no gsap.registerPlugin() needed if activated in Site Settings
  });
</script>
```

---

## Embed Structure

### Self-contained embed (section component)

Use when: component will be reused, needs its own CSS, or must be portable.

```html
<!-- ─── STYLES ─── -->
<style>
  /* scoped to this section only */
  .my-component { ... }
</style>

<!-- ─── MARKUP ─── -->
<!-- existing Webflow elements above; embed goes here for init or extra markup -->

<!-- ─── SCRIPT ─── -->
<script>
  addEventListener("DOMContentLoaded", () => {
    // logic here
  });
</script>
```

### Page Settings script (Before `</body>`)

Use when: script targets many elements across the page, or is better kept separate from markup.

```html
<script>
  addEventListener("DOMContentLoaded", () => {
    // logic here
  });
</script>
```

---

## Element Selection

No fixed convention — choose based on context:

| Selector type | When to use |
|---|---|
| **CSS class** (`.my-element`) | Single instance per page, or visual targeting that maps to Webflow class |
| **Custom attribute** (`[data-faq="item"]`) | Repeated elements in CMS/lists where IDs would duplicate |
| **ID** (`#my-element`) | Single unique element (hero, modal overlay, one-off button) |
| **Webflow attribute** (`[fs-*]`, `[wf-*]`) | When integrating with Finsweet or Webflow-native attribute patterns |

**Key rule**: never use IDs on repeated elements (CMS items, collection list cards, slider items). Use custom attributes instead.

---

## Patterns Reference

For implementation-ready patterns with full code, see:

→ `references/patterns.md`

Covers:
- Tab switcher with animation queue
- FAQ accordion (GSAP height animation)
- Swiper.js testimonials slider with modal
- Conditional visibility (radio buttons / URL params)
- CMS card grid embeds (LinkedIn-style)

---

## Known Gotchas

### GSAP: height from `auto`

Never animate `height: 0 → auto` directly. GSAP (and CSS) can't interpolate from a computed value.

```js
// WRONG — janky close animation
gsap.to(el, { height: 0 });

// CORRECT — snapshot pixel height first
gsap.set(el, { height: el.offsetHeight }); // lock it
gsap.to(el, { height: 0, duration: 0.3, ease: "power2.inOut" });
```

### GSAP accordion: closing siblings globally

When closing open siblings in an accordion, scope to `document`, not the parent list — otherwise elements in other list instances stay open.

```js
// WRONG — only closes siblings in same parent
parentList.querySelectorAll(".faq_item.is-open")

// CORRECT — closes all open items globally
document.querySelectorAll(".faq_item.is-open")
```

### Tab switcher: rapid clicks mid-animation

Without a queue system, rapid clicks cause visual glitches (half-animated states, wrong content showing).

Pattern: store `pendingTab`, process after current animation ends.

```js
let isAnimating = false;
let pendingTab = null;

function switchTab(target) {
  if (isAnimating) { pendingTab = target; return; }
  isAnimating = true;
  // ... animate out, animate in ...
  // at end:
  isAnimating = false;
  if (pendingTab) { const next = pendingTab; pendingTab = null; switchTab(next); }
}
```

### Swiper: IDs on repeated slides

Never use `#id` selectors to grab content inside Swiper slides — IDs duplicate across cards. Use custom attributes:

```html
<!-- WRONG -->
<p id="testimonial-content">...</p>

<!-- CORRECT -->
<p testimonial-data="content">...</p>
```

```js
// Select by attribute
card.querySelector('[testimonial-data="content"]').textContent
```

### Nested `<a>` tags

HTML does not allow `<a>` inside `<a>`. This breaks layout in author rows, card CTAs, etc.

```html
<!-- WRONG -->
<a href="/profile">
  <img src="..."> John Doe
  <a href="/linkedin">LinkedIn ↗</a>  <!-- invalid -->
</a>

<!-- CORRECT — sibling anchors inside a div -->
<div class="author-row">
  <a href="/profile"><img src="..."> John Doe</a>
  <a href="/linkedin">LinkedIn ↗</a>
</div>
```

### Two-phase tab animation (display swap)

When switching visible content in tabs, swapping `display` while elements are at `opacity: 0` prevents the parent container from resizing mid-animation (flash/jump).

```
Phase 1 (200ms): fade outgoing to opacity 0
Phase 2 (swap):  display: none on outgoing / display: block on incoming (while invisible)
Phase 3 (200ms): fade incoming to opacity 1
```

### `display` snapshot instead of hardcoding

Don't hardcode `display: block` — Webflow might set elements to `flex`, `grid`, etc.

```js
// On init, snapshot the natural display value
const naturalDisplay = window.getComputedStyle(el).display;
// On show: el.style.display = naturalDisplay
// On hide: el.style.display = "none"
```

---

## Output Checklist

Before delivering any Webflow embed code:

- [ ] Wrapped in `DOMContentLoaded`
- [ ] Placement confirmed (Page Settings or Embed) — if not explicit, asked
- [ ] No GSAP CDN `<script src>` tags included
- [ ] No duplicate IDs on repeated elements
- [ ] Rapid-click / mid-animation edge cases handled (if interactive)
- [ ] GSAP height animations use `offsetHeight` snapshot, not `auto`
- [ ] CSS and JS in same block if it's a self-contained embed
- [ ] Script placed before `</body>` if Page Settings
---

## Changelog

### v1.0.0 — 2026-03-27
- Initial skill created
- Patterns: tab switcher, FAQ accordion (GSAP), Swiper+modal, conditional visibility, CMS card grid
- GSAP plugins reference (all 14 plugins available in Webflow as of April 2025)
- Gotchas: height auto, global accordion scope, animation queue, attribute selectors, nested anchors, display snapshot
- Decision tree: JS vs GSAP, placement (Page Settings vs Embed)
