import React, { useEffect, useState } from "react";
import { BikeProps, CategoriesProps, EnderecoProps } from "../../../types";
import BikeService from "../../../services/BikeService";
import "./registerbike.css";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Row,
  Form,
} from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useForm } from "react-hook-form";
import axios from "axios";

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
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [endereco, setEndereco] = useState<EnderecoProps | null>(null);
  const [category, setCategory] = useState<CategoriesProps[]>();
  useEffect(() => {
    fetch(`http://localhost:3001/category`)
      .then((rCategory) => rCategory.json())
      .then((rCategory) => {
        setCategory(rCategory);
        console.log("Informações da categoria:", rCategory); // Adicione esta linha
      })
      .catch((error) =>
        console.error("Erro ao buscar informações da bicicleta:", error)
      );
  }, []);

  // Disparado ao carregar o componente
  /* useEffect(() => {
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

    */

  //.catch((error) =>
  //console.error("Erro ao buscar informações da bicicleta:", error));

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

  //CEP

  const API_KEY = "AIzaSyDaUNxhWQrwGSlVnmpoAhY5nTgyRO4fwPI";
  const API_URL = "https://maps.googleapis.com/maps/api/geocode/json";

  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoNumero = e.target.value;
    setNumero(novoNumero);
  };

  const handleCEPChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoCEP = e.target.value;
    setCep(novoCEP);

    const novoCEP2= novoCEP.replace(/^[0-9]/g, "");

    if (novoCEP2.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${novoCEP}/json/`
        );

        if (response.data.erro) {
          console.error("CEP não encontrado");
          setEndereco(null);
          return;
        }

        const novoEndereco = {
          logradouro: response.data.logradouro,
          bairro: response.data.bairro,
          localidade: response.data.localidade,
          uf: response.data.uf,
          cep: response.data.cep,
          numero: numero,
        };

        // Atualizar o número no endereço
        novoEndereco.numero = numero;

        console.log("Endereço:", novoEndereco);
        setEndereco(novoEndereco);

        // Desativar os campos de endereço
        document.getElementById("estado")?.setAttribute("disabled", "true");
        document.getElementById("cidade")?.setAttribute("disabled", "true");
        document.getElementById("bairro")?.setAttribute("disabled", "true");
        document.getElementById("endereco")?.setAttribute("disabled", "true");

        // Chamar a função para obter coordenadas
        obterCoordenadas();
      } catch (error) {
        console.error("Erro na chamada à API:", error);
        setEndereco(null);
      }
    } else {
      setEndereco(null);

      // Ativar os campos de endereço
      document.getElementById("estado")?.removeAttribute("disabled");
      document.getElementById("cidade")?.removeAttribute("disabled");
      document.getElementById("bairro")?.removeAttribute("disabled");
      document.getElementById("endereco")?.removeAttribute("disabled");
    }
  };

  const obterCoordenadas = async () => {
    // Verifica se todos os campos de endereço foram preenchidos
    if (
      endereco &&
      endereco.uf &&
      endereco.localidade &&
      endereco.bairro &&
      endereco.logradouro &&
      document.getElementById("numero") instanceof HTMLInputElement
    ) {
      try {
        const enderecoCompleto = `${endereco.logradouro}, ${
          (document.getElementById("numero") as HTMLInputElement).value
        }, ${endereco.bairro}, ${endereco.localidade}, ${endereco.uf}`;
        const response = await axios.get(API_URL, {
          params: {
            address: enderecoCompleto,
            key: API_KEY,
          },
        });

        if (
          response.data &&
          response.data.results &&
          response.data.results.length > 0 &&
          response.data.results[0].geometry &&
          response.data.results[0].geometry.location
        ) {
          const coordenadas = response.data.results[0].geometry.location;
          setLatitude(coordenadas.lat);
          setLongitude(coordenadas.lng);
          console.log("Coordenadas obtidas:", coordenadas);
        } else {
          console.error("Coordenadas não encontradas");
        }
      } catch (error) {
        console.error("Erro ao obter coordenadas:", error);
      }
    }
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (e: any) => {
    console.log(e);
  };

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
                      {category?.map((category) => (
                        <Dropdown.Item key={category?.id}>
                          {category?.name}
                        </Dropdown.Item>
                      ))}
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
                  <Card id="mapCard"></Card>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col md={6}>
                        <input
                          className="d-flex text-center"
                          type="text"
                          value={cep}
                          id="cep"
                          placeholder="CEP"
                          onChange={handleCEPChange}
                        />
                      </Col>
                      <Col md={6}>
                        <input
                          className="d-flex text-center"
                          type="text"
                          value={endereco?.uf || ""}
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
                          value={endereco?.localidade || ""}
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
                          value={endereco?.bairro || ""}
                          id="cep"
                          placeholder="BAIRRO"
                        />
                      </Col>
                      <Col md={6}>
                        <input
                          className="d-flex text-center"
                          type="text"
                          id="numero"
                          value={numero}
                          placeholder="NÚMERO"
                          onChange={handleNumeroChange}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <input
                          className="d-flex text-center"
                          type="text"
                          value={endereco?.logradouro || ""}
                          id="endereco"
                          placeholder="ENDEREÇO"
                        />
                      </Col>
                    </Row>
                  </Form>
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
