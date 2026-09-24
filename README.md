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

**On Windows** (`ln -s` in Git Bash copies instead of linking), use a directory
junction from PowerShell so `git pull` keeps the installed skill current:
```powershell
Remove-Item "$env:USERPROFILE\.claude\skills\{skill-name}" -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills\{skill-name}" -Target "$PWD\{skill-name}"
```
A copied folder does not update on pull and drifts from the repo. Never edit
an installed copy directly — edit the repo and re-sync.

---

## Skills

| Skill | Version | What it does |
|---|---|---|
| [webflow-interactions](./webflow-interactions/) | 1.1.0 | Custom JS and GSAP interactions for Webflow — tab switchers, accordions, sliders, modals, conditional visibility. Native IX3-first decision tree, GSAP 3.15 loading rules and plugin reference, production-ready patterns. |
| [webflow-scripts](./webflow-scripts/) | 1.0.0 | Manage a project's Webflow custom-code workspace — folder layout, single-file naming, start/end identifier comments, sparse-comments rule, reference-doc template, the 50K-character Webflow limit with safe AST-based minification, opt-in live-sync, and script discovery on new projects. |
| [webflow-project](./webflow-project/) | 1.0.0 | Organize a Webflow project folder — canonical layout (assets/, docs/, cms/, webflow-scripts/, archive/, .claude/), audit for stray root files, ASK-driven rename + classification workflow (bulk / by-cluster / file-by-file), and retrofit Claude infrastructure (CLAUDE.md, .claude/). Triggers only on explicit user request. |
| [ai-design-prompts](./ai-design-prompts/) | 1.3.0 | Optimizes prompts for AI-assisted design tools — Stitch, Lovable, Figma Make, the Figma agent, and Variant. Translates design intent into the correct format for each platform since each processes input differently. |
| [image-prompts](./image-prompts/) | 1.3.0 | Optimizes prompts for AI image generation — Gemini / Nano Banana (2, Pro, Lite) and OpenAI (GPT Image 2.5). Covers generation from scratch, image editing, iterative refinement, and visual style selection with model-specific structures. |
| [opencode-plan](./opencode-plan/) | 2.0.0 | Writes a self-contained root `PLAN.md` for plain OpenCode (GO models) — only on explicit request. Covers session protocol, per-step Claude/OpenCode routing, verify-don't-assume model picks, writing rules, and post-execution audit. |
| [anti-negation](./anti-negation/) | 1.1.0 | Blocks contrastive-negation patterns ("it's not just X, it's Y", "not A but B", "more than X — it's Y", "No more X. No more Y.") — the #1 tell of AI-generated writing. Applies on any prose generation or humanize/review request, and provides drop-in prompt snippets plus a full draft-audit workflow. |
| [lowcode-html-drop](./lowcode-html-drop/) | 1.0.0 | Builds self-contained LOW / CODE branded HTML documents (client deliverables and internal reports) that survive the view.lowc.dev viewer shell. Ten hard rules, two starter templates, and a zero-dependency verifier script. |

---

## Repo Guidelines

All content in this repo is written in English regardless of the language used
in conversation. See [CLAUDE.md](./CLAUDE.md) for full guidelines on creating
and editing skills.
