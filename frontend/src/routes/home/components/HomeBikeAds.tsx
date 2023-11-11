import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BikeProps } from "../../../types";
import api from "../../../services/api";
import { Row } from "react-bootstrap";

function HomeBikeAds() {
  const [bikes, setBikes] = useState<BikeProps[]>([]);

  const getBikes = async () => {
    try {
      const response = await api.get(`/bike`);
      const data = response.data;
      setBikes(data);
      console.log("Teste1", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBikes();
  }, []);

  return (
    <Row id="mainhome1">
      <h2>Escolha a bicicleta que faz mais o seu estilo</h2>
      <Row>
        {bikes.length === 0 ? (
          <p>Não há bicicletas disponíveis</p>
        ) : (
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
  );
}

export default HomeBikeAds;
