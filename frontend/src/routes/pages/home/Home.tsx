import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context";
import { logout, user } from "../../../assets";
import "../css/centerbox.css";

function Home() {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
    window.location.reload();
  };

  return (
    <nav>
      {auth.user ? (
        <div className="centerbox">
          <button>
            <Link to={`/user/${auth.user?.id}`}>
              <img src={user} alt="Pagina de usuário" />
            </Link>
          </button>
          <button onClick={handleLogout}>
            <img id="logoutbutton" src={logout} alt="Logout Button" />
          </button>
        </div>
      ) : (
        <div>
          <button>
            <Link to="/user">
              <img src={user} alt="Página de usuário" />
            </Link>
          </button>
          <span>User Page</span>

          <button>
            <Link to="/projects">
              <img src={user} alt="Página de projetos" />
            </Link>
          </button>
          <span>Projects Page</span>
        </div>
      )}
    </nav>
  );
}

export default Home;
