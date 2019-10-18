import React, { Component } from "react";
import { Layout, Icon, Menu, Avatar } from "antd";
import SearchForm from "./SearchForm";
import SignOut from "../Logout";
import { withAuthentication } from "../Authentication";

const { Header } = Layout;

export class HeaderMenu extends Component {
  state = { user: null };
  componentDidMount() {
    const { firebase, user } = this.props;

    firebase.db.ref(`/users/${user}`).on("value", async snapshot => {
      const user = snapshot.val();
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <Header className="header" style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Menu selectable={false} theme="dark" mode="horizontal" style={{ display: "flex", alignItems: "center", flex: 100 }}>
          <Menu.Item style={{ flex: 1 }}>
            <div className="logo" style={{ fontSize: "1.5em" }}>
              Todos
            </div>
          </Menu.Item>
          <Menu.Item style={{ flex: 3 }}>
            <SearchForm />
          </Menu.Item>
          <Menu.Item style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flex: 1 }}>
            <div>{user && <h4 style={{ color: "#fff" }}>{user.name}</h4>}</div>
            <div>{user && <Avatar shape="circle" src={user.avatar} icon="user" size="large" />}</div>
            <div>
              <SignOut />
            </div>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default withAuthentication(HeaderMenu);
