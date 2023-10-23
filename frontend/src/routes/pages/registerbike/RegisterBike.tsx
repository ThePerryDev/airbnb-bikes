import React, { useCallback, useEffect, useState } from "react";
import { BikeProps } from "../../../types";
import BikeService from "../../../services/BikeService";
import { Form, Link } from "react-router-dom";
import "./registerbike.css";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  InputGroup,
  Navbar,
  Row,
} from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function RegisterBike() {
  const [idUser, setIdUser] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [idBrand, setIdBrand] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [gender, setGender] = useState("");
  const [speedkit, setSpeedkit] = useState("");
  const [rim, setRim] = useState("");
  const [suspension, setSuspension] = useState(false);
  const [description, setDescription] = useState("");
  const [hourlyvalue, setHourlyvalue] = useState("");
  const [dailyvalue, setDailyvalue] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [bikes, setBikes] = useState([] as BikeProps[]);
  const fileTypes = ["JPEG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const handleChange = (file: React.SetStateAction<null>) => {
    setFile(file);
  };

  // Disparado ao carregar o componente
  useEffect(() => {
    (async () => {
      try {
        const bikeData = await BikeService.get();
        if (bikeData) {
          setBikes(bikeData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados das bicicletas:", error);
      }
    })();
  }, []);

  const load = async () => {
    const res: BikeProps[] = await BikeService.get();
    setBikes(res);
  };

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Converter os campos numéricos para inteiros ou floats
    const idUserInt = parseInt(idUser);
    const idCategoryInt = parseInt(idCategory);
    const idBrandInt = parseInt(idBrand);
    const speedkitInt = parseInt(speedkit);
    const rimInt = parseInt(rim);
    const sizeInt = parseInt(size);
    const hourlyvalueFloat = parseFloat(hourlyvalue);
    const dailyvalueFloat = parseFloat(dailyvalue);
    const latitudeFloat = parseFloat(latitude);
    const longitudeFloat = parseFloat(longitude);

    // Verificar se as conversões foram bem-sucedidas e se os campos obrigatórios foram preenchidos
    if (
      !isNaN(idUserInt) &&
      !isNaN(idCategoryInt) &&
      !isNaN(idBrandInt) &&
      !isNaN(sizeInt) &&
      !isNaN(speedkitInt) &&
      !isNaN(rimInt) &&
      !isNaN(hourlyvalueFloat) &&
      !isNaN(dailyvalueFloat) &&
      !isNaN(latitudeFloat) &&
      !isNaN(longitudeFloat) &&
      name.trim() !== "" &&
      color.trim() !== "" &&
      material.trim() !== "" &&
      gender.trim() !== "" &&
      typeof suspension === "boolean" &&
      description.trim() !== ""
    ) {
      const res = await BikeService.post({
        idUser: idUserInt,
        idCategory: idCategoryInt,
        idBrand: idBrandInt,
        name: name.trim(),
        color: color.trim(),
        size: sizeInt,
        material: material.trim(),
        gender: gender.trim(),
        speedkit: speedkitInt,
        rim: rimInt,
        suspension: suspension,
        description: description.trim(),
        hourlyvalue: hourlyvalueFloat,
        dailyvalue: dailyvalueFloat,
        latitude: latitudeFloat,
        longitude: longitudeFloat,
      });
      if (res.error) {
        alert(res.error);
      } else {
        load();
        reset();
      }
    }
  };

  const reset = () => {
    setIdUser("");
    setIdCategory("");
    setIdBrand("");
    setName("");
    setColor("");
    setSize("");
    setMaterial("");
    setGender("");
    setSpeedkit("");
    setRim("");
    setSuspension(false);
    setDescription("");
    setHourlyvalue("");
    setDailyvalue("");
    setLatitude("");
    setLongitude("");
  };

  const initMap = useCallback(() => {
    const map = L.map("map").setView([40.75, -73.98], 5);
    L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    // Adicione um marcador no mapa (opcional)
    L.marker([0, 0])
      .addTo(map)
      .bindPopup("Localização da bicicleta")
      .openPopup();
  }, []);
  useEffect(() => {
    // Chame a função de inicialização do mapa após a renderização do componente
    initMap();
  }, [initMap]);

  return (
    <div>
      <Header />
      <main>
        <Container fluid id="main">
          <Container id="second">
            <Col md={12}>
              <p id="paragrafoc">Cadastro de Bicicleta</p>
            </Col>
            <Col md={12} className="d-flex">
              <div id="fileuploader">
                <FileUploader
                  multiple={true}
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                />
              </div>
            </Col>
            <Col md={12}>
              <Row>
                <Col md={6}>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      MARCA
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      MATERIAL
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      CATEGORIA
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      GÊNERO
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      COR
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      TAMANHO
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      SUSPENSÃO
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      ARO
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      MARCHA
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col md={6}>
                  <Card id="mapCard">
                    <div
                      id="map"
                      style={{
                        width: "auto",
                        height: "100%",
                        borderRadius: "15px",
                      }}
                    ></div>
                  </Card>
                  <Row>
                    <Col md={6}>
                      <input
                        className="d-flex text-center"
                        type="number"
                        id="cep"
                        placeholder="CEP"
                      />
                    </Col>
                    <Col md={6}>
                      <input
                        className="d-flex text-center"
                        type="text"
                        id="estado"
                        placeholder="ESTADO"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <input
                        className="d-flex text-center"
                        type="text"
                        id="cidade"
                        placeholder="CIDADE"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <input
                        className="d-flex text-center"
                        type="text"
                        id="cep"
                        placeholder="BAIRRO"
                      />
                    </Col>
                    <Col md={6}>
                      <input
                        className="d-flex text-center"
                        type="number"
                        id="numero"
                        placeholder="NÚMERO"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <input
                        className="d-flex text-center"
                        type="number"
                        id="endereco"
                        placeholder="ENDEREÇO"
                      />
                    </Col>
                  </Row>
                </Col>

                <div className="d-flex justify-content-center">
                  <input
                    className="d-flex text-center"
                    type="text"
                    id="textbox"
                    placeholder="Insira aqui alguma recomendação ou instrução para o aluguel"
                  />
                </div>

                <Row>
                  <Col md={6} className="colvalor d-flex">
                    <input
                      className="d-flex text-center"
                      type="number"
                      id="cep"
                      placeholder="VALOR DA HORA"
                    />
                  </Col>
                  <Col md={6} className="colvalor d-flex">
                    <input
                      className="d-flex align-item-center text-center"
                      type="number"
                      id="numero"
                      placeholder="VALOR DA DIÁRIA"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="colvalor d-flex">
                    <Button
                      className="d-flex text-center"
                      id="botao"
                      placeholder="VALOR DA HORA"
                    >
                      SALVAR
                    </Button>
                  </Col>
                </Row>
              </Row>
            </Col>
          </Container>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default RegisterBike;
