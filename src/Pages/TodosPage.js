import React, { useState, Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import TodoList from "../Components/TodoList";
import PageLayout from "../Components/Layout";
import SearchList from "../Components/SearchList";
import { withAuthentication } from "../Components/Authentication";

class TodosPageBase extends Component {
  state = { todoList: {} };

  render() {
    const { selectedList, searchQuery, user } = this.props;
    let content;

    if (selectedList && !searchQuery) {
      content = <TodoList key={selectedList} user={user} selectedList={selectedList} />;
    } else if (searchQuery) {
      content = <SearchList key={searchQuery} user={user} searchQuery={searchQuery} />;
    } else {
      content = <h1>Home page</h1>;
    }

    return <PageLayout>{content}</PageLayout>;
  }
}

const mapStateToProps = state => {
  return { selectedList: state.selectedList, searchQuery: state.searchQuery };
};

const TodosPage = compose(
  connect(
    mapStateToProps,
    null
  ),
  withAuthentication
)(TodosPageBase);

export default TodosPage;
