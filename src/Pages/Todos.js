import React, { useState, Component } from "react";
import TodoList from "../Components/TodoList";
import PageLayout from "../Components/Layout";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withFirebase } from "../Components/Firebase";

class TodosPageBase extends Component {
  state = { todoList: {} };

  async componentDidUpdate(prevProps) {
    const { firebase, selectedList } = this.props;

    if (selectedList && prevProps.selectedList !== selectedList) {
      console.log("list selected");
      await firebase.db.ref(`lists/${selectedList}`).on("value", async snapshot => {
        const todoList = { ...snapshot.val(), key: selectedList };
        this.setState({ todoList });
      });
    }
  }

  render() {
    const { todoList } = this.state;
    return (
      <PageLayout>
        <TodoList key={todoList.key} todoList={todoList} />
      </PageLayout>
    );
  }
}

const mapStateToProps = state => {
  return { selectedList: state.selectedList };
};

const TodosPage = compose(
  connect(
    mapStateToProps,
    null
  ),
  withFirebase
)(TodosPageBase);

export default TodosPage;
