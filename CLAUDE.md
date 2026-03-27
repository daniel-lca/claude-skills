# Claude Code Guidelines — claude-skills

This repository contains reusable skills for Claude. Each skill is a folder with
a `SKILL.md` and optional `references/` files.

---

## Language Rule — Non-Negotiable

**Everything written to this repo must be in English.** This applies to:
- `SKILL.md` content (instructions, comments, examples, checklist items)
- All files inside `references/`
- `README.md` entries
- Git commit messages
- Code comments inside code examples embedded in skill files

The user may speak to you in Spanish, Portuguese, or English. Always respond in
whatever language they use — but every file you create or edit in this repo
must be written in English, without exception.

---

## Repo Structure

```
claude-skills/
├── CLAUDE.md              ← this file (Claude Code reads it automatically)
├── README.md              ← index of all skills with descriptions
└── {skill-name}/
    ├── SKILL.md           ← required, main skill file
    └── references/        ← optional, supplementary docs loaded on demand
        ├── patterns.md
        └── *.md
```

One folder per skill. Folder name = skill name = `name` field in SKILL.md frontmatter.

---

## SKILL.md Frontmatter — Required Fields

Every `SKILL.md` must start with this frontmatter block:

```yaml
---
name: skill-name
version: X.Y.Z
repository: https://github.com/daniel-lca/claude-skills
description: >
  One or two sentences. Must answer: when should this skill trigger?
  What does it enable Claude to do? Be specific — vague descriptions
  cause undertriggering. Make it slightly "pushy": include trigger phrases,
  contexts, and synonyms the user might say.
---
```

---

## Versioning — Semantic

Follow semantic versioning (`MAJOR.MINOR.PATCH`):

| Change type | Version bump | Example |
|---|---|---|
| New pattern, new section, new reference file | MINOR | 1.0.0 → 1.1.0 |
| Gotcha fix, wording clarification, small addition | PATCH | 1.0.0 → 1.0.1 |
| Complete restructure, breaking change in workflow | MAJOR | 1.0.0 → 2.0.0 |

---

## Changelog — Required on Every Edit

Every `SKILL.md` must have a `## Changelog` section at the bottom.
Add an entry for every version bump. Format:

```markdown
## Changelog

### vX.Y.Z — YYYY-MM-DD
- What changed and why (one line per item)

### v1.0.0 — YYYY-MM-DD
- Initial skill created
```

---

## Editing an Existing Skill

1. Clone or pull the repo to get the latest version
2. Read the current `SKILL.md` fully before making any changes
3. Make the requested edits
4. Bump the version in the frontmatter
5. Add a changelog entry at the bottom of `SKILL.md`
6. Update `README.md` if the skill's description changed
7. Commit with a clear message: `feat(webflow-interactions): add scroll reveal pattern`

---

## Creating a New Skill

1. Create a new folder: `mkdir {skill-name}`
2. Create `SKILL.md` with required frontmatter (version starts at `1.0.0`)
3. Add `references/` folder if the skill needs supplementary docs
4. Add the skill to `README.md` (name, version, one-line description)
5. Commit: `feat({skill-name}): initial skill`

---

## README.md — Keep It Updated

After any skill addition or significant update, update the skills table in
`README.md`. The table must always reflect the current version and description
of every skill in the repo. See `README.md` for the format.

---

## What Makes a Good Skill

- **SKILL.md under ~250 lines** — if growing beyond that, move content to `references/`
- **References loaded on demand** — only what's needed for the task at hand
- **No generic advice** — every rule should be specific and actionable
- **Gotchas documented** — real bugs and edge cases from actual projects
- **Patterns are complete** — code examples must be production-ready, not pseudocode
