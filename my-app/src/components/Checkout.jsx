import React from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const Checkout = ({ cart, user }) => {
  const handleCheckout = async () => {
    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      products: cart,
      total: cart.reduce((sum, prod) => sum + prod.price*prod.qty, 0),
      date: new Date()
    });
    alert("Compra realizada con éxito");
    // Limpia el carrito aquí si quieres
  };

  return (
    <button onClick={handleCheckout}>
      Comprar
    </button>
  );
};
const handleCheckout = async () => {
  if (!user?.uid) return;
  await updateDoc(doc(db, "usuarios", user.uid), { descuentoDisponible: true });
};


if (userData?.descuentoDisponible) {
  // Muestra un banner: "¡Tienes un descuento!"
  // Aplica el descuento en el total
}
await updateDoc(doc(db, "usuarios", user.uid), { descuentoDisponible: false });

export default Checkout;
