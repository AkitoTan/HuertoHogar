import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword, sendEmailVerification, setDoc, doc, db } from "../config/firebase";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "usuarios", userCredential.user.uid), {
        name: nombre,
        email: email
      });
      await sendEmailVerification(userCredential.user);
      setMsg("¡Registro exitoso! Revisa tu correo y verifica tu cuenta para activar el acceso.");
      if (onRegister) onRegister(userCredential.user);
    } catch (err) {
      setError(err.message || "No se pudo registrar.");
    }
  };

  return (
    <div style={{
      maxWidth: 400, margin: "40px auto", padding: 30, background: "#fff", borderRadius: 10, boxShadow: "0 2px 8px #ddd"
    }}>
      <h2 style={{ color: "#2E8B57" }}>Registro de Usuario</h2>
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          required
          onChange={e => setNombre(e.target.value)}
          style={{ padding: 8, fontSize: 16, borderRadius: 5, border: "1px solid #aaa" }}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          style={{ padding: 8, fontSize: 16, borderRadius: 5, border: "1px solid #aaa" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          style={{ padding: 8, fontSize: 16, borderRadius: 5, border: "1px solid #aaa" }}
        />
        <button
          type="submit"
          style={{
            background: "#FFD700",
            color: "#8B4513",
            fontWeight: "bold",
            border: "none",
            padding: "10px 0",
            borderRadius: 5,
            fontSize: 18,
            cursor: "pointer"
          }}>
          Registrarse
        </button>
        {msg && <div style={{ color: "#2E8B57" }}>{msg}</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
};

export default Register;
