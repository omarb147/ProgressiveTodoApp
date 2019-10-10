import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Layout, Menu, Icon } from "antd";
import AddListForm from "./AddListForm";
import { connect } from "react-redux";
import { compose } from "recompose";
import { selectList } from "../../Utils/actions";

const { Sider } = Layout;

class SidebarListBase extends Component {
  state = { lists: null, error: null, loading: null };

  //TODO
  //1. Connnect todolists from firebase DONE
  //2. Add list to DB DONE
  //3. Handle list selection DONE
  //3. Delete List from DB - WILL DO

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.lists().on("value", snapshot => {
      const listsObj = snapshot.val();
      if (listsObj) {
        const listsArray = Object.keys(listsObj).map(key => {
          const { icon, name, user } = listsObj[key];
          return { key, icon, name, user };
        });

        this.setState({ lists: listsArray, loading: false, error: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.lists().off();
  }

  itemSelectHandler = data => {};

  render() {
    const { lists, loading, error } = this.state;

    return (
      <Sider
        width={300}
        style={{ background: "#fff" }}
        // breakpoint="lg"
        // collapsedWidth="0"
        // onBreakpoint={broken => {
        //   console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
      >
        <div className="logo" />

        <Menu mode="inline" onSelect={({ key }) => this.props.selectList(key)}>
          {lists &&
            lists.map(list => {
              return (
                <Menu.Item key={list.key}>
                  <Icon type={list.icon || "unordered-list"}></Icon>
                  {list.name}
                </Menu.Item>
              );
            })}
          <Menu.Item disabled={true}>
            <AddListForm addList={name => this.props.firebase.addList(name)} />
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

const SidebarList = compose(
  connect(
    null,
    { selectList }
  ),
  withFirebase
)(SidebarListBase);

export default SidebarList;
