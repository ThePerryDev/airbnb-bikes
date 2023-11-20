import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth/Authcontext";
import { useNavigate } from "react-router-dom";
import { UsersProps } from "../../../../types";
import api from "../../../../services/api";
import { Search } from "../../../utils/SearchMethods";
import service from "../../../../services/UsersService";

export const LoginWithGoogle = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [users, setUsers] = useState<UsersProps[]>([]);

    const getUsers = async () => {
        try {
            const response = await api.get(`/user`);
            const data = response.data;
            setUsers(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const registerUser = async (alias: string, mail: string) => {
        const res: any = await service.post({
            alias: alias.trim(),
            mail: mail.trim(),
            phone: ""
        })
    }

    const getMail = async (alias: string, email: string, jtiToken: string ) => {
        await getUsers();
        let mailList: string[] = [];

        /* Se a lista de usuários existe, popula a lista de email dos usuários */
        if (users.length > 0) {
            users?.map((user) => (
                mailList.push(user.mail))
            )
        }

        /* Busca do usuário usando vetor com sentinela */
        let s_number = new Search<number>();
        const index = s_number.sequential_ws(email, mailList);
        /* Se o email ainda não estiver no banco de dados, ele então é cadastrado */
        if (index === -1) { registerUser(alias, email); }
        /* Aqui acontece o signin de fato */
        const isLogged = await auth.signin(email, jtiToken);
        if (isLogged) {
            navigate("/");
        }
        console.log(mailList[index]);
        console.log(users[index]);
    }

    return (
        <div>
            <h1>Login With Google</h1>

            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    const token: any = credentialResponse.credential;
                    const decoded = jwtDecode<JwtPayload>(token);
                    console.log(decoded);
                    let email = "" + decoded.email;
                    let alias = "" + decoded.name;
                    let jtiToken = "" + decoded.jti;
                    getMail(alias, email, jtiToken)
                }}
                onError={() => {
                    console.log("login failed");
                }}
            />
        </div>
    );
};