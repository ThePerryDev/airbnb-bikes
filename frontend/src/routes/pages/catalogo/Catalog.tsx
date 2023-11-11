import { Row, Col, Container } from "react-bootstrap";
import "./Catalog.css";
import { Bikead } from "./components/Bikead";
import CatalogMap from "./components/CatalogMap";
import CatalogSearchBar from "./components/CatalogSearchBar";

function Catalog() {
  return (
      <Container id="catalog">
        <Row>
          <Col>
            <CatalogSearchBar />
            <Bikead />
          </Col>
          <Col>
            <CatalogMap />
          </Col>
        </Row>
      </Container>
  );
}

export default Catalog;
