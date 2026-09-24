# OpenCode Plan Format Reference

Full template for a root `PLAN.md` executed by plain OpenCode (GO models).
Fill in every section — the executor has no other context.

---

## Full Template

```markdown
# [Plan Title — specific noun phrase, e.g. "Events Page Search Filter"]

## TL;DR

2–4 sentences: (1) what is being built/changed, (2) why, (3) the one
constraint or gotcha that matters most.

> Add search and category filter to the /events page. Events render as Webflow
> CMS `.w-dyn-item` elements with plain (non-`data-*`) attributes. All
> filtering is client-side — no API calls.

---

## Session Protocol

Read this section first, every session.

1. Read `## Current State` — work ONLY the task it names
2. Model check: if the task's `model:` line names a stronger model than the one
   running, STOP and tell the user
3. Complete the task, run its acceptance checks, then run the gates below
4. Update `## Current State` (mark done, name the next task, note deviations)
5. STOP after one task unless the user said to batch

**Gates (must pass before a task counts as done):**
- `npm run check`
- `npm run build`

**Stop and ask the user when:** a named file/selector is missing, a gate fails
twice, the task needs a decision not written here, or you would touch files
outside the task's scope.

---

## Current State

- **Next task:** Task 1
- **Done:** —
- **Notes / deviations:** —

---

## Context

### Key Files
- `path/to/file.js` — what it does; what must not change
- `path/to/other.css` — what it does

### Environment
- Framework / runtime, build command, where credentials live (never inline them)

### Gotchas
- Anything that looks wrong but is intentional
- Anything tried before and abandoned, with the reason

---

## Tasks

### Task 1 — [Title]
engine: opencode        ← only when the user asked for a split
model: [verified GO model]  (Claude equivalent: [Claude model])
depends on: —

Steps:
- [ ] Open `path/to/file.js`
- [ ] In `functionName()` (~line 120), add after the `init()` call:
      ```js
      // exact code
      ```
- [ ] Run `node scripts/test.js`

Acceptance criteria:
- `node scripts/test.js` prints `OK`
- No new console errors on `/events`

Stop if: `functionName()` does not exist in the file.

---

### Task 2 — [Title]
engine: claude
depends on: Task 1

Steps:
- [ ] ...

Acceptance criteria:
- ...

---

## Final Verification

- [ ] [End-to-end check, e.g. "Type 'jazz' in search on /events — only jazz events stay visible"]
- [ ] Regression: [existing feature] still works
- [ ] No console errors
- [ ] No references to deleted or renamed files

---

## Commit Strategy

- Branch: `feat/[scope]` off the default branch
- One commit per task: `feat(scope): [task title]`
- Never commit `PLAN.md`, `AGENTS.md`, or other personal workflow files unless
  the project already tracks them
```

---

## Writing Tips for GO Models

### Put critical facts where they are read
- Exact selectors, paths and APIs go at the top of `Context` AND inside the task
  that uses them
- Give approximate line numbers for long files: "around line 200"

### Acceptance criteria that actually work
Bad: "The feature works correctly"
Good: "Filtering by category shows only events whose `category` attribute
matches; others get `display: none`; the counter shows the filtered count"

### Task sizing
- One task = one area of the codebase = one commit
- More than ~10 steps → split it
- Final Verification is always its own section, never folded into a task

### Context vs Task steps

| Belongs in Context | Belongs in Task steps |
|---|---|
| Why the codebase is shaped this way | Exact edits to make |
| Prior decisions and failures | Files to open |
| Gotchas that affect several tasks | Acceptance criteria |
| Where credentials live | Verification commands |

### Keeping Current State honest
The executor must update `## Current State` before stopping. When auditing,
compare it against `git log` and the actual diff — a task marked done with no
matching change is a red flag.
