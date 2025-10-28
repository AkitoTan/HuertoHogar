import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductFilter from './components/ProductFilter';
import UserProfile from './components/UserProfile';
import OrderHistory from './components/OrderHistory';
import Cart from './components/Cart';
import AdminOrders from './components/AdminOrders';
import AdminRoute from './components/AdminRoute';
import OrderTracking from './components/OrderTracking';
// Importa Login si tienes: import Login from './components/Login';

const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};

function App({ user, userData, cart }) {
  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        {/* Catálogo de productos */}
        <Route path="/" element={<ProductFilter />} />
        {/* Perfil protegido */}
        <Route path="/perfil" element={
          <PrivateRoute user={user}>
            <UserProfile user={user} userData={userData} />
          </PrivateRoute>
        } />
        {/* Historial protegido */}
        <Route path="/compras" element={
          <PrivateRoute user={user}>
            <OrderHistory user={user} />
          </PrivateRoute>
        } />
        {/* Carrito protegido */}
        <Route path="/carrito" element={
          <PrivateRoute user={user}>
            <Cart cart={cart} user={user} />
          </PrivateRoute>
        } />
        {/* Seguimiento de pedidos protegido */}
        <Route path="/seguimiento" element={
          <PrivateRoute user={user}>
            <OrderTracking user={user} />
          </PrivateRoute>
        } />
        {/* Panel admin solo para admin */}
        <Route path="/admin/orders" element={
          <AdminRoute user={user}>
            <AdminOrders />
          </AdminRoute>
        } />
        {/* Login (si tienes el componente) */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
