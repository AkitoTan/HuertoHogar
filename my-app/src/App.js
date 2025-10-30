import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductFilter from "./components/ProductFilter";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Home from "./components/pages/Home";
import { collection, addDoc, db, auth } from "./config/firebase";
import OrderHistory from "./components/OrderHistory";
import Condiciones from "./components/pages/Condiciones";
import UserProfile from "./components/UserProfile"



const AdminOrders = () => <div>Admin Pedidos (pendiente implementación)</div>;


const productos = [
  { id: "FR001", name: "Manzanas Fuji", category: "Frutas Frescas", precio: 1200, stock: 150, img:"/img/manzana.webp"},
  { id: "FR002", name: "Naranjas Valencia", category: "Frutas Frescas", precio: 1000, stock: 200 , img:"/img/naranjas.webp"},
  { id: "FR003", name: "Plátanos Cavendish", category: "Frutas Frescas", precio: 800, stock: 250 , img:"/img/platano.webp"},
  { id: "VR001", name: "Zanahorias Orgánicas", category: "Verduras Orgánicas", precio: 900, stock: 100 , img:"/img/zanahoria.webp"},
  { id: "VR002", name: "Espinacas Frescas", category: "Verduras Orgánicas", precio: 700, stock: 80, img:"/img/espinaca.jpg" },
  { id: "VR003", name: "Pimientos Tricolores", category: "Verduras Orgánicas", precio: 1500, stock: 120 , img:"/img/pimientos.jpg"},
  { id: "PO001", name: "Miel Orgánica", category: "Productos Orgánicos", precio: 5000, stock: 50, img:"/img/miel.jpg" }
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
        <Route path="/productos" element={<ProductFilter allProducts={productos} onAddToCart={handleAddToCart} />} />
         <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/compras" element={<OrderHistory productos={productos} />} />
        <Route path="/carrito" element={
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
      </Routes>
    </Router>
  );
}

export default App;
