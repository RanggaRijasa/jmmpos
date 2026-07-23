# Stylesheet Guide

Stylesheets are linked individually in `index.html`. Their order preserves the original cascade and must remain:

1. `base.css`
2. `customer-picker.css`
3. `customers.css`
4. `pos.css`
5. `overlays.css`
6. `operations.css`
7. `membership.css`
8. `cms.css`

## Ownership

- `base.css`: tokens, reset, tablet shell, home, shared header/navigation primitives.
- `customer-picker.css`: POS customer picker, reward indicator, and dropdown.
- `customers.css`: customer list/table and reward-meter variants.
- `pos.css`: catalog, cart, staff/discount menus, payment summary, and actions.
- `overlays.css`: modals, confirmation/payment inputs, pending popup, and toast.
- `operations.css`: customer detail, reminder, sales, pending, receipt, and transaction detail layouts.
- `membership.css`: membership list, detail, progress, and usage history.
- `cms.css`: all CMS shell, tables, forms, settings, commission, and CMS media rules.

Reuse the CSS custom properties from `base.css`. Keep selectors within the owning domain where possible. Before moving a rule between files, check whether its current position affects cascade precedence.

Commission PDF rules live in `cms.css` under `@media print` and target a dedicated `.cms-commission-print-report`. Keep the A4 portrait layout independent from the wide interactive report table so screen and print can evolve without breaking each other.
