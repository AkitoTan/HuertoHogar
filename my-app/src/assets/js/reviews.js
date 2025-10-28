// js/reviews.js
import { auth, db, collection, addDoc, query, where, getDocs, orderBy } from './firebase-config.js';

let currentRating = 0;

// Establecer puntuación
window.setRating = function(rating) {
    currentRating = rating;
    document.getElementById('ratingValue').value = rating;
    
    // Resaltar botones seleccionados
    document.querySelectorAll('#ratingButtons button').forEach((btn, index) => {
        if (index < rating) {
            btn.classList.remove('btn-outline-warning');
            btn.classList.add('btn-warning');
        } else {
            btn.classList.remove('btn-warning');
            btn.classList.add('btn-outline-warning');
        }
    });
};

// Enviar reseña
window.submitReview = async function(event) {
    event.preventDefault();
    
    const user = auth.currentUser;
    if (!user || !user.emailVerified) {
        alert('Debes iniciar sesión para dejar una reseña');
        return;
    }
    
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const comment = document.getElementById('reviewComment').value;
    
    if (currentRating === 0) {
        alert('Selecciona una puntuación');
        return;
    }
    
    try {
        await addDoc(collection(db, 'reviews'), {
            productId: productId,
            userId: user.uid,
            userName: user.displayName || user.email.split('@')[0],
            rating: currentRating,
            comment: comment,
            date: new Date().toISOString()
        });
        
        alert('✅ Reseña publicada');
        document.getElementById('reviewComment').value = '';
        setRating(0);
        loadReviews(productId);
        
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Error al publicar reseña');
    }
};

// Cargar reseñas del producto
async function loadReviews(productId) {
    const container = document.getElementById('reviewsList');
    if (!container) return;
    
    try {
        const q = query(
            collection(db, 'reviews'),
            where('productId', '==', productId),
            orderBy('date', 'desc')
        );
        
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
            container.innerHTML = '<p class="text-muted">No hay reseñas aún. ¡Sé el primero!</p>';
            return;
        }
        
        let html = '';
        let totalRating = 0;
        
        snapshot.forEach(doc => {
            const review = doc.data();
            totalRating += review.rating;
            const stars = '⭐'.repeat(review.rating);
            const date = new Date(review.date).toLocaleDateString('es-CL');
            
            html += `
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h6>${review.userName}</h6>
                            <small class="text-muted">${date}</small>
                        </div>
                        <div class="text-warning">${stars}</div>
                        <p class="mt-2">${review.comment}</p>
                    </div>
                </div>
            `;
        });
        
        const avgRating = (totalRating / snapshot.size).toFixed(1);
        html = `
            <div class="alert alert-info">
                Puntuación promedio: <strong>${avgRating} ⭐</strong> (${snapshot.size} reseñas)
            </div>
        ` + html;
        
        container.innerHTML = html;
        
    } catch (error) {
        console.error('Error cargando reseñas:', error);
    }
}

// Auto-cargar al abrir detalle de producto
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    if (productId) {
        loadReviews(productId);
    }
});
