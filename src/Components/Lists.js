import React, { Component } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { Icon } from "@material-ui/core";

import { withFirebase } from "./Firebase";

class Lists extends Component {
  state = { lists: "" };

  componentDidMount() {
    this.props.firebase.lists().on("value", snapshot => {
      this.setState({ lists: snapshot.val() });
    });
  }

  selectList = id => {
    this.props.setSelectedList(id);
  };

  render() {
    const { lists } = this.state;
    return <ListsBase lists={lists} onClick={this.selectList} selectedList={this.props.selectedList} />;
  }
}

const ListsBase = ({ lists, addList, onClick, selectedList }) => {
  return (
    <List>
      {Object.keys(lists).map(key => {
        const list = lists[key];
        const selected = key === selectedList;
        return <Item id={key} key={key} name={list.name} icon={list.icon} selected={selected} onClick={onClick} />;
      })}
    </List>
  );
};

const Item = ({ id, selected, onClick, name, icon }) => {
  return (
    <ListItem button selected={selected} onClick={e => onClick(id)}>
      <ListItemIcon>{icon ? <Icon>{icon}</Icon> : <Icon>list</Icon>}</ListItemIcon>
      <ListItemText>{name}</ListItemText>
    </ListItem>
  );
};

export default withFirebase(Lists);
