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

## CMS list filter contract

- Every non-report CMS navigation page exposes a filter tailored to the data shown on that page. List pages place the filter immediately before search; dashboard, commission settings, and salon settings place it in the page header.
- Non-report filter values live in `cmsListFilters[page]` and use delegated `data-cms-list-filter` controls. Changing a filter resets only that page's pagination and must not mutate source records.
- Keep report filters (`sales-report`, `regular-report`, `revenue-report`, `expense-report`, `stock-report`, and `commission-report`) independent. Do not route report state through `cmsListFilters` or change their established controls when adding operational filters.
- Resetting a non-report filter clears that page's filter values and search term. Filter panels reuse the report filter button, badge, panel, and reset/close styling so interaction stays consistent throughout CMS.

## Membership branch contract

- `customer.frequentBranch` is the branch the customer visits most often; it is not ownership of a membership.
- Every membership reward stores its own issuing `reward.branch`, allowing one customer to own packages from multiple branches.
- A transaction only counts as using membership when it has a positive `reward` or an item marked `memberFree`/`memberUpgrade`.
- When membership is used, copy that reward's `branch` into `memberBranch` on both the transaction snapshot and affected line item. Do not infer it from `frequentBranch` or merely because the customer is a member.
- Sales, pending drafts, receipt snapshots, and CMS history must read the stored transaction branch first so historical records do not change when a customer profile is edited later.

## Membership package bonus contract

- `membershipPlans[].bonuses` is an optional array of `{ type, itemId, name, qty }` records. `type` is `product` or `service` (shown to users as treatment).
- Package bonuses are available only when the package target is at least 10. CMS must preserve multiple bonus rows and copy them to the matching POS member catalog item.
- Draft transactions, completed transactions, sales details, pending details, and receipt snapshots must store and render package bonuses from the transaction line so historical receipts do not change after a plan is edited.

## Customer reminder contract

- Regular-customer reminders use the single `service.reminderDays` interval from Master Jasa and are calculated once from the customer's latest completed service visit.
- Member reminders use the single `membershipPlan.reminderDays` interval from Master Paket Member. They recur from the latest recorded use (or package activation before first use), reset after another use, and stop when the package is inactive or has no remaining quota.
- Keep reminder schedules derived from service, package, transaction, and reward data. Do not add an independently editable reminder date back to customer records.
- Cashier and CMS reminder lists must identify each record as `Reguler` or `Member` and show the treatment or package that produced the reminder.

## Treatment promotion contract

- `service.promotion.fixedRate` is the mandatory treatment discount automatically applied by POS. Cashiers cannot edit or remove this portion.
- `service.promotion.flexibleRate` is the default additional discount. Cashiers may replace this portion, including with zero, while the fixed portion remains applied.
- Every normal paid service exposes the manual discount editor in POS. Services without promotion defaults begin at zero; services with a fixed promotion keep that portion locked while the cashier edits only the flexible portion. Keep the combined rate at or below 100%.
- Persist `discountRate`, `fixedDiscountRate`, and `flexibleDiscountRate` on draft, completed transaction, and receipt lines so later master-data changes do not alter history.
- On receipts, a discounted item shows its original line price with a strikethrough and its payable line price directly below. Apply the same calculation to new receipts and receipts reconstructed from sales history.

## Treatment upgrade contract

- `service.upgradeServiceIds` lists concrete destination treatment IDs; do not recreate the removed generic Premium price level.
- A configured service keeps its Upgrade control visible in the POS cart. Without an eligible member it explains what is missing; with a matching remaining quota, choosing an upgrade consumes that quota directly. Existing member usage can also switch between the original treatment and configured upgrades.
- The customer pays the non-negative difference between the destination treatment price and the membership treatment's normal price.
- Store both the membership source `itemId` and chosen `activeServiceId` in transaction snapshots. Staff activities and receipt labels must follow `activeServiceId` after an upgrade.

## Multi-branch salon contract

- `staffDirectory` is the source of truth for petugas identity, assigned `branch`, specialty, phone, and status. Keep `staffOptions` synchronized because POS controls still use staff names as values.
- `activeSalonBranch` is the branch where the cashier transaction occurs. A saved draft, completed transaction, and receipt snapshot must copy it to `transaction.branch`/`receipt.branch`.
- `transaction.branch` (Cabang Transaksi), `reward.branch` (Cabang Membership), `customer.frequentBranch` (Sering Berkunjung), and `staff.branch` (Cabang Petugas) are different business concepts. Never substitute one for another in history or reports.
- `customer.lastVisitBranch` is the historical branch snapshot paired with `customer.lastVisit` and `customer.lastService`. Reminder views in cashier and CMS must read this field, never infer it from `frequentBranch` or a membership branch.
- `staff-commission` configures commission only for activities inside a treatment. `staffCommissionProfiles[staffId][serviceId].enabled` activates or deactivates the treatment as a commission group; it is not a treatment-level commission rate. Store activity settings at `.activities[activity] = { enabled, rate }`.
- Deactivating a treatment closes its card, switches off every activity inside it, and excludes those activities from commission reports. Preserve the last entered rate values, but keep activity controls disabled until the treatment is active again. Keep the native `<details>` control available so cards can still be opened or closed manually.
- `commission-report` is read-only and calculates activity commission from completed service transactions, `item.actionStaffs`, transaction branch, enabled treatment groups, and configured activity rates. Legacy lines without `actionStaffs` assign every service activity to `item.staff`.
- Allocate the service value evenly across its configured activities, then evenly across multiple staff assigned to the same activity. Reports must keep the activity name visible so every commission component remains auditable.
- Commission report filters are inclusive snapshots over `transaction.dateRaw`, `transaction.time`, and `transaction.branch`. Changing a filter resets report pagination but must not mutate transactions or commission profiles.
- Commission report details group each staff member's service lines by work date. Preserve transaction ID, customer, treatment, branch, service value, configured rate, and commission on every detail line so daily totals remain auditable.
- Daily commission detail uses native `<details>` accordions with only the newest day open initially. The expand/collapse controls change presentation only and must not mutate report data.
- Commission PDF export uses the browser print dialog and a dedicated A4 portrait report derived from the same filtered detail entries. Keep the print table compact and formal; do not print or repurpose the wide CMS screen table.

## Daily staff presence contract

- `staffDirectory[].branch` is the employee's permanent assignment; `staffPresence[name]` is the branch where that employee is working today. Changing presence must never rewrite the permanent branch.
- One active employee can be online at only one branch at a time. Selecting an employee as cross-branch help moves only their daily presence.
- Home renders online staff for `activeSalonBranch`. Every POS staff picker must group those online staff first, then active staff from the current branch, then other active staff.
- Employees with a non-active master status such as `Cuti` are excluded from presence controls and new POS assignments.

## Validation

Run:

```sh
find assets/js -name '*.js' -exec node --check {} \;
```

Syntax checks are not enough for load-order changes. Also run the browser smoke tests described in the root `AGENTS.md`.
