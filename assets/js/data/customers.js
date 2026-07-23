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
    lastService: "-",
    lastVisitBranch: "",
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
    frequentBranch: "Cabang Kartini",
    totalVisits: 18,
    lastVisit: "27 Jun 2026",
    lastService: "Gunting Rambut",
    lastVisitBranch: "Cabang Mulyosari",
    reminderDate: "04 Jul 2026",
    dp: 0,
    rewards: [
      { membershipId: "member-detok-rontok", branch: "Cabang Kartini", progress: 4, target: 6 },
      { serviceId: "cut", serviceName: "Gunting Rambut", branch: "Cabang Mulyosari", progress: 10, target: 10 },
      { serviceId: "colour", serviceName: "Hair Colour", branch: "Cabang Citraland", progress: 7, target: 10 },
      { serviceId: "cream", serviceName: "Creambath", branch: "Cabang Kartini", progress: 4, target: 6 },
    ],
  },
  {
    id: "siti",
    code: "CUST.0002",
    name: "Siti Rahma",
    phone: "0813 2222 8899",
    status: "Member",
    type: "member",
    frequentBranch: "Cabang Mulyosari",
    totalVisits: 12,
    lastVisit: "20 Jun 2026",
    lastService: "Hair Colour",
    lastVisitBranch: "Cabang Mulyosari",
    reminderDate: "27 Jun 2026",
    dp: 0,
    rewards: [
      { serviceId: "cream", serviceName: "Creambath", branch: "Cabang Mulyosari", progress: 6, target: 10 },
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
    lastService: "Creambath",
    lastVisitBranch: "Cabang Kartini",
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
    frequentBranch: "Cabang Kartini",
    totalVisits: 24,
    lastVisit: "18 Jun 2026",
    lastService: "Keratin Treatment",
    lastVisitBranch: "Cabang Citraland",
    reminderDate: "25 Jun 2026",
    dp: 150000,
    rewards: [
      { serviceId: "cut", serviceName: "Gunting Rambut", branch: "Cabang Kartini", progress: 6, target: 6 },
      { serviceId: "keratin", serviceName: "Keratin Treatment", branch: "Cabang Citraland", progress: 4, target: 10 },
    ],
  },
  {
    id: "rika",
    code: "CUST.0005",
    name: "Rika Amelia",
    phone: "0819 7733 4466",
    status: "Member",
    type: "member",
    frequentBranch: "Cabang Citraland",
    totalVisits: 10,
    lastVisit: "17 Jun 2026",
    lastService: "Smoothing",
    lastVisitBranch: "Cabang Kartini",
    reminderDate: "24 Jun 2026",
    dp: 100000,
    rewards: [
      { serviceId: "hairwash", serviceName: "Hair Wash", branch: "Cabang Citraland", progress: 10, target: 10 },
    ],
  },
  {
    id: "maya",
    code: "CUST.0006",
    name: "Maya Putri",
    phone: "0877 4040 7007",
    status: "Member",
    type: "member",
    frequentBranch: "Cabang Mulyosari",
    totalVisits: 16,
    lastVisit: "15 Jun 2026",
    lastService: "Hair Spa",
    lastVisitBranch: "Cabang Citraland",
    reminderDate: "22 Jun 2026",
    dp: 50000,
    rewards: [
      { serviceId: "keratin", serviceName: "Keratin Treatment", branch: "Cabang Mulyosari", progress: 8, target: 10 },
      { serviceId: "cream", serviceName: "Creambath", branch: "Cabang Kartini", progress: 5, target: 6 },
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
    lastService: "Blow Dry",
    lastVisitBranch: "Cabang Mulyosari",
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
    frequentBranch: "Cabang Kartini",
    totalVisits: 8,
    lastVisit: "08 Jun 2026",
    lastService: "Manicure",
    lastVisitBranch: "Cabang Kartini",
    reminderDate: "15 Jun 2026",
    dp: 0,
    rewards: [
      { serviceId: "cream", serviceName: "Creambath", branch: "Cabang Kartini", progress: 8, target: 10 },
    ],
  },
  {
    id: "intan",
    code: "CUST.0009",
    name: "Intan Permata",
    phone: "0822 6060 9911",
    status: "Member",
    type: "member",
    frequentBranch: "Cabang Citraland",
    totalVisits: 20,
    lastVisit: "07 Jun 2026",
    lastService: "Pedicure",
    lastVisitBranch: "Cabang Citraland",
    reminderDate: "14 Jun 2026",
    dp: 0,
    rewards: [
      { serviceId: "colour", serviceName: "Hair Colour", branch: "Cabang Citraland", progress: 10, target: 10 },
      { serviceId: "cut", serviceName: "Gunting Rambut", branch: "Cabang Mulyosari", progress: 3, target: 6 },
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
    lastService: "Make Up",
    lastVisitBranch: "Cabang Kartini",
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
    frequentBranch: "Cabang Mulyosari",
    totalVisits: 31,
    lastVisit: "02 Jun 2026",
    lastService: "Hair Toning",
    lastVisitBranch: "Cabang Mulyosari",
    reminderDate: "09 Jun 2026",
    dp: 200000,
    reward: { serviceId: "smoothing", serviceName: "Smoothing", branch: "Cabang Mulyosari", progress: 7, target: 10 },
  },
  {
    id: "salsa",
    code: "CUST.0012",
    name: "Salsa Nadia",
    phone: "0878 3311 2200",
    status: "Member",
    type: "member",
    frequentBranch: "Cabang Kartini",
    totalVisits: 5,
    lastVisit: "01 Jun 2026",
    lastService: "Digital Perm",
    lastVisitBranch: "Cabang Kartini",
    reminderDate: "08 Jun 2026",
    dp: 0,
    reward: { serviceId: "hairspa", serviceName: "Hair Spa", branch: "Cabang Kartini", progress: 5, target: 6 },
  },
];

const salonBranches = [
  { id: "kartini", name: "Cabang Kartini", code: "KARTINI", address: "Jl. Kartini No.100 Surabaya" },
  { id: "mulyosari", name: "Cabang Mulyosari", code: "MULYOSARI", address: "Jl. Mulyosari No.88 Surabaya" },
  { id: "citraland", name: "Cabang Citraland", code: "CITRALAND", address: "Jl. Puncak Indah Lontar No.5 Surabaya" },
];

const DEFAULT_SALON_BRANCH = salonBranches[0].name;

const staffDirectory = [
  { id: "STF-001", name: "Kartini", phone: "0812 2400 5800", branch: "Cabang Kartini", specialty: "Hair Cut & Styling", status: "Aktif" },
  { id: "STF-002", name: "Wira", phone: "0813 2537 5883", branch: "Cabang Mulyosari", specialty: "Colour & Treatment", status: "Aktif" },
  { id: "STF-003", name: "Siska", phone: "0814 2674 5966", branch: "Cabang Citraland", specialty: "Beauty Care", status: "Aktif" },
  { id: "STF-004", name: "Priscila", phone: "0815 2811 6049", branch: "Cabang Kartini", specialty: "Hair Cut & Styling", status: "Aktif" },
  { id: "STF-005", name: "Sapriti", phone: "0816 2948 6132", branch: "Cabang Mulyosari", specialty: "Colour & Treatment", status: "Aktif" },
  { id: "STF-006", name: "Nadya", phone: "0817 3085 6215", branch: "Cabang Citraland", specialty: "Beauty Care", status: "Aktif" },
  { id: "STF-007", name: "Dewi", phone: "0818 3222 6298", branch: "Cabang Kartini", specialty: "Hair Cut & Styling", status: "Aktif" },
  { id: "STF-008", name: "Rani", phone: "0812 3359 6381", branch: "Cabang Mulyosari", specialty: "Colour & Treatment", status: "Aktif" },
  { id: "STF-009", name: "Yuni", phone: "0813 3496 6464", branch: "Cabang Citraland", specialty: "Beauty Care", status: "Aktif" },
  { id: "STF-010", name: "Laras", phone: "0814 3633 6547", branch: "Cabang Kartini", specialty: "Hair Cut & Styling", status: "Aktif" },
  { id: "STF-011", name: "Tika", phone: "0815 3770 6630", branch: "Cabang Mulyosari", specialty: "Colour & Treatment", status: "Cuti" },
  { id: "STF-012", name: "Mira", phone: "0816 3907 6713", branch: "Cabang Citraland", specialty: "Beauty Care", status: "Aktif" },
];

const staffOptions = staffDirectory.map((staff) => staff.name);

const staffPresence = {
  Kartini: "Cabang Kartini",
  Priscila: "Cabang Kartini",
  Dewi: "Cabang Kartini",
  Wira: "Cabang Kartini",
  Sapriti: "Cabang Mulyosari",
  Rani: "Cabang Mulyosari",
  Siska: "Cabang Citraland",
  Nadya: "Cabang Citraland",
  Yuni: "Cabang Citraland",
};

function getSalonBranch(name = DEFAULT_SALON_BRANCH) {
  return salonBranches.find((branch) => branch.name === name) || salonBranches[0];
}

function getStaffRecord(name) {
  return staffDirectory.find((staff) => staff.name === name) || null;
}

function getStaffBranch(name) {
  return getStaffRecord(name)?.branch || DEFAULT_SALON_BRANCH;
}

function getStaffPresenceBranch(name) {
  return staffPresence[name] || "";
}

function isStaffOnlineAtBranch(name, branch) {
  return getStaffPresenceBranch(name) === branch;
}

function getOnlineStaff(branch) {
  return staffDirectory.filter((staff) => staff.status === "Aktif" && isStaffOnlineAtBranch(staff.name, branch));
}

function getStaffPresenceGroups(branch) {
  const activeStaff = staffDirectory.filter((staff) => staff.status === "Aktif");
  const online = activeStaff.filter((staff) => isStaffOnlineAtBranch(staff.name, branch));
  const others = activeStaff
    .filter((staff) => !isStaffOnlineAtBranch(staff.name, branch))
    .sort((left, right) => Number(right.branch === branch) - Number(left.branch === branch) || left.name.localeCompare(right.name));
  return { online, others };
}

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
