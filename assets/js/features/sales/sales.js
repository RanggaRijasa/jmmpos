function getPaymentIcon(payment) {
  if (payment === "Tunai") {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"></rect><circle cx="12" cy="12" r="3"></circle><path d="M6 9h2M16 15h2"></path></svg>`;
  }
  if (payment === "Kartu") {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`;
  }
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"></path><path d="M14 14h2v2h-2zM18 14h2v6h-2zM14 18h2v2h-2z"></path></svg>`;
}

function getActiveFilters() {
  const dateFrom = document.querySelector("#filter-date-from")?.value || "";
  const dateTo = document.querySelector("#filter-date-to")?.value || "";
  const timeFrom = document.querySelector("#filter-time-from")?.value || "";
  const timeTo = document.querySelector("#filter-time-to")?.value || "";
  const payment = document.querySelector("#filter-payment")?.value || "";
  const branch = document.querySelector("#filter-branch")?.value || "";
  const status = document.querySelector("#filter-status")?.value || "";
  return { dateFrom, dateTo, timeFrom, timeTo, payment, branch, status };
}

function parseTimeToMin(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

function filteredSales() {
  const filters = getActiveFilters();
  let result = salesTransactions;

  if (salesSearchTerm) {
    result = result.filter((t) => {
      const text = `${t.customer} ${t.id} ${t.staff} ${getTransactionBranch(t)} ${getTransactionMemberBranch(t)}`.toLowerCase();
      return text.includes(salesSearchTerm);
    });
  }

  if (filters.dateFrom) {
    result = result.filter((t) => t.dateRaw >= filters.dateFrom);
  }
  if (filters.dateTo) {
    result = result.filter((t) => t.dateRaw <= filters.dateTo);
  }
  if (filters.timeFrom) {
    const fromMin = parseTimeToMin(filters.timeFrom);
    result = result.filter((t) => parseTimeToMin(t.time) >= fromMin);
  }
  if (filters.timeTo) {
    const toMin = parseTimeToMin(filters.timeTo);
    result = result.filter((t) => parseTimeToMin(t.time) <= toMin);
  }
  if (filters.payment) {
    result = result.filter((t) => t.payment === filters.payment);
  }
  if (filters.branch) {
    result = result.filter((t) => getTransactionBranch(t) === filters.branch);
  }
  if (filters.status) {
    result = result.filter((t) => t.status === filters.status);
  }

  return result;
}

function updateFilterSummary(filtered) {
  const total = filtered.reduce((sum, t) => sum + t.amount, 0);
  const count = filtered.length;
  const avg = count > 0 ? Math.round(total / count) : 0;

  const summary = document.querySelector(".filter-summary");
  if (!summary) return;

  summary.innerHTML = `
    <h3>Ringkasan</h3>
    <div class="summary-row"><span>Total</span><strong>${formatMoney(total)}</strong></div>
    <div class="summary-row"><span>Jumlah Transaksi</span><strong>${count}</strong></div>
    <div class="summary-row"><span>Rata-rata per Transaksi</span><strong>${formatMoney(avg)}</strong></div>
  `;
}

function renderSalesList() {
  const list = document.querySelector("#sales-list");
  const pagination = document.querySelector("#sales-pagination");
  if (!list) return;

  const filtered = filteredSales();
  updateFilterSummary(filtered);

  const totalPages = Math.max(1, Math.ceil(filtered.length / salesPerPage));
  if (salesPage > totalPages) salesPage = totalPages;
  if (salesPage < 1) salesPage = 1;

  const start = (salesPage - 1) * salesPerPage;
  const pageItems = filtered.slice(start, start + salesPerPage);

  if (!pageItems.length) {
    list.innerHTML = `
      <div class="empty-cart" style="border:0; background:transparent;">
        <strong>Tidak ada transaksi</strong>
        <span>Coba ubah filter atau kata kunci pencarian.</span>
      </div>`;
    pagination.innerHTML = "";
    return;
  }

  list.innerHTML = pageItems
    .map((t) => {
      const selectedClass = selectedSalesId === t.id ? " selected" : "";
      const memberBranch = getTransactionMemberBranch(t);
      return `
        <article class="sales-row${selectedClass}" data-sales-id="${t.id}">
          <div class="sales-row-time">
            <strong>${t.time}</strong>
            <span>${t.date}</span>
          </div>
          <div class="sales-row-info">
            <strong>${t.customer}</strong>
            <span>${t.staff} · ${t.id}</span>
            <small class="transaction-branch-tag">${getTransactionBranch(t)}</small>
            ${memberBranch ? `<small class="member-branch-tag">Member · ${memberBranch}</small>` : ""}
          </div>
          <span class="payment-badge">${getPaymentIcon(t.payment)}${t.payment}</span>
          <span class="sales-row-amount">${formatMoney(t.amount)}</span>
          <span class="sales-row-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
        </article>
      `;
    })
    .join("");

  let pagesHtml = "";
  if (totalPages > 1) {
    pagesHtml += `<button type="button" data-sales-page="prev" ${salesPage === 1 ? "disabled" : ""}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>`;
    for (let i = 1; i <= totalPages; i++) {
      const activeClass = i === salesPage ? " active" : "";
      pagesHtml += `<button class="${activeClass}" type="button" data-sales-page="${i}">${i}</button>`;
    }
    pagesHtml += `<button type="button" data-sales-page="next" ${salesPage === totalPages ? "disabled" : ""}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>`;
  }
  pagination.innerHTML = pagesHtml;
}

function renderTransactionDetailItem(line, index) {
  const receiptItem = transactionLineToReceiptItem(line, index);
  const actionLines =
    receiptItem.type === "service"
      ? getServiceActions(receiptItem)
          .map((action) => {
            const staff = getActionStaffText(receiptItem.actionStaffs?.[action] || []);
            return `<span>${getReceiptActionLabel(action, receiptItem)} By : ${staff}</span>`;
          })
          .join("")
      : receiptItem.type === "member" && receiptItem.staff
        ? `<span>Petugas By : ${receiptItem.staff}</span>`
        : receiptItem.type === "product"
          ? `<span>Produk langsung</span>`
          : "";
  const memberLine = receiptItem.memberFree || receiptItem.memberUpgrade
    ? `<span>Pemakaian Member · ${receiptItem.memberBranch || "Cabang belum ditentukan"}</span>`
    : "";
  const membershipBranchLine = receiptItem.type === "member" && receiptItem.memberBranch
    ? `<span>Cabang Membership · ${receiptItem.memberBranch}</span>`
    : "";
  const bonusLine = receiptItem.type === "member" && receiptItem.bonuses?.length
    ? `<span>Bonus paket: ${getMembershipBonusSummary(receiptItem.bonuses)}</span>`
    : "";
  const promotionLine = receiptItem.discountRate
    ? `<span>${receiptItem.fixedDiscountRate ? `Promo pasti ${receiptItem.fixedDiscountRate}%` : "Diskon"}${receiptItem.flexibleDiscountRate ? ` + tambahan ${receiptItem.flexibleDiscountRate}%` : ""} · total ${receiptItem.discountRate}%</span>`
    : "";

  return `
    <div class="detail-item-row">
      <div class="detail-item-main">
        <span>${receiptItem.qty}x ${receiptItem.name}</span>
        <strong>${formatReceiptAmount(receiptItem.baseTotal)}</strong>
      </div>
      ${actionLines || memberLine || membershipBranchLine || bonusLine || promotionLine ? `<div class="detail-item-sublines">${actionLines}${memberLine}${membershipBranchLine}${bonusLine}${promotionLine}</div>` : ""}
    </div>
  `;
}

function renderTransactionDetailContent(t, ids) {
  document.querySelector(ids.invoice).textContent = t.id;
  document.querySelector(ids.datetime).textContent = `${t.date} · ${t.time} · ${getTransactionBranch(t)}`;
  document.querySelector(ids.payment).textContent = t.payment;
  document.querySelector(ids.customerName).textContent = t.customer;
  const customer = customers.find((c) => c.name === t.customer);
  document.querySelector(ids.staff).textContent = customer?.phone || "-";

  const itemsHtml = t.items.map(renderTransactionDetailItem).join("");
  document.querySelector(ids.items).innerHTML = itemsHtml;

  let adjustmentsHtml = "";
  if (t.dp > 0) {
    adjustmentsHtml += `
      <div class="detail-adjustment-row">
        <span>DP</span>
        <strong class="saving">- ${formatMoney(t.dp)}</strong>
      </div>
    `;
  }
  if (t.reward > 0) {
    const memberBranch = getTransactionMemberBranch(t);
    adjustmentsHtml += `
      <div class="detail-adjustment-row">
        <span>Pemakaian Member${memberBranch ? ` · ${memberBranch}` : ""}</span>
        <strong class="saving">- ${formatMoney(t.reward)}</strong>
      </div>
    `;
  }
  const adjEl = document.querySelector(ids.adjustments);
  if (adjEl) adjEl.innerHTML = adjustmentsHtml;

  const finalTotal = t.amount;
  document.querySelector(ids.total).textContent = formatMoney(finalTotal);
}

function showSalesDetail(id) {
  const t = salesTransactions.find((x) => x.id === id);
  if (!t) return;
  selectedSalesId = id;
  renderSalesList();

  const panel = document.querySelector("#sales-detail-panel");
  renderTransactionDetailContent(t, {
    invoice: "#detail-invoice",
    datetime: "#detail-datetime",
    payment: "#detail-payment",
    customerName: "#detail-customer-name",
    staff: "#detail-staff",
    items: "#detail-items",
    adjustments: "#detail-adjustments",
    total: "#detail-total",
  });

  panel.hidden = false;
}

function hideSalesDetail() {
  document.querySelector("#sales-detail-panel").hidden = true;
  selectedSalesId = null;
  renderSalesList();
}

function showCustomerTransactionDetail(id) {
  const customer = customers.find((entry) => entry.id === activeDetailCustomerId) || customers[0];
  const t = getCustomerTransactions(customer).find((transaction) => transaction.id === id);
  if (!t) return;

  renderTransactionDetailContent(t, {
    invoice: "#customer-detail-invoice",
    datetime: "#customer-detail-datetime",
    payment: "#customer-detail-payment",
    customerName: "#customer-detail-customer-name",
    staff: "#customer-detail-staff",
    items: "#customer-detail-items",
    adjustments: "#customer-detail-adjustments",
    total: "#customer-detail-total",
  });

  document.querySelector("#customer-transaction-detail-panel").hidden = false;
}

function hideCustomerTransactionDetail() {
  const panel = document.querySelector("#customer-transaction-detail-panel");
  if (panel) panel.hidden = true;
}

function getPendingTransactions() {
  return salesTransactions.filter((t) => t.status === "Pending");
}

function renderPendingItemDetail(line) {
  const catalogItem = findCatalogItem(line);
  const itemId = catalogItem?.id || "";
  const actions = serviceActionMap[itemId] || [];
  const staff = line.staff || "";

  if (line.type === "service") {
    const actionRows = actions.length && staff
      ? actions.map((action) => `<small>${action} By : ${staff}</small>`).join("")
      : staff ? `<small>Staff: ${staff}</small>` : "";
    return `
      <div class="pending-item-detail">
        <span>${line.qty}x ${line.name}</span>
        ${actionRows}
        ${line.memberFree || line.memberUpgrade ? `<small class="member-branch-copy">Pemakaian Member · ${line.memberBranch || "Cabang belum ditentukan"}</small>` : ""}
        ${line.fixedDiscountRate || line.flexibleDiscountRate ? `<small>Promo ${line.fixedDiscountRate ? `${line.fixedDiscountRate}% pasti` : ""}${line.flexibleDiscountRate ? ` + ${line.flexibleDiscountRate}% tambahan` : ""}</small>` : ""}
      </div>
    `;
  }

  if (line.type === "member") {
    return `
      <div class="pending-item-detail">
        <span>${line.qty}x ${line.name}</span>
        <small>Paket membership</small>
        ${line.memberBranch ? `<small>Cabang Membership · ${line.memberBranch}</small>` : ""}
        ${line.bonuses?.length ? `<small>Bonus: ${getMembershipBonusSummary(line.bonuses)}</small>` : ""}
      </div>
    `;
  }

  return `
    <div class="pending-item-detail">
      <span>${line.qty}x ${line.name}</span>
      <small>Produk langsung</small>
    </div>
  `;
}

function getPendingListHtml(term = "") {
  const pending = getPendingTransactions().filter((t) => {
    if (!term) return true;
    const lowerTerm = term.toLowerCase();
    const itemNames = t.items.map((item) => item.name).join(" ");
    const text = `${t.id} ${t.customer} ${t.staff} ${itemNames} ${getTransactionBranch(t)} ${getTransactionMemberBranch(t)}`.toLowerCase();
    return text.includes(lowerTerm);
  });

  if (!pending.length) {
    return `
      <div class="empty-cart" style="border:0; background:transparent;">
        <strong>Tidak ada transaksi pending</strong>
        <span>${term ? "Coba kata kunci lain." : "Semua transaksi telah diselesaikan."}</span>
      </div>`;
  }

  return pending
    .map((t) => {
      const memberBranch = getTransactionMemberBranch(t);
      return `
        <article class="pending-row" data-pending-id="${t.id}">
          <div class="pending-row-header">
            <div class="pending-row-info">
              <span class="pending-customer">${t.customer}</span>
              <small>${t.staff} · ${t.id}</small>
              <small class="transaction-branch-tag">${getTransactionBranch(t)}</small>
              ${memberBranch ? `<small class="member-branch-tag">Member · ${memberBranch}</small>` : ""}
            </div>
            <div class="pending-row-meta">
              <span class="pending-row-status">Pending</span>
              <span class="pending-row-amount">${formatMoney(t.amount)}</span>
            </div>
          </div>
          <div class="pending-row-items">
            ${t.items.map(renderPendingItemDetail).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderPendingList() {
  const list = document.querySelector("#pending-list");
  if (!list) return;
  list.innerHTML = getPendingListHtml(pendingSearchTerm);
}

function renderPendingPopup() {
  const list = document.querySelector("#pending-popup-list");
  if (!list) return;
  list.innerHTML = getPendingListHtml(pendingPopupSearchTerm);
}

function loadPendingTransaction(id) {
  const t = salesTransactions.find((x) => x.id === id);
  if (!t) return;

  resetCart();
  selectedCustomer = customers.find((customer) => customer.name === t.customer) || null;
  activeSalonBranch = getTransactionBranch(t);
  selectedPayment = ["Tunai", "QRIS", "Kartu"].includes(t.payment) ? t.payment : "QRIS";
  activeFilter = "service";
  searchTerm = "";

  t.items.forEach((line) => {
    const catalogItem = findCatalogItem(line);
    if (!catalogItem) return;

    if (line.type === "service") {
      const lineCount = Math.min(line.qty || 1, getMaxQty(catalogItem));
      for (let index = 0; index < lineCount; index += 1) {
        const added = addServiceLine({ ...catalogItem, price: line.price || catalogItem.price });
        if (added) {
          const serviceLine = serviceCartLines[serviceCartLines.length - 1];
          if (line.memberFree || line.memberUpgrade) {
            const reward = getMemberRewardForService(catalogItem.id, selectedCustomer);
            const rewardId = line.memberUsageRewardId || (reward ? getRewardId(reward) : "");
            serviceLine.memberFree = true;
            serviceLine.memberUpgrade = false;
            serviceLine.memberUseAmount = line.memberUseAmount || catalogItem.price;
            serviceLine.memberUsageRewardId = rewardId;
            serviceLine.memberBranch = line.memberBranch || getTransactionMemberBranch(t);
            serviceLine.discounts = [];
            if (line.memberUpgrade && line.activeServiceId) applyServiceLevel(serviceLine, line.activeServiceId);
            if (rewardId) memberUsage[rewardId] = getMemberUsed(rewardId) + 1;
          } else {
            serviceLine.fixedDiscountRate = line.fixedDiscountRate || 0;
            serviceLine.discounts = line.flexibleDiscountRate ? [line.flexibleDiscountRate] : [];
          }
          serviceLine.actionStaffs = line.actionStaffs || createActionStaffs(serviceLine, line.staff || t.staff || "");
          syncServiceStaffSummary(serviceLine);
        }
      }
    } else if (catalogItem.type === "member") {
      const added = addMemberLine(catalogItem);
      if (added) {
        const memberLine = memberCartLines[memberCartLines.length - 1];
        memberLine.staff = line.staff || t.staff || "";
        memberLine.bonuses = cloneMembershipBonuses(line.bonuses);
      }
    } else {
      catalogItem.qty = Math.min(line.qty || 1, getMaxQty(catalogItem));
    }
  });

  const searchInput = document.querySelector("#item-search");
  if (searchInput) searchInput.value = "";
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === activeFilter);
  });

  renderCustomer();
  syncSalonBranchUi();
  renderCustomerDropdown();
  updateSearchPlaceholder();
  updateCatalogHeading();
  renderItems();
  setPayment(selectedPayment);
  renderCart();
  document.querySelector("#item-grid")?.scrollTo({ top: 0 });
  document.querySelector("#cart-list")?.scrollTo({ top: 0 });
  setView("pos-view");
  showToast(`Draft ${t.id} dimuat ke POS`);
}
