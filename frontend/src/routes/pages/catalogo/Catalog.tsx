import lupa from "../../components/img/lupa.png";
import mapao from "./img/mapao.png";
import filterbutton from "./img/Filter-button.png";
import { Row, Col, Container } from "react-bootstrap";
import Header from "../../components/Header";
import "./Catalog.css";
import Footer from "../../components/Footer";
import { Bikead } from "./components/Bikead";

function Catalog() {
  return (
    <div>
      <Header />
      <main>
        <Container>
          <Row>
            <Col>
              <Row>
                <Col>
                  <div className="adjust" id="searcbarmargin">
                    <form action="" className="catalog-searchbar">
                      <input type="text" placeholder="Search..." />
                      <button type="submit">
                        <img src={lupa} alt="search icon" />
                      </button>
                    </form>

                    <button className="filter-button">
                      <img src={filterbutton} alt="Filter Button" />
                    </button>
                  </div>
                </Col>
              </Row>
              <Row id="bikeadline">
                <Bikead />
                <Bikead />
                <Bikead />
                <Bikead />
              </Row>
            </Col>
            <Col>
              <img src={mapao} alt="mapa grande" id="mapao" />
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default Catalog;
