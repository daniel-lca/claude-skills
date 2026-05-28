# Rename + Classification Workflow

Loaded on demand whenever the skill is moving or renaming files. The core
rule: **never rename or move silently**. Every action is either
user-confirmed or part of a batch the user approved.

---

## Classification heuristics

For each unknown file, try these in order before asking the user:

1. **Extension + size sanity check.**
   - `.psd` / `.ai` / `.fig` / `.sketch` → design source (`assets/` if
     shipping, `docs/design/` if reference).
   - `.jpg` / `.png` / `.webp` / `.svg` → `assets/` (subfolder depends on
     content).
   - `.mp4` / `.mov` / `.webm` → `assets/`.
   - `.pdf` → `docs/` (unless clearly a CMS export, in which case `cms/`).
   - `.csv` / `.xlsx` → `cms/exports/` if it looks like a Webflow collection
     export, otherwise `docs/`.
   - `.json` → depends on content (CMS payload → `cms/`; settings → check
     name; sample data → `docs/`).
   - `.md` → `docs/` (unless `CLAUDE.md` / `AGENTS.md` / `README.md`).
   - `.txt` → almost always belongs in a `webflow-scripts/` subfolder if it
     contains a `<script>` tag. Otherwise → `docs/`.
   - `.js` / `.ts` → depends on purpose. Webflow paste-target → not raw
     `.js` at root (move to a `<feature-workspace>/` or `webflow-scripts/`).

2. **Content peek for text files.** Read the first 1–2 KB. Markdown
   frontmatter / headings reveal purpose; first few lines of JSON / CSV
   reveal whether it's CMS data, a sample, or unrelated.

3. **Image dimension / EXIF peek.** Tiny (≤ 256px) square images are often
   icons or favicons. Long screenshots (1080+ tall) are usually
   documentation / bug reports. Wide hero-shaped images (1600+ wide,
   ~16:9) are usually site hero assets.

4. **Magic byte check for binaries** when extension is missing or
   misleading.

If after all three the file still resists classification → **ASK**.

---

## When to proceed silently vs ask

**Silent (no confirmation needed)** only when ALL of these are true:

- Extension is unambiguous for the destination folder
  (e.g. `.psd` → `assets/` when paired with an obvious shipping filename
  like `home-hero-source.psd`).
- Filename is already descriptive (kebab-case, recognizable subject).
- Destination folder already exists.
- No conflict (no file with the same name in the destination).

In practice, very few files clear that bar. **Default to asking.**

**Always ask** when:

- Filename is timestamped (`Captura de pantalla_24-4-2026_*.jpeg`,
  `Screenshot 2026-05-07 at 14.32.png`) — content unknown without opening.
- Filename is a client / brand name without context
  (`WCP Disclosures.pdf` — legal? marketing? website asset?).
- File is at root with a sibling-suffix that suggests a backup
  (`X - BAK`, `X - Claude`, `X (copy)`).
- File extension and likely destination disagree (e.g. a `.json` named
  `wc_post.json` — sample payload? backup? schema?).

---

## Three batch modes for many unclear files

When ≥ 5 ambiguous files exist in one batch, ask which mode to use BEFORE
asking about individual files:

### Mode A — Bulk by extension

Best when files share a clear type and the user just wants them moved.

> "I see 14 PDFs at root. Want me to move them all to `docs/`? I'll keep
> their names as-is unless you want me to rename them too."

User confirms once; all 14 move.

### Mode B — By type / cluster

Best when files are visually similar but content varies (a pile of
screenshots, a folder of icons, a set of design exports).

> "I see 8 PNGs at root. Skimming them: they look like a mix of UI
> mockups and bug-report screenshots. Tell me how to split them — which
> ones are mockups and which are bugs? Or describe a cluster: 'all the
> ones with a red border are bugs.'"

User answers once per cluster; the skill applies the rule.

### Mode C — File by file

Best for a long tail of genuinely heterogeneous unknowns (< 5 files), or
when bulk / cluster modes would discard important context.

> "These 3 files I can't classify. One by one:
>  1. `wc_post.json` — what is this?
>  2. `graph overflowing issue.png` — bug report or asset?
>  3. `Newsletter - details view.jpg` — design mockup or live asset?"

---

## Suggested-mode logic

| Situation | Default suggestion |
|---|---|
| All files share an extension + obvious destination | Mode A |
| Files are visually similar but content varies (screenshots, icons) | Mode B |
| Fewer than 5 unclear files remaining | Mode C |
| Mixed types AND content varies | Ask user which mode |

Always present the suggested mode + the alternatives. Let the user pick.

---

## Renaming during moves

When moving a file, decide on the new name in the same prompt:

> "Moving `Captura de pantalla_24-4-2026_17216_nycforfree.webflow.io.jpeg`
> → `assets/screenshots/`. Want me to rename it too? Suggestion:
> `nycforfree-homepage-2026-04-24.jpg`."

Naming convention summary (full rules in `SKILL.md`):

- kebab-case
- subject + variant + breakpoint where relevant
- `-v1` / `-v2` for iterations
- `-desktop` / `-mobile` / `-tablet` for responsive variants
- avoid spaces, parentheses, non-ASCII

If the suggested name doesn't fit, ask the user to provide one.

---

## Special-case handling

- **Client-name PDFs** (`WCP Disclosures...REVISED.pdf`): legal / brand
  document — move to `docs/` (or `docs/legal/` for contracts). Rename to
  kebab-case (`wcp-disclosures-revised.pdf`) only with user confirmation —
  legal filenames sometimes need to match an internal naming convention
  the user can't change.

- **Sample / test payloads** (`wc_post.json`, `test-borough.js`): move to
  `docs/samples/` if reference, or delete if confirmed obsolete. Always
  ask first.

- **Backup folder variants** (`X - BAK`, `X - Claude`): move to `archive/`
  with a date suffix. If the user prefers to delete instead, confirm first
  — backups exist for a reason.

- **Webflow page-asset dumps** (`Page Assets/`,
  `Events Categories Icons/`): consolidate into `assets/` with
  appropriate subfolders (`assets/icons/` for the categories). Ask once
  about the consolidation, then proceed in batch.
