import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/Authcontext";
import "./Login.css";

export const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div id="loginbox">

        <h1>Faça seu Login com o Google</h1>

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const token: any = credentialResponse.credential;
            const decoded = jwtDecode<JwtPayload>(token);
            let email = "" + decoded.email;
            let alias = "" + decoded.name;
            let jtiToken = "" + decoded.jti;
            auth.signin(alias, email, jtiToken);
            navigate("/");
          }}
          onError={() => {
            console.log("login failed");
          }}
        />

    </div>
  );
};
