import React, { useState } from "react";

const ProductFilter = ({ allProducts, onAddToCart }) => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const filtered = allProducts
    .filter(p => !filter || p.category === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar..."
      />
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="">Todas</option>
        <option value="Frutas">Frutas</option>
        {/* más categorías si lo necesitas */}
      </select>
      <div>
        {filtered.map(prod => (
          <div key={prod.id}>
            <b>{prod.name}</b>
            <span>{prod.category}</span>
            <button onClick={() => onAddToCart(prod.id, 1)}>Agregar</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductFilter;
