function renderHomeOnlineStaff() {
  const count = document.querySelector("#home-online-staff-count");
  const branch = document.querySelector("#home-online-staff-branch");
  const summary = document.querySelector("#home-online-staff-summary");

  const online = getOnlineStaff(activeSalonBranch);
  if (count) count.textContent = String(online.length);
  if (branch) branch.textContent = activeSalonBranch;
  if (summary) {
    const visibleNames = online.slice(0, 2).map((staff) => staff.name).join(", ");
    const remaining = online.length - 2;
    summary.textContent = online.length
      ? `${visibleNames}${remaining > 0 ? ` +${remaining}` : ""}`
      : "Belum diatur";
  }
}

function renderStaffPresenceList() {
  const list = document.querySelector("#staff-presence-list");
  const saveButton = document.querySelector("#save-staff-presence");
  if (!list) return;

  const term = staffPresenceSearchTerm.trim().toLowerCase();
  const staff = staffDirectory.filter((person) => {
    if (person.status !== "Aktif") return false;
    const currentBranch = getStaffPresenceBranch(person.name);
    return !term || `${person.name} ${person.branch} ${person.specialty} ${currentBranch}`.toLowerCase().includes(term);
  });

  list.innerHTML = staff.length ? staff.map((person) => {
    const checked = staffPresenceDraftNames.includes(person.name);
    const currentBranch = getStaffPresenceBranch(person.name);
    const isHelping = person.branch !== staffPresenceDraftBranch;
    const elsewhere = currentBranch && currentBranch !== staffPresenceDraftBranch;
    return `
      <label class="staff-presence-option${checked ? " selected" : ""}">
        <input type="checkbox" data-staff-presence-name="${person.name}" ${checked ? "checked" : ""} />
        <span class="staff-presence-avatar">${person.name.charAt(0)}</span>
        <span class="staff-presence-copy">
          <strong>${person.name}${isHelping ? '<em>Bantuan cabang</em>' : ""}</strong>
          <small>Asal ${person.branch}${elsewhere ? ` · sedang online di ${currentBranch}` : ""}</small>
        </span>
      </label>`;
  }).join("") : '<div class="staff-presence-empty">Petugas tidak ditemukan.</div>';

  if (saveButton) saveButton.textContent = `Simpan ${staffPresenceDraftNames.length} Online`;
}

function renderStaffPresenceModal() {
  const branchSelect = document.querySelector("#staff-presence-branch");
  const search = document.querySelector("#staff-presence-search");
  if (branchSelect) branchSelect.value = staffPresenceDraftBranch;
  if (search) search.value = staffPresenceSearchTerm;
  renderStaffPresenceList();
}

function openStaffPresenceModal(branch = activeSalonBranch) {
  const modal = document.querySelector("#staff-presence-modal");
  const trigger = document.querySelector("#manage-staff-presence");
  if (!modal) {
    showToast("Panel petugas online belum tersedia");
    return;
  }
  staffPresenceDraftBranch = salonBranches.some((entry) => entry.name === branch) ? branch : DEFAULT_SALON_BRANCH;
  staffPresenceDraftNames = getOnlineStaff(staffPresenceDraftBranch).map((staff) => staff.name);
  staffPresenceSearchTerm = "";
  renderStaffPresenceModal();
  modal.hidden = false;
  if (trigger) trigger.setAttribute("aria-expanded", "true");
}

function closeStaffPresenceModal() {
  const modal = document.querySelector("#staff-presence-modal");
  const trigger = document.querySelector("#manage-staff-presence");
  if (modal) modal.hidden = true;
  if (trigger) trigger.setAttribute("aria-expanded", "false");
}

function setStaffPresenceDraftBranch(branch) {
  staffPresenceDraftBranch = salonBranches.some((entry) => entry.name === branch) ? branch : DEFAULT_SALON_BRANCH;
  staffPresenceDraftNames = getOnlineStaff(staffPresenceDraftBranch).map((staff) => staff.name);
  staffPresenceSearchTerm = "";
  renderStaffPresenceModal();
}

function toggleStaffPresenceDraft(name, online) {
  if (!getStaffRecord(name) || getStaffRecord(name).status !== "Aktif") return;
  staffPresenceDraftNames = online
    ? [...new Set([...staffPresenceDraftNames, name])]
    : staffPresenceDraftNames.filter((staffName) => staffName !== name);
  renderStaffPresenceList();
}

function saveStaffPresence() {
  Object.keys(staffPresence).forEach((name) => {
    if (staffPresence[name] === staffPresenceDraftBranch && !staffPresenceDraftNames.includes(name)) delete staffPresence[name];
  });
  staffPresenceDraftNames.forEach((name) => {
    staffPresence[name] = staffPresenceDraftBranch;
  });
  closeStaffPresenceModal();
  renderHomeOnlineStaff();
  activeStaffMenu = null;
  activeStaffAction = null;
  renderCart();
  showToast(`${staffPresenceDraftNames.length} petugas online di ${staffPresenceDraftBranch}`);
}
