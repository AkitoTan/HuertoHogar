import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { FaHourglass, FaTruck, FaCheckCircle } from "react-icons/fa";

const statusStyles = {
  "En preparación": { color: "orange", icon: <FaHourglass /> },
  "En reparto": { color: "deepskyblue", icon: <FaTruck /> },
  "Entregado": { color: "green", icon: <FaCheckCircle /> }
};

const OrderTracking = ({ user }) => {
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

  return (
    <div>
      <h2>Seguimiento de tus compras</h2>
      {orders.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map(ord => {
            const s = statusStyles[ord.status] || { color: "gray", icon: null };
            return (
              <li key={ord.id} style={{ marginBottom: "2rem", border: "1px solid #eee", borderRadius: "8px", padding: "1rem", boxShadow: "0 2px 8px #eee" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: ".5rem" }}>
                  <span style={{ fontSize: "2rem", color: s.color }}>{s.icon}</span>
                  <span style={{ fontWeight: 700, color: s.color, fontSize: "1.2rem" }}>{ord.status || "Pendiente"}</span>
                </div>
                <div><b>Pedido:</b> {ord.id}</div>
                <div><b>Fecha:</b> {ord.date.toDate ? ord.date.toDate().toLocaleString() : String(ord.date)}</div>
                <div><b>Total:</b> ${ord.total}</div>
                <div><b>Productos:</b> {ord.products.map(pr => `${pr.name} x${pr.qty}`).join(', ')}</div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default OrderTracking;

 