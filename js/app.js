(function () {
  "use strict";

  const T = window.TIENDA;
  const PRODUCTOS = window.PRODUCTOS;
  const CATEGORIAS = window.CATEGORIAS;
  const STORAGE_KEY = "purartesanias-pedido";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const money = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
  const escapeHTML = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const byId = Object.fromEntries(PRODUCTOS.map((p) => [p.id, p]));
  const catName = Object.fromEntries(CATEGORIAS.map((c) => [c.id, c.nombre]));
  const hasPrice = (p) => T.mostrarPrecios && typeof p.precio === "number";
  const priceHTML = (p) =>
    hasPrice(p) ? `<span class="price">${money.format(p.precio)}</span>` : `<span class="price price--ask">Consultar precio</span>`;

  /* ---------- Contacto ---------- */
  const waUrl = (text) => `https://wa.me/${T.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
  const mailUrl = (subject, body) =>
    `mailto:${T.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\n/g, "\r\n"))}`;
  const prettyPhone = (n) => "+" + n.replace(/^(\d{2})(\d)(\d{3})(\d{3})(\d+)$/, "$1 $2 $3 $4-$5");

  function setupContact() {
    $$("[data-wa-link]").forEach((a) => (a.href = waUrl(`¡Hola ${T.nombre}! Tengo una consulta.`)));
    $$("[data-wa-text]").forEach((el) => (el.textContent = prettyPhone(T.whatsapp)));
    $$("[data-mail-link]").forEach((a) => (a.href = `mailto:${T.email}`));
    $$("[data-mail-text]").forEach((el) => (el.textContent = T.email));
    if (T.instagram) {
      $$("[data-ig-link]").forEach((a) => {
        a.href = `https://instagram.com/${T.instagram}`;
        a.hidden = false;
      });
      $$("[data-ig-text]").forEach((el) => (el.textContent = "@" + T.instagram));
    }
    $$("[data-map-link]").forEach((a) => (a.href = T.mapaLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(T.ubicacion)}`));
    if (T.mapaEmbed) {
      const iframe = document.createElement("iframe");
      iframe.src = T.mapaEmbed;
      iframe.title = `Mapa: ${T.nombre} en ${T.ubicacion}`;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.allowFullscreen = true;
      $("[data-map-placeholder]").replaceWith(iframe);
    }
    $$("[data-ubicacion]").forEach((el) => (el.textContent = T.ubicacion));
    $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  /* ---------- Catálogo ---------- */
  let filtro = "todos";

  function renderFilters() {
    const cont = $("[data-filters]");
    const cats = [{ id: "todos", nombre: "Todo" }, ...CATEGORIAS.filter((c) => PRODUCTOS.some((p) => p.categoria === c.id))];
    cont.innerHTML = cats
      .map((c) => `<button class="chip" type="button" data-cat="${c.id}" aria-pressed="${c.id === filtro}">${escapeHTML(c.nombre)}</button>`)
      .join("");
    cont.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-cat]");
      if (!btn) return;
      filtro = btn.dataset.cat;
      $$("[data-cat]", cont).forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === filtro));
      renderGrid();
    });
  }

  function optionSelect(p, idPrefix) {
    if (!p.opciones) return "";
    const id = `${idPrefix}-${p.id}`;
    return `<label class="opt-label" for="${id}">${escapeHTML(p.opciones.nombre)}
      <select class="select" id="${id}" data-option>
        ${p.opciones.valores.map((v) => `<option>${escapeHTML(v)}</option>`).join("")}
      </select></label>`;
  }

  function cardHTML(p) {
    const badge = p.agotado
      ? `<span class="badge badge--out">Agotado</span>`
      : p.destacado
        ? `<span class="badge">Favorito</span>`
        : "";
    return `<article class="card" data-product="${p.id}">
      <button class="card__media" type="button" data-details aria-label="Ver detalle de ${escapeHTML(p.nombre)}">
        <img src="${escapeHTML(p.imagen)}" alt="${escapeHTML(p.nombre)}" loading="lazy" width="800" height="600" />
        ${badge}
      </button>
      <div class="card__body">
        <span class="card__cat">${escapeHTML(catName[p.categoria] || "")}</span>
        <h3 class="card__title"><button type="button" data-details>${escapeHTML(p.nombre)}</button></h3>
        <p class="card__desc">${escapeHTML(p.descripcion)}</p>
        ${optionSelect(p, "opt")}
        <div class="card__foot">
          ${priceHTML(p)}
          <button class="btn btn--primary btn--small" type="button" data-add ${p.agotado ? "disabled" : ""}>
            ${p.agotado ? "Agotado" : "Agregar"}
          </button>
        </div>
      </div>
    </article>`;
  }

  function renderGrid() {
    const grid = $("[data-grid]");
    const lista = PRODUCTOS.filter((p) => filtro === "todos" || p.categoria === filtro).sort(
      (a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0) || (a.agotado ? 1 : 0) - (b.agotado ? 1 : 0)
    );
    grid.innerHTML = lista.length ? lista.map(cardHTML).join("") : `<p class="empty">No hay productos en esta categoría por ahora.</p>`;
  }

  function handleProductClicks(root) {
    root.addEventListener("click", (e) => {
      const scope = e.target.closest("[data-product]");
      if (!scope) return;
      const p = byId[scope.dataset.product];
      if (e.target.closest("[data-add]")) {
        const sel = $("[data-option]", scope);
        addToCart(p, sel ? sel.value : null);
        if (root === dialog) dialog.close();
      } else if (e.target.closest("[data-details]")) {
        openDialog(p);
      }
    });
  }

  /* ---------- Detalle ---------- */
  const dialog = $("[data-dialog]");

  function openDialog(p) {
    $("[data-dialog-content]").innerHTML = `
      <img src="${escapeHTML(p.imagen)}" alt="${escapeHTML(p.nombre)}" />
      <div class="product-dialog__info" data-product="${p.id}">
        <span class="card__cat">${escapeHTML(catName[p.categoria] || "")}</span>
        <h3 id="dialog-title">${escapeHTML(p.nombre)}</h3>
        ${priceHTML(p)}
        <p>${escapeHTML(p.descripcion)}</p>
        ${optionSelect(p, "dlg")}
        <button class="btn btn--primary" type="button" data-add ${p.agotado ? "disabled" : ""}>
          ${p.agotado ? "Agotado" : "Agregar al pedido"}
        </button>
        <a class="link-btn" href="${waUrl(`¡Hola! Quisiera más fotos o info de: ${p.nombre}`)}" target="_blank" rel="noopener">Pedir más fotos por WhatsApp</a>
      </div>`;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  $("[data-close-dialog]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  /* ---------- Pedido ---------- */
  let cart = load();

  function load() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(data) ? data.filter((i) => byId[i.id] && i.qty > 0) : [];
    } catch {
      return [];
    }
  }
  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* sin almacenamiento: el pedido dura mientras la página esté abierta */
    }
  }

  function addToCart(p, opcion) {
    const item = cart.find((i) => i.id === p.id && i.opcion === opcion);
    if (item) item.qty += 1;
    else cart.push({ id: p.id, opcion, qty: 1 });
    save();
    renderCart();
    toast(`Agregado: ${p.nombre}`);
    const btn = $(".cart-btn");
    btn.classList.remove("bump");
    void btn.offsetWidth;
    btn.classList.add("bump");
  }

  const totalItems = () => cart.reduce((n, i) => n + i.qty, 0);
  const totalPrice = () => cart.reduce((s, i) => s + (hasPrice(byId[i.id]) ? byId[i.id].precio * i.qty : 0), 0);
  const allPriced = () => cart.every((i) => hasPrice(byId[i.id]));

  function renderCart() {
    const n = totalItems();
    const count = $("[data-cart-count]");
    count.textContent = n;
    count.hidden = n === 0;

    $("[data-cart-empty]").hidden = n > 0;
    $("[data-order-form]").hidden = n === 0;

    $("[data-cart-list]").innerHTML = cart
      .map((i, idx) => {
        const p = byId[i.id];
        const opt = i.opcion ? `<div class="cart-item__opt">${escapeHTML(p.opciones?.nombre || "Opción")}: ${escapeHTML(i.opcion)}</div>` : "";
        const price = hasPrice(p) ? money.format(p.precio * i.qty) : "Consultar";
        return `<li class="cart-item">
          <img src="${escapeHTML(p.imagen)}" alt="" />
          <div>
            <div class="cart-item__name">${escapeHTML(p.nombre)}</div>
            ${opt}
            <div class="cart-item__price">${price}</div>
          </div>
          <div class="cart-item__side">
            <div class="qty">
              <button type="button" data-qty="${idx}" data-delta="-1" aria-label="Quitar uno">−</button>
              <span>${i.qty}</span>
              <button type="button" data-qty="${idx}" data-delta="1" aria-label="Agregar uno">+</button>
            </div>
            <button class="link-btn remove" type="button" data-remove="${idx}">Quitar</button>
          </div>
        </li>`;
      })
      .join("");

    const total = totalPrice();
    $("[data-cart-total]").textContent = total ? money.format(total) + (allPriced() ? "" : " + a consultar") : "A consultar";
  }

  $("[data-cart-list]").addEventListener("click", (e) => {
    const q = e.target.closest("[data-qty]");
    const r = e.target.closest("[data-remove]");
    if (q) {
      const item = cart[+q.dataset.qty];
      item.qty += +q.dataset.delta;
      if (item.qty <= 0) cart.splice(+q.dataset.qty, 1);
    } else if (r) {
      cart.splice(+r.dataset.remove, 1);
    } else return;
    save();
    renderCart();
  });

  $("[data-clear-cart]").addEventListener("click", () => {
    if (!confirm("¿Vaciar el pedido?")) return;
    cart = [];
    save();
    renderCart();
  });

  /* ---------- Cajón del pedido ---------- */
  const drawer = $("[data-drawer]");
  const overlay = $("[data-overlay]");
  let lastFocus = null;

  function openCart() {
    lastFocus = document.activeElement;
    drawer.inert = false;
    drawer.setAttribute("aria-hidden", "false");
    drawer.classList.add("is-open");
    overlay.hidden = false;
    document.body.classList.add("no-scroll");
    setTimeout(() => $("[data-close-cart]", drawer).focus(), 50);
  }
  function closeCart() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    drawer.inert = true;
    overlay.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }

  $$("[data-open-cart]").forEach((b) => b.addEventListener("click", openCart));
  $$("[data-close-cart]").forEach((b) => b.addEventListener("click", closeCart));
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) closeCart();
  });

  /* ---------- Enviar pedido ---------- */
  const form = $("[data-order-form]");
  const ciudadField = $("[data-ciudad-field]");
  const syncCiudad = () => (ciudadField.hidden = form.entrega.value === "Retiro en Salta");
  form.entrega.addEventListener("change", syncCiudad);
  syncCiudad();

  let sendVia = "whatsapp";
  $$("[data-send]", form).forEach((b) => b.addEventListener("click", () => (sendVia = b.dataset.send)));

  function buildMessage(d) {
    const lines = [`¡Hola ${T.nombre}! Quiero hacer este pedido:`, ""];
    cart.forEach((i) => {
      const p = byId[i.id];
      const opt = i.opcion ? ` (${p.opciones?.nombre || "Opción"}: ${i.opcion})` : "";
      const price = hasPrice(p) ? ` — ${money.format(p.precio * i.qty)}` : " — precio a consultar";
      lines.push(`• ${i.qty} × ${p.nombre}${opt}${price}`);
    });
    const total = totalPrice();
    lines.push("");
    if (total) lines.push(`Total estimado: ${money.format(total)}${allPriced() ? "" : " + ítems a consultar"} (sin envío)`);
    lines.push(`Nombre: ${d.nombre}`);
    lines.push(`Entrega: ${d.entrega}`);
    if (d.ciudad && d.entrega !== "Retiro en Salta") lines.push(`Ciudad / provincia: ${d.ciudad}`);
    if (d.comentario) lines.push(`Comentarios: ${d.comentario}`);
    lines.push("", "¡Gracias!");
    return lines.join("\n");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = form.nombre;
    if (!nombre.value.trim()) {
      nombre.classList.add("is-invalid");
      nombre.focus();
      toast("Contanos tu nombre para el pedido");
      return;
    }
    nombre.classList.remove("is-invalid");
    const d = {
      nombre: nombre.value.trim(),
      entrega: form.entrega.value,
      ciudad: form.ciudad.value.trim(),
      comentario: form.comentario.value.trim(),
    };
    const msg = buildMessage(d);
    if (sendVia === "email") {
      window.location.href = mailUrl(`Pedido web — ${d.nombre}`, msg);
    } else {
      window.open(waUrl(msg), "_blank", "noopener");
    }
  });

  /* ---------- Aviso ---------- */
  let toastTimer;
  function toast(text) {
    const el = $("[data-toast]");
    el.textContent = text;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2200);
  }

  /* ---------- Inicio ---------- */
  setupContact();
  renderFilters();
  renderGrid();
  renderCart();
  handleProductClicks($("[data-grid]"));
  handleProductClicks(dialog);
})();
