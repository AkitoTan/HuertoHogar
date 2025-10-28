// js/register.js
import { auth, createUserWithEmailAndPassword, sendEmailVerification, db, doc, setDoc } 
from './firebase-config.js';

const form = document.getElementById('registerForm');
const messageContainer = document.getElementById('messageContainer');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validar contraseñas
    if (password !== confirmPassword) {
        showMessage('Las contraseñas no coinciden', 'danger');
        return;
    }
    
    const registerBtn = document.getElementById('registerBtn');
    registerBtn.disabled = true;
    registerBtn.textContent = 'Creando cuenta...';
    
    try {
        // 1. Crear usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // 2. Enviar correo de verificación
        await sendEmailVerification(user);
        
        // 3. Guardar datos adicionales en Firestore
        await setDoc(doc(db, 'users', user.uid), {
            name: name,
            email: email,
            createdAt: new Date().toISOString(),
            emailVerified: false
        });
        
        // 4. Cerrar sesión hasta que verifique email
        await auth.signOut();
        
        showMessage(
            `✅ Cuenta creada exitosamente.<br><br>
            📧 <strong>Verifica tu correo electrónico</strong><br>
            Se ha enviado un enlace de verificación a <strong>${email}</strong>.<br><br>
            ⚠️ Debes verificar tu correo antes de iniciar sesión.`,
            'success'
        );
        
        form.reset();
        
        // Redirigir a login después de 5 segundos
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 5000);
        
    } catch (error) {
        console.error('Error:', error);
        let errorMsg = 'Error al crear cuenta';
        
        switch(error.code) {
            case 'auth/email-already-in-use':
                errorMsg = '❌ Este correo ya está registrado';
                break;
            case 'auth/invalid-email':
                errorMsg = '❌ Correo electrónico inválido';
                break;
            case 'auth/weak-password':
                errorMsg = '❌ La contraseña debe tener al menos 6 caracteres';
                break;
            default:
                errorMsg = `❌ Error: ${error.message}`;
        }
        
        showMessage(errorMsg, 'danger');
        registerBtn.disabled = false;
        registerBtn.textContent = 'Crear cuenta';
    }
});

function showMessage(msg, type) {
    messageContainer.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${msg}
        </div>
    `;
}
