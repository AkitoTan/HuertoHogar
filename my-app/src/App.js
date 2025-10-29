import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductFilter from './components/ProductFilter';

function App() {
  const productos = [
    { id: 1, name: "Manzanas Fuji", category: "Frutas" },
    { id: 2, name: "Zanahorias", category: "Verduras" }
  ];
  const handleAddToCart = () => {};

  return (
    <Router>
      <Navbar user={{ email: "admin@duoc.cl" }} />
      <Routes>
        <Route path="/" element={<ProductFilter allProducts={productos} onAddToCart={handleAddToCart} />} />
        <Route path="/" element={<ProductFilter />} />
        <Route path="/login" element={<h1>Página de Login</h1>} />
        <Route path="/perfil" element={<h1>Perfil de usuario</h1>} />
        <Route path="/compras" element={<h1>Historial de compras</h1>} />
        <Route path="/carrito" element={<h1>Carrito</h1>} />
        <Route path="/admin/orders" element={<h1>Pedidos Administrador</h1>} />
      </Routes>
    </Router>
  );
}
export default App;
