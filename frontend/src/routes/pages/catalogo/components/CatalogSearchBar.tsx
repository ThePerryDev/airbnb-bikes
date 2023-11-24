import { Col, Row } from "react-bootstrap";
import "./CatalogSearchBar.css";

function CatalogSearchBar() {

  return (
    <Row>
      <Col>
        {/* <div className="adjust" id="searcbarmargin">
          <form action="" className="catalog-searchbar">
            <input type="text" placeholder="Filtrar..." />
            <button type="submit">
              <img src={lupa} alt="search icon" />
            </button>
          </form>

          <button onClick={invertBikes} className="reverse-button">
            <img id="reverse-button" src={reverseico} alt="Filter Button" />
            Inverter a ordem
          </button>
        </div> */}
      </Col>
    </Row>
  );
}

export default CatalogSearchBar;
