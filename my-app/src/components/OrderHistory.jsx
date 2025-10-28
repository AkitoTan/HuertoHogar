import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const OrderHistory = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const q = query(collection(db, "orders"), where("userId", "==", user.uid));
      const snap = await getDocs(q);
      const userOrders = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(userOrders);
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return <p>Por favor inicia sesión para ver tu historial de compras.</p>;
  }

  return (
    <div>
      <h2>Historial de Compras</h2>
      {orders.length === 0 ? (
        <p>No tienes compras registradas.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <span>Fecha: {order.date.toDate ? order.date.toDate().toLocaleString() : String(order.date)}</span>
              <br />
              <span>Total: ${order.total}</span>
              <br />
              <span>Productos: {order.products.map(prod => `${prod.name} x${prod.qty}`).join(', ')}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
