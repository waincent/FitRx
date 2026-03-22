# FitRx Tech Stack Inventory

This directory records the current technical stack of the FitRx project and the recommended target stack for the next stage of evolution.

## Documents

- [frontend.md](/Users/waincent/Workspace/FitRx/docs/tech-stack/frontend.md): Frontend stack, current status, target status, and migration checklist.
- [backend.md](/Users/waincent/Workspace/FitRx/docs/tech-stack/backend.md): Backend application stack, framework choices, runtime model, and recommended constraints.
- [database.md](/Users/waincent/Workspace/FitRx/docs/tech-stack/database.md): Database, schema migration, persistence model, and local development notes.
- [containers.md](/Users/waincent/Workspace/FitRx/docs/tech-stack/containers.md): Container and local dependency topology, including Docker Compose responsibilities.
- [engineering.md](/Users/waincent/Workspace/FitRx/docs/tech-stack/engineering.md): Tooling, package management, linting, testing, commit workflow, and observability.

## Usage

These files are intended to serve three purposes:

1. Provide an accurate snapshot of the current system.
2. Define the approved direction for frontend modernization.
3. Give implementation checklists that can be executed incrementally.

## Decision Summary

The current approved frontend modernization direction is:

- Keep: Vue 3, Vite, TypeScript, Pinia, Vue Router, VueUse, Vitest, Vue Test Utils.
- Adopt: PrimeVue, Tailwind CSS, VeeValidate, Vue Query, pnpm, Sentry.
- Keep for now: ESLint + Prettier.
- Defer for now: Biome, Commitizen, PrimeVue Chart unless business needs justify them.

## Migration Principle

Do not replace every layer at once.

- First upgrade shared infrastructure and tooling.
- Then migrate shared UI and form abstractions.
- Then migrate page modules in batches.
- Only remove legacy dependencies after the replacement layer is stable.
