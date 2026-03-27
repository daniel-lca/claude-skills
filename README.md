# claude-skills

Reusable skills for Claude Code. Each folder is a self-contained skill that Claude
loads on demand to handle specific workflows consistently across projects.

---

## How to Use

**Install a skill in Claude Code:**
```bash
# From the repo root, symlink to your Claude Code skills directory
ln -s $(pwd)/{skill-name} ~/.claude/skills/{skill-name}
```

**Load a skill in claude.ai (any session):**
> "Clone github.com/daniel-lca/claude-skills and load the `{skill-name}` skill"

**Keep a skill up to date in Claude Code:**
```bash
# If using symlinks, just pull — the link already points to the latest files
git pull

# If you copied the folder instead, re-run the symlink to switch to auto-updates
ln -sf $(pwd)/{skill-name} ~/.claude/skills/{skill-name}
```

---

## Skills

| Skill | Version | What it does |
|---|---|---|
| [webflow-interactions](./webflow-interactions/) | 1.0.0 | Custom JS and GSAP interactions for Webflow — tab switchers, accordions, sliders, modals, conditional visibility. Includes GSAP plugin reference and production-ready patterns. |
| [ai-design-prompts](./ai-design-prompts/) | 1.2.0 | Optimizes prompts for AI-assisted design tools — Stitch, Lovable, Figma Make, and Variant. Translates design intent into the correct format for each platform since each processes input differently. |
| [image-prompts](./image-prompts/) | 1.2.0 | Optimizes prompts for AI image generation — Gemini / Nano Banana and OpenAI (GPT-4o / DALL-E 3). Covers generation from scratch, image editing, iterative refinement, and visual style selection with model-specific structures. |

---

## Repo Guidelines

All content in this repo is written in English regardless of the language used
in conversation. See [CLAUDE.md](./CLAUDE.md) for full guidelines on creating
and editing skills.
