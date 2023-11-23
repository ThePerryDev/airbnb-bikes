import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import api from "../../../../services/api";
import { BikeProps } from "../../../../types";
import reverseico from "../img/reverseico.png";
import "./bikead.css";

export const Bikead = () => {
  const [bikes, setBikes] = useState<BikeProps[]>([]);

  const getBikes = async () => {
    try {
      const response = await api.get(`/bike`);
      const data = response.data;
  
      // Ordena os objetos com base na propriedade 'id'
      const bikesOrdenadas = [...data].sort((a: any, b: any) => a.id - b.id);

      setBikes(bikesOrdenadas);

    } catch (error) {
      console.log(error);
    } 
  };
  
  
  useEffect(() => {
    getBikes();
  }, []);

  const invertBikes = async () => {
    await getBikes();
    // Inverte a ordem dos objetos
    const bikesInvertidas = [...bikes].reverse();
    setBikes(bikesInvertidas);
  }

  return (
    <Row id="bikead-row">
      <button onClick={invertBikes} className="reverse-button">
            <img id="reverse-button" src={reverseico} alt="Filter Button" />
            Inverter a ordem
          </button>
      {bikes.length === 0 ? (
        <p>Não há bicicletas disponíveis</p>
      ) : (
        bikes?.map((bike) => (
          <div className="bikead" key={bike.id}>
            <div className="bikecontent">
              <div className="bikephoto">
                {bike.photos[0] ? (
                  <img
                    src={`${api}/photo/public/${bike.photos[0].filename}`}
                    alt="bike"
                    className="home-bike-photo"
                  />
                ) : (
                  <p>Foto não disponível</p>
                )}
              </div>
              <h3>{bike.name}</h3>
              <div className="descritivo">{bike.description} and {bike.id}</div>
              <div className="adjust-between">
                <h3>R$ {bike.hourlyvalue}</h3>
                <button id="details-button">Details</button>
              </div>
              <div className="adjust-between">
                <p>{bike.latitude + "," + bike.longitude}</p>
                <button>fav</button>
              </div>
            </div>
          </div>
        ))
      )}
    </Row>
  );
};

