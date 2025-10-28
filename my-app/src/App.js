import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductFilter from './components/ProductFilter';
import UserProfile from './components/UserProfile';
import OrderHistory from './components/OrderHistory';
import Cart from './components/Cart';
import AdminOrders from './components/AdminOrders';
import AdminRoute from './components/AdminRoute';
import OrderTracking from './components/OrderTracking';


<Routes>
  {/* ...rutas usuario */<Route path="/admin/orders" element={
  <AdminRoute user={user}>
    <AdminOrders />
  </AdminRoute>
} />}
  <Route path="/admin/orders" element={<AdminOrders />} />
  <Route path="/seguimiento" element={<OrderTracking user={user} />} />
</Routes>

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};

function App({ user, userData, cart }) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductFilter />} />
        <Route path="/perfil" element={
          <PrivateRoute user={user}>
            <UserProfile user={user} userData={userData} />
          </PrivateRoute>
        } />
        <Route path="/compras" element={
          <PrivateRoute user={user}>
            <OrderHistory user={user} />
          </PrivateRoute>
        } />
        <Route path="/carrito" element={
          <PrivateRoute user={user}>
            <Cart cart={cart} user={user} />
          </PrivateRoute>
        } />
        {/* Agrega tu ruta login si tienes el componente */}
      </Routes>
    </Router>
  );
}
export default App;
