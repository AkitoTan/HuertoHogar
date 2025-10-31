import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { db, collection, query, where, getDocs, addDoc, auth } from "../config/firebase";


const ProductDetail = ({ productos }) => {
  const { id } = useParams();
  const [prod, setProd] = useState(null);
  const [reseñas, setReseñas] = useState([]);
  const [miReseña, setMiReseña] = useState({ texto: "", rating: 5 });
  const [feedback, setFeedback] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    // Busca el producto actual
    setProd(productos.find(p => p.id === id));
  }, [id, productos]);

  // Carga reseñas desde Firestore
  useEffect(() => {
    if (!prod) return;
    const cargarReseñas = async () => {
      const col = collection(db, "reseñas");
      const q = query(col, where("prodId", "==", prod.id));
      const snap = await getDocs(q);
      setReseñas(snap.docs.map(doc => doc.data()));
    };
    cargarReseñas();
  }, [prod]);

  // Enviar reseña
  const handleEnviar = async () => {
    if (!user) {
      setFeedback("Debes iniciar sesión para reseñar.");
      return;
    }
    if (miReseña.texto.length < 5) {
      setFeedback("Escribe una reseña más descriptiva.");
      return;
    }
    await addDoc(collection(db, "reseñas"), {
      prodId: prod.id,
      userId: user.uid,
      nombre: user.displayName || user.email,
      rating: miReseña.rating,
      texto: miReseña.texto,
      fecha: new Date().toISOString()
    });
    setFeedback("¡Gracias por tu reseña!");
    setMiReseña({ texto: "", rating: 5 });
    // Recarga las reseñas
    const q = query(collection(db, "reseñas"), where("prodId", "==", prod.id));
    const snap = await getDocs(q);
    setReseñas(snap.docs.map(doc => doc.data()));
  };

  if (!prod) return <div>Cargando producto...</div>;

  const avg =
    reseñas.length > 0
      ? (reseñas.reduce((acc, r) => acc + r.rating, 0) / reseñas.length).toFixed(1)
      : "Sin calificaciones";

  return (
    <div style={{
      maxWidth: 550, margin: "40px auto", background: "#fff", borderRadius: 18,
      boxShadow: "0 2px 13px #ccc", padding: 30
    }}>
      <h2 style={{ color: "#2E8B57" }}>{prod.name}</h2>
      <img
        src={prod.img}
        alt={prod.name}
        style={{
          width: 200, height: 200, objectFit: "cover", borderRadius: 14,
          marginBottom: 20, boxShadow: "0 0 8px #eee"
        }}
        onError={e => { e.target.src = "/img/default-fruta.png"; }}
      />
      <div style={{ marginBottom: 7 }}>
        <span style={{
          background: "#F5F5DC", color: "#8B4513",
          padding: "5px 13px", borderRadius: 8, fontSize: 16, fontWeight: "bold"
        }}>
          {prod.category}
        </span>
      </div>
      <p><b>Origen:</b> {prod.origen} | <b>Stock:</b> {prod.stock}</p>
      <p style={{ fontWeight: "bold", fontSize: 18, color: "#2E8B57" }}>
        {prod.precio.toLocaleString()} CLP
      </p>
      <p>{prod.desc}</p>

      {prod.recetas && prod.recetas.length > 0 && (
        <div style={{
          background: "#F5F5DC", color: "#8B4513", borderRadius: 12,
          padding: "10px 17px", margin: "18px 0"
        }}>
          <b>Recetas sugeridas:</b>
          <ul>
            {prod.recetas.map((r, idx) =>
              <li key={idx}>
                {r.nombre}
                {r.link && (
                  <a href={r.link} target="_blank" rel="noopener noreferrer"
                    style={{ marginLeft: 8, color: "#2E8B57" }}>Ver receta</a>
                )}
              </li>
            )}
          </ul>
        </div>
      )}

      <div style={{
        margin: "26px 0", padding: "18px", borderRadius: 8, background: "#f6faf6"
      }}>
        <h4 style={{ marginBottom: 8, color: "#2E8B57" }}>Reseñas y calificaciones</h4>
        <div><b>Promedio:</b> {avg} {reseñas.length > 0 && "⭐"}</div>
        {reseñas.length === 0
          ? <div>No hay reseñas aún.</div>
          : reseñas.map((r, i) =>
            <div key={i} style={{
              borderBottom: "1px solid #e8e8e8", marginBottom: 7, paddingBottom: 4
            }}>
              <b>{r.nombre || "Usuario"}</b> —
              <span style={{ color: "#FFD700", fontWeight: "bold", marginLeft: 7 }}>
                {r.rating} ⭐
              </span>
              <br />
              <span>{r.texto}</span>
              <div style={{ fontSize: 13, color: "#888" }}>
                {new Date(r.fecha).toLocaleString()}
              </div>
            </div>
          )
        }
        <div style={{ marginTop: 18 }}>
          <b>Deja tu reseña:</b>
          <br />
          <textarea
            value={miReseña.texto}
            onChange={e => setMiReseña(v => ({ ...v, texto: e.target.value }))}
            placeholder="¿Qué te pareció este producto?"
            rows={3}
            style={{ width: "100%", borderRadius: 7, padding: 9, fontSize: 15, marginTop: 4 }}
          />
          <div style={{ margin: "7px 0" }}>
            <label><b>Calificación:</b></label>
            <select value={miReseña.rating}
              onChange={e => setMiReseña(v => ({ ...v, rating: Number(e.target.value) }))}
              style={{ marginLeft: 9, padding: "4px 12px", borderRadius: 8 }}
            >
              {[5, 4, 3, 2, 1].map(star => <option key={star} value={star}>{star} ⭐</option>)}
            </select>
            <button
              style={{
                background: "#2E8B57", color: "#fff", border: "none",
                borderRadius: 6, marginLeft: 12, padding: "6px 16px"
              }}
              onClick={handleEnviar}
            >
              Enviar reseña
            </button>
          </div>
          {feedback && <div style={{ color: "#2E8B57", marginTop: 5 }}>{feedback}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
