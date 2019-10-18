import React from "react";
import { Button, Col, Row, Card, Divider, Icon } from "antd";
import Styled from "styled-components";
import { withFirebase } from "../Components/Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../Constants/Routes";

const Container = Styled.div`
height:100%;
width:100%;
display:flex;
justify-content:center;
align-items: center;
background: #9053c7;
background: -webkit-linear-gradient(-135deg, #c850c0, #4158d0);
background: -o-linear-gradient(-135deg, #c850c0, #4158d0);
background: -moz-linear-gradient(-135deg, #c850c0, #4158d0);
background: linear-gradient(-135deg, #c850c0, #4158d0);
`;

const SignInPannel = Styled.div`

flex-basis:400px;
min-height: 400px;
padding:20px;
`;

const SignInPage = () => {
  return (
    <Container>
      <Card style={{ minHeight: "400px", flexBasis: "400px", textAlign: "center" }} bodyStyle={{ height: "100%" }}>
        <h1>
          <Icon type="edit" />
          Todos
        </h1>
        <Divider />
        <h3>Sign in using socials</h3>

        <SignIn />
        {/* <Divider type="vertical" style={{ minHeight: "300px" }} /> */}
      </Card>
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

    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Button size="large" shape="round" onClick={firebase.onSignInWithGoogle} icon="google-plus" className="btn-google" type="danger">
          Sign In With Google
        </Button>
        <Button size="large" shape="round" onClick={firebase.onSignInWithGoogle} disabled={true} className="btn-facebook" type="primary">
          <Icon type="facebook" theme="filled" />
          Sign In With Facebook
        </Button>
        <Button size="large" shape="round" icon="github" onClick={firebase.onSignInWithGoogle} disabled={true} className="btn-github">
          Sign In With Github
        </Button>
      </div>
    );
  }
}

const SignIn = compose(
  withFirebase,
  withRouter
)(signInBase);

export default SignInPage;
