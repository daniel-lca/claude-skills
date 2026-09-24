# Internal reports — components and sourcing

Read `spec.md` first; everything here layers on top of it. Same shell, same palette, same hard rules.

An internal report answers three questions in this order: **what was wrong**, **what changed**, **why that way**. The third one is the reason the document exists — a report that only lists changes is a changelog, and a changelog does not need a viewer link.

## Section order that works

1. **Cover** — title, one-line scope, stat row (`N` issues resolved · `N` PRs · date range · pages touched).
2. **Scope** — exactly what the report covers and, explicitly, what it does not. Prevents the reader assuming coverage you never claimed.
3. **TOC** — jump links, sticky or inline pill row.
4. **Timeline / PR ledger** — the record, chronological, each row linking out.
5. **Issue → Fix → Why blocks** — the body. One block per problem, grouped by area.
6. **Decision record** — the rationale-heavy items that deserve prose rather than a card. Optional; use when the "why" is longer than three sentences.
7. **Current state** — what the thing looks like now. Snapshot values, not narrative.
8. **Open / deferred** — what stays unresolved, and where it is parked. Never silently omit this.
9. **Closing band** — the last element; the viewer supplies the footer.

Sections 2, 8 are the ones people skip and the ones that make a report trustworthy. Keep them.

**There is no next-steps section, and the list above is not missing one.** Open/deferred already
carries everything unresolved, stated as status rather than as a plan. A status or situation
brief — the variant that reports what is blocked and who owes what — follows the same order with
the ledger and decision record dropped, and it ends the same way: last finding, closing band.

A forward-looking section is tempting because it feels like service. It costs the sender a
commitment. The document gets forwarded past the person who wrote it, and a "next week we
publish" line read by a client becomes a date nobody agreed to. Status verbs only: *is built*,
*is blocked*, *is waiting on*. Watch the tail of sentences too — "unlisted and not indexed" is
status, "unlisted and not indexed, ready to publish the moment copy is approved" is a plan.

## Report the work, not the working

**A change report covers what was delivered. It is not a log of how the investigation went.** Anything the reader cannot act on gets cut, no matter how much effort it represents.

Cut these, always:

- **Findings that turned out to be non-findings.** Something flagged during investigation and then confirmed correct was never a defect, so it does not belong in a report about defects. Listing it invites the reader to re-litigate work already settled.
- **Your own missteps during the work.** A wrong first diagnosis, a check that failed to fire, a value corrected before it shipped, a tool used wrongly then used correctly. None of it changed the deliverable.
- **Process meta about how you verified.** "Confirmed against the vendor's own docs" belongs inside the *why* row of the block it supports, as one clause. It does not earn its own section or callout.
- **Alternatives considered and rejected**, unless the rejection *is* the decision being recorded. A decision record states the call and its cost; it is not a transcript.

Keep these, because they describe the delivered work:

- **Rationale for a scope boundary** — "filenames were left unchanged because renaming moves a live URL" explains the shape of what shipped.
- **Anything still open**, in the Open/deferred section. Unresolved work is actionable; a resolved false alarm is not.
- **A defect found and fixed while doing the work**, even incidentally. It shipped, so it counts.

The test: *would a reader do anything differently if this were removed?* If the honest answer is no, it is autobiography, and the report is stronger without it. Self-critique reads as diligence to its author and as noise to everyone else — and in a document that gets forwarded, it competes with the real findings for attention.

Where the investigation genuinely needs recording, it goes in the task tracker or the project's own lesson files, never in a shared deliverable.

## Whose voice the document speaks in

The sender's. Every sentence is read as written by the person who pasted the link, and in most
cases forwarded onward by them, so the document carries their professional judgement and nothing
should suggest otherwise.

That rules out machine-process framing anywhere in the file — body copy, card labels, captions,
stat labels, the closing line. No "I analysed", "automated scan", "generated report", "the tool
found". State the finding, or state the delivered work:

| Reads as a tool narrating | Reads as a person reporting |
|---|---|
| "Automated crawl detected 6 unsourced figures" | "Six figures in the copy have no stated source" |
| "I generated both pages and verified them" | "Both pages are built, checked at desktop and phone widths" |
| "Analysis suggests the CTA may be problematic" | "The CTA redirects to a login wall" |

The right-hand column is also shorter and more certain, which is why this rule and the
numbers-over-adjectives rule tend to fire on the same sentence. When an observation genuinely
carries uncertainty, say what is unverified — "no public record found for this claim" — rather
than hedging the whole sentence into a machine register.

## Report-only components

### Inline TOC pill row

A `flex` wrap of anchor pills, `rgba(112, 92, 246, 0.08)` background, `#705CF6` text, 11px 600, `border-radius: 100px`, `padding: 7px 14px`. Anchors to section `id`s. Body already has `scroll-behavior: smooth`.

```css
.toc { display: flex !important; flex-wrap: wrap !important; gap: 8px !important; }
.toc a {
  background: rgba(112, 92, 246, 0.08) !important; color: #705CF6 !important;
  font-size: 11px !important; font-weight: 600 !important;
  padding: 7px 14px !important; border-radius: 100px !important;
  text-decoration: none !important;
}
```

Add `scroll-margin-top: 80px !important` to every section with an `id` so the viewer's 57px sticky header does not cover the heading on jump.

### Issue → Fix → Why block

The workhorse. A white card in a 1px-gap stack, internally three labelled rows:

- **ISSUE** — label 10px 600 uppercase `#B5B5B5`, body `#414141`. State the symptom as a user would hit it.
- **FIX** — label in `#705CF6`, body `#414141`. State the mechanism, name the file.
- **WHY** — label in `#705CF6`, body `#414141`, set on an inset wash (`rgba(112,92,246,0.06)`, `border-radius: 6px`, `padding: 14px 16px`) so the rationale reads as the emphasised part of the card.

Card header carries the issue title (15px 700 `#282828`), a status badge, and optional PR reference in mono 11px `#B5B5B5`.

Do not collapse ISSUE and FIX into one paragraph. The split is what makes the document scannable.

### Before / after panel

Two columns, 1px gap divider. Left column = prior state, 2px `#B5B5B5` left accent bar, label `BEFORE` / `ANTES` in `#B5B5B5`. Right column = current state, 2px `#705CF6` bar, label `AFTER` / `AHORA` in `#705CF6`. Collapses to stacked rows under 768px.

No red/green. The muted-to-accent progression carries the semantics and stays inside the palette.

### Code block

Inset inside a white card: `background: #FAF9F6`, `1px solid #D9D9D9`, `border-radius: 6px`, `padding: 14px 16px`, mono 12.5px `#414141`, `overflow-x: auto`, `white-space: pre`.

Keep snippets to the lines that carry the point — five lines that show the change beat forty lines of surrounding context. Escape `<`, `>`, `&` as entities.

For inline identifiers (file paths, class names, props) use a mono `<code>` with `rgba(112,92,246,0.08)` background, `#705CF6` text, `padding: 2px 6px`, `border-radius: 4px`.

### PR ledger row

1px-gap vertical stack. Each row: PR number in mono 11px `#705CF6` (fixed `min-width: 56px`), title 14px 600 `#282828`, area tag pill, merge date 11px `#B5B5B5` right-aligned, and a 28px circular `↗` link button pointing at the real PR URL. Rows stack under 768px.

### Metric delta row

For quantified changes: label 10px uppercase `#B5B5B5`, then `old → new` where old is `#B5B5B5` and new is `#705CF6` 700, arrow `→` in `#D9D9D9`. Use it wherever a number moved; it compresses a paragraph into a line.

### Era group label

When a ledger spans two distinct pushes — a recent burst on top of older work — split it rather than presenting one long chronological list. A flat list dated from the oldest entry makes three days of work read as three months, which is the single most common way a change report misleads.

Label each group with a rule that fills the remaining width, newest group first, and give each a one-line note saying what it was:

```css
.group-lab {
  display: flex !important; align-items: center !important; gap: 12px !important;
  font-size: 10px !important; font-weight: 600 !important; text-transform: uppercase !important;
  letter-spacing: 0.12em !important; color: #705CF6 !important; margin: 0 0 12px !important;
}
.group-lab::after { content: '' !important; flex: 1 1 auto !important; height: 1px !important; background: #D9D9D9 !important; }
.group-lab.muted { color: #B5B5B5 !important; }   /* the older era */
```

Accent for the current era, muted for the superseded one. The cover stat row must agree: lead with the recent count and its span, and carry the older changes as their own separate stat. Never print a single date range across both.

Keep the older rows. They are the "before" that the recent decisions are answers to — cutting them leaves the rationale sections starting mid-argument.

### Record-accuracy section

Sourcing a report usually surfaces places where the written record and the shipped code disagree. Give those their own subsection at the end rather than silently reporting whichever version you happened to trust.

One `ifw` card per divergence: what the record says, what ships, and which one is authoritative. This is often the most valuable part of the document, because it is the part nobody knew before the report was written.

### Callout

A single-purpose emphasis block for constraints and warnings. White card, 2px `#705CF6` left bar, label 10px 600 uppercase `#705CF6`, body `#414141`. Use sparingly — three callouts in a document is already too many.

## Sourcing rules

These are non-negotiable for internal reports, because the audience acts on them.

- **Read the record, do not recall it.** PR titles, numbers, merge dates, file paths, and diff contents come from `gh`/`git`/the files, checked in this session. Never from memory of a previous session.
- **A PR body is a claim about the past, not proof of the present.** Check every value you quote against the shipped source. A body written mid-review can describe an earlier iteration than the one that merged, a title can contradict its own body, and a follow-up PR can have moved the value since. Where they disagree, the code is what ships and the divergence is a finding — see the record-accuracy section above.
- **Count rows mechanically before stating a total.** Any "N PRs / N commits" figure in a cover stat or closing line gets counted from the markup with a regex, not tallied by eye. Miscounting the ledger you just wrote is the easiest way to lose a reader's trust in everything else.
- **Group by era before you group by area** when the work spans more than one push. Decide the eras from the merge dates, not from what feels recent.
- **A "why" you cannot source is a gap, not a blank to fill.** If the PR body, commit message, review thread, or a project doc does not state the rationale, write `Rationale not recorded in the PR — inferred from the diff:` and mark it as inference, or leave it out. Fabricated rationale is the one failure mode that makes these reports worse than nothing.
- **Distinguish shipped from proposed.** A branch that exists is not a change that landed. Check merge state.
- **Link everything linkable.** Real PR URLs, real file paths. A reader should be able to verify any claim in two clicks.
- **Say what you did not check.** One line in the Scope section costs nothing and prevents a false sense of coverage.

## Closing band for internal documents

The client-facing "Gracias por confiar y colaborar" copy does not belong on an internal report. Keep the same dark purple band and layout, swap the copy for a factual sign-off — the report subject plus the period covered, accent words in `#C5BDFA`. No footer of your own — the viewer supplies it (rule 7b).
