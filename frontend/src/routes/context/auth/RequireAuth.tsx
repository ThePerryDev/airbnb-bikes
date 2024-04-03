//Componente que valida se o usuário está ou não logado
//Se não estiver logado, mostra a página de login
//Se estiver, mostra a página que ele gostaria de acessar (user)

import { useContext } from "react";
import { Login } from "../../pages/login/Login";
import { AuthContext } from "./Authcontext";

export const RequireAuth = ({ children }: { children: JSX.Element}) => {
    const auth = useContext(AuthContext);

    if(!auth.user) {
        return <Login />
    }
    return children;
}