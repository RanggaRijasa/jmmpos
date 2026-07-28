function setHomeOperationsMenuOpen(isOpen) {
  homeOperationsMenuOpen = Boolean(isOpen);
  const toggle = document.querySelector("#home-menu-toggle");
  const menu = document.querySelector("#home-operations-menu");
  if (toggle) toggle.setAttribute("aria-expanded", String(homeOperationsMenuOpen));
  if (menu) menu.hidden = !homeOperationsMenuOpen;
}

function cashierRevenueEscape(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getCashierRevenueTransactions({ includeSearch = true } = {}) {
  const query = includeSearch ? cashierRevenueSearchTerm.trim().toLowerCase() : "";
  return salesTransactions.filter((transaction) => {
    const date = transaction.dateRaw || "";
    if (cashierRevenueDateFrom && date < cashierRevenueDateFrom) return false;
    if (cashierRevenueDateTo && date > cashierRevenueDateTo) return false;
    if (cashierRevenueBranch && getTransactionBranch(transaction) !== cashierRevenueBranch) return false;
    if (query) {
      const searchable = `${transaction.id} ${transaction.customer} ${transaction.staff} ${transaction.payment} ${getTransactionBranch(transaction)}`.toLowerCase();
      if (!searchable.includes(query)) return false;
    }
    return true;
  });
}

function getCashierRevenueSummary() {
  const transactions = getCashierRevenueTransactions({ includeSearch: false });
  const completed = transactions.filter((transaction) => transaction.status !== "Pending");
  const pending = transactions.filter((transaction) => transaction.status === "Pending");
  const totals = completed
    .map(getCmsDashboardTransactionMetrics)
    .reduce((summary, metrics) => ({
      cashIn: summary.cashIn + metrics.cashIn,
      regularRevenue: summary.regularRevenue + metrics.regularRevenue,
      productRevenue: summary.productRevenue + metrics.productRevenue,
    }), { cashIn: 0, regularRevenue: 0, productRevenue: 0 });

  return [
    ["Transaksi Selesai", completed.length],
    ["Pending", pending.length],
    ["Kas Masuk", formatMoney(totals.cashIn)],
    ["Pendapatan Reguler", formatMoney(totals.regularRevenue)],
    ["Pendapatan Produk", formatMoney(totals.productRevenue)],
  ];
}

function renderCashierRevenueReport() {
  const summary = document.querySelector("#cashier-revenue-summary");
  const list = document.querySelector("#cashier-revenue-list");
  const pagination = document.querySelector("#cashier-revenue-pagination");
  const count = document.querySelector("#cashier-revenue-count");
  const branchLabel = document.querySelector("#cashier-revenue-branch-label");
  const branchSelect = document.querySelector("#cashier-revenue-branch");
  const dateFrom = document.querySelector("#cashier-revenue-date-from");
  const dateTo = document.querySelector("#cashier-revenue-date-to");
  const search = document.querySelector("#cashier-revenue-search");
  if (!summary || !list || !pagination || !count || !branchSelect) return;

  branchSelect.innerHTML = `<option value="">Semua Cabang</option>${salonBranches
    .map((branch) => `<option value="${cashierRevenueEscape(branch.name)}" ${cashierRevenueBranch === branch.name ? "selected" : ""}>${cashierRevenueEscape(branch.name)}</option>`)
    .join("")}`;
  if (dateFrom) dateFrom.value = cashierRevenueDateFrom;
  if (dateTo) dateTo.value = cashierRevenueDateTo;
  if (dateFrom) dateFrom.max = cashierRevenueDateTo;
  if (dateTo) dateTo.min = cashierRevenueDateFrom;
  if (search) search.value = cashierRevenueSearchTerm;
  if (branchLabel) branchLabel.textContent = cashierRevenueBranch || "Semua Cabang";

  summary.innerHTML = getCashierRevenueSummary()
    .map(([label, value]) => `<article><span>${label}</span><strong>${value}</strong></article>`)
    .join("");

  const transactions = getCashierRevenueTransactions();
  const totalPages = Math.max(1, Math.ceil(transactions.length / cashierRevenueRowsPerPage));
  cashierRevenuePage = Math.min(Math.max(1, cashierRevenuePage), totalPages);
  const start = (cashierRevenuePage - 1) * cashierRevenueRowsPerPage;
  const visibleTransactions = transactions.slice(start, start + cashierRevenueRowsPerPage);
  count.textContent = `${transactions.length} data · menampilkan ${transactions.length ? start + 1 : 0}-${Math.min(start + cashierRevenueRowsPerPage, transactions.length)}`;

  list.innerHTML = visibleTransactions.length
    ? visibleTransactions.map((transaction) => `
        <article class="cashier-revenue-row">
          <div>
            <strong>${cashierRevenueEscape(transaction.id)}</strong>
            <span>${cashierRevenueEscape(transaction.date)} · ${cashierRevenueEscape(transaction.time)}</span>
          </div>
          <div>
            <strong>${cashierRevenueEscape(transaction.customer)}</strong>
            <span>${cashierRevenueEscape(getTransactionBranch(transaction))}</span>
          </div>
          <strong>${formatMoney(getCmsTransactionTotalValue(transaction))}</strong>
          <span class="cashier-revenue-status ${transaction.status === "Pending" ? "pending" : "complete"}">${cashierRevenueEscape(transaction.status)}</span>
        </article>`)
      .join("")
    : `<div class="cashier-revenue-empty"><strong>Data tidak ditemukan</strong><span>Coba ubah filter atau pencarian.</span></div>`;

  if (totalPages === 1) {
    pagination.innerHTML = "";
    return;
  }
  const pageButtons = Array.from({ length: totalPages }, (_, index) => index + 1)
    .map((page) => `<button class="${page === cashierRevenuePage ? "active" : ""}" type="button" data-cashier-revenue-page="${page}" aria-label="Halaman ${page}">${page}</button>`)
    .join("");
  pagination.innerHTML = `
    <button type="button" data-cashier-revenue-page="prev" ${cashierRevenuePage === 1 ? "disabled" : ""} aria-label="Halaman sebelumnya">‹</button>
    ${pageButtons}
    <button type="button" data-cashier-revenue-page="next" ${cashierRevenuePage === totalPages ? "disabled" : ""} aria-label="Halaman berikutnya">›</button>`;
}

function resetCashierRevenueReport() {
  cashierRevenueDateFrom = "";
  cashierRevenueDateTo = "";
  cashierRevenueBranch = "";
  cashierRevenueSearchTerm = "";
  cashierRevenuePage = 1;
  renderCashierRevenueReport();
}
