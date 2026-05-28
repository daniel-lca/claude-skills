# Folder Scaffold — Per-Folder Definitions

Loaded on demand when bootstrapping or auditing a Webflow project. Examples
draw from Whitecoat, NYC for Free, and BetterFit — the three reference
projects that established this convention.

---

## `assets/`

All visual assets used on the live site: raster images, vector graphics,
logos, icons, favicons, motion files (Lottie JSON), and any media that
gets uploaded to Webflow Assets or referenced by `<img>`, `<video>`,
`<source>` tags.

**Examples:** `assets/home-hero-desktop.jpg`, `assets/logo-mark.svg`,
`assets/icons/category-music.svg`, `assets/team-members/team-andrew-v2.jpg`,
`assets/favicon.png`, `assets/lottie-cta.json`.

**Subfolders** emerge based on count + type. Common ones:

- `assets/team-members/` — team headshots when the project has a Team section
- `assets/icons/` — when there are many small icons (Webflow categories, UI)
- `assets/logos/` — when client + partner + sponsor logos coexist
- `assets/screenshots/` — site-build screenshots used in docs/proposals

**Does NOT go here:**

- PDFs, briefs, contracts → `docs/`
- CMS exports, schema → `cms/`
- Internal-only mockups not shipping to the site → `docs/design/`

**Naming inside:** kebab-case + `-v1` / `-v2` for iterations + `-desktop` /
`-mobile` / `-tablet` for responsive variants.

---

## `docs/`

Reference material that supports the project but doesn't ship to the live
site: client briefs, technical specs, contracts, API references, brand
guidelines, design exports, screenshots used for documentation, sample
payloads.

**Examples:** `docs/brand-guidelines.pdf`, `docs/webflow-api-for-supabase.md`,
`docs/cms-collections-reference.md`, `docs/contract-2026-01.pdf`,
`docs/sample-cms-post.json`, `docs/design/desktop-mockup-v3.fig`.

**Subfolders** optional but useful:

- `docs/api/` — API references, lookup tables, endpoint specs
- `docs/design/` — design exports, mockup PDFs, Figma exports
- `docs/legal/` — contracts, disclosures, MSAs
- `docs/screenshots/` — annotated screenshots for documentation

**Does NOT go here:**

- Assets shipping on the site → `assets/`
- Active CMS data files → `cms/`
- Custom scripts → `webflow-scripts/`

---

## `cms/`

Webflow CMS work: collection exports (CSV), schema documentation, database
diagrams, migration scripts, sample payloads used for testing API calls,
collection-IDs lookup tables.

**Examples:** `cms/collections-reference.md`,
`cms/exports/resources-2026-05.csv`,
`cms/schema.dbml`, `cms/migrate-posts.py`, `cms/sample-post-payload.json`.

**Subfolders:**

- `cms/exports/` — dated CSV exports
- `cms/scripts/` — one-off automation (when not large enough to warrant a
  full `<feature-workspace>/`)

**Does NOT go here:**

- API key files → `.claude/` (per-project credentials)
- Site assets uploaded as CMS images → `assets/`
- General API documentation → `docs/api/`

---

## `webflow-scripts/`

Custom-code workspace. Project-prefixed names are allowed when the project
established it that way (e.g. BetterFit uses `clinicalfit-webflow-scripts/`).
Internal conventions for this folder are governed by the **`webflow-scripts`
skill** (start/end identifier comments, single-file convention, 50K limit,
minification process, reference-doc structure).

This skill does NOT duplicate those rules. When work happens inside this
folder, defer to `webflow-scripts`.

---

## `archive/`

Backup variants, superseded copies, snapshots taken before risky changes,
old versions of folders the user couldn't bring themselves to delete yet.

**Examples:**

- `archive/clinicalfit-webflow-scripts-backup-2026-05-07/`
- `archive/simini.com-bak/`
- `archive/events-page-v1.txt`

**Naming inside:** keep the original name + a date suffix
(`YYYY-MM-DD`) so the user can tell when the snapshot was taken.

**Does NOT go here:**

- `.git/` history is the proper home for code backups. Use `archive/` only
  for things git doesn't already track or for non-code backups.
- Files the user might still actively edit. Archive = read-only zone.

---

## `.claude/`

Per-project Claude Code config. Three things commonly live here:

- `settings.local.json` — permission allowlist for Bash + MCP tools
- A credentials / IDs reference (e.g. Whitecoat's `webflow-cms.md` with site
  ID, API key, collection IDs)
- Optional session notes the user wants Claude to read on startup

**Does NOT go here:**

- General project docs → `CLAUDE.md` at root
- API docs that apply across the team → `docs/api/`
- Personal Claude memory (managed globally, not per-project)

---

## `<feature-workspace>/` (free-form)

Project-specific workspaces that don't fit any canonical folder. Free-form
names, but each one should justify its existence and have a clear scope.

**Examples seen across the three reference projects:**

- `blog/` (Whitecoat) — archive.org → Webflow CMS migration. Holds Python
  scripts, HTML cache, image cache, state JSON.
- `fitcheck/` (BetterFit) — questionnaire context: PDFs + screenshots of
  the questionnaire used as reference when building the popup.
- `scripts/` (NYC for Free) — Node automation utilities for CMS work
  (emoji assignment, filter population, icon uploads). Distinct from
  `webflow-scripts/` which is paste-into-Webflow code.
- `squarespace-migration/` (NYC for Free) — completed migration archive
  with PLAN.md, MAPPING.md, migration scripts.
- `memory/` (NYC for Free) — session notes + Webflow Rich Text API
  reference.

**Naming rule:** lowercase kebab-case. Descriptive of the workspace's
purpose.

**Don't proactively create these.** They emerge from actual work — when the
user starts a migration, a one-off automation effort, or accumulates
reference material that needs its own home.

---

## Quick reference table

| Folder | Required? | Lowercase? | Where |
|---|---|---|---|
| `assets/` | yes (any project with images) | yes | root |
| `docs/` | optional | yes | root |
| `cms/` | only when project does CMS work | yes | root |
| `webflow-scripts/` | only when project has custom code | yes (or project-prefixed) | root |
| `archive/` | only when backups exist | yes | root |
| `.claude/` | optional, recommended | dotted | root |
| `<feature-workspace>/` | as needed | yes, kebab | root |
