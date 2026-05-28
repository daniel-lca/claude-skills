# Minification Handbook — Webflow Scripts

Webflow Page Settings code has a hard cap of **50,000 characters per location**.
A `.txt` larger than that must be minified before paste, or the script gets
silently truncated and breaks the page.

This file is loaded on demand only when minification is actually needed.

---

## Tool Choice

Use an **AST-based JavaScript minifier**. Two safe options:

| Tool | Invocation | Notes |
|---|---|---|
| **Terser** (default) | `npx terser <input.js> --compress passes=2 --mangle --output <name>.min.js` | Most widely used. No install needed via `npx`. |
| **esbuild** (alternative) | `npx esbuild <input.js> --minify --target=es2018 > <name>.min.js` | Faster, slightly less aggressive. Good fallback when Terser misbehaves. |

**Never regex-minify or hand-minify.** A past incident broke escape sequences
inside strings and regex literals because a manual or regex-based pass didn't
respect string boundaries. AST tools parse the JS properly — but see the
verification step below, because even Terser is not automatically safe on
every script.

---

## Process

1. **Strip the HTML wrapper from the source first.** Terser expects pure JS.
   Save the `<script>` body to a temporary `<name>.tmp.js` file.

2. **Run the minifier.** Standard Terser flags:
   ```bash
   npx terser <name>.tmp.js --compress passes=2 --mangle --output <name>.min.js
   ```
   Two compression passes catch optimizations the first pass enables. Mangle
   shortens variable names for size; safe inside an IIFE.

3. **Re-wrap with `<script>` tags and the start/end title comments.**
   Terser strips HTML comments and tag wrappers. The final `<name>.min.txt`
   must look like:
   ```html
   <!-- Script Name - start -->
   <script>/* minified js here */</script>
   <!-- Script Name - end -->
   ```
   Without the title comments the script collides with other pasted blocks.

4. **Verify** — see the next section. This step is non-optional.

5. **Save as `<name>.min.txt`.** Source `<name>.txt` remains the canonical
   edit target. Re-run minification on every source change.

---

## ⚠️ Verification Step (mandatory)

Terser produced a broken minified script on NYC's `events-page.txt` — the
user had to hand-fix it. AST minifiers can mis-handle escape sequences inside
template literals, regex with edge-case flags, or rare syntax constructs.
Always verify before declaring done.

Four checks, in order:

### 1. Diff scan

Open the minified output and scan for:
- `\n`, `\t`, `\"`, `\\` literals that look unescaped or doubly-escaped vs
  the source.
- Regex literals — confirm flags survived and slashes weren't escaped.
- Template literals — backticks intact, `${...}` interpolations unchanged.
- String concatenation — quotes match (all single or all double, not mixed).

If anything looks suspicious, switch to esbuild and re-run.

### 2. Browser smoke test

Paste the minified script into a scratch HTML page (or directly into Webflow
staging) and load it in a browser:
- Open DevTools console. There must be **zero errors** on load.
- Interactive behavior must match the unminified source exactly.

### 3. Integration test

If the script touches any of these, exercise each one manually:
- Webflow CMS rendering / IX2 interactions
- Swiper carousels
- Chart.js graphs
- Google Maps / markerclusterer
- GSAP timelines / ScrollTrigger
- Form submission / external APIs (Supabase, webhook endpoints)

A script that *loads* without errors can still be broken in ways that only
surface during interaction. Click every button, scroll every section.

### 4. Character-count sanity

Final `.min.txt` (with title comments + `<script>` wrapper) must be under
50,000 characters. If it isn't, the source itself is too large for a single
Page Settings paste — split the script across an Embed component and Page
Settings, or move logic into a CDN-hosted file.

---

## When to Skip Minification

- Source is under 45K characters → ship the readable `.txt`. Reading the
  unminified source on the next edit is worth far more than the few KB
  savings.
- Source is 45K–50K → trim dead code, drop unused console.logs, collapse
  large constants before reaching for Terser.

Minification is a last resort for size, not a default polish step.

---

## Project Has a Build Script Already

NYC for Free has `build-txt.js` at the scripts-folder root — it wraps Terser
with the project's specific input/output paths and re-attaches title
comments automatically. When the project already has a build script:

- Use it. Don't reinvent.
- Confirm the script handles title-comment re-attachment and the start/end
  wrapper convention. If not, fix the build script rather than working
  around it.

---

## `.gitignore` Note

The `.tmp.js` intermediate file from step 1 should not be committed. Either
delete it after minification or add `*.tmp.js` to the project `.gitignore`.
