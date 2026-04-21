---
name: anti-negation
version: 1.1.0
repository: https://github.com/daniel-lca/claude-skills
description: >
  Use this skill whenever writing prose, copy, marketing text, emails, LinkedIn
  posts, blog articles, landing-page copy, or any user-facing writing — and
  whenever the user asks to "humanize" AI text, review a draft, or expand a
  prompt that will produce written content. Also triggers on "sounds like AI",
  "sounds robotic", "doesn't sound like me", "review this copy", "rewrite this
  paragraph", "write X for me", or any request producing more than a sentence
  of prose. The skill blocks contrastive-negation patterns ("it's not just X,
  it's Y", "not A but B", "X isn't just evolving — it's accelerating"), the
  #1 tell of AI-generated writing, and teaches Claude to write affirmative,
  concrete, direct sentences instead.
---

# Anti-Negation Writing Skill

Contrastive negation is the single most recognizable tell of AI-generated prose.
The pattern sounds sophisticated to the model but reads as hollow, defensive, or
robotic to humans — and is increasingly being flagged as an instant ChatGPT
giveaway by readers, editors, and AI-detection heuristics.

This skill forces affirmative, direct phrasing in any writing Claude produces,
and provides a review checklist to strip negation patterns from existing drafts.

---

## When to Apply

**Always apply** when generating:
- Marketing / sales copy, landing pages, CTAs, taglines
- LinkedIn posts, tweets, social captions
- Blog articles, newsletters, thought-leadership pieces
- Cold emails, outreach, reply drafts
- Product descriptions, pitch decks, proposals
- Any prose longer than ~2 sentences

**Also apply** when the user asks to:
- "Humanize" or "de-AI-ify" existing text
- Review, audit, or rewrite a draft
- Expand/improve a writing prompt before sending to another AI
- Make copy "sound more like me" or "less robotic"

---

## The Core Rule

> **Lead with what the thing IS. Never define it by what it isn't.**

If you catch yourself writing a sentence that negates-then-affirms, delete the
negation clause and keep only the affirmation — then make the affirmation more
specific.

---

## Banned Patterns

### Pattern 1 — The "Not Just" Contrast

| Form | Example |
|---|---|
| `It's not just X, it's Y` | "It's not just a tool, it's a platform" |
| `X isn't just A — it's B` | "Credit card fraud isn't just evolving — it's accelerating" |
| `We're not just doing X, we're doing Y` | "We're not just building a product, we're creating an experience" |

**Why it fails:** Forces the reader through a negative before reaching the
point. Plants the wrong idea first. Reads as defensive marketing.

### Pattern 2 — The "Not X, But Y" Correction

| Form | Example |
|---|---|
| `Not X, but Y` | "Not a failure, but a learning opportunity" |
| `Not about X; it's about Y` | "Not about appearing modern; about modernizing" |
| `X, but also Y` | "Not just a building, but also a symbol" |
| `Not because X, but because Y` | "Stories went untold not because teams didn't care, but because the process was too slow" |

**Why it fails:** Same reader-hijack. Also inadvertently plants the negated
idea in the reader's head — "not a failure" makes the reader think "failure".
The `not because X, but because Y` subvariant is the stealthiest — it slides
into explanatory / narrative contexts and reads as reasoned rather than
rhetorical, but it's the same pattern. Rewrite: state the real cause directly.

### Pattern 3 — The "More Than" Upsell

| Form | Example |
|---|---|
| `X is more than Y — it's Z` | "Dropbox Paper is more than a doc — it's a co-editing tool" |
| `Beyond just X, it's Y` | "Beyond just automation, it's transformation" |

**Why it fails:** Hollow elevation. Every product claims to be "more than" its
category. Means nothing.

### Pattern 4 — The Negation-Plus-Triplet

The triplet multiplier makes any of the above 3× worse:

> "The teams who thrive **aren't just** using AI for speed. They're combining
> it with **judgment, experience, and original thinking**."

Negation + three-item list = maximum AI smell.

### Pattern 5 — The Dash-Separated Negation

Em dashes amplify the pattern:

> "AI doesn't eliminate labor — it redistributes it."
> "This isn't a retreat from technology — it's an evolution enabled by it."

Em dashes are a secondary AI tell. Combined with negation, they are a red flag.

### Pattern 6 — The Anaphoric Negation Triplet

Defining the product / idea by listing what it eliminates, repeating the
negation at the start of each clause:

| Form | Example |
|---|---|
| `No more X. No more Y. No more Z.` | "No more chasing quotes. No more production cycles. No more stories dying in Google Docs." |
| `No X, no Y, no Z.` | "No paraphrasing, no guesswork, no rewrites." |
| `Never X. Never Y. Never Z.` | "Never wait on writers. Never miss deadlines. Never compromise on voice." |

**Why it fails:** Reads punchy, feels earned — but it's still defining the
product by absence. Stealthy variant of Pattern 4, very common in launch
copy and landing pages. The rhythm disguises the negation scaffolding.

**Rewrite:** replace with affirmative triplet listing what the product
**does**, not what it eliminates.

> Before: "No more chasing quotes. No more 3-week cycles. No more stories dying."
> After: "Upload the recording. Get a drafted case study. Ship in 48 hours."

---

## Rewrite Strategies

### Strategy A — Delete the Negation, Keep the Affirmation

| AI draft | Rewrite |
|---|---|
| "It's not just a tool, it's a platform." | "It's a platform." (then justify) |
| "We're not just building software; we're building trust." | "We build software that earns trust." |
| "This isn't a retreat from technology, it's an evolution." | "This is an evolution of how we use technology." |

### Strategy B — Replace with Specificity

Abstract negation → concrete claim with numbers, names, mechanisms.

| AI draft | Rewrite |
|---|---|
| "AI doesn't eliminate labor; it redistributes it." | "AI handles your first drafts, SEO optimization, and research, freeing you for strategic writing that converts enterprise prospects." |
| "The future of legal practice isn't just better tools — it's digital colleagues." | "The future of legal practice is digital colleagues that draft, cite, and argue alongside human lawyers." |
| "Dropbox Paper is more than a doc — it's a co-editing tool." | "Dropbox Paper lets your whole team edit the same doc in real time." |

### Strategy C — Ground in Personal Experience

If a contrast genuinely belongs, anchor it in a specific moment, not an
abstract rule.

| AI draft | Rewrite |
|---|---|
| "It wasn't just a role — it was significant career growth." | "In that role I shipped three products, hired two engineers, and learned to run a P&L. It's where I actually became a manager." |

### Strategy D — Save Contrasts for Later

If a contrast is genuinely useful, introduce the main point first, then
contrast in detail once the reader has the substance. Never lead with a
negation.

---

## Self-Check Before Delivery

Before sending any generated prose, scan for:

1. **The word "just"** — highest-yield search for Patterns 1, 2, 3. Almost
   every flagged sentence contains it. Delete or rewrite.
2. **"isn't / doesn't / won't / aren't" followed within 10 words by "it's / they're / we're"** — the negate-then-affirm pattern.
3. **"more than a / beyond just"** — the upsell variant.
4. **Em dash + negation in the same sentence** — double tell. Rewrite.
5. **Triplets adjacent to a negation** — three-item list right after "not just".
6. **"No more X. No more Y." / "No X, no Y, no Z."** — anaphoric negation
   triplet (Pattern 6). Easy to miss because the rhythm feels punchy. Scan
   for repeated sentence-initial "No" or "Never".
7. **"not because X, but because Y"** — narrative correction variant of
   Pattern 2. Scan for the literal phrase `not because`.

If any pattern survives, rewrite before delivering. The user should never see
draft prose with these patterns in it.

---

## When Negation Is Actually OK

Negation is a legitimate rhetorical device in small doses. Keep it when:

- The negated idea is something the reader **genuinely holds** and you are
  correcting it (e.g., "Contrary to popular belief, X"). This is a real
  argument, not a stylistic tic.
- It appears **once** in a long piece, not as a recurring cadence.
- It's **specific** — negates a concrete named thing, not a vague abstraction.
- It's **absence-as-metric**, not absence-as-scaffolding. Measurable absences
  are legitimate claims: "Zero additional headcount required," "0 config,"
  "No credit card required." These state a concrete, verifiable fact about
  the product. The banned form is absence used as *rhetorical elevation*
  ("not just a tool, a platform") where the negation carries no information.

The rule is not "zero negation ever." It's "no reflexive, pattern-based
negation as sentence scaffolding."

---

## When This Skill Matters Most

Skill yield scales inversely with prompt specificity.

| Prompt type | Skill impact |
|---|---|
| Vague ("write a LinkedIn post about our AI product") | **High** — Claude reaches for negation scaffolding to fake substance |
| Detailed spec (numbers, named customers, defined voice) | **Moderate** — concrete anchors already push Claude toward affirmative phrasing, skill still catches residual patterns |
| Technical documentation, API docs | **Low** — genre doesn't invite rhetorical contrast |
| Landing-page hero copy, taglines | **Very high** — this is where the patterns are most entrenched |

If the user hands you a thin brief, treat skill rules as maximally strict.
If the user hands you a full product brief with real numbers, the rules
still apply but the natural baseline is already tighter.

---

## Expanding a Writing Prompt

When the user asks you to prepare or expand a prompt that another AI will use
to generate prose, append this block:

```
Writing constraints:
- Do not use contrastive negation. Never write "it's not just X, it's Y",
  "not X but Y", or "more than X — it's Y". Lead with what the thing IS.
- No em-dash-separated negations.
- Prefer concrete, affirmative sentences with specific nouns, numbers, or
  named mechanisms over abstract contrasts.
- If you must contrast, do it once, in detail, after establishing the main
  point — never as an opening hook.
```

See `references/prompt-snippets.md` for longer versions and variants tuned
for specific formats (LinkedIn, email, blog, landing page).

---

## Reviewing Existing Drafts

When handed a draft to audit:

1. Run the Self-Check scan (section above).
2. For each hit, quote the offending sentence and propose a rewrite using
   Strategy A, B, C, or D.
3. Deliver: (a) list of hits with rewrites, (b) clean full rewrite.
4. Second-pass: re-scan the clean rewrite — the rewrite itself can reintroduce
   the pattern if you're not careful.

Full review workflow and output template in `references/review-workflow.md`.

---

## Changelog

### v1.1.0 — 2026-04-21
- Added Pattern 6 — Anaphoric Negation Triplets ("No more X. No more Y. No more Z.")
  after real A/B test showed it as the stealthiest pattern baseline Claude
  still reaches for in LinkedIn/launch copy
- Extended Pattern 2 with the `not because X, but because Y` explanatory
  subvariant — common in narrative/founder-voice writing, slipped past v1.0
- Clarified exception: absence-as-metric ("Zero config", "No credit card required")
  is legitimate; absence-as-scaffolding is not
- Added "When This Skill Matters Most" section — skill yield scales inversely
  with prompt specificity

### v1.0.0 — 2026-04-21
- Initial skill created
- Based on Blake Stockton's "Don't Write Like AI (1 of 101): Negation" plus
  related material from gc.ai and olereissmann.com
- Covers 5 negation pattern families, 4 rewrite strategies, self-check scan,
  legitimate-use exceptions, and prompt-expansion block
- References: `prompt-snippets.md`, `review-workflow.md`
