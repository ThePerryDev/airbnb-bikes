import "./home.css";
import homebikes from "./img/homebikes.png";
import { Row, Col, Container } from "react-bootstrap";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function Home() {

  return (
    <div>
      <Header />
      <main>
        <Container>
          <Row>
            <Col id="col1" >
              <h1><b> O MELHOR AGREGADOR <br/> PARA ALUGUEL DE <br/> BICICLETAS</b></h1>
              <h3><b>Sua melhor escolha para pedalar</b></h3>
              <Link className="catalog-button" to="/catalog">Acesse o Catálogo</Link>
            </Col>
            <Col>
              <img src={homebikes} alt="" />
            </Col>
          </Row>
        </Container>
      </main>

    </div>
  );
}

export default Home;
