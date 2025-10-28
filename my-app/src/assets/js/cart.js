// ---- Renderizar resumen del carrito (mejorado) ----
import { auth, db, collection, addDoc } from './firebase-config.js';
import Checkout from './Checkout';
function renderCart(){
    const container = document.getElementById('cartItems');
    const totalContainer = document.getElementById('cartTotal');
    const Cart = ({ cart, user }) => (
    <div>
    {}
    <Checkout cart={cart} user={user} />
    </div>
    );
    if(!container) return;
    
    reloadProducts();
    const cart = getCart();
    
    if(cart.length === 0){
        container.innerHTML = '<div class="alert alert-info">🛒 Tu carrito está vacío</div>';
        if(totalContainer) totalContainer.innerHTML = '';
        return;
    }
    
    let subtotal = 0;
    let html = '<ul class="list-group">';
    
    cart.forEach(item => {
        const p = PRODUCTS.find(pr => pr.id === item.id);
        if(!p) return;
        
        const itemTotal = p.price * item.qty;
        subtotal += itemTotal;
        
        html += `
            <li class="list-group-item">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${p.img}" class="img-fluid rounded" alt="${p.name}">
                    </div>
                    <div class="col-md-4">
                        <strong>${p.name}</strong><br>
                        <small class="text-muted">$${p.price.toLocaleString('es-CL')} / ${p.unit}</small>
                    </div>
                    <div class="col-md-2">
                        <input type="number" min="1" max="${p.stock + item.qty}" value="${item.qty}" 
                               class="form-control form-control-sm" 
                               onchange="updateQty('${item.id}', this.value)">
                    </div>
                    <div class="col-md-3 text-end">
                        <strong class="text-success">$${itemTotal.toLocaleString('es-CL')}</strong>
                    </div>
                    <div class="col-md-1 text-end">
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.id}')" title="Eliminar">
                            🗑️
                        </button>
                    </div>
                </div>
            </li>
        `;
    });
    
    html += '</ul>';
    container.innerHTML = html;
    
    // ⭐ RESUMEN DETALLADO
    const iva = Math.round(subtotal * 0.19); // IVA 19%
    const shipping = subtotal > 20000 ? 0 : 3000; // Envío gratis si compra > $20.000
    const total = subtotal + shipping;
    
    if(totalContainer) {
        totalContainer.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Resumen de compra</h5>
                    <hr>
                    <div class="d-flex justify-content-between mb-2">
                        <span>Subtotal (${cart.length} productos):</span>
                        <strong>$${subtotal.toLocaleString('es-CL')}</strong>
                    </div>
                    <div class="d-flex justify-content-between mb-2 text-muted">
                        <span>IVA incluido (19%):</span>
                        <span>$${iva.toLocaleString('es-CL')}</span>
                    </div>
                    <div class="d-flex justify-content-between mb-3">
                        <span>Envío:</span>
                        <strong class="${shipping === 0 ? 'text-success' : ''}">
                            ${shipping === 0 ? '¡Gratis!' : '$' + shipping.toLocaleString('es-CL')}
                        </strong>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between mb-3">
                        <h5>Total:</h5>
                        <h5 class="text-success">$${total.toLocaleString('es-CL')}</h5>
                    </div>
                    <button class="btn btn-primary w-100 mb-2" onclick="checkout()">
                        💳 Finalizar Compra
                    </button>
                    <button class="btn btn-outline-danger w-100" onclick="clearCart()">
                        🗑️ Vaciar Carrito
                    </button>
                </div>
            </div>
        `;
    }
}
async function checkout(){
    const cart = getCart();
    if(cart.length === 0){
        alert('El carrito está vacío');
        return;
    }
    
    const user = auth.currentUser;
    if(!user){
        alert('Debes iniciar sesión para comprar');
        window.location.href = 'login.html';
        return;
    }
    
    reloadProducts();
    
    // Calcular totales
    const items = cart.map(item => {
        const p = PRODUCTS.find(pr => pr.id === item.id);
        return {
            id: p.id,
            name: p.name,
            qty: item.qty,
            price: p.price,
            unit: p.unit,
            subtotal: p.price * item.qty
        };
    });
    
    const subtotal = items.reduce((sum, i) => sum + i.subtotal, 0);
    const shipping = subtotal > 20000 ? 0 : 3000;
    const total = subtotal + shipping;
    
    try {
        // Generar número de orden único
        const orderNumber = `HH-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
        
        // Guardar orden en Firestore
        const orderData = {
            userId: user.uid,
            orderNumber: orderNumber,
            date: new Date().toISOString(),
            status: 'completed',
            items: items,
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            customerEmail: user.email,
            customerName: user.displayName || 'Cliente'
        };
        
        const docRef = await addDoc(collection(db, 'orders'), orderData);
        
        // Limpiar carrito
        saveLS('cart', []);
        renderCart();
        renderCartCount();
        
        // Redirigir a página de confirmación con ID de orden
        alert(`✅ Compra finalizada.\n\nNúmero de orden: ${orderNumber}\nTotal: $${total.toLocaleString('es-CL')}`);
        window.location.href = `order-confirmation.html?orderId=${docRef.id}`;
        
    } catch (error) {
        console.error('Error al procesar compra:', error);
        alert('❌ Error al procesar la compra. Intenta nuevamente.');
    }
}