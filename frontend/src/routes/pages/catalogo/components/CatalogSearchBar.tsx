
import lupa from "../../components/img/lupa.png";
import filterbutton from "./img/Filter-button.png";
import "./CatalogSearchBar.css";

function CatalogSearchBar() {
    return (

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

    );
}

export default  CatalogSearchBar;
