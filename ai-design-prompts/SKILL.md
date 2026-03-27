---
name: ai-design-prompts
version: 1.2.0
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
2. **Check product context availability** — does the tool already have the PRD
   or enough product context loaded? Ask one question:
   > "Does [tool] already have your PRD or product description loaded, or should
   > I include that context in the prompt?"
3. **Extract the design intent** from whatever context the user provides:
   PRD, screen description, visual reference, style direction, or prior conversation
4. **Adjust prompt density based on context level** (see table below)
5. **Apply the tool-specific prompt format** from `references/tool-guides.md`
6. **Deliver the prompt ready to paste** — no extra explanation needed unless asked

### Context decision flow

| Tool has PRD / product context? | User provided enough detail? | Action |
|---|---|---|
| Yes | — | Prompt focuses on **visual direction only** — no product description needed |
| No | Yes (user gave product details) | Embed a concise product summary + key screens/flows in the prompt |
| No | No | Ask: "Can you give me a brief description of the product and the screens you need?" |

### Asking questions

If the target tool is not specified, ask:
> "Which tool is this for — Stitch, Lovable, Figma Make, or Variant?"

If context is insufficient (no PRD in tool AND user hasn't described the product), ask:
> "Can you give me a brief description of the product and the visual style you're going for?"

Never ask more than one question at a time. One question, then build.

---

## Tool Profiles (quick reference)

Full prompt structures and examples in `references/tool-guides.md`.

| Tool | Input model | PRD support | Prompt style |
|---|---|---|---|
| **Stitch** | Text prompt + reference image → UI screens | Yes — can attach PRD separately | Short, qualitative, style-only when PRD is attached. Include product summary if not. |
| **Lovable** | Text prompt → functional React + shadcn/ui code | No — everything goes in the prompt | Structured, technical. Must include product context + visual specs in the same prompt. |
| **Figma Make** | Text prompt → Figma frames | No — prompt-only | Detailed layout specs with product context embedded. Output is a starting point — plan to refine. |
| **Variant** | Single idea → scrollable design feed | No — minimal input by design | One short sentence. Product concept + one aesthetic signal. That's it. |

---

## Universal Rules (apply to all tools)

- Never use vague qualifiers without a concrete anchor:
  "modern" → "editorial, tight tracking, generous whitespace"
  "clean" → "white surfaces, 1px borders, no shadows"
  "professional" → "structured hierarchy, muted palette, high information density"
- **If the tool has the PRD:** do not repeat product functionality in the prompt —
  focus only on visual direction. Restating the PRD wastes tokens and can confuse the tool.
- **If the tool does NOT have the PRD:** include a concise product summary (what it does,
  who it's for, key screens/flows) at the top of the prompt before visual direction.
  Keep it factual and short — enough for the tool to understand scope, not a full spec.
- Always include an "Avoid" clause — it prevents the tool from reverting to generic defaults
- Match prompt length to tool expectations: Stitch = short, Lovable = medium, Figma Make = long

---

## Changelog

### v1.2.0 — 2026-03-27
- Added PRD/context availability check as step 2 in workflow
- Replaced absolute "never describe product functionality" rule with conditional logic
- Added context decision flow table (PRD in tool? User provided detail? → action)
- Tool profiles table now includes PRD support column per tool
- Lovable, Figma Make, and Variant prompts now include product context when no PRD is loaded

### v1.1.0 — 2026-03-27
- Lovable: updated to reflect shadcn/ui as default stack — "No external UI libs" replaced with shadcn-aware guidance
- Stitch: added Experimental Mode requirement for image uploads, prompt length warning, incremental editing tips
- Figma Make: added expectations note — output is a starting point, not pixel-perfect

### v1.0.0 — 2026-03-27
- Initial skill created
- Covers: Stitch, Lovable, Figma Make, Variant
- Full prompt structures and examples in references/tool-guides.md
