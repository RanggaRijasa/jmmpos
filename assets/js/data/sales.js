const salesTransactions = [
  {
    id: "POS-088046", time: "11:42", date: "27 Jun 2026", dateRaw: "2026-06-27", customer: "Dewi Anggraini", staff: "Wira", amount: 760000, payment: "Tunai",
    items: [
      { name: "Hair Cut", qty: 1, price: 160000, staff: "Wira", type: "service", memberFree: true, memberBranch: "Cabang Mulyosari" },
      { name: "Creambath", qty: 1, price: 230000, staff: "Kartini", type: "service" },
      { name: "Vitamin Rambut", qty: 1, price: 80000, type: "product" },
      { name: "Hair Colour", qty: 1, price: 450000, staff: "Siska", type: "service" },
    ],
    status: "Selesai", dp: 0, reward: 160000, memberBranch: "Cabang Mulyosari",
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
    id: "POS-088038", time: "15:10", date: "26 Jun 2026", dateRaw: "2026-06-26", customer: "Dewi Anggraini", staff: "Kartini", amount: 0, payment: "Tunai",
    items: [
      { name: "Gunting Rambut", qty: 1, price: 160000, staff: "Kartini", type: "service", memberFree: true, memberBranch: "Cabang Mulyosari" },
    ],
    status: "Selesai", dp: 0, reward: 160000, memberBranch: "Cabang Mulyosari",
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
    id: "POS-088034", time: "11:40", date: "26 Jun 2026", dateRaw: "2026-06-26", customer: "Siti Rahma", staff: "Wira", amount: 730000, payment: "Tunai",
    items: [
      { name: "Hair Colour", qty: 1, price: 450000, staff: "Wira", type: "service" },
      { name: "Creambath", qty: 1, price: 230000, staff: "Kartini", type: "service", memberFree: true, memberBranch: "Cabang Mulyosari" },
      { name: "Hair Spa", qty: 1, price: 280000, staff: "Nadya", type: "service" },
    ],
    status: "Pending", dp: 0, reward: 230000, memberBranch: "Cabang Mulyosari",
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
    id: "POS-088032", time: "09:45", date: "26 Jun 2026", dateRaw: "2026-06-26", customer: "Dewi Anggraini", staff: "Kartini", amount: 150000, payment: "Tunai",
    items: [
      { name: "Hair Colour", qty: 1, price: 600000, staff: "Kartini", type: "service", memberUpgrade: true, memberUseAmount: 450000, memberBranch: "Cabang Citraland" },
    ],
    status: "Pending", dp: 0, reward: 450000, memberBranch: "Cabang Citraland",
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

salesTransactions.forEach((transaction) => {
  transaction.branch = transaction.branch || getStaffBranch(transaction.staff);
});

let salesPage = 1;
const salesPerPage = 5;
let salesSearchTerm = "";
let selectedSalesId = null;
