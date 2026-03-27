---
name: ai-design-prompts
version: 1.1.0
repository: https://github.com/daniel-lca/claude-skills
description: >
  Use this skill whenever asked to write or optimize a prompt for an AI-assisted
  design tool. Triggers on any request mentioning Stitch, Lovable, Figma Make,
  Variant, or any similar UI generation platform. Also use when the user says
  "prompt para stitch", "prompt para lovable", "generame un prompt para X tool",
  or asks to prepare a vibe-coding or AI design generation prompt. The skill
  translates a design intent into the correct prompt format for the specific tool,
  since each platform processes input differently and requires a distinct structure
  to produce good results.
---

# AI Design Prompts Skill

Translates a design intent into an optimized prompt for the requested AI design
tool. Each platform has a fundamentally different input model — what works in
Stitch breaks in Lovable, and vice versa. This skill handles the translation.

---

## How It Works

When the user asks for a prompt for a specific tool:

1. **Identify the target tool** — Stitch, Lovable, Figma Make, or Variant
2. **Extract the design intent** from whatever context the user provides:
   PRD, screen description, visual reference, style direction, or prior conversation
3. **Apply the tool-specific prompt format** from `references/tool-guides.md`
4. **Deliver the prompt ready to paste** — no extra explanation needed unless asked

If the target tool is not specified, ask one question:
> "Which tool is this for — Stitch, Lovable, Figma Make, or Variant?"

If context is thin (no PRD, no style description, no reference), ask one question:
> "Can you give me a brief description of the product and the visual style you're going for?"

Never ask both at once. One question, then build.

---

## Tool Profiles (quick reference)

Full prompt structures and examples in `references/tool-guides.md`.

| Tool | Input model | Prompt style |
|---|---|---|
| **Stitch** | Text prompt + reference image → UI screens | Short, qualitative, style-only. Always opens with "Apply the visual direction from the attached reference screens..." |
| **Lovable** | Text prompt → functional React + shadcn/ui code | Structured, technical. Requires hex codes, font names, component behavior specs. Works with shadcn/ui default stack |
| **Figma Make** | Text prompt → Figma frames | Detailed layout specs: px measurements, component states, auto-layout rules, deliverables checklist. Output is a starting point — plan to refine |
| **Variant** | Single idea → scrollable design feed | One short sentence. Intentionally minimal — Variant explores, the user picks |

---

## Universal Rules (apply to all tools)

- Never use vague qualifiers without a concrete anchor:
  "modern" → "editorial, tight tracking, generous whitespace"
  "clean" → "white surfaces, 1px borders, no shadows"
  "professional" → "structured hierarchy, muted palette, high information density"
- Never describe product functionality — assume the tool has the PRD
- Always include an "Avoid" clause — it prevents the tool from reverting to generic defaults
- Match prompt length to tool expectations: Stitch = short, Lovable = medium, Figma Make = long

---

## Changelog

### v1.1.0 — 2026-03-27
- Lovable: updated to reflect shadcn/ui as default stack — "No external UI libs" replaced with shadcn-aware guidance
- Stitch: added Experimental Mode requirement for image uploads, prompt length warning, incremental editing tips
- Figma Make: added expectations note — output is a starting point, not pixel-perfect

### v1.0.0 — 2026-03-27
- Initial skill created
- Covers: Stitch, Lovable, Figma Make, Variant
- Full prompt structures and examples in references/tool-guides.md
