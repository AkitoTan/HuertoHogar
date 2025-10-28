import { addUser } from "../public/services/firestoreService.js";
import { validarCorreo, validarRUN, validarFechaNacimiento, validarNombre } from "./utils/validaciones.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formUsuario");
  const rutInput = document.getElementById("run");
  const nombreInput = document.getElementById("nombre");
  const correoInput = document.getElementById("correo");
  const claveInput = document.getElementById("clave");
  const fechaInput = document.getElementById("fecha");
  const mensaje = document.getElementById("mensaje");

  if (!form) {
    console.warn("No se encontró #formUsuario");
    return;
  }

  // Helper para mostrar mensajes
  const showMsg = (text, type = "info") => {
    if (!mensaje) return;
    mensaje.className = ""; // limpia clases previas
    // Opcional: si usas Bootstrap, puedes mapear a alert-*:
    // type: success | danger | warning | info
    mensaje.classList.add(`alert`, `alert-${type}`);
    mensaje.innerText = text;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showMsg("");

    // Lectura de valores
    const run = rutInput.value.trim().toUpperCase();
    const nombre = nombreInput.value.trim();
    const correo = correoInput.value.trim();
    const clave = claveInput.value;
    const fecha = fechaInput.value; // esperado YYYY-MM-DD

    // Validaciones (usando tus funciones)
    // Nota: en tu ejemplo original llamabas validarRun y nombre(nombre) -> ajustado.
    const rRun = validarRUN(run);
    if (!rRun.ok) return showMsg(rRun.message || "Run incorrecto", "danger");

    const rNombre = typeof validarNombre === "function" ? validarNombre(nombre) : { ok: nombre.length > 0, message: "Nombre en blanco" };
    if (!rNombre.ok) return showMsg(rNombre.message || "Nombre en blanco", "danger");

    const rCorreo = validarCorreo(correo);
    if (!rCorreo.ok) return showMsg(rCorreo.message || "Correo incorrecto", "danger");

    const rFN = validarFechaNacimiento(fecha);
    if (!rFN.ok) return showMsg(rFN.message || "Debe ser mayor de 18 años", "danger");

    // Si todo OK, guardar
    try {
      await addUser({ run: rRun.value || run, nombre: rNombre.value || nombre, correo: rCorreo.value || correo, clave, fecha });

      showMsg("Formulario enviado correctamente", "success");

      // Redirección: usa template strings reales (backticks) y corrige 'assets'
      setTimeout(() => {
        const destino =
          correo.toLowerCase() === "admin@duoc.cl"
            ? `assets/page/perfilAdmin.html?nombre=${encodeURIComponent(nombre)}`
            : `assets/page/perfilCliente.html?nombre=${encodeURIComponent(nombre)}`;
        window.location.href = destino;
      }, 1000);
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      showMsg("Error al guardar usuario en Firebase", "danger");
    }
  });
});
