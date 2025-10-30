import React from "react";

// Ubicaciones simuladas (puedes traerlas de Firestore si lo prefieres)
const sucursales = [
  { ciudad: "Santiago", direccion: "Av. Italia 500, Ñuñoa, RM" },
  { ciudad: "Puerto Montt", direccion: "Carretera Austral 1234, Llanquihue" },
  { ciudad: "Villarica", direccion: "Ruta 199, Fundo Verde, Araucanía" },
  { ciudad: "Nacimiento", direccion: "Camino Campo Nuevo km 5" },
  { ciudad: "Viña del Mar", direccion: "Av. Jardín Sur 441" },
  { ciudad: "Valparaíso", direccion: "Calle Cerro Alegre 120" },
  { ciudad: "Concepción", direccion: "Av. Prat 2219, BioBío" }
];

const Nosotros = () => (
  <div style={{
    background: "url('/img/papel-reciclado-textura.jpg') repeat", minHeight: "100vh",
    padding: "38px 0", fontFamily: "Montserrat, sans-serif"
  }}>
    <div style={{
      background: "#fff9eeeb", maxWidth: 950, margin: "auto",
      borderRadius: 16, boxShadow: "0 5px 28px #ccb", padding: 36
    }}>
      <h2 style={{
        color: "#8B4513", fontFamily: 'Playfair Display, serif', marginBottom: "5px"
      }}>
        Nosotros
      </h2>
      <p style={{ color: "#333", maxWidth: 670 }}>
        <strong>HuertoHogar</strong> conecta familias de Chile con productos frescos y sustentables,
        directo del campo a tu mesa. Operamos en 7 ciudades clave, apoyando agricultores locales,
        promoviendo salud, sostenibilidad y comunidad.
      </p>
      <h4 style={{ margin: "32px 0 7px 0", color: "#2E8B57" }}>Misión</h4>
      <p>Proporcionar productos de calidad, apoyar prácticas responsables y acercar el campo a los hogares chilenos.</p>
      <h4 style={{ margin: "16px 0 7px 0", color: "#2E8B57" }}>Visión</h4>
      <p>Ser la tienda online líder en alimentación sostenible y saludable a nivel nacional.</p>
      <h4 style={{ margin: "16px 0 7px 0", color: "#2E8B57" }}>Valores</h4>
      <ul style={{ color: "#555", marginBottom: 27 }}>
        <li>Compromiso con el medioambiente</li>
        <li>Frescura y calidad</li>
        <li>Justicia social y apoyo comunitario</li>
        <li>Servicio transparente y cercano</li>
      </ul>

      <hr />

      <div style={{ display: "flex", gap: 38, flexWrap: "wrap", alignItems: "flex-start" }}>
        {/* Mapa con iframe Google Maps (puedes cambiar coords por la principal, ej: Santiago) */}
        <div style={{ minWidth: 340 }}>
          <h4 style={{ color: "#8B4513" }}>Mapa de Ubicaciones</h4>
          <iframe
            title="Mapa HuertoHogar"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.6815699915883!2d-70.61385104889838!3d-33.44994135136716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5610be56f63%3A0x1842ce6b5285bdcf!2sAv.%20Italia%20500%2C%20%C3%91u%C3%B1oa%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1706730980383!5m2!1ses!2scl"
            width="320"
            height="220"
            style={{ borderRadius: 10, border: "2px solid #8B4513" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <ul style={{
            fontSize: 15, color: "#6a5027",
            marginTop: 16, paddingLeft: 18
          }}>
            {sucursales.map(s =>
              <li key={s.ciudad}><b>{s.ciudad}:</b> {s.direccion}</li>
            )}
          </ul>
        </div>
        <div style={{ minWidth: 220 }}>
          <h4 style={{ color: "#8B4513" }}>Contáctanos</h4>
          <p><b>Email:</b> consultas@huertohogar.cl</p>
          <p><b>Teléfono:</b> +56 9 8888 1717</p>
          <p><b>Dirección principal:</b> Av. Italia 500, Ñuñoa, RM, Chile</p>
          <p><b>Horario:</b> Lun a Vi 10-19h</p>
        </div>
      </div>
    </div>
  </div>
);

export default Nosotros;
