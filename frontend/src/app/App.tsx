import Brand from "../routes/pages/Brand";
import Category from "../routes/pages/Category";
import User from "../routes/pages/User";
import Bike from "../routes/pages/bikes/Bike";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Demo from "../routes/demo/Demo";
import Home from "../routes/home/Home";
import Catalog from "../routes/pages/catalogo/Catalog";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/category" element={<Category />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/" element={<Demo />} />
        <Route path="/bike" element={<Bike />} />
        <Route path="/bike/:id" element={<Bike />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;