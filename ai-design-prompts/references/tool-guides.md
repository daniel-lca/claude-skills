# AI Design Tool Prompt Guides

---

## Google Stitch

### How Stitch processes input
Stitch takes a text prompt + an attached reference image (+ optionally a PRD).
It anchors heavily on the image — the prompt's job is to direct how to interpret
and extend that image, not describe the product. Stitch decides layout; the prompt
controls aesthetic and tone.

> **Note:** Image upload requires **Experimental Mode** (Gemini 2.5 Pro). Standard
> Mode is text-only. Experimental Mode has a 50 generations/month limit vs. 350 in
> Standard Mode.

### Prompt structure
```
Apply the visual direction from the attached reference screens to design the
[product name] UI as described in the PRD.

Visual style: [2–3 sentences — aesthetic personality, spacing philosophy,
component character. Qualitative only, no hex codes.]

Emphasize: [3–4 specific visual traits as short phrases]

Avoid: [1–2 things that would break the direction]

Maintain consistent spacing, clear hierarchy, and a cohesive brand tone
inspired by the reference screens.
```

### Rules
- Always open with "Apply the visual direction from the attached reference screens"
  — this is load-bearing. Stitch anchors on the image first.
- Keep under 120 words total — prompts over ~5,000 characters cause omitted components
- No hex codes, no font names — Stitch derives these from the image
- No screen-by-screen description — Stitch decides layout
- Work one screen at a time — Stitch does not reliably remember previous designs
- Make one or two adjustments per follow-up prompt, not everything at once
- "Avoid" clause is critical — prevents generic fallback output
- Each direction gets its own prompt + its own reference image

### Example — Dark Precision for a professional discovery app
```
Apply the visual direction from the attached reference screens to design the
Outside Six UI as described in the PRD.

Visual style: Dark backgrounds with precise, editorial typography. The
interface feels like a private members club — restrained, high-contrast,
with every element placed with intention.

Emphasize: near-black surfaces, tight typographic hierarchy, monochrome
palette with a single cold accent, minimal iconography, abundant whitespace.

Avoid: warm colors, gradient backgrounds, card-heavy grids, pill buttons.

Maintain consistent spacing, clear hierarchy, and a cohesive brand tone
inspired by the reference screens.
```

### Example — Warm Premium for a professional discovery app
```
Apply the visual direction from the attached reference screens to design the
Outside Six UI as described in the PRD.

Visual style: Warm editorial luxury. The interface feels like a high-end
magazine — off-whites, rich photography, and refined typography that
signals trust and premium quality.

Emphasize: warm off-white backgrounds, editorial serif headings,
photography-forward card layouts, restrained warm accent.

Avoid: dark surfaces, neon accents, dense information grids, flat iconography.

Maintain consistent spacing, clear hierarchy, and a cohesive brand tone
inspired by the reference screens.
```

---

## Lovable

### How Lovable processes input
Lovable generates functional React + Tailwind code from a text description.
It does not rely on a reference image the same way Stitch does — it builds
entirely from the prompt. Output is running code, so the prompt must be
technically specific: exact colors, font names, component behavior.

> **Default stack:** React 18 (Vite), TypeScript, Tailwind CSS, **shadcn/ui**
> (built on Radix UI primitives), React Router. Lovable uses shadcn/ui by
> default — work with this stack, not against it.

### Prompt structure
```
Design the [product name] [screen or flow] using the following visual direction.

**Visual style:** [1–2 sentences on overall aesthetic personality]

**Colors:**
- Background: [description + hex]
- Surface/cards: [description + hex]
- Primary accent: [description + hex]
- Text primary: [hex]
- Text secondary: [hex]

**Typography:**
- Headings: [font name], [weight], [style notes]
- Body: [font name], [size range], [weight]

**Components:**
- Buttons: [exact style — shape, fill, border, shadow]
- Cards: [border, radius, padding, shadow]
- Inputs: [border style, radius, focus state]
- Navigation: [type + style]

**Layout:** [spacing philosophy, column structure, density]

**Screens to generate:** [list each screen by name]

**Avoid:** [what not to generate]

Use shadcn/ui + Tailwind CSS. Mobile-first. No additional UI libraries
beyond shadcn/ui unless specified.
Include realistic mock data.
```

### Rules
- Always specify hex codes for every color role — Lovable defaults to
  generic blues and whites without them
- Lovable uses shadcn/ui by default — embrace it. Reference specific
  shadcn component names (Sheet, Dialog, Accordion, etc.) for precise results.
  Only add "No additional UI libraries" to prevent MUI or Chakra imports
- "Include realistic mock data" prevents empty placeholder states
- Specify exact screens — Lovable needs scope, not just "the app"
- Component descriptions must be behavioral, not decorative:
  "rounded-full, solid accent, no shadow" > "beautiful buttons"
- Specify font names explicitly — Lovable won't guess

### Example — Warm Premium for a professional discovery app (Home + Search tabs)
```
Design the Outside Six Home tab and Search tab for a professional
services discovery app (iOS-style, 390px wide, Buyer role).

**Visual style:** Warm editorial luxury. White surfaces, rich photography,
refined typography. Feels like a high-end magazine, not a typical app.

**Colors:**
- Background: warm off-white #FAF8F5
- Surface/cards: white #FFFFFF with border #E8E2D9
- Primary accent: deep terracotta #C4622D
- Text primary: #1A1612
- Text secondary: #7C7068

**Typography:**
- Headings: Playfair Display, bold, tight tracking
- Body: Inter, 14–16px, regular

**Components:**
- Buttons: rounded-full, solid terracotta, no shadow, no border
- Cards: white bg, 1px warm border #E8E2D9, 16px radius, generous padding
- Inputs: minimal, bottom border only, no box
- Navigation: bottom tab bar, 5 tabs, icon + label

**Home tab content:** Featured professionals (horizontal scroll),
Recent Activity section, Near You section with map pin indicators.

**Search tab content:** Search bar at top, collapsible filter panel
(service type, language, price range slider, Online Now toggle),
industry chip filters (horizontal scroll), 2-column professional grid,
sort dropdown, empty state with "Post a Bounty" CTA.

**Avoid:** dark backgrounds, neon accents, dense grids, lorem ipsum.

Use shadcn/ui + Tailwind CSS. Mobile-first. No additional UI libraries.
Include realistic mock data: names, roles, locations, ratings, photos.
```

---

## Figma Make

### How Figma Make processes input
Figma Make generates Figma frames from a detailed prompt. Unlike Stitch,
it doesn't rely on a reference image. Unlike Lovable, it outputs design
frames, not code. Prompts must be highly detailed — px measurements,
component states, auto-layout rules, named layers, and a deliverables
checklist that tells Figma Make exactly what frames to produce.

> **Expectations:** Figma Make / First Draft output is a structured starting
> point, not a pixel-perfect deliverable. Auto-layout, precise spacing, and
> component states often need manual cleanup. The detailed prompt still
> matters — it gets the output 80% there instead of 40% — but plan to refine.
> Once you make any manual edit, you lose further AI editing on that frame.

### Prompt structure
```
Design [N] screens for [product name] in Figma.

**Visual direction:** [2–3 sentences on aesthetic]

**Design system:**
- Colors: [list each role with hex]
- Typography: [heading font + weight, body font + size/weight]
- Border radius: [value per component type]
- Spacing: [base unit, padding conventions]
- Shadows: [value or "none"]

---

**SCREEN [N] — [Screen Name]** ([W]x[H]px)

[ASCII layout sketch or prose description of each section]

Component specs:
- [Component]: [px dimensions, padding, border, state behavior]
- [Component]: ...

---

[Repeat per screen]

---

**COMPONENT STATES** (generate as separate frames)
- [Component name]: default, hover, active, disabled, loading

**USER FLOW CONNECTIONS**
[Screen A] → [action] → [Screen B]

**DELIVERABLES CHECKLIST**
☐ [Screen 1 name] ([dimensions])
☐ [Screen 2 name] ([dimensions])
☐ Component library
☐ Auto-layout on all components
☐ Variant states
☐ Color and text styles
```

### Rules
- Include an ASCII sketch or clear prose layout for each screen —
  Figma Make needs spatial direction, not just content description
- List all screens in the deliverables checklist — Figma Make won't
  infer what to generate beyond what's explicitly requested
- Specify auto-layout direction and padding for every major component
- Always include component variant states as a separate ask
- Name layers meaningfully — Figma Make uses your names

### Example — Social media scheduling app (condensed)
```
Design 3 screens for a social media post scheduling app in Figma.
Desktop, 1440x1024px each.

**Visual direction:** Clean, editorial SaaS. White backgrounds, deep navy
accents, generous whitespace. Every interaction feels deliberate and calm.

**Design system:**
- Background: #FFFFFF, Surface: #F8F9FA, Accent: #0F1C3F
- Heading: Inter 600, Body: Inter 400 14–16px
- Border radius: 8px components, 12px cards, 4px inputs
- Spacing: 8px base unit, 24px section padding
- Shadows: 0 1px 3px rgba(0,0,0,0.08)

---
**SCREEN 1 — Create Post** (1440x1024)

Top: nav bar (logo left, avatar right)
Left panel (320px): post composer — textarea, platform selectors (icons),
image upload zone, character counter
Right panel: preview card showing post as it will appear

Component specs:
- Textarea: 100% width, 8px radius, 1px #E2E8F0 border, 16px padding
- Platform icons: 32px circles, selected state = navy fill
- CTA button: "Schedule Post" — 100% width, solid navy, 12px radius

---
**DELIVERABLES CHECKLIST**
☐ 01_Create_Post (1440x1024)
☐ 02_Posts_Library (1440x1024)
☐ 03_Calendar_Monthly (1440x1024)
☐ Component library with all variant states
☐ Auto-layout on all components
☐ Color and text styles library
```

---

## Variant

### How Variant processes input
Variant generates a scrollable feed of design variations from a single
idea. The model explores — the user picks. There is no detailed spec,
no color system, no component breakdown. The prompt is intentionally
minimal: one sentence that captures the concept and a high-level aesthetic
signal. More detail does not improve output — it constrains the exploration.

### Prompt structure
```
[Product concept] — [one aesthetic signal or reference]
```

That's it. One line.

### Rules
- Keep it to one sentence, max two
- Include what the product does + one style signal
- Do not add colors, specs, or component descriptions
- Do not list screens — Variant decides what to show
- Think of it as a brief for exploration, not a spec

### Examples
```
A professional services discovery app for NYC — private members club aesthetic
```
```
A voice memo app for parents to preserve memories — warm, intimate, analog feel
```
```
A dental associate hiring platform — clinical precision meets modern SaaS
```
```
A financial planning dashboard for doctors — structured authority, Bloomberg-meets-Notion
```

---

## Choosing the Right Tool

| Goal | Use |
|---|---|
| Validate visual direction with client, have reference images | Stitch |
| Generate a working React POC to test UX and interactions | Lovable |
| Need editable Figma frames with component states and auto-layout | Figma Make |
| Rapid visual exploration before committing to a direction | Variant |
| Client is non-technical, needs to see something fast | Stitch or Variant |
| Moving toward build, need functional code | Lovable |
| Need Figma-ready assets for handoff | Figma Make |
| Post-direction approval, need production-ready screens | Lovable or Figma Make |
