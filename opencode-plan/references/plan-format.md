# OpenCode Plan Format Reference

Full template for plans written in ohmyopenagents Prometheus format.
Copy this structure and fill in every section — agents skip nothing.

---

## Full Template

```markdown
# [Plan Title — clear, specific, no verbs like "Plan to..."]

## TL;DR

2–4 sentences. Cover: (1) what is being built/changed, (2) why (business or
technical reason), (3) one key constraint or gotcha to keep in mind.

Example:
> Add search and category filter to the /events page. Events are loaded as
> Webflow CMS `.w-dyn-item` elements with plain (non-`data-*`) attributes.
> All filtering must happen client-side — no API calls.

---

## Context

What the agent needs to know before touching any file.

### Codebase State
- Key files and their purpose:
  - `path/to/file.js` — what it does, what not to change
  - `path/to/other.js` — what it does
- Framework/environment: Webflow / Node.js / React / etc.
- Any constraints: rate limits, API credentials location, no build step, etc.

### Prior Work
- What is already done (so the agent doesn't redo it)
- What was tried and abandoned (and why)

### Key Selectors / APIs / Patterns
- Exact CSS selectors, attribute names, function signatures
- Anything that looks wrong but is intentionally that way

---

## Work Objectives

End-state checklist — what "done" looks like from the outside.

- [ ] Objective 1 (user-facing or functional)
- [ ] Objective 2
- [ ] Objective 3

---

## Execution Strategy

Break work into waves. A wave = a group of tasks that can run before the
next group starts. Tasks within a wave may run in parallel if labelled.

### Wave 1 — [Descriptive Name]

**Goal:** One sentence — what this wave accomplishes.

---

**todo:1** — [Task Title] *(can run in parallel with todo:2)*

Steps:
- [ ] Open `path/to/file.js`
- [ ] Find the `functionName()` function at line ~N
- [ ] Add the following block after line X:
      ```js
      // code here
      ```
- [ ] Verify: [specific check — e.g. "no syntax errors, function is exported"]

**Acceptance criteria:**
- The file saves without syntax errors
- Running `node scripts/test.js` outputs "OK"
- [Any other verifiable outcome]

---

**todo:2** — [Task Title] *(can run in parallel with todo:1)*

Steps:
- [ ] ...

**Acceptance criteria:**
- ...

---

### Wave 2 — [Descriptive Name] *(depends on Wave 1)*

**Goal:** What this wave builds on top of Wave 1.

---

**todo:3** — [Task Title] *(depends on todo:1 and todo:2)*

Steps:
- [ ] ...

**Acceptance criteria:**
- ...

---

## Final Verification Wave

Manual or automated checks to confirm the entire feature works end-to-end.

- [ ] [Check 1 — e.g. "Open /events in browser, type in search box, results filter correctly"]
- [ ] [Check 2]
- [ ] [Check 3 — regression: existing features still work]
- [ ] No console errors in the browser
- [ ] No broken references to deleted/renamed files

---

## Commit Strategy

When and how to commit:

**Option A — One commit at the end:**
```
git add path/to/changed/files
git commit -m "feat(scope): short description of what was added"
```

**Option B — One commit per wave (for larger plans):**
- After Wave 1: `feat(scope): add [wave 1 description]`
- After Wave 2: `feat(scope): add [wave 2 description]`

Do not commit `.sisyphus/boulder.json` or `notepads/` — these are
agent state files, not source code.
```

---

## Writing Tips for GO Models

### Context window management
- Put the most critical info (exact selectors, file paths, APIs) at the **top**
  of the Context section, not buried below
- Repeat key facts in individual TODOs — don't assume the agent remembers the
  Context section when it's on todo:4
- If a file is long, include the approximate line number: "around line 200"

### Acceptance criteria that actually work
Bad: "The feature works correctly"
Good: "Filtering by category shows only events with matching `category` attribute;
      all other events have `display: none`; counter updates to show filtered count"

### Parallelization labels
Use these exact phrases — ohmyopenagents atlas reads them:
- *(can run in parallel with todo:N)*
- *(depends on todo:N)*
- *(sequential — must complete before next wave)*

### Wave sizing
- Each wave should be completable in 1–3 agent sessions
- If a wave has more than 5 TODOs, split it into two waves
- Final Verification Wave is always its own wave — never bundle it with work

### What to include in Context vs TODOs
| Belongs in Context | Belongs in TODO steps |
|---|---|
| Why the codebase is structured this way | Exact edits to make |
| Historical decisions / prior failures | File paths to open |
| Gotchas that affect multiple tasks | Acceptance criteria |
| Credentials / API key locations | Verification commands |
