import { Link } from "react-router-dom";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import "./login.css";

function Login() {

  const googleLogin = () => {
    window.open("http://localhost:3000/auth/google", "_self");
  }

  return (
    <div>
      <header></header>
      <main id="principal">
        <Container id="fundo">
          <Container className="d-flex align-items-start justify-content-center" id="caixa">
            <Row>
              <Col md={12} className="d-flex align-items-center justify-content-center">
                <div>
                <Tabs
                  defaultActiveKey="entrar"
                  id="fill-tab-example"
                  className="d-flex align-items-start justify-content-center"
                  justify
                >
                <Tab eventKey="entrar" title="Entrar" id="aba">
                  <Row>
                  <Col md={12} className="d-flex align-items-center justify-content-center">
                    <Row>
                      <Col md={12}>
                        <div id="titulo">
                          <h1>Seja Bem Vindo</h1>
                        </div>
                        <div id="botoes">
                          <Button id="botao" size="lg">Continuar com Facebook</Button>
                        </div>
                        <div id="botoes">
                          <Button id="botao" size="lg" onClick={googleLogin}>Continuar com Google</Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  </Row>
                </Tab>
                <Tab eventKey="registrar" title="Registrar" id="aba">
                  <Row>
                  <Col md={12} className="d-flex align-items-center justify-content-center">
                    <Row>
                      <Col md={12}>
                        <div id="titulo">
                          <h1>Cadastre-se Aqui</h1>
                        </div>
                        <div id="botoes">
                          <Button id="botao">Continuar com Facebook</Button>
                        </div>
                        <div id="botoes">
                            <Button id="botao">Continuar com Google</Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  </Row>
                </Tab>
                </Tabs>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
        <Link to="/">Voltar</Link>
      </main>
    </div>
  );
}

export default Login;
