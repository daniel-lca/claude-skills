# INSTALL.md — Instructions for AI Assistants

You are an AI assistant (Claude or similar) asked to **install or update** one or
more skills from this repo (`https://github.com/daniel-lca/claude-skills`). Follow
this file exactly. The user may know nothing about git, zips, or skill folders —
do the work yourself and only ask them to do what you cannot.

---

## Step 1 — Identify the skill(s)

- Match the requested name to a folder in the repo root (e.g. `lowcode-html-drop`).
  Each skill folder contains a `SKILL.md`; the folder name equals its `name:` field.
- Read the skill's row in the **Skills** table of `README.md`: note its **Version**
  and its **Chat** column (`Yes` or `Code only`).
- Name not found → list the available skills and ask which one they meant.

## Step 2 — Detect your environment

| You are in… | How to tell | Go to |
|---|---|---|
| **Claude Code on the user's machine** | You have a shell and file tools on the user's own computer; `~/.claude/` exists | Path A |
| **Claude Chat** (claude.ai web, desktop or mobile app) | You have no access to the user's filesystem; at most a code-execution sandbox | Path B |
| **Claude Code in a cloud / ephemeral session** | Shell exists but runs in a temporary remote container | Path B — files installed there vanish when the session ends |

---

## Path A — Claude Code (local)

1. **Already installed via their Claude account?** If a folder with the skill's
   name exists under `~/.claude/skills/synced/`, it was uploaded in Chat and
   already loads here. Tell the user and stop — installing again loads it twice.
2. **Get the repo.**
   - Look for an existing clone first (e.g. `~/claude-skills`, or the target of an
     existing link in `~/.claude/skills/`). If found, `git pull` it.
   - Otherwise clone to `~/claude-skills` and tell the user that's where it lives:
     `git clone https://github.com/daniel-lca/claude-skills ~/claude-skills`
3. **Link, never copy** — a link updates with `git pull`; a copy drifts.
   - If `~/.claude/skills/<skill>` already exists as a plain folder (a copy),
     tell the user you are replacing it with a link, then remove it.
   - Mac / Linux:
     `ln -s ~/claude-skills/<skill> ~/.claude/skills/<skill>`
   - Windows (PowerShell) — `ln -s` in Git Bash copies instead of linking:
     `New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills\<skill>" -Target "$env:USERPROFILE\claude-skills\<skill>"`
     From Git Bash: `cmd //c mklink /J "%USERPROFILE%\.claude\skills\<skill>" "%USERPROFILE%\claude-skills\<skill>"`
4. **Verify:** `~/.claude/skills/<skill>/SKILL.md` exists and its `version:` matches
   the README row. Run any skill-specific check below.
5. **Report:** installed version, where the repo lives, and that new sessions pick
   the skill up automatically. **Update later:** `git pull` in the repo folder.

A `Code only` skill installs normally on this path.

---

## Path B — Claude Chat (or ephemeral sessions)

You cannot add skills to the user's account yourself. Your job: package the
skill as a `.skill` file and present it — the file card in the chat shows a
**Save skill** button, and one click installs it. Manual upload is the fallback.

1. **`Code only` skill?** Stop. Tell the user it needs Claude Code on their
   computer (it works on local folders/tools) and that installing it in Chat
   does nothing useful.
2. **Get the files** (try in order):
   - **a.** In your code-execution sandbox:
     `git clone --depth 1 https://github.com/daniel-lca/claude-skills`
   - **b.** Network blocked (common on Team/Enterprise plans) → ask the user to
     open the repo page, click the green **Code** button → **Download ZIP**, and
     upload that zip here. Extract it in your sandbox.
   - **c.** No code execution at all → give the user the manual steps in
     "Manual fallback" below and stop.
3. **Package as `<skill>.skill`** — a zip whose root is the skill **folder**
   (`<skill>/SKILL.md`, not a bare `SKILL.md`), with the `.skill` extension.
   Run the skill-specific check (below) first, then:
   ```python
   import shutil, os
   shutil.make_archive("<skill>", "zip", "claude-skills", "<skill>")
   os.replace("<skill>.zip", "<skill>.skill")
   ```
   Keep the folder name unchanged — it must equal the `name:` in `SKILL.md`.
4. **Present the `.skill` file** with your file-presenting tool (e.g.
   `present_files`). Tell the user in one line: **"Click Save skill on the file
   card to install it."** That's the whole install.
5. **No Save skill button** (their org blocks skill creation, or no file-presenting
   tool) → give them the file to download plus these steps:
   1. In Claude: **Customize → Skills → + → Create skill → Upload a skill**
   2. Select the downloaded file (if the picker only accepts `.zip`, rename
      `.skill` → `.zip` — the format is identical)
   3. If upload is refused: turn on code execution in **Settings → Capabilities**
      (Team/Enterprise: an owner enables it in **Organization settings → Plugins & skills**)
6. **Tell them:** the skill also loads in Claude Code on the same account, and it
   does **not** auto-update. To update, ask Claude again ("update <skill> from
   github.com/daniel-lca/claude-skills") and save the new file card.

**Whole team:** on Team / Enterprise, an admin can upload the same zip once at
**Organization settings → Plugins & skills → Add** — everyone gets it in Chat and
Code, and re-uploading updates everyone. Mention this if the user is installing
for colleagues.

### Manual fallback (no code execution)
1. Open `https://github.com/daniel-lca/claude-skills` → **Code** → **Download ZIP** → extract
2. Right-click the `<skill>` folder → compress to a `.zip`
3. Upload it via **Customize → Skills → + → Create skill → Upload a skill**

---

## Updating an existing install

- **Code (linked):** `git pull` in the repo folder. Nothing else.
- **Code (copied folder):** replace the copy with a link (Path A, step 3).
- **Chat:** repackage and present the new `.skill` file (Path B). If saving does
  not replace the old version, delete the old one in Customize → Skills first.
- Always tell the user the old → new version (compare `version:` in their
  installed `SKILL.md` with the README row).

---

## Skill-specific checks

| Skill | After installing |
|---|---|
| `lowcode-html-drop` | Run `node <skill-dir>/scripts/verify-drop.mjs <skill-dir>/assets/template-client.html` — expect `0 fail(s)` (placeholder warnings are normal). In Chat, run it in the sandbox before packaging. |

---

## Rules

- Never edit skill files during install — install exactly what the repo ships.
- Never install a skill twice in one environment (Chat upload + local link = duplicate in Code).
- Never claim a skill is installed in Chat — only the user's upload does that.
- Keep instructions to the user short and click-by-click; do not paste this file at them.
