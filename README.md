# claude-skills

Reusable skills for Claude (Chat and Claude Code). Each folder is a self-contained skill that Claude
loads on demand to handle specific workflows consistently across projects.

---

## Install & Update

Tell Claude — in Chat or in Claude Code:

> Read github.com/daniel-lca/claude-skills and install the `{skill-name}` skill.

Claude follows [INSTALL.md](./INSTALL.md), which is written for the AI and covers
both cases:

- **Chat:** Claude packages the skill and shows a file card — click **Save skill**.
  Skills saved in Chat also load in Claude Code on the same account.
- **Claude Code:** Claude clones the repo and links the skill so `git pull` keeps
  it updated.

To update, send the same message with "update" instead of "install". Check the
**Chat** column below — `Code only` skills need Claude Code on your computer.

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
