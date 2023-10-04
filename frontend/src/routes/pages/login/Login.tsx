import { Link } from "react-router-dom";
import "./login.css"

function Login(){
    return(
        <div>
            <header>
              
            </header>
            <main>
              <div className="cont">
                <div className="form sign-in">
                  <h2>Entrar</h2>
                  <label>
                    <button className="continuar" type="button">Continuar com Facebook</button>
                  </label>
                  <label>
                    <button className="continuar" type="button">Continuar com Google</button>
                  </label>
                </div>
              </div>
            </main>
            <Link to="/">Voltar</Link>
        </div>
    )
}

export default Login