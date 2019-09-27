import React, { Component } from "react";
import { List, ListItem, ListItemText, Divider, ListItemIcon } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";
import { FormControlLabel, Checkbox, TextField } from "@material-ui/core";
import { withFirebase } from "./Firebase";
import { makeStyles } from "@material-ui/core/styles";

export class TodoList extends Component {
  state = { todos: "" };

  async componentDidMount() {
    this.props.firebase.todos().on("value", snapshot => {
      this.setState({
        todos: snapshot.val()
      });
      console.log(this.state);
    });
  }

  //   async getItems() {
  //     const data = await base.fetch(`todos`, {
  //       context: this,
  //       asArray: true
  //     });
  //     this.setState({ todos: data });
  //   }

  addTodo = event => {
    event.preventDefault();
    const title = event.target.title.value;
    this.props.firebase.addTodo(title);
    event.target.title.value = "";
  };

  completeTodo = (event, id) => {
    const checked = event.target.checked;
    console.log(checked);
    this.props.firebase.editTodo(id, { completed: checked });
  };

  render() {
    const { firebase } = this.props;
    const { todos } = this.state;

    if (!todos) {
      return <h1>Loading </h1>;
    }

    return (
      <div>
        {console.log("loaded", todos)}
        <TodoListBase todos={this.state.todos} onSubmit={this.addTodo} onChange={this.completeTodo} />
      </div>
    );
  }
}

////////BASE

const useStyles = makeStyles(theme => ({
  textField: {
    height: "100%",
    borderBottom: "none",
    margin: "0px"
  }
}));

const TodoListBase = ({ todos, onSubmit, onChange }) => {
  const classes = useStyles();
  return (
    <List>
      {Object.keys(todos).map(key => {
        const todo = todos[key];
        return (
          <>
            <Todo key={key} id={key} title={todo.title} completed={todo.completed} onChange={onChange} />
            <Divider />
          </>
        );
      })}

      <ListItem>
        <ListItemIcon>
          <AddBox />
        </ListItemIcon>
        <form autoComplete="on" onSubmit={onSubmit}>
          <TextField className={classes.textField} name="title" fullWidth={true} />
        </form>
      </ListItem>
      <Divider />
    </List>
  );
};

const Todo = ({ id, title, completed, onChange }) => {
  return (
    <ListItem>
      <FormControlLabel control={<Checkbox checked={completed} onChange={e => onChange(e, id)} />} />
      <ListItemText>{title}</ListItemText>
    </ListItem>
  );
};

export default withFirebase(TodoList);
