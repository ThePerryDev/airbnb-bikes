import User from "../routes/pages/User/User";
import Bike from "../routes/pages/bikes/Bike";
import { Route, Routes } from "react-router-dom";
import Home from "../routes/home/Home";
import Catalog from "../routes/pages/catalogo/Catalog";
import RegisterBike from "../routes/pages/registerbike/RegisterBike";
import { Private } from "../routes/pages/private/Private";
import { RequireAuth } from "../routes/context/auth/RequireAuth";
import { Login } from "../routes/pages/Login/Login";

function App() {
  return (
    <Routes>
      <Route
        path="/user"
        element={
          <RequireAuth>
            <User />
          </RequireAuth>
        }
      />
      <Route
        path="/user/:id"
        element={
          <RequireAuth>
            <User />
          </RequireAuth>
        }
      />
      <Route path="/" element={<Home />} />
      <Route
        path="/registerbike"
        element={
          <RequireAuth>
            <RegisterBike />
          </RequireAuth>
        }
      />
      <Route
        path="/bike/:id"
        element={
          <RequireAuth>
            <Bike />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route
        path="/private"
        element={
          <RequireAuth>
            <Private />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
