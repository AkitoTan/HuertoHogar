import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const logoSrc = "/img/logo.png";
const shareUrl = window.location.origin; // URL base de tu tienda

const Navbar = ({ user }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Links principales del menú
  const links = [
    { to: "/", txt: "Home" },
    { to: "/catalogo", txt: "Productos" },
    { to: "/nosotros", txt: "Nosotros" },
    { to: "/blog", txt: "Blog" },
    { to: "/perfil", txt: <><FontAwesomeIcon icon={faUser} style={{ marginRight: 7 }} />Perfil</> },
    { to: "/historial", txt: "Historial" },
    { to: "/cart", txt: <><FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: 7 }} />Carrito</> },
    { to: "/condiciones", txt: "Condiciones" }
  ];
  if (!user) {
    links.push({ to: "/login", txt: "Iniciar sesión" });
    links.push({ to: "/register", txt: "Registrarse", color: "#FFD700" });
  }
  if (user && user.email === "admin@duoc.cl")
    links.push({ to: "/admin/orders", txt: "Admin", color: "#FFD700" });

  // SHARE buttons para redes sociales
  const redes = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      icon: faFacebook, title: "Compartir en Facebook", color: "#4267B2"
    },
    {
      href: `https://www.instagram.com/?url=${shareUrl}`,
      icon: faInstagram, title: "Instagram", color: "#E1306C"
    },
    {
      href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=¡Descubre%20HuertoHogar!`,
      icon: faTwitter, title: "Compartir en X/Twitter", color: "#1DA1F2"
    },
    {
      href: `https://wa.me/?text=¡Mira%20HuertoHogar%20${shareUrl}`,
      icon: faWhatsapp, title: "Compartir en WhatsApp", color: "#25D366"
    }
  ];

  const navBase = {
    background: "#fff",
    borderBottom: "2px solid #8B4513",
    padding: "10px 0",
    fontFamily: "Montserrat, sans-serif",
    display: "flex",
    alignItems: "center",
    fontSize: 18,
    boxShadow: "0 2px 4px #eee",
    position: "relative",
    zIndex: 9
  };

  const navContent = {
    display: open ? "block" : "flex",
    flexDirection: open ? "column" : "row",
    gap: open ? 0 : 16,
    alignItems: "center",
    width: "100%",
    marginLeft: open ? 0 : 8,
    marginTop: open ? 8 : 0
  };

  return (
    <nav style={navBase}>
      {/* Logo que lleva al home */}
      <Link to="/" style={{ marginLeft: 16, marginRight: 18 }}>
        <img src={logoSrc} alt="HuertoHogar Logo" style={{ height: 36, verticalAlign: "middle" }} />
      </Link>
      {/* Share/Social icons siempre visibles */}
      <div style={{ display: "flex", gap: 12, marginRight: 19 }}>
        {redes.map(({ href, icon, title, color }, idx) => (
          <a key={title} href={href} target="_blank" rel="noopener noreferrer" title={title}
            style={{ color, background: "#f7f7f7", borderRadius: 8, padding: "4px 8px", fontSize: 22 }}>
            <FontAwesomeIcon icon={icon} />
          </a>
        ))}
      </div>
      {/* Botón hamburguesa responsivo */}
      <button
        style={{
          background: "none", border: "none", fontSize: "2em", display: "none",
          color: "#2E8B57", marginLeft: "auto", cursor: "pointer"
        }}
        className="nav-toggle"
        onClick={() => setOpen(v => !v)}
      >
        {open ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
      </button>
      {/* Links responsivos */}
      <div style={{
        ...navContent,
        ...(window.innerWidth < 900 ? {
          display: open ? "flex" : "none",
          position: "absolute", top: "56px", left: 0, background: "#fff", width: "100%",
          boxShadow: "0 4px 18px #ddd", borderRadius: "0 0 14px 14px",
          padding: "14px 0", flexDirection: "column", gap: 0, zIndex: 100
        } : {})
      }}>
        {links.map(({ to, txt, color }, idx) => (
          <Link
            key={to}
            to={to}
            style={{
              color: color || "#2E8B57",
              textDecoration: location.pathname === to ? "underline" : "none",
              fontWeight: location.pathname === to ? "bold" : "normal",
              padding: open ? "10px 0" : "2px 12px", borderRadius: 8,
              background: location.pathname === to ? "#f7f7f7" : "none",
              display: "block", textAlign: open ? "center" : "start"
            }}
            onClick={() => setOpen(false)}
          >{txt}</Link>
        ))}
      </div>
      {/* Botón hamburguesa CSS media */}
      <style>
        {`
          @media (max-width:900px){
            .nav-toggle{ display:inline; }
          }
          @media (min-width:901px){
            .nav-toggle{ display:none !important; }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
