import React, { useContext, useEffect, useState } from "react";
import { CategoriesProps, EnderecoProps, BrandProps } from "../../../types";
import BikeService from "../../../services/BikeService";
import "./registerbike.css";
import { Button, Col, Container, Dropdown, Row, Form } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { useForm } from "react-hook-form";
import axios from "axios";
import { fromAddress } from "react-geocode";
import { setDefaults } from "../../components/mapas";
import { AuthContext } from "../../context/auth/Authcontext";

function RegisterBike() {
  const auth = useContext(AuthContext);
  const [idUser, setIdUser] = useState<number | null>(null);
  const [idCategory, setIdCategory] = useState("");
  const [idBrand, setIdBrand] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const handleBrandChange = (selectedBrandName: string) => {
    setSelectedBrand(selectedBrandName);
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryChange = (selectedCategoryName: string) => {
    setSelectedCategory(selectedCategoryName);
  };
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
  //  const [bikes, setBikes] = useState([] as BikeProps[]);
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
      })
      .catch((error) =>
        console.error("Erro ao buscar informações da bicicleta:", error)
      );
  }, []);
  const [brand, setBrand] = useState<BrandProps[]>();
  useEffect(() => {
    fetch(`http://localhost:3001/brand`)
      .then((rBrand) => rBrand.json())
      .then((rBrand) => {
        setBrand(rBrand);
      })
      .catch((error) =>
        console.error("Erro ao buscar informações da bicicleta:", error)
      );
  }, []);

  const save = async () => {
    const selectedBrand1 = selectedBrand;
    const selectedCategory1 = selectedCategory;
    const speedkitInt = parseInt(speedkit);
    const rimInt = parseInt(rim);
    const sizeInt = parseInt(size);
    const hourlyvalueFloat = parseFloat(hourlyvalue);
    const dailyvalueFloat = parseFloat(dailyvalue);
    const latitudeFloat = parseFloat(latitude);
    const longitudeFloat = parseFloat(longitude);
    const idUser: number = auth.user?.id || 0;
    if (
      selectedBrand1 &&
      selectedCategory1 &&
      !isNaN(idUser) &&
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
      // Obter o ID da marca pelo nome
      const brandName = selectedBrand1;
      try {
        const brandResponse = await fetch(
          `http://localhost:3001/brand/name/${brandName}`
        );
        const brandData = await brandResponse.json();
        console.log(brandData);

        if (brandData.length > 0) {
          const brandId = brandData[0].id;

          // Obter o ID da categoria pelo nome
          const categoryName = selectedCategory1;
          try {
            const categoryResponse = await fetch(
              `http://localhost:3001/category/name/${categoryName}`
            );
            const categoryData = await categoryResponse.json();
            console.log(categoryData);

            if (categoryData.length > 0) {
              const categoryId = categoryData[0].id;

              // Enviar a solicitação para salvar os dados da bicicleta
              const res = await BikeService.post({
                idUser: idUser,
                idCategory: categoryId,
                idBrand: brandId,
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
              }
            }
          } catch (error) {
            console.error("Erro ao buscar informações da categoria:", error);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar informações da marca:", error);
      }
    }
  };

  //CEP

  const API_KEY = "AIzaSyDaUNxhWQrwGSlVnmpoAhY5nTgyRO4fwPI";

  const handleCEPChange = async () => {
    if (cep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
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

        const fullAddress = `${novoEndereco.logradouro}, ${novoEndereco.numero}, ${novoEndereco.bairro}, ${novoEndereco.localidade}, ${novoEndereco.uf}`;
        console.log("Endereço:", fullAddress);
        setEndereco(novoEndereco);

        // Desativar os campos de endereço
        document.getElementById("estado")?.setAttribute("disabled", "true");
        document.getElementById("cidade")?.setAttribute("disabled", "true");
        document.getElementById("bairro")?.setAttribute("disabled", "true");
        document.getElementById("endereco")?.setAttribute("disabled", "true");

        // Chamar a função para obter coordenadas
        AddressToCoordinates(fullAddress, API_KEY);
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

  setDefaults({
    key: "AIzaSyDaUNxhWQrwGSlVnmpoAhY5nTgyRO4fwPI",
    language: "pt-br",
    region: "br",
  });

  const AddressToCoordinates = async (fullAddress: string, key: string) => {
    fromAddress(fullAddress)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        console.log(lat, lng);
      })
      .catch(console.error);
  };

  const colors = ["Vermelho", "Azul", "Verde", "Amarelo", "Preto", "Branco"];
  const genders = ["Feminino", "Masculino", "Unissex"];
  const materials = [
    "Alumínio",
    "Fibra de Carbono",
    "Ferro",
    "Aço",
    "Titânio",
    "Cromo-molibdênio",
    "Alumínio e Carbono",
  ];
  const sizes = [18, 20, 22, 24, 26, 27.5, 29];
  const suspensionOptions = [
    { value: true, label: "Possui suspensão" },
    { value: false, label: "Não possui suspensão" },
  ];
  const wheelSizes = [12, 16, 20, 24, 26, 27.5, 29];
  const gearOptions = [
    "1 marcha",
    "3 marchas",
    "7 marchas",
    "21 marchas",
    "24 marchas",
    "27 marchas",
    "30 marchas",
  ];

  const { handleSubmit } = useForm();

  const onSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <div>
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
                  <Dropdown id="brandDropdown">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      MARCA
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {brand?.map((brand) => (
                        <Dropdown.Item
                          key={brand?.id}
                          onClick={() => handleBrandChange(brand?.name)}
                        >
                          {brand?.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      MATERIAL
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {materials.map((material, index) => (
                        <Dropdown.Item
                          key={index}
                          href={`#/action-${index + 1}`}
                        >
                          {material}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown id="categoryDropdown">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      CATEGORIA
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {category?.map((category) => (
                        <Dropdown.Item
                          key={category?.id}
                          onClick={() => handleCategoryChange(category?.name)}
                        >
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
                      {genders.map((gender, index) => (
                        <Dropdown.Item
                          key={index}
                          href={`#/action-${index + 1}`}
                        >
                          {gender}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      COR
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {colors.map((color, index) => (
                        <Dropdown.Item
                          key={index}
                          href={`#/action-${index + 1}`}
                        >
                          {color}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      TAMANHO
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {sizes.map((size, index) => (
                        <Dropdown.Item
                          key={index}
                          href={`#/action-${index + 1}`}
                        >
                          {size} polegadas
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      SUSPENSÃO
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {suspensionOptions.map((option, index) => (
                        <Dropdown.Item
                          key={index}
                          href={`#/action-${index + 1}`}
                        >
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      ARO
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {wheelSizes.map((size, index) => (
                        <Dropdown.Item
                          key={index}
                          href={`#/action-${index + 1}`}
                        >
                          {size} polegadas
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      MARCHA
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {gearOptions.map((option, index) => (
                        <Dropdown.Item
                          key={index}
                          href={`#/action-${index + 1}`}
                        >
                          {option}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col md={6}>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col md={6}>
                        <input
                          className="d-flex text-center"
                          type="text"
                          value={cep}
                          id="cep"
                          placeholder="CEP"
                          onChange={(e) => setCep(e.target.value)}
                        />
                      </Col>
                      <Col md={6}>
                        <input
                          className="d-flex text-center"
                          type="text"
                          value={endereco?.uf || ""}
                          id="estado"
                          placeholder="ESTADO"
                          readOnly
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
                          readOnly
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
                          readOnly
                        />
                      </Col>
                      <Col md={6}>
                        <input
                          className="d-flex text-center"
                          type="text"
                          id="numero"
                          value={numero}
                          onChange={(e) => setNumero(e.target.value)}
                          placeholder="NÚMERO"
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
                          readOnly
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <button id="endereco1" onClick={handleCEPChange}>
                          ENCONTRAR ENDEREÇO
                        </button>
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <Row>
                  <Col md={6} className="colvalor d-flex">
                    <input
                      className="d-flex text-center"
                      type="number"
                      id="cep"
                      placeholder="VALOR DA HORA"
                      value={hourlyvalue}
                      onChange={(e) => setHourlyvalue(e.target.value)}
                    />
                  </Col>
                  <Col md={6} className="colvalor d-flex">
                    <input
                      className="d-flex align-item-center text-center"
                      type="number"
                      id="numero"
                      placeholder="VALOR DA DIÁRIA"
                      value={dailyvalue}
                      onChange={(e) => setDailyvalue(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="colvalor d-flex">
                    <Button
                      className="d-flex text-center"
                      id="botao"
                      onClick={save}
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
    </div>
  );
}

export default RegisterBike;
