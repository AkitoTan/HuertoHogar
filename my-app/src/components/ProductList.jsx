
import React, { useState } from 'react';

const ProductList = ({ products, addToCart }) => {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const filteredProducts = products
    .filter(p => (filter ? p.category === filter : true))
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <input
        placeholder="Buscar..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select onChange={e => setFilter(e.target.value)}>
        <option value="">Todas</option>
        <option value="Frutas Frescas">Frutas Frescas</option>
        {/* otras categorías */}
      </select>
      <div className="row">
        {filteredProducts.map(p => (
          <div key={p.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={p.img} className="card-img-top" alt={p.name} style={{height:200,objectFit:'cover'}}/>
              <div className="card-body">
                <h6 className="card-title">{p.name}</h6>
                <p className="text-muted small mb-1">{p.origin}</p>
                <p className="fw-bold text-success mb-2">${p.price.toLocaleString('es-CL')} / {p.unit}</p>
                <p className="small text-secondary">Stock: {p.stock}</p>
                <button className="btn btn-success btn-sm w-100" onClick={() => addToCart(p.id, 1)}>
                  🛒 Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const [search, setSearch] = useState("");
const [categoria, setCategoria] = useState("");
const [precioMin, setPrecioMin] = useState("");
const [precioMax, setPrecioMax] = useState("");

const listaFiltrada = productos
  .filter(p => !categoria || p.categoria === categoria)
  .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  .filter(p => !precioMin || p.price >= precioMin)
  .filter(p => !precioMax || p.price <= precioMax);

return (
  <>
    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." />
    <select value={categoria} onChange={e => setCategoria(e.target.value)}>
      <option value="">Todas</option>
      <option value="Frutas">Frutas</option>
      {/* ... */}
    </select>
    <input type="number" placeholder="Precio mínimo" value={precioMin} onChange={e => setPrecioMin(e.target.value)} />
    <input type="number" placeholder="Precio máximo" value={precioMax} onChange={e => setPrecioMax(e.target.value)} />

    {/* Renderiza la lista filtrada aquí */}
  </>
);

export default ProductList;
