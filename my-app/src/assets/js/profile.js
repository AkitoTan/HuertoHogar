// js/profile.js
import { auth, db, collection, query, where, getDocs, orderBy } from './firebase-config.js';

// Cargar historial de compras
async function loadOrderHistory() {
    const user = auth.currentUser;
    if (!user) return;
    
    const container = document.getElementById('orderHistory');
    if (!container) return;
    
    try {
        const q = query(
            collection(db, 'orders'),
            where('userId', '==', user.uid),
            orderBy('date', 'desc')
        );
        
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
            container.innerHTML = '<p class="text-muted">No tienes compras registradas.</p>';
            return;
        }
        
        let html = '<div class="list-group">';
        
        snapshot.forEach(doc => {
            const order = doc.data();
            const date = new Date(order.date).toLocaleDateString('es-CL');
            
            html += `
                <div class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-1">Orden ${order.orderNumber}</h6>
                            <small class="text-muted">${date} • ${order.items.length} productos</small>
                        </div>
                        <div class="text-end">
                            <strong class="text-success d-block">$${order.total.toLocaleString('es-CL')}</strong>
                            <button class="btn btn-sm btn-outline-primary mt-1" 
                                    onclick="viewOrderDetail('${doc.id}')">
                                Ver detalle
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Error cargando historial:', error);
        container.innerHTML = '<p class="text-danger">Error al cargar historial</p>';
    }
}

// Ver detalle de una orden
window.viewOrderDetail = function(orderId) {
    window.location.href = `order-detail.html?id=${orderId}`;
};

// Inicializar
auth.onAuthStateChanged(user => {
    if (user && user.emailVerified) {
        loadOrderHistory();
    }
});
