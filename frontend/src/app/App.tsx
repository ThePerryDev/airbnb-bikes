import Brand from "../routes/pages/Brand";
import Category from "../routes/pages/Category";
import User from "../routes/pages/User/User";
import Bike from "../routes/pages/bikes/Bike";
import { Route, Routes } from "react-router-dom";
import Demo from "../routes/demo/Demo";
import Home from "../routes/home/Home";
import Catalog from "../routes/pages/catalogo/Catalog";
import RegisterBike from "../routes/pages/registerbike/RegisterBike";
import Login from "../routes/pages/login/Login";
import { Private } from "../routes/pages/Private";
import { RequireAuth } from "../routes/context/auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/user" element={<User />} />
      <Route path="/category" element={<Category />} />
      <Route path="/brand" element={<Brand />} />
      <Route path="/" element={<Demo />} />
      <Route path="/bike" element={<Bike />} />
      <Route path="/home" element={<Home />} />
      <Route path="/registerbike" element={<RegisterBike />} />
      <Route path="/avalovador" />
      <Route path="/avalocatorio" />
      <Route path="/bike/:id" element={<Bike />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/private" element={<RequireAuth><Private /></RequireAuth>} />
    </Routes>
  );
}

export default App;
