import React from "react";

const Cart = ({ carrito, productos, onRemove, onChangeQty, handleCheckout }) => {

  const getDetails = item => productos.find(p => p.id === item.id) || {};

  const total = carrito.reduce((acc, item) => {
    const prod = getDetails(item);
    return acc + ((prod.precio || 0) * item.qty);
  }, 0);

  return (
    <div style={{
      maxWidth: "600px", margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #ddd"
    }}>
      <h2 style={{ color: "#2E8B57" }}>Carrito de Compras</h2>
      {carrito.length === 0 && <p>No hay productos en el carrito.</p>}
      {carrito.map((item, i) => {
        const prod = getDetails(item);
        return (
          <div key={prod.id} style={{
            borderBottom: "1px solid #eee", padding: "12px 0", display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div>
              <b>{prod.name}</b> <br />
              <small><b>Precio unidad:</b> <span style={{ color: "#2E8B57" }}>{prod.precio} CLP</span></small>
            </div>
            <div>
              <input type="number"
                min="1" max={prod.stock || 100}
                style={{ width: 50, marginRight: 8 }}
                value={item.qty}
                onChange={e => onChangeQty(item.id, Number(e.target.value))}
              />
              <button onClick={() => onRemove(item.id)} style={{
                background: "#8B4513", color: "#fff", border: "none", padding: "4px 7px", borderRadius: 4
              }}>
                Quitar
              </button>
            </div>
          </div>
        );
      })}
      {carrito.length > 0 && (
        <>
          <div style={{ padding: "18px 0", fontWeight: "bold", fontSize: 18 }}>
            Total: <span style={{ color: "#2E8B57" }}>{total.toLocaleString()} CLP</span>
          </div>
          <button
            style={{
              background: "#FFD700",
              color: "#8B4513",
              fontWeight: "bold",
              marginTop: 18,
              border: "none",
              padding: "10px 20px",
              borderRadius: 5
            }}
            onClick={handleCheckout}
          >
            Finalizar Pedido
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
