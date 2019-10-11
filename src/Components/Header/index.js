import React, { Component } from "react";
import { Layout, Icon, Menu } from "antd";
import SearchForm from "./SearchForm";
import SignOut from "../Logout";

const { Header } = Layout;

export class HeaderMenu extends Component {
  render() {
    return (
      <Header className="header">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} style={{ lineHeight: "64px" }}>
          <Menu.Item>
            <div className="logo">Todos</div>
          </Menu.Item>
          <Menu.Item>
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
