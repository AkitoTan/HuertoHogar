import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductFilter from "./components/ProductFilter";
import Auth from "./components/pages/Auth";
import Cart from "./components/Cart";
import Home from "./components/pages/Home";
import { collection, addDoc, db, auth } from "./config/firebase";
import OrderHistory from "./components/OrderHistory";
import Condiciones from "./components/pages/Condiciones";
import UserProfile from "./components/UserProfile";
import Blog from "./components/Blog";
import Nosotros from "./components/pages/Nosotros";

const AdminOrders = () => <div>Admin Pedidos (pendiente implementación)</div>;

const productosIniciales = [
  { id: "FR001", name: "Manzanas Fuji", category: "Frutas Frescas", precio: 1200, stock: 150, img:"/img/manzana.webp", desc:"Manzanas crujientes y dulces, perfectas para snack." },
  { id: "FR002", name: "Naranjas Valencia", category: "Frutas Frescas", precio: 1000, stock: 200, img:"/img/naranjas.webp", desc:"Naranjas jugosas para jugo y postres." },
  { id: "FR003", name: "Plátanos Cavendish", category: "Frutas Frescas", precio: 800, stock: 250, img:"/img/platano.webp", desc:"Plátanos maduros y listos para comer." },
  { id: "VR001", name: "Zanahorias Orgánicas", category: "Verduras Orgánicas", precio: 900, stock: 100, img:"/img/zanahoria.webp", desc:"Zanahorias llenas de vitamina A y fibra." },
  { id: "VR002", name: "Espinacas Frescas", category: "Verduras Orgánicas", precio: 700, stock: 80, img:"/img/espinaca.jpg", desc:"Hojas de espinaca frescas para cocinar." },
  { id: "VR003", name: "Pimientos Tricolores", category: "Verduras Orgánicas", precio: 1500, stock: 120, img:"/img/pimientos.jpg", desc:"Pimientos coloridos para ensaladas y wok." },
  { id: "PO001", name: "Miel Orgánica", category: "Productos Orgánicos", precio: 5000, stock: 50, img:"/img/miel.jpg", desc:"Miel pura de productores locales." },
  { id: "VR008", name: "Lechuga Hidropónica", category: "Verduras Orgánicas", precio: 650, stock: 80, origen: "Región Metropolitana", desc: "Lechuga fresca, cultivada con técnicas hidropónicas y libre de pesticidas. Perfecta para ensaladas.", img: "/img/lechuga.webp" },
  { id: "PO002", name: "Tierra Orgánica Universal", category: "Productos Orgánicos", precio: 3400, stock: 60, origen: "Productores del Sur", desc: "Saco de tierra mejorada, ideal para huertos y macetas. Libre de químicos agresivos.", img: "/img/tierra.webp" },
  { id: "PO003", name: "Tierra de Hoja Premium", category: "Productos Orgánicos", precio: 3900, stock: 55, origen: "Región del Biobío", desc: "Tierra de Hoja de alta calidad, especial para cultivos exigentes y maceteros.", img: "/img/tierrahoja.webp" }
];

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const listener = onAuthStateChanged(auth, setUser);
    return () => listener();
  }, []);

  const [carrito, setCarrito] = useState([]);
  const [productos] = useState(productosIniciales); // ← NO muta productos

  // Muestra el stock real descontando lo que está en el carrito
  const stockActual = productos.reduce((acc, prod) => {
    const carritoItem = carrito.find(item => item.id === prod.id);
    acc[prod.id] = prod.stock - (carritoItem ? carritoItem.qty : 0);
    return acc;
  }, {});

  const handleAddToCart = (id, qty) => {
    setCarrito(prev => {
      const found = prev.find(item => item.id === id);
      if (found) {
        // Solo permite sumar si hay suficiente stock en visualización
        const prodStock = stockActual[id] || 0;
        if (found.qty + qty <= prodStock) {
          return prev.map(item =>
            item.id === id ? { ...item, qty: item.qty + qty } : item
          );
        } else {
          alert("No hay suficiente stock disponible.");
          return prev;
        }
      }
      if (qty <= stockActual[id]) {
        return [...prev, { id, qty }];
      } else {
        alert("No hay suficiente stock disponible.");
        return prev;
      }
    });
  };

  const handleRemove = id => {
    setCarrito(prev => prev.filter(item => item.id !== id));
    // No modificamos productos ni sumamos stock; solo se libera el stock virtual
  };

  const handleChangeQty = (id, qty) => {
    setCarrito(prev =>
      prev.map(item => {
        const prodStock = stockActual[id] + item.qty; // sumar lo que había antes en carrito
        if (qty <= prodStock && qty > 0) {
          return item.id === id ? { ...item, qty: qty } : item;
        }
        return item;
      })
    );
  };

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
        <Route path="/catalogo" element={<ProductFilter allProducts={productos} onAddToCart={handleAddToCart} stocks={stockActual} />} />
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
        <Route path="/blog" element={<Blog />} />
        <Route path="/nosotros" element={<Nosotros />} />
      </Routes>
    </Router>
  );
}

export default App;
