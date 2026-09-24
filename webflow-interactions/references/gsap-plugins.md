# GSAP Plugins Available in Webflow

Current GSAP: **3.15.0**. Every plugin is free, including former Club plugins
(since 3.13, April 2025).

Activate plugins in **Settings → GSAP integration** (loaded site-wide and
auto-registered), or load per page from Webflow's CDN / jsdelivr:

```html
<!-- core first, then plugins; skip core if the site toggle already loads it -->
<script src="https://cdn.prod.website-files.com/gsap/3.15.0/gsap.min.js"></script>
<script src="https://cdn.prod.website-files.com/gsap/3.15.0/ScrollTrigger.min.js"></script>
<!-- jsdelivr equivalent: https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js -->
```

File names: `ScrollToPlugin`, `DrawSVGPlugin`, `MorphSVGPlugin`, `MotionPathPlugin`,
`InertiaPlugin`, `ScrambleTextPlugin`, `TextPlugin`, `Physics2DPlugin`,
`PhysicsPropsPlugin`, `EaselPlugin`, `PixiPlugin`. All others use the bare name
(`ScrollTrigger`, `SplitText`, `Flip`, `Observer`, `CustomEase`, ...).

`gsap.registerPlugin(...)` is harmless when Webflow already registered the
plugin, and required when you loaded it yourself.

---

## Scroll

### ScrollTrigger
Trigger animations based on scroll position. Scrub, pin, snap.

```js
gsap.to(".hero-title", {
  y: -60,
  opacity: 0,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  }
});
```

Use for: reveal-on-scroll, parallax, sticky sections, progress bars.

### ScrollSmoother
Smooth scrolling wrapper. Requires ScrollTrigger.

```js
ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  effects: true,
});
```

Use for: site-wide smooth scroll (wrap entire page in two divs).

### ScrollToPlugin
Animate scroll position programmatically.

```js
gsap.to(window, { scrollTo: "#section-3", duration: 1, ease: "power2.inOut" });
```

Use for: "scroll to section" CTAs, nav links with smooth scroll.

---

## SVG

### DrawSVG
Animate SVG stroke drawing (path reveal).

```js
gsap.from(".my-path", { drawSVG: "0%", duration: 2 });
```

Use for: line drawing animations, SVG icon reveals.

### MorphSVG
Morph one SVG shape into another.

```js
gsap.to("#shape-a", { morphSVG: "#shape-b", duration: 1 });
```

Use for: icon transitions, shape-shifting loaders.

### MotionPath
Animate an element along an SVG path.

```js
gsap.to(".dot", {
  motionPath: { path: "#curve", align: "#curve" },
  duration: 3,
  ease: "none"
});
```

Use for: path-following animations, orbit effects.

---

## UI

### Flip
Animate layout changes smoothly (position/size transitions between states).

```js
const state = Flip.getState(".card");
// ... DOM change (reorder, class toggle, move element) ...
Flip.from(state, { duration: 0.5, ease: "power1.inOut" });
```

Use for: grid reordering, filter animations, expanding cards without jarring jumps.

### Draggable
Make any element draggable. Supports bounds, snap, inertia.

```js
Draggable.create(".card", {
  type: "x,y",
  bounds: ".container",
  inertia: true, // requires InertiaPlugin
});
```

Use for: drag-to-reorder, carousels, custom sliders.

### InertiaPlugin
Adds momentum/deceleration. Add `inertia: true` to Draggable, or use it on any
tween: `gsap.to(el, { inertia: { x: "auto" } })` (continues current velocity).

### Observer
Low-level pointer/touch/wheel/scroll event detection.

```js
Observer.create({
  target: window,
  type: "wheel,touch",
  onDown: () => goToPrevSection(),
  onUp: () => goToNextSection(),
});
```

Use for: full-page scroll hijacking, custom gesture detection.

---

## Text

### SplitText ⭐
Split text into chars, words, or lines for individual animation. Rewritten in
3.13: ~50% smaller, `mask`, `autoSplit` + `onSplit()`, built-in `aria` labels,
`deepSlice`. Removed: `position: "absolute"`, `lineThreshold`.

```js
// autoSplit re-splits on resize / font load; return the tween so it is cleaned up
SplitText.create(".heading", {
  type: "lines, words",
  mask: "lines",
  autoSplit: true,
  onSplit(self) {
    return gsap.from(self.lines, {
      yPercent: 100,
      stagger: 0.08,
      duration: 0.6,
      ease: "power3.out",
    });
  },
});
```

**Gotcha:** splitting by lines before the webfont loads measures fallback-font
line breaks. Use `autoSplit`, or wrap in `document.fonts.ready.then(...)`.
Call `split.revert()` before re-splitting manually.

Use for: headline reveals, character-by-character entrances, text scrambles.

### ScrambleTextPlugin
Animate text through random characters before settling on the final value.

```js
gsap.to(".label", {
  scrambleText: { text: "Hello World", chars: "lowerCase", speed: 0.5 }
});
```

Use for: loading states, glitch effects, terminal-style text.

### TextPlugin
Tween text content character by character.

```js
gsap.to(".counter", { text: "100%", duration: 2, ease: "none" });
```

Use for: typewriter effects, animated counters (text-based).

---

## Dev / Advanced

### GSDevTools
Visual GSAP timeline debugger. Add to page during development, remove before publishing.

```js
GSDevTools.create(); // opens a timeline scrubber UI in the corner
```

### Physics2D / PhysicsProps
Simulate physics (gravity, velocity, friction) on 2D elements.
Niche — use only for particle effects, falling elements, physics-based UI.

### MotionPathHelper
Visual editor for MotionPath curves during development. Remove before publishing.

### EaselPlugin / PixiPlugin
Tween EaselJS / PixiJS canvas objects. Only relevant when the page already uses those libraries.

---

## Eases

### CustomEase (+ EasePack, CustomWiggle, CustomBounce)
Define a brand-specific curve once, reuse everywhere.

```js
gsap.registerPlugin(CustomEase);
CustomEase.create("brand", "0.65, 0, 0.35, 1");
gsap.to(".card", { y: 0, ease: "brand" });
```

New in 3.15: `easeReverse` sets a separate ease for the reverse direction
(replaces the deprecated `yoyoEase`, which still works).

---

## Plugin Selection Quick Reference

| Need | Plugin |
|---|---|
| Reveal on scroll | ScrollTrigger |
| Smooth scroll | ScrollSmoother + ScrollTrigger |
| Scroll to anchor | ScrollToPlugin |
| SVG drawing | DrawSVG |
| Shape morphing | MorphSVG |
| Layout transitions | Flip |
| Drag and drop | Draggable (+Inertia) |
| Scroll hijacking / gestures | Observer |
| Text reveal by char/word | SplitText |
| Glitch / scramble text | ScrambleTextPlugin |
| Typewriter | TextPlugin |
| Custom brand curve | CustomEase |
| Debug timelines | GSDevTools |
