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
      levels: item.levels || [{ name: "Normal", price: item.price }],
      category: meta.category || (index % 3 === 0 ? "Hair Cut & Styling" : index % 3 === 1 ? "Treatment" : "Beauty Care"),
      status: meta.status || "Aktif",
    };
  });
}

function getCmsStaff() {
  return staffOptions.map((name, index) => {
    const completed = salesTransactions.filter((transaction) => transaction.status !== "Pending" && transaction.items.some((item) => item.staff === name));
    const revenue = completed.reduce((sum, transaction) => sum + transaction.items.filter((item) => item.staff === name).reduce((lineSum, item) => lineSum + item.price * (item.qty || 1), 0), 0);
    return {
      id: `STF-${String(index + 1).padStart(3, "0")}`,
      name,
      phone: `08${12 + (index % 7)} ${String(2400 + index * 137).padStart(4, "0")} ${String(5800 + index * 83).padStart(4, "0")}`,
      specialty: index % 3 === 0 ? "Hair Cut & Styling" : index % 3 === 1 ? "Colour & Treatment" : "Beauty Care",
      transactions: completed.length,
      revenue,
      status: index === 10 ? "Cuti" : "Aktif",
      ...(CMS_STAFF_DETAILS[name] || {}),
    };
  });
}

function getStaffCommissionProfile(staffId) {
  if (staffCommissionProfiles[staffId]) return staffCommissionProfiles[staffId];

  const staffIndex = Math.max(0, getCmsStaff().findIndex((staff) => staff.id === staffId));
  const profile = {};
  getCmsServices().forEach((service, serviceIndex) => {
    const enabled = serviceIndex % 3 === staffIndex % 3 || (serviceIndex + staffIndex) % 7 === 0;
    profile[service.id] = {
      enabled,
      rate: enabled ? [10, 12.5, 15, 17.5, 20][(serviceIndex + staffIndex) % 5] : 10,
    };
  });
  staffCommissionProfiles[staffId] = profile;
  return profile;
}

function renderCmsStaffCommission() {
  const staff = getCmsStaff();
  const selectedStaff = staff.find((person) => person.id === activeCommissionStaffId) || staff[0];
  activeCommissionStaffId = selectedStaff.id;
  const services = getCmsServices();
  const profile = getStaffCommissionProfile(selectedStaff.id);
  const activeCount = services.filter((service) => profile[service.id]?.enabled).length;

  const serviceRows = services.map((service) => {
    const setting = profile[service.id] || { enabled: false, rate: 10 };
    return `
      <article class="cms-commission-item ${setting.enabled ? "enabled" : ""}">
        <div class="cms-commission-service">
          <strong>${service.name}</strong>
          <span>${service.category}</span>
        </div>
        <label class="cms-commission-switch" title="${setting.enabled ? "Nonaktifkan" : "Aktifkan"} ${service.name}">
          <input type="checkbox" data-commission-toggle="${service.id}" ${setting.enabled ? "checked" : ""} />
          <span aria-hidden="true"></span>
          <em>${setting.enabled ? "Aktif" : "Nonaktif"}</em>
        </label>
        <div class="cms-commission-rate">
          ${setting.enabled
            ? `<label><input type="number" min="0" max="100" step="0.5" value="${setting.rate}" data-commission-rate="${service.id}" aria-label="Komisi ${service.name}" /><span>%</span></label>`
            : `<span class="cms-commission-rate-empty" aria-label="Komisi belum aktif">-</span>`}
        </div>
      </article>`;
  }).join("");

  return `
    <section class="cms-page-head cms-commission-page-head">
      <div>
        <h3>Komisi Petugas</h3>
        <p>Keahlian treatment dan persentase komisi setiap petugas.</p>
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
              ${staff.map((person) => `<option value="${person.id}" ${person.id === selectedStaff.id ? "selected" : ""}>${person.name}</option>`).join("")}
            </select>
          </span>
        </label>
        <div class="cms-commission-overview">
          <span><strong>${activeCount}</strong> treatment aktif</span>
          <span>${selectedStaff.specialty}</span>
        </div>
      </header>
      <div class="cms-commission-grid">${serviceRows}</div>
    </section>`;
}

function getCmsMemberVisits() {
  return customers
    .filter((customer) => getCustomerRewards(customer).length)
    .flatMap((customer) => getMembershipUsageHistory(customer).map((visit, index) => ({
      id: `${customer.id}-${index}`,
      customerId: customer.id,
      customer: customer.name,
      phone: customer.phone,
      service: visit.serviceName,
      branch: visit.branch || getCustomerMemberBranch(customer),
      dateTime: visit.dateTime,
      qty: visit.qty,
      remaining: getCustomerRewards(customer).find((reward) => membershipServiceMatches(reward, visit.serviceName))?.progress || 0,
    })));
}

function getCmsPageRows(page) {
  if (page === "customers") {
    return customers.filter((customer) => customer.id !== "umum").map((customer) => ({
      id: customer.id,
      search: `${customer.code} ${customer.name} ${customer.phone} ${customer.status} ${getCustomerMemberBranch(customer)}`,
      cells: [customer.code, `<strong>${customer.name}</strong>`, customer.phone, cmsBadge(customer.status, customer.status === "Member" ? "gold" : "neutral"), getCustomerMemberBranch(customer) || "—", customer.totalVisits, customer.lastVisit],
    }));
  }
  if (page === "services") {
    return getCmsServices().map((service) => ({
      id: service.id,
      search: `${service.code} ${service.name} ${service.category}`,
      cells: [service.code, `<strong>${service.name}</strong>`, service.category, service.actions.length, service.levels.map((level) => level.name).join(" / "), formatMoney(service.price), cmsBadge(service.status, "success")],
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
      search: `${plan.name} ${plan.serviceName}`,
      cells: [`MBR-${String(index + 1).padStart(3, "0")}`, `<strong>${plan.name}</strong>`, plan.serviceName, `${plan.target} kali`, formatMoney(plan.price), formatMoney(Math.round(plan.price / plan.target)), cmsBadge(plan.status || "Aktif", (plan.status || "Aktif") === "Aktif" ? "success" : "neutral")],
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
      search: `${staff.id} ${staff.name} ${staff.specialty}`,
      cells: [staff.id, `<strong>${staff.name}</strong>`, staff.phone, staff.specialty, staff.transactions, formatMoney(staff.revenue), cmsBadge(staff.status, staff.status === "Aktif" ? "success" : "warning")],
    }));
  }
  if (page === "sales" || page === "sales-report") {
    return salesTransactions.filter((transaction) => page === "sales" || transaction.status !== "Pending").map((transaction) => ({
      id: transaction.id,
      search: `${transaction.id} ${transaction.customer} ${transaction.staff} ${transaction.payment} ${getTransactionMemberBranch(transaction)}`,
      cells: [transaction.id, `${transaction.date}<small>${transaction.time}</small>`, `<strong>${transaction.customer}</strong>`, transaction.staff, cmsBadge(transaction.payment, "gold"), getTransactionMemberBranch(transaction) || "—", formatMoney(transaction.amount), cmsBadge(transaction.status, transaction.status === "Pending" ? "warning" : "success")],
    }));
  }
  if (page === "pending") {
    return getPendingTransactions().map((transaction) => ({
      id: transaction.id,
      search: `${transaction.id} ${transaction.customer} ${transaction.staff} ${getTransactionMemberBranch(transaction)}`,
      cells: [transaction.id, `${transaction.date}<small>${transaction.time}</small>`, `<strong>${transaction.customer}</strong>`, transaction.staff, `${transaction.items.length} item`, getTransactionMemberBranch(transaction) || "—", formatMoney(transaction.dp || 0), formatMoney(transaction.amount), cmsBadge("Pending", "warning")],
    }));
  }
  if (page === "reminders") {
    return customers.filter((customer) => customer.id !== "umum").map((customer, index) => ({
      id: customer.id,
      search: `${customer.name} ${customer.phone} ${customer.lastVisit}`,
      cells: [`<strong>${customer.name}</strong>`, customer.phone, customer.lastVisit, customer.reminderDate, customer.status, cmsBadge(index % 3 === 0 ? "Sudah dihubungi" : "Belum dihubungi", index % 3 === 0 ? "success" : "warning")],
    }));
  }
  if (page === "members") {
    return customers.filter((customer) => getCustomerRewards(customer).length).map((customer) => {
      const rewards = getCustomerRewards(customer);
      return {
        id: customer.id,
        search: `${customer.name} ${customer.phone} ${getCustomerMemberBranch(customer)} ${rewards.map((reward) => getRewardName(reward)).join(" ")}`,
        cells: [`<strong>${customer.name}</strong>`, customer.phone, getCustomerMemberBranch(customer), rewards.length, rewards.map((reward) => `${getRewardName(reward)} ${reward.progress}/${reward.target}`).join(" · "), customer.totalVisits, cmsBadge("Aktif", "success")],
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
      search: `${transaction.id} ${transaction.customer} ${transaction.payment} ${getTransactionMemberBranch(transaction)}`,
      cells: [transaction.date, transaction.id, transaction.customer, transaction.payment, getTransactionMemberBranch(transaction) || "—", formatMoney(transaction.dp || 0), formatMoney(transaction.reward || 0), formatMoney(transaction.amount)],
    }));
  }
  if (page === "staff-commission") {
    return getCmsStaff().filter((staff) => staff.transactions).map((staff) => ({
      id: staff.id,
      search: `${staff.name} ${staff.specialty}`,
      cells: [`<strong>${staff.name}</strong>`, staff.specialty, staff.transactions, formatMoney(staff.revenue), "10%", formatMoney(Math.round(staff.revenue * 0.1))],
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
    customers: { subtitle: "Kelola profil, nomor HP, status member, cabang, kunjungan, dan reminder pelanggan.", headers: ["Kode", "Nama", "Nomor HP", "Status", "Cabang Member", "Kunjungan", "Terakhir"], add: "Tambah Pelanggan", search: "Cari nama, nomor HP, cabang, atau kode..." },
    services: { subtitle: "Daftar jasa yang tampil di POS beserta level harga dan aktivitas pengerjaannya.", headers: ["Kode", "Nama Jasa", "Kategori", "Aktivitas", "Level", "Harga Mulai", "Status"], add: "Tambah Jasa", search: "Cari jasa atau kategori..." },
    "service-activities": { subtitle: "Atur langkah kerja setiap jasa agar kasir dapat memilih satu atau beberapa petugas per aktivitas.", headers: ["Jasa", "Urutan Aktivitas", "Jumlah", "Petugas Tersedia", "Status"], add: "Tambah Aktivitas", search: "Cari jasa atau aktivitas..." },
    "products-stock": { subtitle: "Produk retail yang tersedia di POS, harga jual, supplier, dan posisi stok.", headers: ["Kode", "Produk", "Kategori", "Supplier", "Harga Pokok", "Harga Jual", "Stok", "Status"], add: "Tambah Produk", search: "Cari produk, kategori, atau supplier..." },
    "membership-plans": { subtitle: "Paket kuota treatment yang dapat dibeli dan digunakan pelanggan dari POS.", headers: ["Kode", "Paket", "Jasa", "Kuota", "Harga Paket", "Harga / Kuota", "Status"], add: "Tambah Paket", search: "Cari paket atau jasa member..." },
    promotions: { subtitle: "Konfigurasi diskon per item jasa yang dapat dipilih kasir setelah item masuk keranjang.", headers: ["Program", "Nilai", "Berlaku Untuk", "Bisa Digabung", "Status"], add: "Tambah Promo", search: "Cari promo atau cakupan..." },
    staff: { subtitle: "Petugas yang dapat ditugaskan ke setiap aktivitas jasa di POS.", headers: ["Kode", "Nama", "Nomor HP", "Keahlian", "Transaksi", "Nilai Jasa", "Status"], add: "Tambah Petugas", search: "Cari petugas atau keahlian..." },
    sales: { subtitle: "Seluruh transaksi selesai dan pending dari kasir, termasuk pemakaian member dan cabangnya.", headers: ["No. Nota", "Tanggal", "Pelanggan", "Petugas Utama", "Pembayaran", "Cabang Member", "Total", "Status"], search: "Cari no. nota, pelanggan, petugas, atau cabang..." },
    pending: { subtitle: "Draft transaksi kasir, termasuk cabang asal member yang dipakai.", headers: ["No. Draft", "Tanggal", "Pelanggan", "Petugas", "Isi", "Cabang Member", "DP", "Total", "Status"], search: "Cari draft, pelanggan, atau cabang..." },
    reminders: { subtitle: "Pelanggan yang perlu dihubungi tujuh hari setelah jasa terakhir dan status follow-up WhatsApp.", headers: ["Pelanggan", "Nomor HP", "Jasa Terakhir", "Jadwal Reminder", "Keanggotaan", "Status Kontak"], search: "Cari pelanggan atau nomor HP..." },
    members: { subtitle: "Daftar pelanggan dengan paket member aktif, cabang asal, dan sisa kuota treatment.", headers: ["Pelanggan", "Nomor HP", "Cabang Member", "Paket Aktif", "Sisa Kuota", "Total Kunjungan", "Status"], search: "Cari pelanggan, cabang, atau paket member..." },
    "member-visits": { subtitle: "Riwayat penggunaan kuota membership per pelanggan, treatment, dan cabang.", headers: ["Tanggal & Waktu", "Pelanggan", "Membership", "Cabang Member", "Pemakaian", "Status"], search: "Cari pelanggan, cabang, atau membership..." },
    "sales-report": { subtitle: "Rekap transaksi selesai beserta cabang member yang digunakan.", headers: ["No. Nota", "Tanggal", "Pelanggan", "Petugas", "Pembayaran", "Cabang Member", "Total", "Status"], search: "Cari transaksi laporan atau cabang..." },
    "revenue-report": { subtitle: "Rincian pendapatan kasir setelah DP dan pemakaian kuota member.", headers: ["Tanggal", "No. Nota", "Pelanggan", "Metode", "Cabang Member", "DP", "Member", "Pendapatan"], search: "Cari transaksi, metode, atau cabang..." },
    "stock-report": { subtitle: "Laporan posisi stok produk dan peringatan produk di bawah batas minimum.", headers: ["Kode", "Produk", "Kategori", "Supplier", "Harga Pokok", "Harga Jual", "Stok", "Status"], search: "Cari produk pada laporan stok..." },
    "staff-commission": { subtitle: "Perhitungan komisi petugas berdasarkan jasa selesai pada transaksi kasir.", headers: ["Petugas", "Keahlian", "Transaksi", "Nilai Jasa", "Tarif", "Komisi"], search: "Cari petugas..." },
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
  return [];
}

function renderCmsSummary(summary) {
  if (!summary.length) return "";
  return `<div class="cms-dashboard-grid cms-summary-grid">${summary.map(([label, value]) => `<div class="cms-card"><h4>${label}</h4><strong>${value}</strong></div>`).join("")}</div>`;
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
  if (page === "member-visits") return getCmsMemberVisits().find((item) => item.id === id);
  if (page === "users-access") return CMS_USERS.find((item) => item.id === id);
  return null;
}

function cmsDetailFields(page, record) {
  if (!record) return [];
  if (["customers", "reminders", "members"].includes(page)) return [["Kode Pelanggan", record.code], ["Nama Pelanggan", record.name], ["Nomor HP", record.phone], ["Status", record.status], ["Cabang Member", getCustomerMemberBranch(record) || "—"], ["Total Kunjungan", `${record.totalVisits} kali`], ["Kunjungan Terakhir", record.lastVisit], ["Jadwal Reminder", record.reminderDate], ["DP Tersimpan", formatMoney(record.dp || 0)]];
  if (["services", "service-activities"].includes(page)) return [["Kode Jasa", record.code], ["Nama Jasa", record.name], ["Kategori", record.category], ["Harga Mulai", formatMoney(record.price)], ["Level Jasa", record.levels.map((level) => `${level.name} (${formatMoney(level.price)})`).join(" · ")], ["Aktivitas", record.actions.join(" → ")], ["Status", record.status]];
  if (["products-stock", "stock-report"].includes(page)) return [["Kode Produk", record.code], ["Nama Produk", record.name], ["Kategori", record.category], ["Supplier", record.supplier], ["Harga Pokok", formatMoney(record.cost)], ["Harga Jual", formatMoney(record.price)], ["Stok", `${record.stock} ${record.unit}`], ["Stok Minimum", `${record.minimum} ${record.unit}`]];
  if (page === "membership-plans") return [["Nama Paket", record.name], ["Jasa", record.serviceName], ["Jumlah Kuota", `${record.target} kali`], ["Harga Paket", formatMoney(record.price)], ["Harga per Kuota", formatMoney(Math.round(record.price / record.target))], ["Status", record.status || "Aktif"]];
  if (page === "promotions") return [["Nama Program", record.name], ["Nilai Diskon", record.value], ["Berlaku Untuk", record.scope], ["Bisa Digabung", record.combinable], ["Status", record.status]];
  if (["staff", "staff-commission"].includes(page)) return [["Kode Petugas", record.id], ["Nama Petugas", record.name], ["Nomor HP", record.phone], ["Keahlian", record.specialty], ["Transaksi Selesai", record.transactions], ["Nilai Jasa", formatMoney(record.revenue)], ["Estimasi Komisi", formatMoney(Math.round(record.revenue * 0.1))], ["Status", record.status]];
  if (page === "users-access") return [["ID Pengguna", record.id], ["Nama", record.name], ["Username", record.username], ["Peran", record.role], ["Hak Akses", record.access], ["Status", record.status]];
  if (page === "member-visits") return [["Pelanggan", record.customer], ["Nomor HP", record.phone], ["Membership", record.service], ["Cabang Member", record.branch], ["Waktu Pemakaian", record.dateTime], ["Kuota Dipakai", record.qty], ["Status", "Terpakai"]];
  if (["sales", "pending", "sales-report", "revenue-report"].includes(page)) return [["No. Dokumen", record.id], ["Tanggal", `${record.date} · ${record.time}`], ["Pelanggan", record.customer], ["Petugas Utama", record.staff], ["Pembayaran", record.payment], ["Cabang Member", getTransactionMemberBranch(record) || "—"], ["Status", record.status], ["DP", formatMoney(record.dp || 0)], ["Pemakaian Member", formatMoney(record.reward || 0)], ["Total", formatMoney(record.amount)]];
  return [];
}

function renderCmsTransactionItems(transaction) {
  if (!transaction?.items) return "";
  return `<section class="cms-detail-section"><h4>Rincian Transaksi</h4><div class="cms-transaction-lines">${transaction.items.map((line) => {
    const catalog = findCatalogItem(line);
    const actions = line.type === "service" ? getServiceActions(catalog || line) : [];
    const memberUsage = line.memberFree || line.memberUpgrade ? `<small>Pemakaian Member · ${line.memberBranch || getTransactionMemberBranch(transaction) || "Cabang belum ditentukan"}</small>` : "";
    return `<div class="cms-transaction-line"><div><strong>${line.qty || 1}x ${line.name}</strong>${line.type === "service" ? actions.map((action) => `<small>${action} By : ${line.staff || "Belum dipilih"}</small>`).join("") : line.type === "product" ? `<small>Produk retail</small>` : `<small>Paket membership</small>`}${memberUsage}</div><strong>${formatMoney((line.price || 0) * (line.qty || 1))}</strong></div>`;
  }).join("")}</div></section>`;
}

function renderCmsMemberPackages(customer) {
  const rewards = getCustomerRewards(customer);
  if (!rewards.length) return "";
  return `<section class="cms-detail-section"><h4>Membership Dimiliki</h4><div class="cms-package-list">${rewards.map((reward) => `<div><span><strong>${getRewardName(reward, { withMember: true })}</strong><small>${getCustomerMemberBranch(customer)} · ${reward.progress} dari ${reward.target} kuota tersisa</small></span><b>${reward.progress}/${reward.target}</b></div>`).join("")}</div></section>`;
}

function renderCmsDetailPage(page, record) {
  const fields = cmsDetailFields(page, record);
  const title = record?.name || record?.customer || record?.id || "Detail Data";
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
      { key: "memberBranch", label: "Cabang Member", value: record.memberBranch || "", type: "select", options: [cmsOption("", "Tidak berlaku"), "Cabang Kartini", "Cabang Mulyosari", "Cabang Citraland"] },
      { key: "reminderDate", label: "Jadwal Reminder", value: record.reminderDate === "-" ? "" : record.reminderDate || "", placeholder: "Contoh: 04 Jul 2026" },
      { key: "dp", label: "DP Tersimpan", value: record.dp || 0, type: "number", min: 0 },
    ],
    services: [
      { key: "code", label: "Kode Jasa", value: record.code || "AUTO", disabled: true },
      { key: "name", label: "Nama Jasa", value: record.name || "", required: true },
      { key: "category", label: "Kategori", value: record.category || "Treatment", type: "select", options: ["Hair Cut & Styling", "Treatment", "Beauty Care"], required: true },
      { key: "price", label: "Harga Normal", value: record.price || "", type: "number", min: 0, required: true },
      { key: "premiumPrice", label: "Harga Premium (opsional)", value: record.levels?.[1]?.price || "", type: "number", min: 0 },
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
      rewards: null,
    };
    Object.assign(target, {
      name: values.name,
      phone: values.phone,
      status: values.status,
      type: values.status === "Member" ? "member" : "non-member",
      memberBranch: values.status === "Member" ? values.memberBranch || "Cabang belum ditentukan" : "",
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
    const premiumPrice = cmsNumber(values.premiumPrice);
    Object.assign(target, {
      name: values.name,
      price: normalPrice,
      levels: premiumPrice > normalPrice
        ? [{ id: "normal", name: "Normal", price: normalPrice }, { id: "premium", name: "Premium", price: premiumPrice }]
        : [{ id: "normal", name: "Normal", price: normalPrice }],
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
    Object.assign(target, {
      name: values.name,
      serviceId: values.serviceId,
      serviceName: service?.name || "Jasa",
      target: Math.max(1, cmsNumber(values.target)),
      price: cmsNumber(values.price),
      status: values.status,
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
    if (previousName && previousName !== values.name) delete CMS_STAFF_DETAILS[previousName];
    CMS_STAFF_DETAILS[values.name] = {
      id: record?.id || `STF-${String(staffOptions.length).padStart(3, "0")}`,
      phone: values.phone,
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
        <thead><tr><th>ID</th><th>Waktu</th><th>Pelanggan</th><th>Cabang Member</th><th>Metode</th><th>Total</th></tr></thead>
        <tbody>
          ${todayTransactions.length
            ? todayTransactions.slice(0, 5).map((t) => `<tr><td>${t.id}</td><td>${t.time}</td><td>${t.customer}</td><td>${getTransactionMemberBranch(t) || "—"}</td><td>${t.payment}</td><td>${formatMoney(t.amount)}</td></tr>`).join("")
            : `<tr><td colspan="6" style="text-align:center;color:var(--muted);">Belum ada transaksi hari ini</td></tr>`}
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
  if (action === "paginate") {
    cmsPageNumbers[activeCmsPage] = Number(id) || 1;
    renderCmsCurrentView();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return;
  }
  if (action === "add") {
    cmsViewMode = "form";
    cmsSelectedRecordId = null;
    renderCmsCurrentView();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return;
  }
  if (action === "edit") {
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
    showToast(`Komisi ${staff?.name || "petugas"} tersimpan`);
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
  }

  const commissionRateInput = event.target.closest("[data-commission-rate]");
  if (commissionRateInput) {
    const serviceId = commissionRateInput.dataset.commissionRate;
    const profile = getStaffCommissionProfile(activeCommissionStaffId);
    profile[serviceId].rate = Math.min(100, Math.max(0, Number(commissionRateInput.value) || 0));
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
        const name = (button.dataset.staff || button.dataset.actionStaff || "").toLowerCase();
        button.style.display = name.includes(term) ? "" : "none";
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
  const staffSelect = event.target.closest("#cms-commission-staff-select");
  if (staffSelect) {
    activeCommissionStaffId = staffSelect.value;
    renderCmsCurrentView();
    return;
  }

  const commissionToggle = event.target.closest("[data-commission-toggle]");
  if (commissionToggle) {
    const serviceId = commissionToggle.dataset.commissionToggle;
    const profile = getStaffCommissionProfile(activeCommissionStaffId);
    profile[serviceId].enabled = commissionToggle.checked;
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
