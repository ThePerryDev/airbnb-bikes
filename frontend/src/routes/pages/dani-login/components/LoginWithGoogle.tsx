import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth/Authcontext";
import { useNavigate } from "react-router-dom";
import { UsersProps } from "../../../../types";
import api from "../../../../services/api";
import { Search } from "../../../utils/SearchMethods";

export const LoginWithGoogle = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [users, setUsers] = useState<UsersProps[]>([]);

    const getUsers = async () => {
        try {
            const response = await api.get(`/user`);
            const data = response.data;
            console.log("Teste1", data);
            setUsers(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
      }, []);


    const getMail = async (email:string) => {
        await getUsers();
        let userList: string[] = [];
        users.length === 0 ?
            (console.log("Não há usuários")
            ) : (
            users?.map((user) => (
                userList.push(user.mail)
            )))
        console.log(userList)
        /* Busca dos usuários usando vetor com sentinela */
        let s_number = new Search<number>();
        const index = s_number.sequential_ws(email, userList);
        console.log(userList[index]);
        console.log(users[index]);
    }

    const handleLogin = async () => {
        if (email) {
            const isLogged = await auth.signin(email);
            if (isLogged) {
                navigate("/");
            } else {
                alert("Não deu certo.");
            }
        }
    };


    return (
        <div>
            <h1>Login With Google</h1>

            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    const token: any = credentialResponse.credential;
                    const decoded = jwtDecode<JwtPayload>(token);
                    console.log(decoded);
                    let email = ""+decoded.email
                    getMail(email)
                }}
                onError={() => {
                    console.log("login failed");
                }}
            />
        </div>
    );
};