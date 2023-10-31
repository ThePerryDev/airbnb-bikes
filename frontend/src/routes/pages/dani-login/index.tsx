import { useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        
    }

    return (
        <div>
            <h2>Login Boludo</h2>

            <input 
                type="text" 
                value={email} 
                placeholder="Digite seu email"
            />
            
            <input 
                type="password" 
                value={password} 
                placeholder="Digite sua senha"
            />

            <button onClick={handleLogin}>Logar</button>
        </div>
    )
}