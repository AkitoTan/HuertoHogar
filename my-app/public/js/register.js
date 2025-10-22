// --- REGISTRO ---

function registerUser(name, email, password){
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  if(users.find(u => u.email === email)){
    alert('❌ El correo ya está registrado.');
    return false;
  }
  
  users.push({name, email, password, address:'', phone:'', orders:[]});
  localStorage.setItem('users', JSON.stringify(users));
  
  alert('✅ Registro exitoso. Ahora puedes iniciar sesión.');
  window.location.href = 'login.html';
  return true;
}
