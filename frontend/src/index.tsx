import ReactDOM from "react-dom/client";
import App from "./app/App";
import React from "react";
import { AuthProvider } from "./routes/context/auth/Authprovider";
import { BrowserRouter } from "react-router-dom";
import Header from "./routes/components/Header";
import Footer from "./routes/components/Footer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
