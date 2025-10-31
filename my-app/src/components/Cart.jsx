import React, { useState, useEffect } from "react";

const CUPONES = {
  VERDE10: 0.10,
  CAMPO15: 0.15
};

const Cart = ({ carrito, productos, onRemove, onChangeQty, handleCheckout }) => {
  const [cup, setCup] = useState("");
  const [cupFeedback, setCupFeedback] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [localStocks, setLocalStocks] = useState({});
  const [addMsg, setAddMsg] = useState("");

  // Inicializa stock local
  useEffect(() => {
    setLocalStocks(productos.reduce((acc, prod) => {
      acc[prod.id] = prod.stock;
      return acc;
    }, {}));
  }, [productos]);

  // Feedback agregado
  useEffect(() => {
    if (carrito.length > 0) {
      setAddMsg("Producto agregado con éxito.");
      setTimeout(() => setAddMsg(""), 1600);
    }
  }, [carrito.length, carrito]);

  const getDetails = item => productos.find(p => p.id === item.id) || {};

  // Responsivamente descuenta stock según cantidad en carrito
  useEffect(() => {
    let stocks = { ...localStocks };
    productos.forEach(prod => { stocks[prod.id] = prod.stock; });
    carrito.forEach(item => {
      if (stocks[item.id] !== undefined) stocks[item.id] -= item.qty;
    });
    setLocalStocks(stocks);
  }, [carrito, productos]);

  const handleQtyChange = (id, newQty) => {
    // Solo permite sumar si hay stock suficiente
    const prod = productos.find(p => p.id === id);
    if (!prod) return;
    const used = carrito.find(item => item.id === id)?.qty || 0;
    const actualStock = prod.stock - used + used;
    if (newQty <= prod.stock && newQty > 0) {
      onChangeQty(id, newQty);
      setAddMsg("Cantidad actualizada.");
      setTimeout(() => setAddMsg(""), 1100);
    }
  };

  const handleRemoveItem = (id) => {
    // Devuelve stock al quitar
    onRemove(id);
    setAddMsg("Producto eliminado, stock devuelto.");
    setTimeout(() => setAddMsg(""), 1100);
  };

  const total = carrito.reduce((acc, item) => {
    const prod = getDetails(item);
    return acc + ((prod.precio || 0) * item.qty);
  }, 0);

  const totalDescuento = total - Math.round(total * descuento);

  const aplicarCupon = () => {
    const cupValido = CUPONES[cup.trim().toUpperCase()];
    if (cupValido) {
      setDescuento(cupValido);
      setCupFeedback(`¡Cupón aplicado: -${cupValido * 100}%!`);
    } else {
      setDescuento(0);
      setCupFeedback("Cupón no válido");
    }
  };

  return (
    <div style={{
      maxWidth: "600px", margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #ddd"
    }}>
      <h2 style={{ color: "#2E8B57" }}>Carrito de Compras</h2>
      {addMsg && <div style={{ color: "#2E8B57", fontWeight: "bold", marginBottom: 12 }}>{addMsg}</div>}
      {carrito.length === 0 && <p>No hay productos en el carrito.</p>}
      {carrito.map((item, i) => {
        const prod = getDetails(item);
        const stockRemaining = localStocks[prod.id] + item.qty; // Stock total menos lo en carrito
        return (
          <div key={prod.id} style={{
            borderBottom: "1px solid #eee", padding: "12px 0", display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div>
              <b>{prod.name}</b> <br />
              <small>
                <b>Precio unidad:</b> <span style={{ color: "#2E8B57" }}>{prod.precio} CLP</span>
                <br />
                <b>Stock disponible:</b>{" "}
                <span style={{ color: "#B22222" }}>{stockRemaining}</span>
              </small>
            </div>
            <div>
              <input type="number"
                min="1"
                max={prod.stock}
                style={{ width: 50, marginRight: 8 }}
                value={item.qty}
                onChange={e => handleQtyChange(item.id, Number(e.target.value))}
              />
              <button onClick={() => handleRemoveItem(item.id)} style={{
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
          <div style={{ marginTop: 18, marginBottom: 9 }}>
            <label>
              <b>Cupón de descuento:</b>
              <br />
              <input
                type="text"
                value={cup}
                onChange={e => setCup(e.target.value)}
                placeholder="Ingresa tu cupón (VERDE10, CAMPO15)"
                style={{ fontSize: 15, padding: "8px 12px", borderRadius: 6, marginRight: 10, marginTop: 6, border: "1px solid #C0C090" }}
              />
              <button
                style={{
                  background: "#2E8B57", color: "#fff", border: "none",
                  padding: "6px 14px", borderRadius: 6, marginLeft: 8, cursor: "pointer"
                }}
                onClick={aplicarCupon}
              >
                Aplicar
              </button>
            </label>
            {cupFeedback &&
              <div style={{ marginTop: 7, color: descuento ? "#2E8B57" : "darkred", fontWeight: "bold" }}>
                {cupFeedback}
              </div>
            }
          </div>
          <div style={{ padding: "18px 0", fontWeight: "bold", fontSize: 18 }}>
            Total: <span style={{ color: "#2E8B57" }}>{total.toLocaleString()} CLP</span>
            {descuento > 0 &&
              <span style={{ color: "#FFD700", marginLeft: 15 }}>
                → Con descuento: {totalDescuento.toLocaleString()} CLP
              </span>
            }
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
