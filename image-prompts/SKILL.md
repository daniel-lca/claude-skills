---
name: image-prompts
version: 1.3.1
repository: https://github.com/daniel-lca/claude-skills
description: >
  Use this skill whenever asked to write or optimize a prompt for AI image
  generation. Triggers on requests mentioning Gemini image generation, Nano
  Banana (2, Pro, Lite), OpenAI image generation, GPT Image, gpt-image-2.5,
  ChatGPT Images, or legacy names like GPT-4o image and DALL-E, or any similar
  image model. Also use when the user says "generame un prompt para generar
  una imagen", "prompt para gemini", "prompt para dalle", or asks to create,
  edit, or iterate on an image using an AI model. The skill translates a
  visual idea into the correct prompt structure for the specific model, since
  Gemini and OpenAI handle image prompts differently.
---

# Image Prompts Skill

Translates a visual idea into an optimized prompt for the requested AI image
model. Gemini (Nano Banana) and OpenAI image models process prompts differently
and reward different prompt structures.

---

## How It Works

1. **Identify the model** — Gemini/Nano Banana or OpenAI (GPT Image 2.5 / ChatGPT Images). "DALL-E" requests get a GPT Image prompt — DALL-E is retired
2. **Identify the use case** — generation from scratch, or editing an existing image
3. **Check for visual style** — see below
4. **Apply the model-specific structure** from `references/model-guides.md`
5. **Deliver the prompt ready to paste**

If the model is not specified, ask one question:
> "Is this for Gemini (Nano Banana) or OpenAI?"

If the visual intent is too vague to work with, ask one question:
> "What's the subject, and what style or mood are you going for?"

### Visual style check

If the user's request does not clearly imply a visual style (e.g. no mention of
photography, illustration, painting, etc.), ask before writing:

> "What style should the image be? For example: photo-realistic, illustration,
> digital art, watercolor, flat design, abstract, sketch — or should I decide
> based on the context?"

**Styles that count as explicit** (no need to ask):
- Photography / photo-realistic / cinematic
- Illustration / cartoon / anime / comic
- Painting (oil, watercolor, acrylic, gouache)
- 3D render / CGI
- Flat design / vector / icon
- Abstract / generative / glitch
- Sketch / line art / pencil drawing

**When to let the AI decide:** if the user says "you decide" or "based on context",
infer the most fitting style from the subject matter and include it explicitly in
the prompt anyway — never leave style undefined in the output.

---

## Model Profiles (quick reference)

Full structures and examples in `references/model-guides.md`.

| Model | Strengths | Prompt style |
|---|---|---|
| **Gemini / Nano Banana** (NB2, Pro, Lite) | Character consistency (character reference slots), text in images, up to 14 reference images, one-shot editing, Google Search grounding, extreme aspect ratios (NB2) | Descriptive prose, scene-first, explicit style qualifiers, positive phrasing instead of negatives, iterative editing via follow-up prompts |
| **OpenAI (GPT Image 2.5 Flare / Sunburst)** | Strong text rendering, reference-based edits, transparent backgrounds (API), custom sizes up to 4K, illustration and concept art | Intended use first, then Scene / Subject / Details / Constraints; explicit exclusions; one change per edit turn |

---

## Universal Rules (apply to all models)

- **Subject before style** — describe what's in the image before how it looks
- **Be specific with scale and framing** — "close-up portrait" vs "wide establishing shot"
- **Name the medium** — "oil painting", "product photography", "flat vector illustration"
- **Specify lighting** — "golden hour", "studio lighting", "overcast diffused light"
- **Include aspect ratio** when the platform supports it — 16:9, 1:1, 9:16, 4:3
- **For editing:** describe only what to change, not the whole image again
- **Negatives are model-specific** — Gemini: describe what you DO want ("an empty street", not "no cars"). OpenAI: explicit exclusions are recommended ("No extra text, no watermarks")
- **Model IDs rotate** — the lineup in `references/model-guides.md` was verified 2026-09; re-check official docs before putting an API model ID in code

---

## Changelog

### v1.3.1 — 2026-09-24
- Removed the per-skill Update section; install and update instructions now live in the repo README (single source, Chat + Code)

### v1.3.0 — 2026-09-24
- Gemini: new four-model table (NB2, Pro, NB2 Lite, legacy 2.5 shutting down 2026-10-02); dropped shut-down `-preview` IDs
- Gemini: per-model resolutions, aspect ratios and reference-image slots; Search / Image Search grounding; semantic-negative and text-first tips
- OpenAI: replaced GPT-4o / DALL-E 3 with GPT Image 2.5 Flare / Sunburst; DALL-E marked retired; deprecation dates for gpt-image-1 family
- OpenAI: official Scene / Subject / Details / Constraints structure, current API parameters (quality, size, background, output_format, moderation)
- Made the negatives rule model-specific; marked unsourced model rankings as heuristics

### v1.2.0 — 2026-03-27
- Added visual style check step: ask for style (photo, illustration, painting, abstract, etc.) if not implied by the request
- Listed styles that count as explicit (no need to ask)
- Added rule: when user delegates style to AI, still infer and state it explicitly in the output

### v1.1.0 — 2026-03-27
- Gemini: added full model family table (Nano Banana, Pro, and 2), 4K output, 14 reference images
- OpenAI: corrected text rendering comparison — GPT-4o is now strong at text, not weak
- OpenAI: added transparent background support documentation for GPT-4o
- OpenAI: added DALL-E 3 API parameters (quality, style, size)
- Updated model selection table with nuanced text rendering and transparent bg rows

### v1.0.0 — 2026-03-27
- Initial skill created
- Covers: Gemini / Nano Banana, OpenAI (GPT-4o / DALL-E 3)
- Full structures and examples in references/model-guides.md
