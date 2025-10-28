import { addUser } from "../public/services/firestoreService";
import { validarCorreo, validarRun, validarFechaNacimiento} from "./utils/validaciones"

document.addEventListener("DOMContentLoaded",() =>{
  const form = document.getElementById("formUsuario");
  const rutInput = document.getElementById("run");
  const nombreInput = document.getElementById("nombre");
  const correoInput = document.getElementById("correo");
  const claveInput = document.getElementById("clave");
  const fechaInput = document.getElementById("fecha");
  const mensaje = document.getElementById("mensaje");

  if (!form) return console.log("No se encontro #formUsuario")

    form.addEventListener("submit", async (e) =>{
      e.preventDefault();
      mensaje.innerText ="";

      const run = rutInput.value.trim().toUpperCase();
      const nombre= nombreInput.value.trim();
      const correo = correoInput.value.trim();
      const clave = claveInput.value;
      const fecha = fechaInput.value;

      if(!validarRun(run)) return mensaje.innerText = "Run incorrecto"
      if(!nombre(nombre)) return mensaje.innerText = "Nombre en blanco"
      if(!validarCorreo(correo)) return mensaje.innerText = "Correo incorrecto"
      if(!validarFechaNacimiento(fecha)) return mensaje.innerText = "Debe ser mayor de 18 años"

      try{
        await addUser({run, nombre,correo,clave,fecha});
        mensaje.innerText="Formulario se envio correctamente";

        setTimeout(()=>{
          window.location.href =
            correo.toLowerCase() === "admin@duoc.cl"
            ?'assests/page/perfilAdmin.html?nombre=${encodeURIComponent(nombre)}'
            :'assests/page/perfilCliente.html?nombre=${encodeURIComponent(nombre)}'
        },1000);
      }catch(error){
        console.error("Error en guardar usuario: ",error);
        mensaje.innerText = "Error al guardar usuario en Firebase"
      }
    });
})