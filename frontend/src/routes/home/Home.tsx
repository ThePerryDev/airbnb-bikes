import "./home.css";
import homebikes from "./img/homebikes.png";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BikeProps } from "../../types";
import api from "../../services/api";

function Home() {
  const [bikes, setBikes] = useState<BikeProps[]>([]);

  const getBikes = async () => {
    try {
      const response = await api.get(`/bike`);
      const data = response.data;
      setBikes(data);
      console.log("Teste1", data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBikes();
  }, [])

  return (
      <div id="home">
        <Container>
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

          <Row id="mainhome1">
            <h2>Escolha a bicicleta que faz mais o seu estilo</h2>
            <Row>
              {bikes.length === 0 ? (<p>Não há bicicletas disponíveis</p>) : (
                bikes?.map((bike) => (
                  <div className="home-bike-card" key={bike.id}>
                    <div className="adjust">
                      {bike.photos[0] ? (
                        <img
                          src={`http://localhost:3001/photo/public/${bike.photos[0].filename}`}
                          alt="bike"
                          className="home-bike-photo"
                        />
                      ) : (
                        <p>Foto não disponível</p>
                      )}
                    </div>
                    <div className="adjust">
                      <Link className="home-bike-button" to="/bike">
                        Confirma
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </Row>
          </Row>
        </Container>
      </div>
  );
}

export default Home;
