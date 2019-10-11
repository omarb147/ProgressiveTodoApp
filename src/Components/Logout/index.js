import React from "react";
import { Button } from "antd";
import { withFirebase } from "../Firebase";

class SignOutBase extends React.Component {
  onClickHandler = () => {
    this.props.firebase.auth.signOut();
  };

  render() {
    return <Button onClick={this.onClickHandler}>Logout</Button>;
  }
}

const SignOut = withFirebase(SignOutBase);

export default SignOut;
