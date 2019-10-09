import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { List, Form, Checkbox } from "antd";
import AddTodoForm from "./AddTodoForm";

export class TodoList extends Component {
  state = { loading: null, error: null };
  //TODO

  //1. SET UP BASE LIST - DONE
  //2. GET DATA FROM FIREBASE INTO LIST
  //3. FORM FOR ADDING DATA INTO LIST

  componentDidMount() {
    this.setTodosListner();
  }

  setTodosListner = async () => {
    const { firebase, todoList } = this.props;

    this.setState({ loading: true });

    const listLength = todoList.todos ? Object.keys(todoList.todos).length : 0;
    const todos = [];
    if (listLength > 0) {
      // await Promise.all(
      //   Object.keys(todoList.todos).map(async key => {
      //     await firebase.selectTodo(key).on("value", snapshot => {
      //       const todo = { key, ...snapshot.val() };
      //       todos.push(todo);
      //     });
      //   })
      // );
      // for (let key in todoList.todos) {
      //   console.log("key", key);
      //   await firebase.selectTodo(key).on("value", snapshot => {
      //     const todo = { key, ...snapshot.val() };
      //     todos.push(todo);
      //   });
      // }
      // console.log("updated");
      // console.log("todos");
      // this.setState({ todos, loading: false });

      //DONT LIKE THIS CODE!!!
      await Object.keys(todoList.todos).forEach(async (key, index) => {
        await firebase.selectTodo(key).on("value", snapshot => {
          const todo = { key, ...snapshot.val() };
          todos.push(todo);
          if (index == listLength - 1) {
            this.setState({ todos, loading: false });
            console.log("done");
          }
        });
      });
    } else {
      this.setState({ todos, loading: false });
    }
  };

  async componentWillUnmount() {
    const { firebase, todoList } = this.props;
    const listLength = todoList.todos ? Object.keys(todoList.todos).length : 0;
    if (listLength > 0) {
      for (let key in todoList.todos) {
        await firebase.selectTodo(key).off();
      }
      console.log("unset listners");
    }
  }

  checkBoxHandler = e => {
    console.log(e.target);
  };

  render() {
    const { todos, loading } = this.state;
    const { todoList } = this.props;

    return (
      <>
        <h1>{todoList ? todoList.name : ""}</h1>
        <List
          itemLayout="horizontal"
          dataSource={todos}
          loading={loading}
          renderItem={todo => (
            <List.Item key={todo.key}>
              <List.Item.Meta
                title={todo.title}
                avatar={<Checkbox onChange={this.checkBoxHandler} checked={todo.complete} />}
              ></List.Item.Meta>
            </List.Item>
          )}
        >
          {todoList.key && (
            <List.Item>
              <AddTodoForm addTodo={this.props.firebase.addTodo.bind(null, todoList.key)} />
            </List.Item>
          )}
        </List>
      </>
    );
  }
}

export default withFirebase(TodoList);
