import React, { useState } from "react";

const UserForm = ({ onSubmit }) => {
  const [run, setRun] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [fecha, setFecha] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(""); // Limpia mensaje previo

    // Valida datos aquí, usando tus funciones de validación JS
    if (!run) return setMensaje("RUN incorrecto");
    if (!nombre) return setMensaje("Nombre vacío");
    // ... otras validaciones

    try {
      await onSubmit({ run, nombre, correo, clave, fecha });
      setMensaje("Formulario enviado correctamente!");
    } catch (error) {
      setMensaje("Error al enviar el formulario");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={run} onChange={e => setRun(e.target.value)} placeholder="RUN" />
      <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
      <input value={correo} onChange={e => setCorreo(e.target.value)} placeholder="Correo" />
      <input value={clave} type="password" onChange={e => setClave(e.target.value)} placeholder="Clave" />
      <input value={fecha} type="date" onChange={e => setFecha(e.target.value)} placeholder="Fecha de nacimiento" />
      <button type="submit">Registrar</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};

export default UserForm;
