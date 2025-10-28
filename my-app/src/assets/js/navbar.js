import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <button
        className="menu-btn"
        onClick={() => setOpen(open => !open)}
        style={{ fontSize: "2rem", cursor: "pointer" }}
      >
        ☰
      </button>
      <div className={`nav-links${open ? " show" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>Productos</Link>
        <Link to="/perfil" onClick={() => setOpen(false)}>Perfil</Link>
        <Link to="/compras" onClick={() => setOpen(false)}>Historial</Link>
        <Link to="/carrito" onClick={() => setOpen(false)}>Carrito</Link>
        {user && user.email === "admin@duoc.cl" && 
          <Link to="/admin/orders" onClick={() => setOpen(false)}>Admin</Link>
        }
      </div>
      <style>{`
        .nav-links { display: none; }
        .nav-links.show { display: block; }
        @media(min-width: 600px) {
          .nav-links { display: flex !important; gap: 1rem; }
          .menu-btn { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
