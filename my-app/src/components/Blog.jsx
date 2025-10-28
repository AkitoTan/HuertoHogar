import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase"; // Ajusta el path si tu db está en otro lugar

const Blog = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [texto, setTexto] = useState("");

  // Obtener posts al iniciar
  useEffect(() => {
    const fetchPosts = async () => {
      const snap = await getDocs(collection(db, "blog"));
      setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  // Agregar nuevo post (sólo si user es admin, opcional)
  const agregarPost = async () => {
    if (!texto.trim()) return;
    await addDoc(collection(db, "blog"), {
      texto,
      fecha: Timestamp.now(),
      autor: user?.email || "anónimo"
    });
    setTexto("");
    // recarga
    const snap = await getDocs(collection(db, "blog"));
    setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div>
      <h2>Blog y Recetas</h2>
      {user?.email === "admin@duoc.cl" && (
        <div>
          <input
            value={texto}
            onChange={e => setTexto(e.target.value)}
            placeholder="Algo para compartir..."
          />
          <button onClick={agregarPost}>Agregar post</button>
        </div>
      )}
      <ul>
        {posts.map(p => (
          <li key={p.id}>
            <b>{p.autor}</b> | {" "}
            {p.texto} <i>({(p.fecha?.toDate?.() || new Date()).toLocaleDateString()})</i>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Blog;
