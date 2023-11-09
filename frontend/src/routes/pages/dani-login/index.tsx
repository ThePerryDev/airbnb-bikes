import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/Authcontext";

export const Danilogin = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    
    const handleLogin = async () => {
        if(email) {
            const isLogged = await auth.signin(email);
            if(isLogged) {
                navigate('/');
            } else {
                alert("Não deu certo.")
            }
        }
    }

    return (
        <div>
            <h2>Login Boludo Fechado</h2>

            <input 
                type="text" 
                value={email}
                onChange = {e => setEmail(e.target.value) }
                placeholder="Digite seu email"
            />
            
            <button onClick={handleLogin}>Logar</button>
        </div>
    )
}