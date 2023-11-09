import "./bikead.css";

export const Bikead = () => {
    return (
        <div className="bikead">
            <div className="bikecontent">
                <div className="bikephoto">
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
    );
}