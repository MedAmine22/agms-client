/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "./assets/theme/css/style.css";
import "./assets/theme/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);
window.onerror = function (message, source, lineno, colno, error) {
  if (process.env.NODE_ENV === "production") {
    // Ne rien faire ou envoyer à un service de logging
    return true; // Empêche l'affichage dans la console
  }
};

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
