import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const ProductFilter = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      let q = collection(db, "productos");
      if (filter) {
        q = query(q, where("categoria", "==", filter));
      }
      const snap = await getDocs(q);
      setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, [filter]);

  return (
    <div>
      <h2>Filtrar productos</h2>
      <select onChange={e => setFilter(e.target.value)} value={filter}>
        <option value="">Todos</option>
        <option value="Frutas">Frutas</option>
        <option value="Verduras">Verduras</option>
        <option value="Otro">Otro</option>
      </select>
      <ul>
        {products.map(prod => (
          <li key={prod.id}>
            <b>{prod.name}</b> | <span>{prod.categoria}</span> | ${prod.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFilter;
