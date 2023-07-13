import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CandyForm from "./components/CandyForm";
import CartButton from "./components/CartButton";
import CandyStock from "./components/CandyStock";

function App() {
  return (
    <>
      <CartButton />
      <CandyForm />
      <CandyStock />
    </>
  );
}

export default App;
