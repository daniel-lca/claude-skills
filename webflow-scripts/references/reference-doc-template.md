# Reference Doc Template — `<name>-reference.md`

Copy the skeleton below into a new `<name>-reference.md` alongside the script.
Replace placeholders, delete sections that don't apply. Keep it tight — a
reference doc should let a fresh session understand the script in under two
minutes.

---

```markdown
# <Script Name> — Reference

Folder: `<folder>/`. Canonical script: `<name>.txt`.

## Deployment status

- Last synced with <staging | production>: YYYY-MM-DD
- Pending vs deployed: <list of edits in local `.txt` that aren't live yet>
- Local `.txt` reflects the <current | pending> state — paste to deploy.

## Where it lives

- https://<site>/<page-path>  (and any other pages)
- Pasted in Webflow **<Page Settings > Custom Code> (before `</body>`) | Embed component>**.

## What it does

One short paragraph describing the script's purpose and high-level behavior.
Mention any external dependency loaded elsewhere (Swiper, Chart.js, GSAP via
Webflow Site Settings, etc.).

Constants worth flagging:
- `<CONSTANT_NAME> = <value>` — what it represents.

## DOM hooks

Inputs / triggers:
- `<selector>` — what it does.

Output targets / read targets:

| Selector | Used for |
|---|---|
| `[data-foo="1"]` | ... |
| `#someId` | ... |

Any guards (e.g. `__feeBound` flag, MutationObserver to handle Webflow CMS
re-render) noted here.

## Notes / known issues

- Gotchas, browser quirks, integration constraints.
- Things a fresh session would otherwise rediscover the hard way.

## Pending change (optional)

If there's a pending edit not yet deployed, describe what changed and why.
Easy revert instructions if applicable.
```

---

## Section guidance

**Deployment status** is the single section the reader will look at first.
Keep it accurate. If the local `.txt` differs from the live script, say so
explicitly with one-line summaries of each difference.

**Where it lives** must list every page the script appears on. One script can
exist on multiple pages — verify with Playwright when in doubt.

**What it does** stays short. The script is the source of truth on *how*; the
reference doc explains *why* and *where*.

**DOM hooks** is the section that saves time on the next edit. Without it,
finding which selectors a script reads from requires reading the whole file.

**Notes / known issues** is the appropriate home for hard-won facts — a
browser-specific bug, a Webflow IX2 conflict, a CDN dependency that loads
async, an inline-style war with the Designer. If you fixed it once, write it
here so it doesn't bite again.

**Pending change** only exists during the window between editing the local
`.txt` and pasting it into Webflow. Delete the section after deployment, or
fold it into a "Recent changes" list if you want a short history.
