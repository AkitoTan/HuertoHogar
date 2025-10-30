import React, { useState, useEffect, useRef } from "react";
import { auth, db, doc, getDoc, updateDoc } from "../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const DEFAULT_AVATAR = "/img/avatar-default.png";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: "",
    direccion: "",
    telefono: ""
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const refUser = doc(db, "usuarios", user.uid);
      getDoc(refUser)
        .then((snap) => {
          const data = snap.exists() ? snap.data() : {};
          setProfile({
            name: data.name || "",
            email: data.email || user.email,
            avatar: data.avatar || DEFAULT_AVATAR,
            direccion: data.direccion || "",
            telefono: data.telefono || ""
          });
        })
        .catch(() => setProfile({
          name: "",
          email: user.email,
          avatar: DEFAULT_AVATAR,
          direccion: "",
          telefono: ""
        }));
    }
  }, [user]);

  const handleChange = e => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
    setError("");
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "usuarios", user.uid), {
        name: profile.name,
        email: profile.email,
        avatar: profile.avatar,
        direccion: profile.direccion,
        telefono: profile.telefono
      });
      setSaved(true);
      setError("");
    } catch (err) {
      setError("No se pudo guardar");
      setSaved(false);
    }
  };

  // Subida de Avatar
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const storage = getStorage();
      const avatarRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(avatarRef, file);
      const url = await getDownloadURL(avatarRef);
      setProfile(prev => ({ ...prev, avatar: url }));
      setUploading(false);
    } catch {
      setUploading(false);
      setError("No se pudo subir el avatar");
    }
  };

  if (!user) return <div>Debes iniciar sesión para ver tu perfil.</div>;

  return (
    <div style={{
      maxWidth: 400, margin: "40px auto", padding: 30,
      background: "#fff", borderRadius: 10, boxShadow: "0 2px 8px #ddd"
    }}>
      <h2 style={{ color: "#8B4513" }}>Perfil de Usuario</h2>
      <div style={{ textAlign: "center" }}>
        <img
          src={profile.avatar || DEFAULT_AVATAR}
          alt="avatar perfil"
          style={{ width: 108, height: 108, objectFit: "cover", borderRadius: "50%", marginBottom: 9, border: "3px solid #FFD700" }}
        />
        <br />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleAvatarUpload}
        />
        <button
          type="button"
          onClick={() => fileRef.current.click()}
          disabled={uploading}
          style={{
            padding: "5px 14px", borderRadius: 6, border: "none", background: "#2E8B57", color: "#fff", cursor: "pointer", fontSize: 15, marginBottom: 14
          }}
        >Cambiar foto</button>
        {uploading && <div>Subiendo...</div>}
      </div>
      <label>Nombre:<br />
        <input type="text" name="name" value={profile.name} onChange={handleChange}
          style={{ padding: 8, width: "100%", marginBottom: 10 }} />
      </label>
      <label>Email:<br />
        <input type="email" name="email" value={profile.email} disabled
          style={{ padding: 8, width: "100%", marginBottom: 10 }} />
      </label>
      <label>Dirección:<br />
        <input type="text" name="direccion" value={profile.direccion}
          onChange={handleChange}
          style={{ padding: 8, width: "100%", marginBottom: 10 }} />
      </label>
      <label>Teléfono:<br />
        <input type="text" name="telefono" value={profile.telefono}
          onChange={handleChange}
          style={{ padding: 8, width: "100%", marginBottom: 10 }} />
      </label>
      <div>
        Verificación:{" "}
        <span style={{ color: user.emailVerified ? "#2E8B57" : "#FFD700" }}>
          {user.emailVerified ? "Cuenta verificada" : "Falta verificar email"}
        </span>
      </div>
      <button onClick={handleSave}
        style={{ background: "#2E8B57", color: "#fff", fontWeight: "bold", border: "none", padding: "8px 0", borderRadius: 5, marginTop: 13 }}>
        Guardar cambios
      </button>
      {saved && <div style={{ color: "#2E8B57", marginTop: 9 }}>Cambios guardados correctamente.</div>}
      {error && <div style={{ color: "red", marginTop: 9 }}>{error}</div>}
    </div>
  );
};

export default UserProfile;
