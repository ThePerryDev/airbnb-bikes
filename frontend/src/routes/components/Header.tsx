import { Link } from "react-router-dom";
import logo from "./img/logo.png";
import user from "./img/user.png";
import logout from "./img/logoutico.png";
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
                <div>
                  <button className="botao-header">
                    <Link to="/user">
                      <img src={user} alt="Pagina de usuário" />
                    </Link>
                  </button>

                  <button className="botao-header" onClick={handleLogout}>
                    <img src={logout} alt="Logout Button" />
                  </button>
                </div>
              ) : (
                <Link className="botao-header" to="/login">
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
