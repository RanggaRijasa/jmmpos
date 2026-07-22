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

function getCustomerMemberBranch(customer) {
  if (!customer || customer.type === "non-member" || customer.status === "Non Member") return "";
  return customer.memberBranch || "Cabang belum ditentukan";
}

function transactionUsesMember(transaction) {
  return Boolean(
    transaction?.reward > 0 ||
      transaction?.items?.some((item) => item.memberFree || item.memberUpgrade || item.memberUsageRewardId),
  );
}

function getTransactionMemberBranch(transaction) {
  if (!transactionUsesMember(transaction)) return "";
  const itemBranch = transaction.items?.find((item) => item.memberBranch)?.memberBranch;
  if (transaction.memberBranch || itemBranch) return transaction.memberBranch || itemBranch;
  const customer = customers.find((entry) => entry.name === transaction.customer);
  return getCustomerMemberBranch(customer);
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
  return `${getRewardName(reward)} · ${getCustomerMemberBranch(customer)}: ${reward.progress}/${reward.target} tersisa`;
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
      <small>${getRewardName(reward)} · ${getCustomerMemberBranch(customer)} · ${headline}</small>
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
    branch: getCustomerMemberBranch(selectedCustomer),
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
    memberBranch: item.memberUsageRewardId ? getCustomerMemberBranch(selectedCustomer) : item.memberBranch || "",
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
    memberBranch: totals.reward?.branch || "",
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
      memberFree: Boolean(item.memberFree),
      memberUpgrade: Boolean(item.memberUpgrade),
      memberUsageRewardId: item.memberUsageRewardId || "",
      memberUseAmount: item.memberUseAmount || 0,
      memberBranch: item.memberUsageRewardId ? getCustomerMemberBranch(selectedCustomer) : "",
    })),
    status: "Pending",
    dp: totals.dp,
    reward: totals.rewardAmount,
    memberBranch: totals.rewardAmount ? totals.reward?.branch || getCustomerMemberBranch(selectedCustomer) : "",
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
    memberUpgrade: Boolean(line.memberUpgrade),
    memberUseAmount: line.memberUseAmount || 0,
    memberBranch: line.memberBranch || "",
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
    memberBranch: getTransactionMemberBranch(transaction),
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
    ? `<div class="receipt-subline">Pemakaian Member · ${formatReceiptAmount(item.memberUseAmount || 0)}${item.memberBranch ? ` · ${item.memberBranch}` : ""}</div>`
    : item.memberFree
      ? `<div class="receipt-subline">Pemakaian Member${item.memberBranch ? ` · ${item.memberBranch}` : ""}</div>`
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
    ? `<div><span>Member${receipt.memberBranch ? ` · ${receipt.memberBranch}` : ""}</span><strong>- ${formatReceiptAmount(receipt.rewardAmount)}</strong></div>`
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
      ${receipt.memberBranch ? `<div><span>Cabang Member</span><strong>${receipt.memberBranch}</strong></div>` : ""}
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
