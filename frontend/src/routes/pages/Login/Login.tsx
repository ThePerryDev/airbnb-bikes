import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/Authcontext";
import "./Login.css";
import { Card, Col, Container, Row } from "react-bootstrap";

export const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div id="mainy">
      <main id="principal">
        <Container className="d-flex align-items-start justify-content-center">
          <Row>
            <Col
              md={12}
              className="d-flex align-items-center justify-content-center"
            >
              <Card
                className="d-flex align-items-center justify-content-center"
                id="caixa"
              >
                <Card.Body>
                  <Card.Title>Login</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Faça seu Login com o Google
                  </Card.Subtitle>
                  <Card.Text>
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
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
    /*<div id="loginbox">

        <h1>Faça seu Login com o Google</h1>

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

    </div>*/
  );
};
