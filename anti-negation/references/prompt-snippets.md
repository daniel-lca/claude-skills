# Prompt Snippets — Anti-Negation Constraints

Drop-in blocks for expanding writing prompts. Pick the variant that matches
the length/formality of the target prompt.

---

## Minimal (one-liner)

> Avoid contrastive negation ("not just X, it's Y" / "not A but B" / "more than X — it's Y"). Lead with affirmative, concrete statements.

---

## Standard (prose + marketing copy)

```
Writing constraints:
- Do not use contrastive negation. Never write "it's not just X, it's Y",
  "not X but Y", "more than X — it's Y", or any variant that defines
  something by what it isn't.
- Lead with what the thing IS. If you must contrast, do it once, in detail,
  after establishing the main point — never as an opening hook or recurring
  cadence.
- Do not pair em dashes with negation ("AI doesn't X — it Y's").
- Prefer specific nouns, numbers, named mechanisms, and personal experience
  over abstract contrasts.
```

---

## LinkedIn / Social Variant

```
Voice rules:
- No "it's not just X, it's Y" hooks. Readers are onto it.
- No "We're not just building software — we're building trust" closers.
- Open with the concrete claim, anecdote, or number. Never with a negation.
- One contrast max in the whole post, and only if it's a specific belief
  the reader actually holds (not a strawman).
```

---

## Landing-Page / Tagline Variant

```
Copy rules:
- Never write taglines in the form "Not just [category], [higher category]."
  (e.g., "Not just a CRM — a growth engine.") This is the #1 AI tell in SaaS copy.
- Name what the product is in plain words, then show proof (number, outcome,
  named customer) on the next line.
- No "more than" framing. Every product claims to be more than its category;
  it means nothing.
```

---

## Blog / Long-Form Variant

```
Editorial rules:
- Contrastive negation ("not X, but Y") is banned as a rhetorical device
  at the sentence level. It reads as AI-generated.
- Exception: you may negate once per article when correcting a widely held
  belief the reader actually holds, and only if you cite the belief's source.
- No triadic patterns immediately following a negation ("They're not just A.
  They're B, C, and D.") — this is the most flagged structure in AI writing.
- Vary sentence length: mix 3–8 word sentences with 20+ word sentences.
  Uniformity is itself an AI signal.
```

---

## Email / Outreach Variant

```
Email rules:
- Never open with "X isn't just a [category] — it's a [elevated thing]".
- First sentence names a specific observation about the recipient (a post,
  a product, a hire, a metric). Second sentence states why you're writing.
  No contrast scaffolding.
```

---

## How to Use

When expanding a user's writing prompt, append the relevant block verbatim
under a `## Constraints` or `Voice rules:` heading. Don't summarize or
paraphrase — the literal negated examples are what makes the block effective.
