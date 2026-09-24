#!/usr/bin/env node
// verify-drop.mjs — checks a LowCode HTML drop against the view.lowc.dev hardening rules.
// Usage: node verify-drop.mjs <file.html> [more.html ...]
// Exit 0 = no FAILs. Exit 1 = at least one FAIL. Exit 2 = bad invocation.
// Zero dependencies.

import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const PROTECTED_PROPS = new Set([
  'color', 'background', 'background-color', 'background-image', 'border',
  'border-color', 'border-top', 'border-right', 'border-bottom', 'border-left',
  'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
  'box-shadow', 'fill', 'stroke', 'outline', 'outline-color', 'text-decoration-color',
]);

const ALLOWED_PICTOGRAPHIC = new Set(['™', '©', '®']);

function lineOf(src, index) {
  return src.slice(0, index).split('\n').length;
}

function stripCssComments(css) {
  // keep length stable so indices still map to source lines
  return css.replace(/\/\*[\s\S]*?\*\//g, (m) => ' '.repeat(m.length));
}

function verify(file) {
  let src;
  try {
    src = readFileSync(file, 'utf8');
  } catch (err) {
    return { file, fails: [`cannot read file: ${err.message}`], warns: [], checks: 0 };
  }

  const fails = [];
  const warns = [];
  const clean = stripCssComments(src);

  // ---- rule 1: no CSS custom properties -------------------------------------
  const varHits = [...clean.matchAll(/var\(\s*--/g), ...clean.matchAll(/(^|[;{\s])--[a-zA-Z][\w-]*\s*:/gm)];
  for (const m of varHits) {
    fails.push(`line ${lineOf(src, m.index)}: CSS custom property — the viewer's :root overrides it. Hardcode the value.`);
  }

  // ---- rule 2: !important on every visual declaration ------------------------
  // walk every `prop: value` pair in <style> blocks and in style="" attributes
  const declRegions = [];
  for (const m of clean.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    declRegions.push({ text: m[1], offset: m.index + m[0].indexOf(m[1]) });
  }
  for (const m of clean.matchAll(/\sstyle\s*=\s*"([^"]*)"/gi)) {
    declRegions.push({ text: m[1], offset: m.index + m[0].indexOf(m[1]) });
  }
  for (const region of declRegions) {
    for (const d of region.text.matchAll(/(^|[;{}])\s*(-?[a-zA-Z][\w-]*)\s*:\s*([^;{}]*)/g)) {
      const prop = d[2].toLowerCase();
      const value = d[3];
      if (!PROTECTED_PROPS.has(prop)) continue;
      if (/!important/i.test(value)) continue;
      if (/^\s*$/.test(value)) continue;
      const idx = region.offset + d.index + d[0].indexOf(d[2]);
      fails.push(`line ${lineOf(src, idx)}: \`${prop}\` without !important — the viewer stylesheet loads after ours and wins.`);
    }
  }

  // ---- rule 3: inline fallback on <html> and <body> --------------------------
  for (const tag of ['html', 'body']) {
    const m = clean.match(new RegExp(`<${tag}\\b[^>]*>`, 'i'));
    if (!m) {
      fails.push(`missing <${tag}> tag.`);
      continue;
    }
    const attr = m[0].match(/\sstyle\s*=\s*"([^"]*)"/i);
    if (!attr) {
      fails.push(`line ${lineOf(src, m.index)}: <${tag}> has no inline style fallback.`);
      continue;
    }
    const s = attr[1];
    const missing = [];
    if (!/background\s*:/i.test(s)) missing.push('background');
    if (!/(^|[;\s])color\s*:/i.test(s)) missing.push('color');
    if (!/!important/i.test(s)) missing.push('!important');
    if (missing.length) {
      fails.push(`line ${lineOf(src, m.index)}: <${tag}> inline style missing ${missing.join(' + ')}.`);
    }
  }

  // ---- rules 4 + 5: no <link>, no external JS/CSS ---------------------------
  for (const m of clean.matchAll(/<link\b[^>]*>/gi)) {
    fails.push(`line ${lineOf(src, m.index)}: <link> tag — the viewer may strip or reorder <head> children. Use @import inside <style>.`);
  }
  for (const m of clean.matchAll(/<script\b[^>]*\bsrc\s*=/gi)) {
    fails.push(`line ${lineOf(src, m.index)}: external <script src> — the file must be fully self-contained.`);
  }
  for (const m of clean.matchAll(/@import\s+url\(\s*['"]?([^'")]+)/gi)) {
    if (!/^https:\/\/fonts\.googleapis\.com\//i.test(m[1])) {
      fails.push(`line ${lineOf(src, m.index)}: @import from a non-Google-Fonts origin — not allowed.`);
    }
  }
  // remote assets referenced anywhere other than an anchor href
  for (const m of clean.matchAll(/\b(?:src|srcset)\s*=\s*"(https?:\/\/[^"]+)"/gi)) {
    fails.push(`line ${lineOf(src, m.index)}: remote asset \`${m[1].slice(0, 60)}\` — inline it as SVG or a data: URI.`);
  }
  for (const m of clean.matchAll(/url\(\s*['"]?(https?:\/\/[^'")]+)/gi)) {
    if (/fonts\.(googleapis|gstatic)\.com/i.test(m[1])) continue;
    fails.push(`line ${lineOf(src, m.index)}: remote CSS url() \`${m[1].slice(0, 60)}\` — inline it.`);
  }

  // ---- rule 6: no emoji -----------------------------------------------------
  for (const m of clean.matchAll(/\p{Extended_Pictographic}/gu)) {
    if (ALLOWED_PICTOGRAPHIC.has(m[0])) continue;
    fails.push(`line ${lineOf(src, m.index)}: emoji \`${m[0]}\` — use hierarchy, or the arrows ↗ →.`);
  }

  // ---- rule 7: scrollable document, not a slide deck ------------------------
  if (/scroll-snap-type\s*:\s*(x|inline)/i.test(clean)) {
    fails.push('scroll-snap-type on the inline axis — deliverables are scrollable documents, not carousels.');
  }
  if (/(ArrowRight|ArrowLeft)/.test(clean) && /keydown|keyup/.test(clean)) {
    fails.push('arrow-key navigation detected — no slide-deck behaviour in deliverables.');
  }

  // ---- rule 7b: no page chrome — the viewer supplies header + footer --------
  for (const m of clean.matchAll(/<(nav|header|footer)\b/gi)) {
    fails.push(`line ${lineOf(src, m.index)}: <${m[1].toLowerCase()}> element — the viewer supplies the header and footer. Document runs cover → closing band.`);
  }
  for (const m of clean.matchAll(/class\s*=\s*"[^"]*\b(topbar|top-bar|navbar|nav-bar|site-header|site-footer|footer)\b[^"]*"/gi)) {
    fails.push(`line ${lineOf(src, m.index)}: \`${m[1]}\` class — no nav bar, top bar or footer of our own. The viewer brackets the document with its own 57px chrome; a second bar lands in the same top:0 band and the viewer's logo ghosts through ours.`);
  }
  for (const m of clean.matchAll(/position\s*:\s*sticky/gi)) {
    warns.push(`line ${lineOf(src, m.index)}: \`position: sticky\` — the viewer's own header is already sticky at top:0. Confirm this is not a second bar.`);
  }

  // ---- rule 8: cream page, dark only in the closing band --------------------
  if (!/#FAF9F6/i.test(clean)) {
    fails.push('page background #FAF9F6 never appears — deliverables are light-theme.');
  }
  const darkCount = (clean.match(/#38327C/gi) || []).length;
  if (darkCount > 6) {
    warns.push(`#38327C appears ${darkCount}× — the dark purple belongs to the closing band only. Check nothing else went dark.`);
  }
  if (/#C5EF48/i.test(clean)) {
    warns.push('lime #C5EF48 present — lime is reserved for dark-context metrics and has no role in light-theme deliverables.');
  }
  const offPalette = new Set();
  const PALETTE = ['#faf9f6', '#ffffff', '#d9d9d9', '#282828', '#414141', '#b5b5b5', '#705cf6', '#38327c', '#c5bdfa', '#fff', '#000'];
  // Scanned only inside style blocks and style="" attributes — body prose
  // legitimately contains #NNN (PR references, anchors), which are hex-shaped
  // but are not colors. Colors only ever live in the declaration regions.
  for (const region of declRegions) {
    for (const m of region.text.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
      const hex = m[0].toLowerCase();
      if (!PALETTE.includes(hex)) offPalette.add(hex);
    }
  }
  if (offPalette.size) {
    warns.push(`off-palette hex values: ${[...offPalette].join(', ')} — confirm each is intentional.`);
  }

  // ---- rule 10: Inter only --------------------------------------------------
  if (!/font-family[^;]*Inter/i.test(clean)) {
    fails.push('Inter is never declared as font-family.');
  }
  const fontImports = [...clean.matchAll(/fonts\.googleapis\.com\/css2\?family=([^'"&)]+)/gi)].map((m) => decodeURIComponent(m[1]).split(':')[0]);
  for (const fam of fontImports) {
    if (!/^Inter$/i.test(fam)) {
      fails.push(`second webfont imported (\`${fam}\`) — Inter only, plus the system mono stack.`);
    }
  }

  // ---- hygiene --------------------------------------------------------------
  if (!/^\s*<!DOCTYPE html>/i.test(src)) fails.push('missing <!DOCTYPE html>.');
  if (!/<html\b[^>]*\blang\s*=/i.test(clean)) fails.push('<html> has no lang attribute.');
  if (!/<meta\s+name=["']viewport["']/i.test(clean)) fails.push('missing viewport meta.');
  const title = clean.match(/<title>([\s\S]*?)<\/title>/i);
  if (!title || !title[1].trim()) fails.push('missing or empty <title>.');

  const placeholders = [...clean.matchAll(/\[[A-Za-z][^\]\n]{0,60}\]/g)];
  if (placeholders.length) {
    const sample = placeholders.slice(0, 4).map((m) => `line ${lineOf(src, m.index)} ${m[0]}`).join(', ');
    warns.push(`${placeholders.length} unfilled template placeholder(s): ${sample}${placeholders.length > 4 ? ', …' : ''}`);
  }
  // ---- rules 12-13: scope and voice of the copy -----------------------------
  // Judgment calls, so these WARN. A drop reports the situation and speaks in
  // the sender's voice; it never carries a plan or narrates its own tooling.
  const prose = clean
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ');

  // Patterns are deliberately narrow. "Worth knowing going forward" is a handoff
  // note and "8 ready to ship" is a verdict label — neither is a plan, and a rule
  // that flags them trains the reader to ignore this check.
  const forwardLooking = [
    /\bnext steps?\b/i,
    /\bwhat happens next\b/i,
    /\bwhat comes next\b/i,
    /\bpr[oó]ximos pasos\b/i,
    /\bsiguientes pasos\b/i,
    /\broadmap\b/i,
    /\bready to (?:publish|ship|launch|go live) (?:the moment|as soon as|once|when)\b/i,
    /\b(?:we|i|they)(?:'ll| will) (?:then )?(?:publish|ship|launch|build|deliver|send|start)\b/i,
  ];
  for (const re of forwardLooking) {
    const m = prose.match(re);
    if (m) {
      warns.push(`forward-looking copy "${m[0].trim()}" — a drop reports the situation, never the plan. End on the last finding, then the closing band.`);
    }
  }

  // Only authorship framing. "Two headings generated by plugins" describes the
  // site under review, which is exactly what a report should say.
  const toolVoice = [
    /\bas an AI\b/i,
    /\bautomated (?:scan|crawl|check|analysis|report|review)\b/i,
    /\bgenerated (?:by|with|using) (?:an?\s+)?(?:ai|claude|chatgpt|gpt|llm|assistant|bot|automation|script)\b/i,
    /\bthis (?:report|document|page)[^.]{0,40}\b(?:was|is) (?:generated|produced|written) (?:by|with|using)\b/i,
    /\bI analy[sz]ed\b/i,
    /\bthe (?:tool|script|model|agent) (?:found|detected|flagged|generated)\b/i,
  ];
  for (const re of toolVoice) {
    const m = prose.match(re);
    if (m) {
      warns.push(`"${m[0].trim()}" reads as a tool narrating its own work — every sentence speaks in the sender's voice. State the finding, or the delivered work.`);
    }
  }

  const anchors = new Set([...clean.matchAll(/href\s*=\s*"#([^"]+)"/g)].map((m) => m[1]));
  const ids = new Set([...clean.matchAll(/\bid\s*=\s*"([^"]+)"/g)].map((m) => m[1]));
  for (const a of anchors) {
    if (!ids.has(a)) warns.push(`TOC anchor #${a} has no matching id.`);
  }
  if (ids.size && !/scroll-margin-top/i.test(clean)) {
    warns.push('sections have ids but no scroll-margin-top — the viewer sticky header will cover headings on jump.');
  }

  return { file, fails, warns };
}

const files = process.argv.slice(2).filter((a) => !a.startsWith('-'));
if (!files.length) {
  console.error('usage: node verify-drop.mjs <file.html> [more.html ...]');
  process.exit(2);
}

let bad = 0;
for (const file of files) {
  const { fails, warns } = verify(file);
  const name = basename(file);
  console.log(`\n${name}`);
  console.log('-'.repeat(Math.max(name.length, 12)));
  if (!fails.length && !warns.length) {
    console.log('PASS — all rules satisfied.');
  } else {
    for (const f of fails) console.log(`  FAIL  ${f}`);
    for (const w of warns) console.log(`  WARN  ${w}`);
    console.log(`\n  ${fails.length} fail(s), ${warns.length} warn(s).`);
  }
  if (fails.length) bad++;
}
console.log('');
process.exit(bad ? 1 : 0);
