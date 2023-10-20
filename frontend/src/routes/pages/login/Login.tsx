import { Link } from "react-router-dom";
import devicon_google from "./img/devicon_google.png";
import logos_facebook from "./img/logos_facebook.png";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import "./login.css";
//import axios from "axios";

function Login() {
  const googleLogin = () => {
    // Função para iniciar o processo de autenticação com o Google
    window.open("http://localhost:3000/auth/google", "_self");
    // Abre uma nova janela ou guia no navegador para a página de autenticação do Google
    // O segundo argumento "_self" especifica que a página atual será substituída pela página de autenticação
    // Essa é uma forma de iniciar o processo de autenticação com o Google
  };

  const facebookLogin = () => {
    // Função para iniciar o processo de autenticação com o Google
    window.open("http://localhost:3000/auth/facebook", "_self");
    // Abre uma nova janela ou guia no navegador para a página de autenticação do Google
    // O segundo argumento "_self" especifica que a página atual será substituída pela página de autenticação
    // Essa é uma forma de iniciar o processo de autenticação com o Google
  };

  /*const logout = () => {
    // Função para efetuar o logout do usuário
    axios.get("http://localhost:3000/auth/logout").then((res) => {
      if (res.data) {
        // Verifica se a resposta indica um logout bem-sucedido
        window.location.href = "/";
        // Redireciona o usuário de volta para a página inicial (por exemplo, a página de login)
      }
    });
  };*/

  return (
    <div>
      <header></header>
      <main id="principal">
        <Container id="fundo">
          <Container
            className="d-flex align-items-start justify-content-center"
            id="caixa"
          >
            <Row>
              <Col
                md={12}
                className="d-flex align-items-center justify-content-center"
              >
                <div>
                  <Tabs
                    defaultActiveKey="entrar"
                    id="fill-tab-example"
                    className="d-flex align-items-start justify-content-center"
                    justify
                  >
                    <Tab eventKey="entrar" title="Entrar" id="aba">
                      <Row>
                        <Col
                          md={12}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <Row>
                            <Col md={12}>
                              <div id="titulo">
                                <h1>Seja Bem Vindo</h1>
                              </div>
                              <div id="botoes">
                                <Button id="botao" size="lg" onClick={facebookLogin}>
                                  <div className="button-content">
                                    <img
                                      src={logos_facebook}
                                      alt="logos_facebook"
                                    />
                                    Continuar com Facebook
                                  </div>
                                </Button>
                              </div>
                              <div id="botoes">
                                <Button
                                  id="botao"
                                  size="lg"
                                  onClick={googleLogin}
                                >
                                  <div className="button-content">
                                    <img
                                      src={devicon_google}
                                      alt="devicon_google"
                                    />
                                    Continuar com Google
                                  </div>
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Tab>
                    <Tab eventKey="registrar" title="Registrar" id="aba">
                      <Row>
                        <Col
                          md={12}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <Row>
                            <Col md={12}>
                              <div id="titulo">
                                <h1>Cadastre-se Aqui</h1>
                              </div>
                              <div id="botoes">
                                <Button id="botao" size="lg" onClick={facebookLogin}>
                                  <div className="button-content">
                                    <img
                                      src={logos_facebook}
                                      alt="logos_facebook"
                                    />
                                    Continuar com Facebook
                                  </div>
                                </Button>
                              </div>
                              <div id="botoes">
                                <Button id="botao" onClick={googleLogin}>
                                  <div className="button-content">
                                    <img
                                      src={devicon_google}
                                      alt="devicon_google"
                                    />
                                    Continuar com Google
                                  </div>
                                </Button>
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

/*<Button onClick={logout}>Logout</Button>*/
