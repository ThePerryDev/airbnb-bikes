import ReactDOM from "react-dom/client";
import App from "./app/App";
import React from "react";
import { AuthProvider } from "./routes/context/auth/Authprovider";
import { BrowserRouter } from "react-router-dom";
import Header from "./routes/components/Header";
import Footer from "./routes/components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider clientId="696482695372-ko2n7vnkebs0hr9gdujukmdh7ubpr758.apps.googleusercontent.com">
        <BrowserRouter>
          <Header />
          <App />
          <Footer />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
