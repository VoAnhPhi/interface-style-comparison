# Project Quality Gates

Use this file with `docs/AGENT_SKILLS.md` for every visual-dossier phase.

## Required gate order

1. `agency-ui-designer`: audit hierarchy, typography, contrast, image crop, and
   style fidelity before implementation.
2. `agency-frontend-developer`: implement the selected React/CSS change.
3. `browser:control-in-app-browser`: verify desktop and `390x844` mobile flows,
   style selection, dossier tabs, console output, and horizontal overflow.
4. `agency-code-reviewer`: review correctness, accessibility, maintainability,
   and performance before completion.
5. `agency-technical-writer`: synchronize the phase plan, story evidence, asset
   manifest, and Harness record.

Use `design-taste-frontend` only for editorial, portfolio, or expressive
marketing-like scenes. Use `agency-ux-architect` when navigation, responsive
behavior, or dossier information architecture changes. Reserve
`agency-software-architect` for data-model, renderer architecture, persistence,
or system-boundary changes.

## Runtime fallback

Local skills are activated by `scripts/enable-project-skills.ps1`. If a task
runtime has not refreshed its skill catalog yet, follow the same gate order from
this file, use the named browser plugin directly for QA, and record that the
local-skill gate was a documented fallback in the Harness trace. Do not claim a
phase complete without browser proof, review, and documentation evidence.

## Harness providers

The local Harness database registers these runtime-dependent providers:

| Provider | Capability | Registry status meaning |
| --- | --- | --- |
| `codebase-memory-mcp` | `impact-analysis` | `unknown` until the current Codex session confirms its MCP connection. |
| `browser-qa` | `browser-qa` | `unknown` until the current Codex session confirms the Browser plugin. |

Run `./scripts/bin/harness-cli.exe tool check --json` at task intake. A runtime
provider without a filesystem probe remains `unknown` by design; confirm it in
the current session instead of treating that as a failed quality gate.
