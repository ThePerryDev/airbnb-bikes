import "./bike.css";
import mapaTeste from "./imagens/mapaTeste.png";
import { Card, Col, Container, Row } from "react-bootstrap";

function Bike() {
  return (
    <div id="body">
      <Container fluid id="fundo">
        <Container>
          <Row>
            <Col md={10}>
              <Row className="rowcard">
                <Col md={5}>
                  <Card className="cards">
                    <Card.Text>Teste</Card.Text>
                  </Card>
                </Col>
                <Col md={5}>
                  <Card>
                    <Card.Text>Teste</Card.Text>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={5}>
                  <Card className="cards rightCards">
                    <Card.Text>Teste</Card.Text>
                  </Card>
                </Col>
                <Col md={5}>
                  <Card className="rightCards">
                    <Card.Text>Teste</Card.Text>
                  </Card>
                </Col>
              </Row>
              <Row id="rowDesc">
                <Col md={10}>
                  <Card id="cardDesc"></Card>
                </Col>
              </Row>
              <Row id="mapCardRow">
                <Col md={10}>
                  <Card id="mapCard">
                    <Card.Img src={mapaTeste} id="mapCard"></Card.Img>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col md={2}>
              <Card id="cardCont"></Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default Bike;
