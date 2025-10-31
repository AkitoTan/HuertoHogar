import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";

// Ejemplo de recetas reales (puedes reemplazar por Firestore o expandir la colección "blog")
const recetasSugeridas = [
  { titulo: "Tarta de Manzana Fuji", resumen: "Fácil y deliciosa, ideal para postre o desayuno.", link: "/recetas/tarta-manzana", autor: "HuertoHogar", fecha: "2025-08-22" },
  { titulo: "Muffins zanahoria y miel", resumen: "Sin azúcar, llena de energía natural.", link: "/recetas/muffins-zanahoria", autor: "María A.", fecha: "2025-09-10" }
];

const Blog = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [texto, setTexto] = useState("");
  const [titulo, setTitulo] = useState("");
  const esAdmin = user?.email === "admin@duoc.cl";

  // Obtener posts al iniciar
  useEffect(() => {
    const fetchPosts = async () => {
      const snap = await getDocs(collection(db, "blog"));
      setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  // Agregar nuevo post
  const agregarPost = async () => {
    if (!texto.trim() || !titulo.trim()) return;
    await addDoc(collection(db, "blog"), {
      titulo,
      texto,
      fecha: Timestamp.now(),
      autor: user?.email || "anónimo"
    });
    setTexto(""); setTitulo("");
    // recarga
    const snap = await getDocs(collection(db, "blog"));
    setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div style={{
      maxWidth: 950, margin: "42px auto", padding: 21,
      background: "#fffefd", borderRadius: 17, boxShadow: "0 2px 14px #eee"
    }}>
      <h2 style={{ color: "#2E8B57" }}>Blog y Recetas</h2>
      <div style={{ margin: "15px 0 30px 0" }}>
        <h3 style={{ color: "#8B4513" }}>Recetas Populares</h3>
        <div style={{ display: "flex", gap: 19, flexWrap: "wrap" }}>
          {recetasSugeridas.map((post, idx) => (
            <div key={idx} style={{
              background: "#faf9ee", borderRadius: 10, padding: 18, width: 290,
              boxShadow: "0 1px 7px #ddd"
            }}>
              <h4 style={{ color: "#2E8B57", marginBottom: 7 }}>{post.titulo}</h4>
              <p style={{ marginBottom: 8 }}>{post.resumen}</p>
              <a href={post.link} style={{
                color: "#FFD700", fontWeight: "bold", textDecoration: "underline"
              }}>Ver receta</a>
              <div style={{ fontSize: 13, color: "#888", marginTop: 8 }}>
                Por: {post.autor} | {post.fecha}
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3 style={{ color: "#8B4513", marginTop: 25 }}>Entradas del Blog</h3>
      {esAdmin && (
        <div style={{
          background: "#F7F6ED", margin: "15px 0", padding: "15px 18px", borderRadius: 13
        }}>
          <input
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            placeholder="Título del post"
            style={{ width: "40%", marginRight: 10, padding: "7px 9px", borderRadius: 7, fontSize: 16 }}
          />
          <input
            value={texto}
            onChange={e => setTexto(e.target.value)}
            placeholder="Texto para compartir..."
            style={{ width: "55%", marginRight: 10, padding: "7px 9px", borderRadius: 7, fontSize: 16 }}
          />
          <button onClick={agregarPost} style={{
            background: "#2E8B57", color: "#fff", border: "none", borderRadius: 8, padding: "7px 17px"
          }}>Agregar post</button>
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 19 }}>
        {posts.length === 0 && <p>No hay entradas publicadas aún.</p>}
        {posts.map(p => (
          <div key={p.id} style={{
            background: "#f9f9f6", borderRadius: 10, padding: 16, width: 290, boxShadow: "0 1px 7px #ddd", marginBottom: 8
          }}>
            <h4 style={{ color: "#2E8B57" }}>{p.titulo || "Post"}</h4>
            <p>{p.texto}</p>
            <div style={{ color: "#888", fontSize: 13 }}>
              Por: {p.autor || "anónimo"} | {p.fecha?.toDate?.() ? p.fecha.toDate().toLocaleDateString() : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
