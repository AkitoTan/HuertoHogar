import {useLocation} from "react-router-dom";

function useQuery() {return new URLSearchParams(useLocation().search);}
const perfilAdmin = () => {
    const q = useQuery();
    return <h2>Perfil Admin - Bienvenido {q.get("nombre")}</h2>
};
export default perfilAdmin;