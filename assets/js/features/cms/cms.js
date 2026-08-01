const CMS_PAGE_LABELS = {
  dashboard: "Dashboard",
  customers: "Pelanggan",
  services: "Master Jasa",
  "service-activities": "Aktivitas Jasa",
  "products-stock": "Produk & Stok",
  "membership-plans": "Paket Membership",
  promotions: "Promo & Diskon",
  staff: "Petugas",
  sales: "Penjualan",
  pending: "Draft / Pending",
  reminders: "Reminder Pelanggan",
  members: "Member",
  "member-visits": "Kunjungan member",
  "sales-report": "Laporan Pendapatan",
  "regular-report": "Laporan Reguler",
  "revenue-report": "Laporan Kas Masuk",
  "expense-report": "Laporan Pengeluaran Operasional",
  "stock-report": "Laporan Stok",
  "staff-commission": "Komisi Petugas",
  "commission-report": "Laporan Komisi Petugas",
  "users-access": "Pengguna & Hak Akses",
  "salon-settings": "Pengaturan Salon",
};

const CMS_EDITABLE_PAGES = new Set([
  "customers",
  "services",
  "service-activities",
  "products-stock",
  "membership-plans",
  "promotions",
  "staff",
  "users-access",
]);

const CMS_PROMOTIONS = [
  { id: "disc-5", name: "Diskon Jasa 5%", value: "5%", scope: "Jasa", combinable: "Ya", status: "Aktif" },
  { id: "disc-10", name: "Diskon Jasa 10%", value: "10%", scope: "Jasa", combinable: "Ya", status: "Aktif" },
  { id: "promo-hairspa", name: "Promo Hair Spa", value: "Rp 35.000", scope: "Hair Spa", combinable: "Tidak", status: "Aktif" },
  { id: "promo-weekday", name: "Weekday Treatment", value: "5%", scope: "Treatment tertentu", combinable: "Tidak", status: "Dijadwalkan" },
];

const CMS_USERS = [
  { id: "USR-001", name: "Admin JMM", username: "admin", role: "Administrator", access: "Semua menu", status: "Aktif" },
  { id: "USR-002", name: "Kasir JMM", username: "kasir", role: "Kasir", access: "POS, pelanggan, transaksi", status: "Aktif" },
  { id: "USR-003", name: "Supervisor Salon", username: "supervisor", role: "Supervisor", access: "Operasional dan laporan", status: "Aktif" },
];

const CMS_STAFF_DETAILS = {};

function cmsBadge(text, tone = "neutral") {
  return `<span class="cms-badge ${tone}">${text}</span>`;
}

function cmsActionIcon(name) {
  const icons = {
    view: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"></path></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="m19 6-1 14H6L5 6"></path></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"></path><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16l-6.5 7.5V18l-3 1.5v-7Z"></path></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9 9 0 0 1-4-1l-5 2 2-5a9 9 0 1 1 16-4.5Z"></path><path d="M9 8c.5 3 2 4.5 5 5"></path></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path></svg>',
  };
  return icons[name] || icons.view;
}

function cmsActionButton(action, id, label, icon = "view", tone = "") {
  return `<button class="cms-icon-button ${tone}" type="button" data-cms-action="${action}" data-cms-id="${id}" title="${label}" aria-label="${label}">${cmsActionIcon(icon)}</button>`;
}

function getCmsProducts() {
  const productItems = items.filter((item) => item.type === "product");
  return productItems.map((item, index) => {
    const categories = ["Hair Care", "Styling", "Treatment", "Retail"];
    const stock = 4 + ((index * 7) % 28);
    const meta = item.cmsMeta || {};
    return {
      ...item,
      code: meta.code || `PRD-${String(index + 1).padStart(3, "0")}`,
      category: meta.category || categories[index % categories.length],
      cost: meta.cost ?? Math.round(item.price * 0.62 / 1000) * 1000,
      stock: meta.stock ?? stock,
      minimum: meta.minimum ?? 8,
      unit: meta.unit || (index % 3 === 0 ? "Botol" : "Pcs"),
      supplier: meta.supplier || `Supplier ${String.fromCharCode(65 + (index % 4))}`,
    };
  });
}

function getCmsServices() {
  return items.filter((item) => item.type === "service").map((item, index) => {
    const meta = item.cmsMeta || {};
    return {
      ...item,
      code: meta.code || `JSA-${String(index + 1).padStart(3, "0")}`,
      actions: meta.actions || getServiceActions(item),
      upgradeServiceIds: item.upgradeServiceIds || [],
      reminderDays: getServiceReminderDays(item),
      category: meta.category || (index % 3 === 0 ? "Hair Cut & Styling" : index % 3 === 1 ? "Treatment" : "Beauty Care"),
      status: meta.status || "Aktif",
    };
  });
}

function getCommissionActivityLines(item) {
  if (item.type !== "service") return [];
  const catalogItem = findCatalogItem(item);
  const serviceId = item.activeServiceId || catalogItem?.id || item.itemId || item.id;
  const service = getCmsServices().find((entry) => entry.id === serviceId) || catalogItem;
  const activities = service?.actions || getServiceActions(item);
  const actionStaffs = Object.fromEntries(activities.map((activity) => [
    activity,
    normalizeStaffValue(item.actionStaffs?.[activity], item.staff || ""),
  ]));
  const effectivePrice = (item.memberFree || item.memberUpgrade) && item.memberUnitPrice > 0 ? item.memberUnitPrice : (item.price || 0);
  const lineValue = effectivePrice * (item.qty || 1);
  const activityValue = lineValue / Math.max(1, activities.length);

  return activities.flatMap((activity, activityIndex) => {
    const staffNames = (actionStaffs[activity] || []).filter((name) => staffOptions.includes(name));
    if (!staffNames.length) return [];
    const staffValue = activityValue / staffNames.length;
    return staffNames.map((staffName) => ({
      serviceId,
      serviceName: service?.name || item.name,
      activity,
      activityIndex,
      staffName,
      staffValue,
      unitPrice: effectivePrice,
    }));
  });
}

function getCmsStaff() {
  return staffDirectory.map((profile) => {
    const completed = salesTransactions.filter((transaction) => transaction.status !== "Pending" && transaction.items.some((item) => getCommissionActivityLines(item).some((line) => line.staffName === profile.name)));
    const revenue = completed.reduce((sum, transaction) => sum + transaction.items.reduce((lineSum, item) => {
      return lineSum + getCommissionActivityLines(item)
        .filter((line) => line.staffName === profile.name)
        .reduce((activitySum, line) => activitySum + line.staffValue, 0);
    }, 0), 0);
    return {
      ...profile,
      transactions: completed.length,
      revenue: Math.round(revenue),
      ...(CMS_STAFF_DETAILS[profile.name] || {}),
    };
  });
}

function getStaffCommissionProfile(staffId) {
  const staffList = staffDirectory;
  const staff = staffList.find((person) => person.id === staffId) || staffList[0];
  const staffIndex = Math.max(0, staffList.findIndex((person) => person.id === staffId));
  const workedActivities = new Set(salesTransactions
    .filter((transaction) => transaction.status !== "Pending")
    .flatMap((transaction) => transaction.items)
    .flatMap((item) => getCommissionActivityLines(item))
    .filter((line) => line.staffName === staff.name)
    .map((line) => `${line.serviceId}\u0000${line.activity}`));
  const profile = staffCommissionProfiles[staffId] || {};

  getCmsServices().forEach((service, serviceIndex) => {
    const existing = profile[service.id] || {};
    const activitySettings = existing.activities || {};
    service.actions.forEach((activity, activityIndex) => {
      if (activitySettings[activity]) return;
      const worked = workedActivities.has(`${service.id}\u0000${activity}`);
      const enabled = worked || (serviceIndex + activityIndex) % 3 === staffIndex % 3;
      activitySettings[activity] = {
        enabled,
        type: "percent",
        rate: enabled ? [2.5, 5, 7.5, 10, 12.5][(serviceIndex + activityIndex + staffIndex) % 5] : 2.5,
        nominal: 0,
      };
    });
    profile[service.id] = {
      enabled: typeof existing.enabled === "boolean"
        ? existing.enabled
        : service.actions.some((activity) => activitySettings[activity]?.enabled),
      activities: activitySettings,
    };
  });
  staffCommissionProfiles[staffId] = profile;
  return profile;
}

function ensureCommissionReportFilters() {
  if (commissionReportFiltersInitialized) return;
  const dates = salesTransactions
    .filter((transaction) => transaction.status !== "Pending" && transaction.dateRaw)
    .map((transaction) => transaction.dateRaw)
    .sort();
  commissionReportDateFrom = dates[0] || "";
  commissionReportDateTo = dates.at(-1) || "";
  commissionReportFiltersInitialized = true;
}

function transactionMatchesCommissionFilters(transaction) {
  if (transaction.status === "Pending") return false;
  const date = transaction.dateRaw || "";
  const time = (transaction.time || "00:00").slice(0, 5);
  if (commissionReportDateFrom && date < commissionReportDateFrom) return false;
  if (commissionReportDateTo && date > commissionReportDateTo) return false;
  if (commissionReportTimeFrom && time < commissionReportTimeFrom) return false;
  if (commissionReportTimeTo && time > commissionReportTimeTo) return false;
  if (commissionReportBranch && getTransactionBranch(transaction) !== commissionReportBranch) return false;
  return true;
}

function getCmsCommissionReport() {
  ensureCommissionReportFilters();
  const rows = new Map();
  const completed = salesTransactions.filter(transactionMatchesCommissionFilters);
  const staffByName = new Map(getCmsStaff().map((staff) => [staff.name, staff]));

  completed.forEach((transaction) => {
    transaction.items.filter((item) => item.type === "service").forEach((item, itemIndex) => {
      const commissionLines = getCommissionActivityLines(item);
      commissionLines.forEach((commissionLine) => {
        const staff = staffByName.get(commissionLine.staffName);
        if (!staff) return;
        const serviceSetting = getStaffCommissionProfile(staff.id)[commissionLine.serviceId];
        const setting = serviceSetting?.activities?.[commissionLine.activity];
        if (!serviceSetting?.enabled || !setting?.enabled) return;
        const rate = setting.rate;
        const transactionBranch = getTransactionBranch(transaction);
        const key = `${staff.id}:${transactionBranch}`;
        const row = rows.get(key) || {
          id: `${staff.id}-${getSalonBranch(transactionBranch).id}`,
          staffId: staff.id,
          staff: staff.name,
          staffBranch: staff.branch,
          transactionBranch,
          transactions: new Set(),
          serviceValue: 0,
          weightedRate: 0,
          commission: 0,
          entries: [],
        };
        const commission = commissionLine.staffValue * rate / 100;
        row.transactions.add(transaction.id);
        row.serviceValue += commissionLine.staffValue;
        row.weightedRate += commissionLine.staffValue * rate;
        row.commission += commission;
        row.entries.push({
          id: `${transaction.id}-${itemIndex}-activity-${commissionLine.activityIndex}-${staff.id}`,
          transactionId: transaction.id,
          dateRaw: transaction.dateRaw || "",
          date: transaction.date,
          time: transaction.time,
          customer: transaction.customer,
          transactionBranch,
          serviceId: commissionLine.serviceId,
          serviceName: commissionLine.serviceName,
          activityName: commissionLine.activity,
          qty: item.qty || 1,
          serviceValue: commissionLine.staffValue,
          unitPrice: commissionLine.unitPrice || 0,
          rate,
          commission,
        });
        rows.set(key, row);
      });
    });
  });

  return [...rows.values()].map((row) => ({
    ...row,
    transactionCount: row.transactions.size,
    dayCount: new Set(row.entries.map((entry) => entry.dateRaw)).size,
    averageRate: row.serviceValue ? row.weightedRate / row.serviceValue : 0,
    serviceValue: Math.round(row.serviceValue),
    commission: Math.round(row.commission),
    entries: row.entries.sort((a, b) => `${b.dateRaw} ${b.time}`.localeCompare(`${a.dateRaw} ${a.time}`)),
  }));
}

function updateCommissionReportFilter(control) {
  if (control.id === "commission-date-from") commissionReportDateFrom = control.value;
  if (control.id === "commission-date-to") commissionReportDateTo = control.value;
  if (control.id === "commission-time-from") commissionReportTimeFrom = control.value;
  if (control.id === "commission-time-to") commissionReportTimeTo = control.value;
  if (control.id === "commission-branch-filter") commissionReportBranch = control.value;
  if (commissionReportDateFrom && commissionReportDateTo && commissionReportDateFrom > commissionReportDateTo) {
    if (control.id === "commission-date-from") commissionReportDateTo = commissionReportDateFrom;
    else commissionReportDateFrom = commissionReportDateTo;
  }
  if (commissionReportTimeFrom && commissionReportTimeTo && commissionReportTimeFrom > commissionReportTimeTo) {
    if (control.id === "commission-time-from") commissionReportTimeTo = commissionReportTimeFrom;
    else commissionReportTimeFrom = commissionReportTimeTo;
  }
  cmsPageNumbers["commission-report"] = 1;
  cmsViewMode = "list";
  renderCmsCurrentView();
}

function renderCmsStaffCommission() {
  const filters = getCmsListFilterValues("staff-commission");
  const allStaff = getCmsStaff();
  const filteredStaff = filters.branch ? allStaff.filter((person) => person.branch === filters.branch) : allStaff;
  const staff = filteredStaff.length ? filteredStaff : allStaff;
  const selectedStaff = staff.find((person) => person.id === activeCommissionStaffId) || staff[0];
  activeCommissionStaffId = selectedStaff.id;
  const profile = getStaffCommissionProfile(selectedStaff.id);
  const services = getCmsServices().filter((service) => {
    if (filters.category && service.category !== filters.category) return false;
    const setting = profile[service.id];
    const hasActiveCommission = Boolean(setting?.enabled);
    if (filters.commissionState === "active" && !hasActiveCommission) return false;
    if (filters.commissionState === "inactive" && hasActiveCommission) return false;
    return true;
  });
  const activeTreatmentCount = services.filter((service) => profile[service.id]?.enabled).length;
  const activeActivityCount = services.reduce((count, service) => {
    if (!profile[service.id]?.enabled) return count;
    return count + service.actions.filter((activity) => profile[service.id]?.activities?.[activity]?.enabled).length;
  }, 0);

  const serviceRows = services.map((service) => {
    const serviceEnabled = Boolean(profile[service.id]?.enabled);
    const activityRows = service.actions.map((activity, activityIndex) => {
      const setting = profile[service.id]?.activities?.[activity] || { enabled: false, rate: 5, type: "percent" };
      const activityEnabled = serviceEnabled && setting.enabled;
      const actRateType = setting.type || "percent";
      const actRateValue = actRateType === "percent" ? setting.rate : setting.nominal || 0;

      const activityInput = activityEnabled
        ? `<div class="cms-commission-input-group">
             <input type="number" min="0" step="${actRateType === "percent" ? "0.5" : "1000"}" value="${actRateValue}" data-commission-rate="${service.id}" data-commission-activity="${activityIndex}" aria-label="Komisi ${cmsEscape(activity)} pada ${cmsEscape(service.name)}" />
             <select data-commission-type="${service.id}" data-commission-activity="${activityIndex}" aria-label="Tipe komisi">
               <option value="percent" ${actRateType === "percent" ? "selected" : ""}>%</option>
               <option value="nominal" ${actRateType === "nominal" ? "selected" : ""}>Rp</option>
             </select>
           </div>`
        : `<span class="cms-commission-rate-empty">-</span>`;

      return `
        <div class="cms-commission-activity-row ${activityEnabled ? "enabled" : ""}">
          <div class="cms-commission-activity-name">
            <span class="cms-commission-activity-index">${String(activityIndex + 1).padStart(2, "0")}</span>
            <span>${cmsEscape(activity)}</span>
          </div>
          <label class="cms-commission-switch">
            <input type="checkbox" data-commission-toggle="${service.id}" data-commission-activity="${activityIndex}" ${activityEnabled ? "checked" : ""} ${serviceEnabled ? "" : "disabled"} />
            <span aria-hidden="true"></span>
          </label>
          <div class="cms-commission-rate">${activityInput}</div>
        </div>`;
    }).join("");

    const serviceActiveCount = service.actions.filter((activity) => profile[service.id]?.activities?.[activity]?.enabled).length;

    return `
      <details class="cms-commission-list-item ${serviceEnabled ? "enabled" : ""}" ${serviceEnabled ? "open" : ""}>
        <summary class="cms-commission-list-header">
          <div class="cms-commission-service-info">
            <strong>${service.name}</strong>
            <span>${service.category} · ${service.actions.length} aktivitas</span>
          </div>
          <div class="cms-commission-service-meta">
            <span class="cms-commission-badge">${serviceEnabled ? `${serviceActiveCount}/${service.actions.length} aktivitas aktif` : "Treatment nonaktif"}</span>
            <label class="cms-commission-switch" title="${serviceEnabled ? "Nonaktifkan treatment" : "Aktifkan treatment"}">
              <input type="checkbox" data-commission-service-toggle="${service.id}" aria-label="${serviceEnabled ? "Nonaktifkan" : "Aktifkan"} treatment ${cmsEscape(service.name)} untuk komisi aktivitas" ${serviceEnabled ? "checked" : ""} />
              <span aria-hidden="true"></span>
            </label>
            <i class="cms-commission-service-chevron" aria-hidden="true"></i>
          </div>
        </summary>
        <div class="cms-commission-list-details">
          ${activityRows || '<div class="cms-commission-rate-empty">Treatment ini belum memiliki aktivitas.</div>'}
        </div>
      </details>`;
  }).join("");

  return `
    <section class="cms-page-head cms-commission-page-head">
      <div>
        <h3>Komisi Petugas</h3>
        <p>Master tarif komisi setiap aktivitas jasa untuk masing-masing petugas.</p>
      </div>
      <div class="cms-page-head-actions">
        ${renderCmsListFilters("staff-commission")}
        <button class="cms-primary-button" type="button" data-cms-action="save-commissions">Simpan Perubahan</button>
      </div>
    </section>
    <section class="cms-commission-panel">
      <header class="cms-commission-toolbar">
        <label class="cms-commission-staff-picker" for="cms-commission-staff-select">
          <span class="cms-commission-avatar" aria-hidden="true">${selectedStaff.name.charAt(0)}</span>
          <span class="cms-commission-staff-copy">
            <small>Petugas</small>
            <select id="cms-commission-staff-select" aria-label="Pilih petugas">
              ${staff.map((person) => `<option value="${person.id}" ${person.id === selectedStaff.id ? "selected" : ""}>${person.name} · ${person.branch}</option>`).join("")}
            </select>
          </span>
        </label>
        <div class="cms-commission-overview">
          <span><strong>${activeTreatmentCount}</strong> treatment · <strong>${activeActivityCount}</strong> aktivitas aktif</span>
          <span>${selectedStaff.branch}</span>
        </div>
      </header>
      <div class="cms-commission-list">
        ${serviceRows || '<div class="cms-commission-empty">Tidak ada treatment yang sesuai dengan filter.</div>'}
      </div>
    </section>`;
}

function getCmsMemberVisits() {
  return customers
    .filter((customer) => getCustomerRewards(customer).length)
    .flatMap((customer) => getMembershipUsageHistory(customer).map((visit, index) => {
      const reward = getCustomerRewards(customer).find((entry) => membershipServiceMatches(entry, visit.serviceName));
      return {
        id: `${customer.id}-${index}`,
        customerId: customer.id,
        customer: customer.name,
        phone: customer.phone,
        service: visit.serviceName,
        branch: visit.branch || getRewardBranch(reward, customer),
        dateTime: visit.dateTime,
        qty: visit.qty,
        remaining: reward?.progress || 0,
      };
    }));
}

function getTransactionTotalPenjualan(transaction) {
  if (transaction.status === "Pending") return 0;
  const usesMemberBenefit = transaction.items.some((item) => item.memberFree || item.memberUpgrade);
  if (usesMemberBenefit) return 0;
  return transaction.amount;
}

function getTransactionTotalReguler(transaction) {
  if (transaction.status === "Pending") return 0;
  const hasMemberPackage = transaction.items.some((item) => item.type === "member");
  if (hasMemberPackage) return 0;
  const memberItems = transaction.items.filter((item) => item.memberFree || item.memberUpgrade);
  if (!memberItems.length) return 0;
  return memberItems.reduce((sum, item) => {
    const unitPrice = item.memberUnitPrice || 0;
    return sum + (unitPrice * (item.qty || 1));
  }, 0);
}

function getCmsDashboardLinePayable(item) {
  const quantity = Math.max(1, Number(item.qty) || 1);
  const baseTotal = Math.max(0, Number(item.price) || 0) * quantity;
  const storedRate = Number(item.discountRate);
  const combinedRate = (Number(item.fixedDiscountRate) || 0) + (Number(item.flexibleDiscountRate) || 0);
  const discountRate = Math.min(100, Math.max(0, Number.isFinite(storedRate) ? storedRate : combinedRate));
  return Math.max(0, Math.round(baseTotal * (100 - discountRate) / 100));
}

function getCmsTransactionMemberUsedValue(transaction) {
  const items = Array.isArray(transaction.items) ? transaction.items : [];
  return items
    .filter((item) => item.memberFree || item.memberUpgrade)
    .reduce((sum, item) => {
      const quantity = Math.max(1, Number(item.qty) || 1);
      const unitPrice = Number(item.memberUnitPrice) || Number(item.memberUseAmount) || getLineMemberUnitPrice(item) || Number(item.price) || 0;
      return sum + (unitPrice * quantity);
    }, 0);
}

function getCmsTransactionTotalValue(transaction) {
  return Math.max(0, Number(transaction.amount) || 0) + getCmsTransactionMemberUsedValue(transaction);
}

function getCmsDashboardTransactionMetrics(transaction) {
  const items = Array.isArray(transaction.items) ? transaction.items : [];
  const cashIn = transaction.status === "Pending" ? 0 : Math.max(0, Number(transaction.amount) || 0);
  const memberUsed = transaction.status === "Pending" ? 0 : getCmsTransactionMemberUsedValue(transaction);
  const productRevenue = transaction.status === "Pending" ? 0 : items
    .filter((item) => item.type === "product")
    .reduce((sum, item) => sum + getCmsDashboardLinePayable(item), 0);
  const memberItems = transaction.status === "Pending" ? [] : items.filter((item) => item.type === "member");
  const memberSales = memberItems.reduce((sum, item) => sum + getCmsDashboardLinePayable(item), 0);
  const membersSold = memberItems.reduce((sum, item) => sum + Math.max(1, Number(item.qty) || 1), 0);
  const regularCash = Math.max(0, cashIn - memberSales - productRevenue);

  return {
    cashIn,
    memberUsed,
    regularRevenue: regularCash + memberUsed,
    productRevenue,
    memberSales,
    membersSold,
    transactionTotal: getCmsTransactionTotalValue(transaction),
  };
}

function getCmsFilterOptions(values) {
  return [...new Set(values.filter(Boolean))]
    .sort((left, right) => String(left).localeCompare(String(right), "id"))
    .map((value) => ({ value, label: value }));
}

function getCmsListFilterValues(page) {
  return cmsListFilters[page] || {};
}

function getCmsReminderContactStatus(record) {
  return getCustomerReminderContactState(record);
}

function getCmsListFilterDefinitions(page) {
  if (page === "dashboard") {
    return [{ key: "branch", label: "Cabang Transaksi", options: getCmsFilterOptions(salonBranches.map((branch) => branch.name)) }];
  }
  if (page === "customers") {
    return [
      { key: "status", label: "Status", options: getCmsFilterOptions(customers.filter((customer) => customer.id !== "umum").map((customer) => customer.status)) },
      { key: "branch", label: "Sering Berkunjung", options: getCmsFilterOptions(customers.map(getCustomerFrequentBranch)) },
    ];
  }
  if (page === "services") {
    const services = getCmsServices();
    return [
      { key: "category", label: "Kategori", options: getCmsFilterOptions(services.map((service) => service.category)) },
      { key: "status", label: "Status", options: getCmsFilterOptions(services.map((service) => service.status)) },
      { key: "promotionState", label: "Promo", options: [{ value: "with", label: "Ada Promo" }, { value: "without", label: "Tanpa Promo" }] },
      { key: "upgradeState", label: "Upgrade", options: [{ value: "with", label: "Ada Opsi Upgrade" }, { value: "without", label: "Tanpa Upgrade" }] },
    ];
  }
  if (page === "service-activities") {
    const services = getCmsServices();
    return [
      { key: "category", label: "Kategori Jasa", options: getCmsFilterOptions(services.map((service) => service.category)) },
      { key: "status", label: "Status", options: getCmsFilterOptions(services.map((service) => service.status)) },
      { key: "activityCount", label: "Jumlah Aktivitas", options: [{ value: "single", label: "1 Aktivitas" }, { value: "multiple", label: "Lebih dari 1" }] },
    ];
  }
  if (page === "products-stock") {
    const products = getCmsProducts();
    return [
      { key: "category", label: "Kategori", options: getCmsFilterOptions(products.map((product) => product.category)) },
      { key: "supplier", label: "Supplier", options: getCmsFilterOptions(products.map((product) => product.supplier)) },
      { key: "stockStatus", label: "Status Stok", options: [{ value: "low", label: "Stok Rendah" }, { value: "normal", label: "Tersedia" }] },
    ];
  }
  if (page === "membership-plans") {
    return [
      { key: "service", label: "Treatment", options: getCmsFilterOptions(membershipPlans.map((plan) => plan.serviceName)) },
      { key: "status", label: "Status", options: getCmsFilterOptions(membershipPlans.map((plan) => plan.status || "Aktif")) },
      { key: "bonusState", label: "Bonus", options: [{ value: "with", label: "Dengan Bonus" }, { value: "without", label: "Tanpa Bonus" }] },
    ];
  }
  if (page === "promotions") {
    return [
      { key: "scope", label: "Berlaku Untuk", options: getCmsFilterOptions(CMS_PROMOTIONS.map((promotion) => promotion.scope)) },
      { key: "combinable", label: "Bisa Digabung", options: getCmsFilterOptions(CMS_PROMOTIONS.map((promotion) => promotion.combinable)) },
      { key: "status", label: "Status", options: getCmsFilterOptions(CMS_PROMOTIONS.map((promotion) => promotion.status)) },
    ];
  }
  if (page === "staff") {
    const staff = getCmsStaff();
    return [
      { key: "branch", label: "Cabang Petugas", options: getCmsFilterOptions(staff.map((person) => person.branch)) },
      { key: "status", label: "Status", options: getCmsFilterOptions(staff.map((person) => person.status)) },
    ];
  }
  if (page === "staff-commission") {
    return [
      { key: "branch", label: "Cabang Petugas", options: getCmsFilterOptions(getCmsStaff().map((person) => person.branch)) },
      { key: "category", label: "Kategori Jasa", options: getCmsFilterOptions(getCmsServices().map((service) => service.category)) },
      { key: "commissionState", label: "Tarif Komisi", options: [{ value: "active", label: "Sudah Diatur" }, { value: "inactive", label: "Belum Diatur" }] },
    ];
  }
  if (page === "sales") {
    return [
      { key: "dateFrom", label: "Dari", type: "date" },
      { key: "dateTo", label: "Sampai", type: "date" },
      { key: "branch", label: "Cabang Transaksi", options: getCmsFilterOptions(salesTransactions.map(getTransactionBranch)) },
      { key: "payment", label: "Pembayaran", options: getCmsFilterOptions(salesTransactions.map((transaction) => transaction.payment)) },
      { key: "status", label: "Status", options: getCmsFilterOptions(salesTransactions.map((transaction) => transaction.status)) },
    ];
  }
  if (page === "pending") {
    const pending = getPendingTransactions();
    return [
      { key: "dateFrom", label: "Dari", type: "date" },
      { key: "dateTo", label: "Sampai", type: "date" },
      { key: "branch", label: "Cabang Transaksi", options: getCmsFilterOptions(pending.map(getTransactionBranch)) },
      { key: "dpStatus", label: "Down Payment", options: [{ value: "with", label: "Ada DP" }, { value: "without", label: "Tanpa DP" }] },
    ];
  }
  if (page === "reminders") {
    const reminders = getCustomerReminderRecords();
    return [
      { key: "branch", label: "Cabang", options: getCmsFilterOptions(reminders.map((reminder) => reminder.branch)) },
      { key: "type", label: "Tipe Reminder", options: [{ value: "Reguler", label: "Reguler" }, { value: "Member", label: "Member" }] },
      { key: "contactStatus", label: "Status Kontak", options: [{ value: "contacted", label: "Sudah Dihubungi" }, { value: "uncontacted", label: "Belum Dihubungi" }] },
    ];
  }
  if (page === "members") {
    const memberCustomers = customers.filter((customer) => getCustomerRewards(customer).length);
    return [
      { key: "branch", label: "Cabang Membership", options: getCmsFilterOptions(memberCustomers.flatMap(getCustomerMembershipBranches)) },
      { key: "plan", label: "Paket Membership", options: getCmsFilterOptions(memberCustomers.flatMap((customer) => getCustomerRewards(customer).map((reward) => getRewardName(reward)))) },
      { key: "quotaStatus", label: "Kuota", options: [{ value: "available", label: "Masih Tersedia" }, { value: "empty", label: "Sudah Habis" }] },
    ];
  }
  if (page === "member-visits") {
    const visits = getCmsMemberVisits();
    return [
      { key: "dateFrom", label: "Dari", type: "date" },
      { key: "dateTo", label: "Sampai", type: "date" },
      { key: "branch", label: "Cabang Membership", options: getCmsFilterOptions(visits.map((visit) => visit.branch)) },
      { key: "service", label: "Membership", options: getCmsFilterOptions(visits.map((visit) => visit.service)) },
    ];
  }
  if (page === "users-access") {
    return [
      { key: "role", label: "Peran", options: getCmsFilterOptions(CMS_USERS.map((user) => user.role)) },
      { key: "access", label: "Hak Akses", options: getCmsFilterOptions(CMS_USERS.map((user) => user.access)) },
      { key: "status", label: "Status", options: getCmsFilterOptions(CMS_USERS.map((user) => user.status)) },
    ];
  }
  if (page === "salon-settings") {
    return [{
      key: "section",
      label: "Bagian Pengaturan",
      options: [
        { value: "identity", label: "Identitas Salon" },
        { value: "cashier", label: "Aturan Kasir" },
      ],
    }];
  }
  return [];
}

function getCmsListRecordFilterValues(page, record, index = 0) {
  if (page === "customers") return { status: record.status, branch: getCustomerFrequentBranch(record) };
  if (page === "services") {
    return {
      category: record.category,
      status: record.status,
      promotionState: getCmsServicePromotionLabel(record) === "—" ? "without" : "with",
      upgradeState: getCmsServiceUpgradeNames(record).length ? "with" : "without",
    };
  }
  if (page === "service-activities") {
    return {
      category: record.category,
      status: record.status,
      activityCount: record.actions.length > 1 ? "multiple" : "single",
    };
  }
  if (page === "products-stock") {
    return {
      category: record.category,
      supplier: record.supplier,
      stockStatus: record.stock <= record.minimum ? "low" : "normal",
    };
  }
  if (page === "membership-plans") {
    return {
      service: record.serviceName,
      status: record.status || "Aktif",
      bonusState: record.bonuses?.length ? "with" : "without",
    };
  }
  if (page === "promotions") return { scope: record.scope, combinable: record.combinable, status: record.status };
  if (page === "staff") return { branch: record.branch, status: record.status };
  if (page === "sales") {
    return {
      date: record.dateRaw || "",
      branch: getTransactionBranch(record),
      payment: record.payment,
      status: record.status,
    };
  }
  if (page === "pending") {
    return {
      date: record.dateRaw || "",
      branch: getTransactionBranch(record),
      dpStatus: Number(record.dp || 0) > 0 ? "with" : "without",
    };
  }
  if (page === "reminders") {
    return {
      branch: record.branch,
      type: record.type,
      contactStatus: getCmsReminderContactStatus(record),
    };
  }
  if (page === "members") {
    const rewards = getCustomerRewards(record);
    return {
      branch: getCustomerMembershipBranches(record),
      plan: rewards.map((reward) => getRewardName(reward)),
      quotaStatus: rewards.some((reward) => reward.progress > 0) ? "available" : "empty",
    };
  }
  if (page === "member-visits") return { date: record.dateTime.slice(0, 10), branch: record.branch, service: record.service };
  if (page === "users-access") return { role: record.role, access: record.access, status: record.status };
  return {};
}

function cmsListRecordMatchesFilters(page, record, index = 0) {
  const filters = getCmsListFilterValues(page);
  const values = getCmsListRecordFilterValues(page, record, index);
  return Object.entries(filters).every(([key, selected]) => {
    if (!selected) return true;
    if (key === "dateFrom") return Boolean(values.date && values.date >= selected);
    if (key === "dateTo") return Boolean(values.date && values.date <= selected);
    const recordValue = values[key];
    return Array.isArray(recordValue) ? recordValue.includes(selected) : recordValue === selected;
  });
}

function getCmsPageRows(page) {
  if (page === "customers") {
    return customers.filter((customer) => customer.id !== "umum").filter((customer, index) => cmsListRecordMatchesFilters(page, customer, index)).map((customer) => ({
      id: customer.id,
      search: `${customer.code} ${customer.name} ${customer.phone} ${customer.status} ${getCustomerFrequentBranch(customer)}`,
      cells: [customer.code, `<strong>${customer.name}</strong>`, customer.phone, cmsBadge(customer.status, customer.status === "Member" ? "gold" : "neutral"), getCustomerFrequentBranch(customer) || "—", customer.totalVisits, customer.lastVisit],
    }));
  }
  if (page === "services") {
    return getCmsServices().filter((service, index) => cmsListRecordMatchesFilters(page, service, index)).map((service) => ({
      id: service.id,
      search: `${service.code} ${service.name} ${service.category} ${getCmsServicePromotionLabel(service)} ${getCmsServiceUpgradeNames(service).join(" ")} ${service.reminderDays} hari`,
      cells: [service.code, `<strong>${service.name}</strong>`, service.category, service.actions.length, getCmsServicePromotionLabel(service), getCmsServiceUpgradeNames(service).join(" · ") || "—", formatMoney(service.price), `${service.reminderDays} hari`, cmsBadge(service.status, "success")],
    }));
  }
  if (page === "service-activities") {
    return getCmsServices().filter((service, index) => cmsListRecordMatchesFilters(page, service, index)).map((service) => ({
      id: service.id,
      search: `${service.name} ${service.actions.join(" ")}`,
      cells: [`<strong>${service.name}</strong>`, service.actions.join(" · "), service.actions.length, staffOptions.length, cmsBadge(service.status, service.status === "Aktif" ? "success" : "neutral")],
    }));
  }
  if (page === "products-stock" || page === "stock-report") {
    const products = getCmsProducts();
    const filtered = page === "stock-report" ? products.filter((product) => {
      if (stockReportCategory && product.category !== stockReportCategory) return false;
      if (stockReportSupplier && product.supplier !== stockReportSupplier) return false;
      if (stockReportStockStatus === "low" && product.stock > product.minimum) return false;
      if (stockReportStockStatus === "normal" && product.stock <= product.minimum) return false;
      return true;
    }) : products.filter((product, index) => cmsListRecordMatchesFilters(page, product, index));
    return filtered.map((product) => ({
      id: product.id,
      search: `${product.code} ${product.name} ${product.category} ${product.supplier}`,
      cells: [product.code, `<strong>${product.name}</strong>`, product.category, product.supplier, formatMoney(product.cost), formatMoney(product.price), `${product.stock} ${product.unit}`, cmsBadge(product.stock <= product.minimum ? "Stok rendah" : "Tersedia", product.stock <= product.minimum ? "warning" : "success")],
    }));
  }
  if (page === "membership-plans") {
    return membershipPlans.filter((plan, index) => cmsListRecordMatchesFilters(page, plan, index)).map((plan) => ({
      id: plan.id,
      search: `${plan.name} ${plan.serviceName} ${getMembershipBonusSummary(plan.bonuses)} ${getMembershipReminderDays(plan)} hari`,
      cells: [`MBR-${String(membershipPlans.indexOf(plan) + 1).padStart(3, "0")}`, `<strong>${plan.name}</strong>`, plan.serviceName, `${plan.target} kali`, getMembershipBonusSummary(plan.bonuses) || "—", formatMoney(plan.price), formatMoney(Math.round(plan.price / plan.target)), `Rutin ${getMembershipReminderDays(plan)} hari`, cmsBadge(plan.status || "Aktif", (plan.status || "Aktif") === "Aktif" ? "success" : "neutral")],
    }));
  }
  if (page === "promotions") {
    return CMS_PROMOTIONS.filter((promotion, index) => cmsListRecordMatchesFilters(page, promotion, index)).map((promotion) => ({
      id: promotion.id,
      search: Object.values(promotion).join(" "),
      cells: [`<strong>${promotion.name}</strong>`, promotion.value, promotion.scope, promotion.combinable, cmsBadge(promotion.status, promotion.status === "Aktif" ? "success" : "warning")],
    }));
  }
  if (page === "staff") {
    return getCmsStaff().filter((staff, index) => cmsListRecordMatchesFilters(page, staff, index)).map((staff) => ({
      id: staff.id,
      search: `${staff.id} ${staff.name} ${staff.branch} ${staff.phone}`,
      cells: [staff.id, `<strong>${staff.name}</strong>`, staff.phone, staff.branch, cmsBadge(staff.status, staff.status === "Aktif" ? "success" : "warning")],
    }));
  }
  if (page === "sales") {
    return salesTransactions.filter((transaction, index) => cmsListRecordMatchesFilters(page, transaction, index)).map((transaction) => ({
      id: transaction.id,
      search: `${transaction.id} ${transaction.customer} ${transaction.staff} ${transaction.payment} ${getTransactionBranch(transaction)} ${getTransactionMemberBranch(transaction)} ${transaction.note || ""}`,
      cells: [transaction.id, `${transaction.date}<small>${transaction.time}</small>`, `<strong>${transaction.customer}</strong>`, transaction.staff, getTransactionBranch(transaction), cmsBadge(transaction.payment, "gold"), getTransactionMemberBranch(transaction) || "—", formatMoney(transaction.amount), cmsBadge(transaction.status, transaction.status === "Pending" ? "warning" : "success")],
    }));
  }
  if (page === "sales-report") {
    return salesTransactions.filter((transaction) => transactionMatchesReportFilters(transaction, page)).map((transaction) => {
      return {
        id: transaction.id,
        search: `${transaction.id} ${transaction.customer} ${transaction.staff} ${transaction.payment} ${getTransactionBranch(transaction)} ${getTransactionMemberBranch(transaction)} ${transaction.note || ""}`,
        cells: [transaction.id, `${transaction.date}<small>${transaction.time}</small>`, `<strong>${transaction.customer}</strong>`, getTransactionBranch(transaction), formatMoney(getCmsTransactionTotalValue(transaction)), cmsBadge(transaction.status, transaction.status === "Pending" ? "warning" : "success")],
      };
    });
  }
  if (page === "regular-report") {
    return salesTransactions.filter((transaction) => transactionMatchesReportFilters(transaction, page) && getTransactionTotalReguler(transaction) > 0).map((transaction) => {
      const regulerTotal = getTransactionTotalReguler(transaction);
      return {
        id: transaction.id,
        search: `${transaction.id} ${transaction.customer} ${transaction.staff} ${transaction.payment} ${getTransactionBranch(transaction)} ${getTransactionMemberBranch(transaction)} ${transaction.note || ""}`,
        cells: [transaction.id, `${transaction.date}<small>${transaction.time}</small>`, `<strong>${transaction.customer}</strong>`, transaction.staff, getTransactionBranch(transaction), cmsBadge(transaction.payment, "gold"), getTransactionMemberBranch(transaction) || "—", formatMoney(regulerTotal), cmsBadge("Reguler", "success")],
      };
    });
  }
  if (page === "pending") {
    return getPendingTransactions().filter((transaction, index) => cmsListRecordMatchesFilters(page, transaction, index)).map((transaction) => ({
      id: transaction.id,
      search: `${transaction.id} ${transaction.customer} ${transaction.staff} ${getTransactionBranch(transaction)} ${getTransactionMemberBranch(transaction)} ${transaction.note || ""}`,
      cells: [transaction.id, `${transaction.date}<small>${transaction.time}</small>`, `<strong>${transaction.customer}</strong>`, transaction.staff, getTransactionBranch(transaction), `${transaction.items.length} item`, getTransactionMemberBranch(transaction) || "—", formatMoney(transaction.dp || 0), formatMoney(transaction.amount), cmsBadge("Pending", "warning")],
    }));
  }
  if (page === "reminders") {
    return getCustomerReminderRecords().filter((reminder, index) => cmsListRecordMatchesFilters(page, reminder, index)).map((reminder) => {
      const contacted = getCmsReminderContactStatus(reminder) === "contacted";
      return {
        id: reminder.id,
        search: `${reminder.customer} ${reminder.phone} ${reminder.type} ${reminder.source} ${reminder.scheduleLabel} ${reminder.branch}`,
        cells: [`<strong>${reminder.customer}</strong>`, reminder.phone, cmsBadge(reminder.type, reminder.type === "Member" ? "gold" : "neutral"), `<strong>${reminder.source}</strong><small>${reminder.scheduleLabel}</small>`, `<strong>${reminder.anchorDate}</strong><small>${reminder.anchorLabel} · ${reminder.branch || "—"}</small>`, reminder.dueDate, cmsBadge(contacted ? "Sudah dihubungi" : "Belum dihubungi", contacted ? "success" : "warning")],
      };
    });
  }
  if (page === "members") {
    return customers.filter((customer) => getCustomerRewards(customer).length).filter((customer, index) => cmsListRecordMatchesFilters(page, customer, index)).map((customer) => {
      const rewards = getCustomerRewards(customer);
      return {
        id: customer.id,
        search: `${customer.name} ${customer.phone} ${getCustomerMembershipBranches(customer).join(" ")} ${rewards.map((reward) => getRewardName(reward)).join(" ")}`,
        cells: [`<strong>${customer.name}</strong>`, customer.phone, getCustomerMembershipBranches(customer).join(" · "), rewards.length, rewards.map((reward) => `${getRewardName(reward)} ${reward.progress}/${reward.target}`).join(" · "), customer.totalVisits, cmsBadge("Aktif", "success")],
      };
    });
  }
  if (page === "member-visits") {
    return getCmsMemberVisits().filter((visit, index) => cmsListRecordMatchesFilters(page, visit, index)).map((visit) => ({
      id: visit.id,
      search: `${visit.customer} ${visit.service} ${visit.branch} ${visit.dateTime}`,
      cells: [visit.dateTime, `<strong>${visit.customer}</strong>`, visit.service, visit.branch, `${visit.qty} kuota`, cmsBadge("Terpakai", "gold")],
    }));
  }
  if (page === "revenue-report") {
    return salesTransactions.filter((transaction) => transactionMatchesReportFilters(transaction, page)).map((transaction) => ({
      id: transaction.id,
      search: `${transaction.id} ${transaction.customer} ${transaction.payment} ${getTransactionBranch(transaction)} ${transaction.note || ""}`,
      cells: [
        `${transaction.date}<small>${transaction.time}</small>`,
        transaction.id,
        `<strong>${transaction.customer}</strong>`,
        cmsBadge(transaction.payment, "gold"),
        getTransactionBranch(transaction),
        formatMoney(transaction.dp || 0),
        `<strong>${formatMoney(Math.max(0, Number(transaction.amount) || 0))}</strong>`,
      ],
    }));
  }
  if (page === "expense-report") {
    return cashierOperationalExpenses.filter(expenseMatchesReportFilters).map((expense) => ({
      id: expense.id,
      search: `${expense.id} ${expense.dateRaw} ${expense.note} ${expense.branch}`,
      cells: [
        formatCmsExpenseDate(expense.dateRaw),
        expense.id,
        `<strong>${cmsEscape(expense.note)}</strong>`,
        cmsEscape(expense.branch),
        `<strong>${formatMoney(Math.max(0, Number(expense.amount) || 0))}</strong>`,
      ],
    }));
  }
  if (page === "staff-commission") {
    return getCmsStaff().filter((staff) => staff.transactions).map((staff) => ({
      id: staff.id,
      search: `${staff.name} ${staff.specialty}`,
      cells: [`<strong>${staff.name}</strong>`, staff.specialty, staff.transactions, formatMoney(staff.revenue), "10%", formatMoney(Math.round(staff.revenue * 0.1))],
    }));
  }
  if (page === "commission-report") {
    return getCmsCommissionReport().map((row) => {
      const memberEntries = row.entries.filter((entry) => entry.unitPrice > 0);
      const avgUnitPrice = memberEntries.length > 0
        ? Math.round(memberEntries.reduce((sum, entry) => sum + entry.unitPrice, 0) / memberEntries.length)
        : 0;
      return {
        id: row.id,
        search: `${row.staff} ${row.staffBranch} ${row.transactionBranch}`,
        cells: [`<strong>${row.staff}</strong>`, row.staffBranch, row.transactionBranch, `${row.dayCount} hari`, row.transactionCount, avgUnitPrice ? formatMoney(avgUnitPrice) : "—", formatMoney(row.serviceValue), `${row.averageRate.toFixed(1).replace(".0", "")}%`, `<strong>${formatMoney(row.commission)}</strong>`],
      };
    });
  }
  if (page === "users-access") {
    return CMS_USERS.filter((user, index) => cmsListRecordMatchesFilters(page, user, index)).map((user) => ({
      id: user.id,
      search: Object.values(user).join(" "),
      cells: [user.id, `<strong>${user.name}</strong>`, user.username, user.role, user.access, cmsBadge(user.status, "success")],
    }));
  }
  return [];
}

function getCmsPageMeta(page) {
  const meta = {
    customers: { subtitle: "Kelola profil, nomor HP, status member, cabang yang sering dikunjungi, dan reminder pelanggan.", headers: ["Kode", "Nama", "Nomor HP", "Status", "Sering Berkunjung", "Kunjungan", "Terakhir"], add: "Tambah Pelanggan", search: "Cari nama, nomor HP, cabang, atau kode..." },
    services: { subtitle: "Daftar jasa beserta promo, opsi upgrade, dan interval reminder pelanggan reguler.", headers: ["Kode", "Nama Jasa", "Kategori", "Aktivitas", "Promo", "Opsi Upgrade", "Harga Normal", "Reminder", "Status"], add: "Tambah Jasa", search: "Cari jasa, promo, reminder, atau opsi upgrade..." },
    "service-activities": { subtitle: "Atur langkah kerja setiap jasa agar kasir dapat memilih satu atau beberapa petugas per aktivitas.", headers: ["Jasa", "Urutan Aktivitas", "Jumlah", "Petugas Tersedia", "Status"], add: "Tambah Aktivitas", search: "Cari jasa atau aktivitas..." },
    "products-stock": { subtitle: "Produk retail yang tersedia di POS, harga jual, supplier, dan posisi stok.", headers: ["Kode", "Produk", "Kategori", "Supplier", "Harga Pokok", "Harga Jual", "Stok", "Status"], add: "Tambah Produk", search: "Cari produk, kategori, atau supplier..." },
    "membership-plans": { subtitle: "Paket kuota treatment beserta bonus dan interval reminder rutin selama kuota masih tersedia.", headers: ["Kode", "Paket", "Jasa", "Kuota", "Bonus", "Harga Paket", "Harga / Kuota", "Reminder", "Status"], add: "Tambah Paket", search: "Cari paket, jasa, bonus, atau reminder member..." },
    promotions: { subtitle: "Konfigurasi diskon per item jasa yang dapat dipilih kasir setelah item masuk keranjang.", headers: ["Program", "Nilai", "Berlaku Untuk", "Bisa Digabung", "Status"], add: "Tambah Promo", search: "Cari promo atau cakupan..." },
    staff: { subtitle: "Petugas beserta cabang penempatan yang dapat ditugaskan ke aktivitas jasa di POS.", headers: ["Kode", "Nama", "Nomor HP", "Cabang Petugas", "Status"], add: "Tambah Petugas", search: "Cari petugas, cabang, atau nomor HP..." },
    sales: { subtitle: "Seluruh transaksi kasir dengan cabang salon dan cabang membership yang digunakan.", headers: ["No. Nota", "Tanggal", "Pelanggan", "Petugas Utama", "Cabang Transaksi", "Pembayaran", "Cabang Membership", "Total", "Status"], search: "Cari no. nota, pelanggan, petugas, cabang, atau catatan..." },
    pending: { subtitle: "Draft transaksi kasir dengan cabang salon dan cabang membership yang dipakai.", headers: ["No. Draft", "Tanggal", "Pelanggan", "Petugas", "Cabang Transaksi", "Isi", "Cabang Membership", "DP", "Total", "Status"], search: "Cari draft, pelanggan, cabang, atau catatan..." },
    reminders: { subtitle: "Reminder reguler mengikuti Master Jasa; reminder member berjalan rutin selama paket aktif dan kuota tersedia.", headers: ["Pelanggan", "Nomor HP", "Tipe", "Sumber Reminder", "Aktivitas Terakhir", "Jadwal Reminder", "Status Kontak"], search: "Cari pelanggan, tipe, sumber reminder, nomor HP, atau cabang..." },
    members: { subtitle: "Daftar pelanggan dengan paket member aktif dari satu atau beberapa cabang.", headers: ["Pelanggan", "Nomor HP", "Cabang Membership", "Paket Aktif", "Sisa Kuota", "Total Kunjungan", "Status"], add: "Tambah Member", search: "Cari pelanggan, cabang, atau paket member..." },
    "member-visits": { subtitle: "Riwayat penggunaan kuota membership per pelanggan, treatment, dan cabang.", headers: ["Tanggal & Waktu", "Pelanggan", "Membership", "Cabang Membership", "Pemakaian", "Status"], search: "Cari pelanggan, cabang, atau membership..." },
    "sales-report": { subtitle: "Ringkasan menyeluruh transaksi salon, mencakup transaksi selesai, pending, kas masuk, pendapatan reguler, dan pendapatan produk.", headers: ["No. Nota", "Tanggal / Waktu", "Pelanggan", "Cabang Transaksi", "Total Transaksi", "Status"], search: "Cari no. nota, pelanggan, petugas, pembayaran, cabang, atau catatan..." },
    "regular-report": { subtitle: "Pendapatan reguler merupakan gabungan nilai pemakaian member dan kas masuk dari transaksi reguler, tanpa memasukkan penjualan paket member.", headers: ["No. Nota", "Tanggal", "Pelanggan", "Petugas", "Cabang Transaksi", "Pembayaran", "Cabang Membership", "Total Reguler", "Status"], search: "Cari transaksi reguler, cabang, atau catatan..." },
    "revenue-report": { subtitle: "Kas masuk merupakan pembayaran yang benar-benar diterima dari transaksi reguler dan penjualan paket member; pemakaian kuota member tidak dihitung.", headers: ["Tanggal / Waktu", "No. Nota", "Pelanggan", "Metode", "Cabang Transaksi", "DP", "Kas Masuk"], search: "Cari transaksi, metode, cabang, atau catatan..." },
    "expense-report": { subtitle: "Rekap pengeluaran operasional yang dicatat oleh kasir atau CMS berdasarkan tanggal, nominal, catatan, dan cabang.", headers: ["Tanggal", "Kode", "Catatan", "Cabang", "Nominal"], add: "Tambah Pengeluaran", search: "Cari kode, catatan, tanggal, atau cabang..." },
    "stock-report": { subtitle: "Laporan posisi stok produk dan peringatan produk di bawah batas minimum.", headers: ["Kode", "Produk", "Kategori", "Supplier", "Harga Pokok", "Harga Jual", "Stok", "Status"], search: "Cari produk pada laporan stok..." },
    "staff-commission": { subtitle: "Konfigurasi tarif komisi aktivitas jasa untuk setiap petugas sebagai bagian dari Master Data.", headers: ["Petugas", "Keahlian", "Transaksi", "Nilai Jasa", "Tarif", "Komisi"], search: "Cari petugas..." },
    "commission-report": { subtitle: "Rekap komisi aktivitas jasa yang dikerjakan petugas berdasarkan waktu serta cabang transaksi.", headers: ["Petugas", "Cabang Petugas", "Cabang Transaksi", "Hari Kerja", "Transaksi", "Harga Satuan", "Dasar Komisi", "Rata-rata Tarif", "Komisi"], search: "Cari petugas atau cabang..." },
    "users-access": { subtitle: "Akun pengguna CMS dan batas akses ke fungsi kasir, operasional, serta laporan.", headers: ["ID", "Nama", "Username", "Peran", "Hak Akses", "Status"], add: "Tambah Pengguna", search: "Cari nama, username, atau peran..." },
  };
  return meta[page] || { subtitle: "", headers: [], search: "Cari data..." };
}

function getCmsSummary(page, rows) {
  const completed = salesTransactions.filter((transaction) => transaction.status !== "Pending");
  const totalPenjualan = completed.reduce((sum, transaction) => sum + getTransactionTotalPenjualan(transaction), 0);
  const totalReguler = completed.reduce((sum, transaction) => sum + getTransactionTotalReguler(transaction), 0);
  if (page === "sales") return [["Transaksi selesai", completed.length], ["Pending", getPendingTransactions().length], ["Total penjualan", formatMoney(totalPenjualan)], ["Total reguler", formatMoney(totalReguler)]];
  if (page === "sales-report") {
    const reportTransactions = salesTransactions.filter((transaction) => transactionMatchesReportFilters(transaction, page));
    const reportCompleted = reportTransactions.filter((transaction) => transaction.status !== "Pending");
    const reportPending = reportTransactions.filter((transaction) => transaction.status === "Pending");
    const reportTotals = reportCompleted
      .map(getCmsDashboardTransactionMetrics)
      .reduce((summary, metrics) => ({
        cashIn: summary.cashIn + metrics.cashIn,
        regularRevenue: summary.regularRevenue + metrics.regularRevenue,
        productRevenue: summary.productRevenue + metrics.productRevenue,
      }), { cashIn: 0, regularRevenue: 0, productRevenue: 0 });
    return [
      ["Transaksi selesai", reportCompleted.length],
      ["Pending", reportPending.length],
      ["Kas masuk", formatMoney(reportTotals.cashIn)],
      ["Pendapatan reguler", formatMoney(reportTotals.regularRevenue)],
      ["Pendapatan produk", formatMoney(reportTotals.productRevenue)],
    ];
  }
  if (page === "regular-report") return [["Transaksi reguler", rows.length], ["Total reguler", formatMoney(totalReguler)], ["Rata-rata", formatMoney(Math.round(totalReguler / Math.max(1, rows.length)))], ["Cabang", new Set(rows.map((r) => r.cells[4])).size]];
  if (page === "revenue-report") {
    const cashTransactions = salesTransactions.filter((transaction) => transactionMatchesReportFilters(transaction, page));
    const getCashReceived = (transaction) => Math.max(0, Number(transaction.amount) || 0);
    return [
      ["Kas masuk", formatMoney(cashTransactions.reduce((sum, transaction) => sum + getCashReceived(transaction), 0))],
      ["Tunai", formatMoney(cashTransactions.filter((transaction) => transaction.payment === "Tunai").reduce((sum, transaction) => sum + getCashReceived(transaction), 0))],
      ["QRIS", formatMoney(cashTransactions.filter((transaction) => transaction.payment === "QRIS").reduce((sum, transaction) => sum + getCashReceived(transaction), 0))],
      ["DP tercatat", formatMoney(cashTransactions.reduce((sum, transaction) => sum + Math.max(0, Number(transaction.dp) || 0), 0))],
    ];
  }
  if (page === "expense-report") {
    const expenses = cashierOperationalExpenses.filter(expenseMatchesReportFilters);
    return [
      ["Total pengeluaran", formatMoney(expenses.reduce((sum, expense) => sum + Math.max(0, Number(expense.amount) || 0), 0))],
      ["Jumlah catatan", expenses.length],
    ];
  }
  if (page === "stock-report" || page === "products-stock") {
    const products = getCmsProducts();
    return [["Produk", products.length], ["Total stok", products.reduce((sum, product) => sum + product.stock, 0)], ["Stok rendah", products.filter((product) => product.stock <= product.minimum).length], ["Nilai stok", formatMoney(products.reduce((sum, product) => sum + product.cost * product.stock, 0))]];
  }
  if (page === "members") return [["Pelanggan member", rows.length], ["Paket aktif", customers.reduce((sum, customer) => sum + getCustomerRewards(customer).length, 0)], ["Kuota tersisa", customers.flatMap(getCustomerRewards).reduce((sum, reward) => sum + reward.progress, 0)], ["Kunjungan member", customers.filter((c) => getCustomerRewards(c).length).reduce((sum, c) => sum + c.totalVisits, 0)]];
  if (page === "reminders") {
    const reminders = getCustomerReminderRecords()
      .filter((reminder, index) => cmsListRecordMatchesFilters(page, reminder, index));
    const contacted = reminders.filter((reminder) => getCmsReminderContactStatus(reminder) === "contacted").length;
    return [["Perlu dihubungi", reminders.length], ["Reguler", reminders.filter((reminder) => reminder.type === "Reguler").length], ["Member", reminders.filter((reminder) => reminder.type === "Member").length], ["Sudah dihubungi", contacted]];
  }
  if (page === "commission-report") {
    const report = getCmsCommissionReport();
    return [["Total komisi", formatMoney(report.reduce((sum, row) => sum + row.commission, 0))], ["Petugas", new Set(report.map((row) => row.staffId)).size], ["Transaksi", new Set(report.flatMap((row) => [...row.transactions])).size], ["Cabang transaksi", new Set(report.map((row) => row.transactionBranch)).size]];
  }
  return [];
}

function renderCmsSummary(summary, className = "") {
  if (!summary.length) return "";
  return `<div class="cms-dashboard-grid cms-summary-grid${className ? ` ${className}` : ""}">${summary.map(([label, value]) => `<div class="cms-card"><h4>${label}</h4><strong>${value}</strong></div>`).join("")}</div>`;
}

function renderCmsReportFilters(page) {
  const prefix = page === "sales-report" ? "sales" : page === "regular-report" ? "regular" : page === "revenue-report" ? "revenue" : page === "expense-report" ? "expense" : "stock";
  const isOpen = cmsFilterPanelOpen;
  const activeCount = getActiveFilterCount(page);
  let filterBody = "";
  if (page === "stock-report") {
    const products = getCmsProducts();
    const categories = [...new Set(products.map((p) => p.category))].sort();
    const suppliers = [...new Set(products.map((p) => p.supplier))].sort();
    filterBody = `
      <label class="cms-inline-filter">
        <span>Kategori</span>
        <select id="stock-category-filter">
          <option value="">Semua</option>
          ${categories.map((c) => `<option value="${c}" ${stockReportCategory === c ? "selected" : ""}>${c}</option>`).join("")}
        </select>
      </label>
      <label class="cms-inline-filter">
        <span>Supplier</span>
        <select id="stock-supplier-filter">
          <option value="">Semua</option>
          ${suppliers.map((s) => `<option value="${s}" ${stockReportSupplier === s ? "selected" : ""}>${s}</option>`).join("")}
        </select>
      </label>
      <label class="cms-inline-filter">
        <span>Status Stok</span>
        <select id="stock-status-filter">
          <option value="">Semua</option>
          <option value="low" ${stockReportStockStatus === "low" ? "selected" : ""}>Stok Rendah</option>
          <option value="normal" ${stockReportStockStatus === "normal" ? "selected" : ""}>Tersedia</option>
        </select>
      </label>`;
  } else {
    const dateFrom = page === "sales-report" ? salesReportDateFrom : page === "regular-report" ? regularReportDateFrom : page === "revenue-report" ? revenueReportDateFrom : expenseReportDateFrom;
    const dateTo = page === "sales-report" ? salesReportDateTo : page === "regular-report" ? regularReportDateTo : page === "revenue-report" ? revenueReportDateTo : expenseReportDateTo;
    const branch = page === "sales-report" ? salesReportBranch : page === "regular-report" ? regularReportBranch : page === "revenue-report" ? revenueReportBranch : expenseReportBranch;
    filterBody = `
      <label class="cms-inline-filter">
        <span>Dari</span>
        <input id="${prefix}-date-from" type="date" value="${dateFrom}" max="${dateTo || ""}" />
      </label>
      <label class="cms-inline-filter">
        <span>Sampai</span>
        <input id="${prefix}-date-to" type="date" value="${dateTo}" min="${dateFrom || ""}" />
      </label>
      <label class="cms-inline-filter">
        <span>Cabang</span>
        <select id="${prefix}-branch-filter">
          <option value="">Semua</option>
          ${salonBranches.map((b) => `<option value="${b.name}" ${branch === b.name ? "selected" : ""}>${b.name}</option>`).join("")}
        </select>
      </label>`;
  }
  return `
    <div class="cms-filter-wrapper">
      <button class="cms-filter-toggle" type="button" data-cms-action="toggle-filter-panel">
        <span class="cms-filter-toggle-icon" aria-hidden="true">${cmsActionIcon("filter")}</span>
        <span>Filter</span>${activeCount ? ` <span class="cms-filter-badge">${activeCount}</span>` : ""}
      </button>
      <div class="cms-filter-panel${isOpen ? " is-open" : ""}">
        <div class="cms-filter-panel-body">
          ${filterBody}
        </div>
        <div class="cms-filter-panel-footer">
          <button class="cms-filter-panel-reset" type="button" data-cms-action="reset-${prefix}-filters">Reset</button>
          <button class="cms-filter-panel-close" type="button" data-cms-action="toggle-filter-panel">Tutup</button>
        </div>
      </div>
    </div>`;
}

function renderCmsListFilters(page) {
  const definitions = getCmsListFilterDefinitions(page);
  if (!definitions.length) return "";
  const values = getCmsListFilterValues(page);
  const activeCount = Object.values(values).filter(Boolean).length;
  const filterBody = definitions.map((definition) => {
    const value = values[definition.key] || "";
    if (definition.type === "date") {
      const min = definition.key === "dateTo" ? values.dateFrom || "" : "";
      const max = definition.key === "dateFrom" ? values.dateTo || "" : "";
      return `
        <label class="cms-inline-filter">
          <span>${definition.label}</span>
          <input
            id="cms-${page}-${definition.key}-filter"
            type="date"
            value="${value}"
            min="${min}"
            max="${max}"
            data-cms-list-filter="${definition.key}"
            data-cms-filter-page="${page}"
          />
        </label>`;
    }
    return `
      <label class="cms-inline-filter">
        <span>${definition.label}</span>
        <select
          id="cms-${page}-${definition.key}-filter"
          data-cms-list-filter="${definition.key}"
          data-cms-filter-page="${page}"
        >
          <option value="">Semua</option>
          ${definition.options.map((option) => `<option value="${cmsEscape(option.value)}" ${value === option.value ? "selected" : ""}>${cmsEscape(option.label)}</option>`).join("")}
        </select>
      </label>`;
  }).join("");

  return `
    <div class="cms-filter-wrapper">
      <button class="cms-filter-toggle" type="button" data-cms-action="toggle-filter-panel">
        <span class="cms-filter-toggle-icon" aria-hidden="true">${cmsActionIcon("filter")}</span>
        <span>Filter</span>${activeCount ? ` <span class="cms-filter-badge">${activeCount}</span>` : ""}
      </button>
      <div class="cms-filter-panel${cmsFilterPanelOpen ? " is-open" : ""}">
        <div class="cms-filter-panel-body">
          ${filterBody}
        </div>
        <div class="cms-filter-panel-footer">
          <button class="cms-filter-panel-reset" type="button" data-cms-action="reset-list-filters" data-cms-id="${page}">Reset</button>
          <button class="cms-filter-panel-close" type="button" data-cms-action="toggle-filter-panel">Tutup</button>
        </div>
      </div>
    </div>`;
}

function updateCmsListFilter(control) {
  const page = control.dataset.cmsFilterPage;
  const key = control.dataset.cmsListFilter;
  if (!page || !key) return;
  if (!cmsListFilters[page]) cmsListFilters[page] = {};
  cmsListFilters[page][key] = control.value;
  if (key === "dateFrom" && cmsListFilters[page].dateTo && control.value > cmsListFilters[page].dateTo) {
    cmsListFilters[page].dateTo = control.value;
  }
  if (key === "dateTo" && cmsListFilters[page].dateFrom && control.value < cmsListFilters[page].dateFrom) {
    cmsListFilters[page].dateFrom = control.value;
  }
  cmsPageNumbers[page] = 1;
  cmsViewMode = "list";
  renderCmsCurrentView();
}

function getActiveFilterCount(page) {
  if (page === "stock-report") {
    return [stockReportCategory, stockReportSupplier, stockReportStockStatus].filter(Boolean).length;
  }
  if (page === "sales-report") return [salesReportDateFrom, salesReportDateTo, salesReportBranch].filter(Boolean).length;
  if (page === "regular-report") return [regularReportDateFrom, regularReportDateTo, regularReportBranch].filter(Boolean).length;
  if (page === "revenue-report") return [revenueReportDateFrom, revenueReportDateTo, revenueReportBranch].filter(Boolean).length;
  if (page === "expense-report") return [expenseReportDateFrom, expenseReportDateTo, expenseReportBranch].filter(Boolean).length;
  return 0;
}

function updateReportFilter(control) {
  const id = control.id;
  const value = control.value;
  if (id === "sales-date-from") salesReportDateFrom = value;
  if (id === "sales-date-to") salesReportDateTo = value;
  if (id === "sales-branch-filter") salesReportBranch = value;
  if (id === "regular-date-from") regularReportDateFrom = value;
  if (id === "regular-date-to") regularReportDateTo = value;
  if (id === "regular-branch-filter") regularReportBranch = value;
  if (id === "revenue-date-from") revenueReportDateFrom = value;
  if (id === "revenue-date-to") revenueReportDateTo = value;
  if (id === "revenue-branch-filter") revenueReportBranch = value;
  if (id === "expense-date-from") expenseReportDateFrom = value;
  if (id === "expense-date-to") expenseReportDateTo = value;
  if (id === "expense-branch-filter") expenseReportBranch = value;
  if (id === "stock-category-filter") stockReportCategory = value;
  if (id === "stock-supplier-filter") stockReportSupplier = value;
  if (id === "stock-status-filter") stockReportStockStatus = value;
  cmsPageNumbers[activeCmsPage] = 1;
  cmsViewMode = "list";
  renderCmsCurrentView();
}

function transactionMatchesReportFilters(transaction, page) {
  if (page !== "sales-report" && transaction.status === "Pending") return false;
  const date = transaction.dateRaw || "";
  const branch = getTransactionBranch(transaction);
  if (page === "sales-report") {
    if (salesReportDateFrom && date < salesReportDateFrom) return false;
    if (salesReportDateTo && date > salesReportDateTo) return false;
    if (salesReportBranch && branch !== salesReportBranch) return false;
  } else if (page === "regular-report") {
    if (regularReportDateFrom && date < regularReportDateFrom) return false;
    if (regularReportDateTo && date > regularReportDateTo) return false;
    if (regularReportBranch && branch !== regularReportBranch) return false;
  } else if (page === "revenue-report") {
    if (revenueReportDateFrom && date < revenueReportDateFrom) return false;
    if (revenueReportDateTo && date > revenueReportDateTo) return false;
    if (revenueReportBranch && branch !== revenueReportBranch) return false;
  }
  return true;
}

function expenseMatchesReportFilters(expense) {
  const date = expense.dateRaw || "";
  if (expenseReportDateFrom && date < expenseReportDateFrom) return false;
  if (expenseReportDateTo && date > expenseReportDateTo) return false;
  if (expenseReportBranch && expense.branch !== expenseReportBranch) return false;
  return true;
}

function formatCmsExpenseDate(dateRaw) {
  if (!dateRaw) return "—";
  return new Date(`${dateRaw}T00:00:00`).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function renderCmsCommissionFilters() {
  ensureCommissionReportFilters();
  return `
    <section class="cms-report-filters" aria-label="Filter laporan komisi">
      <div class="cms-report-filter-copy">
        <strong>Periode Laporan</strong>
        <span>Pilih rentang tanggal, jam, dan cabang tempat transaksi berlangsung.</span>
      </div>
      <label class="cms-report-filter">
        <span>Dari Tanggal</span>
        <input id="commission-date-from" type="date" value="${commissionReportDateFrom}" max="${commissionReportDateTo || ""}" />
      </label>
      <label class="cms-report-filter">
        <span>Sampai Tanggal</span>
        <input id="commission-date-to" type="date" value="${commissionReportDateTo}" min="${commissionReportDateFrom || ""}" />
      </label>
      <label class="cms-report-filter">
        <span>Dari Jam</span>
        <input id="commission-time-from" type="time" value="${commissionReportTimeFrom}" max="${commissionReportTimeTo || ""}" />
      </label>
      <label class="cms-report-filter">
        <span>Sampai Jam</span>
        <input id="commission-time-to" type="time" value="${commissionReportTimeTo}" min="${commissionReportTimeFrom || ""}" />
      </label>
      <label class="cms-report-filter cms-report-branch-filter">
        <span>Cabang Transaksi</span>
        <select id="commission-branch-filter">
          <option value="">Semua Cabang</option>
          ${salonBranches.map((branch) => `<option value="${branch.name}" ${commissionReportBranch === branch.name ? "selected" : ""}>${branch.name}</option>`).join("")}
        </select>
      </label>
      <button class="cms-secondary-button" type="button" data-cms-action="reset-commission-filters">Reset</button>
    </section>`;
}

function renderCmsRowActions(page, row) {
  let actions = cmsActionButton("detail", row.id, "Lihat detail", "view");
  if (CMS_EDITABLE_PAGES.has(page)) {
    actions += cmsActionButton("edit", row.id, "Edit", "edit");
    actions += cmsActionButton("delete", row.id, "Hapus", "trash", "danger");
  }
  if (page === "pending") actions += cmsActionButton("open-pos", row.id, "Buka di POS", "arrow", "primary");
  if (page === "reminders") actions += cmsActionButton("whatsapp", row.id, "Hubungi WhatsApp", "whatsapp", "success");
  if (["sales", "sales-report", "revenue-report"].includes(page)) actions += cmsActionButton("print", row.id, "Cetak nota", "print");
  return `<div class="cms-row-actions">${actions}</div>`;
}

function cmsEscapeSpreadsheetXml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function cmsSpreadsheetBytes(parts) {
  const totalLength = parts.reduce((sum, part) => sum + part.length, 0);
  const bytes = new Uint8Array(totalLength);
  let offset = 0;
  parts.forEach((part) => {
    bytes.set(part, offset);
    offset += part.length;
  });
  return bytes;
}

function cmsSpreadsheetUint16(value) {
  const bytes = new Uint8Array(2);
  new DataView(bytes.buffer).setUint16(0, value, true);
  return bytes;
}

function cmsSpreadsheetUint32(value) {
  const bytes = new Uint8Array(4);
  new DataView(bytes.buffer).setUint32(0, value >>> 0, true);
  return bytes;
}

function cmsSpreadsheetCrc32(bytes) {
  let crc = 0xffffffff;
  bytes.forEach((byte) => {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
    }
  });
  return (crc ^ 0xffffffff) >>> 0;
}

function cmsCreateSpreadsheetArchive(files) {
  const encoder = new TextEncoder();
  const now = new Date();
  const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2);
  const dosDate = ((Math.max(1980, now.getFullYear()) - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
  const localParts = [];
  const centralParts = [];
  let localOffset = 0;

  files.forEach(([filename, content]) => {
    const nameBytes = encoder.encode(filename);
    const contentBytes = encoder.encode(content);
    const crc = cmsSpreadsheetCrc32(contentBytes);
    const localHeader = cmsSpreadsheetBytes([
      cmsSpreadsheetUint32(0x04034b50),
      cmsSpreadsheetUint16(20),
      cmsSpreadsheetUint16(0x0800),
      cmsSpreadsheetUint16(0),
      cmsSpreadsheetUint16(dosTime),
      cmsSpreadsheetUint16(dosDate),
      cmsSpreadsheetUint32(crc),
      cmsSpreadsheetUint32(contentBytes.length),
      cmsSpreadsheetUint32(contentBytes.length),
      cmsSpreadsheetUint16(nameBytes.length),
      cmsSpreadsheetUint16(0),
      nameBytes,
    ]);
    const localEntry = cmsSpreadsheetBytes([localHeader, contentBytes]);
    localParts.push(localEntry);

    centralParts.push(cmsSpreadsheetBytes([
      cmsSpreadsheetUint32(0x02014b50),
      cmsSpreadsheetUint16(20),
      cmsSpreadsheetUint16(20),
      cmsSpreadsheetUint16(0x0800),
      cmsSpreadsheetUint16(0),
      cmsSpreadsheetUint16(dosTime),
      cmsSpreadsheetUint16(dosDate),
      cmsSpreadsheetUint32(crc),
      cmsSpreadsheetUint32(contentBytes.length),
      cmsSpreadsheetUint32(contentBytes.length),
      cmsSpreadsheetUint16(nameBytes.length),
      cmsSpreadsheetUint16(0),
      cmsSpreadsheetUint16(0),
      cmsSpreadsheetUint16(0),
      cmsSpreadsheetUint16(0),
      cmsSpreadsheetUint32(0),
      cmsSpreadsheetUint32(localOffset),
      nameBytes,
    ]));
    localOffset += localEntry.length;
  });

  const localData = cmsSpreadsheetBytes(localParts);
  const centralDirectory = cmsSpreadsheetBytes(centralParts);
  const endRecord = cmsSpreadsheetBytes([
    cmsSpreadsheetUint32(0x06054b50),
    cmsSpreadsheetUint16(0),
    cmsSpreadsheetUint16(0),
    cmsSpreadsheetUint16(files.length),
    cmsSpreadsheetUint16(files.length),
    cmsSpreadsheetUint32(centralDirectory.length),
    cmsSpreadsheetUint32(localData.length),
    cmsSpreadsheetUint16(0),
  ]);
  return cmsSpreadsheetBytes([localData, centralDirectory, endRecord]);
}

function exportCmsRemindersExcel() {
  const query = cmsSearchTerm.trim().toLowerCase();
  const reminderRows = getCmsPageRows("reminders");
  const filteredRows = query
    ? reminderRows.filter((row) => row.search.toLowerCase().includes(query))
    : reminderRows;
  const reminders = filteredRows
    .map((row) => getCustomerReminderRecords().find((reminder) => reminder.id === row.id))
    .filter(Boolean);

  if (!reminders.length) {
    showToast("Tidak ada data reminder untuk diekspor");
    return;
  }

  const headers = [
    "Pelanggan",
    "Nomor HP",
    "Tipe Reminder",
    "Sumber Reminder",
    "Pola Reminder",
    "Aktivitas Terakhir",
    "Cabang",
    "Jadwal Reminder",
    "Status Kontak",
  ];
  const records = reminders.map((reminder) => [
    reminder.customer,
    reminder.phone,
    reminder.type,
    reminder.source,
    reminder.scheduleLabel,
    `${reminder.anchorLabel}: ${reminder.anchorDate}`,
    reminder.branch || "—",
    reminder.dueDate,
    getCmsReminderContactStatus(reminder) === "contacted" ? "Sudah dihubungi" : "Belum dihubungi",
  ]);
  const spreadsheetRows = [headers, ...records].map((cells, rowIndex) => {
    const rowNumber = rowIndex + 1;
    const cellXml = cells.map((cell, columnIndex) => {
      const reference = `${String.fromCharCode(65 + columnIndex)}${rowNumber}`;
      return `<c r="${reference}" t="inlineStr"${rowIndex === 0 ? ' s="1"' : ""}><is><t xml:space="preserve">${cmsEscapeSpreadsheetXml(cell)}</t></is></c>`;
    }).join("");
    return `<row r="${rowNumber}">${cellXml}</row>`;
  }).join("");
  const lastRow = records.length + 1;
  const spreadsheetFiles = [
    ["[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`],
    ["_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`],
    ["xl/workbook.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="Reminder Pelanggan" sheetId="1" r:id="rId1"/></sheets>
</workbook>`],
    ["xl/_rels/workbook.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`],
    ["xl/styles.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><sz val="11"/><name val="Calibri"/></font>
    <font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Calibri"/></font>
  </fonts>
  <fills count="3">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFE0A11A"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="2">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`],
    ["xl/worksheets/sheet1.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <dimension ref="A1:I${lastRow}"/>
  <sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
  <sheetFormatPr defaultRowHeight="15"/>
  <cols>
    <col min="1" max="1" width="24" customWidth="1"/>
    <col min="2" max="2" width="18" customWidth="1"/>
    <col min="3" max="6" width="25" customWidth="1"/>
    <col min="7" max="9" width="20" customWidth="1"/>
  </cols>
  <sheetData>${spreadsheetRows}</sheetData>
  <autoFilter ref="A1:I${lastRow}"/>
</worksheet>`],
  ];
  const workbook = cmsCreateSpreadsheetArchive(spreadsheetFiles);
  const now = new Date();
  const dateStamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const blob = new Blob([workbook], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = URL.createObjectURL(blob);
  const download = document.createElement("a");
  download.href = url;
  download.download = `reminder-pelanggan-${dateStamp}.xlsx`;
  document.body.append(download);
  download.click();
  download.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
  showToast(`${reminders.length} reminder berhasil diekspor`);
}

function renderCmsListPage(page) {
  const meta = getCmsPageMeta(page);
  const allRows = getCmsPageRows(page);
  const query = cmsSearchTerm.trim().toLowerCase();
  const rows = query ? allRows.filter((row) => row.search.toLowerCase().includes(query)) : allRows;
  const totalPages = Math.max(1, Math.ceil(rows.length / cmsRowsPerPage));
  const currentPage = Math.min(Math.max(1, cmsPageNumbers[page] || 1), totalPages);
  cmsPageNumbers[page] = currentPage;
  const pageStart = (currentPage - 1) * cmsRowsPerPage;
  const visibleRows = rows.slice(pageStart, pageStart + cmsRowsPerPage);
  const summary = getCmsSummary(page, allRows);
  const pagination = Array.from({ length: totalPages }, (_, index) => index + 1)
    .map((pageNumber) => `<button class="${pageNumber === currentPage ? "active" : ""}" type="button" data-cms-action="paginate" data-cms-id="${pageNumber}" aria-label="Halaman ${pageNumber}">${pageNumber}</button>`)
    .join("");
  return `
    <section class="cms-page-head">
      <div><h3>${CMS_PAGE_LABELS[page]}</h3><p>${meta.subtitle}</p></div>
      ${meta.add || page === "reminders" ? `<div class="cms-page-head-actions">
        ${page === "reminders" ? `<button class="cms-secondary-button" type="button" data-cms-action="export-reminders-excel">${cmsActionIcon("download")} Export Excel</button>` : ""}
        ${meta.add ? `<button class="cms-primary-button" type="button" data-cms-action="add">+ ${meta.add}</button>` : ""}
      </div>` : ""}
    </section>
    ${page === "commission-report" ? renderCmsCommissionFilters() : ""}
    ${renderCmsSummary(summary, page === "sales-report" ? "cms-sales-report-summary" : "")}
    <section class="cms-data-panel">
      <div class="cms-list-toolbar">
        <div class="cms-list-meta"><strong>${CMS_PAGE_LABELS[page]}</strong><span>${allRows.length} data tersimpan</span></div>
        <div class="cms-toolbar-actions">
          ${["sales-report", "regular-report", "revenue-report", "expense-report", "stock-report"].includes(page) ? renderCmsReportFilters(page) : renderCmsListFilters(page)}
          <label class="cms-search"><span aria-hidden="true">⌕</span><input id="cms-search-input" type="search" value="${cmsSearchTerm}" placeholder="${meta.search}" autocomplete="off" /></label>
        </div>
      </div>
      <div class="cms-table-scroll">
        <table class="cms-table">
          <thead><tr>${meta.headers.map((header) => `<th>${header}</th>`).join("")}<th>Aksi</th></tr></thead>
          <tbody>
            ${visibleRows.length ? visibleRows.map((row) => `<tr>${row.cells.map((cell) => `<td>${cell}</td>`).join("")}<td>${renderCmsRowActions(page, row)}</td></tr>`).join("") : `<tr><td colspan="${meta.headers.length + 1}" class="cms-empty-cell">Data tidak ditemukan.</td></tr>`}
          </tbody>
        </table>
      </div>
      <div class="cms-table-footer">
        <span>Menampilkan ${rows.length ? pageStart + 1 : 0}-${Math.min(pageStart + cmsRowsPerPage, rows.length)} dari ${rows.length} data</span>
        <div class="cms-pagination">
          <button type="button" data-cms-action="paginate" data-cms-id="${Math.max(1, currentPage - 1)}" ${currentPage === 1 ? "disabled" : ""} aria-label="Halaman sebelumnya">‹</button>
          ${pagination}
          <button type="button" data-cms-action="paginate" data-cms-id="${Math.min(totalPages, currentPage + 1)}" ${currentPage === totalPages ? "disabled" : ""} aria-label="Halaman berikutnya">›</button>
        </div>
      </div>
    </section>`;
}

function getCmsRecord(page, id) {
  if (page === "reminders") return getCustomerReminderRecords().find((item) => item.id === id);
  if (page === "customers" || page === "members") return customers.find((item) => item.id === id);
  if (page === "services" || page === "service-activities") return getCmsServices().find((item) => item.id === id);
  if (page === "products-stock" || page === "stock-report") return getCmsProducts().find((item) => item.id === id);
  if (page === "membership-plans") return membershipPlans.find((item) => item.id === id);
  if (page === "promotions") return CMS_PROMOTIONS.find((item) => item.id === id);
  if (page === "staff" || page === "staff-commission") return getCmsStaff().find((item) => item.id === id);
  if (["sales", "pending", "sales-report", "regular-report", "revenue-report"].includes(page)) return salesTransactions.find((item) => item.id === id);
  if (page === "expense-report") return cashierOperationalExpenses.find((item) => item.id === id);
  if (page === "commission-report") return getCmsCommissionReport().find((item) => item.id === id);
  if (page === "member-visits") return getCmsMemberVisits().find((item) => item.id === id);
  if (page === "users-access") return CMS_USERS.find((item) => item.id === id);
  return null;
}

function getCmsMembershipBonusCatalog(type) {
  return items.filter((item) => item.type === (type === "service" ? "service" : "product"));
}

function prepareCmsServiceUpgradeDraft(record) {
  cmsServiceUpgradeDraft = [...(record?.upgradeServiceIds || [])];
}

function getCmsServiceUpgradeNames(service) {
  return (service?.upgradeServiceIds || [])
    .map((id) => items.find((item) => item.type === "service" && item.id === id)?.name)
    .filter(Boolean);
}

function getCmsServicePromotionLabel(service) {
  const fixed = getServiceFixedDiscountRate(service);
  const flexible = getServiceFlexibleDiscountRate(service);
  if (!fixed && !flexible) return "—";
  return `${fixed ? `${fixed}% pasti` : ""}${flexible ? `${fixed ? " + " : ""}${flexible}% fleksibel` : ""}`;
}

function renderCmsServiceUpgradeSection(record) {
  const choices = getCmsServices().filter((service) => service.id !== record?.id);
  return `
    <section class="cms-service-upgrade-section">
      <div class="cms-service-upgrade-copy"><strong>Opsi Upgrade Treatment</strong><span>Centang treatment tujuan yang dapat dipilih saat pelanggan memakai kuota member dan membayar selisih harga.</span></div>
      <div class="cms-service-upgrade-grid">
        ${choices.map((service) => `<label class="cms-service-upgrade-option"><input type="checkbox" value="${cmsEscape(service.id)}" data-service-upgrade-id="${cmsEscape(service.id)}" ${cmsServiceUpgradeDraft.includes(service.id) ? "checked" : ""} /><span><strong>${cmsEscape(service.name)}</strong><small>${formatMoney(service.price)}</small></span></label>`).join("")}
      </div>
    </section>`;
}

function prepareCmsMembershipBonusDraft(record) {
  cmsMembershipBonusDraft = cloneMembershipBonuses(record?.bonuses);
}

function getCmsMembershipTarget() {
  const target = document.querySelector('#cms-record-form [data-field-key="target"]');
  return Math.max(0, cmsNumber(target?.value || 0));
}

function renderCmsMembershipBonusEditor() {
  const editor = document.querySelector("#cms-membership-bonus-editor");
  if (editor) editor.innerHTML = renderCmsMembershipBonusEditorContent(getCmsMembershipTarget());
}

function renderCmsMembershipBonusEditorContent(target) {
  const isEligible = target >= 10;
  const rows = cmsMembershipBonusDraft.map((bonus, index) => {
    const type = bonus.type === "service" ? "service" : "product";
    const catalog = getCmsMembershipBonusCatalog(type);
    return `
      <div class="cms-membership-bonus-row">
        <label class="cms-field">
          <span>Jenis Bonus</span>
          <select data-membership-bonus-type="${index}" ${isEligible ? "" : "disabled"}>
            <option value="product" ${type === "product" ? "selected" : ""}>Produk</option>
            <option value="service" ${type === "service" ? "selected" : ""}>Treatment</option>
          </select>
        </label>
        <label class="cms-field">
          <span>${type === "service" ? "Treatment Bonus" : "Produk Bonus"}</span>
          <select data-membership-bonus-item="${index}" ${isEligible ? "" : "disabled"}>
            ${catalog.map((item) => `<option value="${cmsEscape(item.id)}" ${item.id === bonus.itemId ? "selected" : ""}>${cmsEscape(item.name)}</option>`).join("")}
          </select>
        </label>
        <label class="cms-field cms-membership-bonus-qty">
          <span>Jumlah</span>
          <input type="number" min="1" value="${Math.max(1, Number(bonus.qty) || 1)}" data-membership-bonus-qty="${index}" ${isEligible ? "" : "disabled"} />
        </label>
        <button class="cms-icon-button danger cms-membership-bonus-remove" type="button" data-cms-action="remove-membership-bonus" data-cms-id="${index}" title="Hapus bonus" aria-label="Hapus bonus" ${isEligible ? "" : "disabled"}>${cmsActionIcon("trash")}</button>
      </div>`;
  }).join("");

  return `
    <div class="cms-membership-bonus-copy">
      <div><strong>Bonus Paket</strong><span>Opsional untuk paket dengan kuota 10x atau lebih. Bonus dapat berupa produk, treatment, atau keduanya.</span></div>
      <button class="cms-secondary-button" type="button" data-cms-action="add-membership-bonus" ${isEligible ? "" : "disabled"}>+ Tambah Bonus</button>
    </div>
    ${isEligible
      ? rows || '<div class="cms-membership-bonus-empty">Belum ada bonus. Klik <strong>+ Tambah Bonus</strong> untuk menambah produk atau treatment.</div>'
      : '<div class="cms-membership-bonus-empty warning">Ubah Jumlah Kuota menjadi minimal 10 agar opsi bonus aktif.</div>'}`;
}

function renderCmsMembershipBonusSection(record) {
  return `<section class="cms-membership-bonus-section" id="cms-membership-bonus-editor">${renderCmsMembershipBonusEditorContent(record?.target || 6)}</section>`;
}

function getCmsInternalTransactionNote(record) {
  const note = String(record?.note || "").trim();
  return note ? cmsEscape(note).replaceAll("\n", "<br>") : "—";
}

function cmsDetailFields(page, record) {
  if (!record) return [];
  if (page === "reminders") return [["Pelanggan", record.customer], ["Nomor HP", record.phone], ["Tipe Reminder", record.type], ["Sumber Reminder", record.source], ["Pola Reminder", record.scheduleLabel], [record.anchorLabel, record.anchorDate], ["Cabang", record.branch || "—"], ["Jadwal Reminder", record.dueDate], ["Status Kontak", getCmsReminderContactStatus(record) === "contacted" ? "Sudah dihubungi" : "Belum dihubungi"]];
  if (["customers", "members"].includes(page)) return [["Kode Pelanggan", record.code], ["Nama Pelanggan", record.name], ["Nomor HP", record.phone], ["Status", record.status], ["Sering Berkunjung", getCustomerFrequentBranch(record) || "—"], ["Cabang Membership", getCustomerMembershipBranches(record).join(" · ") || "—"], ["Total Kunjungan", `${record.totalVisits} kali`], ["Kunjungan Terakhir", record.lastVisit], ["Terakhir Berkunjung", getCustomerLastVisitBranch(record) || "—"], ["Jasa Terakhir", record.lastService || "—"], ["DP Tersimpan", formatMoney(record.dp || 0)]];
  if (["services", "service-activities"].includes(page)) return [["Kode Jasa", record.code], ["Nama Jasa", record.name], ["Kategori", record.category], ["Harga Normal", formatMoney(record.price)], ["Promo Treatment", getCmsServicePromotionLabel(record)], ["Opsi Upgrade", getCmsServiceUpgradeNames(record).join(" · ") || "—"], ["Aktivitas", record.actions.join(" → ")], ["Reminder Reguler", `${getServiceReminderDays(record)} hari setelah kunjungan`], ["Status", record.status]];
  if (["products-stock", "stock-report"].includes(page)) return [["Kode Produk", record.code], ["Nama Produk", record.name], ["Kategori", record.category], ["Supplier", record.supplier], ["Harga Pokok", formatMoney(record.cost)], ["Harga Jual", formatMoney(record.price)], ["Stok", `${record.stock} ${record.unit}`], ["Stok Minimum", `${record.minimum} ${record.unit}`]];
  if (page === "membership-plans") return [["Nama Paket", record.name], ["Jasa", record.serviceName], ["Jumlah Kuota", `${record.target} kali`], ["Bonus Paket", getMembershipBonusSummary(record.bonuses) || "—"], ["Harga Paket", formatMoney(record.price)], ["Harga per Kuota", formatMoney(Math.round(record.price / record.target))], ["Reminder Member", `Rutin setiap ${getMembershipReminderDays(record)} hari`], ["Status", record.status || "Aktif"]];
  if (page === "promotions") return [["Nama Program", record.name], ["Nilai Diskon", record.value], ["Berlaku Untuk", record.scope], ["Bisa Digabung", record.combinable], ["Status", record.status]];
  if (["staff", "staff-commission"].includes(page)) return [["Kode Petugas", record.id], ["Nama Petugas", record.name], ["Nomor HP", record.phone], ["Cabang Petugas", record.branch], ["Status", record.status]];
  if (page === "commission-report") return [["Petugas", record.staff], ["Cabang Petugas", record.staffBranch], ["Cabang Transaksi", record.transactionBranch], ["Transaksi Selesai", record.transactionCount], ["Nilai Jasa", formatMoney(record.serviceValue)], ["Rata-rata Tarif", `${record.averageRate.toFixed(1).replace(".0", "")}%`], ["Total Komisi", formatMoney(record.commission)]];
  if (page === "users-access") return [["ID Pengguna", record.id], ["Nama", record.name], ["Username", record.username], ["Peran", record.role], ["Hak Akses", record.access], ["Status", record.status]];
  if (page === "member-visits") return [["Pelanggan", record.customer], ["Nomor HP", record.phone], ["Membership", record.service], ["Cabang Membership", record.branch], ["Waktu Pemakaian", record.dateTime], ["Kuota Dipakai", record.qty], ["Status", "Terpakai"]];
  if (page === "sales-report") {
    const unitPrice = getTransactionMemberUnitPrice(record);
    return [
      ["No. Nota", record.id],
      ["Tanggal / Waktu", `${record.date} · ${record.time}`],
      ["Pelanggan", record.customer],
      ["Cabang Transaksi", getTransactionBranch(record)],
      ["Total Transaksi", formatMoney(getCmsTransactionTotalValue(record))],
      ["Status", record.status],
      ["Petugas", record.staff],
      ["Pembayaran", record.payment],
      ["Cabang Membership", getTransactionMemberBranch(record) || "—"],
      ["Harga Satuan", unitPrice ? formatMoney(unitPrice) : "—"],
      ["DP", formatMoney(record.dp || 0)],
      ["Pemakaian Member", formatMoney(getCmsTransactionMemberUsedValue(record))],
      ["Kas Masuk", record.status === "Pending" ? "Belum masuk" : formatMoney(record.amount)],
      ["Catatan Internal", getCmsInternalTransactionNote(record)],
    ];
  }
  if (page === "revenue-report") {
    return [
      ["No. Nota", record.id],
      ["Tanggal / Waktu", `${record.date} · ${record.time}`],
      ["Pelanggan", record.customer],
      ["Cabang Transaksi", getTransactionBranch(record)],
      ["Status", record.status],
      ["Metode Pembayaran", record.payment],
      ["Kas Masuk", formatMoney(Math.max(0, Number(record.amount) || 0))],
      ["DP", formatMoney(record.dp || 0)],
      ["Catatan Internal", getCmsInternalTransactionNote(record)],
    ];
  }
  if (page === "expense-report") return [
    ["Kode Pengeluaran", cmsEscape(record.id)],
    ["Tanggal", formatCmsExpenseDate(record.dateRaw)],
    ["Cabang", cmsEscape(record.branch)],
    ["Nominal", formatMoney(Math.max(0, Number(record.amount) || 0))],
    ["Catatan", cmsEscape(record.note)],
  ];
  if (["sales", "pending", "regular-report"].includes(page)) return [["No. Dokumen", record.id], ["Tanggal", `${record.date} · ${record.time}`], ["Pelanggan", record.customer], ["Petugas Utama", record.staff], ["Cabang Transaksi", getTransactionBranch(record)], ["Pembayaran", record.payment], ["Cabang Membership", getTransactionMemberBranch(record) || "—"], ["Status", record.status], ["DP", formatMoney(record.dp || 0)], ["Pemakaian Member", formatMoney(record.reward || 0)], ["Total", formatMoney(record.amount)], ["Catatan Internal", getCmsInternalTransactionNote(record)]];
  return [];
}

function renderCmsTransactionItems(transaction) {
  if (!transaction?.items) return "";
  return `<section class="cms-detail-section"><h4>Rincian Transaksi</h4><div class="cms-transaction-lines">${transaction.items.map((line) => {
    const actions = line.type === "service" ? getServiceActions(line) : [];
    const memberUsage = line.memberFree || line.memberUpgrade ? `<small>Pemakaian Member · ${line.memberBranch || getTransactionMemberBranch(transaction) || "Cabang belum ditentukan"}</small>` : "";
    const packageBranch = line.type === "member" && line.memberBranch ? `<small>Cabang Membership · ${line.memberBranch}</small>` : "";
    const purchaseType = line.type === "member" && (line.memberPurchaseType || transaction.memberPurchaseType)
      ? `<small>${line.memberPurchaseType || transaction.memberPurchaseType}</small>`
      : "";
    const packageBonus = line.type === "member" && line.bonuses?.length ? `<small>Bonus: ${getMembershipBonusSummary(line.bonuses)}</small>` : "";
    const promotion = line.type === "service" && (line.fixedDiscountRate || line.flexibleDiscountRate) ? `<small>Promo ${line.fixedDiscountRate ? `${line.fixedDiscountRate}% pasti` : ""}${line.flexibleDiscountRate ? ` + ${line.flexibleDiscountRate}% tambahan` : ""}</small>` : "";
    const unitPrice = line.memberUnitPrice || getLineMemberUnitPrice(line);
    const unitPriceLine = unitPrice > 0 ? `<small>Harga Satuan: ${formatMoney(unitPrice)}</small>` : "";
    return `<div class="cms-transaction-line"><div><strong>${line.qty || 1}x ${line.name}</strong>${line.type === "service" ? actions.map((action) => `<small>${action} By : ${line.staff || "Belum dipilih"}</small>`).join("") : line.type === "product" ? `<small>Produk retail</small>` : `<small>Paket membership</small>`}${purchaseType}${unitPriceLine}${promotion}${packageBranch}${packageBonus}${memberUsage}</div><strong>${formatMoney((line.price || 0) * (line.qty || 1))}</strong></div>`;
  }).join("")}</div></section>`;
}

function renderCmsMemberPackages(customer, canAdjustQuota = false) {
  const rewards = getCustomerRewards(customer);
  if (!rewards.length) return "";
  return `<section class="cms-detail-section">
    <h4>Membership Dimiliki</h4>
    ${canAdjustQuota ? '<p class="cms-detail-section-copy">Kurangi kuota secara manual pada paket yang dipilih. Perubahan langsung berlaku pada saldo member.</p>' : ""}
    <div class="cms-package-list">${rewards.map((reward) => {
      const remaining = Math.max(0, Number(reward.progress) || 0);
      const purchasePrice = Math.max(0, Number(reward.purchasePrice) || Number(getRewardPlan(reward)?.price) || 0);
      const rewardId = `${customer.id}::${getRewardId(reward)}`;
      const quotaAction = canAdjustQuota
        ? `<div class="cms-member-quota-actions">
            <b>${remaining}/${reward.target}</b>
            <input type="number" min="1" max="${Math.max(1, remaining)}" value="1" data-cms-member-quota-input="${cmsEscape(rewardId)}" aria-label="Jumlah kuota ${cmsEscape(getRewardName(reward, { withMember: true }))} yang dikurangi" ${remaining ? "" : "disabled"} />
            <button class="cms-secondary-button" type="button" data-cms-action="decrease-member-quota" data-cms-id="${cmsEscape(rewardId)}" ${remaining ? "" : "disabled"}>Kurangi Kuota</button>
          </div>`
        : `<b>${remaining}/${reward.target}</b>`;
      return `<div><span><strong>${getRewardName(reward, { withMember: true })}</strong><small>${getRewardBranch(reward, customer)} · ${remaining} dari ${reward.target} kuota tersisa · Harga paket ${formatMoney(purchasePrice)}</small></span>${quotaAction}</div>`;
    }).join("")}</div>
  </section>`;
}

function formatCommissionReportDate(dateRaw, fallback = "") {
  if (!dateRaw) return fallback || "Tanggal tidak tersedia";
  return new Date(`${dateRaw}T00:00:00`).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function renderCmsCommissionPrintReport(record, sortedDays, periodLabel) {
  const printedAt = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const daySections = sortedDays.map((day) => `
    <section class="cms-commission-print-day">
      <div class="cms-commission-print-day-head">
        <div><strong>${formatCommissionReportDate(day.dateRaw, day.date)}</strong><span>${day.transactions.size} transaksi / ${day.entries.length} komponen</span></div>
        <div><span>Dasar: <b>${formatMoney(Math.round(day.serviceValue))}</b></span><span>Komisi: <b>${formatMoney(Math.round(day.commission))}</b></span></div>
      </div>
      <table>
        <thead><tr><th>Waktu / Nota</th><th>Pelanggan / Treatment</th><th>Komponen</th><th>Harga Satuan</th><th>Dasar</th><th>Tarif</th><th>Komisi</th></tr></thead>
        <tbody>${day.entries.map((entry) => `
          <tr>
            <td><strong>${entry.time}</strong><span>${entry.transactionId}</span></td>
            <td><strong>${entry.customer}</strong><span>${entry.qty}x ${entry.serviceName}</span></td>
            <td><strong>${entry.activityName}</strong><span>Aktivitas</span></td>
            <td>${entry.unitPrice ? formatMoney(Math.round(entry.unitPrice)) : "—"}</td>
            <td>${formatMoney(Math.round(entry.serviceValue))}</td>
            <td>${entry.rate.toFixed(1).replace(".0", "")}%</td>
            <td><strong>${formatMoney(Math.round(entry.commission))}</strong></td>
          </tr>`).join("")}</tbody>
        <tfoot><tr><td colspan="4">Total harian</td><td>${formatMoney(Math.round(day.serviceValue))}</td><td>-</td><td>${formatMoney(Math.round(day.commission))}</td></tr></tfoot>
      </table>
    </section>`).join("");

  return `
    <article class="cms-commission-print-report" aria-hidden="true">
      <header class="cms-commission-print-header">
        <div class="cms-commission-print-brand">
          <img src="assets/images/JMMSALON2Transparant.png" alt="" />
          <div><strong>JMM SALON</strong><span>Professional Hair Salon</span></div>
        </div>
        <div class="cms-commission-print-title"><span>Dokumen Internal</span><h1>Laporan Komisi Petugas</h1><p>Rincian komisi aktivitas jasa</p></div>
      </header>
      <section class="cms-commission-print-meta">
        <dl><div><dt>Nama Petugas</dt><dd>${record.staff}</dd></div><div><dt>Cabang Petugas</dt><dd>${record.staffBranch}</dd></div></dl>
        <dl><div><dt>Periode</dt><dd>${periodLabel.replaceAll("–", "-")}</dd></div><div><dt>Cabang Transaksi</dt><dd>${record.transactionBranch}</dd></div></dl>
      </section>
      <section class="cms-commission-print-summary">
        <div><span>Total Komisi</span><strong>${formatMoney(record.commission)}</strong></div>
        <div><span>Hari Kerja</span><strong>${record.dayCount}</strong></div>
        <div><span>Transaksi</span><strong>${record.transactionCount}</strong></div>
        <div><span>Dasar Komisi</span><strong>${formatMoney(record.serviceValue)}</strong></div>
        <div><span>Rata-rata Tarif</span><strong>${record.averageRate.toFixed(1).replace(".0", "")}%</strong></div>
      </section>
      <section class="cms-commission-print-days">${daySections || "<p>Tidak ada pekerjaan pada periode ini.</p>"}</section>
      <section class="cms-commission-print-signatures">
        <div><span>Disiapkan oleh</span><b>Petugas Administrasi</b></div>
        <div><span>Diperiksa oleh</span><b>Manajer Cabang</b></div>
      </section>
      <footer><span>JMM Salon - Laporan internal</span><span>Dicetak ${printedAt}</span></footer>
    </article>`;
}

function setCmsCommissionDaysExpanded(expanded) {
  document.querySelectorAll(".cms-commission-day").forEach((day) => {
    day.open = expanded;
  });
}

function exportCmsCommissionPdf() {
  const record = getCmsRecord("commission-report", cmsSelectedRecordId);
  if (!record) {
    showToast("Data komisi tidak ditemukan");
    return;
  }
  const previousTitle = document.title;
  const safeStaffName = record.staff.replaceAll(/[\\/:*?"<>|]/g, " ");
  document.title = `Laporan Komisi ${safeStaffName}`.trim();
  const restoreTitle = () => {
    document.title = previousTitle;
    window.removeEventListener("afterprint", restoreTitle);
  };
  window.addEventListener("afterprint", restoreTitle);
  window.print();
  window.setTimeout(restoreTitle, 60000);
}

function renderCmsCommissionDetail(record) {
  if (!record) return renderCmsListPage("commission-report");
  const days = new Map();
  record.entries.forEach((entry) => {
    const day = days.get(entry.dateRaw) || {
      dateRaw: entry.dateRaw,
      date: entry.date,
      entries: [],
      transactions: new Set(),
      serviceValue: 0,
      commission: 0,
    };
    day.entries.push(entry);
    day.transactions.add(entry.transactionId);
    day.serviceValue += entry.serviceValue;
    day.commission += entry.commission;
    days.set(entry.dateRaw, day);
  });
  const periodLabel = commissionReportDateFrom && commissionReportDateTo
    ? `${formatCommissionReportDate(commissionReportDateFrom)} – ${formatCommissionReportDate(commissionReportDateTo)} · ${commissionReportTimeFrom}–${commissionReportTimeTo}`
    : "Semua periode";
  const sortedDays = [...days.values()].sort((a, b) => b.dateRaw.localeCompare(a.dateRaw));
  const daySections = sortedDays.map((day, index) => `
    <details class="cms-commission-day" ${index === 0 ? "open" : ""}>
      <summary class="cms-commission-day-head">
        <div><strong>${formatCommissionReportDate(day.dateRaw, day.date)}</strong><span>${day.transactions.size} transaksi · ${day.entries.length} komponen komisi</span></div>
        <div class="cms-commission-day-totals"><span>Dasar komisi <b>${formatMoney(Math.round(day.serviceValue))}</b></span><span>Komisi harian <b>${formatMoney(Math.round(day.commission))}</b></span><i aria-hidden="true"></i></div>
      </summary>
      <div class="cms-table-scroll">
        <table class="cms-table cms-commission-detail-table">
          <thead><tr><th>Waktu</th><th>No. Nota</th><th>Pelanggan</th><th>Treatment</th><th>Komponen Komisi</th><th>Cabang Transaksi</th><th>Harga Satuan</th><th>Dasar Komisi</th><th>Tarif</th><th>Komisi</th></tr></thead>
          <tbody>${day.entries.map((entry) => `<tr><td>${entry.time}</td><td>${entry.transactionId}</td><td><strong>${entry.customer}</strong></td><td>${entry.qty}x ${entry.serviceName}</td><td><strong>${entry.activityName}</strong><small>Aktivitas</small></td><td>${entry.transactionBranch}</td><td>${entry.unitPrice ? formatMoney(Math.round(entry.unitPrice)) : "—"}</td><td>${formatMoney(Math.round(entry.serviceValue))}</td><td>${entry.rate.toFixed(1).replace(".0", "")}%</td><td><strong>${formatMoney(Math.round(entry.commission))}</strong></td></tr>`).join("")}</tbody>
          <tfoot><tr><td colspan="7">Total ${formatCommissionReportDate(day.dateRaw, day.date)}</td><td>${formatMoney(Math.round(day.serviceValue))}</td><td>—</td><td>${formatMoney(Math.round(day.commission))}</td></tr></tfoot>
        </table>
      </div>
    </details>`).join("");

  return `
    <section class="cms-page-head">
      <div><span class="cms-breadcrumb">Laporan Komisi Petugas / Detail Harian</span><h3>${record.staff}</h3><p>${periodLabel} · ${record.transactionBranch}</p></div>
      <div class="cms-head-actions">
        <button class="cms-primary-button" type="button" data-cms-action="export-commission-pdf">${cmsActionIcon("print")} Export PDF</button>
        <button class="cms-secondary-button" type="button" data-cms-action="back-list">‹ Kembali ke Laporan</button>
      </div>
    </section>
    ${renderCmsSummary([
      ["Total komisi", formatMoney(record.commission)],
      ["Hari kerja", record.dayCount],
      ["Transaksi", record.transactionCount],
      ["Dasar komisi", formatMoney(record.serviceValue)],
    ])}
    <section class="cms-commission-detail-intro"><div><strong>${record.staff}</strong><span>${record.staffBranch} · ${record.transactionBranch}</span></div><span>Rata-rata tarif <b>${record.averageRate.toFixed(1).replace(".0", "")}%</b></span></section>
    <section class="cms-commission-day-toolbar">
      <div><strong>Rincian per hari</strong><span>Buka hanya hari yang ingin diperiksa agar laporan tetap ringkas.</span></div>
      <div><button class="cms-secondary-button" type="button" data-cms-action="expand-commission-days">Buka Semua</button><button class="cms-secondary-button" type="button" data-cms-action="collapse-commission-days">Tutup Semua</button></div>
    </section>
    <div class="cms-commission-days">${daySections || '<div class="cms-empty-cell">Tidak ada pekerjaan pada periode ini.</div>'}</div>
    ${renderCmsCommissionPrintReport(record, sortedDays, periodLabel)}`;
}

function renderCmsDetailPage(page, record) {
  if (page === "commission-report") return renderCmsCommissionDetail(record);
  const fields = cmsDetailFields(page, record);
  const title = record?.name || record?.staff || record?.customer || record?.id || "Detail Data";
  const isTransaction = ["sales", "pending", "sales-report", "revenue-report"].includes(page);
  const showTransactionItems = isTransaction && page !== "revenue-report";
  const isCustomer = ["customers", "members"].includes(page);
  return `
    <section class="cms-page-head">
      <div><span class="cms-breadcrumb">${CMS_PAGE_LABELS[page]} / Detail</span><h3>${title}</h3><p>Informasi lengkap yang digunakan oleh kasir dan operasional salon.</p></div>
      <div class="cms-head-actions">${isTransaction ? `<button class="cms-secondary-button" type="button" data-cms-action="print" data-cms-id="${record.id}">${cmsActionIcon("print")} Cetak Nota</button>` : ""}<button class="cms-secondary-button" type="button" data-cms-action="back-list">‹ Kembali</button></div>
    </section>
    <section class="cms-detail-panel">
      <div class="cms-detail-grid">${fields.map(([label, value]) => `<div class="cms-detail-field"><span>${label}</span><strong>${value}</strong></div>`).join("")}</div>
      ${showTransactionItems ? renderCmsTransactionItems(record) : ""}
      ${isCustomer ? renderCmsMemberPackages(record, page === "members") : ""}
      ${page === "services" || page === "service-activities" ? `<section class="cms-detail-section"><h4>Alur Aktivitas</h4><div class="cms-step-list">${record.actions.map((action, index) => `<div><b>${index + 1}</b><span><strong>${action}</strong><small>Dapat diisi satu atau beberapa petugas dari POS</small></span></div>`).join("")}</div></section>` : ""}
    </section>`;
}

function cmsEscape(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function cmsOption(value, label = value) {
  return { value, label };
}

function getCmsMemberPurchaseCustomers(mode = "new") {
  return customers.filter((customer) => {
    if (customer.id === "umum") return false;
    const hasMembership = customer.status === "Member" || customer.type === "member" || getCustomerRewards(customer).length > 0;
    return mode === "existing" ? hasMembership : !hasMembership;
  });
}

function getCmsMemberPurchaseCustomerOptions(mode = "new") {
  const emptyLabel = mode === "existing" ? "Pilih member lama..." : "Pilih pelanggan baru...";
  return [
    cmsOption("", emptyLabel),
    ...getCmsMemberPurchaseCustomers(mode)
      .map((customer) => cmsOption(customer.id, `${customer.name} · ${customer.phone}`)),
  ];
}

function getCmsFormFields(page, record = {}) {
  record = record || {};
  const services = getCmsServices();
  const serviceOptions = services.map((service) => cmsOption(service.id, service.name));
  const selectedService = services.find((service) => service.id === record.id) || services[0];
  const fields = {
    customers: [
      { key: "code", label: "Kode Pelanggan", value: record.code || "AUTO", disabled: true },
      { key: "name", label: "Nama Pelanggan", value: record.name || "", required: true },
      { key: "phone", label: "Nomor HP", value: record.phone || "", type: "tel", required: true },
      { key: "status", label: "Status", value: record.status || "Non Member", type: "select", options: ["Member", "Non Member"], required: true },
      { key: "frequentBranch", label: "Sering Berkunjung", value: record.frequentBranch || record.memberBranch || "", type: "select", options: [cmsOption("", "Belum ditentukan"), "Cabang Kartini", "Cabang Mulyosari", "Cabang Citraland"] },
      { key: "dp", label: "DP Tersimpan", value: record.dp || 0, type: "number", min: 0 },
    ],
    services: [
      { key: "code", label: "Kode Jasa", value: record.code || "AUTO", disabled: true },
      { key: "name", label: "Nama Jasa", value: record.name || "", required: true },
      { key: "category", label: "Kategori", value: record.category || "Treatment", type: "select", options: ["Hair Cut & Styling", "Treatment", "Beauty Care"], required: true },
      { key: "price", label: "Harga Normal", value: record.price || "", type: "number", min: 0, required: true },
      { key: "reminderDays", label: "Reminder Reguler Setelah (Hari)", value: record.reminderDays || DEFAULT_SERVICE_REMINDER_DAYS, type: "number", min: 1, required: true },
      { key: "fixedDiscountRate", label: "Diskon Pasti (%)", value: record.promotion?.fixedRate || 0, type: "number", min: 0 },
      { key: "flexibleDiscountRate", label: "Diskon Tambahan Fleksibel (%)", value: record.promotion?.flexibleRate || 0, type: "number", min: 0 },
      { key: "status", label: "Status", value: record.status || "Aktif", type: "select", options: ["Aktif", "Nonaktif"], required: true },
    ],
    "service-activities": [
      { key: "serviceId", label: "Jasa", value: record.id || selectedService?.id || "", type: "select", options: serviceOptions, required: true },
      { key: "activity1", label: "Aktivitas 1", value: record.actions?.[0] || "", required: true },
      { key: "activity2", label: "Aktivitas 2", value: record.actions?.[1] || "" },
      { key: "activity3", label: "Aktivitas 3", value: record.actions?.[2] || "" },
      { key: "staffCount", label: "Petugas Tersedia", value: staffOptions.length, type: "number", disabled: true },
      { key: "status", label: "Status", value: record.status || "Aktif", type: "select", options: ["Aktif", "Nonaktif"], required: true },
    ],
    "products-stock": [
      { key: "code", label: "Kode Produk", value: record.code || "AUTO", disabled: true },
      { key: "name", label: "Nama Produk", value: record.name || "", required: true },
      { key: "category", label: "Kategori", value: record.category || "Hair Care", type: "select", options: ["Hair Care", "Styling", "Treatment", "Retail"], required: true },
      { key: "supplier", label: "Supplier", value: record.supplier || "Supplier A", type: "select", options: ["Supplier A", "Supplier B", "Supplier C", "Supplier D"], required: true },
      { key: "cost", label: "Harga Pokok", value: record.cost || "", type: "number", min: 0, required: true },
      { key: "price", label: "Harga Jual", value: record.price || "", type: "number", min: 0, required: true },
      { key: "stock", label: "Stok Awal", value: record.stock || 0, type: "number", min: 0, required: true },
      { key: "unit", label: "Satuan", value: record.unit || "Pcs", type: "select", options: ["Pcs", "Botol"], required: true },
    ],
    "membership-plans": [
      { key: "name", label: "Nama Paket", value: record.name || "", required: true },
      { key: "serviceId", label: "Jasa", value: record.serviceId || serviceOptions[0]?.value || "", type: "select", options: serviceOptions, required: true },
      { key: "target", label: "Jumlah Kuota", value: record.target || 6, type: "number", min: 1, required: true },
      { key: "price", label: "Harga Paket", value: record.price || "", type: "number", min: 0, required: true },
      { key: "reminderDays", label: "Reminder Member Rutin Setiap (Hari)", value: record.reminderDays || DEFAULT_MEMBERSHIP_REMINDER_DAYS, type: "number", min: 1, required: true },
      { key: "status", label: "Status", value: record.status || "Aktif", type: "select", options: ["Aktif", "Nonaktif"], required: true },
    ],
    promotions: [
      { key: "name", label: "Nama Program", value: record.name || "", required: true },
      { key: "value", label: "Nilai Diskon", value: record.value || "5%", required: true },
      { key: "scope", label: "Berlaku Untuk", value: record.scope || "Jasa", required: true },
      { key: "combinable", label: "Bisa Digabung", value: record.combinable || "Tidak", type: "select", options: ["Ya", "Tidak"], required: true },
      { key: "status", label: "Status", value: record.status || "Aktif", type: "select", options: ["Aktif", "Dijadwalkan", "Nonaktif"], required: true },
    ],
    staff: [
      { key: "id", label: "Kode Petugas", value: record.id || "AUTO", disabled: true },
      { key: "name", label: "Nama Petugas", value: record.name || "", required: true },
      { key: "phone", label: "Nomor HP", value: record.phone || "", type: "tel", required: true },
      { key: "branch", label: "Cabang Petugas", value: record.branch || DEFAULT_SALON_BRANCH, type: "select", options: salonBranches.map((branch) => branch.name), required: true },
      { key: "status", label: "Status", value: record.status || "Aktif", type: "select", options: ["Aktif", "Cuti", "Nonaktif"], required: true },
    ],
    "expense-report": [
      { key: "dateRaw", label: "Tanggal", value: record.dateRaw || new Date().toISOString().split("T")[0], type: "date", required: true },
      { key: "amount", label: "Nominal (Rp)", value: record.amount || "", type: "number", min: 1, required: true },
      { key: "branch", label: "Cabang", value: record.branch || activeSalonBranch, type: "select", options: salonBranches.map((branch) => branch.name), required: true },
      { key: "note", label: "Catatan", value: record.note || "", type: "textarea", maxLength: 160, placeholder: "Contoh: pembelian air minum atau biaya kebersihan", required: true },
    ],
    "users-access": [
      { key: "id", label: "ID Pengguna", value: record.id || "AUTO", disabled: true },
      { key: "name", label: "Nama", value: record.name || "", required: true },
      { key: "username", label: "Username", value: record.username || "", required: true },
      { key: "role", label: "Peran", value: record.role || "Kasir", type: "select", options: ["Administrator", "Supervisor", "Kasir"], required: true },
      { key: "access", label: "Hak Akses", value: record.access || "POS, pelanggan, transaksi", required: true },
      { key: "status", label: "Status", value: record.status || "Aktif", type: "select", options: ["Aktif", "Nonaktif"], required: true },
    ],
    members: [
      { key: "customerId", label: "Pelanggan", value: record.id || "", type: "select", options: getCmsMemberPurchaseCustomerOptions("new"), required: true },
      { key: "branch", label: "Cabang Membership", value: activeSalonBranch, type: "select", options: salonBranches.map((b) => b.name), required: true },
      { key: "staff", label: "Petugas", value: "", type: "select", options: [cmsOption("", "Pilih petugas..."), ...staffOptions.map((s) => cmsOption(s, s))] },
      { key: "payment", label: "Metode Pembayaran", value: "Tunai", type: "select", options: ["Tunai", "QRIS", "Kartu"], required: true },
    ],
  };
  return fields[page] || [];
}

function renderCmsField(field) {
  const options = (field.options || []).map((option) => typeof option === "string" ? cmsOption(option) : option);
  const attributes = [
    `data-field-key="${cmsEscape(field.key)}"`,
    field.required ? 'data-required="true" required' : "",
    field.disabled ? "disabled" : "",
    field.min !== undefined ? `min="${field.min}"` : "",
    field.maxLength !== undefined ? `maxlength="${field.maxLength}"` : "",
    field.placeholder ? `placeholder="${cmsEscape(field.placeholder)}"` : "",
  ].filter(Boolean).join(" ");
  let control = `<input type="${field.type || "text"}" value="${cmsEscape(field.value)}" ${attributes} />`;
  if (field.type === "select") {
    control = `<select ${attributes}>${options.map((option) => `<option value="${cmsEscape(option.value)}" ${String(option.value) === String(field.value) ? "selected" : ""}>${cmsEscape(option.label)}</option>`).join("")}</select>`;
  }
  if (field.type === "textarea") {
    control = `<textarea rows="4" ${attributes}>${cmsEscape(field.value)}</textarea>`;
  }
  return `<label class="cms-field${field.type === "textarea" ? " cms-field-wide" : ""}"><span>${cmsEscape(field.label)}${field.required ? " *" : ""}</span>${control}<small class="cms-field-error" aria-live="polite"></small></label>`;
}

function renderCmsMemberPurchaseMode() {
  return `
    <section class="cms-member-purchase-mode" aria-labelledby="cms-member-purchase-mode-title">
      <div>
        <h4 id="cms-member-purchase-mode-title">Jenis Pembelian Member</h4>
        <p id="cms-member-purchase-mode-copy">Member baru menggunakan harga paket yang ditetapkan di Master Paket Membership.</p>
      </div>
      <div class="cms-member-purchase-toggle" role="radiogroup" aria-label="Jenis member">
        <label class="active">
          <input type="radio" name="cms-member-purchase-mode" value="new" data-cms-member-purchase-mode checked />
          <span>Member Baru</span>
        </label>
        <label>
          <input type="radio" name="cms-member-purchase-mode" value="existing" data-cms-member-purchase-mode />
          <span>Member Lama</span>
        </label>
      </div>
    </section>`;
}

function renderCmsMemberPlanSelector() {
  return `
    <section class="cms-form-section cms-member-plan-section">
      <div class="cms-member-plan-heading">
        <div><h4>Pilih Paket Membership</h4><p>Pilih satu atau beberapa paket untuk diproses dalam satu transaksi.</p></div>
        <span id="cms-member-plan-count">0 paket dipilih</span>
      </div>
      <div class="cms-member-plan-grid">
        ${membershipPlans
          .filter((plan) => (plan.status || "Aktif") === "Aktif")
          .map((plan) => `
            <article class="cms-member-plan-option" data-cms-member-plan-card="${cmsEscape(plan.id)}">
              <label class="cms-member-plan-check">
                <input type="checkbox" value="${cmsEscape(plan.id)}" data-cms-member-plan="${cmsEscape(plan.id)}" />
                <span aria-hidden="true"></span>
                <strong>${cmsEscape(plan.name)}</strong>
              </label>
              <div class="cms-member-plan-meta">
                <span>${cmsEscape(plan.serviceName)} · ${plan.target} kuota</span>
                <small>${getMembershipBonusSummary(plan.bonuses) || "Tanpa bonus"}</small>
              </div>
              <label class="cms-member-plan-price">
                <span>Harga Paket</span>
                <input
                  type="number"
                  min="1"
                  value="${plan.price}"
                  data-cms-member-plan-price="${cmsEscape(plan.id)}"
                  aria-label="Harga ${cmsEscape(plan.name)}"
                  disabled
                />
                <small>Harga dapat diubah untuk Member Lama</small>
              </label>
            </article>`)
          .join("")}
      </div>
      <small class="cms-member-plan-error" id="cms-member-plan-error" aria-live="polite"></small>
    </section>`;
}

function renderCmsFormPage(page, record) {
  const isEdit = Boolean(record);
  const fields = getCmsFormFields(page, record);
  const entityLabel = page === "expense-report" ? "Pengeluaran Operasional" : CMS_PAGE_LABELS[page];
  return `
    <section class="cms-page-head">
      <div><span class="cms-breadcrumb">${CMS_PAGE_LABELS[page]} / ${isEdit ? "Edit" : "Tambah"}</span><h3>${isEdit ? `Edit ${record.name || record.id}` : `Tambah ${entityLabel}`}</h3><p>${isEdit ? "Perbarui data yang dipilih." : page === "members" ? "Proses pembelian paket membership untuk pelanggan. Paket akan aktif setelah pembayaran berhasil." : page === "expense-report" ? "Masukkan tanggal, nominal, cabang, dan catatan pengeluaran." : "Masukkan data baru untuk operasional salon."}</p></div>
      <button class="cms-secondary-button" type="button" data-cms-action="back-list">‹ Kembali</button>
    </section>
    <form class="cms-form-panel" id="cms-record-form" novalidate>
      ${page === "members" ? renderCmsMemberPurchaseMode() : ""}
      <div class="cms-form-grid">${fields.map(renderCmsField).join("")}</div>
      ${page === "services" ? renderCmsServiceUpgradeSection(record) : ""}
      ${page === "membership-plans" ? renderCmsMembershipBonusSection(record) : ""}
      ${page === "members" ? `${renderCmsMemberPlanSelector()}<div class="cms-form-section" id="cms-member-purchase-summary">${renderCmsMemberPurchaseSummary()}</div>` : ""}
      <div class="cms-form-actions"><button class="cms-secondary-button" type="button" data-cms-action="back-list">Batal</button><button class="cms-primary-button" type="button" data-cms-action="save">${page === "members" ? "Proses Pembelian" : page === "expense-report" ? "Simpan Pengeluaran" : "Simpan"}</button></div>
    </form>`;
}

function readCmsFormValues() {
  const form = document.querySelector("#cms-record-form");
  if (!form) return null;
  const values = {};
  let valid = true;
  form.querySelectorAll("[data-field-key]").forEach((control) => {
    const field = control.closest(".cms-field");
    const error = field?.querySelector(".cms-field-error");
    const value = control.value.trim();
    values[control.dataset.fieldKey] = value;
    const invalid = control.dataset.required === "true" && value === "";
    field?.classList.toggle("invalid", invalid);
    if (error) error.textContent = invalid ? "Wajib diisi" : "";
    if (invalid) valid = false;
  });
  if (!valid) {
    form.querySelector(".cms-field.invalid input, .cms-field.invalid select, .cms-field.invalid textarea")?.focus();
    showToast("Lengkapi field wajib terlebih dahulu");
    return null;
  }
  return values;
}

function cmsNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function cmsSlug(value) {
  return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function saveCmsRecord() {
  const values = readCmsFormValues();
  if (!values) return false;
  const page = activeCmsPage;
  const record = cmsSelectedRecordId ? getCmsRecord(page, cmsSelectedRecordId) : null;
  const uniqueSuffix = Date.now().toString(36);

  if (page === "customers") {
    const target = record || {
      id: `customer-${cmsSlug(values.name)}-${uniqueSuffix}`,
      code: `CUST.${String(customers.length).padStart(4, "0")}`,
      totalVisits: 0,
      lastVisit: "-",
      lastService: "-",
      lastVisitBranch: "",
      rewards: null,
    };
    Object.assign(target, {
      name: values.name,
      phone: values.phone,
      status: values.status,
      type: values.status === "Member" ? "member" : "non-member",
      frequentBranch: values.frequentBranch || "",
      dp: cmsNumber(values.dp),
    });
    if (!record) customers.push(target);
  }

  if (page === "services") {
    const target = record ? items.find((item) => item.id === record.id) : {
      id: `service-${cmsSlug(values.name)}-${uniqueSuffix}`,
      type: "service",
      label: "Jasa",
      qty: 0,
    };
    const normalPrice = cmsNumber(values.price);
    const fixedDiscountRate = Math.min(100, Math.max(0, cmsNumber(values.fixedDiscountRate)));
    const flexibleDiscountRate = Math.min(100, Math.max(0, cmsNumber(values.flexibleDiscountRate)));
    if (fixedDiscountRate + flexibleDiscountRate > 100) {
      showToast("Total diskon pasti dan tambahan tidak boleh lebih dari 100%");
      return false;
    }
    Object.assign(target, {
      name: values.name,
      price: normalPrice,
      reminderDays: Math.max(1, Math.floor(cmsNumber(values.reminderDays))),
      levels: [{ id: "normal", name: "Normal", price: normalPrice }],
      upgradeServiceIds: [...cmsServiceUpgradeDraft],
      promotion: fixedDiscountRate || flexibleDiscountRate ? { fixedRate: fixedDiscountRate, flexibleRate: flexibleDiscountRate } : null,
      cmsMeta: {
        ...(target.cmsMeta || {}),
        code: record?.code || `JSA-${String(getCmsServices().length + 1).padStart(3, "0")}`,
        category: values.category,
        status: values.status,
      },
    });
    if (!record) items.push(target);
  }

  if (page === "service-activities") {
    const service = items.find((item) => item.id === values.serviceId);
    const actions = [values.activity1, values.activity2, values.activity3].filter(Boolean);
    serviceActionMap[values.serviceId] = actions;
    if (service) service.cmsMeta = { ...(service.cmsMeta || {}), actions, status: values.status };
  }

  if (page === "products-stock") {
    const target = record ? items.find((item) => item.id === record.id) : {
      id: `product-${cmsSlug(values.name)}-${uniqueSuffix}`,
      type: "product",
      label: "Produk",
      qty: 0,
    };
    Object.assign(target, {
      name: values.name,
      price: cmsNumber(values.price),
      cmsMeta: {
        code: record?.code || `PRD-${String(getCmsProducts().length + 1).padStart(3, "0")}`,
        category: values.category,
        supplier: values.supplier,
        cost: cmsNumber(values.cost),
        stock: cmsNumber(values.stock),
        minimum: target.cmsMeta?.minimum ?? 8,
        unit: values.unit,
      },
    });
    if (!record) items.push(target);
  }

  if (page === "membership-plans") {
    const service = getCmsServices().find((item) => item.id === values.serviceId);
    const target = record || { id: `member-${cmsSlug(values.name)}-${uniqueSuffix}` };
    const membershipTarget = Math.max(1, cmsNumber(values.target));
    Object.assign(target, {
      name: values.name,
      serviceId: values.serviceId,
      serviceName: service?.name || "Jasa",
      target: membershipTarget,
      price: cmsNumber(values.price),
      reminderDays: Math.max(1, Math.floor(cmsNumber(values.reminderDays))),
      status: values.status,
      bonuses: membershipTarget >= 10 ? cloneMembershipBonuses(cmsMembershipBonusDraft) : [],
    });
    if (!record) {
      membershipPlans.push(target);
      items.push({ ...target, type: "member", label: "Member", qty: 0 });
    } else {
      const posItem = items.find((item) => item.type === "member" && item.id === target.id);
      if (posItem) Object.assign(posItem, target);
    }
  }

  if (page === "promotions") {
    const target = record || { id: `promo-${cmsSlug(values.name)}-${uniqueSuffix}` };
    Object.assign(target, values);
    if (!record) CMS_PROMOTIONS.push(target);
  }

  if (page === "staff") {
    const previousName = record?.name;
    const index = previousName ? staffOptions.indexOf(previousName) : -1;
    if (index >= 0) staffOptions[index] = values.name;
    else staffOptions.push(values.name);
    const directoryRecord = record ? staffDirectory.find((staff) => staff.id === record.id) : null;
    const target = directoryRecord || { id: `STF-${String(staffDirectory.length + 1).padStart(3, "0")}` };
    Object.assign(target, {
      name: values.name,
      phone: values.phone,
      branch: values.branch,
      specialty: values.specialty,
      status: values.status,
    });
    if (!directoryRecord) staffDirectory.push(target);
    if (previousName && previousName !== values.name) delete CMS_STAFF_DETAILS[previousName];
    CMS_STAFF_DETAILS[values.name] = {
      id: target.id,
      phone: values.phone,
      branch: values.branch,
      specialty: values.specialty,
      status: values.status,
    };
  }

  if (page === "expense-report") {
    const amount = Math.floor(cmsNumber(values.amount));
    if (amount <= 0) {
      showToast("Nominal pengeluaran harus lebih dari Rp 0");
      return false;
    }
    cashierOperationalExpenses.unshift({
      id: `EXP-${String(cashierExpenseCounter).padStart(3, "0")}`,
      dateRaw: values.dateRaw,
      amount,
      note: values.note.trim(),
      branch: values.branch,
    });
    cashierExpenseCounter += 1;
  }

  if (page === "users-access") {
    const target = record || { id: `USR-${String(CMS_USERS.length + 1).padStart(3, "0")}` };
    Object.assign(target, values, { id: target.id });
    if (!record) CMS_USERS.push(target);
  }

  if (page === "members") {
    const form = document.querySelector("#cms-record-form");
    const purchaseMode = form?.querySelector("[data-cms-member-purchase-mode]:checked")?.value || "new";
    const selectedPlans = getCmsMemberPurchaseSelections(form);
    const customer = customers.find((c) => c.id === values.customerId);
    if (!customer) {
      showToast("Data pelanggan tidak ditemukan");
      return false;
    }
    if (!selectedPlans.length) {
      document.querySelector("#cms-member-plan-error").textContent = "Pilih minimal satu paket membership.";
      showToast("Pilih minimal satu paket membership");
      return false;
    }
    if (purchaseMode === "existing" && selectedPlans.some(({ price }) => price <= 0)) {
      document.querySelector("#cms-member-plan-error").textContent = "Harga paket Member Lama harus lebih dari Rp 0.";
      showToast("Periksa kembali harga paket membership");
      return false;
    }
    const branch = values.branch || activeSalonBranch;
    const staff = values.staff || "";
    const payment = values.payment || "Tunai";
    const now = new Date();
    const dateRaw = getLocalDateRaw(now);
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const date = formatIndonesianDate(now);
    if (!Array.isArray(customer.rewards)) customer.rewards = customer.reward ? [customer.reward] : [];
    selectedPlans.forEach(({ plan, price }) => {
      const memberUnitPrice = Math.round(price / getPlanTotalQty(plan));
      const existingReward = customer.rewards.find((reward) => getRewardId(reward) === plan.id);
      if (existingReward) {
        existingReward.progress = plan.target;
        existingReward.target = plan.target;
        existingReward.branch = branch;
        existingReward.purchasePrice = price;
        existingReward.memberUnitPrice = memberUnitPrice;
        existingReward.activatedDateRaw = dateRaw;
        existingReward.lastUsedDateRaw = "";
        return;
      }
      customer.rewards.push({
        membershipId: plan.id,
        serviceId: plan.serviceId,
        serviceName: plan.serviceName,
        branch,
        progress: plan.target,
        target: plan.target,
        purchasePrice: price,
        memberUnitPrice,
        activatedDateRaw: dateRaw,
      });
    });
    customer.status = "Member";
    customer.type = "member";
    if (!customer.frequentBranch) customer.frequentBranch = branch;
    const totalPayment = selectedPlans.reduce((sum, selection) => sum + selection.price, 0);
    salesTransactions.unshift({
      id: getNextInvoiceId(),
      time,
      date,
      dateRaw,
      customer: customer.name,
      staff: staff || customer.name,
      amount: totalPayment,
      payment,
      items: selectedPlans.map(({ plan, price }) => ({
        name: plan.name,
        itemId: plan.id,
        qty: 1,
        price,
        staff,
        type: "member",
        memberPurchaseType: purchaseMode === "existing" ? "Member Lama" : "Member Baru",
        memberBranch: branch,
        memberUnitPrice: Math.round(price / getPlanTotalQty(plan)),
        bonuses: cloneMembershipBonuses(plan.bonuses),
      })),
      status: "Selesai",
      branch,
      dp: 0,
      reward: 0,
      memberBranch: branch,
      memberPurchaseType: purchaseMode === "existing" ? "Member Lama" : "Member Baru",
    });
    cmsViewMode = "list";
    cmsSelectedRecordId = null;
    cmsPageNumbers[page] = 1;
    renderCmsCurrentView();
    showToast(`${selectedPlans.length} paket membership berhasil dibeli untuk ${customer.name}`);
    return true;
  }

  cmsViewMode = "list";
  cmsSelectedRecordId = null;
  cmsPageNumbers[page] = 1;
  renderCmsCurrentView();
  showToast(`${CMS_PAGE_LABELS[page]} berhasil disimpan`);
  return true;
}

function renderCmsSettings() {
  const section = getCmsListFilterValues("salon-settings").section || "";
  const showIdentity = !section || section === "identity";
  const showCashier = !section || section === "cashier";
  return `
    <section class="cms-page-head">
      <div><h3>Pengaturan Salon</h3><p>Identitas salon, informasi struk, dan metode operasional kasir.</p></div>
      <div class="cms-page-head-actions">${renderCmsListFilters("salon-settings")}</div>
    </section>
    <form class="cms-form-panel cms-settings-form">
      ${showIdentity ? `<div class="cms-form-section"><h4>Identitas Salon</h4><div class="cms-form-grid">
        <label class="cms-field"><span>Nama Salon</span><input value="JMM Salon" /></label>
        <label class="cms-field"><span>Cabang</span><input value="Kartini Surabaya" /></label>
        <label class="cms-field"><span>Alamat</span><input value="Jl. Kartini No.100 Surabaya" /></label>
        <label class="cms-field"><span>Telepon / WhatsApp</span><input value="0851 3788 0880" /></label>
        <label class="cms-field"><span>Instagram</span><input value="@jmmsalon_kartinisby" /></label>
        <label class="cms-field"><span>Zona Waktu</span><select><option>Asia/Jakarta (WIB)</option></select></label>
      </div></div>` : ""}
      ${showCashier ? `<div class="cms-form-section"><h4>Aturan Kasir</h4><div class="cms-form-grid">
        <label class="cms-field"><span>Metode Pembayaran</span><input value="Tunai, QRIS" /></label>
        <label class="cms-field"><span>Maksimum Item Jasa Sama</span><input type="number" value="2" /></label>
        <label class="cms-field"><span>Diskon Per Item</span><input value="5%, 10%, dapat digabung" /></label>
      </div></div>` : ""}
      <div class="cms-form-actions"><button class="cms-primary-button" type="button" data-cms-action="save-settings">Simpan Pengaturan</button></div>
    </form>`;
}

function renderCmsDashboard() {
  const dashboardBranchFilter = getCmsListFilterValues("dashboard").branch || "";
  const completedTransactions = salesTransactions.filter((t) => t.status !== "Pending");
  const filteredTransactions = dashboardBranchFilter
    ? completedTransactions.filter((t) => getTransactionBranch(t) === dashboardBranchFilter)
    : completedTransactions;
  const totals = filteredTransactions
    .map(getCmsDashboardTransactionMetrics)
    .reduce((summary, metrics) => ({
      cashIn: summary.cashIn + metrics.cashIn,
      memberUsed: summary.memberUsed + metrics.memberUsed,
      regularRevenue: summary.regularRevenue + metrics.regularRevenue,
      productRevenue: summary.productRevenue + metrics.productRevenue,
      memberSales: summary.memberSales + metrics.memberSales,
      membersSold: summary.membersSold + metrics.membersSold,
    }), { cashIn: 0, memberUsed: 0, regularRevenue: 0, productRevenue: 0, memberSales: 0, membersSold: 0 });
  const totalPending = dashboardBranchFilter
    ? salesTransactions.filter((t) => t.status === "Pending" && getTransactionBranch(t) === dashboardBranchFilter).length
    : getPendingTransactions().length;
  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / cmsRowsPerPage));
  const currentPage = Math.min(Math.max(1, cmsPageNumbers.dashboard || 1), totalPages);
  cmsPageNumbers.dashboard = currentPage;
  const pageStart = (currentPage - 1) * cmsRowsPerPage;
  const visibleTransactions = filteredTransactions.slice(pageStart, pageStart + cmsRowsPerPage);
  const pagination = Array.from({ length: totalPages }, (_, index) => index + 1)
    .map((pageNumber) => `<button class="${pageNumber === currentPage ? "active" : ""}" type="button" data-cms-action="paginate" data-cms-id="${pageNumber}" aria-label="Halaman ${pageNumber}">${pageNumber}</button>`)
    .join("");

  return `
    <section class="cms-page-head">
      <div><h3>Ringkasan Operasional</h3><p>Ringkasan transaksi selesai, pemakaian member, produk, dan penjualan paket membership.</p></div>
      <div class="cms-page-head-actions">${renderCmsListFilters("dashboard")}</div>
    </section>
    <div class="cms-dashboard-grid cms-dashboard-metrics">
      <div class="cms-card">
        <h4>Kas Masuk</h4>
        <strong>${formatMoney(totals.cashIn)}</strong>
      </div>
      <div class="cms-card">
        <h4>Member Digunakan</h4>
        <strong>${formatMoney(totals.memberUsed)}</strong>
      </div>
      <div class="cms-card">
        <h4>Pendapatan Reguler</h4>
        <strong>${formatMoney(totals.regularRevenue)}</strong>
      </div>
      <div class="cms-card">
        <h4>Pendapatan Produk</h4>
        <strong>${formatMoney(totals.productRevenue)}</strong>
      </div>
      <div class="cms-card cms-member-sales-card">
        <h4>Penjualan Member</h4>
        <div class="cms-member-sales-values">
          <div><strong>${formatMoney(totals.memberSales)}</strong><small>Penjualan member (Rp)</small></div>
          <div><strong>${totals.membersSold} pcs</strong><small>Member terjual</small></div>
        </div>
      </div>
      <div class="cms-card">
        <h4>Pending</h4>
        <strong>${totalPending}</strong>
      </div>
      <div class="cms-card">
        <h4>Total Transaksi</h4>
        <strong>${filteredTransactions.length}</strong>
      </div>
    </div>
    <div class="cms-dashboard-table">
      <div class="cms-dashboard-table-head">
        <div><h4>Transaksi Terkini</h4><p>Seluruh transaksi selesai, diurutkan dari yang terbaru${dashboardBranchFilter ? ` di ${cmsEscape(dashboardBranchFilter)}` : ""}.</p></div>
      </div>
      <div class="cms-dashboard-table-panel">
        <div class="cms-table-scroll cms-dashboard-table-scroll">
          <table class="cms-table">
            <thead><tr><th>ID</th><th>Waktu</th><th>Pelanggan</th><th>Cabang</th><th>Total Transaksi</th><th>Member Digunakan</th><th>Kas Masuk</th></tr></thead>
            <tbody>
              ${visibleTransactions.length
                ? visibleTransactions.map((transaction) => {
                  const metrics = getCmsDashboardTransactionMetrics(transaction);
                  return `<tr><td>${cmsEscape(transaction.id)}</td><td>${cmsEscape(transaction.date)}<small>${cmsEscape(transaction.time)}</small></td><td>${cmsEscape(transaction.customer)}</td><td>${cmsEscape(getTransactionBranch(transaction))}</td><td>${formatMoney(metrics.transactionTotal)}</td><td>${metrics.memberUsed ? formatMoney(metrics.memberUsed) : "—"}</td><td>${formatMoney(metrics.cashIn)}</td></tr>`;
                }).join("")
                : `<tr><td colspan="7" class="cms-empty-table-cell">Belum ada transaksi selesai${dashboardBranchFilter ? ` di ${cmsEscape(dashboardBranchFilter)}` : ""}</td></tr>`}
            </tbody>
          </table>
        </div>
        <div class="cms-table-footer">
          <span>Menampilkan ${filteredTransactions.length ? pageStart + 1 : 0}-${Math.min(pageStart + cmsRowsPerPage, filteredTransactions.length)} dari ${filteredTransactions.length} transaksi</span>
          <div class="cms-pagination">
            <button type="button" data-cms-action="paginate" data-cms-id="${Math.max(1, currentPage - 1)}" ${currentPage === 1 ? "disabled" : ""} aria-label="Halaman sebelumnya">‹</button>
            ${pagination}
            <button type="button" data-cms-action="paginate" data-cms-id="${Math.min(totalPages, currentPage + 1)}" ${currentPage === totalPages ? "disabled" : ""} aria-label="Halaman berikutnya">›</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getCmsMemberPurchaseSelections(form = document.querySelector("#cms-record-form")) {
  if (!form) return [];
  const purchaseMode = form.querySelector("[data-cms-member-purchase-mode]:checked")?.value || "new";
  return [...form.querySelectorAll("[data-cms-member-plan]:checked")]
    .map((checkbox) => {
      const plan = membershipPlans.find((entry) => entry.id === checkbox.dataset.cmsMemberPlan);
      const priceInput = form.querySelector(`[data-cms-member-plan-price="${checkbox.dataset.cmsMemberPlan}"]`);
      const customPrice = Math.max(0, Math.floor(Number(priceInput?.value) || 0));
      return plan ? { plan, price: purchaseMode === "existing" ? customPrice : plan.price } : null;
    })
    .filter(Boolean);
}

function renderCmsMemberPurchaseSummary() {
  const selections = getCmsMemberPurchaseSelections();
  if (!selections.length) {
    return '<div class="cms-member-purchase-summary cms-member-purchase-summary-empty"><span>Pilih satu atau beberapa paket membership untuk melihat ringkasan pembayaran.</span></div>';
  }
  const total = selections.reduce((sum, selection) => sum + selection.price, 0);
  return `
    <div class="cms-member-purchase-summary">
      <div class="cms-member-purchase-summary-head">
        <div><span>Ringkasan Paket</span><strong>${selections.length} paket dipilih</strong></div>
        <strong>${formatMoney(total)}</strong>
      </div>
      <div class="cms-member-purchase-summary-list">
        ${selections.map(({ plan, price }) => `
          <div class="cms-member-purchase-summary-row">
            <span><strong>${cmsEscape(plan.name)}</strong><small>${cmsEscape(plan.serviceName)} · ${plan.target} kuota · ${getMembershipBonusSummary(plan.bonuses) || "Tanpa bonus"}</small></span>
            <span><strong>${formatMoney(price)}</strong><small>${formatMoney(Math.round(price / getPlanTotalQty(plan)))} / manfaat</small></span>
          </div>`).join("")}
      </div>
      <div class="cms-member-purchase-plan-info total"><span>Total Pembayaran</span><strong>${formatMoney(total)}</strong></div>
    </div>`;
}

function updateCmsMemberPurchaseSummary() {
  const form = document.querySelector("#cms-record-form");
  if (!form) return;
  const purchaseMode = form.querySelector("[data-cms-member-purchase-mode]:checked")?.value || "new";
  const selections = getCmsMemberPurchaseSelections(form);
  form.querySelectorAll("[data-cms-member-plan-card]").forEach((card) => {
    const selected = selections.some(({ plan }) => plan.id === card.dataset.cmsMemberPlanCard);
    card.classList.toggle("selected", selected);
    const priceInput = card.querySelector("[data-cms-member-plan-price]");
    if (priceInput) priceInput.disabled = purchaseMode !== "existing" || !selected;
  });
  const count = form.querySelector("#cms-member-plan-count");
  if (count) count.textContent = `${selections.length} paket dipilih`;
  const planError = form.querySelector("#cms-member-plan-error");
  if (planError) planError.textContent = "";
  const container = document.querySelector("#cms-member-purchase-summary");
  if (!container) return;
  container.innerHTML = renderCmsMemberPurchaseSummary();
}

function updateCmsMemberPurchaseMode(control) {
  const form = control.closest("#cms-record-form");
  if (!form) return;
  const mode = control.value === "existing" ? "existing" : "new";
  form.querySelectorAll("[data-cms-member-purchase-mode]").forEach((option) => {
    option.closest("label")?.classList.toggle("active", option.checked);
  });
  const copy = form.querySelector("#cms-member-purchase-mode-copy");
  if (copy) {
    copy.textContent = mode === "existing"
      ? "Member lama dapat membeli beberapa paket sekaligus dan menyesuaikan harga setiap paket."
      : "Member baru menggunakan harga paket yang ditetapkan di Master Paket Membership.";
  }
  const customerSelect = form.querySelector('[data-field-key="customerId"]');
  if (customerSelect) {
    customerSelect.innerHTML = getCmsMemberPurchaseCustomerOptions(mode)
      .map((option) => `<option value="${cmsEscape(option.value)}">${cmsEscape(option.label)}</option>`)
      .join("");
    customerSelect.value = "";
    customerSelect.closest(".cms-field")?.classList.remove("invalid");
  }
  form.querySelectorAll("[data-cms-member-plan-price]").forEach((priceInput) => {
    const plan = membershipPlans.find((entry) => entry.id === priceInput.dataset.cmsMemberPlanPrice);
    if (mode === "new" && plan) priceInput.value = plan.price;
    const selected = Boolean(form.querySelector(`[data-cms-member-plan="${priceInput.dataset.cmsMemberPlanPrice}"]`)?.checked);
    priceInput.disabled = mode !== "existing" || !selected;
  });
  updateCmsMemberPurchaseSummary();
}

function renderCmsPage(page) {
  activeCmsPage = page;
  cmsViewMode = "list";
  cmsSelectedRecordId = null;
  cmsSearchTerm = "";
  cmsFilterPanelOpen = false;
  cmsPageNumbers[page] = 1;
  renderCmsCurrentView();
}

function renderCmsCurrentView() {
  const title = document.querySelector("#cms-page-title");
  const content = document.querySelector("#cms-content");
  const page = activeCmsPage;
  const label = CMS_PAGE_LABELS[page] || page;
  if (title) title.textContent = label;

  document.querySelectorAll("[data-cms-page]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.cmsPage === page);
  });

  if (!content) return;
  if (page === "dashboard") content.innerHTML = renderCmsDashboard();
  else if (page === "salon-settings") content.innerHTML = renderCmsSettings();
  else if (page === "staff-commission") content.innerHTML = renderCmsStaffCommission();
  else if (cmsViewMode === "detail") content.innerHTML = renderCmsDetailPage(page, getCmsRecord(page, cmsSelectedRecordId));
  else if (cmsViewMode === "form") content.innerHTML = renderCmsFormPage(page, cmsSelectedRecordId ? getCmsRecord(page, cmsSelectedRecordId) : null);
  else content.innerHTML = renderCmsListPage(page);
}

function handleCmsAction(action, id) {
  if (action === "toggle-filter-panel") {
    cmsFilterPanelOpen = !cmsFilterPanelOpen;
    renderCmsCurrentView();
    return;
  }
  if (action === "reset-list-filters") {
    const page = id || activeCmsPage;
    delete cmsListFilters[page];
    cmsSearchTerm = "";
    cmsPageNumbers[page] = 1;
    renderCmsCurrentView();
    return;
  }
  if (action === "reset-stock-filters") {
    stockReportCategory = "";
    stockReportSupplier = "";
    stockReportStockStatus = "";
    cmsSearchTerm = "";
    cmsPageNumbers["stock-report"] = 1;
    renderCmsCurrentView();
    return;
  }
  if (action === "reset-sales-filters") {
    salesReportDateFrom = "";
    salesReportDateTo = "";
    salesReportBranch = "";
    cmsSearchTerm = "";
    cmsPageNumbers["sales-report"] = 1;
    renderCmsCurrentView();
    return;
  }
  if (action === "reset-regular-filters") {
    regularReportDateFrom = "";
    regularReportDateTo = "";
    regularReportBranch = "";
    cmsSearchTerm = "";
    cmsPageNumbers["regular-report"] = 1;
    renderCmsCurrentView();
    return;
  }
  if (action === "reset-revenue-filters") {
    revenueReportDateFrom = "";
    revenueReportDateTo = "";
    revenueReportBranch = "";
    cmsSearchTerm = "";
    cmsPageNumbers["revenue-report"] = 1;
    renderCmsCurrentView();
    return;
  }
  if (action === "reset-expense-filters") {
    expenseReportDateFrom = "";
    expenseReportDateTo = "";
    expenseReportBranch = "";
    cmsSearchTerm = "";
    cmsPageNumbers["expense-report"] = 1;
    renderCmsCurrentView();
    return;
  }
  if (action === "expand-commission-days") {
    setCmsCommissionDaysExpanded(true);
    return;
  }
  if (action === "collapse-commission-days") {
    setCmsCommissionDaysExpanded(false);
    return;
  }
  if (action === "export-commission-pdf") {
    exportCmsCommissionPdf();
    return;
  }
  if (action === "export-reminders-excel") {
    exportCmsRemindersExcel();
    return;
  }
  if (action === "decrease-member-quota") {
    const [customerId, rewardId] = String(id || "").split("::");
    const customer = customers.find((entry) => entry.id === customerId);
    const reward = getCustomerRewards(customer).find((entry) => getRewardId(entry) === rewardId);
    const quotaInput = [...document.querySelectorAll("[data-cms-member-quota-input]")]
      .find((input) => input.dataset.cmsMemberQuotaInput === id);
    const requestedQuota = Math.max(1, Math.floor(Number(quotaInput?.value) || 1));
    const remaining = Math.max(0, Number(reward?.progress) || 0);

    if (!customer || !reward) {
      showToast("Data membership tidak ditemukan");
      return;
    }
    if (!remaining) {
      showToast("Kuota membership sudah habis");
      return;
    }
    if (requestedQuota > remaining) {
      showToast(`Maksimal pengurangan ${remaining} kuota`);
      return;
    }

    reward.progress = remaining - requestedQuota;
    reward.lastUsedDateRaw = getLocalDateRaw();
    renderCmsCurrentView();
    showToast(`${requestedQuota} kuota ${getRewardName(reward, { withMember: true })} berhasil dikurangi`);
    return;
  }
  if (action === "reset-commission-filters") {
    commissionReportDateFrom = "";
    commissionReportDateTo = "";
    commissionReportTimeFrom = "00:00";
    commissionReportTimeTo = "23:59";
    commissionReportBranch = "";
    commissionReportFiltersInitialized = false;
    cmsSearchTerm = "";
    cmsPageNumbers["commission-report"] = 1;
    renderCmsCurrentView();
    return;
  }
  if (action === "add-membership-bonus") {
    if (getCmsMembershipTarget() < 10) {
      showToast("Bonus tersedia untuk paket dengan kuota minimal 10x");
      return;
    }
    const catalog = getCmsMembershipBonusCatalog("product");
    const item = catalog[0];
    cmsMembershipBonusDraft.push({ type: "product", itemId: item?.id || "", name: item?.name || "Produk", qty: 1 });
    renderCmsMembershipBonusEditor();
    return;
  }
  if (action === "remove-membership-bonus") {
    cmsMembershipBonusDraft.splice(Number(id), 1);
    renderCmsMembershipBonusEditor();
    return;
  }
  if (action === "paginate") {
    cmsPageNumbers[activeCmsPage] = Number(id) || 1;
    renderCmsCurrentView();
    if (activeCmsPage !== "dashboard") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    return;
  }
  if (action === "add") {
    if (activeCmsPage === "services") prepareCmsServiceUpgradeDraft(null);
    if (activeCmsPage === "membership-plans") prepareCmsMembershipBonusDraft(null);
    cmsViewMode = "form";
    cmsSelectedRecordId = null;
    renderCmsCurrentView();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return;
  }
  if (action === "edit") {
    if (activeCmsPage === "services") prepareCmsServiceUpgradeDraft(getCmsRecord(activeCmsPage, id));
    if (activeCmsPage === "membership-plans") prepareCmsMembershipBonusDraft(getCmsRecord(activeCmsPage, id));
    cmsViewMode = "form";
    cmsSelectedRecordId = id;
    renderCmsCurrentView();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return;
  }
  if (action === "detail") {
    cmsViewMode = "detail";
    cmsSelectedRecordId = id;
    renderCmsCurrentView();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return;
  }
  if (action === "back-list") {
    cmsViewMode = "list";
    cmsSelectedRecordId = null;
    cmsSearchTerm = "";
    renderCmsCurrentView();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return;
  }
  if (action === "save") {
    saveCmsRecord();
    return;
  }
  if (action === "save-settings") {
    showToast("Pengaturan salon tersimpan");
    return;
  }
  if (action === "save-commissions") {
    const staff = getCmsStaff().find((person) => person.id === activeCommissionStaffId);
    showToast(`Tarif aktivitas ${staff?.name || "petugas"} tersimpan`);
    return;
  }
  if (action === "delete") {
    const record = getCmsRecord(activeCmsPage, id);
    showToast(`${record?.name || record?.id || "Data"} siap dihapus`);
    return;
  }
  if (action === "open-pos") {
    loadPendingTransaction(id);
    return;
  }
  if (action === "whatsapp") {
    const reminder = getCustomerReminderRecords().find((item) => item.id === id);
    showToast(`WhatsApp reminder ${reminder?.type?.toLowerCase() || ""} untuk ${reminder?.customer || "pelanggan"} dibuka`);
    return;
  }
  if (action === "print") {
    showToast(`Nota ${id || "transaksi"} siap dicetak`);
  }
}

function toggleCmsSidebar() {
  cmsSidebarCollapsed = !cmsSidebarCollapsed;
  const layout = document.querySelector("#cms-layout");
  if (layout) layout.classList.toggle("collapsed", cmsSidebarCollapsed);

  const sidebarToggle = document.querySelector("#cms-sidebar-toggle");
  const menuToggle = document.querySelector("#cms-menu-toggle");
  const isExpanded = !cmsSidebarCollapsed;
  if (sidebarToggle) {
    sidebarToggle.setAttribute("aria-expanded", String(isExpanded));
    sidebarToggle.setAttribute("aria-label", isExpanded ? "Tutup sidebar" : "Buka sidebar");
  }
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", String(isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Tutup sidebar" : "Buka sidebar");
  }
}

function openCmsView() {
  setView("cms-view");
}

document.addEventListener("submit", (event) => {
  if (event.target.matches("#cms-record-form")) {
    event.preventDefault();
    saveCmsRecord();
  }
});

document.addEventListener("input", (event) => {
  const memberPlanPriceInput = event.target.closest("[data-cms-member-plan-price]");
  if (memberPlanPriceInput && activeCmsPage === "members") {
    memberPlanPriceInput.closest(".cms-member-plan-option")
      ?.classList.toggle("invalid", Number(memberPlanPriceInput.value) <= 0);
    updateCmsMemberPurchaseSummary();
    return;
  }

  const cmsFieldControl = event.target.closest("#cms-record-form [data-field-key]");
  if (cmsFieldControl) {
    const field = cmsFieldControl.closest(".cms-field");
    field?.classList.remove("invalid");
    const error = field?.querySelector(".cms-field-error");
    if (error) error.textContent = "";
    if (cmsFieldControl.dataset.fieldKey === "target" && activeCmsPage === "membership-plans") {
      renderCmsMembershipBonusEditor();
    }
  }

  const bonusQtyInput = event.target.closest("[data-membership-bonus-qty]");
  if (bonusQtyInput) {
    const bonus = cmsMembershipBonusDraft[Number(bonusQtyInput.dataset.membershipBonusQty)];
    if (bonus) bonus.qty = Math.max(1, Number(bonusQtyInput.value) || 1);
    return;
  }

  const commissionRateInput = event.target.closest("[data-commission-rate]");
  if (commissionRateInput) {
    const serviceId = commissionRateInput.dataset.commissionRate;
    const service = getCmsServices().find((entry) => entry.id === serviceId);
    const activity = service?.actions[Number(commissionRateInput.dataset.commissionActivity)];
    const profile = getStaffCommissionProfile(activeCommissionStaffId);
    const value = Number(commissionRateInput.value) || 0;
    if (activity && profile[serviceId]?.activities?.[activity]) {
      if (profile[serviceId].activities[activity].type === "nominal") {
        profile[serviceId].activities[activity].nominal = Math.max(0, value);
      } else {
        profile[serviceId].activities[activity].rate = Math.min(100, Math.max(0, value));
      }
    }
    return;
  }

  const commissionTypeSelect = event.target.closest("[data-commission-type]");
  if (commissionTypeSelect) {
    const serviceId = commissionTypeSelect.dataset.commissionType;
    const service = getCmsServices().find((entry) => entry.id === serviceId);
    const activity = service?.actions[Number(commissionTypeSelect.dataset.commissionActivity)];
    const profile = getStaffCommissionProfile(activeCommissionStaffId);
    const newType = commissionTypeSelect.value;
    if (activity && profile[serviceId]?.activities?.[activity]) {
      profile[serviceId].activities[activity].type = newType;
    }
    renderCmsCurrentView();
    return;
  }

  const cmsSearchInput = event.target.closest("#cms-search-input");
  if (cmsSearchInput) {
    cmsSearchTerm = cmsSearchInput.value;
    cmsPageNumbers[activeCmsPage] = 1;
    renderCmsCurrentView();
    const refreshedInput = document.querySelector("#cms-search-input");
    if (refreshedInput) {
      refreshedInput.focus();
      refreshedInput.setSelectionRange(cmsSearchTerm.length, cmsSearchTerm.length);
    }
    return;
  }

  const staffSearchInput = event.target.closest(".staff-menu-search input, .staff-option-search input");
  if (staffSearchInput) {
    const term = staffSearchInput.value.trim().toLowerCase();
    let list;
    if (staffSearchInput.closest(".staff-option-search")) {
      list = staffSearchInput.closest(".staff-action-row")?.querySelector(".staff-option-list");
    } else {
      list = staffSearchInput.closest(".staff-menu");
    }
    if (list) {
      list.querySelectorAll("[data-staff], [data-action-staff]").forEach((button) => {
        const name = button.dataset.staff || button.dataset.actionStaff || "";
        const searchable = `${name} ${getStaffBranch(name)}`.toLowerCase();
        button.style.display = searchable.includes(term) ? "" : "none";
      });
    }
    return;
  }

  const reportFilterInput = event.target.closest("#sales-date-from, #sales-date-to, #sales-branch-filter, #regular-date-from, #regular-date-to, #regular-branch-filter, #revenue-date-from, #revenue-date-to, #revenue-branch-filter, #expense-date-from, #expense-date-to, #expense-branch-filter, #stock-category-filter, #stock-supplier-filter, #stock-status-filter");
  if (reportFilterInput) {
    updateReportFilter(reportFilterInput);
    return;
  }

  const nativeFilterInput = event.target.closest("#filter-date-from, #filter-date-to, #filter-time-from, #filter-time-to");
  if (nativeFilterInput) {
    salesPage = 1;
    renderSalesList();
    return;
  }

  const customerSearch = event.target.closest("#customer-search");
  if (customerSearch) {
    customerSearchTerm = customerSearch.value.trim().toLowerCase();
    renderCustomerList();
    return;
  }

  const salesSearch = event.target.closest(".sales-search input");
  if (salesSearch) {
    salesSearchTerm = salesSearch.value.trim().toLowerCase();
    salesPage = 1;
    renderSalesList();
    return;
  }

  const dropdownSearchInput = event.target.closest(".dropdown-search input");
  if (dropdownSearchInput) {
    dropdownSearchTerm = dropdownSearchInput.value.trim().toLowerCase();
    renderCustomerDropdown();
    const newInput = document.querySelector(".dropdown-search input");
    if (newInput) {
      newInput.focus();
      const len = newInput.value.length;
      newInput.setSelectionRange(len, len);
    }
    return;
  }

  const modalDpInput = event.target.closest("#modal-dp");
  if (modalDpInput) {
    const value = Number(modalDpInput.value);
    customDp = Number.isNaN(value) || value < 0 ? 0 : Math.round(value);
    const { payable } = calculateTotals();
    const totalEl = document.querySelector("#modal-total");
    if (totalEl) totalEl.textContent = formatMoney(payable);
    const changeEl = document.querySelector("#modal-change");
    if (changeEl) changeEl.textContent = formatMoney(Math.max(0, cashReceived - payable));
    return;
  }

  const cashReceivedInput = event.target.closest("#modal-cash-received");
  if (cashReceivedInput) {
    const value = Number(cashReceivedInput.value);
    cashReceived = Number.isNaN(value) || value < 0 ? 0 : Math.round(value);
    const { payable } = calculateTotals();
    const changeEl = document.querySelector("#modal-change");
    if (changeEl) changeEl.textContent = formatMoney(Math.max(0, cashReceived - payable));
    return;
  }

  const cardNumberInput = event.target.closest("#modal-card-number");
  if (cardNumberInput) {
    const raw = cardNumberInput.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(" ") || "";
    cardNumber = formatted;
    cardNumberInput.value = formatted;
    return;
  }

  const pendingSearchInput = event.target.closest("#pending-search");
  if (pendingSearchInput) {
    pendingSearchTerm = pendingSearchInput.value.trim().toLowerCase();
    renderPendingList();
    return;
  }

  const pendingPopupSearchInput = event.target.closest("#pending-popup-search");
  if (pendingPopupSearchInput) {
    pendingPopupSearchTerm = pendingPopupSearchInput.value.trim().toLowerCase();
    renderPendingPopup();
    return;
  }

  const searchInput = event.target.closest("#item-search");
  if (!searchInput) return;

  searchTerm = searchInput.value.trim().toLowerCase();
  if (activeStaffMenu) {
    activeStaffMenu = null;
    activeStaffAction = null;
    renderCart();
  }
  if (activeDiscountMenu) {
    activeDiscountMenu = null;
    renderCart();
  }
  renderItems();
});

document.addEventListener("change", (event) => {
  const cmsListFilterInput = event.target.closest("[data-cms-list-filter]");
  if (cmsListFilterInput) {
    updateCmsListFilter(cmsListFilterInput);
    return;
  }

  const memberPurchaseMode = event.target.closest("[data-cms-member-purchase-mode]");
  if (memberPurchaseMode && activeCmsPage === "members") {
    updateCmsMemberPurchaseMode(memberPurchaseMode);
    return;
  }

  const memberPurchasePlan = event.target.closest("[data-cms-member-plan]");
  if (memberPurchasePlan && activeCmsPage === "members") {
    updateCmsMemberPurchaseSummary();
    return;
  }

  const serviceUpgradeCheckbox = event.target.closest("[data-service-upgrade-id]");
  if (serviceUpgradeCheckbox) {
    const serviceId = serviceUpgradeCheckbox.dataset.serviceUpgradeId;
    cmsServiceUpgradeDraft = serviceUpgradeCheckbox.checked
      ? [...new Set([...cmsServiceUpgradeDraft, serviceId])]
      : cmsServiceUpgradeDraft.filter((id) => id !== serviceId);
    return;
  }

  const bonusTypeSelect = event.target.closest("[data-membership-bonus-type]");
  if (bonusTypeSelect) {
    const index = Number(bonusTypeSelect.dataset.membershipBonusType);
    const bonus = cmsMembershipBonusDraft[index];
    const catalog = getCmsMembershipBonusCatalog(bonusTypeSelect.value);
    if (bonus) {
      bonus.type = bonusTypeSelect.value;
      bonus.itemId = catalog[0]?.id || "";
      bonus.name = catalog[0]?.name || (bonus.type === "service" ? "Treatment" : "Produk");
    }
    renderCmsMembershipBonusEditor();
    return;
  }

  const bonusItemSelect = event.target.closest("[data-membership-bonus-item]");
  if (bonusItemSelect) {
    const bonus = cmsMembershipBonusDraft[Number(bonusItemSelect.dataset.membershipBonusItem)];
    const item = bonus ? getCmsMembershipBonusCatalog(bonus.type).find((entry) => entry.id === bonusItemSelect.value) : null;
    if (bonus && item) {
      bonus.itemId = item.id;
      bonus.name = item.name;
    }
    return;
  }

  const staffSelect = event.target.closest("#cms-commission-staff-select");
  if (staffSelect) {
    activeCommissionStaffId = staffSelect.value;
    renderCmsCurrentView();
    return;
  }

  const commissionServiceToggle = event.target.closest("[data-commission-service-toggle]");
  if (commissionServiceToggle) {
    const serviceId = commissionServiceToggle.dataset.commissionServiceToggle;
    const profile = getStaffCommissionProfile(activeCommissionStaffId);
    if (profile[serviceId]) {
      profile[serviceId].enabled = commissionServiceToggle.checked;
      if (!commissionServiceToggle.checked) {
        Object.values(profile[serviceId].activities || {}).forEach((setting) => {
          setting.enabled = false;
        });
      }
    }
    renderCmsCurrentView();
    return;
  }

  const commissionToggle = event.target.closest("[data-commission-toggle]");
  if (commissionToggle) {
    const serviceId = commissionToggle.dataset.commissionToggle;
    const service = getCmsServices().find((entry) => entry.id === serviceId);
    const activity = service?.actions[Number(commissionToggle.dataset.commissionActivity)];
    const profile = getStaffCommissionProfile(activeCommissionStaffId);
    if (profile[serviceId]?.enabled && activity && profile[serviceId]?.activities?.[activity]) {
      profile[serviceId].activities[activity].enabled = commissionToggle.checked;
    }
    renderCmsCurrentView();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    blurNativeDateTimePicker();
    if (activeDiscountMenu) {
      activeDiscountMenu = null;
      renderCart();
    }
    const pendingPopupModal = document.querySelector("#pending-popup-modal");
    if (pendingPopupModal && !pendingPopupModal.hidden) {
      closePendingPopup();
    }
  }

  const discountInput = event.target.closest("[data-discount-input]");
  if (discountInput && event.key === "Enter") {
    const saveButton = document.querySelector(`[data-discount-save="${discountInput.dataset.discountInput}"]`);
    if (saveButton) saveButton.click();
  }
});
