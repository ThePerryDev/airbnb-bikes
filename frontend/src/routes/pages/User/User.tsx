import { useEffect, useState } from "react";
import { UsersProps } from "../../../types";
import UsersService from "../../../services/UsersService";
import { Link } from "react-router-dom";
import "./user.css";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import bicicletaTeste from "./images/bicicleta.png"

function User() {
  const [alias, setAlias] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [users, setUsers] = useState([] as UsersProps[]);

  // Disparado ao carregar o componente
  useEffect(() => {
    (async () => {
      try {
        const userData = await UsersService.get();
        if (userData) {
          setUsers(userData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados dos usuários:", error);
      }
    })();
  }, []);

  const load = async () => {
    const res: UsersProps[] = await UsersService.get();
    setUsers(res);
  };

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Converter os campos numéricos para inteiros ou floats


    // Verificar se as conversões foram bem-sucedidas e se os campos obrigatórios foram preenchidos
    if (
      alias.trim() !== "" &&
      mail.trim() !== "" &&
      phone.trim() !== ""
    ) {
      const res = await UsersService.post({
        alias: alias.trim(),
        mail: mail.trim(),
        phone: phone.trim()
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
    setAlias("");
    setMail("");
    setPhone("");
  };

  const items = [
    {
      src: require("./images/bicicleta2.png"),
      alt: "Imagem bicicleta",
    },
    {
      src: require("./images/bicicleta2.png"),
      alt: "Imagem bicicleta",
    },
    {
      src: require("./images/bicicleta2.png"),
      alt: "Imagem bicicleta",
    },
  ];

  return (
    <div id="body">
      <Container>
        <Row id="RowProdutos">
          <Card.Text>Informações e contato</Card.Text>
          <div id="rowInfos">
            <Row>
              <Col md={6}>
                <Card.Text id="textoUsuario">Nome do usuário:</Card.Text>
                <Card.Text id="textoUsuario1">Email:</Card.Text>
              </Col>
              <Col md={6}>
                <Card.Text id="textoUsuario">Contato:</Card.Text>
              </Col>
            </Row>
          </div>
        </Row>

        <Row id="RowProdutos">
          <Card.Text>Meus Alugueis:</Card.Text>
        </Row>

        <Carousel data-bs-theme="dark" className="carrossel">
          {items.map((item) => (
            <Carousel.Item key={item.src}>
              <Row>
                <Col md={4} id="colBike">
                  <div id="cardBike">
                    <Row><img src={item.src} alt={item.alt} id="imgBike" /></Row>
                    <Row><Card.Text>Nome da Bike</Card.Text></Row>
                    <Row>
                      <Card id="cardInfoBike">
                        <Card.Text>Informações da bike</Card.Text>
                      </Card>
                    </Row>
                    <Row>
                      <Col>
                        <Row>
                          <Card.Text>R$80.00/</Card.Text>
                        </Row>
                        <Row>
                          <Card.Text>aaaa</Card.Text>
                        </Row>
                      </Col>
                      <Col>
                        <Button>Detalhes</Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col md={8}>
                  <Row>
                    <Col>
                      <div id="cardInfos">
                        <Card.Text className="text">INFORMAÇÕES</Card.Text>
                      </div>
                    </Col>
                    <Col>
                      <div id="cardStatus">
                        <Card.Text className="text">STATUS</Card.Text>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div id="cardDatas">
                        <Card.Text className="text">DATA ALUGUEL <br /> DATA DE ENTREGA</Card.Text>
                      </div>
                    </Col>
                    <Col>
                      <div id="cardAva">
                        <Card.Text className="text">AVALIAÇÃO</Card.Text>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>

        <Row id="RowProdutos">
          <Card.Text>Meus Produtos:</Card.Text>
        </Row>

        <Carousel data-bs-theme="dark" className="carrossel">
          {items.map((item) => (
            <Carousel.Item key={item.src}>
              <Row>
                <Col md={4} id="colBike">
                  <div id="cardBike">
                    <Row><img src={item.src} alt={item.alt} id="imgBike" /></Row>
                    <Row><Card.Text>Nome da Bike</Card.Text></Row>
                    <Row>
                      <Card id="cardInfoBike">
                        <Card.Text>Informações da bike</Card.Text>
                      </Card>
                    </Row>
                    <Row>
                      <Col>
                        <Row>
                          <Card.Text>R$80.00/</Card.Text>
                        </Row>
                        <Row>
                          <Card.Text>aaaa</Card.Text>
                        </Row>
                      </Col>
                      <Col>
                        <Button>Detalhes</Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col md={8}>
                  <Row>
                    <Col>
                      <div id="cardInfos">
                        <Card.Text className="text">INFORMAÇÕES</Card.Text>
                      </div>
                    </Col>
                    <Col>
                      <div id="cardStatus">
                        <Card.Text className="text">STATUS</Card.Text>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div id="cardDatas">
                        <Card.Text className="text">DATA ALUGUEL <br /> DATA DE ENTREGA</Card.Text>
                      </div>
                    </Col>
                    <Col>
                      <div id="cardAva">
                        <Card.Text className="text">AVALIAÇÃO</Card.Text>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>


        <Container fluid>
          <Container id="centerContainer">
            <Row>
              <span>
                <Link to="/regiterbike">
                  <Button id="button">CADASTRAR BICICLETAS</Button>
                </Link>
                <Link to="/avalovador">
                  <Button id="button">AVALIAÇÕES DO LOCADOR</Button>
                </Link>
                <Link to="/avalocatorio">
                  <Button id="button">AVALIAÇÕES DO LOCATÓRIO</Button>
                </Link>
              </span>
            </Row>
          </Container>
        </Container>



        <div>
          <Link to="/">Voltar</Link>
        </div>

      </Container>
    </div >
  );
}

export default User;
