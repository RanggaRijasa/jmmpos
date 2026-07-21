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

