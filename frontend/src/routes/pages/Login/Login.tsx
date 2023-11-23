import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/Authcontext";
import "./Login.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import bike_parking from "./img/bike-parking.png";

export const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div id="mainy">
      <main id="principal">
        <Container className="d-flex align-items-center justify-content-center">
          <Row>
            <Card id="caixa">
              <Col md={12}>
                <Card.Body id="conteudo-caixa" className="d-flex align-items-center justify-content-center">
                  <Col md={6} className="img-col">
                    <img
                      src={bike_parking}
                      alt={bike_parking}
                      id="imglogin"
                      className="img-fluid"
                    />
                  </Col>
                  <Col md={6} className="text-col d-flex flex-column justify-content-center align-items-center">
                    <Card.Title id="titulo" className="mb-4 text-center">
                      Login
                    </Card.Title>
                    <Card.Subtitle id="subtitulo" className="mb-4 text-muted text-center">
                      Utilize o Google para <br/> Entrar ou se Registrar
                    </Card.Subtitle>
                    <Card.Text id="botao" className="text-center">
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          const token: any = credentialResponse.credential;
                          const decoded = jwtDecode<JwtPayload>(token);
                          let email = "" + decoded.email;
                          let alias = "" + decoded.name;
                          let jtiToken = "" + decoded.jti;
                          auth.signin(alias, email, jtiToken);
                          navigate("/");
                        }}
                        onError={() => {
                          console.log("login failed");
                        }}
                      />
                    </Card.Text>
                  </Col>
                </Card.Body>
              </Col>
            </Card>
          </Row>
        </Container>
      </main>
    </div>
  );
};
