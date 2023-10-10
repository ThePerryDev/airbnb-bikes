import { Link } from "react-router-dom";
import lupa from "./img/lupa.png";
import logo from "./img/logo.png";
import user from "./img/user.png";
import config from "./img/config.png";
import { Row, Col, Container, AccordionHeader } from "react-bootstrap";
import "./Components.css";

function Header() {
  const black = "black";

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
            <form action="" className="searchbar">
              <input type="text" placeholder="Search..." />
              <button type="submit">
                <img src={lupa} alt="search icon" />
              </button>
            </form>
          </Col>
          <Col>
            <nav id="header-nav">
              <button className="botao-user">
                <img src={user} alt="Pagina de usuário" />
              </button>

              <button className="botao-config">
                <img src={config} alt="Pagina de configuração" />
              </button>
            </nav>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
