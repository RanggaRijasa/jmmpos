# JavaScript Architecture

## Runtime model

This directory intentionally uses ordered classic scripts, not ES modules. `bootstrap.js` first creates the complete DOM from `partials/`, then loads scripts one at a time according to `SCRIPT_PATHS`.

Top-level `const` and `let` bindings are shared across those classic scripts. Load order is therefore an API contract. If a file starts depending on a symbol, its provider must appear earlier in `SCRIPT_PATHS`. Do not add `type="module"` to only one file: migrate the entire dependency graph with explicit imports/exports in one coherent change.

## Ownership rules

- `data/`: fixtures and static mappings. Avoid DOM access.
- `core/state.js`: cross-feature mutable state only.
- `core/ui.js`: generic overlays, toasts, and navigation.
- `core/events.js`: delegated document-level DOM events and input handlers.
- `features/<domain>/`: calculations and rendering for one business domain.
- `main.js`: initial render calls only; do not place feature logic here.

Keep event delegation centralized so re-rendered HTML remains interactive. Prefer small named functions in the owning feature over adding more logic directly inside event handlers.

## State and rendering

The application currently uses shared in-memory state. A mutating operation must call every renderer whose output depends on that state. Pay special attention to the cart, member benefit counters, customer selection, pending transactions, and CMS views, which share records.

DOM IDs and `data-*` attributes form the contract with `partials/` and `core/events.js`. Search for all consumers before renaming one.

## Validation

Run:

```sh
find assets/js -name '*.js' -exec node --check {} \;
```

Syntax checks are not enough for load-order changes. Also run the browser smoke tests described in the root `AGENTS.md`.
