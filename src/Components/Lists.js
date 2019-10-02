import React, { Component } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Icon } from "@material-ui/core";

import { withFirebase } from "./Firebase";

class Lists extends Component {
  state = { lists: "" };

  componentDidMount() {
    this.props.firebase.lists().on("value", snapshot => {
      this.setState({ lists: snapshot.val() });
      // this.props.setSelectedList({ id, value: snapshot.val()[0] });
    });
  }

  selectList = async id => {
    this.props.firebase.selectedList(id).on("value", snapshot => {
      const list = snapshot.val();
      this.props.setSelectedList({ id, value: list });

      let todos = {};
      if (list.todos) {
        Object.keys(list.todos).forEach(todo => {
          console.log(todo);
          this.props.firebase.selectTodo(todo).on("value", snapshot => {
            console.log(snapshot.val());
          });
        });
      }
    });

    // let todos = {};
  };

  addList = event => {
    event.preventDefault();
    const name = event.target.name.value;

    this.props.firebase.addList(name);
  };

  render() {
    const { lists } = this.state;
    return <ListsBase lists={lists} onClick={this.selectList} selectedList={this.props.selectedList} onSubmit={this.addList} />;
  }
}

const ListsBase = ({ lists, addList, onClick, selectedList, onSubmit }) => {
  return (
    <List>
      {Object.keys(lists).map(key => {
        const list = lists[key];
        const selected = key === selectedList.id;
        return <Item id={key} key={key} name={list.name} icon={list.icon} selected={selected} onClick={onClick} />;
      })}
      <ListItem>
        <ListItemIcon>
          <Icon>addbox</Icon>
        </ListItemIcon>
        <form autoComplete="on" onSubmit={onSubmit}>
          <TextField name="name" fullWidth={true} />
        </form>
      </ListItem>
      <Divider />
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
