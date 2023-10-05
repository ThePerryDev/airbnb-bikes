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
            <Col onSubmit={save}>
              <Card.Text>Informações e contato</Card.Text>
                <Row id="meusAlugueis">
                  <Col md={6}>
                    <label>Nome</label>
                    {users.map((item) => (
                      <tr key={item.id}>
                        <td>{item.alias}</td>
                      </tr>
                    ))}
                    <label>Email</label>
                    {users.map((item) => (
                      <tr key={item.id}>
                        <td>{item.mail}</td>
                      </tr>
                    ))}
                  </Col>
                  <Col md={6}>
                    <label>Contato</label>
                    {users.map((item) => (
                      <tr key={item.id}>
                        <td>{item.phone}</td>
                      </tr>
                    ))}
                  </Col>
                </Row>
            </Col>
          </Row>

          <div>
            <Link to="/">Voltar</Link>
          </div>

          <Row id="meusAlugueis">
          <Card.Text>Meus alugueis</Card.Text>
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

          <Row id="meusAlugueis">
          <Card.Text>Meus Produtos</Card.Text>
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
