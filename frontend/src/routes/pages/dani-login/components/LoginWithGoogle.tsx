import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth/Authcontext";

export const LoginWithGoogle = () => {
    const auth = useContext(AuthContext);

    return (
        <div>
            <h1>Login With Google</h1>

            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    const token: any = credentialResponse.credential;
                    const decoded = jwtDecode<JwtPayload>(token);
                    let email = "" + decoded.email;
                    let alias = "" + decoded.name;
                    let jtiToken = "" + decoded.jti;
                    auth.signin(alias, email, jtiToken)
                }}
                onError={() => {
                    console.log("login failed");
                }}
            />
        </div>
    );
};