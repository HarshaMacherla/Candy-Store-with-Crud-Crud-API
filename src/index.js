import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CandyContextWrapper } from "./candy-context/candy-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CandyContextWrapper>
    <App />
  </CandyContextWrapper>
);
