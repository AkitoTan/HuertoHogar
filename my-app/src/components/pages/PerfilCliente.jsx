import {useLocation} from "react-router-dom";
import OrderHistory from '../components/OrderHistory';
function useQuery() {return new URLSearchParams(useLocation().search);}
const perfilCliente = () => {
    const q = useQuery();
    return <h2>Perfil Cliente - Bienvenido {q.get("nombre")}</h2>
};
const Profile = ({ user }) => (
  <div>
    <h1>Perfil de Usuario</h1>
    {}
    <OrderHistory user={user} />
  </div>
);

export default perfilCliente;