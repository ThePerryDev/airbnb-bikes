import { Link } from "react-router-dom";
import lupa from "./img/lupa.png"
import logo from "./img/logo.png"
import "./home.css";

function Home() {
  return (
    <div>
      <header>
        <button className="logo"><img src={logo} alt="logo" /></button>
        <form action="" className="searchbar">
          <input type="text" placeholder="Search..." />
          <button type="submit"><img src={lupa} alt="search icon" /></button>
        </form>
        <nav>
          <div>aaaa</div>
        </nav>
      </header>
      <main>
        <div>main</div>
        <div className="container">
          <div className="card">
            <div className="cardcontent">
              <div className="cardphoto">
                <img src="#" alt="bike_photo" />
              </div>
              <h3>título da bike</h3>
              <div className="descritivo">Aqui tem texto</div>
              <h3>R$00,00</h3>
              <button>Details</button>
              <p id="cidade">cidade</p>
              <button>fav</button>
            </div>
          </div>
          <div className="card">
            <div className="cardcontent">
              <div className="cardphoto">
                <img src="#" alt="bike_photo" />
              </div>
              <h3>título da bike</h3>
              <div className="descritivo">Aqui tem texto</div>
              <h3>R$00,00</h3>
              <button>Details</button>
              <p id="cidade">cidade</p>
              <button>fav</button>
            </div>
          </div>
          <div className="card">
            <div className="cardcontent">
              <div className="cardphoto">
                <img src="#" alt="bike_photo" />
              </div>
              <h3>título da bike</h3>
              <div className="descritivo">Aqui tem texto</div>
              <h3>R$00,00</h3>
              <button>Details</button>
              <p id="cidade">cidade</p>
              <button>fav</button>
            </div>
          </div>
          <div className="card">
            <div className="cardcontent">
              <div className="cardphoto">
                <img src="#" alt="bike_photo" />
              </div>
              <h3>título da bike</h3>
              <div className="descritivo">Aqui tem texto</div>
              <h3>R$00,00</h3>
              <button>Details</button>
              <p id="cidade">cidade</p>
              <button>fav</button>
            </div>
          </div>
          <div className="card">
            <div className="cardcontent">
              <div className="cardphoto">
                <img src="#" alt="bike_photo" />
              </div>
              <h3>título da bike</h3>
              <div className="descritivo">Aqui tem texto</div>
              <h3>R$00,00</h3>
              <button>Details</button>
              <p id="cidade">cidade</p>
              <button>fav</button>
            </div>
          </div>
        </div>
      </main>
      <Link to="/">Voltar</Link>
    </div>
  );
}

export default Home;
