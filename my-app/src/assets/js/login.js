// js/login.js
import { auth, signInWithEmailAndPassword, sendEmailVerification } from './firebase-config.js';

const form = document.getElementById('loginForm');
const messageContainer = document.getElementById('messageContainer');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.disabled = true;
    loginBtn.textContent = 'Iniciando sesión...';
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // ⚠️ VALIDAR SI EL EMAIL ESTÁ VERIFICADO
        if (!user.emailVerified) {
            showMessage(
                `⚠️ <strong>Correo no verificado</strong><br><br>
                Debes verificar tu correo electrónico antes de acceder.<br>
                Revisa tu bandeja de entrada o spam.<br><br>
                <button class="btn btn-sm btn-primary mt-2" onclick="resendVerification()">
                    Reenviar correo de verificación
                </button>`,
                'warning'
            );
            
            await auth.signOut();
            loginBtn.disabled = false;
            loginBtn.textContent = 'Iniciar sesión';
            return;
        }
        
        // Email verificado → permitir acceso
        showMessage('✅ Inicio de sesión exitoso', 'success');
        setTimeout(() => {
            window.location.href = 'catalogo.html';
        }, 1000);
        
    } catch (error) {
        console.error('Error:', error);
        let errorMsg = '❌ Credenciales incorrectas';
        
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            errorMsg = '❌ Correo o contraseña incorrectos';
        }
        
        showMessage(errorMsg, 'danger');
        loginBtn.disabled = false;
        loginBtn.textContent = 'Iniciar sesión';
    }
});

// Función para reenviar verificación
window.resendVerification = async function() {
    try {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        await auth.signOut();
        
        showMessage('✅ Correo de verificación reenviado. Revisa tu bandeja de entrada.', 'success');
    } catch (error) {
        showMessage('❌ Error al reenviar correo', 'danger');
    }
};

function showMessage(msg, type) {
    messageContainer.innerHTML = `<div class="alert alert-${type}">${msg}</div>`;
}
