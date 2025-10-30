import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductFilter from "./components/ProductFilter";
import Auth from "./components/Auth"; // nuevo componente
import Cart from "./components/Cart";
import Home from "./components/pages/Home";
import { collection, addDoc, db, auth } from "./config/firebase";
import OrderHistory from "./components/OrderHistory";
import Condiciones from "./components/pages/Condiciones";
import UserProfile from "./components/UserProfile"

// Puedes agregar otros componentes/rutas aquí...

const AdminOrders = () => <div>Admin Pedidos (pendiente implementación)</div>;

const productos = [
  // ... Tu array completo de productos ...
];

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const listener = onAuthStateChanged(auth, setUser);
    return () => listener();
  }, []);
  const [carrito, setCarrito] = useState([]);

  const handleAddToCart = (id, qty) => {
    setCarrito(prev => {
      const found = prev.find(item => item.id === id);
      if (found) {
        return prev.map(item =>
          item.id === id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { id, qty }];
    });
  };

  const handleRemove = id => setCarrito(prev => prev.filter(item => item.id !== id));
  const handleChangeQty = (id, qty) => setCarrito(prev => prev.map(item => item.id === id ? { ...item, qty: qty } : item));

  const handleCheckout = async () => {
    if (!auth.currentUser) return alert("Debes iniciar sesión");
    const fecha = new Date().toLocaleString();
    const items = carrito.map(i => ({ id: i.id, qty: i.qty }));
    const total = carrito.reduce((acc, i) => {
      const prod = productos.find(p => p.id === i.id) || {};
      return acc + (prod.precio * i.qty);
    }, 0);
    await addDoc(collection(db, "pedidos"), {
      userId: auth.currentUser.uid,
      fecha,
      items,
      total,
      estado: "Solicitado"
    });
    setCarrito([]);
    alert("Pedido guardado");
  };

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/catalogo" element={<ProductFilter allProducts={productos} onAddToCart={handleAddToCart} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/historial" element={<OrderHistory productos={productos} />} />
        <Route path="/cart" element={
          <Cart
            carrito={carrito}
            productos={productos}
            onRemove={handleRemove}
            onChangeQty={handleChangeQty}
            handleCheckout={handleCheckout}
          />
        } />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/condiciones" element={<Condiciones />} />
        {/* Añade aquí cualquier otra ruta */}
      </Routes>
    </Router>
  );
}

export default App;
