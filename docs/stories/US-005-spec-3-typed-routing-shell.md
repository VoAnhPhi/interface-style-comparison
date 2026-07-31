# US-005 Spec 3 Typed Routing Shell

## Status

implemented

## Lane

normal

## Product Contract

Make React Router the owner of application navigation while preserving the
accepted landing and Explorer experience. The first routing slice covers only
`/`, `/styles`, and explicit recovery for unknown paths; stable style slugs
remain a separate story.

## Relevant Product Docs

- `docs/decisions/0009-routing-and-url-ownership.md`
- `docs/product/spec-3/CURRENT_STATE.md`
- `docs/product/spec-3/ROADMAP.md`
- `docs/product/spec-3/TASKS.md`
- `docs/product/spec-3/IMPLEMENTATION_PLAN.md`
- `docs/product/spec-3/EVALUATION_AND_TESTING_RULES.md`

## Acceptance Criteria

- React Router owns browser-history navigation.
- Typed constants define every route implemented by this slice.
- `/` preserves the accepted landing page.
- `/styles` preserves the current Explorer and dossier workspace.
- Unknown paths render a clear Not Found page with recovery links.
- Direct load, reload, back, forward, landing CTA navigation, and recovery
  navigation work.
- Desktop and mobile checks show no horizontal overflow, broken images,
  console warnings, or console errors.
- `/styles/:slug` and query-state ownership are not introduced prematurely.

## Design Notes

- Commands: no product command.
- Queries: no route query parameters in this slice.
- API: React Router Declarative mode with `BrowserRouter`, `Routes`, `Route`,
  `useNavigate`, and `useLocation`.
- Tables: none.
- Domain rules: routes do not own normalized research facts.
- UI surfaces: landing, Explorer, and Not Found.

## Validation

| Layer | Expected proof |
| --- | --- |
| Unit | Typed route constants recognize only `/` and `/styles` |
| Integration | Router shell renders landing, Explorer, and wildcard recovery |
| E2E | Direct load, reload, CTA, back/forward, and recovery navigation |
| Platform | Browser QA at `1280x720` and `390x844` |
| Release | `npm test`, `npm run build`, Browser QA, and durable story verification |

## Harness Delta

- Recorded intake `#22`.
- Added durable story `US-005`.
- Advanced `S3-ROUTE-001` to completed and `S3-ROUTE-002` to ready.

## Evidence

- Added React Router `7.18.2` and wrapped the application in `BrowserRouter`.
- Added `src/routing/routes.ts` and two route-contract tests.
- Replaced manual pathname, `pushState`, and `popstate` ownership in `App.tsx`.
- Added an explicit Not Found page with landing and Explorer recovery links.
- `npm test` passed: 9 files, 55 tests.
- `npm run build` passed.
- Browser QA passed direct `/`, direct `/styles`, reload, landing CTA,
  back/forward, unknown route, and recovery-link flows.
- Desktop `1280x720` and mobile `390x844` checks passed with zero positive
  horizontal overflow, zero broken images, and no warning/error console logs.
- Browser QA exposed an invisible mobile “Return home” button caused by a
  landing-only color token; the token scope was corrected and visually
  re-verified.
- The remaining npm audit advisory targets RSC Action handling. This Vite SPA
  uses client-only Declarative mode and does not enable the affected server
  feature.
