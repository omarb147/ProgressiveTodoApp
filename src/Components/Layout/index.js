import React from "react";
import { Layout, Icon } from "antd";
import SidebarList from "../SidebarList";
import HeaderMenu from "../Header";

const { Content, Header } = Layout;

const PageLayout = props => {
  return (
    <Layout style={{ height: "100vh" }}>
      <HeaderMenu />
      <Layout>
        <SidebarList />
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
