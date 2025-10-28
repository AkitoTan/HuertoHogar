import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { FaHourglass, FaTruck, FaCheckCircle } from "react-icons/fa";

const statusList = ["En preparación", "En reparto", "Entregado"];
const statusIcons = { "En preparación": <FaHourglass />, "En reparto": <FaTruck />, "Entregado": <FaCheckCircle /> };

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const snap = await getDocs(collection(db, "orders"));
      setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    await updateDoc(doc(db, "orders", orderId), { status: newStatus });
    setOrders(orders =>
      orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    );
  };

  return (
    <div>
      <h2>Gestión de Pedidos (admin)</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {orders.map(ord => (
          <li key={ord.id} style={{ marginBottom: "2rem", border: "1px solid #eee", borderRadius: "8px", padding: "1rem", boxShadow: "0 2px 8px #eee" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: ".5rem" }}>
              <span style={{ fontSize: "2rem" }}>{statusIcons[ord.status] || null}</span>
              <span style={{ fontWeight: "bold", color: "#333" }}>{ord.status || "Pendiente"}</span>
              <select value={ord.status || statusList[0]} onChange={e => handleStatusChange(ord.id, e.target.value)}>
                {statusList.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div><b>Pedido:</b> {ord.id}</div>
            <div><b>Cliente:</b> {ord.userId}</div>
            <div><b>Fecha:</b> {ord.date.toDate ? ord.date.toDate().toLocaleString() : String(ord.date)}</div>
            <div><b>Total:</b> ${ord.total}</div>
            <div><b>Productos:</b> {ord.products.map(pr => `${pr.name} x${pr.qty}`).join(', ')}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrders;
