import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa tus componentes
import Home from "../components/Home";
import ProductFilter from "../components/ProductFilter";
import ProductDetail from "../components/ProductDetail";
import Cart from "../components/Cart";
import UserProfile from "../components/UserProfile";
import OrderHistory from "../components/OrderHistory";
import Nosotros from "../components/Nosotros";
import Blog from "../components/Blog";
// agrega aquí otros componentes según ruta

// Ejemplo: productos, carrito y funciones desde contexto/props global (puedes ajustar con useContext)
const productos = []; // importa aquí tu array real o pásalo por props
const carrito = [];
const handleAddToCart = (id, qty) => {};
const handleRemove = (id) => {};
const handleQty = (id, qty) => {};
const handleCheckout = () => {};

const RouterConfig = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home productos={productos} />} />
      <Route path="/catalogo" element={<ProductFilter allProducts={productos} onAddToCart={handleAddToCart} />} />
      <Route path="/producto/:id" element={<ProductDetail productos={productos} />} />
      <Route path="/cart" element={
        <Cart
          carrito={carrito}
          productos={productos}
          onRemove={handleRemove}
          onChangeQty={handleQty}
          handleCheckout={handleCheckout}
        />
      }/>
      <Route path="/perfil" element={<UserProfile />} />
      <Route path="/historial" element={<OrderHistory productos={productos} />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/blog" element={<Blog />} />
      {/* añade aquí otros módulos si lo necesitas */}
      <Route path="*" element={<div style={{ padding: 60, textAlign: "center" }}><h2>404 - Página no encontrada</h2></div>} />
    </Routes>
  </BrowserRouter>
);

export default RouterConfig;
