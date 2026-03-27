---
name: image-prompts
version: 1.1.0
repository: https://github.com/daniel-lca/claude-skills
description: >
  Use this skill whenever asked to write or optimize a prompt for AI image
  generation. Triggers on requests mentioning Gemini image generation, Nano
  Banana, OpenAI image generation, GPT-4o image, DALL-E, or any similar
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

## If Asked to Update This Skill Manually

A manual update request usually means the symlink that keeps this skill in sync
with the repo is not set up or is broken.

**In a terminal (Claude Code CLI):** Check whether the symlink exists:

```bash
ls -la ~/.claude/skills/
```

If it's missing or pointing to the wrong location, recreate it from the repo root:

```bash
ln -sf "$(pwd)/image-prompts" ~/.claude/skills/image-prompts
```

**In Claude Desktop:** Symlinks can't be verified from here. Instead, present
this `.skill` file directly in the chat — the install button will appear and
the user can reinstall it cleanly from source.

---

## How It Works

1. **Identify the model** — Gemini/Nano Banana or OpenAI (GPT-4o / DALL-E 3)
2. **Identify the use case** — generation from scratch, or editing an existing image
3. **Apply the model-specific structure** from `references/model-guides.md`
4. **Deliver the prompt ready to paste**

If the model is not specified, ask one question:
> "Is this for Gemini (Nano Banana) or OpenAI?"

If the visual intent is too vague to work with, ask one question:
> "What's the subject, and what style or mood are you going for?"

---

## Model Profiles (quick reference)

Full structures and examples in `references/model-guides.md`.

| Model | Strengths | Prompt style |
|---|---|---|
| **Gemini / Nano Banana** | Character consistency, precise text in images, multi-image blending, one-shot editing, real-world knowledge grounding | Descriptive prose, scene-first, explicit style qualifiers, supports iterative editing via follow-up prompts |
| **OpenAI (GPT-4o / DALL-E 3)** | Artistic styles, illustration, concept art, strong composition control, transparent backgrounds (GPT-4o), much improved text rendering (GPT-4o) | Structured with style block, medium, lighting, and mood. DALL-E 3 responds well to detailed natural language |

---

## Universal Rules (apply to all models)

- **Subject before style** — describe what's in the image before how it looks
- **Be specific with scale and framing** — "close-up portrait" vs "wide establishing shot"
- **Name the medium** — "oil painting", "product photography", "flat vector illustration"
- **Specify lighting** — "golden hour", "studio lighting", "overcast diffused light"
- **Include aspect ratio** when the platform supports it — 16:9, 1:1, 9:16, 4:3
- **For editing:** describe only what to change, not the whole image again
- **Avoid negatives** — "no shadows" rarely works; describe what you DO want instead

---

## Changelog

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
