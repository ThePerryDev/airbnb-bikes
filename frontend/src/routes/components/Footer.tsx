import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoempresa from "./img/logoempresa.png";
import logoequipe from "./img/logoequipe.png";
import "./Components.css";

function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col>
            <Link to="/">
              <img src={logoempresa} alt="logo empresa" />
            </Link>
          </Col>
          <Col>
            <Link to="/">
              <img id="logoequipe" src={logoequipe} alt="logo equipe" />
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
