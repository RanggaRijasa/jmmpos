function cashierExpenseEscape(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatCashierExpenseDate(dateRaw) {
  if (!dateRaw) return "—";
  return new Date(`${dateRaw}T00:00:00`).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function renderCashierExpenses() {
  const list = document.querySelector("#cashier-expense-list");
  const total = document.querySelector("#cashier-expense-total");
  const count = document.querySelector("#cashier-expense-count");
  const branchLabel = document.querySelector("#cashier-expense-branch-label");
  if (!list || !total || !count) return;

  const totalAmount = cashierOperationalExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  total.textContent = formatMoney(totalAmount);
  count.textContent = cashierOperationalExpenses.length;
  if (branchLabel) branchLabel.textContent = activeSalonBranch;

  list.innerHTML = cashierOperationalExpenses.length
    ? cashierOperationalExpenses.map((expense) => `
        <article class="cashier-expense-row">
          <div><strong>${formatCashierExpenseDate(expense.dateRaw)}</strong><span>${cashierExpenseEscape(expense.id)}</span></div>
          <p>${cashierExpenseEscape(expense.note)}</p>
          <span>${cashierExpenseEscape(expense.branch)}</span>
          <strong>${formatMoney(expense.amount)}</strong>
        </article>`)
      .join("")
    : `<div class="cashier-expense-empty">
        <strong>Belum ada pengeluaran</strong>
        <span>Catatan yang disimpan akan muncul di sini.</span>
      </div>`;
}

function saveCashierExpense() {
  const dateInput = document.querySelector("#cashier-expense-date");
  const amountInput = document.querySelector("#cashier-expense-amount");
  const noteInput = document.querySelector("#cashier-expense-note");
  const dateRaw = dateInput?.value || "";
  const amount = Math.floor(Number(amountInput?.value) || 0);
  const note = noteInput?.value.trim() || "";

  if (!dateRaw) {
    showToast("Tanggal pengeluaran wajib diisi");
    dateInput?.focus();
    return false;
  }
  if (amount <= 0) {
    showToast("Nominal pengeluaran harus lebih dari Rp 0");
    amountInput?.focus();
    return false;
  }
  if (!note) {
    showToast("Catatan pengeluaran wajib diisi");
    noteInput?.focus();
    return false;
  }

  cashierOperationalExpenses.unshift({
    id: `EXP-${String(cashierExpenseCounter).padStart(3, "0")}`,
    dateRaw,
    amount,
    note,
    branch: activeSalonBranch,
  });
  cashierExpenseCounter += 1;
  document.querySelector("#cashier-expense-form")?.reset();
  renderCashierExpenses();
  showToast(`Pengeluaran ${formatMoney(amount)} berhasil disimpan`);
  return true;
}
