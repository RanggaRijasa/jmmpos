const PARTIAL_PATHS = [
  "partials/home.html",
  "partials/pos.html",
  "partials/customers.html",
  "partials/membership.html",
  "partials/reminders.html",
  "partials/sales.html",
  "partials/pending.html",
  "partials/receipt.html",
];

const SCRIPT_PATHS = [
  "assets/js/data/catalog.js",
  "assets/js/data/customers.js",
  "assets/js/data/sales.js",
  "assets/js/core/state.js",
  "assets/js/features/pos/cart.js",
  "assets/js/features/customers/customers.js",
  "assets/js/features/pos/render.js",
  "assets/js/features/sales/sales.js",
  "assets/js/features/cms/cms.js",
  "assets/js/features/membership/membership.js",
  "assets/js/core/ui.js",
  "assets/js/core/events.js",
  "assets/js/main.js",
];

async function fetchPartial(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Gagal memuat ${path} (${response.status})`);
  }
  return response.text();
}

function loadScript(path) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = path;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Gagal memuat ${path}`));
    document.body.append(script);
  });
}

async function bootstrap() {
  const app = document.querySelector("#app");
  const [views, modals, cms] = await Promise.all([
    Promise.all(PARTIAL_PATHS.map(fetchPartial)),
    fetchPartial("partials/modals.html"),
    fetchPartial("partials/cms.html"),
  ]);

  app.innerHTML = `
    <main class="tablet-shell" aria-label="JMM Salon tablet cashier prototype">
      ${views.join("\n")}
    </main>
    ${modals}
    ${cms}
    <div class="toast" id="toast" hidden>Transaksi tersimpan</div>
  `;

  for (const path of SCRIPT_PATHS) {
    await loadScript(path);
  }
}

bootstrap().catch((error) => {
  console.error(error);
  document.querySelector("#app").innerHTML = `
    <main class="bootstrap-error">
      <h1>Aplikasi gagal dimuat</h1>
      <p>${error.message}</p>
      <small>Jalankan aplikasi melalui static web server, bukan langsung dari file system.</small>
    </main>
  `;
});
