# AI Design Tool Prompt Guides

Tool facts verified 2026-09. These products change monthly — when a detail
(mode names, quotas, models) matters to the user, re-check the official docs.

---

## Google Stitch

### How Stitch processes input
Stitch (2.0, Gemini-powered) is an infinite canvas that accepts text, reference
images, screenshots/sketches, code, existing codebases and design files, voice,
a URL to extract a design system from, and a `DESIGN.md` file (agent-readable
design rules, exportable between projects). A design agent reasons across the
whole project; linked screens become clickable prototypes.

It still anchors heavily on reference images — the prompt directs how to
interpret and extend them. Stitch decides layout; the prompt controls aesthetic
and tone.

> **Modes and quotas vary by workspace rollout** (model picker names differ
> between accounts; credits are daily). Never quote mode names or limits —
> tell the user to check the model picker. Use the "Redesign" / image-first
> mode when starting from a screenshot or existing UI, if their picker offers it.

**Export:** Copy to Figma (editable layers, one screen at a time), HTML/CSS/
Tailwind zip, MCP server, AI Studio / Antigravity handoff.

### Prompt structure
```
Apply the visual direction from the attached reference screens to design the
[product name] UI as described in the PRD.

Visual style: [2–3 sentences — aesthetic personality, spacing philosophy,
component character. Qualitative only when no brand system exists.]

Emphasize: [3–4 specific visual traits as short phrases]

Avoid: [1–2 things that would break the direction]

Maintain consistent spacing, clear hierarchy, and a cohesive brand tone
inspired by the reference screens.
```

### Rules
- Open with "Apply the visual direction from the attached reference screens"
  when a reference is attached — Stitch anchors on the image first.
- Keep the prompt short (~120 words). Start high-level, then refine screen by screen.
- **One change per follow-up prompt** — combining requests makes Stitch rebuild
  the whole layout (official guidance).
- **Brand system exists?** Hex codes and font names are fine — better still,
  point Stitch at the brand URL or attach a `DESIGN.md` and skip restating tokens.
  **No brand system?** Stay qualitative and let Stitch derive tokens from the image.
- No screen-by-screen layout description — Stitch decides layout.
- "Avoid" clause is critical — prevents generic fallback output.
- Exploring several directions: one prompt per direction, or ask the canvas
  agent for variants ("show this screen in three color directions").

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
Lovable generates a running React app from prompts plus context. Context
channels, in order of persistence:

- **Knowledge** — workspace and project knowledge (up to 10,000 chars each),
  always included. Put the PRD summary and design guidelines here, not in every prompt.
  Root `AGENTS.md` / `CLAUDE.md` files are also read.
- **Design systems** (paid plans) — a connected design-system project supplies
  components and guidelines to every linked project.
- **Attachments** — up to 10 files per message: mockups, screenshots, PDF/Word
  briefs, spreadsheets. Figma: plugin (frames → React/Tailwind, variables →
  tokens), Figma MCP, or a dropped `.fig` file.
- **Modes** — **Plan** asks clarifying questions and writes `.lovable/plan.md`;
  **Build** (agent, default) implements, tests in a browser, and debugs.
- **Visual edits** — select / inline-text / draw / comment tools in the preview
  for small fixes without a prompt.

> **Default stack:** React (Vite), TypeScript, Tailwind CSS, **shadcn/ui**
> (Radix primitives), React Router; Supabase or Lovable Cloud for backend.
> Work with this stack, not against it.

### Prompt structure
Official guidance: **Context / Task / Guidelines / Constraints**, one meaningful
change per prompt, build by component, use real content.

```
**Context:** [product name, who it's for, which screen/flow — skip if already in Knowledge]

**Task:** Design the [screen or flow]. Screens: [list each screen by name]

**Guidelines:**
- Visual style: [1–2 sentences on aesthetic personality + design buzzwords]
- Colors: background [hex], surface [hex], primary accent [hex],
  text primary [hex], text secondary [hex]
- Typography: headings [font, weight]; body [font, size range, weight]
- Components: buttons [shape, fill, border, shadow]; cards [border, radius,
  padding]; inputs [border, radius, focus]; navigation [type + style]
- Layout: [spacing philosophy, column structure, density]

**Constraints:**
- Avoid: [what not to generate]
- Use shadcn/ui + Tailwind CSS. Mobile-first. No additional UI libraries.
- Realistic mock data, no lorem ipsum.
```

### Rules
- **Persistent specs go in Knowledge** — colors, fonts and tone set once there;
  per-prompt Guidelines then only carry what changes
- **Big or ambiguous scope → start in Plan mode**, approve the plan, then Build
- Specify hex codes for every color role when no design system is connected —
  Lovable defaults to generic blues and whites without them
- Reference specific shadcn component names (Sheet, Dialog, Accordion, etc.)
  for precise results. "No additional UI libraries" prevents MUI / Chakra imports
- Attach the mockup or screenshot when one exists — say "match the attached mockup"
- Specify exact screens — Lovable needs scope, not just "the app"
- Component descriptions must be behavioral, not decorative:
  "rounded-full, solid accent, no shadow" > "beautiful buttons"
- Specify font names explicitly — Lovable won't guess

### Example — Warm Premium for a professional discovery app (Home + Search tabs)
```
**Context:** Outside Six — professional services discovery app, iOS-style,
390px wide, Buyer role.

**Task:** Design the Home tab and Search tab.
Home: featured professionals (horizontal scroll), Recent Activity, Near You
with map pin indicators.
Search: search bar, collapsible filter panel (service type, language, price
range slider, Online Now toggle), industry chip filters (horizontal scroll),
2-column professional grid, sort dropdown, empty state with "Post a Bounty" CTA.

**Guidelines:**
- Visual style: warm editorial luxury — white surfaces, rich photography,
  refined typography; feels like a high-end magazine
- Colors: background #FAF8F5, surface #FFFFFF with border #E8E2D9,
  accent terracotta #C4622D, text #1A1612, secondary text #7C7068
- Typography: headings Playfair Display bold, tight tracking; body Inter 14–16px
- Components: buttons rounded-full, solid terracotta, no shadow; cards white,
  1px #E8E2D9 border, 16px radius, generous padding; inputs bottom border only;
  navigation bottom tab bar, 5 tabs, icon + label

**Constraints:**
- Avoid: dark backgrounds, neon accents, dense grids, lorem ipsum
- shadcn/ui + Tailwind CSS, mobile-first, no additional UI libraries
- Realistic mock data: names, roles, locations, ratings, photos
```

---

## Figma Make

### How Figma Make processes input
Figma Make is **prompt-to-app**: it outputs a working prototype / web app as
code (publishable), not Figma frames. The preview can be copied into Figma
Design as layers, but edits to those layers do not sync back to Make.

Inputs: prompt + attachments (Figma frames/components/links, images, PDFs,
MD/JSON/CSV/code files, decks, sheets — up to 10 per prompt), a Figma library
("Select a library") for style context, or a **Make kit** (npm design-system
package + library styles/variables + usage guidelines). The user can pick the
model; credit use varies by model.

**Need editable Figma frames with auto-layout and component states?** That is
the **Figma agent**, not Make — see the next section.

### Prompt structure
Official guidance: **start high-level, then add detail across follow-ups.
Layout first, then functionality.**

```
Build a [product name] [prototype / web app] — [one line: what it does, for whom].

Screens: [list screens and the main flow between them]

Design system: [use the attached kit / selected library]  OR
  [colors with hex, heading + body fonts, radius, spacing base]

Visual direction: [2–3 sentences on aesthetic]

Avoid: [what would break the direction]
```

Follow-ups, one concern per prompt:
1. Layout and hierarchy per screen
2. Interactions and states (hover, empty, loading, error)
3. Data and logic (mock data, filters, form validation)

### Rules
- **Attach instead of describing** — PRD as PDF/MD, mockups as images, frames
  as Figma links. Attach complex designs frame by frame
- **Design system:** attach a Make kit or select the library whenever the
  client has one; only spell out tokens when neither exists
- Keep the first prompt high-level — full end-to-end specs up front produce
  worse results than iterating
- Name the flow explicitly: "[Screen A] → [action] → [Screen B]"
- Ask for realistic mock data

### Example — Social media scheduling app (first prompt)
```
Build a desktop web prototype for a social media post scheduling app for
small marketing teams.

Screens: Create Post → Posts Library → Monthly Calendar. Scheduling a post
from Create Post adds it to the Library and the Calendar.

Design system: background #FFFFFF, surface #F8F9FA, accent navy #0F1C3F;
Inter 600 headings, Inter 400 14–16px body; 8px radius on components,
12px on cards; 8px spacing base; subtle shadows only.

Visual direction: clean, editorial SaaS. Generous whitespace, deep navy
accents, every interaction feels deliberate and calm.

Avoid: gradients, playful illustrations, dense dashboards.
```

---

## Figma agent (Figma Design)

### How it processes input
The Figma agent (beta, replaced First Draft in May 2026) works on the Figma
Design canvas and creates or edits **real layers** using the file's libraries,
components and variables. Steer it by @mentioning libraries, tokens and
components. Requires a Full seat on Professional / Organization / Enterprise.

Use it when the deliverable is editable Figma frames for handoff — auto-layout,
component variants, named layers.

### Prompt structure
```
Design [N] screens for [product name] using @[library name].
Frame size: [W]x[H]px.

Visual direction: [2–3 sentences on aesthetic]

SCREEN [N] — [Screen Name]
[Prose or ASCII layout of each section, top to bottom]
Use @[component] for [element]; spacing @[spacing token].

COMPONENT STATES: [component]: default, hover, active, disabled, loading

USER FLOW: [Screen A] → [action] → [Screen B]

DELIVERABLES
☐ [Screen 1 name] ([dimensions])
☐ [Screen 2 name] ([dimensions])
☐ Auto-layout on all containers
☐ Layers named by function
```

### Rules
- @mention the library and specific components/variables — the agent reuses
  them instead of drawing new shapes
- Give spatial direction per screen (ASCII sketch or ordered prose)
- List every screen in the deliverables — it won't infer extra frames
- Iterate on the same frames with follow-ups; it can re-edit its own output

---

## Variant

### How Variant processes input
Variant generates a scrollable feed of design variations (six per request)
from a single idea. The model explores — the user picks. Inputs: a short text
prompt, and optionally a reference image or an existing screen. Refinement
happens after generation with its tools (Style Dropper, Shuffle Layout, Remix
Colors, Vary Strong/Subtle). Exports HTML or React.

More text detail does not improve output — it constrains the exploration.

### Prompt structure
```
[Product concept] — [one aesthetic signal or reference]
```

That's it. One line (plus an optional reference image).

### Rules
- Keep it to one sentence, max two
- Include what the product does + one style signal
- Do not add colors, specs, or component descriptions — use a reference image
  or Style Dropper instead
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
| Validate visual direction with client, have reference images or a brand URL | Stitch |
| Generate a working React POC to test UX and interactions | Lovable |
| Interactive prototype built on the client's Figma library / Make kit | Figma Make |
| Editable Figma frames with component states and auto-layout | Figma agent (or Stitch → Copy to Figma) |
| Rapid visual exploration before committing to a direction | Variant |
| Client is non-technical, needs to see something fast | Stitch or Variant |
| Moving toward build, need functional code | Lovable |
| Figma-ready assets for developer handoff | Figma agent |
| Post-direction approval, need production-ready screens | Lovable (code) or Figma agent (design) |
