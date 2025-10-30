import React, { useEffect, useState } from "react";
import { auth, db, collection, query, where, getDocs } from "../config/firebase";

const OrderHistory = ({ productos }) => {
  const [orders, setOrders] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const pedidosRef = collection(db, "pedidos");
      const q = query(pedidosRef, where("userId", "==", user.uid));
      getDocs(q).then(snapshot => {
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    }
  }, [user]);

  const getDetails = (item) => productos.find(p => p.id === item.id) || {};

  return (
    <div style={{
      maxWidth: 600, margin: "40px auto", background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px #bbb"
    }}>
      <h2 style={{ color: "#2E8B57" }}>Historial de Compras</h2>
      {orders.length === 0 && <p>No tienes pedidos guardados.</p>}
      {orders.map(order => (
        <div key={order.id} style={{ marginBottom: 22, borderBottom: "1px solid #eee", paddingBottom: 12 }}>
          <div><b>Fecha:</b> {order.fecha}</div>
          <div><b>Estado:</b> {order.estado || "Solicitado"}</div>
          <div><b>Total:</b> <span style={{ color: "#2E8B57" }}>{order.total.toLocaleString()} CLP</span></div>
          <div>
            <b>Productos:</b>
            <ul>
              {order.items.map((item, idx) => {
                const prod = getDetails(item);
                return <li key={idx}>{prod.name} x{item.qty} ({prod.precio} CLP c/u)</li>;
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
