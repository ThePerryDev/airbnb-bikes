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
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const handleMaterialChange = (selectedMaterialName: string) => {
    setSelectedMaterial(selectedMaterialName);
  };
  const [selectedGender, setSelectedGender] = useState("");
  const handleGenderChange = (selectedGenderName: string) => {
    setSelectedGender(selectedGenderName);
  };
  const [selectedColor, setSelectedColor] = useState("");
  const handleColorChange = (selectedColorName: string) => {
    setSelectedColor(selectedColorName);
  };
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const handleSizeChange = (selectedSizeName: number) => {
    setSelectedSize(selectedSizeName);
  };
  const [selectedSuspension, setSelectedSuspension] = useState<boolean>(false);
  const handleSuspensionChange = (selectedSuspensionName: boolean) => {
    setSelectedSuspension(selectedSuspensionName);
  };
  const [selectedRim, setSelectedRim] = useState<number>(0);
  const handleRimChange = (selectedRimName: number) => {
    setSelectedRim(selectedRimName);
  };
  const [selectedGearSet, setSelectedGearSet] = useState<number>(0);
  const handleGearSetChange = (selectedGearSetName: number) => {
    setSelectedGearSet(selectedGearSetName);
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
  const [files, setFiles] = useState<File[]>([]);
  const handleChange = (uploadedFiles: FileList | null) => {
    if (uploadedFiles) {
      // Use the callback function to ensure you get the updated state
      setFiles((prevFiles) => [...prevFiles, ...Array.from(uploadedFiles)]);
    }
    console.log(files);
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
    const speedkitInt = selectedGearSet;
    const rimInt = selectedRim;
    const sizeInt = selectedSize;
    const hourlyvalueFloat = parseFloat(hourlyvalue);
    const dailyvalueFloat = parseFloat(dailyvalue);
    const coordinates = await AddressToCoordinates(
      `${endereco?.logradouro}, ${numero}, ${endereco?.bairro}, ${endereco?.localidade}, ${endereco?.uf}`,
      API_KEY
    );
    const latitudeFloat = parseFloat(coordinates?.latitude);
    const longitudeFloat = parseFloat(coordinates?.longitude);
    const idUser: number = auth.user?.id || 0;
    const bike = {
      name: name.trim(),
      marca: selectedBrand,
      categoria: selectedCategory,
      speedkit: speedkitInt,
      rim: rimInt,
      size: sizeInt,
      hourlyvalue: hourlyvalueFloat,
      dailyvalue: dailyvalueFloat,
      idUser: idUser,
      latitude: latitudeFloat,
      longitude: longitudeFloat,
      color: selectedColor,
      material: selectedMaterial,
      gender: selectedGender,
      suspension: selectedSuspension,
      description: description.trim(),
    };
    console.log(bike);
    if (
      selectedBrand &&
      selectedCategory &&
      !isNaN(idUser) &&
      !isNaN(sizeInt) &&
      !isNaN(speedkitInt) &&
      !isNaN(rimInt) &&
      !isNaN(hourlyvalueFloat) &&
      !isNaN(dailyvalueFloat) &&
      !isNaN(latitudeFloat) &&
      !isNaN(longitudeFloat) &&
      name.trim() !== "" &&
      selectedColor &&
      selectedMaterial &&
      selectedGender &&
      typeof selectedSuspension === "boolean" &&
      description.trim() !== "" &&
      files.length >= 1
    ) {
      // Obter o ID da marca pelo nome
      const brandName = selectedBrand;
      try {
        const brandResponse = await fetch(
          `http://localhost:3001/brand/id/${brandName}`
        );
        const brandData = await brandResponse.json();
        console.log(brandData);
        if (brandData) {
          const brandId = brandData.id;
          // Obter o ID da categoria pelo nome
          const categoryName = selectedCategory;
          try {
            const categoryResponse = await fetch(
              `http://localhost:3001/category/id/${categoryName}`
            );
            const categoryData = await categoryResponse.json();
            console.log(categoryData);

            if (categoryData) {
              const categoryId = categoryData.id;

              // Enviar a solicitação para salvar os dados da bicicleta
              const res = await BikeService.post({
                idUser: idUser,
                idCategory: categoryId,
                idBrand: brandId,
                name: name.trim(),
                color: selectedColor,
                size: sizeInt,
                material: selectedMaterial,
                gender: selectedGender,
                speedkit: speedkitInt,
                rim: rimInt,
                suspension: selectedSuspension,
                description: description.trim(),
                hourlyvalue: hourlyvalueFloat,
                dailyvalue: dailyvalueFloat,
                latitude: latitudeFloat,
                longitude: longitudeFloat,
              });
              if (res.error) {
                alert(res.error);
              } else {
                // Bicicleta criada com sucesso, agora você pode chamar savePhotos
                const idbike = res.id; // Supondo que o ID da bicicleta seja retornado pela API

                try {
                  // Chamar savePhotos com o ID da bicicleta e os arquivos
                  const photoIds = await savePhotos(idbike, files);

                  // Aqui você pode fazer algo com os IDs das fotos, se necessário
                  console.log("IDs das fotos:", photoIds);
                } catch (error) {
                  console.error("Erro ao salvar fotos:", error);
                }
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

  const savePhotos = async (idbike: number, files: File[]) => {
    try {
      if (!files || files.length === 0) {
        throw new Error("No files provided");
      }

      const photoIds = [];

      // Iterar sobre cada arquivo e fazer uma solicitação POST separada para cada um
      for (const img of files) {
        const formData = new FormData();
        formData.append("idbike", idbike.toString());
        formData.append("file", img);

        const response = await axios.post(
          "http://localhost:3001/photo",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Adicionar o ID da foto à lista
        photoIds.push(response.data);
      }

      console.log("IDs das fotos:", photoIds);
      return photoIds;
    } catch (error) {
      console.error("Erro ao salvar fotos:", error);
      throw error;
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
        const coordinates = await AddressToCoordinates(fullAddress, API_KEY);
        if (coordinates) {
          // Atualizar os estados latitude e longitude
          setLatitude(coordinates.latitude);
          setLongitude(coordinates.longitude);
        }
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
    try {
      const response = await fromAddress(fullAddress);
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
      return { latitude: lat, longitude: lng };
    } catch (error) {
      console.error("Erro ao obter coordenadas:", error);
      return null;
    }
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
  const gearOptions = [1, 3, 7, 21, 24, 27, 30];

  const { handleSubmit } = useForm();

  const onSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <div>
      <main id="registerbike">
        <Container fluid id="main">
          <Container id="second">
            <Col md={12}>
              <p id="paragrafoc">Cadastro de Bicicleta</p>
            </Col>
            <Col md={12}>
              <input
                className="d-flex text-center"
                type="text"
                id="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Insira aqui o modelo da sua bicicleta"
              />
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
                          onClick={() => handleMaterialChange(material)}
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
                          onClick={() => handleGenderChange(gender)}
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
                          onClick={() => handleColorChange(color)}
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
                          onClick={() => handleSizeChange(size)}
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
                          onClick={() => handleSuspensionChange(option.value)}
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
                          onClick={() => handleRimChange(size)}
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
                          onClick={() => handleGearSetChange(option)}
                        >
                          {option} marchas
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
                      id="botao7"
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
