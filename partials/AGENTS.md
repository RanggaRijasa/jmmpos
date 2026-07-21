# HTML Fragment Guide

Every file here is fetched by `assets/js/bootstrap.js` and inserted into the document. Fragments must not contain `doctype`, `html`, `head`, `body`, stylesheet links, or scripts.

## Contracts

- A primary screen root uses `class="tablet-screen view"` and a unique `id`.
- Only `home-view` starts with the `active` class.
- Navigation uses `data-target="<view-id>"` and is handled centrally.
- IDs and `data-*` attributes are public contracts with JavaScript renderers and delegated events; search JavaScript before changing them.
- Keep dynamic containers empty in markup when their content is rendered by JavaScript.
- Brand image URLs are relative to the repository root (`assets/images/...`).

`bootstrap.js` controls fragment order. Add a new view to `PARTIAL_PATHS`, and add modal/global fragments explicitly in `bootstrap()` when they belong outside the tablet `<main>` shell.
