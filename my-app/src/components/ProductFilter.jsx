import React, { useState } from "react";

const categorias = [
  "Todas", "Frutas Frescas", "Verduras Orgánicas", "Productos Orgánicos"
];

const getOrigens = products =>
  [...new Set(products.map(p => p.origen).filter(Boolean))];

const ProductFilter = ({ allProducts, onAddToCart, stocks = {} }) => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [origen, setOrigen] = useState("");
  const [receta, setReceta] = useState(false);
  const [cantidades, setCantidades] = useState({});
  const [addMsg, setAddMsg] = useState({});

  const filtrado = allProducts
    .filter(p => !filter || filter === "Todas" || p.category === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => !precioMin || p.precio >= parseInt(precioMin))
    .filter(p => !precioMax || p.precio <= parseInt(precioMax))
    .filter(p => !origen || p.origen === origen)
    .filter(p => !receta || (p.recetas && p.recetas.length > 0));

  const origensOpciones = getOrigens(allProducts);

  const handleQtyChange = (id, value) => {
    setCantidades(prev => ({ ...prev, [id]: value }));
  };

  const handleAddCart = (prod) => {
    const cantidad = Math.max(1, Number(cantidades[prod.id] || 1));
    if (stocks[prod.id] !== undefined && cantidad > stocks[prod.id]) {
      alert("No hay suficiente stock disponible.");
      return;
    }
    onAddToCart(prod.id, cantidad);
    setCantidades(prev => ({ ...prev, [prod.id]: 1 })); // Reset input
    setAddMsg(prev => ({ ...prev, [prod.id]: "¡Agregado con éxito!" }));
    setTimeout(() => setAddMsg(prev => ({ ...prev, [prod.id]: "" })), 1500);
  };

  return (
    <div style={{
      background: "#f7f7f7", minHeight: "100vh",
      fontFamily: "Montserrat, sans-serif", padding: 24
    }}>
      <h2 style={{ color: "#8B4513", fontFamily: 'Playfair Display, serif' }}>Catálogo de Productos</h2>
      <div style={{
        display: "flex", gap: 14, marginBottom: 14, flexWrap: "wrap"
      }}>
        {/* ... (todos tus filtros igual que antes) ... */}

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar..."
          style={{
            padding: "10px 12px", borderRadius: 6, border: "1px solid #aaa", fontSize: 17
          }}
        />
        <select value={filter} onChange={e => setFilter(e.target.value)}
          style={{ padding: "10px 12px", borderRadius: 6, fontSize: 17 }}>
          {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input type="number" min={0} placeholder="Precio mínimo"
          value={precioMin} onChange={e => setPrecioMin(e.target.value)}
          style={{ padding: "8px", borderRadius: 6, width: 100, fontSize: 15 }} />
        <input type="number" min={0} placeholder="Precio máximo"
          value={precioMax} onChange={e => setPrecioMax(e.target.value)}
          style={{ padding: "8px", borderRadius: 6, width: 100, fontSize: 15 }} />
        <select value={origen} onChange={e => setOrigen(e.target.value)}
          style={{ padding: "8px", borderRadius: 6, fontSize: 15, minWidth: 140 }}>
          <option value="">Origen (todos)</option>
          {origensOpciones.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <label style={{ display: "flex", alignItems: "center", fontSize: 15, gap: 5 }}>
          <input type="checkbox" checked={receta} onChange={e => setReceta(e.target.checked)} />
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
              <b> | Stock: </b>
              {stocks[prod.id] !== undefined ? stocks[prod.id] : prod.stock}
            </p>
            <div style={{ marginTop: 7, display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="number"
                min={1}
                max={stocks[prod.id] !== undefined ? stocks[prod.id] : prod.stock}
                value={cantidades[prod.id] || 1}
                onChange={e => handleQtyChange(prod.id, Math.max(1, Number(e.target.value)))}
                style={{ width: 53, borderRadius: 6, border: "1px solid #ccc", padding: "5px 2px" }}
              />
              <button
                style={{
                  background: "#2E8B57", color: "#FFF", border: "none",
                  padding: "7px 12px", borderRadius: 6, cursor: "pointer",
                  fontWeight: "bold"
                }}
                onClick={() => handleAddCart(prod)}
                disabled={stocks[prod.id] !== undefined && (stocks[prod.id] < (cantidades[prod.id] || 1))}
              >
                Agregar al carrito
              </button>
            </div>
            {addMsg[prod.id] && (
              <small style={{ color: "#2E8B57", marginTop: 5, fontWeight: 600 }}>{addMsg[prod.id]}</small>
            )}
            {/* Visualización receta sugerida */}
            {prod.recetas && prod.recetas.length > 0 && (
              <div style={{
                background: "#F5F5DC", color: "#8B4513",
                padding: "8px 10px", borderRadius: 10,
                marginTop: 9, textAlign: "center", fontSize: 14, width: "97%"
              }}>
                <strong>Receta sugerida:</strong>
                <br />
                <span>{prod.recetas[0].nombre || "Ver receta"}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
