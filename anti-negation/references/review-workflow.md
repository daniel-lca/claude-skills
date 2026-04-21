# Review Workflow — Auditing Drafts for Negation

Use this when the user hands over an existing draft ("review this", "make it
sound less like AI", "humanize this copy").

---

## Step 1 — Scan

Grep the draft for these tokens in order of yield:

| Priority | Token | What to check |
|---|---|---|
| 1 | `just` | Most flags contain it. Especially "not just", "isn't just", "aren't just". |
| 2 | `isn't` / `doesn't` / `won't` / `aren't` / `wasn't` | Look for an affirmative clause within 10 words. |
| 3 | `more than` / `beyond just` / `rather than just` | Upsell-variant negation. |
| 4 | ` — ` (em dash) | If adjacent to a negation, double tell. |
| 5 | Three-item lists after a negation | Highest-smell compound pattern. |

---

## Step 2 — Classify Each Hit

For each flagged sentence, label the pattern family:

- **P1** — "Not just X, it's Y"
- **P2** — "Not X, but Y"
- **P3** — "More than X — it's Y"
- **P4** — Negation + triplet
- **P5** — Em-dash negation

---

## Step 3 — Rewrite Each

Apply one of the four strategies from SKILL.md:

- **A** — Delete the negation, keep the affirmation
- **B** — Replace with specificity (numbers, names, mechanisms)
- **C** — Ground in personal experience
- **D** — Move the contrast later in the piece (or cut it entirely)

---

## Step 4 — Output Template

Deliver in this exact structure:

```markdown
## Negation audit

**Hits found: N**

1. [P1] "It's not just a tool, it's a platform."
   → "It's a platform — here's what that means in practice: [specifics]."
   (Strategy A + B)

2. [P4] "They're not just using AI. They're combining judgment, experience, and thinking."
   → "They pair AI with human judgment — specifically, [named example]."
   (Strategy B)

...

## Clean rewrite

[Full draft with all fixes applied inline]

## Second-pass notes

[Any patterns that crept back into the rewrite itself, with corrections]
```

---

## Step 5 — Second Pass (Critical)

Re-scan your own clean rewrite with Step 1. Rewrites routinely reintroduce the
pattern — especially if the original draft relied on negation as a structural
crutch. If any hit survives, fix it before delivering.

---

## Common Rewrite Failures

**Failure mode 1 — swapping "just" for "merely":**
> "It's not just a tool, it's a platform" → "It's not merely a tool, it's a platform"

Still a negation. Kill the whole clause.

**Failure mode 2 — replacing em dash with comma:**
> "AI doesn't eliminate labor — it redistributes it." → "AI doesn't eliminate labor, it redistributes it."

Still a negation. Rewrite: "AI redistributes labor across [specific tasks]."

**Failure mode 3 — burying the negation mid-paragraph:**
Moving a banned structure from sentence 1 to sentence 4 doesn't fix it. The
pattern is the problem, not its position.

**Failure mode 4 — swapping to a different negation family:**
> "Not just a CRM — a growth engine" → "More than a CRM; a growth engine"

Same pattern, different token. Both banned.
