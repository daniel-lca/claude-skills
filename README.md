# claude-skills

Reusable skills for Claude (Chat and Claude Code). Each folder is a self-contained skill that Claude
loads on demand to handle specific workflows consistently across projects.

---

## Install & Update

Check the **Chat** column in the [Skills](#skills) table first. Skills marked
"Code only" work on local files and do nothing useful in claude.ai.

### Option A — Claude app (Chat) — easiest, also works in Claude Code

1. Download this repo: green **Code** button → **Download ZIP** → extract it
2. Right-click the skill's folder (e.g. `lowcode-html-drop`) → compress it to a
   `.zip`. The zip must contain the folder itself, with `SKILL.md` inside it
3. In claude.ai: **Customize → Skills → + → Create skill → Upload a skill**,
   select the zip
4. Code execution must be on: **Settings → Capabilities** (Team/Enterprise:
   an owner enables it in **Organization settings → Plugins & skills**)

Skills uploaded here also load in Claude Code when you sign in with the same
account — no second install needed.

**Update:** uploads do not follow the repo. When the version in the table below
is newer than yours, repeat steps 1–3 with the new zip.

### Option B — Claude Code from the repo — auto-updates on `git pull`

Clone the repo once, then link each skill into `~/.claude/skills/`:

```bash
# Mac / Linux
ln -s "$(pwd)/{skill-name}" ~/.claude/skills/{skill-name}
```

```powershell
# Windows (PowerShell) — Git Bash's ln -s copies instead of linking
New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills\{skill-name}" -Target "$PWD\{skill-name}"
```

**Update:** `git pull`. A copied folder does not update and drifts from the
repo — replace it with a link. Never edit an installed copy directly.

Use one option per skill. A skill uploaded in Chat AND linked locally loads twice
in Claude Code.

### Option C — whole team (Team / Enterprise admins)

**Organization settings → Plugins & skills → Add** → upload the zip. Every
member gets it in Chat and Claude Code, and re-uploading a new version updates
everyone.

---

## Skills

| Skill | Version | Chat | What it does |
|---|---|---|---|
| [webflow-interactions](./webflow-interactions/) | 1.1.1 | Yes | Custom JS and GSAP interactions for Webflow — tab switchers, accordions, sliders, modals, conditional visibility. Native IX3-first decision tree, GSAP 3.15 loading rules and plugin reference, production-ready patterns. |
| [webflow-scripts](./webflow-scripts/) | 1.0.1 | Code only | Manage a project's Webflow custom-code workspace — folder layout, single-file naming, start/end identifier comments, sparse-comments rule, reference-doc template, the 50K-character Webflow limit with safe AST-based minification, opt-in live-sync, and script discovery on new projects. |
| [webflow-project](./webflow-project/) | 1.0.1 | Code only | Organize a Webflow project folder — canonical layout (assets/, docs/, cms/, webflow-scripts/, archive/, .claude/), audit for stray root files, ASK-driven rename + classification workflow (bulk / by-cluster / file-by-file), and retrofit Claude infrastructure (CLAUDE.md, .claude/). Triggers only on explicit user request. |
| [ai-design-prompts](./ai-design-prompts/) | 1.3.1 | Yes | Optimizes prompts for AI-assisted design tools — Stitch, Lovable, Figma Make, the Figma agent, and Variant. Translates design intent into the correct format for each platform since each processes input differently. |
| [image-prompts](./image-prompts/) | 1.3.1 | Yes | Optimizes prompts for AI image generation — Gemini / Nano Banana (2, Pro, Lite) and OpenAI (GPT Image 2.5). Covers generation from scratch, image editing, iterative refinement, and visual style selection with model-specific structures. |
| [opencode-plan](./opencode-plan/) | 2.0.0 | Code only | Writes a self-contained root `PLAN.md` for plain OpenCode (GO models) — only on explicit request. Covers session protocol, per-step Claude/OpenCode routing, verify-don't-assume model picks, writing rules, and post-execution audit. |
| [anti-negation](./anti-negation/) | 1.1.0 | Yes | Blocks contrastive-negation patterns ("it's not just X, it's Y", "not A but B", "more than X — it's Y", "No more X. No more Y.") — the #1 tell of AI-generated writing. Applies on any prose generation or humanize/review request, and provides drop-in prompt snippets plus a full draft-audit workflow. |
| [lowcode-html-drop](./lowcode-html-drop/) | 1.0.0 | Yes | Builds self-contained LOW / CODE branded HTML documents (client deliverables and internal reports) that survive the view.lowc.dev viewer shell. Ten hard rules, two starter templates, and a zero-dependency verifier script. |

---

## Repo Guidelines

All content in this repo is written in English regardless of the language used
in conversation. See [CLAUDE.md](./CLAUDE.md) for full guidelines on creating
and editing skills.
