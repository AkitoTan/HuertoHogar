import React, { useState } from "react";

const ProductFilter = ({ allProducts = [], onAddToCart }) => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const filtered = allProducts
    .filter(p => !filter || p.category === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." />
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="">Todas</option>
        <option value="Frutas">Frutas</option>
        <option value="Verduras">Verduras</option>
      </select>
      {filtered.length === 0 && <p>No hay productos.</p>}
      {filtered.map(prod => (
        <div key={prod.id}>
          <b>{prod.name}</b> <span>({prod.category})</span>
          <button onClick={() => onAddToCart(prod.id, 1)}>Agregar</button>
        </div>
      ))}
    </div>
  );
};
export default ProductFilter;
