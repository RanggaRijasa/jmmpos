function visibleItems() {
  let filtered;
  if (activeFilter === "service") {
    filtered = items.filter((item) => item.type === "service");
  } else if (activeFilter === "member") {
    filtered = items.filter((item) => item.type === "member");
  } else {
    filtered = items.filter((item) => item.type === activeFilter);
  }

  if (!searchTerm) return filtered;

  return filtered.filter((item) => item.name.toLowerCase().includes(searchTerm));
}

function updateSearchPlaceholder() {
  const input = document.querySelector("#item-search");
  if (activeFilter === "service") input.placeholder = "Cari jasa...";
  else if (activeFilter === "member") input.placeholder = "Cari paket member...";
  else input.placeholder = "Cari produk...";
}

function updateCatalogHeading() {
  const heading = document.querySelector("#catalog-heading");
  if (!heading) return;
  if (activeFilter === "service") heading.textContent = "Jasa Salon";
  else if (activeFilter === "product") heading.textContent = "Produk Salon";
  else if (activeFilter === "member") heading.textContent = "Membership";
}

function renderCustomer() {
  const summary = document.querySelector("#customer-summary");
  const toggle = document.querySelector("#customer-toggle");
  const customerStrip = document.querySelector("#customer-picker");
  const memberArea = document.querySelector("#customer-member-area");
  const benefitToggle = document.querySelector("#member-benefit-toggle");
  const benefitCount = document.querySelector("#member-benefit-count");
  const benefits = document.querySelector("#member-benefits");

  if (!selectedCustomer) {
    summary.classList.add("empty");
    summary.innerHTML = `
      <span>Pelanggan</span>
      <strong>Belum dipilih</strong>
      <small>Pilih pelanggan untuk transaksi ini</small>
    `;
    customerStrip?.classList.remove("benefits-open");
    if (memberArea) memberArea.hidden = true;
    if (benefits) benefits.hidden = true;
    if (benefitToggle) benefitToggle.setAttribute("aria-expanded", "false");
    const label = toggle.querySelector(".btn-label");
    if (label) label.textContent = "Pilih";
    return;
  }

  summary.classList.remove("empty");
  const memberBranch = getCustomerMemberBranch(selectedCustomer);
  summary.innerHTML = `
    <span>Pelanggan</span>
    <div class="customer-title-row">
      <strong>${selectedCustomer.name}</strong>
      ${selectedCustomer.id === "umum" ? `<button class="customer-edit" type="button" data-edit-umum>Edit</button>` : ""}
    </div>
    <small>${selectedCustomer.phone}${memberBranch ? ` · ${memberBranch}` : ""}</small>
  `;
  const rewards = getCustomerRewards(selectedCustomer);
  const hasBenefits = rewards.length > 0;
  customerStrip?.classList.remove("benefits-open");
  if (memberArea) memberArea.hidden = !hasBenefits;
  if (benefits) {
    benefits.innerHTML = renderMemberBenefitsDropdown(selectedCustomer);
    benefits.hidden = true;
  }
  if (benefitToggle) {
    benefitToggle.setAttribute("aria-expanded", "false");
  }
  if (benefitCount) {
    benefitCount.textContent = rewards.length;
  }
  const label = toggle.querySelector(".btn-label");
  if (label) label.textContent = "Ganti";
}

function renderMemberBenefitsDropdown(customer) {
  const rewards = getCustomerRewards(customer);
  if (!rewards.length) return "";
  return `
    <div class="member-list-rows">
      ${rewards
        .map((reward) => {
          const rewardId = getRewardId(reward);
          const used = getMemberUsed(reward);
          const remaining = getMemberRemaining(reward);
          const serviceId = getRewardServiceId(reward);
          const eligibleLine = serviceCartLines.some((line) => line.itemId === serviceId && !line.memberFree);
          const canCreateLine = getServiceLineCount(serviceId) === 0;
          const isUsed = used > 0;
          return `
            <div class="member-list-row${isUsed ? " ready" : ""}">
              <span>${getRewardName(reward, { withMember: true })} · ${getCustomerMemberBranch(customer)} · ${remaining}/${reward.target}</span>
              <span class="member-list-stepper">
                <button type="button" data-member-service="${rewardId}" data-member-delta="-1" ${used <= 0 ? "disabled" : ""}>−</button>
                <b>${used}</b>
                <button type="button" data-member-service="${rewardId}" data-member-delta="1" ${remaining <= 0 || (!eligibleLine && !canCreateLine) ? "disabled" : ""}>+</button>
              </span>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function closeCustomerPopovers({ keepBenefits = false } = {}) {
  const picker = document.querySelector("#customer-picker");
  const keepBenefitsOpen = Boolean(keepBenefits && picker?.classList.contains("benefits-open"));
  picker?.classList.remove("open");
  if (!keepBenefitsOpen) picker?.classList.remove("benefits-open");
  const benefits = document.querySelector("#member-benefits");
  if (benefits) benefits.hidden = !keepBenefitsOpen;
  document.querySelector("#member-benefit-toggle")?.setAttribute("aria-expanded", String(keepBenefitsOpen));
  dropdownSearchTerm = "";
}

function renderCustomerDropdown() {
  const dropdown = document.querySelector("#customer-dropdown");

  const filtered = customers.filter((customer) => {
    if (!dropdownSearchTerm) return true;
    const keyword = `${customer.name} ${customer.phone}`.toLowerCase();
    return keyword.includes(dropdownSearchTerm);
  });

  const searchHtml = `
    <label class="dropdown-search">
      <input type="search" placeholder="Cari nama atau nomor HP..." autocomplete="off" value="${dropdownSearchTerm}" />
      <span aria-hidden="true">⌕</span>
    </label>
  `;

  if (!filtered.length) {
    dropdown.innerHTML =
      searchHtml +
      `
      <div class="dropdown-list">
        <div class="customer-empty" style="min-height:120px; border:0; background:transparent;">
          <strong>Tidak ada pelanggan</strong>
          <span>Coba kata kunci lain.</span>
        </div>
      </div>
    `;
    return;
  }

  dropdown.innerHTML =
    searchHtml +
    `<div class="dropdown-list">` +
    filtered
      .map((customer) => {
        const activeClass = selectedCustomer?.id === customer.id ? " active" : "";
        return `
        <button class="customer-option${activeClass}" type="button" data-customer="${customer.id}">
          <span>
            <strong>${customer.name}</strong>
            <small>${customer.phone}${getCustomerMemberBranch(customer) ? ` · ${getCustomerMemberBranch(customer)}` : ""}</small>
          </span>
          ${
            customer.type === "non-member"
              ? `<em class="muted">Non Member</em>`
              : `<em class="member"><span aria-hidden="true">M</span>${customer.status}</em>`
          }
        </button>
      `;
      })
      .join("") +
    `</div>`;
}

function renderCustomerList() {
  const list = document.querySelector("#customer-list");
  if (!list) return;

  const filtered = customers.filter((customer) => {
    const keyword = `${customer.code} ${customer.name} ${customer.phone} ${customer.status}`.toLowerCase();
    return keyword.includes(customerSearchTerm);
  });

  if (!filtered.length) {
    list.innerHTML = `
      <div class="customer-empty">
        <strong>Tidak ada pelanggan</strong>
        <span>Coba cari nama atau nomor HP lain.</span>
      </div>
    `;
    return;
  }

  list.innerHTML = filtered
    .map(
      (customer) => `
        <article class="customer-row">
          <span class="customer-code">${customer.code}</span>
          <div class="customer-cell-main">
            <strong>${customer.name}</strong>
            <small>${customer.phone}</small>
          </div>
          <div>${getCustomerBadge(customer)}${getCustomerMemberBranch(customer) ? `<small class="member-branch-copy">${getCustomerMemberBranch(customer)}</small>` : ""}</div>
          <span class="last-visit">${customer.lastVisit}</span>
          <button class="table-action" type="button" data-detail-customer="${customer.id}">Lihat Detail</button>
        </article>
      `,
    )
    .join("");
}

function renderCustomerMemberSummary(customer) {
  const rewards = getCustomerRewards(customer);
  if (!rewards.length) {
    return `
      <div class="member-summary-empty">
        <strong>Belum ada member</strong>
        <span>Pelanggan belum memiliki saldo membership.</span>
      </div>
    `;
  }

  return `
    <strong class="member-summary-title">List Member</strong>
    <div class="member-summary-list">
      ${rewards
        .map(
          (reward) => `
            <div class="member-summary-row">
              <span>${getRewardName(reward, { withMember: true })} · ${getCustomerMemberBranch(customer)}</span>
              <b>${reward.progress}/${reward.target}</b>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function getTransactionItemSummary(transaction) {
  const names = transaction.items.map((item) => item.name);
  if (names.length <= 2) return names.join(" + ");
  return `${names.slice(0, 2).join(" + ")} +${names.length - 2}`;
}

function getFallbackTransactions(customer) {
  const fallbackHistory = [
    [customer.lastVisit, "Hair Wash", "Kartini", 60000],
    ["25 Mei 2026", "Creambath", "Wira", 230000],
    ["18 Mei 2026", "Gunting Rambut", "Siska", 160000],
    ["11 Mei 2026", "Hair Wash", "Nadya", 60000],
    ["04 Mei 2026", "Blow Dry", "Priscila", 120000],
    ["27 Apr 2026", "Hair Spa", "Wira", 280000],
  ];
  const history = customerHistories[customer.id] || fallbackHistory;

  return history.map(([date, service, staff, amount], index) => ({
    id: `HIST-${customer.id}-${index}`,
    time: ["16:20", "14:05", "11:30", "10:15", "09:40", "17:10"][index % 6],
    date,
    dateRaw: "",
    customer: customer.name,
    staff,
    amount,
    payment: index % 2 === 0 ? "Tunai" : "QRIS",
    items: [
      {
        name: service,
        qty: 1,
        price: amount,
        staff,
        type: "service",
      },
    ],
    status: "Selesai",
    dp: 0,
    reward: 0,
  }));
}

function getCustomerTransactions(customer) {
  const existing = salesTransactions.filter((transaction) => transaction.customer === customer.name && transaction.status === "Selesai");
  const synthetic = getFallbackTransactions(customer).filter((fallback) => {
    return !existing.some((transaction) => {
      const firstItem = transaction.items[0];
      return transaction.date === fallback.date && firstItem?.name === fallback.items[0].name;
    });
  });
  return [...existing, ...synthetic].slice(0, 14);
}

function renderCustomerDetail(customerId = activeDetailCustomerId) {
  const customer = customers.find((entry) => entry.id === customerId) || customers[0];
  activeDetailCustomerId = customer.id;

  document.querySelector("#detail-name").textContent = customer.name;
  document.querySelector("#detail-badge").innerHTML = getCustomerBadge(customer);
  document.querySelector("#detail-phone").textContent = `No HP: ${customer.phone}`;
  document.querySelector("#detail-member-list").innerHTML = renderCustomerMemberSummary(customer);
  document.querySelector("#detail-reminder").textContent = `Hubungi 7 hari setelah jasa terakhir: ${customer.reminderDate}.`;
  hideCustomerTransactionDetail();

  const transactions = getCustomerTransactions(customer);
  document.querySelector("#detail-history-list").innerHTML = transactions
    .map((transaction) => {
      const statusClass = transaction.status === "Pending" ? "pending" : "";
      return `
        <button class="history-row" type="button" data-customer-transaction-id="${transaction.id}">
          <strong>${transaction.date}</strong>
          <span>${getTransactionItemSummary(transaction)} <small>${transaction.staff ? `· ${transaction.staff}` : ""}${getTransactionMemberBranch(transaction) ? ` · ${getTransactionMemberBranch(transaction)}` : ""}</small></span>
          <b>${formatMoney(transaction.amount)}</b>
          <em class="${statusClass}">${transaction.status}</em>
        </button>
      `;
    })
    .join("");
}
