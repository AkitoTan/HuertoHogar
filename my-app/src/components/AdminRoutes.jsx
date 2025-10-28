import { Navigate } from "react-router-dom";

const ADMIN_EMAIL = "admin@duoc.cl";

const AdminRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" />; // Si no está logueado, manda a login
  if (user.email !== ADMIN_EMAIL) return <Navigate to="/" />; // Si no es admin, manda a inicio
  return children; // Si es admin, muestra la ruta protegida (el panel)
};

export default AdminRoute;
