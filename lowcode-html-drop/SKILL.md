---
name: lowcode-html-drop
version: 1.0.0
repository: https://github.com/daniel-lca/claude-skills
description: Use this skill whenever producing a standalone, self-contained HTML file carrying LowCode Agency (LOW / CODE) branding — meant to be uploaded to the agency viewer at view.lowc.dev and shared by link. Covers BOTH client-facing deliverables (refinement boards, Paso 0 guides, project summaries, recaps, proposals, handoffs) AND internal/technical documents (change reports, PR digests, audit write-ups, decision records, design-rationale reports, before/after comparisons, release notes). Trigger on any request to "generate an HTML report", "make an HTML deliverable", "build a shareable HTML page/doc", "un HTML para el viewer", "subir al viewer", "view.lowc.dev", "Paso 0", "project summary", "HTML drop", "a report I can share", or any single-file HTML document intended for a link rather than a repo. Also trigger when the user asks for a report/summary/recap and the expected output medium is a hosted HTML page. Do NOT use for Astro/React pages, app UI, marketing sites, or emails.
---

# LowCode HTML Drop

Produce one `.html` file that survives being wrapped by the `view.lowc.dev` viewer shell and reads as LOW / CODE brand work.

The viewer injects its own stylesheet **after** ours. It overrides `:root` custom properties, resets `html`/`body`, and swaps font stacks. Every hard rule below exists to make the file immune to that. A file built without them renders with wrong colors, wrong fonts, wrong theme once uploaded.

## Pick the document type first

| Type | Use for | Reference |
|---|---|---|
| **Client deliverable** | Refinement boards, Paso 0 guides, project summaries, recaps, proposals, handoff docs | `references/spec.md` |
| **Internal report** | Change reports, PR digests, audits, decision records, design rationale, before/after, release notes | `references/spec.md` **+** `references/internal-reports.md` |

Both share the identical shell, palette, type scale, and hard rules. Internal reports add components (TOC, issue→fix→why triads, before/after panels, code blocks, PR rows, timelines) and drop the client-facing closing copy for a factual sign-off.

Default language: **Spanish for client-facing, English for internal**, unless the user's own material says otherwise. Set `<html lang>` to match.

## The ten hard rules

1. **Zero CSS custom properties.** No `var(--x)` anywhere, not even for convenience. The viewer's `:root` wins.
2. **`!important` on every visual declaration** — `color`, `background`, `background-color`, `border`, `border-*-color`, `box-shadow`, `fill`, `stroke`, `outline`.
3. **Inline `style` on `<html>` and `<body>`** carrying `background` + `color` + `!important`, as a survival fallback.
4. **Font via `@import` inside `<style>`.** Never a `<link>` tag — the viewer may strip or reorder `<head>` children.
5. **No external JS or CSS.** No `<script src>`, no stylesheet links, no CDNs. The only permitted network request is the Google Fonts `@import`; the file must still read correctly with it blocked.
6. **No emoji.** Unicode arrows (`↗`, `→`) only. Hierarchy does the visual work.
7. **Scrollable single-page document.** Not a slide deck: no horizontal strip, no arrow-key navigation, no dot indicators, no scroll-snap carousel.
7b. **No page chrome of your own — no nav bar, no top bar, no footer.** The viewer wraps the document in its own 57px sticky header (client logo + the filename as title) and a 57px footer (client logo left, LowCode logo right). A document that ships its own bar gets two in the same band: ours paints over the viewer's semi-transparently and its logo and title ghost through. Start at the cover, end at the closing band. *Verified on a live upload, 2026-07-31.*
8. **Light theme, cream `#FAF9F6`.** The dark purple closing band is the only dark surface.
9. **1px gap dividers, never card borders.** Parent `background:#D9D9D9` + `gap:1px`; children `background:#FFFFFF`.
10. **Inter only** (plus the system mono stack for code, internal reports only).

## Build loop

1. **Gather the substance before writing markup.** For a report this means reading the actual PRs, diffs, files, and commit messages — the document's value is the content, not the chrome. Never invent a finding, a date, a PR number, or a rationale. If a "why" is not recoverable from the record, say so explicitly rather than reconstructing a plausible one.
2. **Outline the sections**, then map each to a component from the references. If a piece of content fits no existing component, prefer composing existing ones over inventing a new visual language.
3. **Copy the matching starter** — `assets/template-client.html` or `assets/template-report.html` — and fill it. Do not author the shell from scratch; the templates already satisfy rules 1–10.
4. **Verify mechanically:**

```bash
node "<this-skill-dir>/scripts/verify-drop.mjs" path/to/file.html
# e.g. node ~/.claude/skills/lowcode-html-drop/scripts/verify-drop.mjs report.html
```

   Fix every FAIL. Do not hand over a file with failures. WARNs are judgment calls — resolve or state why you kept them.
5. **Report the path** to the user and note it is ready to upload to `view.lowc.dev`. Uploading is the user's action, not yours.

## Content standards

- **No filler.** Every section earns its place. A four-section document with substance beats a twelve-section one padded with restated headings.
- **Numbers over adjectives.** "Grid went 9 → 12 per page" beats "improved grid density".
- **Cite the record.** Reports link PRs, commits, and files. Use the real URLs and real file paths.
- **State the why.** When a report covers decisions, the rationale is the deliverable. Separate *what changed* from *why it changed that way* — the internal-report reference gives you a component for exactly this.
- **Report the situation, never the plan.** No "next steps", "what happens next", roadmap, or forward-looking section — and no forward-looking clauses inside the sections that stay ("ready to ship the moment X lands", "then we build Y"). The document ends on its last substantive finding, then the closing band. Status belongs and is not forward-looking: what is built, what is blocked, what is open. Asks belong too — an unanswered question is part of the situation. A commitment about the future does not, because the document gets forwarded and commits its sender to a timeline they never agreed to.
- **Prose voice** follows LowCode brand voice: affirmative, concrete, direct. No contrastive negation ("it's not just X, it's Y"). If the `anti-negation` skill is available, its rules apply to all prose in the document.
- **Write in the sender's voice.** The person who sends the link owns every sentence. Nothing may read as a tool narrating its own work — no "I analysed", "automated scan", "generated by", no machine-process framing in body copy, labels, or captions. Findings are stated as findings, delivered work as delivered. Use the register the sender would actually use in the conversation this document lands in.

## Assets and images

Inline everything: SVG markup directly in the document, raster images as `data:` URIs. An external image URL breaks rule 5 and leaves a hole in the deliverable when the host blocks it. If an image is too heavy to inline, drop it and describe the content in text.

## Files in this skill

- `references/spec.md` — palette, type scale, layout structure, shared component patterns, checklist
- `references/internal-reports.md` — report-only components, section order, sourcing rules
- `assets/template-client.html` — client deliverable starter
- `assets/template-report.html` — internal report starter, TOC wired
- `scripts/verify-drop.mjs` — rule checker, zero dependencies, exits non-zero on failure

## Changelog

### v1.0.0 — 2026-09-24
- Initial skill added to the repo (built and field-tested locally before this import)
- Ten hard rules for surviving the view.lowc.dev viewer shell, incl. rule 7b (no own nav/top bar/footer, verified on a live upload 2026-07-31)
- Client and internal-report templates, shared spec, internal-report components and sourcing rules
- Zero-dependency `verify-drop.mjs` rule checker
- Removed leftover footer/top-bar wording that contradicted rule 7b; made the verifier path portable
