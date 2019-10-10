import React, { useState, Component } from "react";
import TodoList from "../Components/TodoList";
import PageLayout from "../Components/Layout";
import SearchList from "../Components/SearchList";
import { connect } from "react-redux";

class TodosPage extends Component {
  state = { todoList: {} };

  render() {
    const { selectedList, searchQuery } = this.props;

    let content;

    if (selectedList && !searchQuery) {
      content = <TodoList key={selectedList} selectedList={selectedList} />;
    } else if (searchQuery) {
      content = <SearchList key={searchQuery} searchQuery={searchQuery} />;
    } else {
      content = <h1>Home page</h1>;
    }

    return <PageLayout>{content}</PageLayout>;
  }
}

const mapStateToProps = state => {
  return { selectedList: state.selectedList, searchQuery: state.searchQuery };
};

export default connect(
  mapStateToProps,
  null
)(TodosPage);
