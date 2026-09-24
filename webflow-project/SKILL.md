---
name: webflow-project
version: 1.0.1
repository: https://github.com/daniel-lca/claude-skills
description: >
  Use this skill for organizing a Webflow project folder — bootstrapping the
  canonical layout (assets/, docs/, cms/, webflow-scripts/, .claude/,
  CLAUDE.md, plus project-specific workspace folders), auditing an existing
  project for stray root files and misnamed folders, classifying assets
  into the right folder, retrofitting Claude infrastructure (CLAUDE.md,
  .claude/), and renaming files with a consistent kebab-case convention.
  Triggers ONLY on explicit user request: "organize this project", "clean
  up this folder", "set up a new Webflow project", "scaffold this project",
  "where should this file go", "rename these files", "I have a bunch of
  unsorted assets", "this project is a mess", or any direct request about
  the project's folder structure. Does NOT activate passively during
  unrelated work. When file names are ambiguous, this skill MUST ask the
  user — never guesses silently. Complementary to `webflow-scripts`
  (governs the scripts subfolder) and `webflow-interactions` (governs JS
  authoring).
---

# Webflow Project Skill

Project-level folder organization for Webflow workspaces. Bootstraps new
projects, audits existing ones for stray files and non-canonical folders,
and runs an ASK-driven rename + classify workflow whenever filenames are
ambiguous. Sibling to `webflow-scripts` (which governs one subfolder) and
`webflow-interactions` (which governs JS authoring).

---

## When this applies

Fires **only on explicit user request**. Trigger phrases include:

- "organize this project" / "clean up this folder" / "this project is a mess"
- "set up a new Webflow project" / "scaffold this project"
- "where should this file go" / "rename these files"
- "I have a bunch of unsorted assets"

Does NOT activate passively during unrelated work. Defer to `webflow-scripts`
for anything inside the scripts subfolder, and to `webflow-interactions` for
decisions about how to write the JS itself.

---

## Canonical Layout

```
<Project>/
├── .claude/                Claude config (settings, API keys, IDs ref)
├── CLAUDE.md               project guide
├── assets/                 all visual assets (images, SVGs, logos, icons)
│   ├── team-members/       optional subfolder when count justifies
│   ├── icons/              optional subfolder
│   └── ...
├── docs/                   reference material (briefs, specs, API refs,
│                           PDFs, contracts, design exports)
├── cms/                    CMS exports, schema, migration data (when the
│                           project does CMS work — always at root)
├── webflow-scripts/        custom scripts workspace (project-prefixed
│                           names allowed, e.g. clinicalfit-webflow-scripts/)
├── archive/                backup variants and superseded copies
└── <feature-workspace>/    project-specific (e.g. blog/, fitcheck/,
                            scripts/, squarespace-migration/)
```

Naming rules:

- **lowercase kebab-case** for all folder names.
- **No numeric prefixes** (no `01 -`, `02 -`, etc.).
- **No dedicated `psds/` folder.** Design source files go in `assets/` or
  `docs/` based on whether they're shipped assets or reference material.
- `cms/` is always at root (lowercase) — never inside `docs/`.

Full per-folder definitions: `references/folder-scaffold.md`.

---

## Zero Stray Files at Root

Root holds only:

- `CLAUDE.md` / `AGENTS.md`
- `README.md`
- `.gitignore`
- `package.json` (if Node tooling lives at root)

Everything else belongs in one of the canonical folders. Treat any other
root file as a candidate for moving — but always ASK before moving anything.

---

## Bootstrapping a New Project

When the user says "set up", "scaffold", or "new Webflow project":

1. Create the default set: `assets/`, `docs/`, `.claude/`, and a `CLAUDE.md`
   skeleton (Project overview, Key Reference, optional Custom Scripts).
2. Offer `cms/` and `webflow-scripts/` as opt-ins — confirm before creating.
3. Do not create empty `<feature-workspace>/` folders. They emerge from
   actual work.

Do not bootstrap quietly. Each folder created should be listed back to the
user in the response.

---

## Auditing an Existing Project

When the user says "organize this", "clean this up", or "this is a mess":

1. One-pass scan of the root and one level deep.
2. Produce a punch list:
   - Files at root that should move
   - Folders with non-canonical names (e.g. `Page Assets/` → `assets/`,
     `Events Categories Icons/` → `assets/icons/`, `images/` + `team-members/`
     → consolidate into `assets/team-members/`)
   - Stray backups, screenshots, timestamped dumps
   - Duplicate files (same content in root + a folder)
3. Ask how to proceed using the three batch modes (see Renaming below).

---

## CMS Folder

When the project does CMS work (Webflow exports, schema, migration scripts,
data dumps), create `cms/` at the root. Never put CMS assets inside `docs/`
or scatter them in a `feature-workspace/` subfolder.

---

## Backups + Variants

Pattern seen: `simini.com - BAK`, `clinicalfit-webflow-scripts - backup/`.
Move these into `archive/` at the project root. Lowercase, not numbered, not
hidden — easy to find when needed, easy to ignore otherwise.

Confirm with the user the first time per project, then stick with the choice.

---

## Renaming + Classification

Full procedure in `references/rename-workflow.md`. Short version:

For each ambiguous filename:
1. Classify by extension + a small content peek (first 1–2 KB for text,
   dimensions / EXIF for images, magic bytes for binaries).
2. If still ambiguous → ASK.

When MANY ambiguous files exist (≥ 5 in one batch), offer three modes:

| Mode | When to suggest |
|---|---|
| **Bulk by extension** ("Move all 14 PDFs to `docs/`?") | All files share a clear type → fastest path |
| **By type / cluster** ("Tell me what these 8 PNGs are — mockups? bugs? brand?") | Mixed screenshot-ish batch — group by visual cluster, ask once per cluster |
| **File by file** | Fewer than 5 unclear files remaining, or genuinely heterogeneous batch |

Default suggestion: mode (a) for clear types, mode (b) for mixed batches,
mode (c) for the long tail. **Never rename or move silently** — every action
must be either user-confirmed or part of a batch the user approved.

---

## File Naming Convention

Inside any folder:

- **kebab-case** (`hero-image-desktop.jpg`)
- Descriptive of subject + variant + breakpoint:
  `team-andrew-v2.jpg`, `home-hero-desktop.jpg`, `logo-mark.svg`
- `-v1`, `-v2` for iterations.
- `-desktop`, `-mobile`, `-tablet` for responsive variants.
- Avoid spaces, parentheses, non-ASCII unless the source asset is foreign
  and the name should stay.
- Rename timestamped names (`Captura de pantalla_24-4-2026_*.jpeg`) to
  something descriptive. If you can't tell what the file is — ASK.

---

## Cleanup Hygiene

Flag (never auto-delete) the following — surface as part of an audit punch
list, always confirm with user before removing:

- `.playwright-mcp/` debug logs older than 7 days.
- `.sisyphus/` debris from completed plans.
- Worktree leftovers under `.claude/worktrees/`.
- Exact-duplicate files (same content in root + a folder).

---

## Project Doc Retrofitting

When the project lacks `CLAUDE.md` / `.claude/` and the user asks to "set up
Claude" or "add a project guide", offer this skeleton for `CLAUDE.md`:

```markdown
# CLAUDE.md

Guidance for Claude Code working in this repository.

## Project

<one paragraph: what this project is, what it does, where it lives.>

## Key Reference

<links to API docs, credentials file in .claude/, brand assets, etc.>

## Custom Scripts

Site custom scripts live in `webflow-scripts/`. Conventions governed by the
`webflow-scripts` skill (github.com/daniel-lca/claude-skills). Read the
skill before editing anything in the folder.

<add other project-specific sections as needed: blog migration tool,
CMS API patterns, etc.>
```

Only include the "Custom Scripts" section if a scripts folder exists or will
be created. Don't generate sections speculatively.

---

## Cross-Skill Coordination

- Inside `webflow-scripts/` → defer to the `webflow-scripts` skill.
- Writing or debugging JS → defer to `webflow-interactions`.
- This skill stays on the project folder as a whole. Don't duplicate rules
  from the other two — link to them.

---

## Output Checklist

Before applying any project-level change:

- [ ] User explicitly asked for organization / cleanup / scaffolding
- [ ] Every move / rename is in a batch the user approved
- [ ] No silent guesses on ambiguous filenames — asked instead
- [ ] No deletions without explicit user confirmation
- [ ] New folders use lowercase kebab-case, no numeric prefixes
- [ ] CMS work lives in `cms/` at root, not nested
- [ ] Backups consolidated into `archive/`, not scattered as siblings

---

## Changelog

### v1.0.1 — 2026-09-24
- Removed the per-skill Update section; install and update instructions now live in the repo README (single source, Chat + Code)

### v1.0.0 — 2026-05-28
- Initial skill created
- Canonical layout: lowercase kebab-case folders (assets/, docs/, cms/,
  webflow-scripts/, archive/, .claude/, plus free-form feature workspaces)
- Zero-stray-root-files rule with explicit allowlist
- Bootstrap workflow for new projects (default set + opt-ins)
- Audit workflow producing a punch list of stray files + misnamed folders
- ASK-driven rename + classification with three batch modes
  (bulk-by-extension / by-cluster / file-by-file)
- File naming: kebab-case, variant + breakpoint suffixes
- Cleanup hygiene rules (flag, never auto-delete)
- Project doc retrofitting skeleton
- Trigger scope locked to explicit user request (no passive activation)
