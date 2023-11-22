import homebikes from "../img/homebikes.png";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomeHeader() {
  return (
    <Row id="headerhome">
      <Col>
        <Row id="alignrow">
          <h1>
            <b>O MELHOR AGREGADOR PARA ALUGUEL DE BICICLETAS</b>
          </h1>
          <h3>
            <b>Sua melhor escolha para pedalar</b>
          </h3>
          <Link className="catalog-button" to="/catalog">
            Acesse o Catálogo
          </Link>
        </Row>
      </Col>
      <Col>
        <img src={homebikes} alt="home page bikes" />
      </Col>
    </Row>
  );
}

export default HomeHeader;
