# Spec — shared visual system for HTML drops

Applies to every file produced by this skill, client-facing or internal. Derived from the LowCode Agency visual system, hardened for the `view.lowc.dev` viewer shell.

## Why the hardening exists

`view.lowc.dev` wraps the uploaded HTML in its own page shell. That shell injects stylesheets that override `:root` custom properties, reset `body`/`html` styles, and change the font stack. Anything relying on CSS variables or unprotected declarations loses to the viewer's theme.

Consequence: hardcoded hex values and blanket `!important` are not sloppiness here, they are the contract. A CSS variable that "works locally" is a file that breaks on upload.

## Palette — hardcoded, never as variables

| Role | Value | Where it appears |
|---|---|---|
| Page background | `#FAF9F6` | `<html>`, `<body>`, page frame, inset code blocks |
| Card / row surface | `#FFFFFF` | Cards, table rows, list items |
| Gap divider | `#D9D9D9` | 1px gaps between cards, section rules, inset borders |
| Heading text | `#282828` | H1, H2, card titles, step labels |
| Body text | `#414141` | Descriptions, values, body copy, code |
| Muted text | `#B5B5B5` | Subtitles, section descriptions, metadata, labels |
| Primary accent | `#705CF6` | Eyebrows, tags, links, badges, accent bars |
| Dark purple | `#38327C` | Closing band background only |
| Light purple | `#C5BDFA` | Text on dark purple |

**No lime `#C5EF48`.** Lime is reserved for metric values in dark contexts; these documents are light-theme, so it has no role.

Tints, when a fill is needed, are always derived from the accent: `rgba(112, 92, 246, 0.08)` for surfaces, `rgba(112, 92, 246, 0.06)` for the faintest wash. Never introduce a hue outside this table — including red/green for pass/fail. Use the muted/accent pair (`#B5B5B5` = prior state or unresolved, `#705CF6` = current state or resolved) instead.

## Typography

Inter for everything. Internal reports may additionally use the system mono stack — `ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace` — for code and identifiers. No second webfont, ever.

| Element | Spec |
|---|---|
| Cover title | 700, `clamp(44px, 6vw, 72px)`, lh 1.08, ls -0.03em, `#282828` |
| Section title (H2) | 700, `clamp(30px, 3.5vw, 44px)`, lh 1.15, ls -0.02em, `#282828` |
| Sub-head (H3) | 700, 18px, ls -0.01em, `#282828` |
| Eyebrow | 600, 10px, uppercase, ls 0.22em, `#705CF6`, preceded by a 24px × 1.5px purple rule |
| Body / description | 400, 14–15px, lh 1.65, `#414141`; `#B5B5B5` when secondary |
| Card title | 600–700, 14–15px, `#282828` |
| Tag / badge | 600, 9px, uppercase, ls 0.06–0.08em |
| Closing-band brand | 700, 11px, uppercase, ls 0.06em |
| Stat value | 700, 36px, ls -0.02em, `#282828` (or `#705CF6` for accent) |
| Stat label | 500, 10px, uppercase, ls 0.1em, `#B5B5B5` |
| Code / mono | 400, 12.5px, lh 1.6, `#414141` |

## Layout structure

Scrollable single-page document. **The viewer supplies the page chrome; the document supplies only content.**

```
╔═════════════════════════════════════╗
║  VIEWER header — 57px, sticky       ║  ← not ours: client logo + filename
╠═════════════════════════════════════╣
│  Cover (title, subtitle, stat row)  │  ← the document starts here
├───────────── 1px rule ──────────────┤
│  [TOC — internal reports only]      │
├───────────── 1px rule ──────────────┤
│  Section 1 … Section N              │
├─────────────────────────────────────┤
│  Closing band (dark purple)         │  ← the document ends here
╠═════════════════════════════════════╣
║  VIEWER footer — 57px               ║  ← not ours: client + LowCode logos
╚═════════════════════════════════════╝
```

**Never author a nav bar, top bar, or footer.** `view.lowc.dev` inlines the document into its own shell (`.drop-viewer-shell`, no iframe) and brackets it with two `.drop-viewer-chrome` bars: a **sticky 57px header** carrying the client logo and the filename as its title, and a **57px footer** carrying the client logo left and the LowCode logo right. Both are `#FFFFFF` with `#D9D9D9` hairlines in Inter — the same design language, already on-brand.

A document that ships its own top bar puts two bars in the same `top: 0` band. Measured on a live upload: our `rgba(250,249,246,0.92)` blurred bar painted over the viewer's, and the viewer's logo and title were visible ghosting through it. A document footer is a plain duplicate of the viewer's, and a worse one — the viewer's carries real logo artwork where ours carried a text wordmark.

The **closing band stays**: it is a content sign-off, not chrome.

- **Page frame** — `max-width: 1100px`, centered, `padding: 0 48px`.
- **Sections** — `padding: 80px 0`, separated by `1px solid #D9D9D9`. Last section drops its border.
- **Cover** — first element in the document, `padding: 100px 0 80px`, 1px bottom rule.
- **Closing band** — full-bleed `#38327C`, sits outside `.page`, carries an inline `style` backup. Cream text, accent words in `#C5BDFA`, 48px × 2px `#C5BDFA` rule centered. Last element in the document.
- **Anchor targets** — `scroll-margin-top: 80px` on every section with an `id`. That clears the viewer's 57px sticky header with headroom; verified on a live upload, a jump lands the eyebrow ~103px below the chrome.

## Component patterns

### 1px gap divider (the base pattern)

Cards never carry visible borders. The parent supplies the divider by showing through:

```css
.card-grid {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 1px !important;
  background: #D9D9D9 !important;
  border-radius: 8px !important;
  overflow: hidden !important;
}
.card { background: #FFFFFF !important; padding: 22px !important; }
```

The same parent/child trick builds vertical stacks, tables, and list groups. Reach for it before any `border`.

### Stat row

Horizontal group of value + label pairs, separated by 1px `#D9D9D9` right borders (not the gap pattern, since the row sits on cream). Values 36px 700, labels 10px uppercase `#B5B5B5`. Stacks vertically under 768px with bottom borders instead.

### Status badges

Pill, 9px uppercase 600, `border-radius: 100px`, `padding: 4px 10px`.

| Status | Background | Text |
|---|---|---|
| Delivered / Fixed / Shipped | `rgba(112, 92, 246, 0.08)` | `#705CF6` |
| In Review / In Progress | `rgba(56, 50, 124, 0.08)` | `#38327C` |
| Pending / Open / Deferred | `rgba(181, 181, 181, 0.15)` | `#B5B5B5` |

### Resource rows

Vertical 1px-gap stack. Each row carries a 2px `#705CF6` left accent bar via `::before`. Row holds a name (14px 600 `#282828`) and an optional 28px circular link button, purple-tint background, `↗` glyph.

### Numbered steps

26px circles, `rgba(112, 92, 246, 0.08)` background, `#705CF6` numeral, 11px 700.

### Recap rows

Label/value pairs in a 1px-gap stack. Label 10px 600 uppercase `#705CF6`, `min-width: 140px`. Value 14px 400 `#414141`. Stacks (label above value) under 768px.

### Action tags

Pill, `rgba(112, 92, 246, 0.08)` background, `#705CF6` text, 9px 600 uppercase.

## Responsive — at 768px and below

- Page padding drops to 24px horizontal.
- Section padding drops to 56px vertical; cover to `72px 0 56px`.
- Card grids collapse to one column.
- Recap rows stack.
- Stat rows stack, right borders become bottom borders.

## Checklist before handing over

1. ☐ No `var(--anything)` in the file — zero matches.
2. ☐ Every color / background / border-color / box-shadow / fill carries `!important`.
3. ☐ `<html>` and `<body>` both carry inline `style` with `background` + `color` + `!important`.
4. ☐ No `<link>` tags. Font via `@import` inside `<style>`.
5. ☐ No external JS or CSS. Images inlined as SVG or `data:` URI.
6. ☐ No emoji. Unicode arrows only.
7. ☐ Scrollable layout — no slide navigation, no scroll-snap carousel.
7b. ☐ **No nav bar, top bar, or footer of your own.** First element is the cover, last is the closing band. The viewer brackets the document itself.
8. ☐ Cream `#FAF9F6` page; the closing band is the only dark surface.
9. ☐ 1px gap dividers, not card borders.
10. ☐ Inter only (plus system mono in reports).
11. ☐ Every `[bracket placeholder]` from the template replaced.
12. ☐ **No next-steps or forward-looking section**, and no forward-looking clause left in the sections that stay. The document ends on its last finding, then the closing band.
13. ☐ **Nothing reads as a tool narrating its own work.** Body copy, card labels, captions and the closing line all speak in the sender's voice.
14. ☐ `node scripts/verify-drop.mjs <file>` exits 0.
