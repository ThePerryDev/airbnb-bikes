import Brand from "./routes/pages/Brand";
import Category from "./routes/pages/Category";
import User from "./routes/pages/User";
import Bike from "./routes/pages/Bike";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Demo from "./routes/demo/Demo";
import Home from "./routes/home/Home";
import Login from "./routes/pages/login/Login";
import Context from "./Context";

//import { useContext } from "react";
//import { myContext } from "../Context";

function App() {
  //const userObject = useContext(myContext);
  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path="/user" element={<User />} />
          <Route path="/category" element={<Category />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/" element={<Demo />} />
          <Route path="/bike" element={<Bike />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;
