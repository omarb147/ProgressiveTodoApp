import React from "react";
import { Button, Col, Row } from "antd";
import Styled from "styled-components";
import { withFirebase } from "../Components/Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../Constants/Routes";

const Container = Styled.div`
// background-color:red;
height:100%;
width:100%;
display:flex;
justify-content:center;
align-items: center;
`;

const SignInPannel = Styled.div`
background-color:lightgray
flex-basis:400px;
min-height: 400px;
padding:20px;
`;

const SignInPage = () => {
  return (
    <Container>
      <SignInPannel>
        <h3>Please Choose a method Below to sign in</h3>
        <SignIn />
      </SignInPannel>
    </Container>
  );
};

class signInBase extends React.Component {
  componentDidMount() {
    const { firebase, history } = this.props;
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem("user", user.uid);
        history.push(ROUTES.HOME);
      }
    });
  }

  render() {
    const { firebase } = this.props;

    return <Button onClick={firebase.onSignInWithGoogle}>Sign In With Google</Button>;
  }
}

const SignIn = compose(
  withFirebase,
  withRouter
)(signInBase);

export default SignInPage;
