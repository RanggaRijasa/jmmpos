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
  "sales-report": "Laporan Penjualan",
  "revenue-report": "Laporan Pendapatan",
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
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9 9 0 0 1-4-1l-5 2 2-5a9 9 0 1 1 16-4.5Z"></path><path d="M9 8c.5 3 2 4.5 5 5"></path></svg>',
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
      category: meta.category || (index % 3 === 0 ? "Hair Cut & Styling" : index % 3 === 1 ? "Treatment" : "Beauty Care"),
      status: meta.status || "Aktif",
    };
  });
}

function getItemAssignedStaffNames(item) {
  const actionStaff = Object.values(item.actionStaffs || {}).flat().filter((name) => staffOptions.includes(name));
  if (actionStaff.length) return [...new Set(actionStaff)];
  return staffOptions.includes(item.staff) ? [item.staff] : [];
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
  const lineValue = (item.price || 0) * (item.qty || 1);
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
    }));
  });
}

function getCommissionTreatmentLines(item) {
  if (item.type !== "service") return [];
  const activityLines = getCommissionActivityLines(item);
  const catalogItem = findCatalogItem(item);
  const serviceId = activityLines[0]?.serviceId || item.activeServiceId || catalogItem?.id || item.itemId || item.id;
  const service = getCmsServices().find((entry) => entry.id === serviceId) || catalogItem;
  const staffNames = [...new Set(activityLines.map((line) => line.staffName).filter(Boolean))];
  if (!staffNames.length) staffNames.push(...getItemAssignedStaffNames(item));
  const lineValue = (item.price || 0) * (item.qty || 1);
  const staffValue = lineValue / Math.max(1, staffNames.length);
  return staffNames.map((staffName) => ({
    serviceId,
    serviceName: service?.name || item.name,
    activity: "Treatment Utama",
    activityIndex: -1,
    componentType: "treatment",
    staffName,
    staffValue,
  }));
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
    const workedService = [...workedActivities].some((key) => key.startsWith(`${service.id}\u0000`));
    const serviceEnabled = typeof existing.enabled === "boolean"
      ? existing.enabled
      : workedService || serviceIndex % 3 === staffIndex % 3 || (serviceIndex + staffIndex) % 7 === 0;
    service.actions.forEach((activity, activityIndex) => {
      if (activitySettings[activity]) return;
      const worked = workedActivities.has(`${service.id}\u0000${activity}`);
      const enabled = worked || (serviceIndex + activityIndex) % 3 === staffIndex % 3;
      activitySettings[activity] = {
        enabled,
        rate: enabled ? [2.5, 5, 7.5, 10, 12.5][(serviceIndex + activityIndex + staffIndex) % 5] : 2.5,
      };
    });
    profile[service.id] = {
      enabled: serviceEnabled,
      rate: Number.isFinite(existing.rate)
        ? existing.rate
        : serviceEnabled ? [10, 12.5, 15, 17.5, 20][(serviceIndex + staffIndex) % 5] : 10,
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
      const commissionLines = [
        ...getCommissionTreatmentLines(item),
        ...getCommissionActivityLines(item).map((line) => ({ ...line, componentType: "activity" })),
      ];
      commissionLines.forEach((commissionLine) => {
        const staff = staffByName.get(commissionLine.staffName);
        if (!staff) return;
        const serviceSetting = getStaffCommissionProfile(staff.id)[commissionLine.serviceId];
        const setting = commissionLine.componentType === "activity"
          ? serviceSetting?.activities?.[commissionLine.activity]
          : serviceSetting;
        const rate = setting?.enabled ? setting.rate : 0;
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
          id: `${transaction.id}-${itemIndex}-${commissionLine.componentType}-${commissionLine.activityIndex}-${staff.id}`,
          transactionId: transaction.id,
          dateRaw: transaction.dateRaw || "",
          date: transaction.date,
          time: transaction.time,
          customer: transaction.customer,
          transactionBranch,
          serviceId: commissionLine.serviceId,
          serviceName: commissionLine.serviceName,
          activityName: commissionLine.activity,
          componentType: commissionLine.componentType,
          qty: item.qty || 1,
          serviceValue: commissionLine.staffValue,
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
  const staff = getCmsStaff();
  const selectedStaff = staff.find((person) => person.id === activeCommissionStaffId) || staff[0];
  activeCommissionStaffId = selectedStaff.id;
  const services = getCmsServices();
  const profile = getStaffCommissionProfile(selectedStaff.id);
  const activeTreatmentCount = services.filter((service) => profile[service.id]?.enabled).length;
  const activeActivityCount = services.reduce((count, service) => count + service.actions.filter((activity) => profile[service.id]?.activities?.[activity]?.enabled).length, 0);

  const serviceRows = services.map((service) => {
    const treatmentSetting = profile[service.id] || { enabled: false, rate: 10, activities: {} };
    const treatmentRow = `
      <div class="cms-commission-activity cms-commission-treatment ${treatmentSetting.enabled ? "enabled" : ""}">
        <div class="cms-commission-activity-copy">
          <span>T</span>
          <strong>Komisi Treatment</strong>
        </div>
        <label class="cms-commission-switch" title="${treatmentSetting.enabled ? "Nonaktifkan" : "Aktifkan"} komisi treatment ${cmsEscape(service.name)}">
          <input type="checkbox" data-commission-toggle="${service.id}" ${treatmentSetting.enabled ? "checked" : ""} />
          <span aria-hidden="true"></span>
          <em>${treatmentSetting.enabled ? "Aktif" : "Nonaktif"}</em>
        </label>
        <div class="cms-commission-rate">
          ${treatmentSetting.enabled
            ? `<label><input type="number" min="0" max="100" step="0.5" value="${treatmentSetting.rate}" data-commission-rate="${service.id}" aria-label="Komisi treatment ${cmsEscape(service.name)}" /><span>%</span></label>`
            : `<span class="cms-commission-rate-empty" aria-label="Komisi treatment belum aktif">-</span>`}
        </div>
      </div>`;
    const activityRows = service.actions.map((activity, activityIndex) => {
      const setting = profile[service.id]?.activities?.[activity] || { enabled: false, rate: 5 };
      return `
        <div class="cms-commission-activity ${setting.enabled ? "enabled" : ""}">
          <div class="cms-commission-activity-copy">
            <span>${String(activityIndex + 1).padStart(2, "0")}</span>
            <strong>${cmsEscape(activity)}</strong>
          </div>
          <label class="cms-commission-switch" title="${setting.enabled ? "Nonaktifkan" : "Aktifkan"} komisi ${cmsEscape(activity)}">
            <input type="checkbox" data-commission-toggle="${service.id}" data-commission-activity="${activityIndex}" ${setting.enabled ? "checked" : ""} />
            <span aria-hidden="true"></span>
            <em>${setting.enabled ? "Aktif" : "Nonaktif"}</em>
          </label>
          <div class="cms-commission-rate">
            ${setting.enabled
              ? `<label><input type="number" min="0" max="100" step="0.5" value="${setting.rate}" data-commission-rate="${service.id}" data-commission-activity="${activityIndex}" aria-label="Komisi ${cmsEscape(activity)} pada ${cmsEscape(service.name)}" /><span>%</span></label>`
              : `<span class="cms-commission-rate-empty" aria-label="Komisi belum aktif">-</span>`}
          </div>
        </div>`;
    }).join("");
    const serviceActiveCount = Number(treatmentSetting.enabled) + service.actions.filter((activity) => profile[service.id]?.activities?.[activity]?.enabled).length;
    return `
      <article class="cms-commission-item ${serviceActiveCount ? "enabled" : ""}">
        <header class="cms-commission-service-head">
          <div class="cms-commission-service">
            <strong>${service.name}</strong>
            <span>${service.category} · ${service.actions.length} aktivitas</span>
          </div>
          <b>${serviceActiveCount}/${service.actions.length + 1} aktif</b>
        </header>
        <div class="cms-commission-activities">${treatmentRow}${activityRows}</div>
      </article>`;
  }).join("");

  return `
    <section class="cms-page-head cms-commission-page-head">
      <div>
        <h3>Komisi Petugas</h3>
        <p>Master tarif komisi treatment dan setiap aktivitas di dalamnya untuk setiap petugas.</p>
      </div>
      <button class="cms-primary-button" type="button" data-cms-action="save-commissions">Simpan Perubahan</button>
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
          <span>${selectedStaff.branch} · ${selectedStaff.specialty}</span>
        </div>
      </header>
      <div class="cms-commission-grid">${serviceRows}</div>
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

function getCmsPageRows(page) {
  if (page === "customers") {
    return customers.filter((customer) => customer.id !== "umum").map((customer) => ({
      id: customer.id,
      search: `${customer.code} ${customer.name} ${customer.phone} ${customer.status} ${getCustomerFrequentBranch(customer)}`,
      cells: [customer.code, `<strong>${customer.name}</strong>`, customer.phone, cmsBadge(customer.status, customer.status === "Member" ? "gold" : "neutral"), getCustomerFrequentBranch(customer) || "—", customer.totalVisits, customer.lastVisit],
    }));
  }
  if (page === "services") {
    return getCmsServices().map((service) => ({
      id: service.id,
      search: `${service.code} ${service.name} ${service.category} ${getCmsServicePromotionLabel(service)} ${getCmsServiceUpgradeNames(service).join(" ")}`,
      cells: [service.code, `<strong>${service.name}</strong>`, service.category, service.actions.length, getCmsServicePromotionLabel(service), getCmsServiceUpgradeNames(service).join(" · ") || "—", formatMoney(service.price), cmsBadge(service.status, "success")],
    }));
  }
  if (page === "service-activities") {
    return getCmsServices().map((service) => ({
      id: service.id,
      search: `${service.name} ${service.actions.join(" ")}`,
      cells: [`<strong>${service.name}</strong>`, service.actions.join(" · "), service.actions.length, staffOptions.length, cmsBadge("Aktif", "success")],
    }));
  }
  if (page === "products-stock" || page === "stock-report") {
    return getCmsProducts().map((product) => ({
      id: product.id,
      search: `${product.code} ${product.name} ${product.category} ${product.supplier}`,
      cells: [product.code, `<strong>${product.name}</strong>`, product.category, product.supplier, formatMoney(product.cost), formatMoney(product.price), `${product.stock} ${product.unit}`, cmsBadge(product.stock <= product.minimum ? "Stok rendah" : "Tersedia", product.stock <= product.minimum ? "warning" : "success")],
    }));
  }
  if (page === "membership-plans") {
    return membershipPlans.map((plan, index) => ({
      id: plan.id,
      search: `${plan.name} ${plan.serviceName} ${getMembershipBonusSummary(plan.bonuses)}`,
      cells: [`MBR-${String(index + 1).padStart(3, "0")}`, `<strong>${plan.name}</strong>`, plan.serviceName, `${plan.target} kali`, getMembershipBonusSummary(plan.bonuses) || "—", formatMoney(plan.price), formatMoney(Math.round(plan.price / plan.target)), cmsBadge(plan.status || "Aktif", (plan.status || "Aktif") === "Aktif" ? "success" : "neutral")],
    }));
  }
  if (page === "promotions") {
    return CMS_PROMOTIONS.map((promotion) => ({
      id: promotion.id,
      search: Object.values(promotion).join(" "),
      cells: [`<strong>${promotion.name}</strong>`, promotion.value, promotion.scope, promotion.combinable, cmsBadge(promotion.status, promotion.status === "Aktif" ? "success" : "warning")],
    }));
  }
  if (page === "staff") {
    return getCmsStaff().map((staff) => ({
      id: staff.id,
      search: `${staff.id} ${staff.name} ${staff.branch} ${staff.specialty}`,
      cells: [staff.id, `<strong>${staff.name}</strong>`, staff.phone, staff.branch, staff.specialty, staff.transactions, formatMoney(staff.revenue), cmsBadge(staff.status, staff.status === "Aktif" ? "success" : "warning")],
    }));
  }
  if (page === "sales" || page === "sales-report") {
    return salesTransactions.filter((transaction) => page === "sales" || transaction.status !== "Pending").map((transaction) => ({
      id: transaction.id,
      search: `${transaction.id} ${transaction.customer} ${transaction.staff} ${transaction.payment} ${getTransactionBranch(transaction)} ${getTransactionMemberBranch(transaction)}`,
      cells: [transaction.id, `${transaction.date}<small>${transaction.time}</small>`, `<strong>${transaction.customer}</strong>`, transaction.staff, getTransactionBranch(transaction), cmsBadge(transaction.payment, "gold"), getTransactionMemberBranch(transaction) || "—", formatMoney(transaction.amount), cmsBadge(transaction.status, transaction.status === "Pending" ? "warning" : "success")],
    }));
  }
  if (page === "pending") {
    return getPendingTransactions().map((transaction) => ({
      id: transaction.id,
      search: `${transaction.id} ${transaction.customer} ${transaction.staff} ${getTransactionBranch(transaction)} ${getTransactionMemberBranch(transaction)}`,
      cells: [transaction.id, `${transaction.date}<small>${transaction.time}</small>`, `<strong>${transaction.customer}</strong>`, transaction.staff, getTransactionBranch(transaction), `${transaction.items.length} item`, getTransactionMemberBranch(transaction) || "—", formatMoney(transaction.dp || 0), formatMoney(transaction.amount), cmsBadge("Pending", "warning")],
    }));
  }
  if (page === "reminders") {
    return customers.filter((customer) => customer.id !== "umum").map((customer, index) => ({
      id: customer.id,
      search: `${customer.name} ${customer.phone} ${customer.lastService} ${customer.lastVisit} ${getCustomerLastVisitBranch(customer)}`,
      cells: [`<strong>${customer.name}</strong>`, customer.phone, `<strong>${customer.lastService || "—"}</strong><small>${customer.lastVisit}</small>`, getCustomerLastVisitBranch(customer) || "—", customer.reminderDate, customer.status, cmsBadge(index % 3 === 0 ? "Sudah dihubungi" : "Belum dihubungi", index % 3 === 0 ? "success" : "warning")],
    }));
  }
  if (page === "members") {
    return customers.filter((customer) => getCustomerRewards(customer).length).map((customer) => {
      const rewards = getCustomerRewards(customer);
      return {
        id: customer.id,
        search: `${customer.name} ${customer.phone} ${getCustomerMembershipBranches(customer).join(" ")} ${rewards.map((reward) => getRewardName(reward)).join(" ")}`,
        cells: [`<strong>${customer.name}</strong>`, customer.phone, getCustomerMembershipBranches(customer).join(" · "), rewards.length, rewards.map((reward) => `${getRewardName(reward)} ${reward.progress}/${reward.target}`).join(" · "), customer.totalVisits, cmsBadge("Aktif", "success")],
      };
    });
  }
  if (page === "member-visits") {
    return getCmsMemberVisits().map((visit) => ({
      id: visit.id,
      search: `${visit.customer} ${visit.service} ${visit.branch} ${visit.dateTime}`,
      cells: [visit.dateTime, `<strong>${visit.customer}</strong>`, visit.service, visit.branch, `${visit.qty} kuota`, cmsBadge("Terpakai", "gold")],
    }));
  }
  if (page === "revenue-report") {
    return salesTransactions.filter((transaction) => transaction.status !== "Pending").map((transaction) => ({
      id: transaction.id,
      search: `${transaction.id} ${transaction.customer} ${transaction.payment} ${getTransactionBranch(transaction)} ${getTransactionMemberBranch(transaction)}`,
      cells: [transaction.date, transaction.id, transaction.customer, transaction.payment, getTransactionBranch(transaction), getTransactionMemberBranch(transaction) || "—", formatMoney(transaction.dp || 0), formatMoney(transaction.reward || 0), formatMoney(transaction.amount)],
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
    return getCmsCommissionReport().map((row) => ({
      id: row.id,
      search: `${row.staff} ${row.staffBranch} ${row.transactionBranch}`,
      cells: [`<strong>${row.staff}</strong>`, row.staffBranch, row.transactionBranch, `${row.dayCount} hari`, row.transactionCount, formatMoney(row.serviceValue), `${row.averageRate.toFixed(1).replace(".0", "")}%`, `<strong>${formatMoney(row.commission)}</strong>`],
    }));
  }
  if (page === "users-access") {
    return CMS_USERS.map((user) => ({
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
    services: { subtitle: "Daftar jasa beserta promo pasti, diskon fleksibel, dan treatment tujuan upgrade member.", headers: ["Kode", "Nama Jasa", "Kategori", "Aktivitas", "Promo", "Opsi Upgrade", "Harga Normal", "Status"], add: "Tambah Jasa", search: "Cari jasa, promo, atau opsi upgrade..." },
    "service-activities": { subtitle: "Atur langkah kerja setiap jasa agar kasir dapat memilih satu atau beberapa petugas per aktivitas.", headers: ["Jasa", "Urutan Aktivitas", "Jumlah", "Petugas Tersedia", "Status"], add: "Tambah Aktivitas", search: "Cari jasa atau aktivitas..." },
    "products-stock": { subtitle: "Produk retail yang tersedia di POS, harga jual, supplier, dan posisi stok.", headers: ["Kode", "Produk", "Kategori", "Supplier", "Harga Pokok", "Harga Jual", "Stok", "Status"], add: "Tambah Produk", search: "Cari produk, kategori, atau supplier..." },
    "membership-plans": { subtitle: "Paket kuota treatment beserta bonus produk atau treatment yang dapat dibeli dari POS.", headers: ["Kode", "Paket", "Jasa", "Kuota", "Bonus", "Harga Paket", "Harga / Kuota", "Status"], add: "Tambah Paket", search: "Cari paket, jasa, atau bonus member..." },
    promotions: { subtitle: "Konfigurasi diskon per item jasa yang dapat dipilih kasir setelah item masuk keranjang.", headers: ["Program", "Nilai", "Berlaku Untuk", "Bisa Digabung", "Status"], add: "Tambah Promo", search: "Cari promo atau cakupan..." },
    staff: { subtitle: "Petugas beserta cabang penempatan yang dapat ditugaskan ke aktivitas jasa di POS.", headers: ["Kode", "Nama", "Nomor HP", "Cabang Petugas", "Keahlian", "Transaksi", "Nilai Jasa", "Status"], add: "Tambah Petugas", search: "Cari petugas, cabang, atau keahlian..." },
    sales: { subtitle: "Seluruh transaksi kasir dengan cabang salon dan cabang membership yang digunakan.", headers: ["No. Nota", "Tanggal", "Pelanggan", "Petugas Utama", "Cabang Transaksi", "Pembayaran", "Cabang Membership", "Total", "Status"], search: "Cari no. nota, pelanggan, petugas, atau cabang..." },
    pending: { subtitle: "Draft transaksi kasir dengan cabang salon dan cabang membership yang dipakai.", headers: ["No. Draft", "Tanggal", "Pelanggan", "Petugas", "Cabang Transaksi", "Isi", "Cabang Membership", "DP", "Total", "Status"], search: "Cari draft, pelanggan, atau cabang..." },
    reminders: { subtitle: "Pelanggan yang perlu dihubungi tujuh hari setelah jasa terakhir, lengkap dengan cabang kunjungan terakhir.", headers: ["Pelanggan", "Nomor HP", "Jasa Terakhir", "Terakhir Berkunjung", "Jadwal Reminder", "Keanggotaan", "Status Kontak"], search: "Cari pelanggan, jasa, nomor HP, atau cabang..." },
    members: { subtitle: "Daftar pelanggan dengan paket member aktif dari satu atau beberapa cabang.", headers: ["Pelanggan", "Nomor HP", "Cabang Membership", "Paket Aktif", "Sisa Kuota", "Total Kunjungan", "Status"], search: "Cari pelanggan, cabang, atau paket member..." },
    "member-visits": { subtitle: "Riwayat penggunaan kuota membership per pelanggan, treatment, dan cabang.", headers: ["Tanggal & Waktu", "Pelanggan", "Membership", "Cabang Membership", "Pemakaian", "Status"], search: "Cari pelanggan, cabang, atau membership..." },
    "sales-report": { subtitle: "Rekap transaksi selesai per cabang salon beserta cabang membership yang digunakan.", headers: ["No. Nota", "Tanggal", "Pelanggan", "Petugas", "Cabang Transaksi", "Pembayaran", "Cabang Membership", "Total", "Status"], search: "Cari transaksi laporan atau cabang..." },
    "revenue-report": { subtitle: "Rincian pendapatan kasir per cabang setelah DP dan pemakaian kuota member.", headers: ["Tanggal", "No. Nota", "Pelanggan", "Metode", "Cabang Transaksi", "Cabang Membership", "DP", "Member", "Pendapatan"], search: "Cari transaksi, metode, atau cabang..." },
    "stock-report": { subtitle: "Laporan posisi stok produk dan peringatan produk di bawah batas minimum.", headers: ["Kode", "Produk", "Kategori", "Supplier", "Harga Pokok", "Harga Jual", "Stok", "Status"], search: "Cari produk pada laporan stok..." },
    "staff-commission": { subtitle: "Konfigurasi treatment dan tarif komisi petugas sebagai bagian dari Master Data.", headers: ["Petugas", "Keahlian", "Transaksi", "Nilai Jasa", "Tarif", "Komisi"], search: "Cari petugas..." },
    "commission-report": { subtitle: "Rekap komisi treatment dan aktivitas yang dikerjakan petugas berdasarkan waktu serta cabang transaksi.", headers: ["Petugas", "Cabang Petugas", "Cabang Transaksi", "Hari Kerja", "Transaksi", "Dasar Komisi", "Rata-rata Tarif", "Komisi"], search: "Cari petugas atau cabang..." },
    "users-access": { subtitle: "Akun pengguna CMS dan batas akses ke fungsi kasir, operasional, serta laporan.", headers: ["ID", "Nama", "Username", "Peran", "Hak Akses", "Status"], add: "Tambah Pengguna", search: "Cari nama, username, atau peran..." },
  };
  return meta[page] || { subtitle: "", headers: [], search: "Cari data..." };
}

function getCmsSummary(page, rows) {
  const completed = salesTransactions.filter((transaction) => transaction.status !== "Pending");
  const revenue = completed.reduce((sum, transaction) => sum + transaction.amount, 0);
  if (page === "sales" || page === "sales-report") return [["Transaksi selesai", completed.length], ["Pending", getPendingTransactions().length], ["Total penjualan", formatMoney(revenue)], ["Rata-rata", formatMoney(Math.round(revenue / Math.max(1, completed.length)))]];
  if (page === "revenue-report") return [["Pendapatan", formatMoney(revenue)], ["Tunai", formatMoney(completed.filter((t) => t.payment === "Tunai").reduce((s, t) => s + t.amount, 0))], ["QRIS", formatMoney(completed.filter((t) => t.payment === "QRIS").reduce((s, t) => s + t.amount, 0))], ["DP tercatat", formatMoney(completed.reduce((s, t) => s + (t.dp || 0), 0))]];
  if (page === "stock-report" || page === "products-stock") {
    const products = getCmsProducts();
    return [["Produk", products.length], ["Total stok", products.reduce((sum, product) => sum + product.stock, 0)], ["Stok rendah", products.filter((product) => product.stock <= product.minimum).length], ["Nilai stok", formatMoney(products.reduce((sum, product) => sum + product.cost * product.stock, 0))]];
  }
  if (page === "members") return [["Pelanggan member", rows.length], ["Paket aktif", customers.reduce((sum, customer) => sum + getCustomerRewards(customer).length, 0)], ["Kuota tersisa", customers.flatMap(getCustomerRewards).reduce((sum, reward) => sum + reward.progress, 0)], ["Kunjungan member", customers.filter((c) => getCustomerRewards(c).length).reduce((sum, c) => sum + c.totalVisits, 0)]];
  if (page === "reminders") return [["Perlu dihubungi", rows.length], ["Belum dihubungi", Math.ceil(rows.length * 2 / 3)], ["Sudah dihubungi", Math.floor(rows.length / 3)], ["Member", customers.filter((c) => c.status === "Member").length]];
  if (page === "commission-report") {
    const report = getCmsCommissionReport();
    return [["Total komisi", formatMoney(report.reduce((sum, row) => sum + row.commission, 0))], ["Petugas", new Set(report.map((row) => row.staffId)).size], ["Transaksi", new Set(report.flatMap((row) => [...row.transactions])).size], ["Cabang transaksi", new Set(report.map((row) => row.transactionBranch)).size]];
  }
  return [];
}

function renderCmsSummary(summary) {
  if (!summary.length) return "";
  return `<div class="cms-dashboard-grid cms-summary-grid">${summary.map(([label, value]) => `<div class="cms-card"><h4>${label}</h4><strong>${value}</strong></div>`).join("")}</div>`;
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
      ${meta.add ? `<button class="cms-primary-button" type="button" data-cms-action="add">+ ${meta.add}</button>` : ""}
    </section>
    ${page === "commission-report" ? renderCmsCommissionFilters() : ""}
    ${renderCmsSummary(summary)}
    <section class="cms-data-panel">
      <div class="cms-list-toolbar">
        <div><strong>${CMS_PAGE_LABELS[page]}</strong><span>${allRows.length} data tersimpan</span></div>
        <label class="cms-search"><span aria-hidden="true">⌕</span><input id="cms-search-input" type="search" value="${cmsSearchTerm}" placeholder="${meta.search}" autocomplete="off" /></label>
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
  if (page === "customers" || page === "reminders" || page === "members") return customers.find((item) => item.id === id);
  if (page === "services" || page === "service-activities") return getCmsServices().find((item) => item.id === id);
  if (page === "products-stock" || page === "stock-report") return getCmsProducts().find((item) => item.id === id);
  if (page === "membership-plans") return membershipPlans.find((item) => item.id === id);
  if (page === "promotions") return CMS_PROMOTIONS.find((item) => item.id === id);
  if (page === "staff" || page === "staff-commission") return getCmsStaff().find((item) => item.id === id);
  if (["sales", "pending", "sales-report", "revenue-report"].includes(page)) return salesTransactions.find((item) => item.id === id);
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

function cmsDetailFields(page, record) {
  if (!record) return [];
  if (["customers", "reminders", "members"].includes(page)) return [["Kode Pelanggan", record.code], ["Nama Pelanggan", record.name], ["Nomor HP", record.phone], ["Status", record.status], ["Sering Berkunjung", getCustomerFrequentBranch(record) || "—"], ["Cabang Membership", getCustomerMembershipBranches(record).join(" · ") || "—"], ["Total Kunjungan", `${record.totalVisits} kali`], ["Kunjungan Terakhir", record.lastVisit], ["Terakhir Berkunjung", getCustomerLastVisitBranch(record) || "—"], ["Jasa Terakhir", record.lastService || "—"], ["Jadwal Reminder", record.reminderDate], ["DP Tersimpan", formatMoney(record.dp || 0)]];
  if (["services", "service-activities"].includes(page)) return [["Kode Jasa", record.code], ["Nama Jasa", record.name], ["Kategori", record.category], ["Harga Normal", formatMoney(record.price)], ["Promo Treatment", getCmsServicePromotionLabel(record)], ["Opsi Upgrade", getCmsServiceUpgradeNames(record).join(" · ") || "—"], ["Aktivitas", record.actions.join(" → ")], ["Status", record.status]];
  if (["products-stock", "stock-report"].includes(page)) return [["Kode Produk", record.code], ["Nama Produk", record.name], ["Kategori", record.category], ["Supplier", record.supplier], ["Harga Pokok", formatMoney(record.cost)], ["Harga Jual", formatMoney(record.price)], ["Stok", `${record.stock} ${record.unit}`], ["Stok Minimum", `${record.minimum} ${record.unit}`]];
  if (page === "membership-plans") return [["Nama Paket", record.name], ["Jasa", record.serviceName], ["Jumlah Kuota", `${record.target} kali`], ["Bonus Paket", getMembershipBonusSummary(record.bonuses) || "—"], ["Harga Paket", formatMoney(record.price)], ["Harga per Kuota", formatMoney(Math.round(record.price / record.target))], ["Status", record.status || "Aktif"]];
  if (page === "promotions") return [["Nama Program", record.name], ["Nilai Diskon", record.value], ["Berlaku Untuk", record.scope], ["Bisa Digabung", record.combinable], ["Status", record.status]];
  if (["staff", "staff-commission"].includes(page)) return [["Kode Petugas", record.id], ["Nama Petugas", record.name], ["Nomor HP", record.phone], ["Cabang Petugas", record.branch], ["Keahlian", record.specialty], ["Transaksi Selesai", record.transactions], ["Nilai Jasa", formatMoney(record.revenue)], ["Status", record.status]];
  if (page === "commission-report") return [["Petugas", record.staff], ["Cabang Petugas", record.staffBranch], ["Cabang Transaksi", record.transactionBranch], ["Transaksi Selesai", record.transactionCount], ["Nilai Jasa", formatMoney(record.serviceValue)], ["Rata-rata Tarif", `${record.averageRate.toFixed(1).replace(".0", "")}%`], ["Total Komisi", formatMoney(record.commission)]];
  if (page === "users-access") return [["ID Pengguna", record.id], ["Nama", record.name], ["Username", record.username], ["Peran", record.role], ["Hak Akses", record.access], ["Status", record.status]];
  if (page === "member-visits") return [["Pelanggan", record.customer], ["Nomor HP", record.phone], ["Membership", record.service], ["Cabang Membership", record.branch], ["Waktu Pemakaian", record.dateTime], ["Kuota Dipakai", record.qty], ["Status", "Terpakai"]];
  if (["sales", "pending", "sales-report", "revenue-report"].includes(page)) return [["No. Dokumen", record.id], ["Tanggal", `${record.date} · ${record.time}`], ["Pelanggan", record.customer], ["Petugas Utama", record.staff], ["Cabang Transaksi", getTransactionBranch(record)], ["Pembayaran", record.payment], ["Cabang Membership", getTransactionMemberBranch(record) || "—"], ["Status", record.status], ["DP", formatMoney(record.dp || 0)], ["Pemakaian Member", formatMoney(record.reward || 0)], ["Total", formatMoney(record.amount)]];
  return [];
}

function renderCmsTransactionItems(transaction) {
  if (!transaction?.items) return "";
  return `<section class="cms-detail-section"><h4>Rincian Transaksi</h4><div class="cms-transaction-lines">${transaction.items.map((line) => {
    const actions = line.type === "service" ? getServiceActions(line) : [];
    const memberUsage = line.memberFree || line.memberUpgrade ? `<small>Pemakaian Member · ${line.memberBranch || getTransactionMemberBranch(transaction) || "Cabang belum ditentukan"}</small>` : "";
    const packageBranch = line.type === "member" && line.memberBranch ? `<small>Cabang Membership · ${line.memberBranch}</small>` : "";
    const packageBonus = line.type === "member" && line.bonuses?.length ? `<small>Bonus: ${getMembershipBonusSummary(line.bonuses)}</small>` : "";
    const promotion = line.type === "service" && (line.fixedDiscountRate || line.flexibleDiscountRate) ? `<small>Promo ${line.fixedDiscountRate ? `${line.fixedDiscountRate}% pasti` : ""}${line.flexibleDiscountRate ? ` + ${line.flexibleDiscountRate}% tambahan` : ""}</small>` : "";
    return `<div class="cms-transaction-line"><div><strong>${line.qty || 1}x ${line.name}</strong>${line.type === "service" ? actions.map((action) => `<small>${action} By : ${line.staff || "Belum dipilih"}</small>`).join("") : line.type === "product" ? `<small>Produk retail</small>` : `<small>Paket membership</small>`}${promotion}${packageBranch}${packageBonus}${memberUsage}</div><strong>${formatMoney((line.price || 0) * (line.qty || 1))}</strong></div>`;
  }).join("")}</div></section>`;
}

function renderCmsMemberPackages(customer) {
  const rewards = getCustomerRewards(customer);
  if (!rewards.length) return "";
  return `<section class="cms-detail-section"><h4>Membership Dimiliki</h4><div class="cms-package-list">${rewards.map((reward) => `<div><span><strong>${getRewardName(reward, { withMember: true })}</strong><small>${getRewardBranch(reward, customer)} · ${reward.progress} dari ${reward.target} kuota tersisa</small></span><b>${reward.progress}/${reward.target}</b></div>`).join("")}</div></section>`;
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
        <thead><tr><th>Waktu / Nota</th><th>Pelanggan / Treatment</th><th>Komponen</th><th>Dasar</th><th>Tarif</th><th>Komisi</th></tr></thead>
        <tbody>${day.entries.map((entry) => `
          <tr>
            <td><strong>${entry.time}</strong><span>${entry.transactionId}</span></td>
            <td><strong>${entry.customer}</strong><span>${entry.qty}x ${entry.serviceName}</span></td>
            <td><strong>${entry.activityName}</strong><span>${entry.componentType === "treatment" ? "Treatment" : "Aktivitas"}</span></td>
            <td>${formatMoney(Math.round(entry.serviceValue))}</td>
            <td>${entry.rate.toFixed(1).replace(".0", "")}%</td>
            <td><strong>${formatMoney(Math.round(entry.commission))}</strong></td>
          </tr>`).join("")}</tbody>
        <tfoot><tr><td colspan="3">Total harian</td><td>${formatMoney(Math.round(day.serviceValue))}</td><td>-</td><td>${formatMoney(Math.round(day.commission))}</td></tr></tfoot>
      </table>
    </section>`).join("");

  return `
    <article class="cms-commission-print-report" aria-hidden="true">
      <header class="cms-commission-print-header">
        <div class="cms-commission-print-brand">
          <img src="assets/images/JMMSALON2Transparant.png" alt="" />
          <div><strong>JMM SALON</strong><span>Professional Hair Salon</span></div>
        </div>
        <div class="cms-commission-print-title"><span>Dokumen Internal</span><h1>Laporan Komisi Petugas</h1><p>Rincian komisi treatment dan aktivitas jasa</p></div>
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
          <thead><tr><th>Waktu</th><th>No. Nota</th><th>Pelanggan</th><th>Treatment</th><th>Komponen Komisi</th><th>Cabang Transaksi</th><th>Dasar Komisi</th><th>Tarif</th><th>Komisi</th></tr></thead>
          <tbody>${day.entries.map((entry) => `<tr><td>${entry.time}</td><td>${entry.transactionId}</td><td><strong>${entry.customer}</strong></td><td>${entry.qty}x ${entry.serviceName}</td><td><strong>${entry.activityName}</strong><small>${entry.componentType === "treatment" ? "Treatment" : "Aktivitas"}</small></td><td>${entry.transactionBranch}</td><td>${formatMoney(Math.round(entry.serviceValue))}</td><td>${entry.rate.toFixed(1).replace(".0", "")}%</td><td><strong>${formatMoney(Math.round(entry.commission))}</strong></td></tr>`).join("")}</tbody>
          <tfoot><tr><td colspan="6">Total ${formatCommissionReportDate(day.dateRaw, day.date)}</td><td>${formatMoney(Math.round(day.serviceValue))}</td><td>—</td><td>${formatMoney(Math.round(day.commission))}</td></tr></tfoot>
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
  const isCustomer = ["customers", "members", "reminders"].includes(page);
  return `
    <section class="cms-page-head">
      <div><span class="cms-breadcrumb">${CMS_PAGE_LABELS[page]} / Detail</span><h3>${title}</h3><p>Informasi lengkap yang digunakan oleh kasir dan operasional salon.</p></div>
      <div class="cms-head-actions">${isTransaction ? `<button class="cms-secondary-button" type="button" data-cms-action="print" data-cms-id="${record.id}">${cmsActionIcon("print")} Cetak Nota</button>` : ""}<button class="cms-secondary-button" type="button" data-cms-action="back-list">‹ Kembali</button></div>
    </section>
    <section class="cms-detail-panel">
      <div class="cms-detail-grid">${fields.map(([label, value]) => `<div class="cms-detail-field"><span>${label}</span><strong>${value}</strong></div>`).join("")}</div>
      ${isTransaction ? renderCmsTransactionItems(record) : ""}
      ${isCustomer ? renderCmsMemberPackages(record) : ""}
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
      { key: "reminderDate", label: "Jadwal Reminder", value: record.reminderDate === "-" ? "" : record.reminderDate || "", placeholder: "Contoh: 04 Jul 2026" },
      { key: "dp", label: "DP Tersimpan", value: record.dp || 0, type: "number", min: 0 },
    ],
    services: [
      { key: "code", label: "Kode Jasa", value: record.code || "AUTO", disabled: true },
      { key: "name", label: "Nama Jasa", value: record.name || "", required: true },
      { key: "category", label: "Kategori", value: record.category || "Treatment", type: "select", options: ["Hair Cut & Styling", "Treatment", "Beauty Care"], required: true },
      { key: "price", label: "Harga Normal", value: record.price || "", type: "number", min: 0, required: true },
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
      { key: "specialty", label: "Keahlian Utama", value: record.specialty || "Hair Cut & Styling", type: "select", options: ["Hair Cut & Styling", "Colour & Treatment", "Beauty Care"], required: true },
      { key: "status", label: "Status", value: record.status || "Aktif", type: "select", options: ["Aktif", "Cuti", "Nonaktif"], required: true },
    ],
    "users-access": [
      { key: "id", label: "ID Pengguna", value: record.id || "AUTO", disabled: true },
      { key: "name", label: "Nama", value: record.name || "", required: true },
      { key: "username", label: "Username", value: record.username || "", required: true },
      { key: "role", label: "Peran", value: record.role || "Kasir", type: "select", options: ["Administrator", "Supervisor", "Kasir"], required: true },
      { key: "access", label: "Hak Akses", value: record.access || "POS, pelanggan, transaksi", required: true },
      { key: "status", label: "Status", value: record.status || "Aktif", type: "select", options: ["Aktif", "Nonaktif"], required: true },
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
    field.placeholder ? `placeholder="${cmsEscape(field.placeholder)}"` : "",
  ].filter(Boolean).join(" ");
  const control = field.type === "select"
    ? `<select ${attributes}>${options.map((option) => `<option value="${cmsEscape(option.value)}" ${String(option.value) === String(field.value) ? "selected" : ""}>${cmsEscape(option.label)}</option>`).join("")}</select>`
    : `<input type="${field.type || "text"}" value="${cmsEscape(field.value)}" ${attributes} />`;
  return `<label class="cms-field"><span>${cmsEscape(field.label)}${field.required ? " *" : ""}</span>${control}<small class="cms-field-error" aria-live="polite"></small></label>`;
}

function renderCmsFormPage(page, record) {
  const isEdit = Boolean(record);
  const fields = getCmsFormFields(page, record);
  return `
    <section class="cms-page-head">
      <div><span class="cms-breadcrumb">${CMS_PAGE_LABELS[page]} / ${isEdit ? "Edit" : "Tambah"}</span><h3>${isEdit ? `Edit ${record.name || record.id}` : `Tambah ${CMS_PAGE_LABELS[page]}`}</h3><p>${isEdit ? "Perbarui data yang dipilih." : "Masukkan data baru untuk operasional salon."}</p></div>
      <button class="cms-secondary-button" type="button" data-cms-action="back-list">‹ Kembali</button>
    </section>
    <form class="cms-form-panel" id="cms-record-form" novalidate>
      <div class="cms-form-grid">${fields.map(renderCmsField).join("")}</div>
      ${page === "services" ? renderCmsServiceUpgradeSection(record) : ""}
      ${page === "membership-plans" ? renderCmsMembershipBonusSection(record) : ""}
      <div class="cms-form-actions"><button class="cms-secondary-button" type="button" data-cms-action="back-list">Batal</button><button class="cms-primary-button" type="button" data-cms-action="save">Simpan</button></div>
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
    form.querySelector(".cms-field.invalid input, .cms-field.invalid select")?.focus();
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
      reminderDate: values.reminderDate || "-",
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

  if (page === "users-access") {
    const target = record || { id: `USR-${String(CMS_USERS.length + 1).padStart(3, "0")}` };
    Object.assign(target, values, { id: target.id });
    if (!record) CMS_USERS.push(target);
  }

  cmsViewMode = "list";
  cmsSelectedRecordId = null;
  cmsPageNumbers[page] = 1;
  renderCmsCurrentView();
  showToast(`${CMS_PAGE_LABELS[page]} berhasil disimpan`);
  return true;
}

function renderCmsSettings() {
  return `
    <section class="cms-page-head"><div><h3>Pengaturan Salon</h3><p>Identitas salon, informasi struk, metode pembayaran, dan aturan reminder kasir.</p></div></section>
    <form class="cms-form-panel cms-settings-form">
      <div class="cms-form-section"><h4>Identitas Salon</h4><div class="cms-form-grid">
        <label class="cms-field"><span>Nama Salon</span><input value="JMM Salon" /></label>
        <label class="cms-field"><span>Cabang</span><input value="Kartini Surabaya" /></label>
        <label class="cms-field"><span>Alamat</span><input value="Jl. Kartini No.100 Surabaya" /></label>
        <label class="cms-field"><span>Telepon / WhatsApp</span><input value="0851 3788 0880" /></label>
        <label class="cms-field"><span>Instagram</span><input value="@jmmsalon_kartinisby" /></label>
        <label class="cms-field"><span>Zona Waktu</span><select><option>Asia/Jakarta (WIB)</option></select></label>
      </div></div>
      <div class="cms-form-section"><h4>Aturan Kasir</h4><div class="cms-form-grid">
        <label class="cms-field"><span>Metode Pembayaran</span><input value="Tunai, QRIS" /></label>
        <label class="cms-field"><span>Reminder Setelah Jasa</span><input type="number" value="7" /></label>
        <label class="cms-field"><span>Maksimum Item Jasa Sama</span><input type="number" value="2" /></label>
        <label class="cms-field"><span>Diskon Per Item</span><input value="5%, 10%, dapat digabung" /></label>
      </div></div>
      <div class="cms-form-actions"><button class="cms-primary-button" type="button" data-cms-action="save-settings">Simpan Pengaturan</button></div>
    </form>`;
}

function renderCmsDashboard() {
  const completedTransactions = salesTransactions.filter((t) => t.status !== "Pending");
  const latestTransactionDate = completedTransactions.map((transaction) => transaction.dateRaw).sort().at(-1);
  const todayTransactions = completedTransactions.filter((transaction) => transaction.dateRaw === latestTransactionDate);
  const totalRevenue = completedTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalPending = getPendingTransactions().length;
  const totalMembers = customers.filter((c) => c.status === "Member").length;

  return `
    <section class="cms-page-head"><div><h3>Ringkasan Operasional</h3><p>Pantau aktivitas kasir, pelanggan, membership, dan transaksi salon.</p></div></section>
    <div class="cms-dashboard-grid">
      <div class="cms-card"><h4>Total penjualan</h4><strong>${formatMoney(totalRevenue)}</strong></div>
      <div class="cms-card"><h4>Transaksi hari ini</h4><strong>${todayTransactions.length}</strong></div>
      <div class="cms-card"><h4>Pending</h4><strong>${totalPending}</strong></div>
      <div class="cms-card"><h4>Member</h4><strong>${totalMembers}</strong></div>
    </div>
    <div class="cms-table-wrap">
      <table class="cms-table">
        <thead><tr><th>ID</th><th>Waktu</th><th>Pelanggan</th><th>Cabang Transaksi</th><th>Cabang Membership</th><th>Metode</th><th>Total</th></tr></thead>
        <tbody>
          ${todayTransactions.length
            ? todayTransactions.slice(0, 5).map((t) => `<tr><td>${t.id}</td><td>${t.time}</td><td>${t.customer}</td><td>${getTransactionBranch(t)}</td><td>${getTransactionMemberBranch(t) || "—"}</td><td>${t.payment}</td><td>${formatMoney(t.amount)}</td></tr>`).join("")
            : `<tr><td colspan="7" style="text-align:center;color:var(--muted);">Belum ada transaksi hari ini</td></tr>`}
        </tbody>
      </table>
    </div>
  `;
}

function renderCmsPage(page) {
  activeCmsPage = page;
  cmsViewMode = "list";
  cmsSelectedRecordId = null;
  cmsSearchTerm = "";
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
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
    const customer = customers.find((item) => item.id === id);
    showToast(`WhatsApp reminder untuk ${customer?.name || "pelanggan"} dibuka`);
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
    if (!commissionRateInput.hasAttribute("data-commission-activity") && profile[serviceId]) {
      profile[serviceId].rate = Math.min(100, Math.max(0, Number(commissionRateInput.value) || 0));
    } else if (activity && profile[serviceId]?.activities?.[activity]) {
      profile[serviceId].activities[activity].rate = Math.min(100, Math.max(0, Number(commissionRateInput.value) || 0));
    }
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

  const commissionToggle = event.target.closest("[data-commission-toggle]");
  if (commissionToggle) {
    const serviceId = commissionToggle.dataset.commissionToggle;
    const service = getCmsServices().find((entry) => entry.id === serviceId);
    const activity = service?.actions[Number(commissionToggle.dataset.commissionActivity)];
    const profile = getStaffCommissionProfile(activeCommissionStaffId);
    if (!commissionToggle.hasAttribute("data-commission-activity") && profile[serviceId]) {
      profile[serviceId].enabled = commissionToggle.checked;
    } else if (activity && profile[serviceId]?.activities?.[activity]) {
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
