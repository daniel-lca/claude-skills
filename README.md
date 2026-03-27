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

**Update a skill:**
> "Update the `{skill-name}` skill — [describe what to add or change]"
Claude reads the current version from the repo, makes the edits, bumps the version,
and commits back.

---

## Skills

| Skill | Version | What it does |
|---|---|---|
| [webflow-interactions](./webflow-interactions/) | 1.0.0 | Custom JS and GSAP interactions for Webflow — tab switchers, accordions, sliders, modals, conditional visibility. Includes GSAP plugin reference and production-ready patterns. |

---

## Repo Guidelines

All content in this repo is written in English regardless of the language used
in conversation. See [CLAUDE.md](./CLAUDE.md) for full guidelines on creating
and editing skills.
