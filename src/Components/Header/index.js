import React, { Component } from "react";
import { Layout, Icon, Menu } from "antd";
import SearchForm from "./SearchForm";
import SignOut from "../Logout";

const { Header } = Layout;

export class HeaderMenu extends Component {
  render() {
    return (
      <Header className="header">
        <Menu selectable={false} theme="dark" mode="horizontal" style={{ display: "flex", alignItems: "flex-end" }}>
          <Menu.Item style={{ flex: 1 }}>
            <div className="logo" style={{ fontSize: "1.5em" }}>
              Todos
            </div>
          </Menu.Item>
          <Menu.Item style={{ flex: 4 }}>
            <SearchForm />
          </Menu.Item>
          <Menu.Item>
            <SignOut />
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default HeaderMenu;
