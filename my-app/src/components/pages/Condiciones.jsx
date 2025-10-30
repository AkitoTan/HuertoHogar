import React from "react";


const Condiciones = () => (
  <div style={{
    maxWidth: 900, margin: "40px auto", padding: 30,
    background: "#fff", borderRadius: 14, boxShadow: "0 2px 8px #eef",
    fontFamily: "Montserrat, sans-serif"
  }}>
    <h1 style={{ color: "#2E8B57" }}>
      Condiciones Legales y Beneficios - HuertoHogar
    </h1>
    <p>
      Estas condiciones están respaldadas por la <b>Ley 19.496</b> sobre protección de los derechos de los consumidores,
      el <b>Código de Comercio</b>, el <b>Código Civil</b>, la <b>Ley de Protección de Datos Personales 19.628</b>,
      normativas tributarias y otros reglamentos vigentes en Chile.
    </p>
    <h2 style={{ color: "#8B4513" }}>Garantías y derechos del consumidor</h2>
    <ul>
      <li>
        <b>Retracto:</b> Todo cliente puede arrepentirse de una compra online hasta 10 días luego de recibido el producto, según Ley 19.496.
      </li>
      <li>
        <b>Información transparente:</b> Todos los precios, condiciones de compra, plazos de entrega y garantías están claramente informados antes de su pago.
      </li>
      <li>
        <b>Protección de datos personales:</b> Los datos que entregas son usados sólo con fines de responder tu pedido y están protegidos por la Ley 19.628.
      </li>
      <li>
        <b>Comprobante y boleta:</b> Toda compra genera comprobante o boleta electrónica (según SII).
      </li>
      <li>
        <b>Resolución de conflictos:</b> En caso de problemas, puedes contactar primero al comercio y en última instancia solicitar mediación por SERNAC.
      </li>
    </ul>

    <h2 style={{ color: "#2E8B57" }}>Obligaciones y permisos de la empresa</h2>
    <ul>
      <li>
        <b>Empresa formalizada:</b> HuertoHogar está registrada legalmente y cumple con patente comercial vigente.
      </li>
      <li>
        <b>RUT y SII:</b> Todos los impuestos están declarados y pagados mensualmente.
      </li>
      <li>
        <b>Pagos y seguridad:</b> Tus pagos son procesados por plataformas reguladas y seguras (ej. Webpay, MercadoPago).
      </li>
    </ul>
    <h2 style={{ color: "#FFD700" }}>Normativas aplicables</h2>
    <ul>
      <li><b>Ley N° 19.496</b> – Protección de los derechos de los consumidores: <a href="https://www.bcn.cl/leychile/navegar?idNorma=1165504" target="_blank" rel="noopener noreferrer">Texto legal</a></li>
      <li><b>Ley N° 19.628</b> – Protección de datos personales</li>
      <li><b>Código Civil y Código de Comercio</b></li>
      <li><b>Reglamento del Comercio Electrónico (2022)</b></li>
      <li><b>SII e Impuestos</b> – Guía oficial: <a href="https://www.sii.cl/destacados/guia_emprendedor/guia_emprendedores.pdf" target="_blank" rel="noopener noreferrer">Guía SII</a></li>
    </ul>
    <div style={{ color: "#666", marginTop: 22, fontSize: 15 }}>
      Última actualización legal: octubre 2025
    </div>
  </div>
);

export default Condiciones;
