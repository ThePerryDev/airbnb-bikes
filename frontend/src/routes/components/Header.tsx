import { Link } from "react-router-dom";
import lupa from "./img/lupa.png";
import logo from "./img/logo.png";
import user from "./img/user.png";
import { Row, Col, Container } from "react-bootstrap";
import "./Components.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth/Authcontext";

function Header() {
  const auth = useContext(AuthContext);
  
  const handleLogout = async () => {
    await auth.signout();
    window.location.reload();
  };

  return (
    <header id="header">
      <Container>
        <Row>
          <Col>
            <Link className="logo" to="/">
              <img src={logo} alt="logo" />
            </Link>
          </Col>
          <Col>
            <nav id="header-nav">
              {auth.user ? (
                <button id="logout-button" onClick={handleLogout}>sair</button>
              ) : (
                <Link className="botao-user" to="/danilogin">
                  <img src={user} alt="Pagina de usuário" />
                </Link>
              )}
            </nav>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
