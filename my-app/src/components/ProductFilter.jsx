import React, { useState } from "react";

// Puedes extender esta lista si agregas más categorías en tu catálogo
const categorias = [
  "Todas", "Frutas Frescas", "Verduras Orgánicas", "Productos Orgánicos"
];

// Obtiene los orígenes únicos de todos los productos
const getOrigens = products =>
  [...new Set(products.map(p => p.origen).filter(Boolean))];

const ProductFilter = ({ allProducts, onAddToCart }) => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [origen, setOrigen] = useState("");
  const [receta, setReceta] = useState(false);

  // Filtrado avanzado
  const filtrado = allProducts
    .filter(p => !filter || filter === "Todas" || p.category === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => !precioMin || p.precio >= parseInt(precioMin))
    .filter(p => !precioMax || p.precio <= parseInt(precioMax))
    .filter(p => !origen || p.origen === origen)
    .filter(p => !receta || (p.recetas && p.recetas.length > 0));

  const origensOpciones = getOrigens(allProducts);

  return (
    <div style={{
      background: "#f7f7f7", minHeight: "100vh",
      fontFamily: "Montserrat, sans-serif", padding: 24
    }}>
      <h2 style={{ color: "#8B4513", fontFamily: 'Playfair Display, serif' }}>Catálogo de Productos</h2>
      <div style={{
        display: "flex", gap: 14, marginBottom: 14, flexWrap: "wrap"
      }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar..."
          style={{
            padding: "10px 12px", borderRadius: 6, border: "1px solid #aaa", fontSize: 17
          }}
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{
            padding: "10px 12px", borderRadius: 6, fontSize: 17
          }}
        >
          {categorias.map(cat =>
            <option key={cat} value={cat}>{cat}</option>
          )}
        </select>
        <input
          type="number"
          min={0}
          placeholder="Precio mínimo"
          value={precioMin}
          onChange={e => setPrecioMin(e.target.value)}
          style={{
            padding: "8px", borderRadius: 6, width: 100, fontSize: 15
          }}
        />
        <input
          type="number"
          min={0}
          placeholder="Precio máximo"
          value={precioMax}
          onChange={e => setPrecioMax(e.target.value)}
          style={{
            padding: "8px", borderRadius: 6, width: 100, fontSize: 15
          }}
        />
        <select
          value={origen}
          onChange={e => setOrigen(e.target.value)}
          style={{
            padding: "8px", borderRadius: 6, fontSize: 15, minWidth: 140
          }}
        >
          <option value="">Origen (todos)</option>
          {origensOpciones.map(o =>
            <option key={o} value={o}>{o}</option>
          )}
        </select>
        <label style={{
          display: "flex", alignItems: "center", fontSize: 15, gap: 5
        }}>
          <input
            type="checkbox"
            checked={receta}
            onChange={e => setReceta(e.target.checked)}
          />
          Sólo con recetas sugeridas
        </label>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 25 }}>
        {filtrado.length === 0 && (
          <p>No hay productos que cumplan el filtro.</p>
        )}

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
            <h3 style={{ color: "#8B4513", marginBottom: 6 }}>
              {prod.name}
              {prod.recetas?.length > 0 &&
                <span title="Tiene receta recomendada"
                  style={{ color: "#2E8B57", marginLeft: 7, fontSize: 16 }}>🍳</span>
              }
            </h3>
            <small style={{ color: "#666" }}>{prod.category}</small>
            <p style={{ color: "#333", margin: "7px 0" }}>{prod.desc}</p>
            <p style={{ fontSize: 15, margin: "3px 0" }}>
              <b>Origen:</b> {prod.origen}
            </p>
            <p style={{ fontWeight: "bold" }}>
              <span style={{ color: "#2E8B57" }}>
                {prod.precio.toLocaleString()} CLP
              </span>
              <b> | Stock: </b>{prod.stock}
            </p>
            <button
              style={{
                background: "#2E8B57", color: "#FFF", border: "none",
                padding: "7px 19px", borderRadius: 6, cursor: "pointer",
                fontWeight: "bold", marginTop: 6
              }}
              onClick={() =>
                onAddToCart ? onAddToCart(prod.id, 1)
                : alert('Debes estar autenticado para comprar')
              }
            >
              Agregar al carrito
            </button>
            {/* Visualización de receta sugerida resumen */}
            {prod.recetas && prod.recetas.length > 0 && (
              <div style={{
                background: "#F5F5DC", color: "#8B4513",
                padding: "8px 10px", borderRadius: 10,
                marginTop: 9, textAlign: "center", fontSize: 14, width: "97%"
              }}>
                <strong>Receta sugerida:</strong>
                <br />
                <span>{prod.recetas[0].nombre || "Ver receta"}</span>
                {/* Si quieres botón/link: <a href={prod.recetas[0].link}>Ver receta</a> */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
