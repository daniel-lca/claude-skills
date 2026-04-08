---
name: opencode-plan
version: 1.0.0
repository: https://github.com/daniel-lca/claude-skills
description: >
  Use this skill when working on a project where the user has OpenCode with
  ohmyopenagents installed, or when asked to write a plan for OpenCode. Triggers
  on phrases like "write a plan for opencode", "create a sisyphus plan", "let
  opencode handle this", or any non-trivial multi-file task where the user might
  prefer to delegate execution to cheaper OpenCode GO models. Also triggers when
  the user asks "should I run this in OpenCode?" or "make a plan for this".
---

# OpenCode Plan Skill

Generates structured execution plans in ohmyopenagents Prometheus format
for OpenCode to run. Designed for a workflow where Claude acts as the
architect/auditor and OpenCode GO models handle mechanical execution.

---

## Setup Context

The user runs **OpenCode** with **GO models** (e.g. GLM-4-Flash, GLM-4-Air).
These models have:
- Smaller context windows than Claude (often 8k–32k vs 200k)
- Less reasoning capability — they follow explicit instructions well but
  struggle with ambiguity or large code comprehension tasks
- Lower cost — good for mechanical, well-scoped work

**ohmyopenagents** is installed. It uses:
- **Prometheus** agent: generates plans (Claude replaces this)
- **Atlas** agent: coordinates execution
- **Sisyphus-Junior** agents: execute individual tasks in parallel
- Plans live in `.sisyphus/plans/<plan-name>.md`
- Active plan tracked in `.sisyphus/boulder.json`

---

## Decision: Execute vs Write a Plan

For any non-trivial task, ask the user upfront:

> "Should I handle this myself, or write a plan for OpenCode to run?"

**Execute directly (Claude)** when:
- Single file edit or small bug fix
- Task requires reasoning/judgment throughout (e.g. debugging, architecture)
- The task is faster to do than to plan

**Write an OpenCode plan** when:
- Multi-file changes or new features
- Mechanical, repeatable work (data migration, bulk CMS updates, upload scripts)
- User wants to use cheaper GO model credits for execution
- Task can be broken into parallelizable independent steps

---

## Writing a Good Plan for GO Models

GO models need plans that are self-contained. Assume the agent has **no prior
context** — do not reference "the work we discussed" or "the previous session".

Rules:
- Include **exact file paths** — no "the config file", say `scripts/upload-icons.js`
- Include **exact selectors, function names, API endpoints** — no vague references
- Each TODO must have explicit **acceptance criteria** — how to verify it's done
- Mark which TODOs can run in **parallel** vs which must be **sequential**
- Keep each TODO **under ~50 lines of steps** — GO models lose track in long tasks
- Move background context to a `## Context` section — agents can skip it once familiar

---

## Plan File Location & Naming

Save plans to `.sisyphus/plans/<plan-name>.md` inside the project repo.

Naming: kebab-case describing the task — `upload-icons-plan.md`,
`events-page-implementation.md`, `add-search-filter.md`.

After writing a plan, tell the user to run `/start-work` in OpenCode.

---

## Plan Format

For the full format template with all sections, see:

→ `references/plan-format.md`

**Quick reference — required sections in order:**

1. `## TL;DR` — 2–4 sentences: what, why, key constraint
2. `## Context` — codebase state, key files, prior work done
3. `## Work Objectives` — bullet checklist of end goals
4. `## Execution Strategy` — waves of work, each wave has named TODOs
5. `## Final Verification Wave` — how to confirm everything works end-to-end
6. `## Commit Strategy` — when and how to commit

---

## Output Checklist

Before saving any plan to `.sisyphus/plans/`:

- [ ] No references to "previous conversation" or "what we discussed"
- [ ] Every file path is absolute or relative-from-root and explicit
- [ ] Every TODO has acceptance criteria
- [ ] Parallelizable TODOs are labelled *(can run in parallel)*
- [ ] Sequential dependencies are labelled *(depends on todo:N)*
- [ ] Context section has enough info for a GO model with no prior knowledge
- [ ] Plan fits the task scope — not over-engineered for a 2-step change
- [ ] `boulder.json` is clear before writing (no stale active plan)

---

## After OpenCode Runs

When the user returns after OpenCode execution:
1. Read the updated files — do not rely on what the plan said should happen
2. Check `.sisyphus/notepads/<plan-name>/learnings.md` if it exists — agents
   log discoveries and deviations there
3. Audit for correctness, regressions, and consistency with the codebase
4. Report findings concisely — what's good, what needs fixing

---

## Changelog

### v1.0.0 — 2026-04-08
- Initial skill created
- Decision tree: execute vs plan
- GO model constraints and writing rules
- Plan file location, naming, and format summary
- Post-execution audit workflow
