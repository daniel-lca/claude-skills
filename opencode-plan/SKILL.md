---
name: opencode-plan
version: 2.0.0
repository: https://github.com/daniel-lca/claude-skills
description: >
  Use this skill ONLY when the user explicitly asks for OpenCode work: "write a
  plan for opencode", "hazme un plan para opencode", "I'll run this in
  OpenCode", "split this between you and OpenCode", "which GO model should run
  this step", or "audit what OpenCode did". Produces a self-contained root
  `PLAN.md` that plain OpenCode (OpenCode GO models) can execute with no prior
  session context, routes steps per-engine when a split is requested, and
  audits results afterwards. Never trigger on task size alone — never offer or
  suggest OpenCode unprompted.
---

# OpenCode Plan Skill

Writes a plain `PLAN.md` that OpenCode GO models execute, and audits the result
when the user comes back. Claude plans and reviews; OpenCode executes the steps
the user chose to hand over.

---

## Activation Rule — Explicit Request Only

This skill never starts itself. Do NOT:
- ask "should I handle this myself, hand it to OpenCode, or split it?"
- offer an OpenCode plan because a task is multi-file or mechanical
- tag steps with engines the user did not ask about
- infer a switch from casual remarks ("voy alternando", "I'm low on Claude")

The user switches engines on their own timing (session limits, preference).
Until they explicitly ask, do the work on Claude.

---

## Setup Context

- **Plain OpenCode.** No oh-my-opencode / ohmyopenagents / Slim, no
  `.sisyphus/`, no `/start-work`, no Prometheus/Atlas agents. Never reference them.
- **OpenCode GO subscription** — dollar-capped usage, roster of cheaper coding
  models. Context windows are large (hundreds of K tokens), but reasoning is
  weaker than Claude: they follow explicit steps well and drift on ambiguity.
- **Plans live in `PLAN.md` at the project root.** OpenCode reads it directly.
  Project-wide OpenCode rules belong in `AGENTS.md` (OpenCode's bootstrap file),
  not in the plan.
- **Execution is strictly sequential.** One task finishes (and merges, if the
  project uses PRs) before the next starts, in either tool. Never plan around
  parallel branches or cross-tool collision windows.

---

## GO Models — Verify, Never Assume

The GO roster rotates. Never hard-code a model from memory or from an older plan.

When a step needs a model recommendation:
1. Run a fresh web search for the current OpenCode GO lineup and coding ranking
2. Cross-check against the user's in-app model picker — that is the authoritative
   set. `~/.cache/opencode/models.json` (provider `opencode-go`) lists exact IDs
   and context windows, but it is a superset and includes models not in the plan
3. Recommend one model per step, plus the Claude-tier equivalent in case the
   user stays on Claude

---

## Routing (Only When a Split Is Requested)

| Keep on Claude | Hand to OpenCode GO |
|---|---|
| Architecture, debugging, judgment calls | Mechanical edits with exact targets |
| Correctness-critical logic | Bulk renames, formatting, boilerplate |
| Faithful transcription from a source that tests can't validate | Repetitive CMS / data moves with a validator |
| Final audit of every OpenCode step | Scaffolding from a fully specified template |

**Gotcha:** "looks mechanical" is not enough. Cheap models hallucinate when a
step copies facts from a source (docs, spreadsheets, transcripts) and nothing
automated catches wrong content. Keep those on Claude.

Tag each task with `engine:` only when the user asked for a split.

---

## Writing Rules for GO Models

Assume the executor has **zero prior context** — never write "as discussed" or
"the previous session".

- **Exact paths** — `scripts/upload-icons.js`, never "the upload script"
- **Exact identifiers** — selectors, function names, endpoints, env var names
- **Acceptance criteria per task** — a check the model can run or observe
- **One task = one blast radius** — split anything that touches unrelated areas
- **Repeat critical facts inside the task** — don't rely on the model
  remembering the Context section three tasks later
- **Stop conditions** — tell the model when to stop and ask instead of guessing
  (missing file, failing gate, task heavier than its assigned model)

---

## Plan Format

Full template: → `references/plan-format.md`

**Required sections, in order:**

1. `## TL;DR` — what, why, key constraint (2–4 sentences)
2. `## Session Protocol` — how to start, pacing, stop conditions, gates
3. `## Current State` — which task is next; updated after every task
4. `## Context` — codebase facts, key files, gotchas
5. `## Tasks` — numbered, sequential, each with steps + acceptance criteria
6. `## Final Verification` — end-to-end checks
7. `## Commit Strategy` — branch, message format, what never gets committed

---

## Output Checklist

Before saving `PLAN.md`:

- [ ] Saved at the project root as `PLAN.md` (no `.sisyphus/`, no subfolder)
- [ ] No references to prior conversation
- [ ] Every path and identifier is explicit
- [ ] Every task has acceptance criteria and a stop condition
- [ ] Tasks are ordered strictly sequentially; dependencies stated
- [ ] Model recommendations (if any) verified by a web search this session
- [ ] `Current State` points at the first task
- [ ] Plan fits the scope — no 7-section plan for a 2-step change

---

## After OpenCode Runs

1. Read the changed files — never trust what the plan said should happen
2. Run the project's gates (typecheck, build, tests) yourself
3. Check `Current State` and any notes OpenCode appended to `PLAN.md`
4. Audit for correctness, regressions, and codebase consistency
5. Report briefly: what's good, what needs fixing; update `Current State`

---

## Changelog

### v2.0.0 — 2026-09-24
- Rewrote for plain OpenCode: dropped ohmyopenagents, `.sisyphus/`, Prometheus format and `/start-work`
- Plans now live in a root `PLAN.md` with Session Protocol and Current State sections
- Activation restricted to explicit user requests; removed the "ask upfront" decision step
- Removed hard-coded GLM-4 models; added verify-via-web-search rule and models.json superset gotcha
- Added per-step routing table, transcription-hallucination gotcha, strict sequential execution

### v1.0.0 — 2026-04-08
- Initial skill created
- Decision tree: execute vs plan
- GO model constraints and writing rules
- Plan file location, naming, and format summary
- Post-execution audit workflow
