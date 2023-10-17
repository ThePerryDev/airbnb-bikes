import "./bike.css";
import perfil from "./imagens/perfil.png";
import bikep from "./imagens/bike.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { BikeProps, UsersProps } from "../../../types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import mapBike from "./imagens/mapBike.png";
import { useParams } from "react-router-dom";

function Bike() {
  const { id } = useParams();
  const [bike, setBike] = useState<BikeProps>();
  useEffect(() => {
    fetch(`http://localhost:3001/bike/${id}`)
      .then((r) => r.json())
      .then((r) => setBike(r))
      .catch((error) =>
        console.error("Erro ao buscar informações da bicicleta:", error)
      );
  }, [id]);

  const initMap = useCallback(() => {
    if (bike?.latitude !== undefined && bike?.longitude !== undefined) {
      const map = L.map("map").setView([bike.latitude, bike.longitude], 13);

      L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: mapBike,
        iconSize: [35, 35],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
      });

      // Adicione um marcador no mapa (opcional)
      L.marker([bike.latitude, bike.longitude], { icon: customIcon })
        .addTo(map)
        .bindPopup("Localização da bicicleta")
        .openPopup();
    }
  }, [bike]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  const getSuspension = (bike: BikeProps | undefined) => {
    if (bike?.suspension === true) {
      return "Possui suspensão";
    } else {
      return "Não possui suspensão";
    }
  };

  return (
    <div id="body">
      <Container fluid id="fundo">
        <Container>
          <Carousel showThumbs={false} showIndicators={true}>
            <div>
              <img src={bikep} alt="Bicicleta 1" />
            </div>
            <div>
              <img src={bikep} alt="Bicicleta 2" />
            </div>
            <div>
              <img src={bikep} alt="Bicicleta 3" />
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
                    <Card.Title>Categoria</Card.Title>
                    <Card.Text>{bike?.category.name}</Card.Text>
                  </Card>
                </Col>
              </Row>
              <Row className="rowcard">
                <Col md={5}>
                  <Card className="cards">
                    <Card.Title>Cor</Card.Title>
                    <Card.Text>{bike?.color}</Card.Text>
                  </Card>
                </Col>
                <Col md={5}>
                  <Card className="cards rightCards">
                    <Card.Title>Tamanho</Card.Title>
                    <Card.Text>{bike?.size}</Card.Text>
                  </Card>
                </Col>
              </Row>
              <Row className="rowcard">
                <Col md={5}>
                  <Card className="cards">
                    <Card.Title>Material</Card.Title>
                    <Card.Text>{bike?.material}</Card.Text>
                  </Card>
                </Col>
                <Col md={5}>
                  <Card className="cards rightCards">
                    <Card.Title>Gênero</Card.Title>
                    <Card.Text>{bike?.gender}</Card.Text>
                  </Card>
                </Col>
              </Row>
              <Row className="rowcard">
                <Col md={5}>
                  <Card className="cards">
                    <Card.Title>Marchas</Card.Title>
                    <Card.Text>{bike?.speedkit}</Card.Text>
                  </Card>
                </Col>
                <Col md={5}>
                  <Card className="cards rightCards">
                    <Card.Title>Aro</Card.Title>
                    <Card.Text>{bike?.rim}</Card.Text>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={5}>
                  <Card className="cards text-right">
                    <Card.Title>Suspensão</Card.Title>
                    <Card.Text>{getSuspension(bike)}</Card.Text>
                  </Card>
                </Col>
                <Col md={5}>
                  <Card className="cards rightCards text-right">
                    <Card.Title>Marca</Card.Title>
                    <Card.Text>{bike?.brand.name}</Card.Text>
                  </Card>
                </Col>
              </Row>
              <Row id="rowDesc">
                <Col md={10}>
                  <Card className="cards" id="cardDesc">
                    <Card.Title>Descrição</Card.Title>
                    <Card.Text>{bike?.description}</Card.Text>
                  </Card>
                </Col>
              </Row>
              <Row id="mapCardRow">
                <Col md={10}>
                  <Card id="mapCard">
                    <div
                      id="map"
                      style={{ width: "100%", height: "400px" }}
                    ></div>
                    <Card.Text></Card.Text>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col md={2}>
              <Card id="cardCont">
                <Card.Title>VALORES</Card.Title>
                <Container className="valContainers">
                  <Card className="valores">
                    <Card.Text>Diária</Card.Text>
                    <Card.Text>{bike?.dailyvalue}</Card.Text>
                  </Card>
                  <Card className="valores">
                    <Card.Text>Hora</Card.Text>
                    <Card.Text>{bike?.hourlyvalue}</Card.Text>
                  </Card>
                </Container>
                <Card.Text>CONTATOS</Card.Text>
                <Container className="valContainers">
                  <Card className="perfil">
                    <Card.Img src={perfil} id="perfilImg"></Card.Img>
                    <Card.Text>{bike?.user.phone}</Card.Text>
                    <Card.Text>{bike?.user.mail}</Card.Text>
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
