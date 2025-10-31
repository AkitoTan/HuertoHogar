import React from "react";

const Nosotros = () => (
  <div style={{
    background: "url('/img/papel-reciclado-textura.jpg') repeat",
    minHeight: "100vh", padding: "38px 0"
  }}>
    <div style={{
      background: "#fff9eeeb", maxWidth: 950, margin: "auto",
      borderRadius: 16, boxShadow: "0 5px 28px #ccb", padding: 36
    }}>
      <h2 style={{
        color: "#8B4513", fontFamily: 'Playfair Display, serif', marginBottom: "7px"
      }}>
        Sobre Nosotros
      </h2>
      <div style={{
        color: "#333", maxWidth: 700, fontSize: 17, marginBottom: 26, lineHeight: "1.7"
      }}>
        <p>
          <strong>HuertoHogar</strong> es una tienda online dedicada a acercar productos frescos, saludables y sostenibles directamente desde el campo a tu mesa.
        </p>
        <ul>
          <li>Apoyamos a productores rurales y fomentamos la agricultura local responsable.</li>
          <li>Promovemos prácticas sustentables, con envases reciclables y transporte eficiente para reducir la huella de carbono.</li>
          <li>Creemos en un comercio justo y en el impacto social: parte de las compras apoya talleres, cursos y donaciones comunitarias.</li>
        </ul>
        <p>
          Nuestro equipo está comprometido con alimentarte mejor y conectar al país con una cadena más corta y humana.
        </p>
        <p>
          ¿Quieres formar parte de la comunidad? Escríbenos a <a href="mailto:juntos@huertohogar.cl">juntos@huertohogar.cl</a>
        </p>
      </div>
      <h4 style={{ color: "#8B4513", marginTop: 32 }}>Sucursales de atención</h4>
      <ul style={{
        fontSize: 15, color: "#6a5027",
        marginTop: 18, paddingLeft: 18
      }}>
        <li><b>Santiago:</b> Av. Providencia 1234, Providencia | Tel: +56 9 1234 5678</li>
        <li><b>Concepción:</b> Barros Arana 789 | Tel: +56 41 245 1111</li>
      </ul>
    </div>
  </div>
);

export default Nosotros;
