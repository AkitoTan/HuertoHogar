import RouterConfig from "../../routes/RouterConfig";

function renderProducts(filter = '', search = ''){
    const container = document.getElementById('products');
    if(!container) return;
    
    container.innerHTML = '';
    
    reloadProducts(); // Actualizar desde localStorage
    
    PRODUCTS
        .filter(p => (filter ? p.category === filter : true))
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        .forEach(p => {
            const col = document.createElement('div');
            col.className = 'col-md-3 mb-4';
            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${p.img}" class="card-img-top" alt="${p.name}" style="height:200px; object-fit:cover;">
                    <div class="card-body">
                        <h6 class="card-title">${p.name}</h6>
                        <p class="text-muted small mb-1">${p.origin}</p>
                        <p class="fw-bold text-success mb-2">$${p.price.toLocaleString('es-CL')} / ${p.unit}</p>
                        <p class="small text-secondary">Stock: ${p.stock}</p>
                        <button class="btn btn-success btn-sm w-100" onclick="addToCartFromCatalog('${p.id}')">
                            🛒 Agregar
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });
}

// Agregar desde catálogo (llama a cart.js)
function addToCartFromCatalog(id) {
    addToCart(id, 1); // Función definida en cart.js
    renderProducts(); // Actualizar vista para mostrar nuevo stock
}

// Filtros del catálogo
function filterBy(category){
    const search = document.getElementById('searchInput')?.value || '';
    renderProducts(category, search);
}

function searchProducts(){
    const search = document.getElementById('searchInput')?.value || '';
    const filter = document.querySelector('.btn-group .btn.active')?.dataset.category || '';
    renderProducts(filter, search);
}

// ---- Detalle de producto ----
function renderProductDetail(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const el = document.getElementById('productDetail');
    if(!el) return;
    
    reloadProducts();
    const p = PRODUCTS.find(pr => pr.id === id);
    
    if(!p){
        el.innerHTML = '<div class="alert alert-danger">Producto no encontrado.</div>';
        return;
    }
    
    el.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${p.img}" class="img-fluid rounded shadow" alt="${p.name}">
            </div>
            <div class="col-md-6">
                <h2>${p.name}</h2>
                <p class="text-muted">${p.origin} - ${p.category}</p>
                <h4 class="text-success">$${p.price.toLocaleString('es-CL')} CLP / ${p.unit}</h4>
                <p class="badge bg-secondary">Stock: ${p.stock} disponibles</p>
                <hr>
                <p>Descripción de ejemplo: ${p.name} de alta calidad, cosechado localmente.</p>
                <button class="btn btn-success btn-lg mt-3" onclick="addToCartFromCatalog('${p.id}')">
                    🛒 Agregar al Carrito
                </button>
                <a href="catalogo.html" class="btn btn-outline-secondary btn-lg mt-3 ms-2">Volver al catálogo</a>
            </div>
        </div>
    `;
}

// ---- Perfil de usuario ----
function loadProfile(){
    const u = loadLS('currentUser');
    if(!u){
        window.location.href = 'login.html';
        return;
    }
    
    document.getElementById('welcomeMessage').textContent = `Hola, ${u.username}`;
    document.getElementById('fullName').value = u.fullName || '';
    document.getElementById('email').value = u.email || '';
    document.getElementById('address').value = u.address || '';
    document.getElementById('phone').value = u.phone || '';
}

function saveProfile(){
    const u = loadLS('currentUser');
    if(!u) return;
    
    u.fullName = document.getElementById('fullName').value;
    u.email = document.getElementById('email').value;
    u.address = document.getElementById('address').value;
    u.phone = document.getElementById('phone').value;
    
    saveLS('currentUser', u);
    alert('✅ Perfil actualizado correctamente');
}

// ---- Inicialización ----
window.addEventListener('DOMContentLoaded', () => {
    // Auto-renderizar según página actual
    if(document.getElementById('products')){
        renderProducts();
    }
    if(document.getElementById('productDetail')){
        renderProductDetail();
    }
    if(document.getElementById('profileForm')){
        loadProfile();
    }
});
