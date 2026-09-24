import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { BASE } from "./lib/base";
import { AuthProvider } from "./lib/auth";
import "./styles/site.css";
import "./styles/app.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={BASE || "/"}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
