# Frontend Tech Stack

## Scope

This document covers the browser application under `src/main/webapp`.

## Current Stack

### Core Framework

- Vue 3
- Vite
- TypeScript
- Pinia
- Vue Router
- Vue I18n
- VueUse

### Current UI and Styling

- Bootstrap 5
- BootstrapVueNext
- Bootswatch
- SCSS
- Font Awesome

### Current HTTP and State Patterns

- Axios for direct HTTP requests
- Pinia for application state
- No dedicated server-state layer

### Current Form Validation

- Vuelidate

### Current Quality and Test Stack

- ESLint
- Prettier
- Vitest
- Vue Test Utils
- Cypress

## Approved Target Stack

### Keep

- Vue 3
- Vite
- TypeScript
- Pinia
- Vue Router
- VueUse
- Vitest
- Vue Test Utils

### Adopt

- PrimeVue
- Tailwind CSS
- VeeValidate
- Vue Query
- pnpm
- Sentry

### Defer

- Biome
- Commitizen
- PrimeVue Chart

These are intentionally deferred because they are not required to complete the main UI modernization and would increase migration scope.

## Why These Changes Make Sense

### PrimeVue

PrimeVue is a better fit for a modern Vue-first component strategy than BootstrapVueNext.

- Better alignment with Vue 3 patterns.
- More complete enterprise-style component surface.
- Easier long-term consistency for tables, dialogs, forms, and overlays.

### Tailwind CSS

Tailwind is recommended to replace the current Bootstrap-centered SCSS approach.

- Better component-level styling control.
- Easier to design a more product-specific UI language.
- Reduces dependency on framework-level layout conventions.

### VeeValidate

VeeValidate is recommended over Vuelidate for future forms.

- Stronger form abstraction model.
- Better composition with schema-based validation.
- More maintainable for larger form-heavy applications.

### Vue Query

Vue Query should become the default abstraction for API-backed server state.

- Better loading, error, refetch, retry, and cache behavior.
- Cleaner page code than repeated direct Axios calls.
- Easier mutation invalidation and data consistency.

### pnpm

pnpm is recommended as the future package manager.

- Better workspace hygiene.
- Faster installs and more deterministic dependency structure.
- Better long-term maintainability than continuing on plain npm.

### Sentry

Sentry should be introduced for runtime visibility.

- Better production error tracking.
- Better release diagnostics.
- Useful once the UI starts changing more aggressively.

## What Is Not Worth Changing Immediately

### ESLint Plus Prettier Plus Biome Together

Not recommended.

- Too much overlap.
- Higher maintenance overhead.
- More formatter and rule conflicts.

Recommended decision:

- Keep ESLint + Prettier in the short term.
- Revisit Biome only after the migration stabilizes.

### Commitizen

Not required for the modernization effort.

- Husky and lint-staged already exist.
- Conventional commit enforcement can be added later if needed.

## Current-to-Target Mapping

| Area | Current | Target | Priority |
|---|---|---|---|
| UI components | BootstrapVueNext | PrimeVue | High |
| Styling | Bootstrap + SCSS | Tailwind CSS | High |
| Forms | Vuelidate | VeeValidate | High |
| HTTP state | Axios direct calls | Vue Query + API layer | High |
| Package manager | npm | pnpm | High |
| Error monitoring | None | Sentry | Medium |
| Lint/format | ESLint + Prettier | Keep for now | Low |
| Biome | Not used | Defer | Low |
| Commitizen | Not used | Defer | Low |
| Charts | Not primary | Defer until needed | Low |

## Migration Checklist

### Phase 1: Foundation

- [ ] Add `pnpm` and create `pnpm-lock.yaml`.
- [ ] Add Tailwind CSS and PostCSS configuration.
- [ ] Add PrimeVue and choose a theme strategy.
- [ ] Add `@tanstack/vue-query`.
- [ ] Add `vee-validate`.
- [ ] Add Sentry SDK and environment placeholders.
- [ ] Keep ESLint + Prettier as the active formatting/linting pair.

### Phase 2: Shared Frontend Infrastructure

- [ ] Replace BootstrapVue plugin initialization.
- [ ] Add PrimeVue global configuration.
- [ ] Introduce a shared API client layer.
- [ ] Introduce a shared query client setup.
- [ ] Introduce shared form field wrappers.
- [ ] Start removing Bootstrap-specific global style assumptions.

### Phase 3: Feature Migration

- [ ] Migrate authentication pages.
- [ ] Migrate account settings pages.
- [ ] Migrate administration tables and dialogs.
- [ ] Replace Vuelidate usage with VeeValidate.
- [ ] Replace direct Axios page calls with Vue Query composables.

### Phase 4: Cleanup

- [ ] Remove Bootstrap, BootstrapVueNext, Bootswatch.
- [ ] Remove Vuelidate.
- [ ] Remove obsolete SCSS framework overrides.
- [ ] Standardize design tokens and utility classes.

## Important Constraints

- Migration should be incremental, not a full rewrite.
- PrimeVue and Tailwind should coexist with legacy Bootstrap temporarily during transition.
- API behavior should remain stable while transport abstractions change.
- Shared design primitives should be introduced before page-by-page migration accelerates.
