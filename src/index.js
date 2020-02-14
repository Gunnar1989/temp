import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.scss";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/use-auth";

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
