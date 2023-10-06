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
        <Row>
          <Card.Text>Informações e contato</Card.Text>
          <Card>
            <Row>
              <Col md={4}>
                <Card.Img src={bicicletaTeste}></Card.Img>
              </Col>
              <Col md={8} id="aaaa" className="cardContainer">
                <Row>
                  <Col>
                    <Card id="CardInfos">
                      <Card.Text id="texto">INFORMAÇÕES</Card.Text>
                    </Card>
                  </Col>
                  <Col className="cardContainer">
                    <Card id="CardStatus">
                      <Card.Text>STATUS</Card.Text>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col className="cardContainer">
                    <Card id="CardDatas">
                      <Card.Text>DATA ALUGUEL <br /> DATA DE ENTREGA</Card.Text>
                    </Card>
                  </Col>

                  <Col>
                    <Card id="CardAvaliacao">
                      <Card.Text>AVALIAÇÃO</Card.Text>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Row>

        <div>
          <Link to="/">Voltar</Link>
        </div>

        <Card.Text>Meus Produtos</Card.Text>

        <Card id="meusAlugueis">
          <Row>
            <Col>
              <Card.Img src={bicicletaTeste}></Card.Img>
            </Col>
            <Col>
              <Row>
                <Card.Text>aaaa</Card.Text>
              </Row>
              <Row>
                <Card.Text>aaaa</Card.Text>
              </Row>
            </Col>
            <Col>
              <Row>
                <Card.Text>aaaa</Card.Text>
              </Row>
              <Row>
                <Card.Text>aaaa</Card.Text>
              </Row>
            </Col>
          </Row>
        </Card>

        <Card.Text>Meus Produtos</Card.Text>

        <Card id="meusAlugueis">
          <Row>
            <Col>
              <Card.Img src={bicicletaTeste}></Card.Img>
            </Col>
            <Col>
              <Row>
                <Card.Text>aaaa</Card.Text>
              </Row>
              <Row>
                <Card.Text>aaaa</Card.Text>
              </Row>
            </Col>
            <Col>
              <Row>
                <Card.Text>aaaa</Card.Text>
              </Row>
              <Row>
                <Card.Text>aaaa</Card.Text>
              </Row>
            </Col>
          </Row>
        </Card>

        <Row>
          <Col>
            <Card.Text>aaaa</Card.Text>
          </Col>
          <Col>
            <Card.Text>aaaa</Card.Text>
          </Col>
        </Row>
      </Container>
    </div >
  );
}

export default User;
