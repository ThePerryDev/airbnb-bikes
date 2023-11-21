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
  
  const handleLogout = () => {
    auth.signout();
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
          <Col xs={6}>
            <form action="" className="searchbar">
              <input type="text" placeholder="Search..." />
              <button type="submit">
                <img src={lupa} alt="search icon" />
              </button>
            </form>
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
