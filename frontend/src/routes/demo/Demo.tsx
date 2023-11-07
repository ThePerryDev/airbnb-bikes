import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import "./Demo.css";
import { AuthContext } from "../context/auth/Authcontext";

function Demo() {
  const [navegar, setNavegar] = useState("");
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
    window.location.reload();
  }

  return (
    <>
    <div id="bodyx">
      <div className="conteudo">
        <h1>Welcome to the Bikepass demo!</h1>
        <nav>
          <p>Please, select the page you want to see:</p>
          <select id="paginas" onChange={(e) => setNavegar(e.target.value)}>
            <option value="/" selected>
              Select
            </option>
            <option value="/brand">Brand</option>
            <option value="/category">Category</option>
            <option value="/user">User</option>
            <option value="/bike">Bike</option>
            <option value="/home">Home</option>
            <option value="/catalog">Catalog</option>
            <option value="/registerbike">Register Bike</option>
            <option value="/login">Login</option>
          </select>
          <Link to={navegar}>Confirma</Link>
        </nav>
      </div>
    </div>
    {auth.user && <button onClick={handleLogout}>sair</button>}
    </>
  );
}

export default Demo;
