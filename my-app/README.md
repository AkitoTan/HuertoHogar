HuertoHogar - Tienda Online React
Aplicación fullstack para gestión de productos, catálogo, perfil de usuario, carrito de compras, pedidos, blog y comunidad agrícola local.

Estructura recomendada
src/ — componentes, páginas, lógica principal

public/ — archivos estáticos, imágenes (/img/logo.png, /img/papel-reciclado-textura.jpg)

tests/ — pruebas unitarias Jasmine/Karma

my-app/ — raíz del proyecto, configuración y dependencias (package.json)

Instalación y comandos principales
Instalar dependencias:

bash
npm install
Iniciar la app en desarrollo:

bash
npm start
Correr tests unitarios (Jasmine/Karma):

bash
npm test
Módulos principales
Home: Información, impacto ambiental y social, productos recomendados, blog y términos.

Catalogo/ProductFilter: Catálogo de productos con filtros avanzados (categoría, precio, origen, recetas).

ProductDetail: Vista individual de productos, recetas sugeridas, reseñas y calificaciones.

Cart: Carrito de compras, cupón de descuento, programa de puntos (si está activo).

OrderHistory: Historial de pedidos, estados, fecha de entrega, seguimiento.

UserProfile: Edición de datos personales, dirección, teléfono y avatar.

Nosotros: Información de empresa, mapa con sucursales dinámicas (opcional, integración Firebase + Google Maps).

Blog: Entradas y recetas, publicación/admin para usuario autorizado.

Navbar: Navegación principal, botones share para redes sociales.

Condiciones: Términos y condiciones legales/bases.

Features destacadas
Autenticación: registro, login, edición y perfil personal (Firebase Auth y Firestore)

Pedidos: gestión y seguimiento en tiempo real

Impacto ambiental/social: visualización de métricas y beneficios a la comunidad

Sistema de cupones y descuentos: VERDE10 (-10%), CAMPO15 (-15%)

Pruebas unitarias: cobertura para componentes esenciales (tests/)

Responsive y visual: compatible con DSY-propuesta de diseño, textura reciclada y accesibilidad

Blog y recetas: publicación, visualización y links

Integración social: botones de compartir en Facebook, Instagram, WhatsApp y X/Twitter

Cómo usar
Instalar dependencias y configurar variables Firebase en /src/config/firebase.js

Iniciar el proyecto y crear usuarios desde /register

Agregar productos, editar perfil y probar carrito/filtros

Consultar pedidos y reseñar productos comprados

Usar funcionalidades de comunidad y compartir en redes

Pruebas unitarias
Pruebas con Jasmine y Karma para componentes (Catálogo, Cart, Perfil, OrderHistory)

Resultado y cobertura en carpeta /tests

Ejemplo de ejecución: npm test

Colaboración y evidencia
Historial de commits en GitHub

(Opcional) evidencia en Trello y capturas de pantalla en /doc

Contacto y dudas: consultas@huertohogar.cl

Imágenes y recursos
Logo y texturas en /public/img/

Imágenes de productos: /public/img/manzana.webp, /public/img/zanahoria.webp, /public/img/miel.jpg

Fondo reciclado: /public/img/papel-reciclado-textura.jpg