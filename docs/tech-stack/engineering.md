# Engineering Tooling Stack

## Scope

This document covers package management, linting, formatting, tests, git hooks, and observability.

## Current Tooling

### Frontend Package Management

- npm
- `package-lock.json`

### Lint and Formatting

- ESLint
- Prettier

### Git Hooks

- Husky
- lint-staged

### Frontend Testing

- Vitest
- Vue Test Utils
- Cypress

### Backend Testing

- JUnit
- Testcontainers

## Approved Direction

### Package Management

- Move from npm to pnpm

Why:

- Better install performance
- Cleaner dependency storage model
- Better long-term scalability

### Lint and Formatting

- Keep ESLint
- Keep Prettier
- Defer Biome

Why:

- Existing setup already works
- Migration to PrimeVue and Tailwind is the priority
- Adding Biome now would increase workflow complexity

### Commit Workflow

- Keep Husky
- Keep lint-staged
- Defer Commitizen

Why:

- Existing hook infrastructure is already present
- Commitizen is not required to deliver the modernization

### Observability

- Add Sentry for frontend runtime monitoring

Why:

- Helps catch regressions after UI migration
- Gives production visibility not currently present

## Engineering Checklist

### Package Management

- [ ] Introduce `pnpm`.
- [ ] Add `pnpm-lock.yaml`.
- [ ] Update CI and local scripts to prefer `pnpm`.
- [ ] Remove npm-specific assumptions after transition completes.

### Lint and Format

- [ ] Keep ESLint rules working during migration.
- [ ] Keep Prettier as the formatting baseline.
- [ ] Reevaluate Biome only after the migration stabilizes.

### Hooks and Commit Flow

- [ ] Keep Husky active.
- [ ] Keep lint-staged active.
- [ ] Add commit tooling only if the team explicitly needs conventional commit enforcement.

### Testing

- [ ] Keep Vitest + Vue Test Utils for component and composable coverage.
- [ ] Keep Cypress for E2E coverage unless the team later standardizes elsewhere.
- [ ] Ensure new Vue Query and VeeValidate abstractions get dedicated tests.

### Monitoring

- [ ] Add Sentry environment configuration.
- [ ] Add release and source map strategy before production rollout.

## Key Files

- [package.json](/Users/waincent/Workspace/FitRx/package.json)
- [eslint.config.ts](/Users/waincent/Workspace/FitRx/eslint.config.ts)
- [.husky](/Users/waincent/Workspace/FitRx/.husky)
- [vitest.config.ts](/Users/waincent/Workspace/FitRx/vitest.config.ts)
