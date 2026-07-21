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

