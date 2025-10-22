// App frontend logic - catálogo, carrito y perfil

const PRODUCTS = [
  {id:'FR001',name:'Manzanas Fuji',category:'Frutas',price:1200,unit:'kilo',stock:150,origin:'Valle del Maule',img:'img/manzana.webp'},
  {id:'FR002',name:'Naranjas Valencia',category:'Frutas',price:1000,unit:'kilo',stock:200,origin:'Región del Maule',img:'img/naranjas.webp'},
  {id:'VR001',name:'Zanahorias Orgánicas',category:'Verduras',price:900,unit:'kilo',stock:100,origin:"O'Higgins",img:'img/zanahoria.webp'},
  {id:'VR002',name:'Lechuga',category:'Verduras',price:5000,unit:'kilo',stock:50,origin:'Local',img:'img/lechuga.webp'},
  {id:'FR003',name:'Plátano',category:'Frutas',price:4600,unit:'kilo',stock:75,origin:'Local',img:'img/platano.webp'},
  {id:'NL001',name:'Tierra',category:'Orgánico',price:1300,unit:'kilo',stock:100,origin:'Local',img:'img/tierra.webp'},
  {id:'NL002',name:'Tierra de Hojas',category:'Orgánico',price:2200,unit:'kilo',stock:50,origin:'Local',img:'img/tierrahoja.webp'}
];

// ---- Funciones auxiliares ----
function saveLS(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
function loadLS(key, def){ const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }

// ---- Carrito ----
function getCart(){ return loadLS('cart', []); }

function addToCart(id, qty = 1){
  const cart = getCart();
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  const existing = cart.find(i => i.id === id);
  if(existing){ existing.qty += qty; } else { cart.push({id, qty}); }
  saveLS('cart', cart);
  renderCartCount();
  alert('Añadido al carrito');
}

function removeFromCart(id){
  let cart = getCart().filter(i => i.id !== id);
  saveLS('cart', cart);
  renderCart();
  renderCartCount();
}

function clearCart(){
  saveLS('cart', []);
  renderCart();
  renderCartCount();
}

function renderCartCount(){
  const count = getCart().reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  if(el) el.textContent = count;
}

// ---- Catálogo ----
function renderProducts(filter = '', search = ''){
  const container = document.getElementById('products');
  if(!container) return;
  container.innerHTML = '';

  PRODUCTS.filter(p => (filter ? p.category === filter : true))
          .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
          .forEach(p => {
            const col = document.createElement('div');
            col.className = 'col-md-3';
            col.innerHTML = `
              <div class="card h-100 product-card">
                <img src="${p.img}" class="card-img-top" alt="${p.name}">
                <div class="card-body">
                  <h5>${p.name}</h5>
                  <p class="text-secondary small">${p.origin}</p>
                  <p class="h6">${p.price.toLocaleString('es-CL')} CLP / ${p.unit}</p>
                  <div class="d-flex gap-2">
                    <button class="btn btn-outline-secondary" onclick="viewDetail('${p.id}')">Ver</button>
                    <button class="btn btn-emerald" onclick="addToCart('${p.id}')">Agregar</button>
                  </div>
                </div>
              </div>
            `;
            container.appendChild(col);
          });
}

// ---- Detalle producto ----
function viewDetail(id){
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  localStorage.setItem('viewProduct', JSON.stringify(p));
  window.location.href = 'product_detail.html';
}

function renderProductDetail(){
  const el = document.getElementById('productDetail');
  if(!el) return;
  const p = JSON.parse(localStorage.getItem('viewProduct') || 'null');
  if(!p){
    el.innerHTML = '<p>Producto no encontrado.</p>';
    return;
  }
  el.innerHTML = `
    <div class="row">
      <div class="col-md-6"><img src="${p.img}" class="img-fluid rounded"></div>
      <div class="col-md-6">
        <h2>${p.name}</h2>
        <p class="text-secondary">${p.origin} - ${p.category}</p>
        <p class="h4">${p.price.toLocaleString('es-CL')} CLP / ${p.unit}</p>
        <p>${p.stock} disponibles</p>
        <p class="text-muted">Descripción de ejemplo: ${p.name} de alta calidad, cosechado localmente.</p>
        <div class="d-flex gap-2">
          <input type="number" id="qty" class="form-control" value="1" style="width:100px">
          <button class="btn btn-emerald" onclick="addToCart('${p.id}', parseInt(document.getElementById('qty').value || 1))">Agregar al carrito</button>
        </div>
      </div>
    </div>
  `;
}

// ---- Carrito render ----
function renderCart(){
  const container = document.getElementById('cartItems');
  if(!container) return;
  const cart = getCart();
  if(cart.length === 0){
    container.innerHTML = '<div class="text-muted">Tu carrito está vacío.</div>';
    document.getElementById('cartSummary').innerHTML = '';
    return;
  }
  container.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    const lineTotal = p.price * item.qty;
    total += lineTotal;
    const div = document.createElement('div');
    div.className = 'list-group-item d-flex justify-content-between align-items-center';
    div.innerHTML = `
      <div><strong>${p.name}</strong><div class="small text-secondary">${p.origin}</div></div>
      <div style="min-width:220px">
        <div class="d-flex gap-2 align-items-center">
          <input type="number" value="${item.qty}" min="1" style="width:70px" onchange="updateQty('${item.id}',this.value)">
          <div class="fw-bold">${lineTotal.toLocaleString('es-CL')} CLP</div>
          <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart('${item.id}')">Eliminar</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
  document.getElementById('cartSummary').innerHTML = `<div>Total: <strong>${total.toLocaleString('es-CL')} CLP</strong></div>`;
}

function updateQty(id,q){
  const cart = getCart();
  const it = cart.find(x => x.id === id);
  if(it){
    it.qty = parseInt(q) || 1;
    saveLS('cart', cart);
    renderCart();
    renderCartCount();
  }
}

// ---- Perfil ----
function currentUser(){
  return JSON.parse(localStorage.getItem('currentUser'));
}

function renderProfile(){
  const user = currentUser();
  if(!user){
    document.getElementById('profileForm').style.display = 'none';
    return;
  }
  document.getElementById('fullName').value = user.name || '';
  document.getElementById('email').value = user.email || '';
  document.getElementById('address').value = user.address || '';
  document.getElementById('phone').value = user.phone || '';
  const hist = document.getElementById('orderHistory');
  hist.innerHTML = '';
  (user.orders || []).forEach(o => {
    const li = document.createElement('div');
    li.className = 'list-group-item';
    li.textContent = `Pedido ${o.id} - ${o.total.toLocaleString('es-CL')} CLP - ${o.status}`;
    hist.appendChild(li);
  });
}

function saveProfile(e){
  if(e) e.preventDefault();
  const user = currentUser();
  if(!user){ alert('No autenticado'); return; }
  const users = loadLS('users', []);
  const idx = users.findIndex(x => x.email === user.email);
  users[idx].name = document.getElementById('fullName').value;
  users[idx].address = document.getElementById('address').value;
  users[idx].phone = document.getElementById('phone').value;
  saveLS('users', users);
  localStorage.setItem('currentUser', JSON.stringify(users[idx]));
  alert('Perfil actualizado');
}

function checkout(){
  const user = currentUser();
  if(!user){
    alert('Debes iniciar sesión para confirmar pedido');
    window.location.href = 'login.html';
    return;
  }
  const cart = getCart();
  if(cart.length === 0){ alert('Carrito vacío'); return; }
  const users = loadLS('users', []);
  const idx = users.findIndex(x => x.email === user.email);
  const orderId = 'PED' + Date.now();
  const total = cart.reduce((s,i) => s + (PRODUCTS.find(p => p.id === i.id).price * i.qty), 0);
  const order = {id: orderId, total, status: 'Preparación', date: new Date().toISOString()};
  users[idx].orders = users[idx].orders || [];
  users[idx].orders.push(order);
  saveLS('users', users);
  localStorage.setItem('currentUser', JSON.stringify(users[idx]));
  clearCart();
  alert(`Pedido confirmado. ID: ${orderId}`);
}

// ---- Inicialización ----
document.addEventListener('DOMContentLoaded', () => {
  renderCartCount();
  renderProducts();

  const filter = document.getElementById('filterCategory');
  if(filter) filter.addEventListener('change', e => renderProducts(e.target.value, document.getElementById('searchBox').value || ''));

  const search = document.getElementById('searchBox');
  if(search) search.addEventListener('input', e => renderProducts(document.getElementById('filterCategory').value || '', e.target.value || ''));

  if(document.getElementById('productDetail')) renderProductDetail();
  if(document.getElementById('cartItems')){
    renderCart();
    document.getElementById('clearCart').addEventListener('click', clearCart);
    document.getElementById('checkoutBtn').addEventListener('click', checkout);
  }
  if(document.getElementById('profileForm')){
    renderProfile();
    document.getElementById('profileForm').addEventListener('submit', saveProfile);
  }
});
