const membershipPlans = [
  {
    id: "member-detok-rontok",
    name: "Member Detok Rontok",
    serviceId: "detok-rontok",
    serviceName: "Detok Rontok",
    price: 900000,
    target: 6,
  },
  {
    id: "member-detok-kombinasi",
    name: "Member Detok Kombinasi",
    serviceId: "detok-kombinasi",
    serviceName: "Detok Kombinasi",
    price: 1400000,
    target: 10,
  },
  { id: "member-gunting-rambut", name: "Member Gunting Rambut", serviceId: "cut", serviceName: "Gunting Rambut", price: 1350000, target: 10 },
  { id: "member-hair-colour", name: "Member Hair Colour", serviceId: "colour", serviceName: "Hair Colour", price: 4050000, target: 10 },
  { id: "member-creambath", name: "Member Creambath", serviceId: "cream", serviceName: "Creambath", price: 1265000, target: 6 },
  { id: "member-keratin", name: "Member Keratin Treatment", serviceId: "keratin", serviceName: "Keratin Treatment", price: 6750000, target: 10 },
  { id: "member-hair-wash", name: "Member Hair Wash", serviceId: "hairwash", serviceName: "Hair Wash", price: 540000, target: 10 },
  { id: "member-smoothing", name: "Member Smoothing", serviceId: "smoothing", serviceName: "Smoothing", price: 5850000, target: 10 },
  { id: "member-hair-spa", name: "Member Hair Spa", serviceId: "hairspa", serviceName: "Hair Spa", price: 1470000, target: 6 },
];

const items = [
  {
    id: "cut",
    type: "service",
    label: "Jasa",
    name: "Gunting Rambut",
    price: 160000,
    levels: [
      { id: "normal", name: "Normal", price: 160000 },
      { id: "premium", name: "Premium", price: 240000 },
    ],
    qty: 0,
  },
  {
    id: "colour",
    type: "service",
    label: "Jasa",
    name: "Hair Colour",
    price: 450000,
    levels: [
      { id: "normal", name: "Normal", price: 450000 },
      { id: "premium", name: "Premium", price: 600000 },
    ],
    qty: 0,
  },
  {
    id: "cream",
    type: "service",
    label: "Jasa",
    name: "Creambath",
    price: 230000,
    levels: [
      { id: "normal", name: "Normal", price: 230000 },
      { id: "premium", name: "Premium", price: 320000 },
    ],
    qty: 0,
  },
  {
    id: "keratin",
    type: "service",
    label: "Jasa",
    name: "Keratin Treatment",
    price: 750000,
    qty: 0,
  },
  {
    id: "blow",
    type: "service",
    label: "Jasa",
    name: "Blow Dry",
    price: 120000,
    qty: 0,
  },
  {
    id: "smoothing",
    type: "service",
    label: "Jasa",
    name: "Smoothing",
    price: 650000,
    levels: [
      { id: "normal", name: "Normal", price: 650000 },
      { id: "premium", name: "Premium", price: 800000 },
    ],
    qty: 0,
  },
  {
    id: "hairspa",
    type: "service",
    label: "Jasa",
    name: "Hair Spa",
    price: 280000,
    qty: 0,
  },
  {
    id: "toning",
    type: "service",
    label: "Jasa",
    name: "Hair Toning",
    price: 320000,
    qty: 0,
  },
  {
    id: "perm",
    type: "service",
    label: "Jasa",
    name: "Digital Perm",
    price: 850000,
    qty: 0,
  },
  {
    id: "manicure",
    type: "service",
    label: "Jasa",
    name: "Manicure",
    price: 110000,
    qty: 0,
  },
  {
    id: "pedicure",
    type: "service",
    label: "Jasa",
    name: "Pedicure",
    price: 135000,
    qty: 0,
  },
  {
    id: "makeup",
    type: "service",
    label: "Jasa",
    name: "Make Up",
    price: 500000,
    qty: 0,
  },
  {
    id: "hairwash",
    type: "service",
    label: "Jasa",
    name: "Hair Wash",
    price: 60000,
    qty: 0,
  },
  {
    id: "blowcatok",
    type: "service",
    label: "Jasa",
    name: "Blow Catok",
    price: 180000,
    qty: 0,
  },
  {
    id: "highlight",
    type: "service",
    label: "Jasa",
    name: "Highlight",
    price: 520000,
    qty: 0,
  },
  {
    id: "rebonding",
    type: "service",
    label: "Jasa",
    name: "Rebonding",
    price: 700000,
    qty: 0,
  },
  {
    id: "hairmask-service",
    type: "service",
    label: "Jasa",
    name: "Hair Mask",
    price: 210000,
    qty: 0,
  },
  {
    id: "totok",
    type: "service",
    label: "Jasa",
    name: "Totok Wajah",
    price: 175000,
    qty: 0,
  },
  {
    id: "kids-cut",
    type: "service",
    label: "Jasa",
    name: "Kids Hair Cut",
    price: 95000,
    qty: 0,
  },
  {
    id: "hair-extension",
    type: "service",
    label: "Jasa",
    name: "Hair Extension",
    price: 1200000,
    qty: 0,
  },
  {
    id: "detok-rontok",
    type: "service",
    label: "Jasa",
    name: "Detok Rontok",
    price: 180000,
    levels: [
      { id: "normal", name: "Normal", price: 180000 },
      { id: "premium", name: "Premium", price: 280000 },
    ],
    qty: 0,
  },
  {
    id: "detok-kombinasi",
    type: "service",
    label: "Jasa",
    name: "Detok Kombinasi",
    price: 240000,
    levels: [
      { id: "normal", name: "Normal", price: 240000 },
      { id: "premium", name: "Premium", price: 360000 },
    ],
    qty: 0,
  },
  {
    id: "shampoo",
    type: "product",
    label: "Produk",
    name: "Shampoo Keratin",
    price: 95000,
    qty: 0,
  },
  {
    id: "vitamin",
    type: "product",
    label: "Produk",
    name: "Vitamin Rambut",
    price: 80000,
    qty: 0,
  },
  {
    id: "tonic",
    type: "product",
    label: "Produk",
    name: "Hair Tonic",
    price: 125000,
    qty: 0,
  },
  {
    id: "conditioner",
    type: "product",
    label: "Produk",
    name: "Conditioner Silk",
    price: 90000,
    qty: 0,
  },
  {
    id: "mask",
    type: "product",
    label: "Produk",
    name: "Hair Mask Aloe",
    price: 150000,
    qty: 0,
  },
  {
    id: "serum",
    type: "product",
    label: "Produk",
    name: "Serum Anti Frizz",
    price: 175000,
    qty: 0,
  },
  {
    id: "wax",
    type: "product",
    label: "Produk",
    name: "Styling Wax",
    price: 70000,
    qty: 0,
  },
  {
    id: "spray",
    type: "product",
    label: "Produk",
    name: "Hair Spray",
    price: 85000,
    qty: 0,
  },
  {
    id: "mousse",
    type: "product",
    label: "Produk",
    name: "Volume Mousse",
    price: 99000,
    qty: 0,
  },
  {
    id: "argan",
    type: "product",
    label: "Produk",
    name: "Argan Oil",
    price: 185000,
    qty: 0,
  },
  {
    id: "dry-shampoo",
    type: "product",
    label: "Produk",
    name: "Dry Shampoo",
    price: 115000,
    qty: 0,
  },
  {
    id: "heat-protect",
    type: "product",
    label: "Produk",
    name: "Heat Protector",
    price: 145000,
    qty: 0,
  },
  {
    id: "colour-shampoo",
    type: "product",
    label: "Produk",
    name: "Colour Shampoo",
    price: 135000,
    qty: 0,
  },
  {
    id: "scalp-scrub",
    type: "product",
    label: "Produk",
    name: "Scalp Scrub",
    price: 155000,
    qty: 0,
  },
  {
    id: "leave-in",
    type: "product",
    label: "Produk",
    name: "Leave-in Cream",
    price: 120000,
    qty: 0,
  },
  {
    id: "curl-cream",
    type: "product",
    label: "Produk",
    name: "Curl Cream",
    price: 140000,
    qty: 0,
  },
  {
    id: "repair-ampoule",
    type: "product",
    label: "Produk",
    name: "Repair Ampoule",
    price: 210000,
    qty: 0,
  },
  {
    id: "shine-mist",
    type: "product",
    label: "Produk",
    name: "Shine Mist",
    price: 98000,
    qty: 0,
  },
  {
    id: "root-lift",
    type: "product",
    label: "Produk",
    name: "Root Lift Spray",
    price: 125000,
    qty: 0,
  },
  {
    id: "hair-clip",
    type: "product",
    label: "Produk",
    name: "Hair Clip Set",
    price: 55000,
    qty: 0,
  },
  ...membershipPlans.map((plan) => ({ ...plan, type: "member", label: "Member", qty: 0 })),
];

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const receiptFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 0,
});

const customers = [
  {
    id: "umum",
    code: "CUST.0000",
    name: "UMUM",
    phone: "-",
    status: "Non Member",
    type: "non-member",
    totalVisits: 0,
    lastVisit: "-",
    reminderDate: "-",
    dp: 0,
    rewards: null,
  },
  {
    id: "dewi",
    code: "CUST.0001",
    name: "Dewi Anggraini",
    phone: "0812 3456 7890",
    status: "Member",
    type: "member",
    totalVisits: 18,
    lastVisit: "27 Jun 2026",
    reminderDate: "04 Jul 2026",
    dp: 0,
    rewards: [
      { membershipId: "member-detok-rontok", progress: 4, target: 6 },
      { serviceId: "cut", serviceName: "Gunting Rambut", progress: 10, target: 10 },
      { serviceId: "colour", serviceName: "Hair Colour", progress: 7, target: 10 },
      { serviceId: "cream", serviceName: "Creambath", progress: 4, target: 6 },
    ],
  },
  {
    id: "siti",
    code: "CUST.0002",
    name: "Siti Rahma",
    phone: "0813 2222 8899",
    status: "Member",
    type: "member",
    totalVisits: 12,
    lastVisit: "20 Jun 2026",
    reminderDate: "27 Jun 2026",
    dp: 0,
    rewards: [
      { serviceId: "cream", serviceName: "Creambath", progress: 6, target: 10 },
    ],
  },
  {
    id: "priscila",
    code: "CUST.0003",
    name: "Priscila Tan",
    phone: "0821 9900 1111",
    status: "Non Member",
    type: "non-member",
    totalVisits: 3,
    lastVisit: "13 Jun 2026",
    reminderDate: "20 Jun 2026",
    dp: 0,
    rewards: null,
  },
  {
    id: "nina",
    code: "CUST.0004",
    name: "Nina Septiani",
    phone: "0852 5555 4477",
    status: "Member",
    type: "member",
    totalVisits: 24,
    lastVisit: "18 Jun 2026",
    reminderDate: "25 Jun 2026",
    dp: 150000,
    rewards: [
      { serviceId: "cut", serviceName: "Gunting Rambut", progress: 6, target: 6 },
      { serviceId: "keratin", serviceName: "Keratin Treatment", progress: 4, target: 10 },
    ],
  },
  {
    id: "rika",
    code: "CUST.0005",
    name: "Rika Amelia",
    phone: "0819 7733 4466",
    status: "Member",
    type: "member",
    totalVisits: 10,
    lastVisit: "17 Jun 2026",
    reminderDate: "24 Jun 2026",
    dp: 100000,
    rewards: [
      { serviceId: "hairwash", serviceName: "Hair Wash", progress: 10, target: 10 },
    ],
  },
  {
    id: "maya",
    code: "CUST.0006",
    name: "Maya Putri",
    phone: "0877 4040 7007",
    status: "Member",
    type: "member",
    totalVisits: 16,
    lastVisit: "15 Jun 2026",
    reminderDate: "22 Jun 2026",
    dp: 50000,
    rewards: [
      { serviceId: "keratin", serviceName: "Keratin Treatment", progress: 8, target: 10 },
      { serviceId: "cream", serviceName: "Creambath", progress: 5, target: 6 },
    ],
  },
  {
    id: "lia",
    code: "CUST.0007",
    name: "Lia Kartika",
    phone: "0896 1188 0099",
    status: "Non Member",
    type: "non-member",
    totalVisits: 1,
    lastVisit: "09 Jun 2026",
    reminderDate: "16 Jun 2026",
    dp: 0,
    rewards: null,
  },
  {
    id: "ayu",
    code: "CUST.0008",
    name: "Ayu Lestari",
    phone: "0812 7788 4411",
    status: "Member",
    type: "member",
    totalVisits: 8,
    lastVisit: "08 Jun 2026",
    reminderDate: "15 Jun 2026",
    dp: 0,
    rewards: [
      { serviceId: "cream", serviceName: "Creambath", progress: 8, target: 10 },
    ],
  },
  {
    id: "intan",
    code: "CUST.0009",
    name: "Intan Permata",
    phone: "0822 6060 9911",
    status: "Member",
    type: "member",
    totalVisits: 20,
    lastVisit: "07 Jun 2026",
    reminderDate: "14 Jun 2026",
    dp: 0,
    rewards: [
      { serviceId: "colour", serviceName: "Hair Colour", progress: 10, target: 10 },
      { serviceId: "cut", serviceName: "Gunting Rambut", progress: 3, target: 6 },
    ],
  },
  {
    id: "melati",
    code: "CUST.0010",
    name: "Melati Sari",
    phone: "0856 2000 4433",
    status: "Non Member",
    type: "non-member",
    totalVisits: 2,
    lastVisit: "05 Jun 2026",
    reminderDate: "12 Jun 2026",
    dp: 0,
    reward: null,
  },
  {
    id: "citra",
    code: "CUST.0011",
    name: "Citra Wulandari",
    phone: "0813 9000 7711",
    status: "Member",
    type: "member",
    totalVisits: 31,
    lastVisit: "02 Jun 2026",
    reminderDate: "09 Jun 2026",
    dp: 200000,
    reward: { serviceId: "smoothing", serviceName: "Smoothing", progress: 7, target: 10 },
  },
  {
    id: "salsa",
    code: "CUST.0012",
    name: "Salsa Nadia",
    phone: "0878 3311 2200",
    status: "Member",
    type: "member",
    totalVisits: 5,
    lastVisit: "01 Jun 2026",
    reminderDate: "08 Jun 2026",
    dp: 0,
    reward: { serviceId: "hairspa", serviceName: "Hair Spa", progress: 5, target: 6 },
  },
];

const staffOptions = [
  "Kartini",
  "Wira",
  "Siska",
  "Priscila",
  "Sapriti",
  "Nadya",
  "Dewi",
  "Rani",
  "Yuni",
  "Laras",
  "Tika",
  "Mira",
];

const serviceActionMap = {
  cut: ["Cuci", "Potong", "Styling"],
  colour: ["Cuci", "Aplikasi warna", "Blow"],
  cream: ["Cuci", "Massage", "Steam"],
  keratin: ["Cuci", "Aplikasi keratin", "Catok"],
  blow: ["Cuci", "Blow", "Styling"],
  smoothing: ["Cuci", "Obat smoothing", "Catok"],
  hairspa: ["Cuci", "Massage", "Masker"],
  toning: ["Cuci", "Toning", "Blow"],
  perm: ["Cuci", "Obat perm", "Styling"],
  manicure: ["Prep", "Treatment", "Finishing"],
  pedicure: ["Prep", "Treatment", "Finishing"],
  makeup: ["Base", "Make up", "Finishing"],
  hairwash: ["Cuci", "Massage", "Blow"],
  blowcatok: ["Cuci", "Catok", "Styling"],
  highlight: ["Cuci", "Highlight", "Blow"],
  rebonding: ["Cuci", "Rebonding", "Catok"],
  "hairmask-service": ["Cuci", "Masker", "Blow"],
  totok: ["Cleansing", "Totok", "Finishing"],
  "kids-cut": ["Cuci", "Potong", "Styling"],
  "hair-extension": ["Prep", "Pasang extension", "Styling"],
};

const customerHistories = {
  dewi: [
    ["27 Jun 2026", "Hair Colour + Blow", "Kartini", 450000],
    ["20 Jun 2026", "Creambath", "Wira", 230000],
    ["13 Jun 2026", "Gunting Rambut", "Siska", 160000],
    ["06 Jun 2026", "Keratin Treatment", "Priscila", 750000],
    ["30 Mei 2026", "Gunting Rambut", "Kartini", 160000],
    ["22 Mei 2026", "Hair Spa", "Nadya", 280000],
    ["15 Mei 2026", "Hair Wash", "Wira", 60000],
    ["08 Mei 2026", "Blow Dry", "Kartini", 120000],
    ["01 Mei 2026", "Manicure", "Priscila", 110000],
    ["24 Apr 2026", "Creambath", "Wira", 230000],
    ["17 Apr 2026", "Gunting Rambut", "Siska", 160000],
    ["10 Apr 2026", "Hair Colour", "Kartini", 450000],
  ],
  siti: [
    ["20 Jun 2026", "Creambath", "Wira", 230000],
    ["12 Jun 2026", "Hair Spa", "Nadya", 280000],
    ["05 Jun 2026", "Gunting Rambut", "Siska", 160000],
    ["29 Mei 2026", "Hair Wash", "Kartini", 60000],
    ["22 Mei 2026", "Blow Catok", "Priscila", 180000],
    ["15 Mei 2026", "Creambath", "Wira", 230000],
    ["08 Mei 2026", "Hair Mask", "Nadya", 210000],
    ["01 Mei 2026", "Gunting Rambut", "Siska", 160000],
  ],
  priscila: [
    ["13 Jun 2026", "Hair Wash", "Priscila", 60000],
    ["02 Jun 2026", "Blow Dry", "Kartini", 120000],
    ["18 Mei 2026", "Manicure", "Nadya", 110000],
  ],
  nina: [
    ["18 Jun 2026", "Gunting Rambut", "Wira", 160000],
    ["11 Jun 2026", "Keratin Treatment", "Priscila", 750000],
    ["04 Jun 2026", "Hair Colour", "Kartini", 450000],
    ["28 Mei 2026", "Gunting Rambut", "Siska", 160000],
    ["21 Mei 2026", "Hair Spa", "Wira", 280000],
    ["14 Mei 2026", "Gunting Rambut", "Kartini", 160000],
    ["07 Mei 2026", "Creambath", "Nadya", 230000],
    ["30 Apr 2026", "Gunting Rambut", "Wira", 160000],
    ["23 Apr 2026", "Hair Wash", "Sapriti", 60000],
    ["16 Apr 2026", "Gunting Rambut", "Kartini", 160000],
    ["09 Apr 2026", "Blow Dry", "Priscila", 120000],
    ["02 Apr 2026", "Gunting Rambut", "Siska", 160000],
  ],
  rika: [
    ["17 Jun 2026", "Hair Wash", "Nadya", 60000],
    ["10 Jun 2026", "Smoothing", "Sapriti", 650000],
    ["03 Jun 2026", "Gunting Rambut", "Kartini", 160000],
    ["27 Mei 2026", "Hair Wash", "Wira", 60000],
    ["20 Mei 2026", "Creambath", "Siska", 230000],
    ["13 Mei 2026", "Hair Wash", "Nadya", 60000],
  ],
  maya: [
    ["15 Jun 2026", "Keratin Treatment", "Priscila", 750000],
    ["08 Jun 2026", "Hair Colour", "Kartini", 450000],
    ["01 Jun 2026", "Hair Spa", "Wira", 280000],
    ["25 Mei 2026", "Gunting Rambut", "Siska", 160000],
    ["18 Mei 2026", "Keratin Treatment", "Priscila", 750000],
    ["11 Mei 2026", "Creambath", "Wira", 230000],
    ["04 Mei 2026", "Hair Wash", "Kartini", 60000],
  ],
  lia: [
    ["09 Jun 2026", "Hair Wash", "Kartini", 60000],
  ],
};

let activeFilter = "service";
let selectedCustomer = null;
let selectedPayment = "QRIS";
let customDp = 0;
let cashReceived = 0;
let cardNumber = "";
let activeStaffMenu = null;
let activeStaffAction = null;
let activeDiscountMenu = null;
let activeServiceLevelMenu = null;
let searchTerm = "";
let customerSearchTerm = "";
let dropdownSearchTerm = "";
let pendingSearchTerm = "";
let pendingPopupSearchTerm = "";
let activeDetailCustomerId = "dewi";
let activeConfirmMode = "payment";
let lastReceipt = null;
let receiptReturnView = "pos-view";
let serviceLineCounter = 0;
let activeCmsPage = "dashboard";
let cmsSidebarCollapsed = false;
let cmsViewMode = "list";
let cmsSelectedRecordId = null;
let cmsSearchTerm = "";
const cmsPageNumbers = {};
const cmsRowsPerPage = 6;
let activeCommissionStaffId = "STF-001";
const staffCommissionProfiles = {};
let memberLineCounter = 0;
const serviceCartLines = [];
const memberCartLines = [];
const memberUsage = {};

function formatMoney(value) {
  return formatter.format(value).replace(/\u00a0/g, " ");
}

function blurNativeDateTimePicker() {
  const active = document.activeElement;
  if (active?.matches?.('input[type="date"], input[type="time"]')) {
    active.blur();
  }
}

function getMaxQty(item) {
  if (item.type === "service") return 2;
  return 99;
}

function getServiceLineCount(itemId) {
  return serviceCartLines.filter((line) => line.itemId === itemId).length;
}

function getServiceActions(item) {
  const id = item.itemId || item.id;
  return serviceActionMap[id] || ["Konsultasi", "Treatment", "Finishing"];
}

function createActionStaffs(item, staff = "") {
  return Object.fromEntries(getServiceActions(item).map((action) => [action, staff ? [staff] : []]));
}

function normalizeStaffValue(value, fallback = "") {
  if (Array.isArray(value)) return [...new Set(value.filter(Boolean))];
  if (typeof value === "string" && value) return [value];
  if (staffOptions.includes(fallback)) return [fallback];
  return [];
}

function normalizeActionStaffs(item) {
  const existing = item.actionStaffs || {};
  const fallback = item.staff || "";
  return Object.fromEntries(getServiceActions(item).map((action) => [action, normalizeStaffValue(existing[action], fallback)]));
}

function getActionStaffList(item, action) {
  return normalizeStaffValue(item.actionStaffs?.[action]);
}

function getActionStaffText(staffList) {
  if (!staffList.length) return "Belum dipilih";
  return staffList.join(", ");
}

function getServiceStaffSummary(item) {
  const actions = getServiceActions(item);
  const assignedByAction = actions.map((action) => getActionStaffList(item, action));
  const filled = assignedByAction.filter((staffList) => staffList.length > 0);
  if (!filled.length) return "";

  const unique = [...new Set(filled.flat())];
  if (filled.length === actions.length) {
    const first = [...filled[0]].sort().join("|");
    const allSame = filled.every((staffList) => [...staffList].sort().join("|") === first);
    if (allSame) return filled[0].length === 1 ? `${filled[0][0]} semua` : `${filled[0].length} petugas semua`;
    return `${unique.length} petugas`;
  }

  return `${filled.length}/${actions.length} langkah`;
}

function syncServiceStaffSummary(item) {
  if (item.type !== "service") return;
  item.actionStaffs = normalizeActionStaffs(item);
  item.staff = getServiceStaffSummary(item);
}

function addServiceLine(item, options = {}) {
  if (getServiceLineCount(item.id) >= getMaxQty(item)) {
    showToast("Maksimal 2 untuk tiap jasa");
    return false;
  }

  serviceLineCounter += 1;
  const line = {
    ...item,
    id: `${item.id}-${serviceLineCounter}`,
    itemId: item.id,
    qty: 1,
    staff: "",
    discounts: [],
    baseServicePrice: item.price,
    baseServiceName: item.name,
    serviceLevel: getServiceLevels(item)[0],
    ...options,
  };
  line.price = line.serviceLevel?.price || item.price;
  if (line.baseServiceName) line.name = line.baseServiceName;
  line.actionStaffs = options.actionStaffs || createActionStaffs(line, line.staff);
  syncServiceStaffSummary(line);
  serviceCartLines.push(line);
  return true;
}

function getServiceLevels(item) {
  return Array.isArray(item?.levels) && item.levels.length
    ? item.levels
    : [{ id: "normal", name: "Normal", price: item?.price || 0 }];
}

function getMemberRewardForService(serviceId, customer = selectedCustomer) {
  return getCustomerRewards(customer).find((reward) => getRewardServiceId(reward) === serviceId) || null;
}

function getMemberUnitPrice(reward) {
  const plan = getRewardPlan(reward);
  if (!plan || !plan.target) return 0;
  return Math.round(plan.price / plan.target);
}

function getServiceUpgradeOptions(item) {
  if (item.type !== "service" || !item.memberUsageRewardId) return [];
  const basePrice = item.baseServicePrice || getServiceLevels(item).find((level) => level.id === "normal")?.price || item.price;
  return getServiceLevels(item)
    .filter((level) => level.id !== "normal")
    .map((level) => ({
      ...level,
      topUp: Math.max(0, level.price - basePrice),
    }));
}

function releaseMemberUsage(line) {
  const rewardId = line.memberUsageRewardId;
  if (!rewardId) return;
  memberUsage[rewardId] = Math.max(0, getMemberUsed(rewardId) - 1);
  delete line.memberUsageRewardId;
  delete line.memberUseAmount;
  delete line.memberUpgrade;
  delete line.memberFree;
}

function applyServiceLevel(line, levelId) {
  const level = getServiceLevels(line).find((entry) => entry.id === levelId);
  if (!level) return false;
  const basePrice = line.baseServicePrice || getServiceLevels(line).find((entry) => entry.id === "normal")?.price || line.price;
  const baseName = line.baseServiceName || line.name;

  if (level.id === "normal") {
    line.memberUpgrade = false;
    line.memberFree = true;
    line.serviceLevel = level;
    line.price = basePrice;
    line.name = baseName;
    line.discounts = [];
    return true;
  }

  line.memberUpgrade = true;
  line.memberFree = false;
  line.memberUseAmount = basePrice;
  line.serviceLevel = level;
  line.price = level.price;
  line.name = level.id === "premium" ? `${baseName} Premium` : `${baseName} ${level.name}`;
  line.discounts = [];
  return true;
}

function addMemberLine(item) {
  if (memberCartLines.some((line) => line.itemId === item.id)) {
    showToast("Paket member ini sudah ada di keranjang");
    return false;
  }

  memberLineCounter += 1;
  memberCartLines.push({
    ...item,
    id: `${item.id}-member-${memberLineCounter}`,
    itemId: item.id,
    qty: 1,
    staff: "",
    price: item.price,
    fullPrice: item.price,
  });
  return true;
}

function increaseItem(item) {
  const maxQty = getMaxQty(item);
  if (item.qty >= maxQty) {
    let msg = "Qty sudah maksimal";
    if (item.type === "service") msg = "Maksimal 2 untuk tiap jasa";
    else if (item.type === "member") msg = "Maksimal 1 paket member";
    showToast(msg);
    return false;
  }

  item.qty += 1;
  return true;
}

function addItemToCart(item) {
  if (item.type === "service") return addServiceLine(item);
  if (item.type === "member") return addMemberLine(item);
  return increaseItem(item);
}

function getCartItems() {
  return [...serviceCartLines, ...memberCartLines, ...items.filter((item) => item.type === "product" && item.qty > 0)];
}

function clearMemberUsage() {
  serviceCartLines.forEach((line) => {
    delete line.memberFree;
    delete line.memberUsageRewardId;
    delete line.memberUseAmount;
    delete line.memberUpgrade;
    line.serviceLevel = getServiceLevels(line)[0];
    line.price = line.baseServicePrice || line.price;
  });
  Object.keys(memberUsage).forEach((key) => {
    delete memberUsage[key];
  });
}

function resetCart() {
  serviceCartLines.splice(0, serviceCartLines.length);
  memberCartLines.splice(0, memberCartLines.length);
  items.forEach((item) => {
    item.qty = 0;
    if (item.type === "service" || item.type === "member") item.staff = "";
  });
  clearMemberUsage();
  activeStaffMenu = null;
  activeStaffAction = null;
  activeDiscountMenu = null;
  activeServiceLevelMenu = null;
  customDp = 0;
}

function findCatalogItem(line) {
  const aliases = {
    "Hair Cut": "Gunting Rambut",
  };
  const name = aliases[line.name] || line.name;
  return items.find((item) => item.type === line.type && item.name === name);
}

function getCustomerBadge(customer) {
  if (!customer) return `<span class="badge muted">Kosong</span>`;
  if (customer.type === "non-member") return `<span class="badge muted">Non Member</span>`;
  return `<span class="badge member">Member</span>`;
}

function getCustomerRewards(customer) {
  if (!customer) return [];
  if (Array.isArray(customer.rewards)) return customer.rewards;
  if (customer.reward) return [customer.reward];
  return [];
}

function getMembershipPlan(planId) {
  return membershipPlans.find((plan) => plan.id === planId) || null;
}

function getRewardPlan(reward) {
  if (!reward) return null;
  return (
    getMembershipPlan(reward.membershipId) ||
    membershipPlans.find((plan) => plan.serviceId === reward.serviceId) ||
    null
  );
}

function getRewardId(reward) {
  return reward?.membershipId || getRewardPlan(reward)?.id || reward?.serviceId || "";
}

function getRewardServiceId(reward) {
  return getRewardPlan(reward)?.serviceId || reward?.serviceId || "";
}

function getRewardName(reward, { withMember = false } = {}) {
  const plan = getRewardPlan(reward);
  if (plan) return withMember ? plan.name : plan.serviceName;
  return reward?.serviceName || "Member";
}

function getMemberUsed(rewardOrId) {
  const id = typeof rewardOrId === "string" ? rewardOrId : getRewardId(rewardOrId);
  return memberUsage[id] || 0;
}

function getMemberRemaining(reward) {
  return Math.max(0, reward.progress - getMemberUsed(reward));
}

function getFirstReward(customer) {
  return getCustomerRewards(customer)[0] || null;
}

function refreshMemberBenefits() {
  const benefits = document.querySelector("#member-benefits");
  if (!benefits || !selectedCustomer) return;
  const wasOpen = !benefits.hidden;
  benefits.innerHTML = renderMemberBenefitsDropdown(selectedCustomer);
  benefits.hidden = !wasOpen;
}

function increaseMemberUsage(rewardId) {
  const reward = getCustomerRewards(selectedCustomer).find((entry) => getRewardId(entry) === rewardId);
  if (!reward) return false;
  const serviceId = getRewardServiceId(reward);

  if (getMemberRemaining(reward) <= 0) {
    showToast("Saldo member untuk jasa ini habis");
    return false;
  }

  const serviceLine = serviceCartLines.find((line) => line.itemId === serviceId && !line.memberFree && !line.memberUpgrade);
  if (serviceLine) {
    serviceLine.memberFree = true;
    serviceLine.memberUpgrade = false;
    serviceLine.memberUseAmount = serviceLine.price;
    serviceLine.memberUsageRewardId = rewardId;
    serviceLine.discounts = [];
  } else {
    const service = items.find((item) => item.id === serviceId && item.type === "service");
    if (!service) return false;

    if (getServiceLineCount(serviceId) > 0) {
      showToast("Tambahkan jasa ini dari daftar untuk pemakaian kedua");
      return false;
    }

    const added = addServiceLine(service, {
      memberFree: true,
      memberUsageRewardId: rewardId,
      memberUseAmount: service.price,
      discounts: [],
    });
    if (!added) return false;
  }

  memberUsage[rewardId] = getMemberUsed(rewardId) + 1;
  return true;
}

function decreaseMemberUsage(rewardId) {
  const used = getMemberUsed(rewardId);
  if (used <= 0) return false;

  let lineIndex = -1;
  for (let index = serviceCartLines.length - 1; index >= 0; index -= 1) {
    const line = serviceCartLines[index];
    if (line.memberUsageRewardId === rewardId) {
      lineIndex = index;
      break;
    }
  }
  if (lineIndex < 0) return false;

  delete serviceCartLines[lineIndex].memberFree;
  delete serviceCartLines[lineIndex].memberUsageRewardId;
  delete serviceCartLines[lineIndex].memberUseAmount;
  delete serviceCartLines[lineIndex].memberUpgrade;
  serviceCartLines[lineIndex].serviceLevel = getServiceLevels(serviceCartLines[lineIndex])[0];
  serviceCartLines[lineIndex].price = serviceCartLines[lineIndex].baseServicePrice || serviceCartLines[lineIndex].price;
  serviceCartLines[lineIndex].name = serviceCartLines[lineIndex].baseServiceName || serviceCartLines[lineIndex].name;
  memberUsage[rewardId] = Math.max(0, used - 1);
  return true;
}

function getRewardText(customer) {
  const reward = getFirstReward(customer);
  if (!reward) return "Benefit member belum aktif";
  return `${getRewardName(reward)}: ${reward.progress}/${reward.target} tersisa`;
}

function renderRewardMeter(customer, mode = "normal") {
  const reward = getFirstReward(customer);
  if (!reward) {
    return `
      <div class="reward-meter ${mode} muted">
        <span>Saldo Member</span>
        <strong>Non-member</strong>
        <small>Belum ada saldo member.</small>
      </div>
    `;
  }

  const active = Math.min(reward.progress, reward.target);
  const dots = Array.from({ length: reward.target }, (_, index) => {
    const done = index < active;
    return `<i class="${done ? "done" : ""}"></i>`;
  }).join("");
  const headline = `${active}/${reward.target} kuota tersisa`;

  return `
    <div class="reward-meter ${mode} ${active > 0 ? "ready" : ""}">
      <span>Saldo Member</span>
      <strong>${getRewardName(reward)}</strong>
      <small>${getRewardName(reward)} · ${headline}</small>
      <div class="reward-dots" aria-label="${getRewardName(reward)} ${active} dari ${reward.target}">${dots}</div>
    </div>
  `;
}

function getAppliedReward(selected) {
  const memberItems = selected.filter((item) => item.memberUsageRewardId && item.type === "service");
  if (!memberItems.length) return null;

  const serviceNames = [...new Set(memberItems.map((item) => item.name))];
  const serviceName = serviceNames.length === 1 ? serviceNames[0] : `${memberItems.length} jasa`;

  return {
    label: "Pemakaian Member",
    serviceName,
    amount: memberItems.reduce((sum, item) => sum + (item.memberUpgrade ? item.memberUseAmount || 0 : getLinePayable(item)), 0),
    itemIds: memberItems.map((item) => item.id),
  };
}

function getLineDiscounts(item) {
  if (item.type !== "service" || item.memberFree || item.memberUpgrade) return [];
  return Array.isArray(item.discounts) ? item.discounts : [];
}

function getLineDiscountRate(item) {
  return Math.min(100, getLineDiscounts(item).reduce((sum, rate) => sum + rate, 0));
}

function getLineBaseTotal(item) {
  return item.price * item.qty;
}

function getLineDiscountAmount(item) {
  return Math.round((getLineBaseTotal(item) * getLineDiscountRate(item)) / 100);
}

function getLinePayable(item) {
  return Math.max(0, getLineBaseTotal(item) - getLineDiscountAmount(item));
}

function calculateTotals() {
  const selected = getCartItems();
  const subtotal = selected.reduce((sum, item) => sum + getLineBaseTotal(item), 0);
  const discountAmount = selected.reduce((sum, item) => sum + getLineDiscountAmount(item), 0);
  const reward = getAppliedReward(selected);
  const rewardAmount = reward?.amount || 0;
  const dp = (selectedCustomer?.dp || 0) + customDp;
  const payable = Math.max(0, subtotal - discountAmount - rewardAmount - dp);

  return { selected, subtotal, discountAmount, reward, rewardAmount, dp, payable };
}

function formatReceiptAmount(value) {
  return receiptFormatter.format(value);
}

function getReceiptDateParts(date = new Date()) {
  const pad = (value) => String(value).padStart(2, "0");
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());
  return {
    doc: `KARTINI.${String(year).slice(-2)}${month}${day}001`,
    date: `${day}-${month}-${year}`,
    time: `${hour}:${minute}:${second}`,
  };
}

function getReceiptActionLabel(action, item) {
  if ((item.itemId || item.id) === "cut" && action === "Potong") return "Hair cutting";
  return action;
}

function cloneReceiptItem(item) {
  const actionStaffs = item.type === "service" ? normalizeActionStaffs(item) : {};
  return {
    id: item.id,
    itemId: item.itemId || item.id,
    type: item.type,
    label: item.label,
    name: item.name,
    qty: item.qty,
    price: item.price,
    baseTotal: getLineBaseTotal(item),
    payable: getLinePayable(item),
    discountRate: getLineDiscountRate(item),
    discountAmount: getLineDiscountAmount(item),
    memberFree: Boolean(item.memberFree),
    memberUpgrade: Boolean(item.memberUpgrade),
    serviceLevel: item.serviceLevel?.name || "Normal",
    memberUseAmount: item.memberUseAmount || 0,
    actionStaffs,
    staff: item.staff,
  };
}

function createReceiptSnapshot() {
  const totals = calculateTotals();
  const dateParts = getReceiptDateParts();
  const change = selectedPayment === "Tunai" ? Math.max(0, cashReceived - totals.payable) : 0;
  return {
    ...dateParts,
    status: "Selesai",
    customer: selectedCustomer?.name || "UMUM",
    payment: selectedPayment,
    items: totals.selected.map(cloneReceiptItem),
    subtotal: totals.subtotal,
    discountAmount: totals.discountAmount,
    reward: totals.reward,
    rewardAmount: totals.rewardAmount,
    dp: totals.dp,
    total: totals.payable,
    cashReceived: selectedPayment === "Tunai" ? cashReceived : totals.payable,
    change,
    cardNumber: selectedPayment === "Kartu" ? cardNumber : "",
  };
}

function formatIndonesianDate(date = new Date()) {
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function getNextInvoiceId() {
  const max = salesTransactions.reduce((highest, t) => {
    const num = Number(t.id.replace("POS-", ""));
    return Math.max(highest, Number.isNaN(num) ? 0 : num);
  }, 0);
  return `POS-${String(max + 1).padStart(6, "0")}`;
}

function saveDraftTransaction() {
  const totals = calculateTotals();
  const now = new Date();
  const dateRaw = now.toISOString().split("T")[0];
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const date = formatIndonesianDate(now);
  const staffItem = totals.selected.find((item) => item.type === "service" && item.staff);
  const staff = staffItem?.staff || totals.selected[0]?.staff || selectedCustomer?.name || "UMUM";

  const transaction = {
    id: getNextInvoiceId(),
    time,
    date,
    dateRaw,
    customer: selectedCustomer?.name || "UMUM",
    staff,
    amount: totals.payable,
    payment: selectedPayment,
    items: totals.selected.map((item) => ({
      name: item.name,
      qty: item.qty,
      price: item.price,
      staff: item.staff || "",
      type: item.type,
    })),
    status: "Pending",
    dp: totals.dp,
    reward: totals.rewardAmount,
  };

  salesTransactions.unshift(transaction);
  return transaction;
}

function setReceiptReturn(viewId) {
  receiptReturnView = viewId;
  const backButton = document.querySelector("#receipt-back-cashier");
  if (!backButton) return;
  backButton.textContent = viewId === "sales-view" ? "‹ Kembali ke Detail" : "‹ Kembali ke Kasir";
}

function formatReceiptDateFromText(dateText) {
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    Mei: "05",
    Jun: "06",
    Jul: "07",
    Agu: "08",
    Sep: "09",
    Okt: "10",
    Nov: "11",
    Des: "12",
  };
  const [day, month, year] = dateText.split(" ");
  return `${String(day).padStart(2, "0")}-${months[month] || "01"}-${year}`;
}

function transactionLineToReceiptItem(line, index) {
  const catalogItem = findCatalogItem(line);
  const itemId = catalogItem?.id || `receipt-line-${index}`;
  const qty = line.qty || 1;
  const price = line.price || 0;
  const receiptItem = {
    id: `${itemId}-${index}`,
    itemId,
    type: line.type,
    label: line.type === "service" ? "Jasa" : line.type === "member" ? "Member" : "Produk",
    name: line.name,
    qty,
    price,
    baseTotal: qty * price,
    payable: qty * price,
    discountRate: line.discountRate || 0,
    discountAmount: 0,
    memberFree: Boolean(line.memberFree),
    staff: line.staff || "",
    actionStaffs: {},
  };

  if (line.type === "service") {
    receiptItem.actionStaffs = createActionStaffs({ itemId }, line.staff || "");
  }

  return receiptItem;
}

function createReceiptFromTransaction(transaction) {
  const itemsForReceipt = transaction.items.map(transactionLineToReceiptItem);
  const subtotal = itemsForReceipt.reduce((sum, item) => sum + item.baseTotal, 0);
  const rewardAmount = transaction.reward || 0;
  const dp = transaction.dp || 0;
  const discountAmount = Math.max(0, subtotal - rewardAmount - dp - transaction.amount);

  return {
    doc: transaction.id,
    date: formatReceiptDateFromText(transaction.date),
    time: `${transaction.time}:00`,
    status: transaction.status,
    customer: transaction.customer,
    payment: transaction.payment,
    items: itemsForReceipt,
    subtotal,
    discountAmount,
    reward: rewardAmount ? { serviceName: "Pemakaian Member" } : null,
    rewardAmount,
    dp,
    total: transaction.amount,
    cashReceived: transaction.payment === "Tunai" ? transaction.amount : 0,
    change: 0,
  };
}

function openReceiptFromSalesDetail() {
  const transaction = salesTransactions.find((entry) => entry.id === selectedSalesId);
  if (!transaction) return;

  lastReceipt = createReceiptFromTransaction(transaction);
  setReceiptReturn("sales-view");
  renderReceipt(lastReceipt);
  setView("receipt-view");
}

function renderReceiptItem(item) {
  const actionLines =
    item.type === "service"
      ? getServiceActions(item)
          .map((action) => {
            const staff = getActionStaffText(item.actionStaffs?.[action] || []);
            return `<div class="receipt-subline">${getReceiptActionLabel(action, item)} By : ${staff}</div>`;
          })
          .join("")
      : item.type === "member" && item.staff
        ? `<div class="receipt-subline">Petugas By : ${item.staff}</div>`
        : "";
  const discountLine = item.discountRate ? `<div class="receipt-subline">Diskon : ${item.discountRate}%</div>` : "";
  const memberLine = item.memberUpgrade
    ? `<div class="receipt-subline">Pemakaian Member · ${formatReceiptAmount(item.memberUseAmount || 0)}</div>`
    : item.memberFree
      ? `<div class="receipt-subline">Pemakaian Member</div>`
      : "";
  return `
    <div class="receipt-item">
      <div class="receipt-item-main">
        <span>${item.qty}x ${item.name}${item.serviceLevel && item.serviceLevel !== "Normal" ? ` · ${item.serviceLevel}` : ""}</span>
        <strong>${formatReceiptAmount(item.baseTotal)}</strong>
      </div>
      ${actionLines}
      ${discountLine}
      ${memberLine}
    </div>
  `;
}

function renderReceipt(receipt = lastReceipt) {
  const target = document.querySelector("#receipt-content");
  if (!target || !receipt) return;
  const discountRow = receipt.discountAmount
    ? `<div><span>Diskon</span><strong>- ${formatReceiptAmount(receipt.discountAmount)}</strong></div>`
    : "";
  const rewardRow = receipt.rewardAmount
    ? `<div><span>Member</span><strong>- ${formatReceiptAmount(receipt.rewardAmount)}</strong></div>`
    : "";
  const dpRow = receipt.dp ? `<div><span>DP</span><strong>- ${formatReceiptAmount(receipt.dp)}</strong></div>` : "";

  target.innerHTML = `
    <div class="receipt-shop">
      <h2>JMM Salon</h2>
      <p>Jl. Kartini No.100 Surabaya</p>
      <p>Telpon / Whatsapp: 0851 3788 0880</p>
      <p>Instagram: @jmmsalon_kartinisby</p>
    </div>
    <div class="receipt-separator"></div>
    <div class="receipt-meta">
      <div><span>#Dokumen</span><strong>${receipt.doc}</strong></div>
      <div><span>Pelanggan</span><strong>${receipt.customer}</strong></div>
      <div><span>Tanggal</span><strong>${receipt.date}</strong></div>
      <div><span>Jam</span><strong>${receipt.time}</strong></div>
      <div><span>Pembayaran</span><strong>${receipt.payment}</strong></div>
      ${receipt.cardNumber ? `<div><span>No. Kartu</span><strong>${receipt.cardNumber}</strong></div>` : ""}
      <div><span>Deskripsi</span><strong>-</strong></div>
    </div>
    <div class="receipt-separator"></div>
    <div class="receipt-items">
      ${receipt.items.map(renderReceiptItem).join("")}
    </div>
    <div class="receipt-separator"></div>
    <div class="receipt-total-block">
      <div><span>Subtotal</span><strong>${formatReceiptAmount(receipt.subtotal)}</strong></div>
      ${discountRow}
      ${rewardRow}
      ${dpRow}
      <div><span>Total</span><strong>${formatReceiptAmount(receipt.total)}</strong></div>
      <div><span>Grd Total</span><strong>${formatReceiptAmount(receipt.total)}</strong></div>
      <div><span>${receipt.payment}</span><strong>${formatReceiptAmount(receipt.cashReceived || receipt.total)}</strong></div>
      <div><span>Kembali</span><strong>${formatReceiptAmount(receipt.change || 0)}</strong></div>
    </div>
    <div class="receipt-separator"></div>
    <div class="receipt-footer">
      <p>Thankyou for your Visit!</p>
      <p>Don't forget to tag us on Instagram &</p>
      <p>Rate us on Google Review!</p>
    </div>
  `;
}

function prepareNextTransaction() {
  resetCart();
  selectedCustomer = null;
  selectedPayment = "QRIS";
  cashReceived = 0;
  customDp = 0;
  cardNumber = "";
  activeFilter = "service";
  searchTerm = "";
  dropdownSearchTerm = "";
  const itemSearch = document.querySelector("#item-search");
  if (itemSearch) itemSearch.value = "";
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === activeFilter);
  });
  renderCustomer();
  renderCustomerDropdown();
  updateSearchPlaceholder();
  updateCatalogHeading();
  renderItems();
  setPayment(selectedPayment);
  renderCart();
}

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
  summary.innerHTML = `
    <span>Pelanggan</span>
    <div class="customer-title-row">
      <strong>${selectedCustomer.name}</strong>
      ${selectedCustomer.id === "umum" ? `<button class="customer-edit" type="button" data-edit-umum>Edit</button>` : ""}
    </div>
    <small>${selectedCustomer.phone}</small>
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
              <span>${getRewardName(reward, { withMember: true })} ${remaining}/${reward.target}</span>
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
            <small>${customer.phone}</small>
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
          <div>${getCustomerBadge(customer)}</div>
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
              <span>${getRewardName(reward, { withMember: true })}</span>
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
          <span>${getTransactionItemSummary(transaction)} <small>${transaction.staff ? `· ${transaction.staff}` : ""}</small></span>
          <b>${formatMoney(transaction.amount)}</b>
          <em class="${statusClass}">${transaction.status}</em>
        </button>
      `;
    })
    .join("");
}

function renderItems() {
  const grid = document.querySelector("#item-grid");
  const entries = visibleItems();

  if (!entries.length) {
    grid.innerHTML = `
      <div class="empty-items">
        <strong>Tidak ada hasil</strong>
        <span>Coba kata kunci lain.</span>
      </div>
    `;
    return;
  }

  grid.innerHTML = entries
    .map(
      (item) => {
        const itemClass = "";
        const memberNote = item.type === "member" ? `<span class="member-package-note">${item.target} kali</span>` : "";
        const serviceLevelNote = item.type === "service" && getServiceLevels(item).length > 1 ? `<span class="service-level-note">Normal · Premium</span>` : "";
        return `
        <article class="item-card${itemClass}" data-id="${item.id}">
          <div class="item-card-head">
            <h3>${item.name}</h3>
            ${memberNote}
            ${serviceLevelNote}
          </div>
          <div class="item-bottom">
            <span class="price-stack">
              <span class="price">${formatMoney(item.price)}</span>
            </span>
          </div>
        </article>`;
      },
    )
    .join("");
}

function renderSimpleStaffMenu(item) {
  return `
    <div class="staff-menu">
      <label class="staff-menu-search">
        <input type="search" placeholder="Cari petugas..." autocomplete="off" />
      </label>
      <div class="staff-menu-items">
        ${staffOptions
          .map(
            (staff) =>
              `<button type="button" data-staff="${staff}" data-id="${item.id}">
                <span>${staff}</span>
                ${item.staff === staff ? `<b>Dipilih</b>` : ""}
              </button>`,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderDiscountMenu(item) {
  return `
    <div class="discount-menu discount-input-menu">
      <label class="discount-number">
        <input type="number" inputmode="numeric" min="1" max="100" placeholder="Diskon %" data-discount-input="${item.id}" />
        <span>%</span>
      </label>
      <div class="discount-actions">
        <button type="button" class="discount-cancel" data-discount-cancel>Batal</button>
        <button type="button" class="discount-save" data-discount-save="${item.id}">Simpan</button>
      </div>
    </div>
  `;
}

function renderServiceStaffMenu(item) {
  const actions = getServiceActions(item);
  item.actionStaffs = normalizeActionStaffs(item);
  const assignedCount = actions.filter((action) => getActionStaffList(item, action).length > 0).length;
  return `
    <div class="staff-menu staff-action-menu">
      <div class="staff-menu-head">
        <div>
          <strong>Atur petugas</strong>
          <small>${assignedCount}/${actions.length} langkah terisi</small>
        </div>
        <span>${item.name}</span>
      </div>
      <div class="staff-action-list">
        ${actions
          .map((action) => {
            const selected = getActionStaffList(item, action);
            const selectedText = getActionStaffText(selected);
            const buttonText = selected.length === 0 ? "Pilih" : selected.length === 1 ? selected[0] : `${selected.length} petugas`;
            const actionKey = `${item.id}:${action}`;
            const isOpen = activeStaffAction === actionKey;
            return `
              <div class="staff-action-row">
                <div class="staff-action-title">
                  <div>
                    <strong>${action}</strong>
                    <small>${selectedText}</small>
                  </div>
                  <button type="button" class="staff-action-toggle${selected.length ? " selected" : ""}" data-staff-action-toggle="${action}" data-id="${item.id}">
                    ${buttonText}
                  </button>
                </div>
                ${
                  isOpen
                    ? `<label class="staff-option-search">
                        <input type="search" placeholder="Cari petugas..." autocomplete="off" data-staff-search="${action}" data-id="${item.id}" />
                      </label>
                      <div class="staff-option-list">
                        ${staffOptions
                          .map(
                            (staff) => {
                              const isSelected = selected.includes(staff);
                              return `<button type="button" class="${isSelected ? "active" : ""}" data-staff-action="${action}" data-action-staff="${staff}" data-id="${item.id}">
                                <span>${staff}</span>
                                ${isSelected ? `<b>Dipilih</b>` : ""}
                              </button>`;
                            },
                          )
                          .join("")}
                      </div>`
                    : ""
                }
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderServiceLevelMenu(item) {
  const options = getServiceUpgradeOptions(item);
  if (!options.length) return "";
  const currentLevel = item.serviceLevel?.id || "normal";
  return `
    <div class="service-level-menu">
      <div class="service-level-menu-head">
        <strong>Upgrade treatment</strong>
        <small>Pakai 1 kuota member untuk jasa ini</small>
      </div>
      <button type="button" class="service-level-option${currentLevel === "normal" ? " active" : ""}" data-service-level="normal" data-id="${item.id}">
        <span>Normal</span>
        <small>${formatMoney(item.baseServicePrice || item.price)}</small>
      </button>
      ${options
        .map(
          (level) => `
            <button type="button" class="service-level-option${currentLevel === level.id ? " active" : ""}" data-service-level="${level.id}" data-id="${item.id}">
              <span>${level.name}</span>
              <small>${formatMoney(level.price)} · bayar ${formatMoney(level.topUp)}</small>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderCart() {
  const { selected, discountAmount, reward, rewardAmount, dp, payable } = calculateTotals();
  const list = document.querySelector("#cart-list");

  if (!selected.length) {
    list.innerHTML = `
      <div class="empty-cart">
        <strong>Keranjang kosong</strong>
        <span>Tap jasa, produk, atau paket member untuk mulai transaksi.</span>
      </div>
    `;
  } else {
    list.innerHTML = selected
      .map((item) => {
        const canDiscount = item.type === "service" && !item.memberFree;
        const canUpgrade = item.type === "service" && getServiceUpgradeOptions(item).length > 0;
        const discounts = getLineDiscounts(item);
        const lineBaseTotal = getLineBaseTotal(item);
        const lineTotal = getLinePayable(item);
        const discountMenu = canDiscount && activeDiscountMenu === item.id ? renderDiscountMenu(item) : "";
        const serviceLevelMenu = canUpgrade && activeServiceLevelMenu === item.id ? renderServiceLevelMenu(item) : "";
        const staffMenu = activeStaffMenu === item.id ? (item.type === "service" ? renderServiceStaffMenu(item) : renderSimpleStaffMenu(item)) : "";
        let detail;
        if (item.label === "Jasa") {
          detail = `
            <div class="cart-controls">
              <button class="staff-select" type="button" data-staff-for="${item.id}">
                ${item.staff || "Pilih petugas"}
              </button>
              ${
                !canDiscount
                  ? ""
                  : `<button class="discount-select${discounts.length ? " active" : ""}" type="button" data-discount-for="${item.id}">
                    <span aria-hidden="true">+</span>
                    Diskon
                  </button>`
              }
              ${canUpgrade ? `<button class="service-level-select${item.memberUpgrade ? " active" : ""}" type="button" data-service-level-for="${item.id}">${item.memberUpgrade ? item.serviceLevel.name : "Upgrade"}</button>` : ""}
              ${item.memberUpgrade ? `<span class="reward-note">1 kuota member · bayar selisih</span>` : reward?.itemIds?.includes(item.id) ? `<span class="reward-note">Kuota member dipakai</span>` : ""}
              ${discountMenu}
              ${serviceLevelMenu}
              ${staffMenu}
            </div>
          `;
        } else if (item.label === "Member") {
          detail = `
            <div class="cart-controls">
              <button class="staff-select" type="button" data-staff-for="${item.id}">
                ${item.staff || "Pilih petugas"}
              </button>
              ${staffMenu}
            </div>
          `;
        } else {
          detail = `<span class="cart-note">Quantity produk</span>`;
        }
        return `
          <article class="cart-row">
            <div class="cart-label-row">
              <small>${item.label}</small>
              ${discounts.length ? `<span class="cart-discount-badge" data-clear-discounts="${item.id}">Diskon ${getLineDiscountRate(item)}%</span>` : ""}
            </div>
            <div class="cart-row-top">
              <strong>${item.name}</strong>
              <b class="cart-row-price">
                ${discounts.length ? `<s>${formatMoney(lineBaseTotal)}</s>` : ""}
                <span>${formatMoney(lineTotal)}</span>
              </b>
            </div>
            <div class="cart-row-bottom">
              ${detail}
              <div class="cart-qty" data-id="${item.id}">
                <button type="button" data-delta="-1">−</button>
                <strong>${item.qty}</strong>
                ${item.type === "service" || item.type === "member" ? "" : `<button type="button" data-delta="1" ${item.qty >= getMaxQty(item) ? "disabled" : ""}>+</button>`}
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  const discountLine = document.querySelector("#discount-line");
  const rewardLine = document.querySelector("#reward-line");
  const dpLine = document.querySelector("#dp-line");
  discountLine.hidden = discountAmount === 0;
  rewardLine.hidden = rewardAmount === 0;
  dpLine.hidden = dp === 0;
  document.querySelector("#discount").textContent = `- ${formatMoney(discountAmount)}`;
  document.querySelector("#reward").textContent = `- ${formatMoney(rewardAmount)}`;
  document.querySelector("#reward-label").textContent = reward ? reward.label : "Pemakaian Member";
  document.querySelector("#dp").textContent = `- ${formatMoney(dp)}`;
  document.querySelector("#total").textContent = formatMoney(payable);
  document.querySelector(".cart-head .badge").textContent = `${selected.length} item`;
}

function setPayment(method) {
  selectedPayment = method;
  document.querySelectorAll("[data-payment]").forEach((button) => {
    button.classList.toggle("active", button.dataset.payment === selectedPayment);
  });
}

function renderConfirmationSummary(mode) {
  const summary = document.querySelector("#confirm-summary");
  const { selected, discountAmount, reward, rewardAmount, dp, payable } = calculateTotals();
  const customerDp = selectedCustomer?.dp || 0;
  const customerLabel = selectedCustomer
    ? `${selectedCustomer.name} · ${selectedCustomer.status}`
    : "Pelanggan belum dipilih";

  summary.innerHTML = `
    <div><span>Pelanggan</span><strong>${customerLabel}</strong></div>
    <div><span>Item</span><strong>${selected.length} item</strong></div>
    ${discountAmount ? `<div><span>Diskon Item</span><strong>- ${formatMoney(discountAmount)}</strong></div>` : ""}
    ${rewardAmount ? `<div><span>Pemakaian Member</span><strong>${reward.serviceName} · - ${formatMoney(rewardAmount)}</strong></div>` : ""}
    ${customerDp ? `<div><span>DP Pelanggan</span><strong>- ${formatMoney(customerDp)}</strong></div>` : ""}
    <div class="modal-dp-row">
      <span>DP</span>
      <label class="modal-dp-input">
        <input type="number" id="modal-dp" inputmode="numeric" min="0" placeholder="0" value="${customDp}" />
      </label>
    </div>
    <div><span>Total</span><strong id="modal-total">${formatMoney(payable)}</strong></div>
  `;
}

function renderConfirmationPayment(mode) {
  const container = document.querySelector("#modal-payment");
  if (!container || mode === "draft") {
    if (container) container.innerHTML = "";
    return;
  }

  const { payable } = calculateTotals();
  const isTunai = selectedPayment === "Tunai";
  const isQRIS = selectedPayment === "QRIS";
  const isKartu = selectedPayment === "Kartu";

  const change = Math.max(0, cashReceived - payable);

  container.innerHTML = `
    <div class="modal-payment-methods">
      <button type="button" class="${isTunai ? "active" : ""}" data-modal-payment="Tunai">
        <span class="method-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <rect x="3" y="6" width="18" height="12" rx="2"></rect>
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M6 9h2M16 15h2"></path>
          </svg>
        </span>
        Tunai
      </button>
      <button type="button" class="${isQRIS ? "active" : ""}" data-modal-payment="QRIS">
        <span class="method-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"></path>
            <path d="M14 14h2v2h-2zM18 14h2v6h-2zM14 18h2v2h-2z"></path>
          </svg>
        </span>
        QRIS
      </button>
      <button type="button" class="${isKartu ? "active" : ""}" data-modal-payment="Kartu">
        <span class="method-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <rect x="2" y="6" width="20" height="12" rx="2"></rect>
            <line x1="2" y1="10" x2="22" y2="10"></line>
          </svg>
        </span>
        Kartu
      </button>
    </div>
    ${isTunai ? `
      <label class="modal-payment-input">
        <span>Uang diterima</span>
        <div class="modal-dp-input">
          <input type="number" id="modal-cash-received" inputmode="numeric" min="0" placeholder="0" value="${cashReceived || ""}" />
        </div>
      </label>
      <div class="modal-change-row">
        <span>Kembalian</span>
        <strong id="modal-change">${formatMoney(change)}</strong>
      </div>
    ` : ""}
    ${isKartu ? `
      <label class="modal-payment-input">
        <span>Nomor kartu</span>
        <input type="text" id="modal-card-number" inputmode="numeric" autocomplete="off" placeholder="**** **** **** ****" value="${cardNumber}" maxlength="19" />
      </label>
    ` : ""}
  `;
}

function openConfirmation(mode) {
  activeConfirmMode = mode;
  const modal = document.querySelector("#confirm-modal");
  const title = document.querySelector("#modal-title");
  const copy = document.querySelector("#confirm-copy");
  const confirmButton = document.querySelector("#confirm-payment");

  title.textContent = mode === "draft" ? "Simpan Draft Transaksi" : "Konfirmasi Pembayaran";
  copy.textContent =
    mode === "draft"
      ? "Transaksi akan masuk daftar pending dan bisa dilanjutkan nanti."
      : "Pastikan metode pembayaran dan total sudah sesuai.";
  confirmButton.textContent = mode === "draft" ? "Simpan Draft" : "Bayar Sekarang";
  cashReceived = 0;
  cardNumber = "";

  renderConfirmationSummary(mode);
  renderConfirmationPayment(mode);
  modal.hidden = false;
}

function closeConfirmation() {
  document.querySelector("#confirm-modal").hidden = true;
  customDp = 0;
  cashReceived = 0;
  cardNumber = "";
}

function openAddCustomerModal() {
  const modal = document.querySelector("#add-customer-modal");
  if (modal) modal.hidden = false;
}

function closeAddCustomerModal() {
  const modal = document.querySelector("#add-customer-modal");
  if (modal) modal.hidden = true;
}

function openEditUmumModal() {
  const modal = document.querySelector("#edit-umum-modal");
  const nameInput = document.querySelector("#edit-umum-name");
  const phoneInput = document.querySelector("#edit-umum-phone");
  if (!modal) return;
  nameInput.value = selectedCustomer?.name || "UMUM";
  phoneInput.value = selectedCustomer?.phone === "-" ? "" : (selectedCustomer?.phone || "");
  modal.hidden = false;
}

function closeEditUmumModal() {
  const modal = document.querySelector("#edit-umum-modal");
  if (modal) modal.hidden = true;
}

function openPendingPopup() {
  const modal = document.querySelector("#pending-popup-modal");
  if (!modal) return;
  pendingPopupSearchTerm = "";
  const searchInput = document.querySelector("#pending-popup-search");
  if (searchInput) searchInput.value = "";
  renderPendingPopup();
  modal.hidden = false;
}

function closePendingPopup() {
  const modal = document.querySelector("#pending-popup-modal");
  if (modal) modal.hidden = true;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.hidden = true;
  }, 1800);
}

function setView(id) {
  const isCmsView = id === "cms-view";
  document.body.classList.toggle("cms-mode", isCmsView);

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === id);
  });

  if (id === "customer-list-view") {
    renderCustomerList();
    const customerList = document.querySelector("#customer-list");
    if (customerList) customerList.scrollTop = 0;
  }
  if (id === "customer-view") renderCustomerDetail(activeDetailCustomerId);
  if (id === "membership-view") {
    renderMembershipList();
    const membershipList = document.querySelector("#membership-list");
    if (membershipList) membershipList.scrollTop = 0;
  }
  if (id === "membership-detail-view" && selectedMembershipId) renderMembershipDetail(selectedMembershipId);
  if (id === "pending-view") {
    pendingSearchTerm = "";
    const pendingSearchInput = document.querySelector("#pending-search");
    if (pendingSearchInput) pendingSearchInput.value = "";
    renderPendingList();
  }
  if (id === "cms-view") {
    renderCmsPage(activeCmsPage);
    const layout = document.querySelector("#cms-layout");
    if (layout) layout.classList.toggle("collapsed", cmsSidebarCollapsed);
    window.scrollTo({ top: 0, left: 0 });
  }
}

document.addEventListener("click", (event) => {
  if (!event.target.closest('input[type="date"], input[type="time"]')) {
    blurNativeDateTimePicker();
  }
  const shouldKeepMemberListOpen = Boolean(event.target.closest(".item-card, .cart-qty button"));
  if (!event.target.closest("#customer-picker")) {
    closeCustomerPopovers({ keepBenefits: shouldKeepMemberListOpen });
  }

  const detailCustomer = event.target.closest("[data-detail-customer]");
  if (detailCustomer) {
    activeDetailCustomerId = detailCustomer.dataset.detailCustomer;
    renderCustomerDetail(activeDetailCustomerId);
    setView("customer-view");
    return;
  }

  if (event.target.closest("#add-customer-button")) {
    openAddCustomerModal();
    return;
  }

  if (event.target.closest("#cancel-add-customer")) {
    closeAddCustomerModal();
    return;
  }

  if (event.target.closest("#save-add-customer")) {
    closeAddCustomerModal();
    showToast("Contoh pelanggan baru tersimpan");
    return;
  }

  if (event.target.id === "add-customer-modal") {
    closeAddCustomerModal();
    return;
  }

  if (event.target.closest("#customer-add-pos")) {
    openAddCustomerModal();
    return;
  }

  const benefitToggle = event.target.closest("#member-benefit-toggle");
  if (benefitToggle) {
    const picker = document.querySelector("#customer-picker");
    const benefits = document.querySelector("#member-benefits");
    const nextOpen = !picker.classList.contains("benefits-open");
    picker.classList.toggle("benefits-open", nextOpen);
    picker.classList.remove("open");
    if (benefits) benefits.hidden = !nextOpen;
    benefitToggle.setAttribute("aria-expanded", String(nextOpen));
    return;
  }

  const memberUsageButton = event.target.closest("[data-member-service]");
  if (memberUsageButton) {
    const serviceId = memberUsageButton.dataset.memberService;
    const delta = Number(memberUsageButton.dataset.memberDelta);
    const changed = delta > 0 ? increaseMemberUsage(serviceId) : decreaseMemberUsage(serviceId);
    if (changed) {
  activeDiscountMenu = null;
  activeServiceLevelMenu = null;
      refreshMemberBenefits();
      renderCart();
    }
    return;
  }

  const customerToggle = event.target.closest("#customer-toggle");
  if (customerToggle) {
    const picker = document.querySelector("#customer-picker");
    picker.classList.toggle("open");
    picker.classList.remove("benefits-open");
    document.querySelector("#member-benefits")?.setAttribute("hidden", "");
    document.querySelector("#member-benefit-toggle")?.setAttribute("aria-expanded", "false");
    renderCustomerDropdown();
    return;
  }

  const customerOption = event.target.closest("[data-customer]");
  if (customerOption) {
    const nextCustomer = customers.find((customer) => customer.id === customerOption.dataset.customer);
    clearMemberUsage();
    activeServiceLevelMenu = null;
    selectedCustomer = nextCustomer;
    document.querySelector("#customer-picker").classList.remove("open");
    dropdownSearchTerm = "";
    renderCustomer();
    renderCustomerDropdown();
    renderItems();
    renderCart();
    return;
  }

  const staffButton = event.target.closest("[data-staff-for]");
  if (staffButton) {
    activeDiscountMenu = null;
    const nextStaffMenu = activeStaffMenu === staffButton.dataset.staffFor ? null : staffButton.dataset.staffFor;
    activeStaffMenu = nextStaffMenu;
    activeStaffAction = null;
    renderCart();
    return;
  }

  const serviceLevelButton = event.target.closest("[data-service-level-for]");
  if (serviceLevelButton) {
    activeStaffMenu = null;
    activeStaffAction = null;
    activeDiscountMenu = null;
    activeServiceLevelMenu = null;
    activeServiceLevelMenu = activeServiceLevelMenu === serviceLevelButton.dataset.serviceLevelFor ? null : serviceLevelButton.dataset.serviceLevelFor;
    renderCart();
    return;
  }

  const serviceLevelChoice = event.target.closest("[data-service-level]");
  if (serviceLevelChoice) {
    const item = serviceCartLines.find((entry) => entry.id === serviceLevelChoice.dataset.id);
    if (!item) return;
    if (applyServiceLevel(item, serviceLevelChoice.dataset.serviceLevel)) {
      activeServiceLevelMenu = null;
      activeStaffMenu = null;
      activeStaffAction = null;
      renderCart();
      refreshMemberBenefits();
    }
    return;
  }

  const staffActionToggle = event.target.closest("[data-staff-action-toggle]");
  if (staffActionToggle) {
    const actionKey = `${staffActionToggle.dataset.id}:${staffActionToggle.dataset.staffActionToggle}`;
    activeStaffAction = activeStaffAction === actionKey ? null : actionKey;
    renderCart();
    return;
  }

  const staffActionChoice = event.target.closest("[data-staff-action]");
  if (staffActionChoice) {
    const item = serviceCartLines.find((entry) => entry.id === staffActionChoice.dataset.id);
    if (!item) return;
    const action = staffActionChoice.dataset.staffAction;
    const staff = staffActionChoice.dataset.actionStaff;
    item.actionStaffs = normalizeActionStaffs(item);
    const currentStaff = item.actionStaffs[action] || [];
    item.actionStaffs[action] = currentStaff.includes(staff)
      ? currentStaff.filter((staffName) => staffName !== staff)
      : [...currentStaff, staff];
    syncServiceStaffSummary(item);
    renderCart();
    return;
  }

  const staffChoice = event.target.closest("[data-staff]");
  if (staffChoice) {
    const item = serviceCartLines.find((entry) => entry.id === staffChoice.dataset.id) || memberCartLines.find((entry) => entry.id === staffChoice.dataset.id) || items.find((entry) => entry.id === staffChoice.dataset.id);
    item.staff = staffChoice.dataset.staff;
    activeStaffMenu = null;
    activeStaffAction = null;
    renderCart();
    return;
  }

  const editUmumButton = event.target.closest("[data-edit-umum]");
  if (editUmumButton) {
    openEditUmumModal();
    return;
  }

  const cancelEditUmum = event.target.closest("#cancel-edit-umum");
  if (cancelEditUmum) {
    closeEditUmumModal();
    return;
  }

  const saveEditUmum = event.target.closest("#save-edit-umum");
  if (saveEditUmum) {
    const nameInput = document.querySelector("#edit-umum-name");
    const phoneInput = document.querySelector("#edit-umum-phone");
    selectedCustomer.name = nameInput.value.trim() || "UMUM";
    selectedCustomer.phone = phoneInput.value.trim() || "-";
    closeEditUmumModal();
    renderCustomer();
    renderCart();
    return;
  }

  if (event.target.id === "edit-umum-modal") {
    closeEditUmumModal();
    return;
  }

  const pendingPopupButton = event.target.closest("#pending-popup-button");
  if (pendingPopupButton) {
    openPendingPopup();
    return;
  }

  const closePendingPopupButton = event.target.closest("#close-pending-popup");
  if (closePendingPopupButton) {
    closePendingPopup();
    return;
  }

  if (event.target.id === "pending-popup-modal") {
    closePendingPopup();
    return;
  }

  const discountButton = event.target.closest("[data-discount-for]");
  if (discountButton) {
    const item = serviceCartLines.find((entry) => entry.id === discountButton.dataset.discountFor);
    if (!item || item.memberFree) return;
    activeStaffMenu = null;
    activeStaffAction = null;
    activeDiscountMenu = activeDiscountMenu === discountButton.dataset.discountFor ? null : discountButton.dataset.discountFor;
    renderCart();
    if (activeDiscountMenu) {
      window.setTimeout(() => {
        const input = document.querySelector(`[data-discount-input="${activeDiscountMenu}"]`);
        if (input) input.focus();
      }, 0);
    }
    return;
  }

  const discountCancel = event.target.closest("[data-discount-cancel]");
  if (discountCancel) {
    activeDiscountMenu = null;
    renderCart();
    return;
  }

  const discountSave = event.target.closest("[data-discount-save]");
  if (discountSave) {
    const item = serviceCartLines.find((entry) => entry.id === discountSave.dataset.discountSave);
    const input = document.querySelector(`[data-discount-input="${discountSave.dataset.discountSave}"]`);
    if (!item || !input) return;
    const raw = input.value.trim().replace(",", ".");
    const value = Number(raw);
    if (Number.isNaN(value) || value <= 0 || value > 100) {
      showToast("Masukkan angka diskon 1-100");
      return;
    }
    const currentTotal = getLineDiscountRate(item);
    if (currentTotal + value > 100) {
      showToast("Total diskon tidak boleh lebih dari 100%");
      return;
    }
    item.discounts = [...(item.discounts || []), value];
    activeDiscountMenu = null;
    activeStaffMenu = null;
    activeStaffAction = null;
    renderCart();
    return;
  }

  const clearDiscountsBadge = event.target.closest("[data-clear-discounts]");
  if (clearDiscountsBadge) {
    const item = serviceCartLines.find((entry) => entry.id === clearDiscountsBadge.dataset.clearDiscounts);
    if (item) {
      item.discounts = [];
      renderCart();
    }
    return;
  }

  const paymentButton = event.target.closest("[data-payment]");
  if (paymentButton) {
    setPayment(paymentButton.dataset.payment);
    return;
  }

  const modalPaymentButton = event.target.closest("[data-modal-payment]");
  if (modalPaymentButton) {
    selectedPayment = modalPaymentButton.dataset.modalPayment;
    renderConfirmationPayment(activeConfirmMode);
    return;
  }

  const payButton = event.target.closest("#pay-button");
  if (payButton) {
    const hasItems = getCartItems().length > 0;
    if (!hasItems) {
      showToast("Keranjang masih kosong");
      return;
    }
    openConfirmation("payment");
    return;
  }

  const draftButton = event.target.closest("#draft-button");
  if (draftButton) {
    const hasItems = getCartItems().length > 0;
    if (!hasItems) {
      showToast("Keranjang masih kosong");
      return;
    }
    openConfirmation("draft");
    return;
  }

  if (event.target.closest("#cancel-payment")) {
    closeConfirmation();
    return;
  }

  if (event.target.closest("#confirm-payment")) {
    if (activeConfirmMode === "payment") {
      const { payable } = calculateTotals();
      if (selectedPayment === "Tunai" && cashReceived < payable) {
        showToast("Uang tunai yang diterima masih kurang");
        return;
      }
      if (selectedPayment === "Kartu" && cardNumber.trim().replace(/\D/g, "").length < 4) {
        showToast("Masukkan nomor kartu yang valid");
        return;
      }
      lastReceipt = createReceiptSnapshot();
      closeConfirmation();
      setReceiptReturn("pos-view");
      renderReceipt(lastReceipt);
      prepareNextTransaction();
      setView("receipt-view");
      showToast("Pembayaran tersimpan");
      return;
    }

    saveDraftTransaction();
    closeConfirmation();
    prepareNextTransaction();
    renderPendingList();
    renderPendingPopup();
    showToast("Transaksi masuk draft");
    return;
  }

  if (event.target.id === "confirm-modal") {
    closeConfirmation();
    return;
  }

  if (event.target.closest("#receipt-print")) {
    window.print();
    return;
  }

  if (event.target.closest("#receipt-back-cashier")) {
    setView(receiptReturnView);
    return;
  }

  const nav = event.target.closest("[data-target]");
  if (nav) {
    blurNativeDateTimePicker();
    activeStaffMenu = null;
    activeStaffAction = null;
    activeDiscountMenu = null;
    activeServiceLevelMenu = null;
    setView(nav.dataset.target);
    return;
  }

  const filterButton = event.target.closest("[data-filter]");
  if (filterButton) {
    activeFilter = filterButton.dataset.filter;
    searchTerm = "";
    activeStaffMenu = null;
    activeStaffAction = null;
    activeDiscountMenu = null;
    activeServiceLevelMenu = null;
    document.querySelector("#item-search").value = "";
    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.classList.toggle("active", button.dataset.filter === activeFilter);
    });
    updateSearchPlaceholder();
    updateCatalogHeading();
    renderItems();
    return;
  }

  const itemCard = event.target.closest(".item-card");
  if (itemCard) {
    const item = items.find((entry) => entry.id === itemCard.dataset.id);
    if (!item) return;
    const changed = addItemToCart(item);
    activeStaffMenu = null;
    activeStaffAction = null;
    activeDiscountMenu = null;
    renderItems();
    renderCart();
    refreshMemberBenefits();
    if (!changed) return;
    return;
  }

  const quantityButton = event.target.closest(".cart-qty button");
  if (quantityButton) {
    const quantity = quantityButton.closest(".cart-qty");
    const item = serviceCartLines.find((entry) => entry.id === quantity.dataset.id) || memberCartLines.find((entry) => entry.id === quantity.dataset.id) || items.find((entry) => entry.id === quantity.dataset.id);
    if (!item) return;
    const delta = Number(quantityButton.dataset.delta);
    if (item.type === "service") {
      if (delta > 0) {
        const source = items.find((entry) => entry.id === item.itemId);
        addServiceLine(source);
      } else {
        const index = serviceCartLines.findIndex((entry) => entry.id === item.id);
        if (index >= 0) {
          if (item.memberUsageRewardId) {
            releaseMemberUsage(item);
            refreshMemberBenefits();
          }
          serviceCartLines.splice(index, 1);
        }
      }
    } else if (item.type === "member") {
      if (delta < 0) {
        const index = memberCartLines.findIndex((entry) => entry.id === item.id);
        if (index >= 0) memberCartLines.splice(index, 1);
      }
    } else if (delta > 0) {
      increaseItem(item);
    } else {
      item.qty = Math.max(0, item.qty + delta);
    }
    activeStaffMenu = null;
    activeStaffAction = null;
    activeDiscountMenu = null;
    activeServiceLevelMenu = null;
    renderCart();
    refreshMemberBenefits();
    return;
  }

  if (activeStaffMenu && !event.target.closest(".staff-menu") && !event.target.closest("[data-staff-for]")) {
    activeStaffMenu = null;
    activeStaffAction = null;
    renderCart();
  }

  if (activeDiscountMenu && !event.target.closest(".discount-menu") && !event.target.closest("[data-discount-for]")) {
    activeDiscountMenu = null;
    renderCart();
  }

  if (activeServiceLevelMenu && !event.target.closest(".service-level-menu") && !event.target.closest("[data-service-level-for]")) {
    activeServiceLevelMenu = null;
    renderCart();
  }

  const customerTransactionRow = event.target.closest("[data-customer-transaction-id]");
  if (customerTransactionRow) {
    showCustomerTransactionDetail(customerTransactionRow.dataset.customerTransactionId);
    return;
  }

  const customerDetailBack = event.target.closest("#customer-detail-back");
  if (customerDetailBack) {
    hideCustomerTransactionDetail();
    return;
  }

  const salesRow = event.target.closest("[data-sales-id]");
  if (salesRow) {
    showSalesDetail(salesRow.dataset.salesId);
    return;
  }

  const detailBack = event.target.closest("#detail-back");
  if (detailBack) {
    hideSalesDetail();
    return;
  }

  if (event.target.closest("#detail-print-receipt")) {
    openReceiptFromSalesDetail();
    return;
  }

  if (event.target.closest("#sales-filter-apply")) {
    blurNativeDateTimePicker();
    salesPage = 1;
    renderSalesList();
    return;
  }

  if (event.target.closest("#sales-filter-reset")) {
    blurNativeDateTimePicker();
    document.querySelector("#filter-date-from").value = "2026-06-26";
    document.querySelector("#filter-date-to").value = "2026-06-27";
    document.querySelector("#filter-time-from").value = "00:00";
    document.querySelector("#filter-time-to").value = "23:59";
    document.querySelector("#filter-payment").value = "";
    document.querySelector("#filter-status").value = "";
    salesSearchTerm = "";
    const searchInput = document.querySelector(".sales-search input");
    if (searchInput) searchInput.value = "";
    salesPage = 1;
    renderSalesList();
    return;
  }

  const membershipRow = event.target.closest("[data-membership-id]");
  if (membershipRow) {
    renderMembershipDetail(membershipRow.dataset.membershipId);
    setView("membership-detail-view");
    return;
  }

  const reminderAction = event.target.closest(".reminder-action");
  if (reminderAction) {
    const isDone = reminderAction.classList.toggle("done");
    reminderAction.textContent = isDone ? "Sudah Kontak" : "Kontak";
    return;
  }

  const pageBtn = event.target.closest("[data-sales-page]");
  if (pageBtn) {
    const action = pageBtn.dataset.salesPage;
    const filtered = filteredSales();
    const totalPages = Math.max(1, Math.ceil(filtered.length / salesPerPage));
    if (action === "prev") {
      salesPage = Math.max(1, salesPage - 1);
    } else if (action === "next") {
      salesPage = Math.min(totalPages, salesPage + 1);
    } else {
      salesPage = Number(action);
    }
    renderSalesList();
    return;
  }

  const pendingRow = event.target.closest("[data-pending-id]");
  if (pendingRow) {
    loadPendingTransaction(pendingRow.dataset.pendingId);
    const popupModal = document.querySelector("#pending-popup-modal");
    if (popupModal && !popupModal.hidden) {
      closePendingPopup();
    }
    return;
  }

  const cmsEntryButton = event.target.closest("#cms-entry-button");
  if (cmsEntryButton) {
    openCmsView();
    return;
  }

  const cmsBackButton = event.target.closest("#cms-back-pos");
  if (cmsBackButton) {
    setView("pos-view");
    return;
  }

  const cmsSidebarToggle = event.target.closest("#cms-sidebar-toggle");
  if (cmsSidebarToggle) {
    toggleCmsSidebar();
    return;
  }

  const cmsMenuToggle = event.target.closest("#cms-menu-toggle");
  if (cmsMenuToggle) {
    toggleCmsSidebar();
    return;
  }

  const cmsNavItem = event.target.closest("[data-cms-page]");
  if (cmsNavItem) {
    renderCmsPage(cmsNavItem.dataset.cmsPage);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return;
  }

  const cmsAction = event.target.closest("[data-cms-action]");
  if (cmsAction) {
    handleCmsAction(cmsAction.dataset.cmsAction, cmsAction.dataset.cmsId || null);
    return;
  }

});

const salesTransactions = [
  {
    id: "POS-088046", time: "11:42", date: "27 Jun 2026", dateRaw: "2026-06-27", customer: "Dewi Anggraini", staff: "Wira", amount: 936000, payment: "Tunai",
    items: [
      { name: "Hair Cut", qty: 1, price: 160000, staff: "Wira", type: "service" },
      { name: "Creambath", qty: 1, price: 230000, staff: "Kartini", type: "service" },
      { name: "Vitamin Rambut", qty: 1, price: 80000, type: "product" },
      { name: "Hair Colour", qty: 1, price: 450000, staff: "Siska", type: "service" },
    ],
    status: "Selesai", dp: 0, reward: 0,
  },
  {
    id: "POS-088045", time: "10:33", date: "27 Jun 2026", dateRaw: "2026-06-27", customer: "Sapriti", staff: "Kartini", amount: 450000, payment: "QRIS",
    items: [
      { name: "Keratin Treatment", qty: 1, price: 450000, staff: "Kartini", type: "service" },
    ],
    status: "Selesai", dp: 0, reward: 0,
  },
  {
    id: "POS-088044", time: "10:28", date: "27 Jun 2026", dateRaw: "2026-06-27", customer: "Priscila Tan", staff: "Priscila", amount: 1120000, payment: "Tunai",
    items: [
      { name: "Digital Perm", qty: 1, price: 850000, staff: "Priscila", type: "service" },
      { name: "Hair Spa", qty: 1, price: 280000, staff: "Nadya", type: "service" },
    ],
    status: "Selesai", dp: 0, reward: 0,
  },
  {
    id: "POS-088043", time: "10:15", date: "27 Jun 2026", dateRaw: "2026-06-27", customer: "Linda Permata", staff: "Wira", amount: 320000, payment: "QRIS",
    items: [
      { name: "Hair Wash", qty: 1, price: 60000, staff: "Wira", type: "service" },
      { name: "Blow Dry", qty: 1, price: 120000, staff: "Kartini", type: "service" },
      { name: "Manicure", qty: 1, price: 110000, staff: "Priscila", type: "service" },
      { name: "Hair Tonic", qty: 1, price: 125000, type: "product" },
    ],
    status: "Selesai", dp: 0, reward: 0,
  },
  {
    id: "POS-088042", time: "09:51", date: "27 Jun 2026", dateRaw: "2026-06-27", customer: "Rika Amelia", staff: "Kartini", amount: 780000, payment: "Tunai",
    items: [
      { name: "Smoothing", qty: 1, price: 650000, staff: "Sapriti", type: "service" },
      { name: "Hair Mask Aloe", qty: 1, price: 150000, type: "product" },
    ],
    status: "Selesai", dp: 0, reward: 0,
  },
  {
    id: "POS-088041", time: "09:30", date: "27 Jun 2026", dateRaw: "2026-06-27", customer: "Siti Rahma", staff: "Wira", amount: 669000, payment: "QRIS",
    items: [
      { name: "Creambath", qty: 1, price: 230000, staff: "Wira", type: "service" },
      { name: "Hair Colour", qty: 1, price: 450000, staff: "Kartini", type: "service" },
      { name: "Shampoo Keratin", qty: 1, price: 95000, type: "product" },
    ],
    status: "Selesai", dp: 0, reward: 0,
  },
  {
    id: "POS-088040", time: "17:22", date: "26 Jun 2026", dateRaw: "2026-06-26", customer: "Nina Septiani", staff: "Priscila", amount: 1250000, payment: "Tunai",
    items: [
      { name: "Hair Extension", qty: 1, price: 1200000, staff: "Priscila", type: "service" },
      { name: "Hair Wash", qty: 1, price: 60000, staff: "Wira", type: "service" },
    ],
    status: "Selesai", dp: 150000, reward: 0,
  },
  {
    id: "POS-088039", time: "16:45", date: "26 Jun 2026", dateRaw: "2026-06-26", customer: "Maya Putri", staff: "Siska", amount: 540000, payment: "QRIS",
    items: [
      { name: "Keratin Treatment", qty: 1, price: 450000, staff: "Siska", type: "service" },
      { name: "Hair Tonic", qty: 1, price: 125000, type: "product" },
    ],
    status: "Selesai", dp: 50000, reward: 0,
  },
  {
    id: "POS-088038", time: "15:10", date: "26 Jun 2026", dateRaw: "2026-06-26", customer: "Dewi Anggraini", staff: "Kartini", amount: 160000, payment: "Tunai",
    items: [
      { name: "Gunting Rambut", qty: 1, price: 160000, staff: "Kartini", type: "service" },
    ],
    status: "Selesai", dp: 0, reward: 160000,
  },
  {
    id: "POS-088037", time: "14:55", date: "26 Jun 2026", dateRaw: "2026-06-26", customer: "Lia Kartika", staff: "Wira", amount: 60000, payment: "QRIS",
    items: [
      { name: "Hair Wash", qty: 1, price: 60000, staff: "Wira", type: "service" },
    ],
    status: "Selesai", dp: 0, reward: 0,
  },
  {
    id: "POS-088036", time: "13:20", date: "26 Jun 2026", dateRaw: "2026-06-26", customer: "Sapriti", staff: "Priscila", amount: 670000, payment: "Tunai",
    items: [
      { name: "Highlight", qty: 1, price: 520000, staff: "Priscila", type: "service" },
      { name: "Hair Wash", qty: 1, price: 60000, staff: "Wira", type: "service" },
      { name: "Conditioner Silk", qty: 1, price: 90000, type: "product" },
    ],
    status: "Selesai", dp: 0, reward: 0,
  },
  {
    id: "POS-088035", time: "12:05", date: "26 Jun 2026", dateRaw: "2026-06-26", customer: "Rika Amelia", staff: "Kartini", amount: 295000, payment: "QRIS",
    items: [
      { name: "Blow Catok", qty: 1, price: 180000, staff: "Kartini", type: "service" },
      { name: "Serum Anti Frizz", qty: 1, price: 175000, type: "product" },
    ],
    status: "Selesai", dp: 100000, reward: 0,
  },
  {
    id: "POS-088034", time: "11:40", date: "26 Jun 2026", dateRaw: "2026-06-26", customer: "Siti Rahma", staff: "Wira", amount: 880000, payment: "Tunai",
    items: [
      { name: "Hair Colour", qty: 1, price: 450000, staff: "Wira", type: "service" },
      { name: "Creambath", qty: 1, price: 230000, staff: "Kartini", type: "service" },
      { name: "Hair Spa", qty: 1, price: 280000, staff: "Nadya", type: "service" },
    ],
    status: "Pending", dp: 0, reward: 0,
  },
  {
    id: "POS-088033", time: "10:15", date: "26 Jun 2026", dateRaw: "2026-06-26", customer: "Priscila Tan", staff: "Priscila", amount: 410000, payment: "QRIS",
    items: [
      { name: "Gunting Rambut", qty: 1, price: 160000, staff: "Priscila", type: "service" },
      { name: "Keratin Treatment", qty: 1, price: 250000, staff: "Siska", type: "service" },
    ],
    status: "Pending", dp: 0, reward: 0,
  },
  {
    id: "POS-088032", time: "09:45", date: "26 Jun 2026", dateRaw: "2026-06-26", customer: "Dewi Anggraini", staff: "Kartini", amount: 450000, payment: "Tunai",
    items: [
      { name: "Hair Colour", qty: 1, price: 450000, staff: "Kartini", type: "service" },
    ],
    status: "Pending", dp: 0, reward: 0,
  },
  {
    id: "POS-088031", time: "09:10", date: "26 Jun 2026", dateRaw: "2026-06-26", customer: "Nina Septiani", staff: "Priscila", amount: 750000, payment: "QRIS",
    items: [
      { name: "Keratin Treatment", qty: 1, price: 750000, staff: "Priscila", type: "service" },
    ],
    status: "Pending", dp: 150000, reward: 0,
  },
  {
    id: "POS-088030", time: "08:55", date: "26 Jun 2026", dateRaw: "2026-06-26", customer: "Maya Putri", staff: "Siska", amount: 280000, payment: "Tunai",
    items: [
      { name: "Hair Spa", qty: 1, price: 280000, staff: "Siska", type: "service" },
    ],
    status: "Pending", dp: 50000, reward: 0,
  },
  {
    id: "POS-088029", time: "16:30", date: "25 Jun 2026", dateRaw: "2026-06-25", customer: "Rika Amelia", staff: "Kartini", amount: 160000, payment: "QRIS",
    items: [
      { name: "Gunting Rambut", qty: 1, price: 160000, staff: "Kartini", type: "service" },
    ],
    status: "Pending", dp: 0, reward: 0,
  },
  {
    id: "POS-088028", time: "15:45", date: "25 Jun 2026", dateRaw: "2026-06-25", customer: "Lia Kartika", staff: "Wira", amount: 320000, payment: "Tunai",
    items: [
      { name: "Blow Dry", qty: 1, price: 120000, staff: "Wira", type: "service" },
      { name: "Hair Wash", qty: 1, price: 60000, staff: "Wira", type: "service" },
      { name: "Manicure", qty: 1, price: 110000, staff: "Priscila", type: "service" },
    ],
    status: "Pending", dp: 0, reward: 0,
  },
  {
    id: "POS-088027", time: "14:20", date: "25 Jun 2026", dateRaw: "2026-06-25", customer: "Sapriti", staff: "Priscila", amount: 980000, payment: "QRIS",
    items: [
      { name: "Digital Perm", qty: 1, price: 850000, staff: "Priscila", type: "service" },
      { name: "Hair Tonic", qty: 1, price: 125000, type: "product" },
    ],
    status: "Pending", dp: 0, reward: 0,
  },
  {
    id: "POS-088026", time: "13:00", date: "25 Jun 2026", dateRaw: "2026-06-25", customer: "Siti Rahma", staff: "Wira", amount: 540000, payment: "Tunai",
    items: [
      { name: "Keratin Treatment", qty: 1, price: 450000, staff: "Wira", type: "service" },
      { name: "Shampoo Keratin", qty: 1, price: 95000, type: "product" },
    ],
    status: "Pending", dp: 0, reward: 0,
  },
  {
    id: "POS-088025", time: "11:30", date: "25 Jun 2026", dateRaw: "2026-06-25", customer: "Dewi Anggraini", staff: "Kartini", amount: 110000, payment: "QRIS",
    items: [
      { name: "Manicure", qty: 1, price: 110000, staff: "Kartini", type: "service" },
    ],
    status: "Pending", dp: 0, reward: 0,
  },
  {
    id: "POS-088024", time: "10:45", date: "25 Jun 2026", dateRaw: "2026-06-25", customer: "Nina Septiani", staff: "Priscila", amount: 230000, payment: "Tunai",
    items: [
      { name: "Creambath", qty: 1, price: 230000, staff: "Priscila", type: "service" },
    ],
    status: "Pending", dp: 150000, reward: 0,
  },
  {
    id: "POS-088023", time: "09:20", date: "25 Jun 2026", dateRaw: "2026-06-25", customer: "Priscila Tan", staff: "Priscila", amount: 650000, payment: "QRIS",
    items: [
      { name: "Smoothing", qty: 1, price: 650000, staff: "Priscila", type: "service" },
    ],
    status: "Pending", dp: 0, reward: 0,
  },
  {
    id: "POS-088022", time: "17:00", date: "24 Jun 2026", dateRaw: "2026-06-24", customer: "Rika Amelia", staff: "Kartini", amount: 450000, payment: "Tunai",
    items: [
      { name: "Hair Colour", qty: 1, price: 450000, staff: "Kartini", type: "service" },
    ],
    status: "Pending", dp: 100000, reward: 0,
  },
  {
    id: "POS-088021", time: "15:30", date: "24 Jun 2026", dateRaw: "2026-06-24", customer: "Maya Putri", staff: "Siska", amount: 210000, payment: "QRIS",
    items: [
      { name: "Hair Mask", qty: 1, price: 210000, staff: "Siska", type: "service" },
    ],
    status: "Pending", dp: 50000, reward: 0,
  },
  {
    id: "POS-088020", time: "14:15", date: "24 Jun 2026", dateRaw: "2026-06-24", customer: "Lia Kartika", staff: "Wira", amount: 180000, payment: "Tunai",
    items: [
      { name: "Blow Catok", qty: 1, price: 180000, staff: "Wira", type: "service" },
    ],
    status: "Pending", dp: 0, reward: 0,
  },
  {
    id: "POS-088019", time: "12:45", date: "24 Jun 2026", dateRaw: "2026-06-24", customer: "Sapriti", staff: "Priscila", amount: 360000, payment: "QRIS",
    items: [
      { name: "Gunting Rambut", qty: 1, price: 160000, staff: "Priscila", type: "service" },
      { name: "Creambath", qty: 1, price: 230000, staff: "Wira", type: "service" },
    ],
    status: "Pending", dp: 0, reward: 0,
  },
  {
    id: "POS-088018", time: "11:00", date: "24 Jun 2026", dateRaw: "2026-06-24", customer: "Siti Rahma", staff: "Wira", amount: 850000, payment: "Tunai",
    items: [
      { name: "Digital Perm", qty: 1, price: 850000, staff: "Wira", type: "service" },
    ],
    status: "Pending", dp: 0, reward: 0,
  },
  {
    id: "POS-088017", time: "09:30", date: "24 Jun 2026", dateRaw: "2026-06-24", customer: "Dewi Anggraini", staff: "Kartini", amount: 750000, payment: "QRIS",
    items: [
      { name: "Keratin Treatment", qty: 1, price: 750000, staff: "Kartini", type: "service" },
    ],
    status: "Pending", dp: 0, reward: 0,
  },
];

let salesPage = 1;
const salesPerPage = 5;
let salesSearchTerm = "";
let selectedSalesId = null;

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
  const status = document.querySelector("#filter-status")?.value || "";
  return { dateFrom, dateTo, timeFrom, timeTo, payment, status };
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
      const text = `${t.customer} ${t.id} ${t.staff}`.toLowerCase();
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
      return `
        <article class="sales-row${selectedClass}" data-sales-id="${t.id}">
          <div class="sales-row-time">
            <strong>${t.time}</strong>
            <span>${t.date}</span>
          </div>
          <div class="sales-row-info">
            <strong>${t.customer}</strong>
            <span>${t.staff} · ${t.id}</span>
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

  return `
    <div class="detail-item-row">
      <div class="detail-item-main">
        <span>${receiptItem.qty}x ${receiptItem.name}</span>
        <strong>${formatReceiptAmount(receiptItem.baseTotal)}</strong>
      </div>
      ${actionLines ? `<div class="detail-item-sublines">${actionLines}</div>` : ""}
    </div>
  `;
}

function renderTransactionDetailContent(t, ids) {
  document.querySelector(ids.invoice).textContent = t.id;
  document.querySelector(ids.datetime).textContent = `${t.date} · ${t.time}`;
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
    adjustmentsHtml += `
      <div class="detail-adjustment-row">
        <span>Pemakaian Member</span>
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
      </div>
    `;
  }

  if (line.type === "member") {
    return `
      <div class="pending-item-detail">
        <span>${line.qty}x ${line.name}</span>
        <small>Paket membership</small>
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
    const text = `${t.id} ${t.customer} ${t.staff} ${itemNames}`.toLowerCase();
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
      return `
        <article class="pending-row" data-pending-id="${t.id}">
          <div class="pending-row-header">
            <div class="pending-row-info">
              <span class="pending-customer">${t.customer}</span>
              <small>${t.staff} · ${t.id}</small>
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
          serviceLine.actionStaffs = createActionStaffs(serviceLine, line.staff || t.staff || "");
          syncServiceStaffSummary(serviceLine);
        }
      }
    } else if (catalogItem.type === "member") {
      const added = addMemberLine(catalogItem);
      if (added) {
        const memberLine = memberCartLines[memberCartLines.length - 1];
        memberLine.staff = line.staff || t.staff || "";
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
      dateTime: visit.dateTime,
      qty: visit.qty,
      remaining: getCustomerRewards(customer).find((reward) => membershipServiceMatches(reward, visit.serviceName))?.progress || 0,
    })));
}

function getCmsPageRows(page) {
  if (page === "customers") {
    return customers.filter((customer) => customer.id !== "umum").map((customer) => ({
      id: customer.id,
      search: `${customer.code} ${customer.name} ${customer.phone} ${customer.status}`,
      cells: [customer.code, `<strong>${customer.name}</strong>`, customer.phone, cmsBadge(customer.status, customer.status === "Member" ? "gold" : "neutral"), customer.totalVisits, customer.lastVisit],
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
      search: `${transaction.id} ${transaction.customer} ${transaction.staff} ${transaction.payment}`,
      cells: [transaction.id, `${transaction.date}<small>${transaction.time}</small>`, `<strong>${transaction.customer}</strong>`, transaction.staff, cmsBadge(transaction.payment, "gold"), formatMoney(transaction.amount), cmsBadge(transaction.status, transaction.status === "Pending" ? "warning" : "success")],
    }));
  }
  if (page === "pending") {
    return getPendingTransactions().map((transaction) => ({
      id: transaction.id,
      search: `${transaction.id} ${transaction.customer} ${transaction.staff}`,
      cells: [transaction.id, `${transaction.date}<small>${transaction.time}</small>`, `<strong>${transaction.customer}</strong>`, transaction.staff, `${transaction.items.length} item`, formatMoney(transaction.dp || 0), formatMoney(transaction.amount), cmsBadge("Pending", "warning")],
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
        search: `${customer.name} ${customer.phone} ${rewards.map((reward) => getRewardName(reward)).join(" ")}`,
        cells: [`<strong>${customer.name}</strong>`, customer.phone, rewards.length, rewards.map((reward) => `${getRewardName(reward)} ${reward.progress}/${reward.target}`).join(" · "), customer.totalVisits, cmsBadge("Aktif", "success")],
      };
    });
  }
  if (page === "member-visits") {
    return getCmsMemberVisits().map((visit) => ({
      id: visit.id,
      search: `${visit.customer} ${visit.service} ${visit.dateTime}`,
      cells: [visit.dateTime, `<strong>${visit.customer}</strong>`, visit.service, `${visit.qty} kuota`, cmsBadge("Terpakai", "gold")],
    }));
  }
  if (page === "revenue-report") {
    return salesTransactions.filter((transaction) => transaction.status !== "Pending").map((transaction) => ({
      id: transaction.id,
      search: `${transaction.id} ${transaction.customer} ${transaction.payment}`,
      cells: [transaction.date, transaction.id, transaction.customer, transaction.payment, formatMoney(transaction.dp || 0), formatMoney(transaction.reward || 0), formatMoney(transaction.amount)],
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
    customers: { subtitle: "Kelola profil, nomor HP, status member, kunjungan, dan reminder pelanggan.", headers: ["Kode", "Nama", "Nomor HP", "Status", "Kunjungan", "Terakhir"], add: "Tambah Pelanggan", search: "Cari nama, nomor HP, atau kode..." },
    services: { subtitle: "Daftar jasa yang tampil di POS beserta level harga dan aktivitas pengerjaannya.", headers: ["Kode", "Nama Jasa", "Kategori", "Aktivitas", "Level", "Harga Mulai", "Status"], add: "Tambah Jasa", search: "Cari jasa atau kategori..." },
    "service-activities": { subtitle: "Atur langkah kerja setiap jasa agar kasir dapat memilih satu atau beberapa petugas per aktivitas.", headers: ["Jasa", "Urutan Aktivitas", "Jumlah", "Petugas Tersedia", "Status"], add: "Tambah Aktivitas", search: "Cari jasa atau aktivitas..." },
    "products-stock": { subtitle: "Produk retail yang tersedia di POS, harga jual, supplier, dan posisi stok.", headers: ["Kode", "Produk", "Kategori", "Supplier", "Harga Pokok", "Harga Jual", "Stok", "Status"], add: "Tambah Produk", search: "Cari produk, kategori, atau supplier..." },
    "membership-plans": { subtitle: "Paket kuota treatment yang dapat dibeli dan digunakan pelanggan dari POS.", headers: ["Kode", "Paket", "Jasa", "Kuota", "Harga Paket", "Harga / Kuota", "Status"], add: "Tambah Paket", search: "Cari paket atau jasa member..." },
    promotions: { subtitle: "Konfigurasi diskon per item jasa yang dapat dipilih kasir setelah item masuk keranjang.", headers: ["Program", "Nilai", "Berlaku Untuk", "Bisa Digabung", "Status"], add: "Tambah Promo", search: "Cari promo atau cakupan..." },
    staff: { subtitle: "Petugas yang dapat ditugaskan ke setiap aktivitas jasa di POS.", headers: ["Kode", "Nama", "Nomor HP", "Keahlian", "Transaksi", "Nilai Jasa", "Status"], add: "Tambah Petugas", search: "Cari petugas atau keahlian..." },
    sales: { subtitle: "Seluruh transaksi selesai dan pending dari kasir, termasuk metode pembayaran dan nilai transaksi.", headers: ["No. Nota", "Tanggal", "Pelanggan", "Petugas Utama", "Pembayaran", "Total", "Status"], search: "Cari no. nota, pelanggan, atau petugas..." },
    pending: { subtitle: "Draft transaksi kasir. Buka transaksi untuk melanjutkan langsung di POS.", headers: ["No. Draft", "Tanggal", "Pelanggan", "Petugas", "Isi", "DP", "Total", "Status"], search: "Cari draft atau pelanggan..." },
    reminders: { subtitle: "Pelanggan yang perlu dihubungi tujuh hari setelah jasa terakhir dan status follow-up WhatsApp.", headers: ["Pelanggan", "Nomor HP", "Jasa Terakhir", "Jadwal Reminder", "Keanggotaan", "Status Kontak"], search: "Cari pelanggan atau nomor HP..." },
    members: { subtitle: "Daftar pelanggan dengan paket member aktif dan sisa kuota treatment.", headers: ["Pelanggan", "Nomor HP", "Paket Aktif", "Sisa Kuota", "Total Kunjungan", "Status"], search: "Cari pelanggan atau paket member..." },
    "member-visits": { subtitle: "Riwayat penggunaan kuota membership per pelanggan dan treatment.", headers: ["Tanggal & Waktu", "Pelanggan", "Membership", "Pemakaian", "Status"], search: "Cari pelanggan atau membership..." },
    "sales-report": { subtitle: "Rekap transaksi selesai untuk kebutuhan pengecekan operasional salon.", headers: ["No. Nota", "Tanggal", "Pelanggan", "Petugas", "Pembayaran", "Total", "Status"], search: "Cari transaksi laporan..." },
    "revenue-report": { subtitle: "Rincian pendapatan kasir setelah DP dan pemakaian kuota member.", headers: ["Tanggal", "No. Nota", "Pelanggan", "Metode", "DP", "Member", "Pendapatan"], search: "Cari transaksi atau metode..." },
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
  if (["customers", "reminders", "members"].includes(page)) return [["Kode Pelanggan", record.code], ["Nama Pelanggan", record.name], ["Nomor HP", record.phone], ["Status", record.status], ["Total Kunjungan", `${record.totalVisits} kali`], ["Kunjungan Terakhir", record.lastVisit], ["Jadwal Reminder", record.reminderDate], ["DP Tersimpan", formatMoney(record.dp || 0)]];
  if (["services", "service-activities"].includes(page)) return [["Kode Jasa", record.code], ["Nama Jasa", record.name], ["Kategori", record.category], ["Harga Mulai", formatMoney(record.price)], ["Level Jasa", record.levels.map((level) => `${level.name} (${formatMoney(level.price)})`).join(" · ")], ["Aktivitas", record.actions.join(" → ")], ["Status", record.status]];
  if (["products-stock", "stock-report"].includes(page)) return [["Kode Produk", record.code], ["Nama Produk", record.name], ["Kategori", record.category], ["Supplier", record.supplier], ["Harga Pokok", formatMoney(record.cost)], ["Harga Jual", formatMoney(record.price)], ["Stok", `${record.stock} ${record.unit}`], ["Stok Minimum", `${record.minimum} ${record.unit}`]];
  if (page === "membership-plans") return [["Nama Paket", record.name], ["Jasa", record.serviceName], ["Jumlah Kuota", `${record.target} kali`], ["Harga Paket", formatMoney(record.price)], ["Harga per Kuota", formatMoney(Math.round(record.price / record.target))], ["Status", record.status || "Aktif"]];
  if (page === "promotions") return [["Nama Program", record.name], ["Nilai Diskon", record.value], ["Berlaku Untuk", record.scope], ["Bisa Digabung", record.combinable], ["Status", record.status]];
  if (["staff", "staff-commission"].includes(page)) return [["Kode Petugas", record.id], ["Nama Petugas", record.name], ["Nomor HP", record.phone], ["Keahlian", record.specialty], ["Transaksi Selesai", record.transactions], ["Nilai Jasa", formatMoney(record.revenue)], ["Estimasi Komisi", formatMoney(Math.round(record.revenue * 0.1))], ["Status", record.status]];
  if (page === "users-access") return [["ID Pengguna", record.id], ["Nama", record.name], ["Username", record.username], ["Peran", record.role], ["Hak Akses", record.access], ["Status", record.status]];
  if (page === "member-visits") return [["Pelanggan", record.customer], ["Nomor HP", record.phone], ["Membership", record.service], ["Waktu Pemakaian", record.dateTime], ["Kuota Dipakai", record.qty], ["Status", "Terpakai"]];
  if (["sales", "pending", "sales-report", "revenue-report"].includes(page)) return [["No. Dokumen", record.id], ["Tanggal", `${record.date} · ${record.time}`], ["Pelanggan", record.customer], ["Petugas Utama", record.staff], ["Pembayaran", record.payment], ["Status", record.status], ["DP", formatMoney(record.dp || 0)], ["Total", formatMoney(record.amount)]];
  return [];
}

function renderCmsTransactionItems(transaction) {
  if (!transaction?.items) return "";
  return `<section class="cms-detail-section"><h4>Rincian Transaksi</h4><div class="cms-transaction-lines">${transaction.items.map((line) => {
    const catalog = findCatalogItem(line);
    const actions = line.type === "service" ? getServiceActions(catalog || line) : [];
    return `<div class="cms-transaction-line"><div><strong>${line.qty || 1}x ${line.name}</strong>${line.type === "service" ? actions.map((action) => `<small>${action} By : ${line.staff || "Belum dipilih"}</small>`).join("") : line.type === "product" ? `<small>Produk retail</small>` : `<small>Paket membership</small>`}</div><strong>${formatMoney((line.price || 0) * (line.qty || 1))}</strong></div>`;
  }).join("")}</div></section>`;
}

function renderCmsMemberPackages(customer) {
  const rewards = getCustomerRewards(customer);
  if (!rewards.length) return "";
  return `<section class="cms-detail-section"><h4>Membership Dimiliki</h4><div class="cms-package-list">${rewards.map((reward) => `<div><span><strong>${getRewardName(reward, { withMember: true })}</strong><small>${reward.progress} dari ${reward.target} kuota tersisa</small></span><b>${reward.progress}/${reward.target}</b></div>`).join("")}</div></section>`;
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
        <thead><tr><th>ID</th><th>Waktu</th><th>Pelanggan</th><th>Metode</th><th>Total</th></tr></thead>
        <tbody>
          ${todayTransactions.length
            ? todayTransactions.slice(0, 5).map((t) => `<tr><td>${t.id}</td><td>${t.time}</td><td>${t.customer}</td><td>${t.payment}</td><td>${formatMoney(t.amount)}</td></tr>`).join("")
            : `<tr><td colspan="5" style="text-align:center;color:var(--muted);">Belum ada transaksi hari ini</td></tr>`}
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

let selectedMembershipId = null;

const membershipHistoryTimes = ["14:16:09", "17:26:01", "17:54:44", "19:00:25", "12:28:11", "10:45:37"];

function formatMembershipHistoryDate(dateText, index) {
  const months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    Mei: "05",
    Jun: "06",
    Jul: "07",
    Agu: "08",
    Sep: "09",
    Okt: "10",
    Nov: "11",
    Des: "12",
  };
  const [day, month, year] = dateText.split(" ");
  return `${year}-${months[month] || "01"}-${String(day).padStart(2, "0")} ${membershipHistoryTimes[index % membershipHistoryTimes.length]}`;
}

function membershipServiceMatches(reward, serviceName) {
  const aliases = {
    cut: ["Gunting Rambut", "Hair Cut", "Kids Hair Cut"],
    colour: ["Hair Colour", "Hair Colour + Blow"],
    cream: ["Creambath"],
    keratin: ["Keratin Treatment"],
    hairwash: ["Hair Wash"],
    smoothing: ["Smoothing"],
    hairspa: ["Hair Spa"],
  };
  const service = serviceName.toLowerCase();
  const rewardServiceId = getRewardServiceId(reward);
  const candidates = [getRewardName(reward), ...(aliases[rewardServiceId] || [])].map((name) => name.toLowerCase());
  return candidates.some((candidate) => service.includes(candidate) || candidate.includes(service));
}

function getMembershipUsageHistory(customer) {
  const rewards = getCustomerRewards(customer);
  if (!rewards.length) return [];

  const history = customerHistories[customer.id] || [];
  return history
    .flatMap(([date, serviceName], index) =>
      rewards
        .filter((reward) => membershipServiceMatches(reward, serviceName))
        .map((reward) => ({
          serviceName: getRewardName(reward),
          dateTime: formatMembershipHistoryDate(date, index),
          qty: 1,
        })),
    )
    .slice(0, 12);
}

function renderMembershipList() {
  const list = document.querySelector("#membership-list");
  if (!list) return;

  list.innerHTML = customers
    .map((customer) => {
      const selectedClass = selectedMembershipId === customer.id ? " selected" : "";
      const badge = getCustomerBadge(customer);
      return `
        <article class="membership-row${selectedClass}" data-membership-id="${customer.id}">
          <div class="membership-row-info">
            <strong>${customer.name}</strong>
            <span>${customer.phone}</span>
          </div>
          <div>${badge}</div>
          <span class="pending-row-amount">${customer.totalVisits} kunjungan</span>
          <span class="membership-row-action">Lihat Detail ›</span>
        </article>
      `;
    })
    .join("");
}

function renderMembershipDetail(customerId) {
  const customer = customers.find((c) => c.id === customerId);
  if (!customer) return;
  selectedMembershipId = customerId;
  renderMembershipList();

  document.querySelector("#mb-name").textContent = customer.name;
  document.querySelector("#mb-badge").innerHTML = getCustomerBadge(customer);
  document.querySelector("#mb-phone").textContent = `No HP: ${customer.phone}`;
  document.querySelector("#mb-visits").textContent = `${customer.totalVisits} kali`;

  const rewardsEl = document.querySelector("#mb-rewards");
  const rewards = getCustomerRewards(customer);
  if (!rewards.length) {
    rewardsEl.innerHTML = `
      <div class="membership-empty" style="border:0; height:auto; padding:24px;">
        <strong>Belum ada membership</strong>
        <span>Pelanggan ini belum terdaftar sebagai member.</span>
      </div>
    `;
    renderMembershipUsageHistory(customer);
    return;
  }

  rewardsEl.innerHTML = rewards
    .map((reward) => {
      const active = Math.min(reward.progress, reward.target);
      const bars = Array.from({ length: reward.target }, (_, index) => {
        const done = index < active;
        return `<i class="${done ? "done" : ""}"></i>`;
      }).join("");
      const headline = `${active}/${reward.target} kuota tersisa`;
      const readyClass = active > 0 ? " ready" : "";

      return `
        <div class="membership-reward-card${readyClass}">
          <span>Saldo Member</span>
          <strong>${getRewardName(reward, { withMember: true })}</strong>
          <small>${headline}</small>
          <div class="reward-progress-bar">${bars}</div>
        </div>
      `;
    })
    .join("");

  renderMembershipUsageHistory(customer);
}

function renderMembershipUsageHistory(customer) {
  const historyEl = document.querySelector("#mb-usage-history");
  if (!historyEl) return;

  const history = getMembershipUsageHistory(customer);
  if (!history.length) {
    historyEl.innerHTML = `
      <div class="membership-empty compact">
        <strong>Belum ada pemakaian</strong>
        <span>Riwayat pemakaian membership belum tersedia.</span>
      </div>
    `;
    return;
  }

  historyEl.innerHTML = history
    .map(
      (item) => `
        <article class="membership-usage-row">
          <div>
            <strong>${item.serviceName}</strong>
            <span>${item.dateTime}</span>
          </div>
          <b>(${item.qty})</b>
        </article>
      `,
    )
    .join("");
}

function clearMembershipDetail() {
  selectedMembershipId = null;
  renderMembershipList();
}

renderCustomer();
renderCustomerDropdown();
updateSearchPlaceholder();
updateCatalogHeading();
renderItems();
renderCart();
renderCustomerList();
renderCustomerDetail(activeDetailCustomerId);
setPayment(selectedPayment);
renderSalesList();
renderPendingList();
renderMembershipList();
