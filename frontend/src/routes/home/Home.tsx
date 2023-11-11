import "./home.css";
import { Container } from "react-bootstrap";
import HomeBikeAds from "./components/HomeBikeAds";
import HomeHeader from "./components/HomeHeader";

function Home() {
  return (
    <Container id="home">
      <HomeHeader />
      <HomeBikeAds />
    </Container>
  );
}

export default Home;
