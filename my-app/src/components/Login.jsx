import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (onLogin) onLogin(userCredential.user);
      // Redirigir al home o perfil después de login
      navigate("/perfil"); // puedes cambiar por "/"
    } catch (error) {
      setErrorMsg("Correo o contraseña incorrectos");
    }
  };

  return (
    <div style={{
      maxWidth: 400, margin: "40px auto", padding: 30, background: "#fff", borderRadius: 10, boxShadow: "0 2px 8px #ddd"
    }}>
      <h2 style={{ color: "#2E8B57" }}>Iniciar sesión</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
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
            background: "#2E8B57",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            padding: "10px 0",
            borderRadius: 5,
            fontSize: 18,
            cursor: "pointer"
          }}
        >
          Iniciar sesión
        </button>
        {errorMsg && <div style={{ color: "red", marginTop: 8 }}>{errorMsg}</div>}
      </form>
    </div>
  );
};

export default Login;
