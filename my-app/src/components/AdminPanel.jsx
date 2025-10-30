import React, { useEffect, useState } from "react";
import { db, collection, getDocs, updateDoc, doc, deleteDoc, addDoc } from "../config/firebase";

const AdminPanel = () => {
  // Productos
  const [productos, setProductos] = useState([]);
  const [recomendados, setRecomendados] = useState([]);
  // Usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSel, setUsuarioSel] = useState(null);
  const [carritoSel, setCarritoSel] = useState([]);
  const [historialSel, setHistorialSel] = useState([]);

  // ----- 1. Carga inicial -----
  useEffect(() => {
    // Productos
    const fetchProductos = async () => {
      const snap = await getDocs(collection(db, "productos"));
      setProductos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    // Recomendados
    const fetchRecomendados = async () => {
      const snap = await getDocs(collection(db, "recomendados"));
      setRecomendados(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    // Usuarios
    const fetchUsuarios = async () => {
      const snap = await getDocs(collection(db, "usuarios"));
      setUsuarios(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProductos();
    fetchRecomendados();
    fetchUsuarios();
  }, []);

  // ----- 2. Gestión de stock -----
  const cambiarStock = async (id, cantidad) => {
    const prod = productos.find(p => p.id === id);
    if (!prod) return;
    await updateDoc(doc(db, "productos", id), { stock: prod.stock + cantidad });
    setProductos(prev => prev.map(p => p.id === id ? { ...p, stock: p.stock + cantidad } : p));
  };

  // ----- 3. Modificar recomendados Home -----
  const quitarRecomendado = async id => {
    await deleteDoc(doc(db, "recomendados", id));
    setRecomendados(prev => prev.filter(r => r.id !== id));
  };
  const agregarRecomendado = async prodId => {
    const prod = productos.find(p => p.id === prodId);
    if (!prod) return;
    await addDoc(collection(db, "recomendados"), {
      prodId: prod.id, name: prod.name, img: prod.img, desc: prod.desc
    });
    setRecomendados([...recomendados, { prodId: prod.id, name: prod.name, img: prod.img, desc: prod.desc }]);
  };

  // ----- 4. Ver historial/carrito de usuario ---
  const verInfoUsuario = async userId => {
    setUsuarioSel(userId);
    // Carrito
    const snapCarrito = await getDocs(collection(db, "carritos")); // tu colección puede llamarse distinto
    const carrito = snapCarrito.docs.filter(d => d.data().userId === userId).map(d => d.data());
    setCarritoSel(carrito.length ? carrito[0].items : []);
    // Historial
    const snapHist = await getDocs(collection(db, "pedidos"));
    const historial = snapHist.docs.filter(d => d.data().userId === userId).map(d => d.data());
    setHistorialSel(historial);
  };

  // ----- 5. Más ideas admin -----
  // Crear, editar, eliminar productos
  // Ver reseñas por producto
  // Crear cupones/gestionar sistema de fidelización
  // Eliminar usuarios problemáticos

  return (
    <div style={{
      maxWidth: 1100, margin: "44px auto", padding: 34, borderRadius: 17,
      background: "#fff9ee", boxShadow: "0 2px 14px #eec"
    }}>
      <h2 style={{ color: "#2E8B57" }}>Panel de Administración - HuertoHogar</h2>
      {/* Gestión de productos */}
      <section style={{ marginTop: 32 }}>
        <h3 style={{ color: "#8B4513" }}>Productos</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 17 }}>
          <thead>
            <tr style={{ background: "#f6f6f6" }}>
              <th>Nombre</th><th>Stock</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                <td>{p.name}</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => cambiarStock(p.id, 1)} style={{
                    background: "#2E8B57", color: "#fff", margin: "0 7px", borderRadius: 4, padding: "4px 12px", border: "none"
                  }}>+ Stock</button>
                  <button onClick={() => cambiarStock(p.id, -1)} style={{
                    background: "#FFD700", color: "#8B4513", borderRadius: 4, padding: "4px 12px", border: "none"
                  }}>- Stock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* Gestión de recomendados Home */}
      <section style={{ marginTop: 38 }}>
        <h3 style={{ color: "#8B4513" }}>Recomendados en Home</h3>
        <div style={{ display: "flex", gap: 14 }}>
          {recomendados.map(r => (
            <div key={r.id} style={{
              background: "#f9f5dc", borderRadius: 13, padding: 17,
              boxShadow: "0 1px 8px #ffe", maxWidth: 220
            }}>
              <img src={r.img} alt={r.name} style={{ width: "92%", height: 80, objectFit: "cover", borderRadius: 7, marginBottom: 6 }} />
              <h4 style={{ color: "#2E8B57" }}>{r.name}</h4>
              <p style={{ fontSize: 15, color: "#6a5027" }}>{r.desc}</p>
              <button onClick={() => quitarRecomendado(r.id)} style={{
                background: "#d66", color: "#fff", border: "none", borderRadius: 6, padding: "4px 9px", marginTop: 6
              }}>Quitar</button>
            </div>
          ))}
        </div>
        {/* Agregar recomendado */}
        <div style={{ marginTop: 13 }}>
          <label>
            Agregar recomendado por ID producto:
            <select onChange={e => agregarRecomendado(e.target.value)} style={{ marginLeft: 9, minWidth: 120, padding: "5px 14px" }}>
              <option value="">Selecciona...</option>
              {productos.filter(prod =>
                !recomendados.some(r => r.prodId === prod.id)
              ).map(prod => (
                <option key={prod.id} value={prod.id}>{prod.name}</option>
              ))}
            </select>
          </label>
        </div>
      </section>
      {/* Gestión de usuarios */}
      <section style={{ marginTop: 38 }}>
        <h3 style={{ color: "#8B4513" }}>Usuarios</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
          <thead>
            <tr style={{ background: "#f6f6f6" }}>
              <th>Nombre</th><th>Email</th><th>Teléfono</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id} style={{ borderBottom: "1px solid #eee" }}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.telefono}</td>
                <td>
                  <button onClick={() => verInfoUsuario(u.id)} style={{
                    background: "#2E8B57", color: "#fff", border: "none", borderRadius: 4, padding: "4px 9px"
                  }}>Ver info</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Info de usuario seleccionado */}
        {usuarioSel && (
          <div style={{
            margin: "28px 0", padding: "24px", borderRadius: 13,
            background: "#f7f6ed", boxShadow: "0 2px 12px #eed"
          }}>
            <h4 style={{ color: "#2E8B57" }}>Info de usuario</h4>
            <b>Carrito:</b>
            <ul>
              {carritoSel.length === 0 ? <li>No hay productos en carrito.</li> :
                carritoSel.map((item, idx) => <li key={idx}>{item.name} x{item.qty}</li>)}
            </ul>
            <b>Historial de pedidos:</b>
            <ul>
              {historialSel.length === 0 ? <li>No hay pedidos.</li> :
                historialSel.map((ped, idx) =>
                  <li key={idx}>
                    {ped.fecha}: {ped.items.length} productos — Estado: {ped.estado}
                  </li>
                )}
            </ul>
          </div>
        )}
      </section>
      {/* Más secciones: dashboard, reseñas, administración de cupones... */}
      <section style={{ marginTop: 38 }}>
        <h3 style={{ color: "#8B4513" }}>Ideas extra admin</h3>
        <ul style={{ color: "#714b1d", fontSize: 15 }}>
          <li>Ver y eliminar reseñas de productos</li>
          <li>Crear cupones de descuento personalizados</li>
          <li>Dashboard de ventas y métricas</li>
          <li>Eliminar usuarios problemáticos</li>
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;
