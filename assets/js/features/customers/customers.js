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
  const frequentBranch = getCustomerFrequentBranch(selectedCustomer);
  summary.innerHTML = `
    <span>Pelanggan</span>
    <div class="customer-title-row">
      <strong>${selectedCustomer.name}</strong>
      ${selectedCustomer.id === "umum" ? `<button class="customer-edit" type="button" data-edit-umum>Edit</button>` : ""}
    </div>
    <small>${selectedCustomer.phone}${frequentBranch ? ` · Sering: ${frequentBranch}` : ""}</small>
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
              <span>${getRewardName(reward, { withMember: true })} · ${getRewardBranch(reward, customer)} · ${remaining}/${reward.target}</span>
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
    const keyword = `${customer.name} ${customer.phone} ${getCustomerFrequentBranch(customer)}`.toLowerCase();
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
            <small>${customer.phone}${getCustomerFrequentBranch(customer) ? ` · Sering: ${getCustomerFrequentBranch(customer)}` : ""}</small>
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
    const keyword = `${customer.code} ${customer.name} ${customer.phone} ${customer.status} ${getCustomerFrequentBranch(customer)}`.toLowerCase();
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
          <div>${getCustomerBadge(customer)}${getCustomerFrequentBranch(customer) ? `<small class="member-branch-copy">Sering: ${getCustomerFrequentBranch(customer)}</small>` : ""}</div>
          <span class="last-visit">${customer.lastVisit}</span>
          <button class="table-action" type="button" data-detail-customer="${customer.id}">Lihat Detail</button>
        </article>
      `,
    )
    .join("");
}

const CUSTOMER_REMINDER_MONTHS = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  Mei: 5,
  Jun: 6,
  Jul: 7,
  Agu: 8,
  Sep: 9,
  Okt: 10,
  Nov: 11,
  Des: 12,
};

function customerReminderEscape(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getLocalDateRaw(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function customerDateLabelToRaw(label = "") {
  if (/^\d{4}-\d{2}-\d{2}/.test(label)) return label.slice(0, 10);
  const [dayText, monthText, yearText] = String(label).trim().split(/\s+/);
  const month = CUSTOMER_REMINDER_MONTHS[monthText];
  const day = Number(dayText);
  const year = Number(yearText);
  if (!day || !month || !year) return "";
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatCustomerReminderDate(dateRaw = "") {
  if (!dateRaw) return "Tanggal tidak tersedia";
  return new Date(`${dateRaw}T00:00:00`).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function addCustomerReminderDays(dateRaw, days) {
  if (!dateRaw) return "";
  const date = new Date(`${dateRaw}T00:00:00`);
  date.setDate(date.getDate() + Math.max(1, Number(days) || 1));
  return getLocalDateRaw(date);
}

function getRecurringCustomerReminderDate(anchorDateRaw, intervalDays, todayRaw, includeUpcoming) {
  if (!anchorDateRaw) return "";
  const interval = Math.max(1, Number(intervalDays) || 1);
  const anchorUtc = Date.parse(`${anchorDateRaw}T00:00:00Z`);
  const todayUtc = Date.parse(`${todayRaw}T00:00:00Z`);
  const elapsedDays = Math.max(0, Math.floor((todayUtc - anchorUtc) / 86400000));
  if (elapsedDays < interval) return addCustomerReminderDays(anchorDateRaw, interval);
  const cycle = includeUpcoming
    ? Math.max(1, Math.ceil(elapsedDays / interval))
    : Math.max(1, Math.floor(elapsedDays / interval));
  return addCustomerReminderDays(anchorDateRaw, cycle * interval);
}

function getLatestMemberUsageDateRaw(customer, reward) {
  const rewardId = getRewardId(reward);
  const serviceId = getRewardServiceId(reward);
  const candidates = [];
  if (reward.lastUsedDateRaw) candidates.push(reward.lastUsedDateRaw);
  if (reward.activatedDateRaw) candidates.push(reward.activatedDateRaw);

  if (typeof getMembershipUsageHistory === "function") {
    getMembershipUsageHistory(customer)
      .filter((usage) => usage.serviceName === getRewardName(reward))
      .forEach((usage) => candidates.push(String(usage.dateTime || "").slice(0, 10)));
  }

  salesTransactions
    .filter((transaction) => transaction.status !== "Pending" && transaction.customer === customer.name)
    .forEach((transaction) => {
      const usedReward = transaction.items?.some((item) => {
        if (!(item.memberFree || item.memberUpgrade || item.memberUsageRewardId)) return false;
        const itemServiceId = item.itemId || findCatalogItem(item)?.id || "";
        return item.memberUsageRewardId === rewardId || itemServiceId === serviceId;
      });
      if (usedReward && transaction.dateRaw) candidates.push(transaction.dateRaw);
    });

  if (!candidates.length) candidates.push(customerDateLabelToRaw(customer.lastVisit));
  return candidates.filter(Boolean).sort().at(-1) || "";
}

function getCustomerReminderRecords({ includeUpcoming = false } = {}) {
  const today = getLocalDateRaw();
  return customers
    .filter((customer) => customer.id !== "umum")
    .flatMap((customer) => {
      const rewards = getCustomerRewards(customer);
      if (customer.type === "member" || customer.status === "Member") {
        const activeRewards = rewards.filter((reward) => {
          const plan = getRewardPlan(reward);
          return Number(reward.progress) > 0 && (reward.status || plan?.status || "Aktif") === "Aktif";
        });
        if (!activeRewards.length) return [];

        const memberSchedules = activeRewards.map((reward) => {
          const plan = getRewardPlan(reward);
          const intervalDays = getMembershipReminderDays(plan);
          const anchorDateRaw = getLatestMemberUsageDateRaw(customer, reward);
          return {
            reward,
            plan,
            intervalDays,
            anchorDateRaw,
            dueDateRaw: getRecurringCustomerReminderDate(anchorDateRaw, intervalDays, today, includeUpcoming),
          };
        }).filter((schedule) => schedule.dueDateRaw);
        return memberSchedules.map((schedule) => ({
          id: `reminder-${customer.id}-${getRewardId(schedule.reward)}`,
          customerId: customer.id,
          customer: customer.name,
          phone: customer.phone,
          type: "Member",
          source: schedule.plan?.name || getRewardName(schedule.reward, { withMember: true }),
          intervalDays: schedule.intervalDays,
          scheduleLabel: `Rutin setiap ${schedule.intervalDays} hari`,
          anchorLabel: schedule.reward.lastUsedDateRaw
            ? "Pemakaian terakhir"
            : schedule.reward.activatedDateRaw
              ? "Aktivasi paket"
              : "Aktivitas terakhir",
          anchorDateRaw: schedule.anchorDateRaw,
          anchorDate: formatCustomerReminderDate(schedule.anchorDateRaw),
          dueDateRaw: schedule.dueDateRaw,
          dueDate: formatCustomerReminderDate(schedule.dueDateRaw),
          branch: getRewardBranch(schedule.reward, customer),
          customerRecord: customer,
        }));
      }

      const service = findCatalogItem({ type: "service", name: customer.lastService });
      const anchorDateRaw = customerDateLabelToRaw(customer.lastVisit);
      if (!service || !anchorDateRaw) return [];
      const intervalDays = getServiceReminderDays(service);
      const dueDateRaw = addCustomerReminderDays(anchorDateRaw, intervalDays);
      return [{
        id: `reminder-${customer.id}`,
        customerId: customer.id,
        customer: customer.name,
        phone: customer.phone,
        type: "Reguler",
        source: service.name,
        intervalDays,
        scheduleLabel: `Sekali setelah ${intervalDays} hari`,
        anchorLabel: "Kunjungan terakhir",
        anchorDateRaw,
        anchorDate: formatCustomerReminderDate(anchorDateRaw),
        dueDateRaw,
        dueDate: formatCustomerReminderDate(dueDateRaw),
        branch: getCustomerLastVisitBranch(customer),
        customerRecord: customer,
      }];
    })
    .filter((reminder) => includeUpcoming || reminder.dueDateRaw <= today)
    .sort((left, right) => left.dueDateRaw.localeCompare(right.dueDateRaw) || left.customer.localeCompare(right.customer));
}

function getCustomerReminderContactState(record) {
  const customerId = record.customerId || record.id;
  const customerIndex = customers
    .filter((customer) => customer.id !== "umum")
    .findIndex((customer) => customer.id === customerId);
  return customerIndex >= 0 && customerIndex % 3 === 0 ? "contacted" : "uncontacted";
}

function renderReminderList() {
  const list = document.querySelector("#reminder-list");
  if (!list) return;
  const reminders = getCustomerReminderRecords();
  const contactedCount = reminders.filter((reminder) => getCustomerReminderContactState(reminder) === "contacted").length;
  const totalCount = document.querySelector("#reminder-total-count");
  const doneCount = document.querySelector("#reminder-done-count");

  if (totalCount) totalCount.textContent = `${reminders.length} reminder`;
  if (doneCount) doneCount.textContent = `${contactedCount} reminder`;

  list.innerHTML = reminders.length
    ? reminders.map((reminder) => {
      const contacted = getCustomerReminderContactState(reminder) === "contacted";
      return `
        <div class="reminder-row">
          <div class="reminder-info">
            <strong>${customerReminderEscape(reminder.customer)}</strong>
            <small>${customerReminderEscape(reminder.phone)}</small>
            <span class="reminder-type ${reminder.type.toLowerCase()}">${reminder.type}</span>
          </div>
          <div class="reminder-last">
            <span>Sumber: <strong>${customerReminderEscape(reminder.source)}</strong> · ${customerReminderEscape(reminder.scheduleLabel)}</span>
            <small>${reminder.anchorLabel}: ${customerReminderEscape(reminder.anchorDate)} · ${customerReminderEscape(reminder.branch || "Cabang tidak tersedia")}</small>
          </div>
          <b>${customerReminderEscape(reminder.dueDate)}</b>
          <button class="reminder-action${contacted ? " done" : ""}" type="button">${contacted ? "Sudah Kontak" : "Kontak"}</button>
        </div>`;
    })
      .join("")
    : `<div class="customer-empty"><strong>Tidak ada reminder aktif</strong><span>Reminder member berhenti saat seluruh kuota habis.</span></div>`;
}

function updateReminderDoneCount() {
  const doneCount = document.querySelector("#reminder-done-count");
  if (!doneCount) return;
  doneCount.textContent = `${document.querySelectorAll("#reminder-list .reminder-action.done").length} reminder`;
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
              <span>${getRewardName(reward, { withMember: true })} · ${getRewardBranch(reward, customer)}</span>
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
    branch: getStaffBranch(staff),
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
  const reminder = getCustomerReminderRecords({ includeUpcoming: true }).find((entry) => entry.customerId === customer.id);
  document.querySelector("#detail-reminder").textContent = reminder
    ? `${reminder.type} · ${reminder.source} · ${reminder.scheduleLabel}. Jadwal berikutnya: ${reminder.dueDate}.`
    : "Tidak ada reminder aktif. Paket member mungkin sudah tidak memiliki kuota.";
  hideCustomerTransactionDetail();

  const transactions = getCustomerTransactions(customer);
  document.querySelector("#detail-history-list").innerHTML = transactions
    .map((transaction) => {
      const statusClass = transaction.status === "Pending" ? "pending" : "";
      return `
        <button class="history-row" type="button" data-customer-transaction-id="${transaction.id}">
          <strong>${transaction.date}</strong>
          <span>${getTransactionItemSummary(transaction)} <small>${transaction.staff ? `· ${transaction.staff}` : ""} · ${getTransactionBranch(transaction)}${getTransactionMemberBranch(transaction) ? ` · Member ${getTransactionMemberBranch(transaction)}` : ""}</small></span>
          <b>${formatMoney(transaction.amount)}</b>
          <em class="${statusClass}">${transaction.status}</em>
        </button>
      `;
    })
    .join("");
}
