/* ============================================
   Vendly — shared logic (cart, modals, toast)
   Include on every page AFTER js/data.js
   ============================================ */

const money = n => CURRENCY + n.toFixed(2);

const VENDLY = { products: [], cart: [] };

/* ---------- Storage ---------- */
function loadState() {
  try { VENDLY.products = JSON.parse(localStorage.getItem('vendly_products')) || [...SEED_PRODUCTS]; }
  catch { VENDLY.products = [...SEED_PRODUCTS]; }
  try { VENDLY.cart = JSON.parse(localStorage.getItem('vendly_cart')) || []; }
  catch { VENDLY.cart = []; }
}
function saveProducts() { localStorage.setItem('vendly_products', JSON.stringify(VENDLY.products)); }
function saveCart()     { localStorage.setItem('vendly_cart', JSON.stringify(VENDLY.cart)); }

/* ---------- Cart operations ---------- */
function addToCart(id, qty = 1) {
  const found = VENDLY.cart.find(i => i.id === id);
  if (found) found.qty += qty;
  else VENDLY.cart.push({ id, qty });
  saveCart(); renderCart(); updateCartBadge();
  toast('Added to basket 🧺');
}
function changeQty(id, delta) {
  const item = VENDLY.cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) VENDLY.cart = VENDLY.cart.filter(i => i.id !== id);
  saveCart(); renderCart(); updateCartBadge();
}
function removeFromCart(id) {
  VENDLY.cart = VENDLY.cart.filter(i => i.id !== id);
  saveCart(); renderCart(); updateCartBadge();
}
function cartLines() {
  return VENDLY.cart.map(item => {
    const p = VENDLY.products.find(x => x.id === item.id);
    return p ? { ...p, qty: item.qty } : null;
  }).filter(Boolean);
}
function updateCartBadge() {
  const count = VENDLY.cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = count);
}

/* ---------- Render cart drawer ---------- */
function renderCart() {
  const list = document.getElementById('cartList');
  const foot = document.getElementById('cartFoot');
  if (!list || !foot) return;

  const lines = cartLines();

  if (!lines.length) {
    list.innerHTML = `
      <div class="cart-empty">
        <span>🧺</span>
        <h3>Your basket is empty</h3>
        <p>Local goodies are one tap away.</p>
      </div>`;
    foot.style.display = 'none';
    return;
  }
  foot.style.display = 'block';

  list.innerHTML = lines.map(p => `
    <div class="cart-item">
      <div class="ci-thumb" style="--a:${p.c1};--b:${p.c2}">${p.emoji}</div>
      <div class="ci-info">
        <h4>${escapeHTML(p.name)}</h4>
        <div class="ci-price">${money(p.price)} · ${escapeHTML(p.seller)}</div>
      </div>
      <div class="qty">
        <button data-dec="${p.id}" aria-label="Decrease">−</button>
        <span>${p.qty}</span>
        <button data-inc="${p.id}" aria-label="Increase">+</button>
      </div>
      <button class="icon-btn" data-del="${p.id}" aria-label="Remove">🗑</button>
    </div>`).join('');

  const total = lines.reduce((s, p) => s + p.price * p.qty, 0);
  document.getElementById('cartTotal').textContent = money(total);
}

/* ---------- Product modal ---------- */
function openProduct(id) {
  const p = VENDLY.products.find(x => x.id === id);
  if (!p) return;
  document.getElementById('productModalCard').innerHTML = `
    <div class="modal-hero" style="--a:${p.c1};--b:${p.c2}">${p.emoji}</div>
    <div class="modal-body">
      <div class="cat">${p.category}</div>
      <h2>${escapeHTML(p.name)}</h2>
      <p class="m-seller">Made by <strong>${escapeHTML(p.seller)}</strong> in ${escapeHTML(p.location)}</p>
      <p class="m-desc">${escapeHTML(p.desc)}</p>
      <div class="modal-foot">
        <div class="price" style="font-size:1.6rem">${money(p.price)}</div>
        <div style="display:flex;gap:10px">
          <button class="btn btn-ghost" data-close-modal>Close</button>
          <button class="btn btn-primary" data-add="${p.id}">Add to basket</button>
        </div>
      </div>
    </div>`;
  openLayer('productModal');
}

/* ---------- Layers ---------- */
function openLayer(id) {
  document.getElementById(id).classList.add('open');
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLayers() {
  document.querySelectorAll('.modal.open, .drawer.open').forEach(el => el.classList.remove('open'));
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------- Toast ---------- */
let _toastTimer;
function toast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 2000);
}

/* ---------- Helpers ---------- */
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

/* ---------- Card renderer ---------- */
function productCardHTML(p) {
  return `
    <article class="card" data-id="${p.id}">
      <div class="thumb" style="--a:${p.c1};--b:${p.c2}">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
        <span>${p.emoji}</span>
      </div>
      <div class="card-body">
        <div class="cat">${p.category}</div>
        <h3>${escapeHTML(p.name)}</h3>
        <div class="seller">by ${escapeHTML(p.seller)} · ${escapeHTML(p.location)}</div>
        <p class="desc">${escapeHTML(p.desc)}</p>
        <div class="card-foot">
          <div class="price">${money(p.price)}</div>
          <button class="add-btn" data-add="${p.id}">Add to cart</button>
        </div>
      </div>
    </article>`;
}

/* ---------- Global events ---------- */
function wireGlobalEvents() {
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', () => { renderCart(); openLayer('cartDrawer'); });

  const closeCart = document.getElementById('closeCart');
  if (closeCart) closeCart.addEventListener('click', closeLayers);

  const overlay = document.getElementById('overlay');
  if (overlay) overlay.addEventListener('click', closeLayers);

  const cartList = document.getElementById('cartList');
  if (cartList) cartList.addEventListener('click', e => {
    const inc = e.target.closest('[data-inc]');
    const dec = e.target.closest('[data-dec]');
    const del = e.target.closest('[data-del]');
    if (inc) changeQty(Number(inc.dataset.inc), 1);
    if (dec) changeQty(Number(dec.dataset.dec), -1);
    if (del) removeFromCart(Number(del.dataset.del));
  });

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
    const lines = cartLines();
    if (!lines.length) return;
    const total = lines.reduce((s, p) => s + p.price * p.qty, 0);
    alert('Order summary\n\n' +
      lines.map(p => `${p.qty} × ${p.name} — ${money(p.price * p.qty)}`).join('\n') +
      `\n\nTotal: ${money(total)}\n\nConnect this to Stripe / PayPal / your backend to take payment.`);
    VENDLY.cart = [];
    saveCart(); renderCart(); updateCartBadge(); closeLayers();
    toast('Order placed — thank you! 🎉');
  });

  // Global delegation: add-to-cart, open product, close modal
  document.addEventListener('click', e => {
    if (e.target.closest('[data-close-modal]')) { closeLayers(); return; }

    const addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      e.preventDefault();
      addToCart(Number(addBtn.dataset.add));
      if (addBtn.closest('.modal')) { closeLayers(); return; }
      if (addBtn.classList.contains('add-btn')) {
        const original = addBtn.textContent;
        addBtn.textContent = 'Added ✓';
        addBtn.classList.add('added');
        setTimeout(() => { addBtn.textContent = original; addBtn.classList.remove('added'); }, 1200);
      }
      return;
    }

    const card = e.target.closest('.card');
    if (card && card.dataset.id) openProduct(Number(card.dataset.id));
  });

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (navToggle && nav) navToggle.addEventListener('click', () => nav.classList.toggle('open'));

  // Esc to close
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLayers(); });
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateCartBadge();
  renderCart();
  wireGlobalEvents();
});
