import ReactDOM from "react-dom/client";
import App from "./app/App";
import React from "react";
import { AuthProvider } from "./routes/context/auth/Authprovider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
