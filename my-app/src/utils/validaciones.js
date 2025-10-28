// js/validaciones.js
import { normalizeString, cleanRut, rutDV, diffYearsFromToday, result } from './utils.js';

// Valida RUN/RUT chileno: estructura y dígito verificador
export function validarRUN(rutInput) {
  const c = cleanRut(rutInput);
  if (c.length < 2) return result(false, 'RUT incompleto');

  const cuerpo = c.slice(0, -1);
  const dv = c.slice(-1).toUpperCase();

  if (!/^\d+$/.test(cuerpo)) return result(false, 'RUT inválido: solo números en el cuerpo');
  const dvCalc = rutDV(cuerpo);

  if (dv !== dvCalc) {
    return result(false, `Dígito verificador incorrecto (esperado ${dvCalc})`);
  }
  return result(true, 'RUT válido', c);
}

// Valida nombre: 2 a 60 caracteres, solo letras (incluye acentos), espacios y guiones
export function validarNombre(nombre) {
  const n = normalizeString(nombre);
  if (n.length < 2) return result(false, 'El nombre es muy corto');
  if (n.length > 60) return result(false, 'El nombre es muy largo');
  const re = /^[A-Za-zÁÉÍÓÚÑáéíóúñ]+([ -][A-Za-zÁÉÍÓÚÑáéíóúñ]+)*$/;
  if (!re.test(n)) return result(false, 'Usa solo letras, espacios o guiones');
  return result(true, 'Nombre válido', n);
}

// Valida correo con patrón razonable
export function validarCorreo(email) {
  const e = String(email).trim();
  // Patrón RFC5322 simplificado
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!re.test(e)) return result(false, 'Correo electrónico inválido');
  return result(true, 'Correo válido', e.toLowerCase());
}

// Valida clave: mínima seguridad (8+ caracteres, mayúscula, minúscula, dígito)
export function validarClave(password) {
  const p = String(password);
  if (p.length < 8) return result(false, 'La clave debe tener al menos 8 caracteres');
  if (!/[a-z]/.test(p)) return result(false, 'Debe incluir al menos una minúscula');
  if (!/[A-Z]/.test(p)) return result(false, 'Debe incluir al menos una mayúscula');
  if (!/\d/.test(p)) return result(false, 'Debe incluir al menos un número');
  // opcional: símbolo
  // if (!/[^\w\s]/.test(p)) return result(false, 'Debe incluir al menos un símbolo');
  return result(true, 'Clave válida');
}

// Valida fecha de nacimiento y mayoría de edad (>= 18)
export function validarFechaNacimiento(fechaStr) {
  const years = diffYearsFromToday(fechaStr);
  if (years === null) return result(false, 'Fecha inválida');
  if (years < 0) return result(false, 'La fecha no puede ser futura');
  if (years < 18) return result(false, 'Debes ser mayor de 18 años', null, { years });
  return result(true, 'Edad válida', fechaStr, { years });
}

// Validador compuesto para formularios de registro
export function validarRegistro({ run, nombre, correo, clave, fechaNacimiento }) {
  const r1 = validarRUN(run);
  if (!r1.ok) return result(false, r1.message, null, { field: 'run' });

  const r2 = validarNombre(nombre);
  if (!r2.ok) return result(false, r2.message, null, { field: 'nombre' });

  const r3 = validarCorreo(correo);
  if (!r3.ok) return result(false, r3.message, null, { field: 'correo' });

  const r4 = validarClave(clave);
  if (!r4.ok) return result(false, r4.message, null, { field: 'clave' });

  const r5 = validarFechaNacimiento(fechaNacimiento);
  if (!r5.ok) return result(false, r5.message, null, { field: 'fechaNacimiento' });

  return result(true, 'Registro válido', {
    run: r1.value, 
    nombre: r2.value, 
    correo: r3.value, 
    fechaNacimiento
  });
}
