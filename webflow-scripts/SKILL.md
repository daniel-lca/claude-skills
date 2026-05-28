---
name: webflow-scripts
version: 1.0.0
repository: https://github.com/daniel-lca/claude-skills
description: >
  Use this skill whenever working with a project's `webflow-scripts/` folder
  (or any similarly-named folder of `.txt` files pasted into Webflow Page
  Settings or Embed components). Triggers on requests to add, organize,
  document, edit, paste, or minify a Webflow custom script; "manage Webflow
  scripts", "scripts folder", "webflow-scripts", "the script is over 50k",
  "minify for Webflow", "Page Settings custom code", "Webflow embed code", or
  any time a `.txt` intended for Webflow is being touched. Covers folder
  layout, single-file naming convention, start/end identifier HTML comments,
  sparse-comments rule, reference-doc structure, the 50K-character Webflow
  limit with safe AST-based minification + mandatory verification, opt-in
  live-sync via Playwright, and discovery of undocumented scripts on a new
  project. Complementary to `webflow-interactions` (which is about *writing*
  the JS); this skill is about how the workspace stores and ships it.
---

# Webflow Scripts Skill

Conventions for managing a project's Webflow custom-code workspace — the
`webflow-scripts/` folder where `.txt` files are kept ready to paste into
Page Settings or Embed components. Keeps every project's scripts organized
the same way and prevents the recurring 50K-character paste bug.

---

## Update

To update this skill to its latest version:

1. Clone or pull `https://github.com/daniel-lca/claude-skills`
2. From the repo root, create a symlink (preferred):
   ```bash
   ln -sf "$(pwd)/webflow-scripts" ~/.claude/skills/webflow-scripts
   ```
   Or copy directly if symlinks aren't available:
   ```bash
   cp -r webflow-scripts ~/.claude/skills/webflow-scripts
   ```

---

## When this applies

Use this skill for anything touching the workspace files: creating, editing,
organizing, documenting, or pasting a Webflow custom script. Defer to
`webflow-interactions` for decisions about how to *write* the JS itself
(vanilla vs GSAP, animation patterns, gotchas). The two skills are
complementary and often used together.

---

## Folder Layout

| Element | Rule |
|---|---|
| Root folder | `webflow-scripts/` at the project root. Use whatever name the project already established (`clinicalfit-webflow-scripts/` is fine). Do not rename. |
| `README.md` at root | Required. Index table: script \| folder \| pages \| status. Lists conventions or links here. |
| Subfolder per script | Use when the script has a reference `.md` alongside, has multiple related files (backup, minified variant), or is non-obvious to a fresh session. |
| Flat layout | Acceptable when scripts are small and self-explanatory and a single root README documents them all. |

Pick the layout that makes a fresh session understand the folder fastest. When
in doubt, prefer subfolders — the cost is one extra directory; the benefit is
locality of related files.

---

## File Naming (single-file convention)

| File | Purpose |
|---|---|
| `<name>.txt` | Canonical pasteable script. Always reflects the latest intended state, including pending edits not yet deployed. |
| `<name>-reference.md` | Supporting notes. Optional but recommended in subfolder layout. |
| `<name>.backup.txt` | Optional snapshot taken before a risky change. |
| `<name>.min.txt` | Minified variant — ONLY when source is near or over 50K. See `references/minification.md`. |

**Do not use `.UPDATED.txt`.** Pending vs deployed status belongs in the
reference `.md`, not in a second file. Two `.txt` files for the same script
duplicate content and the naming flips backwards as soon as a pending change
ships.

---

## Start AND End Identifier Comments (mandatory)

Every script `.txt` must wrap its entire block with two HTML comments:

```html
<!-- Script Name - start -->
<script>
  ...
</script>
<style>
  ...
</style>
<!-- Script Name - end -->
```

The comments wrap *everything* belonging to that script — `<script>`, `<style>`,
CDN `<script src>`, and any associated markup. Required because Page Settings
can hold several scripts with different tag sets pasted together; start/end
markers make boundaries unambiguous and let you find your own script later by
searching for its name.

Project prefix is optional but recommended when scripts span multiple sites
(e.g., `<!-- BetterFit — Split-Flap Counter - start -->`).

---

## Comment Policy Inside the Script

Sparse — **always**. The rule is firm:

- **Allowed:** comments that identify or separate sections (constants, init,
  bind, cleanup, teardown).
- **Not allowed:** comments that explain *how* the code works, narrate it line
  by line, or restate what the code already shows.
- **Allowed at the very top:** one short docstring-style block for genuinely
  non-obvious things (external dependency, browser quirk, page-specific gotcha).

Drop any comment that fails this test: would a competent dev reading the code
already know this?

---

## Reference Doc

When the script gets a `<name>-reference.md`, follow the template in
`references/reference-doc-template.md`. Minimum sections: deployment status,
where it lives, what it does, DOM hooks, notes/known issues.

---

## ⚠️ 50K-Character Webflow Limit

Webflow Page Settings code has a **50,000-character cap per location**. Going
over silently truncates the script and breaks the page.

Always count characters before recommending a paste:

| Size | Action |
|---|---|
| Under 45K | Ship as-is. |
| 45K–50K | Flag the limit. Suggest trimming dead code or splitting if logical. |
| Over 50K | Must minify. See `references/minification.md`. |

For files at 45K+ headroom matters because future edits push closer to the
ceiling. Keep buffer.

---

## Minification

Whenever a script needs minifying — including past projects where minification
introduced bugs — read `references/minification.md` before running any tool.
The handbook covers tool choice (AST-based only), the standard invocation, the
**mandatory verification step** (a previous minification on NYC's events-page
broke escape sequences and required hand-fixing — minifiers are not
automatically safe), and how to re-attach the start/end title comments to the
minified output.

Source is canonical. Edit the readable `.txt`, re-minify on every change.
Never edit `.min.txt` directly.

---

## Live-Sync (opt-in)

Do **not** fetch deployed scripts automatically before every edit. Only run
live-sync when:

- The user explicitly asks for it ("check the live version", "what's on
  staging", "diff against deployed"), or
- The user mentions a manual Webflow edit happened outside the repo.

When triggered, use Playwright: navigate to the staging or production URL,
then `fetch(path)` + DOMParser to grep inline `<script>` blocks by a marker
string from the script (top-comment text, unique constant name, or function
name). Compare to local `.txt`. If local lags, sync it first, then apply the
new edit. Record what you did in the reference `.md` under "Deployment status".

---

## Discovering Scripts on a New Project

When onboarding a project to this convention from scratch, run a one-shot
audit:

1. Navigate to the site root via Playwright.
2. Collect internal links from the home page.
3. For each path, `fetch(path)` and DOMParser the inline `<script>` blocks.
4. Filter framework noise: WebFont loader, Webflow's `w-mod-` touch
   detection, schema.org JSON-LD, vendor scripts (gtag, fbq, hotjar, clarity,
   intercom, etc.).
5. Each remaining custom block is a candidate for documentation.
6. Track which page(s) each script lives on — one script can appear on
   multiple pages, and the page list belongs in the reference `.md`.

Done once per project; not part of the routine edit loop.

---

## Project Doc Integration

When the project has a `CLAUDE.md` or `AGENTS.md`, add a short "Custom Scripts"
section pointing to the scripts folder and noting this skill governs the
conventions. Do not duplicate the rules — link to this skill instead. Keeps
project docs short and the source of truth in one place.

---

## Output Checklist

Before delivering or saving any Webflow `.txt`:

- [ ] Lives in `webflow-scripts/` (or the project's equivalent folder)
- [ ] Single `.txt` per script — no `.UPDATED.txt`
- [ ] Wrapped in `<!-- Name - start -->` and `<!-- Name - end -->` HTML comments
- [ ] Comments inside the script are sparse — section markers only
- [ ] Character count checked; under 45K, or minified with `.min.txt` if over 50K
- [ ] Reference `.md` updated if the script's behavior or DOM hooks changed
- [ ] README.md index reflects current state
- [ ] Deployment status noted in the reference `.md` if applicable

---

## Changelog

### v1.0.0 — 2026-05-28
- Initial skill created
- Folder layout (subfolder vs flat — judgment call) and single-file naming
- Start/end identifier HTML comments wrapping the full block
- Sparse-comments rule (section markers only, no narration)
- 50K-character Webflow limit with size thresholds (45K / 45-50K / 50K+)
- `references/minification.md` — AST-based tool, mandatory verification step
- `references/reference-doc-template.md` — boilerplate for new script docs
- Live-sync workflow as opt-in (user request or manual-edit mention only)
- One-shot script discovery via Playwright for new-project onboarding
- Project doc integration (CLAUDE.md / AGENTS.md pointers without duplication)
