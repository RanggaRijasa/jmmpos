# JMM POS Contributor Guide

## Project contract

JMM POS is a zero-build static prototype. Keep it runnable from any basic static HTTP server without npm, a bundler, or a framework unless a future task explicitly changes that constraint. All records are mock, in-memory data and reset on refresh.

The user-facing language is Indonesian. Preserve existing terminology, currency formatting (`id-ID`), view IDs, and the tablet-first visual design unless the requested change says otherwise.

## Architecture

- `index.html` is only the document shell, stylesheet order, and bootstrap entry point.
- `partials/` owns static markup. Every application screen is an independent fragment.
- `assets/js/bootstrap.js` fetches all fragments, assembles the DOM, and then loads classic scripts in dependency order.
- `assets/js/data/` owns mock datasets and data-shaped constants.
- `assets/js/core/` owns shared mutable state, common UI/navigation helpers, and delegated DOM events.
- `assets/js/features/` owns domain behavior and renderers.
- `assets/js/main.js` performs initial rendering after every dependency is loaded.
- `assets/css/` is split by visual/domain boundary and linked in deliberate cascade order.

Read the nearest nested `AGENTS.md` before editing files under `assets/js/`, `assets/css/`, or `partials/`.

## Change routing

- Catalog items and membership plan definitions: `assets/js/data/catalog.js`
- Customer fixtures, staff fixtures, and customer histories: `assets/js/data/customers.js`
- Sales fixtures: `assets/js/data/sales.js`
- Cart calculations, discounts, member usage, receipts, and drafts: `assets/js/features/pos/cart.js`
- POS rendering and payment confirmation: `assets/js/features/pos/render.js`
- Customer rendering and customer detail/history: `assets/js/features/customers/customers.js`
- Sales, pending, and transaction detail rendering: `assets/js/features/sales/sales.js`
- CMS tables, forms, settings, and commission UI: `assets/js/features/cms/cms.js`
- Membership list/detail/history: `assets/js/features/membership/membership.js`
- Cross-feature click/input handling: `assets/js/core/events.js`

## Required verification

1. Run `node --check` on every file under `assets/js/`.
2. Serve the repository over HTTP; direct `file://` loading is unsupported because fragments use `fetch`.
3. Check the browser console for errors.
4. Smoke-test home navigation, adding/removing a POS item, customers, sales, pending transactions, membership, and CMS.
5. For layout changes, check at least the tablet layout and the CMS desktop layout.

Do not add generated build output or dependency folders to the repository.
