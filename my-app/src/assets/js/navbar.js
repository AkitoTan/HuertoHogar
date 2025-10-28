import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Define aquí el email de admin (OJO: ajusta al tuyo)
const ADMIN_EMAIL = "admin@huertohogar.com";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  // Función para cerrar sesión (puedes adaptar según cómo almacenes el usuario)
  const handleLogout = () => {
    // Aquí asegura la lógica de tu logout (Firebase, contexto, etc.)
    localStorage.removeItem("currentUser"); // Si usas localStorage
    // Si usas Firebase: firebase.auth().signOut();
    alert("Sesión cerrada correctamente");
    navigate("/login"); // Redirecciona a login
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "2px solid #eee", background: "#fafafa", display: "flex", gap: "1rem" }}>
      <Link to="/">Productos</Link>
      <Link to="/perfil">Perfil</Link>
      <Link to="/compras">Historial</Link>
      <Link to="/carrito">Carrito</Link>
      {/* Link admin solo para usuario admin */}
      {user && user.email === ADMIN_EMAIL && (
        <Link to="/admin/orders">Panel Admin</Link>
      )}
      {/* Si no está logueado, muestra 'Iniciar sesión', si está logueado, muestra 'Cerrar sesión' */}
      {!user ? (
        <Link to="/login">Iniciar sesión</Link>
      ) : (
        <button onClick={handleLogout} style={{ border: "none", background: "none", color: "#d33", cursor: "pointer" }}>Cerrar sesión</button>
      )}
    </nav>
  );
};

export default Navbar;
