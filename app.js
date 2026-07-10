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
let activeStaffMenu = null;
let activeStaffAction = null;
let activeDiscountMenu = null;
let activeServiceLevelMenu = null;
let searchTerm = "";
let customerSearchTerm = "";
let dropdownSearchTerm = "";
let activeDetailCustomerId = "dewi";
let activeConfirmMode = "payment";
let lastReceipt = null;
let receiptReturnView = "pos-view";
let serviceLineCounter = 0;
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
    serviceLevel: getServiceLevels(item)[0],
    ...options,
  };
  line.price = line.serviceLevel?.price || item.price;
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

function getServiceUpgradeOptions(item, customer = selectedCustomer) {
  const reward = getMemberRewardForService(item?.itemId || item?.id, customer);
  if (!reward || getMemberRemaining(reward) <= 0) return [];
  const memberValue = getMemberUnitPrice(reward);
  return getServiceLevels(item)
    .filter((level) => level.id !== "normal")
    .map((level) => ({
      ...level,
      memberValue,
      topUp: Math.max(0, level.price - memberValue),
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

  if (level.id === "normal") {
    releaseMemberUsage(line);
    line.serviceLevel = level;
    line.price = level.price;
    return true;
  }

  const reward = getMemberRewardForService(line.itemId);
  const rewardId = getRewardId(reward);
  if (!reward || (!line.memberUsageRewardId && getMemberRemaining(reward) <= 0)) {
    showToast("Saldo member untuk jasa ini habis");
    return false;
  }

  if (line.memberUsageRewardId && line.memberUsageRewardId !== rewardId) releaseMemberUsage(line);
  if (!line.memberUsageRewardId) {
    memberUsage[rewardId] = getMemberUsed(rewardId) + 1;
    line.memberUsageRewardId = rewardId;
  }

  line.memberFree = false;
  line.memberUpgrade = true;
  line.memberUseAmount = getMemberUnitPrice(reward);
  line.serviceLevel = level;
  line.price = level.price;
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
  if (item.type !== "service" || item.memberFree) return [];
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
  };
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
    <strong>${selectedCustomer.name}</strong>
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
  const change = Math.max(0, cashReceived - payable);
  const cashFields =
    mode === "payment" && selectedPayment === "Tunai"
      ? `
        <div class="modal-cash-row">
          <span>Uang diterima</span>
          <label class="modal-dp-input">
            <input type="number" id="modal-cash-received" inputmode="numeric" min="0" placeholder="0" value="${cashReceived}" />
          </label>
        </div>
        <div class="modal-change-row">
          <span>Kembalian</span>
          <strong id="modal-change">${formatMoney(change)}</strong>
        </div>`
      : "";

  summary.innerHTML = `
    <div><span>Pelanggan</span><strong>${customerLabel}</strong></div>
    <div><span>Item</span><strong>${selected.length} item</strong></div>
    ${mode === "draft" ? "" : `<div><span>Pembayaran</span><strong>${selectedPayment}</strong></div>`}
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
    ${cashFields}
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

  renderConfirmationSummary(mode);
  modal.hidden = false;
}

function closeConfirmation() {
  document.querySelector("#confirm-modal").hidden = true;
  customDp = 0;
  cashReceived = 0;
}

function openAddCustomerModal() {
  const modal = document.querySelector("#add-customer-modal");
  if (modal) modal.hidden = false;
}

function closeAddCustomerModal() {
  const modal = document.querySelector("#add-customer-modal");
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
      lastReceipt = createReceiptSnapshot();
      closeConfirmation();
      setReceiptReturn("pos-view");
      renderReceipt(lastReceipt);
      prepareNextTransaction();
      setView("receipt-view");
      showToast("Pembayaran tersimpan");
      return;
    }

    closeConfirmation();
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

function renderPendingList() {
  const list = document.querySelector("#pending-list");
  if (!list) return;

  const pending = getPendingTransactions();

  if (!pending.length) {
    list.innerHTML = `
      <div class="empty-cart" style="border:0; background:transparent;">
        <strong>Tidak ada transaksi pending</strong>
        <span>Semua transaksi telah diselesaikan.</span>
      </div>`;
    return;
  }

  list.innerHTML = pending
    .map((t) => {
      return `
        <article class="pending-row" data-pending-id="${t.id}">
          <div class="pending-row-time">
            <strong>${t.time}</strong>
            <span>${t.date}</span>
          </div>
          <div class="pending-row-info">
            <strong>${t.customer}</strong>
            <span>${t.staff} · ${t.id}</span>
          </div>
          <span class="pending-row-status">Pending</span>
          <span class="pending-row-amount">${formatMoney(t.amount)}</span>
        </article>
      `;
    })
    .join("");
}

function loadPendingTransaction(id) {
  const t = salesTransactions.find((x) => x.id === id);
  if (!t) return;

  resetCart();
  selectedCustomer = customers.find((customer) => customer.name === t.customer) || null;
  selectedPayment = t.payment === "Tunai" ? "Tunai" : "QRIS";
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
    } else {
      catalogItem.qty = Math.min(line.qty || 1, getMaxQty(catalogItem));
      if (catalogItem.type === "member") {
        catalogItem.staff = line.staff || t.staff || "";
      }
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

document.addEventListener("input", (event) => {
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    blurNativeDateTimePicker();
    if (activeDiscountMenu) {
      activeDiscountMenu = null;
      renderCart();
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
