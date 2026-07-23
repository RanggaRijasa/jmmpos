function setView(id) {
  const isCmsView = id === "cms-view";
  document.body.classList.toggle("cms-mode", isCmsView);

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === id);
  });
  syncSalonBranchUi();

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
  if (id === "home-view") renderHomeOnlineStaff();
}

document.addEventListener("click", (event) => {
  if (!event.target.closest('input[type="date"], input[type="time"]')) {
    blurNativeDateTimePicker();
  }
  const shouldKeepMemberListOpen = Boolean(event.target.closest(".item-card, .cart-qty button"));
  if (!event.target.closest("#customer-picker")) {
    closeCustomerPopovers({ keepBenefits: shouldKeepMemberListOpen });
  }

  if (event.target.closest("#manage-staff-presence")) {
    openStaffPresenceModal(activeSalonBranch);
    return;
  }

  if (event.target.closest("#close-staff-presence, #cancel-staff-presence")) {
    closeStaffPresenceModal();
    return;
  }

  if (event.target.closest("#save-staff-presence")) {
    saveStaffPresence();
    return;
  }

  if (event.target.id === "staff-presence-modal") {
    closeStaffPresenceModal();
    return;
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
    if (!item || item.memberFree || item.memberUpgrade) return;
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
    if (Number.isNaN(value) || value < 0 || value > 100) {
      showToast("Masukkan angka diskon 0-100");
      return;
    }
    const fixedRate = getLineFixedDiscountRate(item);
    if (fixedRate + value > 100) {
      showToast("Total diskon tidak boleh lebih dari 100%");
      return;
    }
    item.discounts = value ? [value] : [];
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
      applyDefaultServicePromotion(item);
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
      saveCompletedTransaction(lastReceipt);
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
    document.querySelector("#filter-branch").value = "";
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
    updateReminderDoneCount();
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

document.addEventListener("change", (event) => {
  const commissionFilter = event.target.closest("#commission-date-from, #commission-date-to, #commission-time-from, #commission-time-to, #commission-branch-filter");
  if (commissionFilter) {
    updateCommissionReportFilter(commissionFilter);
    return;
  }

  const presenceBranchSelect = event.target.closest("#staff-presence-branch");
  if (presenceBranchSelect) {
    setStaffPresenceDraftBranch(presenceBranchSelect.value);
    return;
  }

  const presenceCheckbox = event.target.closest("[data-staff-presence-name]");
  if (presenceCheckbox) {
    toggleStaffPresenceDraft(presenceCheckbox.dataset.staffPresenceName, presenceCheckbox.checked);
    return;
  }

  const branchSelect = event.target.closest("#pos-branch-select");
  if (!branchSelect) return;
  activeSalonBranch = salonBranches.some((branch) => branch.name === branchSelect.value)
    ? branchSelect.value
    : DEFAULT_SALON_BRANCH;
  syncSalonBranchUi();
  activeStaffMenu = null;
  activeStaffAction = null;
  renderCart();
  showToast(`Cabang transaksi: ${activeSalonBranch}`);
});

document.addEventListener("input", (event) => {
  const presenceSearch = event.target.closest("#staff-presence-search");
  if (!presenceSearch) return;
  staffPresenceSearchTerm = presenceSearch.value;
  renderStaffPresenceList();
});
