# Phase 1: Monorepo Foundation & CI - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-06
**Phase:** 1-Monorepo Foundation & CI
**Areas discussed:** None (user skipped discussion)

---

## Session Note

User requested to proceed without interactive discussion ("jdeme dál, nechci diskutovat"). All decisions in CONTEXT.md were auto-derived from project requirements, research artifacts, and codebase analysis.

## Gray Areas Presented (not discussed)

| Area | Options Considered | Selected |
|------|-------------------|----------|
| Monorepo cutover strategy | Big-bang move vs staged migration | Big-bang move (D-01) |
| Workspace scaffolding scope | Full skeleton vs Czech-only | Full skeleton with placeholder EN app (D-04) |
| Draft exclusion enforcement | getStaticPaths only vs all outputs vs CI check | All outputs, build-time guardrail (D-13–D-16) |
| CI guardrails in Phase 1 | Turbo local only vs PR build vs dual-app CI | PR build Czech app only; FTP deploy updated (D-17–D-20) |

## Claude's Discretion

- File move mapping details
- Root tsconfig.json timing
- Turbo remote cache configuration

## Deferred Ideas

See CONTEXT.md `<deferred>` section — shared packages, English app, Vercel, dual-app CI, parity verification, linting toolchain.
