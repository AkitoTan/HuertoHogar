import React, { useEffect, useState } from "react";
import { auth, db, collection, getDocs, updateDoc, doc } from "../config/firebase";

const estados = ["Solicitado", "En preparación", "Enviado", "Entregado", "Cancelado"];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // Asegura sólo acceso admin por el email
    setAdmin(auth.currentUser?.email === "admin@duoc.cl");
    const pedidosRef = collection(db, "pedidos");
    getDocs(pedidosRef).then(snapshot => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleChangeEstado = async (orderId, newEstado) => {
    await updateDoc(doc(db, "pedidos", orderId), { estado: newEstado });
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, estado: newEstado } : order
      )
    );
  };

  if (!admin) return <div>No tienes permisos para ver este módulo.</div>;

  return (
    <div style={{
      maxWidth: 700, margin: "40px auto", background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px #bbb"
    }}>
      <h2 style={{ color: "#FFD700" }}>Panel de Pedidos Administrador</h2>
      {orders.length === 0 && <p>No hay pedidos aún.</p>}
      {orders.map(order => (
        <div key={order.id} style={{
          marginBottom: 25, borderBottom: "1px solid #eee", paddingBottom: 12
        }}>
          <div><b>Fecha:</b> {order.fecha}</div>
          <div><b>Usuario:</b> {order.userId}</div>
          <div>
            <b>Estado:</b>
            <select
              value={order.estado || "Solicitado"}
              onChange={e => handleChangeEstado(order.id, e.target.value)}
              style={{ marginLeft: 10, padding: "4px 12px", borderRadius: 3, background: "#FFD700", color: "#8B4513", fontWeight: "bold" }}>
              {estados.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div><b>Total:</b> <span style={{ color: "#2E8B57" }}>{order.total.toLocaleString()} CLP</span></div>
          <div>
            <b>Productos:</b>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>{item.id} x{item.qty}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
