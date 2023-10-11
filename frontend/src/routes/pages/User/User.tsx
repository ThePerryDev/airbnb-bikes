import { useEffect, useState } from "react";
import { UsersProps } from "../../../types";
import UsersService from "../../../services/UsersService";
import { Link } from "react-router-dom";
import "./user.css";
import { Card, Col, Container, Row } from "react-bootstrap";
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
          <Card.Text>Meus Produtos</Card.Text>
        </Row>

        <Row id="rowInfos">
          <Col md={4}>
            <Card id="imgBike">
              <Card.Img src={bicicletaTeste} />
            </Card>
          </Col>

          <Col md={4} id="colInfos">
            <Row>
              <div id="cardInfos">
                <Card.Text id="texto">INFORMAÇÕES</Card.Text>
              </div>
            </Row>
            <Row>
              <div id="cardInfos">
                <Card.Text>DATA ALUGUEL <br /> DATA DE ENTREGA</Card.Text>
              </div>
            </Row>
          </Col>

          <Col md={4} id="colInfos">
            <Row>
              <div id="cardInfos">
                <Card.Text>STATUS</Card.Text>
              </div>
            </Row>
            <Row>
              <div id="cardInfos">
                <Card.Text id="texto">AVALIAÇÕES</Card.Text>
              </div>
            </Row>
          </Col>
        </Row>

        <Row id="RowProdutos">
          <Card.Text>Meus Produtos</Card.Text>
        </Row>

        <Row id="rowInfos">
          <Col md={4}>
            <Card id="imgBike">
              <Card.Img src={bicicletaTeste} />
            </Card>
          </Col>

          <Col md={4} id="colInfos">
            <Row>
              <div id="cardInfos">
                <Card.Text id="texto">INFORMAÇÕES</Card.Text>
              </div>
            </Row>
            <Row>
              <div id="cardInfos">
                <Card.Text>DATA ALUGUEL <br /> DATA DE ENTREGA</Card.Text>
              </div>
            </Row>
          </Col>

          <Col md={4} id="colInfos">
            <Row>
              <div id="cardInfos">
                <Card.Text>STATUS</Card.Text>
              </div>
            </Row>
            <Row>
              <div id="cardInfos">
                <Card.Text id="texto">AVALIAÇÕES</Card.Text>
              </div>
            </Row>
          </Col>
        </Row>

        <div>
          <Link to="/">Voltar</Link>
        </div>

      </Container>
    </div >
  );
}

export default User;
