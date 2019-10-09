import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { connect } from "react-redux";
import { List, Form, Checkbox, Icon, PageHeader } from "antd";
import AddTodoForm from "./AddTodoForm";
import { selectList } from "../../Utils/actions";
import { Button } from "antd/lib/radio";

const INITIAL_STATE = { loading: false, error: null, todoList: {}, todos: [] };

export class TodoListBase extends Component {
  state = { ...INITIAL_STATE };
  //TODO

  //1. SET UP BASE LIST - DONE
  //2. GET DATA FROM FIREBASE INTO LIST - DONE
  //3. FORM FOR ADDING DATA INTO LIST - DONE
  //4. DELETE TODO FROM LIST
  //5. ADD TODO TO THE FAVOURITES LIST
  //6. CHECKBOX HANDLER

  componentDidMount() {
    const { firebase } = this.props;
    const { selectedList } = this.props;

    this.setState({ loading: true });
    if (selectedList) {
      firebase.list(selectedList).on("value", snapshot => {
        const todoList = { ...snapshot.val(), key: selectedList };
        this.setState({ todoList });

        if (todoList.todos) {
          firebase.todos().on("value", snapshot => {
            const todosObj = snapshot.val();
            const todos = Object.keys(todosObj)
              .filter(key => todoList.todos.hasOwnProperty(key))
              .map(key => ({ ...todosObj[key], key }));
            this.setState({ todos, loading: false });
          });
        } else {
          this.setState({ loading: false });
        }
      });
    } else {
      this.setState({ ...INITIAL_STATE });
    }
  }

  componentWillUnmount() {
    // this.props.firebase.list(this.props.selectedList).off();
    this.props.firebase.todos().off();
  }

  checkBoxHandler = (e, key) => {
    const { checked } = e.target;
    this.props.firebase.editTodo(key, { completed: checked });
  };

  deleteList = () => {
    const { firebase, selectedList, selectList } = this.props;
    firebase.deleteList(selectedList);
    selectList("");
  };

  render() {
    const { todoList, todos, loading } = this.state;
    const { firebase, selectedList } = this.props;

    return (
      <>
        {selectedList && (
          <PageHeader
            title={todoList.name}
            extra={[
              <Button key="1" onClick={this.deleteList}>
                Delete List
              </Button>
            ]}
          ></PageHeader>
        )}
        <List
          itemLayout="horizontal"
          dataSource={todos}
          loading={loading}
          renderItem={todo => (
            <List.Item
              key={todo.key}
              actions={[
                <a key="list-loadmore-favourites" onClick={e => this.props.firebase.deleteTodo(todo.key, selectedList)}>
                  <Icon type="star" />
                </a>,
                <a key="list-loadmore-delete" onClick={e => firebase.deleteTodo(todo.key, selectedList)}>
                  <Icon type="close-circle" />
                </a>
              ]}
            >
              <List.Item.Meta
                title={todo.title}
                avatar={<Checkbox onChange={e => this.checkBoxHandler(e, todo.key)} checked={todo.completed} />}
              ></List.Item.Meta>
            </List.Item>
          )}
        >
          {todoList.key && (
            <>
              <List.Item>
                <List.Item.Meta title={<AddTodoForm addTodo={this.props.firebase.addTodo.bind(null, todoList.key)} />}></List.Item.Meta>
              </List.Item>
              <List.Item></List.Item>
            </>
          )}
        </List>
      </>
    );
  }
}

const TodoList = compose(
  connect(
    null,
    { selectList }
  ),
  withFirebase
)(TodoListBase);

export default TodoList;
