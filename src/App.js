import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "antd/dist/antd.css";
import Styled from "styled-components";
import * as ROUTES from "./Constants/Routes";
import TodosPage from "./Pages/TodosPage";
import SignInPage from "./Pages/SignInPage";
import "./index.css";

const AppContainer = Styled.div`
height: 100vh;
`;

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Route path={ROUTES.HOME} exact component={TodosPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
