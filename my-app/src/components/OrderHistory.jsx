import React, { useEffect, useState } from "react";
import { auth, db, collection, query, where, getDocs, updateDoc, doc } from "../config/firebase";

// Opciones de estado de pedido
const STATES = {
  solicitado: { label: "Solicitado", color: "#FFD700" },
  preparado: { label: "Preparado", color: "#87CEFA" },
  enviado: { label: "Enviado", color: "#FFA500" },
  entregado: { label: "Entregado", color: "#2E8B57" }
};

const OrderHistory = ({ productos }) => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    if (user) {
      const pedidosRef = collection(db, "pedidos");
      const q = query(pedidosRef, where("userId", "==", user.uid));
      getDocs(q).then(snapshot => {
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    }
  }, [user]);

  // Permite seleccionar fecha de entrega para pedidos aún no preparados
  const handleFechaEntrega = async (id, fecha) => {
    await updateDoc(doc(db, "pedidos", id), { fechaEntrega: fecha });
    setOrders(prev => prev.map(o => o.id === id ? { ...o, fechaEntrega: fecha } : o));
  };

  const getDetails = (item) => productos.find(p => p.id === item.id) || {};

  return (
    <div style={{
      maxWidth: 600, margin: "40px auto", background: "#fff", padding: 24,
      borderRadius: 8, boxShadow: "0 2px 8px #bbb"
    }}>
      <h2 style={{ color: "#2E8B57" }}>Historial de Compras</h2>
      {orders.length === 0 && <p>No tienes pedidos guardados.</p>}
      {orders.map(order => {
        const stateInfo = STATES[order.estado] || STATES["solicitado"];

        return (
          <div key={order.id}
            style={{
              marginBottom: 22, borderBottom: "1px solid #eee", paddingBottom: 12,
              background: stateInfo.color + "22"
            }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
              <b>Fecha de pedido:</b>
              <span style={{ marginLeft: 7 }}>{order.fecha || "Sin fecha"}</span>
              {order.estado && (
                <span style={{ marginLeft: 16, color: stateInfo.color, fontWeight: "bold" }}>
                  ● {stateInfo.label}
                </span>
              )}
            </div>
            <div>
              <b>Fecha de entrega:</b>
              {order.fechaEntrega
                ? <span style={{ marginLeft: 7 }}>{order.fechaEntrega}</span>
                : order.estado !== "entregado" &&
                  <>
                    <input type="date"
                      style={{ marginLeft: 7, padding: "2px 5px", borderRadius: 4 }}
                      onChange={e => handleFechaEntrega(order.id, e.target.value)} />
                    <span style={{ marginLeft: 8, color: "#888" }}>Elige tu fecha de entrega</span>
                  </>
              }
            </div>
            <div>
              <b>Total:</b>
              <span style={{ color: "#2E8B57", marginLeft: 7 }}>
                {order.total?.toLocaleString()} CLP
              </span>
            </div>
            <div>
              <b>Productos:</b>
              <ul>
                {order.items.map((item, idx) => {
                  const prod = getDetails(item);
                  return (
                    <li key={idx}>{prod.name} x{item.qty} ({prod.precio} CLP c/u)</li>
                  );
                })}
              </ul>
            </div>
            <div style={{ marginTop: 6 }}>
              <b>Seguimiento:</b>
              {order.trackingUrl
                ? <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#0074D9" }}>
                    Ver estado de envío
                  </a>
                : <span style={{ color: "#888", marginLeft: 7 }}>No disponible todavía</span>
              }
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistory;
