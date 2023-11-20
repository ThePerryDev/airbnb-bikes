import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth/Authcontext";

export const LoginButton = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

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

  return <button onClick={handleLogin}>Handle Login</button>;
};
