import { Link } from "react-router-dom";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import "./login.css";

function Login() {
  return (
    <div id="body">
      <header></header>
      <main>
        <Container fluid id="fundo">
          <Col
            className="d-flex align-items-center justify-content-center"

          >
            <Tabs
              defaultActiveKey="profile"
              id="fill-tab-example"
              className="d-flex align-items-center justify-content-center"
            >
              <Tab eventKey="entrar" title="Entrar" id="aba">
                <Row id="linha">
                  <Col md={12} className="d-flex align-items-center justify-content-center">
                    <div>
                      <Button id="botao">Continuar com Facebook</Button>
                    </div>
                    <div>
                      <Button id="botao">Continuar com Facebook</Button>
                    </div>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="registrar" title="Registrar" id="aba">
              <Row id="linha">
                  <Col md={12} className="d-flex align-items-center justify-content-center">
                    <div>
                      <Button id="botao">Continuar com Facebook</Button>
                    </div>
                    <div>
                      <Button id="botao">Continuar com Facebook</Button>
                    </div>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Col>
        </Container>
      </main>
      <Link to="/">Voltar</Link>
    </div>
  );
}

export default Login;
