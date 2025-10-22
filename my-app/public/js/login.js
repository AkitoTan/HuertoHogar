// --- LOGIN ---
function loginUser(email, password){
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  
  if(user){
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('✅ Inicio de sesión exitoso');
    window.location.href = 'catalogo.html';
  } else {
    alert('❌ Correo o contraseña incorrectos');
  }
}

// --- Cierre de sesión (logout) ---
function logoutUser(){
  localStorage.removeItem('currentUser');
  alert('👋 Sesión cerrada correctamente');
  window.location.href = 'login.html';
}
