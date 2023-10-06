import "./bike.css";
import mapaTeste from "./imagens/mapaTeste.png";
import perfil from "./imagens/perfil.png";
import bike from "./imagens/bike.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Card, Col, Container, Row } from "react-bootstrap";

function Bike() {
  return (
    <div id="body">
      <Container fluid id="fundo">
        <Container>
          <Carousel showThumbs={false} showIndicators={true}>
            <div>
              <img src={bike} alt="Bicicleta 1" />
            </div>
            <div>
              <img src={bike} alt="Bicicleta 2" />
            </div>
            <div>
              <img src={bike} alt="Bicicleta 3" />
            </div>
          </Carousel>
        </Container>
        <Container>
          <Row>
            <h1>BICICLETA</h1>
          </Row>
          <Row>
            <Col md={10}>
              <Row className="rowcard">
                <Col md={10}>
                  <Card className="cards">
                    <Card.Title>Categória</Card.Title>
                    <Card.Text></Card.Text>
                  </Card>
                </Col>
              </Row>
              <Row className="rowcard">
                <Col md={5}>
                  <Card className="cards">
                    <Card.Title>Cor</Card.Title>
                    <Card.Text></Card.Text>
                  </Card>
                </Col>
                <Col md={5}>
                  <Card className="cards rightCards">
                    <Card.Title>Tamanho</Card.Title>
                    <Card.Text></Card.Text>
                  </Card>
                </Col>
              </Row>
              <Row className="rowcard">
                <Col md={5}>
                  <Card className="cards">
                    <Card.Title>Material</Card.Title>
                    <Card.Text></Card.Text>
                  </Card>
                </Col>
                <Col md={5}>
                  <Card className="cards rightCards">
                    <Card.Title>Gênero</Card.Title>
                    <Card.Text></Card.Text>
                  </Card>
                </Col>
              </Row>
              <Row className="rowcard">
                <Col md={5}>
                  <Card className="cards">
                    <Card.Title>Marchas</Card.Title>
                    <Card.Text></Card.Text>
                  </Card>
                </Col>
                <Col md={5}>
                  <Card className="cards rightCards">
                    <Card.Title>Aro</Card.Title>
                    <Card.Text></Card.Text>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={5}>
                  <Card className="cards text-right">
                    <Card.Title>Suspensão</Card.Title>
                    <Card.Text></Card.Text>
                  </Card>
                </Col>
                <Col md={5}>
                  <Card className="cards rightCards text-right">
                    <Card.Title>Marca</Card.Title>
                    <Card.Text></Card.Text>
                  </Card>
                </Col>
              </Row>
              <Row id="rowDesc">
                <Col md={10}>
                  <Card className="cards" id="cardDesc">
                    <Card.Title>Descrição</Card.Title>
                    <Card.Text></Card.Text>
                  </Card>
                </Col>
              </Row>
              <Row id="mapCardRow">
                <Col md={10}>
                  <Card id="mapCard">
                    <Card.Img src={mapaTeste} id="mapCard"></Card.Img>
                    <Card.Text></Card.Text>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col md={2}>
              <Card id="cardCont">
                <Card.Text>VALORES</Card.Text>
                <Container className="valContainers">
                  <Card className="valores">
                    <Card.Text>Diária</Card.Text>
                    <Card.Text></Card.Text>
                  </Card>
                  <Card className="valores">
                    <Card.Text>Hora</Card.Text>
                    <Card.Text></Card.Text>
                  </Card>
                </Container>
                <Card.Text>CONTATOS</Card.Text>
                <Container className="valContainers">
                  <Card className="perfil">
                    <Card.Img src={perfil} id="perfilImg"></Card.Img>
                    <Card.Text>Contato</Card.Text>
                    <Card.Text>Contato</Card.Text>
                    <Card.Text>Contato</Card.Text>
                    <Card.Text>Contato</Card.Text>
                    <Card.Text>Contato</Card.Text>
                    <Card.Text>Contato</Card.Text>
                  </Card>
                </Container>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default Bike;
