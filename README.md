# JMM POS

Static tablet POS and salon CMS prototype for JMM Salon. The interface is written in Indonesian and uses mock in-memory data; it has no backend or build step.

## Run locally

The app loads HTML fragments with `fetch`, so serve the repository over HTTP:

```sh
python3 -m http.server 4173
```

Then open <http://127.0.0.1:4173/>.

## Structure

```text
.
├── index.html                 # Minimal document shell and ordered stylesheets
├── partials/                  # One HTML fragment per screen/domain
└── assets/
    ├── css/                   # Stylesheets in preserved cascade order
    ├── images/                # Brand assets
    └── js/
        ├── bootstrap.js       # Loads fragments, then application scripts
        ├── data/              # Mock catalog, customer, and sales records
        ├── core/              # Shared state, UI helpers, and event delegation
        ├── features/          # POS, customer, sales, membership, and CMS logic
        └── main.js            # Initial rendering only
```

See [`AGENTS.md`](AGENTS.md) for architecture, change routing, and verification rules.

## Quick verification

```sh
find assets/js -name '*.js' -exec node --check {} \;
```

For UI changes, also smoke-test navigation, cart updates, customer/sales/member views, and CMS in a browser.
