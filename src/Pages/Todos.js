import React, { useState, Component } from "react";
import TodoList from "../Components/TodoList";
import PageLayout from "../Components/Layout";
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";

class TodosPage extends Component {
  state = { todoList: {} };

  render() {
    const { selectedList } = this.props;
    return (
      <PageLayout>
        {/* <Switch>
          <Route path="/"/>
        </Switch> */}
        <TodoList key={selectedList} selectedList={selectedList} />
      </PageLayout>
    );
  }
}

const mapStateToProps = state => {
  return { selectedList: state.selectedList };
};

export default connect(
  mapStateToProps,
  null
)(TodosPage);
