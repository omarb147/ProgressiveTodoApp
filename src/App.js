import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Todos from "./Pages/Todos";

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Route path="/" exact component={Todos} />
      </BrowserRouter>
    </>
  );
}

export default App;
