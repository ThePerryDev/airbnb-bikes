import { Row, Col, Container } from "react-bootstrap";
import "./Catalog.css";
import { Bikead } from "./components/Bikead";

function Catalog() {
  return (
      <Container id="catalog">
        <Row>
          <Col>
            {/* <CatalogSearchBar /> */}
            <Bikead />
          </Col>
        </Row>
      </Container>
  );
}

export default Catalog;
