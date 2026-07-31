function cashierWorkEscape(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function ensureCashierWorkFilters() {
  if (cashierWorkFiltersInitialized) return;
  const dates = salesTransactions
    .filter((transaction) => transaction.status !== "Pending" && transaction.dateRaw)
    .map((transaction) => transaction.dateRaw)
    .sort();
  cashierWorkDateFrom = dates[0] || "";
  cashierWorkDateTo = dates.at(-1) || "";
  cashierWorkFiltersInitialized = true;
}

function cashierWorkTransactionMatches(transaction) {
  if (transaction.status === "Pending") return false;
  const date = transaction.dateRaw || "";
  const time = (transaction.time || "00:00").slice(0, 5);
  if (cashierWorkDateFrom && date < cashierWorkDateFrom) return false;
  if (cashierWorkDateTo && date > cashierWorkDateTo) return false;
  if (cashierWorkTimeFrom && time < cashierWorkTimeFrom) return false;
  if (cashierWorkTimeTo && time > cashierWorkTimeTo) return false;
  if (cashierWorkBranch && getTransactionBranch(transaction) !== cashierWorkBranch) return false;
  return true;
}

function getCashierWorkEntries({ includeStaff = true } = {}) {
  ensureCashierWorkFilters();
  const entries = salesTransactions
    .filter(cashierWorkTransactionMatches)
    .flatMap((transaction) => transaction.items
      .filter((item) => item.type === "service")
      .flatMap((item, itemIndex) => getCommissionActivityLines(item).map((line) => ({
        id: `${transaction.id}-${itemIndex}-${line.activityIndex}-${line.staffName}`,
        transactionId: transaction.id,
        dateRaw: transaction.dateRaw || "",
        date: transaction.date,
        time: transaction.time,
        customer: transaction.customer,
        staff: line.staffName,
        serviceName: line.serviceName,
        activityName: line.activity,
        qty: Math.max(1, Number(item.qty) || 1),
        branch: getTransactionBranch(transaction),
      }))))
    .filter((entry) => !includeStaff || !cashierWorkStaff || entry.staff === cashierWorkStaff);

  return entries.sort((a, b) => `${b.dateRaw} ${b.time} ${b.transactionId}`.localeCompare(`${a.dateRaw} ${a.time} ${a.transactionId}`));
}

function getCashierWorkSummary(entries) {
  return [
    ["Petugas", new Set(entries.map((entry) => entry.staff)).size],
    ["Hari Kerja", new Set(entries.map((entry) => entry.dateRaw)).size],
    ["Transaksi", new Set(entries.map((entry) => entry.transactionId)).size],
    ["Aktivitas", entries.length],
  ];
}

function renderCashierWorkReport() {
  ensureCashierWorkFilters();
  const summary = document.querySelector("#cashier-work-summary");
  const list = document.querySelector("#cashier-work-list");
  const pagination = document.querySelector("#cashier-work-pagination");
  const count = document.querySelector("#cashier-work-count");
  const branchLabel = document.querySelector("#cashier-work-branch-label");
  const dateFrom = document.querySelector("#cashier-work-date-from");
  const dateTo = document.querySelector("#cashier-work-date-to");
  const timeFrom = document.querySelector("#cashier-work-time-from");
  const timeTo = document.querySelector("#cashier-work-time-to");
  const branchSelect = document.querySelector("#cashier-work-branch");
  const staffSelect = document.querySelector("#cashier-work-staff");
  if (!summary || !list || !pagination || !count || !branchSelect || !staffSelect) return;

  if (dateFrom) {
    dateFrom.value = cashierWorkDateFrom;
    dateFrom.max = cashierWorkDateTo;
  }
  if (dateTo) {
    dateTo.value = cashierWorkDateTo;
    dateTo.min = cashierWorkDateFrom;
  }
  if (timeFrom) {
    timeFrom.value = cashierWorkTimeFrom;
    timeFrom.max = cashierWorkTimeTo;
  }
  if (timeTo) {
    timeTo.value = cashierWorkTimeTo;
    timeTo.min = cashierWorkTimeFrom;
  }

  branchSelect.innerHTML = `<option value="">Semua Cabang</option>${salonBranches
    .map((branch) => `<option value="${cashierWorkEscape(branch.name)}" ${cashierWorkBranch === branch.name ? "selected" : ""}>${cashierWorkEscape(branch.name)}</option>`)
    .join("")}`;
  const staffNames = [...new Set(getCashierWorkEntries({ includeStaff: false }).map((entry) => entry.staff))].sort();
  staffSelect.innerHTML = `<option value="">Semua Petugas</option>${staffNames
    .map((staff) => `<option value="${cashierWorkEscape(staff)}" ${cashierWorkStaff === staff ? "selected" : ""}>${cashierWorkEscape(staff)}</option>`)
    .join("")}`;
  if (cashierWorkStaff && !staffNames.includes(cashierWorkStaff)) cashierWorkStaff = "";
  if (branchLabel) branchLabel.textContent = cashierWorkBranch || "Semua Cabang";

  const entries = getCashierWorkEntries();
  summary.innerHTML = getCashierWorkSummary(entries)
    .map(([label, value]) => `<article><span>${label}</span><strong>${value}</strong></article>`)
    .join("");

  const totalPages = Math.max(1, Math.ceil(entries.length / cashierWorkRowsPerPage));
  cashierWorkPage = Math.min(Math.max(1, cashierWorkPage), totalPages);
  const start = (cashierWorkPage - 1) * cashierWorkRowsPerPage;
  const visibleEntries = entries.slice(start, start + cashierWorkRowsPerPage);
  count.textContent = `${entries.length} aktivitas · menampilkan ${entries.length ? start + 1 : 0}-${Math.min(start + cashierWorkRowsPerPage, entries.length)}`;

  list.innerHTML = visibleEntries.length
    ? visibleEntries.map((entry) => `
        <article class="cashier-revenue-row cashier-work-row">
          <div>
            <strong>${cashierWorkEscape(entry.date)} · ${cashierWorkEscape(entry.time)}</strong>
            <span>${cashierWorkEscape(entry.transactionId)}</span>
          </div>
          <div>
            <strong>${cashierWorkEscape(entry.staff)}</strong>
            <span>${cashierWorkEscape(entry.customer)}</span>
          </div>
          <div>
            <strong>${entry.qty}x ${cashierWorkEscape(entry.serviceName)}</strong>
            <span>Treatment</span>
          </div>
          <strong class="cashier-work-activity">${cashierWorkEscape(entry.activityName)}</strong>
          <span>${cashierWorkEscape(entry.branch)}</span>
        </article>`)
      .join("")
    : `<div class="cashier-revenue-empty"><strong>Aktivitas tidak ditemukan</strong><span>Coba ubah periode, cabang, atau petugas.</span></div>`;

  if (totalPages === 1) {
    pagination.innerHTML = "";
    return;
  }
  const pageButtons = Array.from({ length: totalPages }, (_, index) => index + 1)
    .map((page) => `<button class="${page === cashierWorkPage ? "active" : ""}" type="button" data-cashier-work-page="${page}" aria-label="Halaman ${page}">${page}</button>`)
    .join("");
  pagination.innerHTML = `
    <button type="button" data-cashier-work-page="prev" ${cashierWorkPage === 1 ? "disabled" : ""} aria-label="Halaman sebelumnya">‹</button>
    ${pageButtons}
    <button type="button" data-cashier-work-page="next" ${cashierWorkPage === totalPages ? "disabled" : ""} aria-label="Halaman berikutnya">›</button>`;
}

function updateCashierWorkFilters() {
  cashierWorkDateFrom = document.querySelector("#cashier-work-date-from")?.value || "";
  cashierWorkDateTo = document.querySelector("#cashier-work-date-to")?.value || "";
  cashierWorkTimeFrom = document.querySelector("#cashier-work-time-from")?.value || "00:00";
  cashierWorkTimeTo = document.querySelector("#cashier-work-time-to")?.value || "23:59";
  cashierWorkBranch = document.querySelector("#cashier-work-branch")?.value || "";
  cashierWorkStaff = document.querySelector("#cashier-work-staff")?.value || "";
  if (cashierWorkDateFrom && cashierWorkDateTo && cashierWorkDateFrom > cashierWorkDateTo) cashierWorkDateTo = cashierWorkDateFrom;
  if (cashierWorkTimeFrom && cashierWorkTimeTo && cashierWorkTimeFrom > cashierWorkTimeTo) cashierWorkTimeTo = cashierWorkTimeFrom;
  cashierWorkPage = 1;
  renderCashierWorkReport();
}

function resetCashierWorkReport() {
  cashierWorkDateFrom = "";
  cashierWorkDateTo = "";
  cashierWorkTimeFrom = "00:00";
  cashierWorkTimeTo = "23:59";
  cashierWorkBranch = "";
  cashierWorkStaff = "";
  cashierWorkPage = 1;
  cashierWorkFiltersInitialized = false;
  renderCashierWorkReport();
}
