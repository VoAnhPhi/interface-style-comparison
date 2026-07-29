# Product Docs

This directory contains the smaller living product contracts derived from the
project specs and accepted behavior.

When a user provides a project spec, derive smaller product contract files here
instead of keeping one large spec as the living plan. Name files by the product
domains that actually exist in that spec, for example `overview.md`,
`billing.md`, `workflows.md`, `permissions.md`, or `api-conventions.md`.

Do not create domain files before the spec just to fill the folder. Empty
structure is healthier than fake product truth.

## Active Contracts

- `ui-design-style-explorer.md`: current Foundation behavior.
- `project-report.md`: current research-workspace status and taxonomy.
- `spec-3-research-platform.md`: Spec 3 research, comparison, evolution, and
  decision-support contract.
- `spec-3/`: Spec 3 baseline, roadmap, task ledger, and sprint packet.
  Its canonical contracts include `DOMAIN_VOCABULARY.md`,
  `EVALUATION_AND_TESTING_RULES.md`, and `IMPLEMENTATION_PLAN.md`.

## Update Rule

When behavior changes:

1. Update the affected product doc.
2. Update or create the story packet.
3. Update durable proof status with `scripts/bin/harness-cli story add` or
   `scripts/bin/harness-cli story update`.
4. Record a decision if the change affects architecture, scope, risk, or a
   previously settled product rule.
