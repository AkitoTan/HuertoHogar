export function normalizeString(str) {
  return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
export function cleanRut(rut) {
  return rut.replace(/\D/g, "");
}
export function rutDV(rut) {
  return 'K'; 
}
export function diffYearsFromToday(fechaStr) {
  const fecha = new Date(fechaStr);
  const hoy = new Date();
  return hoy.getFullYear() - fecha.getFullYear();
}
export function result(ok, msg, value, extra) {
  return { ok, message: msg, value, ...extra };
}
