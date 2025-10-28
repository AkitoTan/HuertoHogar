import React, { useState } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const UserProfile = ({ user, userData }) => {
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || user.email || "");

  const handleUpdate = async () => {
    if (!user) return;
    await updateDoc(doc(db, "usuario", user.uid), { name, email });
    alert("Datos actualizados");
  };

  return (
    <div>
      <h2>Perfil del Usuario</h2>
      <label>Nombre: <input value={name} onChange={e => setName(e.target.value)} /></label>
      <label>Email: <input value={email} onChange={e => setEmail(e.target.value)} /></label>
      <button onClick={handleUpdate}>Actualizar</button>
    </div>
  );
};

export default UserProfile;
