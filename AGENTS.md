# Agent Instructions

This repository is a React/Vite UI research workspace for comparing UI design
styles. Treat `spec.md` and `SPEC2.md` as high-value source material:

- `spec.md` is the original Finn UI style brief. It defines the strongest
  default direction: Modern SaaS with Minimal/Clean foundations, plus
  Enterprise/Admin as the dense operational mode.
- `SPEC2.md` is the expanded research corpus. It adds the broader taxonomy:
  Flat Design, Skeuomorphism, Claymorphism, Dark Futuristic, Web 2.0 Gloss /
  Frutiger Aero, design-system languages, and layout/brand patterns.
- Text from both specs is useful product copy. When improving layouts, prefer
  reusing their vocabulary for summaries, fit notes, cautions, token recipes,
  and style explanations.

Before changing product UI or research copy, read:

- `spec.md`
- `SPEC2.md`
- `docs/product/ui-design-style-explorer.md`
- `docs/product/project-report.md`
- `docs/design/research-workspace-next-effects.md`
- `docs/AGENT_SKILLS.md`

## Project skill activation

The version-controlled project skills live in `.agents/skills/`. They are the
canonical source for this repository; do not duplicate or edit a global copy.

- On a new machine or after adding a local skill, run
  `./scripts/enable-project-skills.ps1` in PowerShell. It creates safe local
  junctions under the user's Codex skills directory, without replacing an
  existing skill.
- Start a new Codex task after running the script so the skills can be
  discovered by the task runtime.
- Read `docs/QUALITY_GATES.md` before visual dossier work. It names the
  required design, implementation, browser-QA, review, and documentation gates
  and the explicit runtime fallback when a local skill is unavailable.

Code discovery rule:

- Prefer codebase-memory MCP tools over grep/glob for code discovery:
  `index_repository`, `search_graph`, `trace_path`, `get_code_snippet`, and
  `query_graph`.
- Fall back to shell search for markdown, specs, config values, and other
  non-code files.

<!-- HARNESS:BEGIN -->
## Harness

This repo uses Harness. Before work, read:

- `README.md`
- `docs/HARNESS.md`
- `docs/FEATURE_INTAKE.md`
- `docs/ARCHITECTURE.md`
- `docs/CONTEXT_RULES.md`
- `docs/TOOL_REGISTRY.md`
- `docs/AGENT_SKILLS.md`
- `scripts/bin/harness-cli query matrix` on macOS/Linux, or `.\scripts\bin\harness-cli.exe query matrix` on Windows

Use the Rust Harness CLI at `scripts/bin/harness-cli` on macOS/Linux or
`scripts/bin/harness-cli.exe` on Windows as the main operational tool. Before a
step that could use an external tool, run `scripts/bin/harness-cli query tools
--capability <name> --status present` to see what is equipped; an absent
capability is a clean skip.
<!-- HARNESS:END -->
