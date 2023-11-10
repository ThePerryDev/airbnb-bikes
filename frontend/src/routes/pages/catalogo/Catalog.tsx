import { Row, Col, Container } from "react-bootstrap";
import "./Catalog.css";
import { Bikead } from "./components/Bikead";
import CatalogSearchBar from "./components/CatalogSearchBar";

function Catalog() {
  return (
    <main id="catalog">
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <CatalogSearchBar />
              </Col>
            </Row>
            <Row id="bikead-row">
              <Bikead />
            </Row>
          </Col>
          <Col>
            <div id="mapao" >
              <img src="" alt="mapa grande"/>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Catalog;
