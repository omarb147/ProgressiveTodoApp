import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../Constants/Routes";
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    state = { user: null };
    componentDidMount() {
      const { firebase, history } = this.props;
      firebase.auth.onAuthStateChanged(user => {
        if (user) {
          localStorage.setItem("user", user.uid);
          this.setState({ user: user.uid });
        } else {
          localStorage.removeItem("user");
          history.push(ROUTES.SIGN_IN);
        }
      });
    }

    render() {
      const { user } = this.state;
      return user ? <Component user={user} {...this.props} /> : null;
    }
  }
  return compose(
    withFirebase,
    withRouter
  )(WithAuthentication);
};

export default withAuthentication;
