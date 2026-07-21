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

