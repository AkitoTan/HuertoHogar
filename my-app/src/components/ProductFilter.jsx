import React, { useState } from "react";

const categorias = [
  "Todas", "Frutas Frescas", "Verduras Orgánicas", "Productos Orgánicos"
];

// Espera el prop allProducts
const ProductFilter = ({ allProducts, onAddToCart }) => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const filtrado = allProducts
    .filter(p => !filter || filter === "Todas" || p.category === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ background: "#f7f7f7", minHeight: "100vh", fontFamily: "Montserrat, sans-serif", padding: 24 }}>
      <h2 style={{ color: "#8B4513", fontFamily: 'Playfair Display, serif' }}>Catálogo de Productos</h2>
      <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." style={{
          padding: "10px 12px", borderRadius: 6, border: "1px solid #aaa", fontSize: 17
        }}/>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{
          padding: "10px 12px", borderRadius: 6, fontSize: 17
        }}>
          {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 25 }}>
        {filtrado.length === 0 && <p>No hay productos.</p>}
        {filtrado.map(prod => (
          <div key={prod.id} style={{
            border: "1px solid #ddd",
            borderRadius: 14,
            background: "#fff",
            padding: 16,
            margin: 10,
            width: 260,
            boxShadow: "0 2px 7px #eee",
            display: "flex", flexDirection: "column", alignItems: "center"
          }}>
            <img
              src={prod.img}
              alt={prod.name}
              style={{
                width: "95%", height: 120, objectFit: "cover",
                borderRadius: 11, marginBottom: 12, boxShadow: "0 0 7px #ccc"
              }}
              onError={e => { e.target.src = "/img/default-fruta.png"; }}
            />
            <h3 style={{ color: "#8B4513", marginBottom: 6 }}>{prod.name}</h3>
            <small style={{ color: "#666" }}>{prod.category}</small>
            <p style={{ color: "#333", margin: "7px 0" }}>{prod.desc}</p>
            <p style={{ fontSize: 15, margin: "3px 0" }}>
              <b>Origen:</b> {prod.origen}
            </p>
            <p style={{ fontWeight: "bold" }}>
              <span style={{ color: "#2E8B57" }}>{prod.precio.toLocaleString()} CLP</span> <b>| Stock: </b>{prod.stock}
            </p>
            <button
              style={{
                background: "#2E8B57", color: "#FFF", border: "none",
                padding: "7px 19px", borderRadius: 6, cursor: "pointer", fontWeight: "bold", marginTop: 6
              }}
              onClick={() => onAddToCart ? onAddToCart(prod.id, 1) : alert('Debes estar autenticado para comprar')}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
