import React from "react";
import { Button, Icon } from "antd";
import { withFirebase } from "../Firebase";

class SignOutBase extends React.Component {
  onClickHandler = () => {
    this.props.firebase.auth.signOut();
  };

  render() {
    return (
      <Button shape="round" onClick={this.onClickHandler} icon="logout" size="large">
        Logout
      </Button>
    );
  }
}

const SignOut = withFirebase(SignOutBase);

export default SignOut;
