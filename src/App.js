import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import NavBar from "./Components/NavBar";
import Todos from "./Pages/Todos";
import "antd/dist/antd.css";

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <BrowserRouter>
        <Route path="/" component={Todos} />
      </BrowserRouter>
    </>
  );
}

export default App;
