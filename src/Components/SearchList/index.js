import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { selectList, cancelSearch } from "../../Utils/actions";
import { withFirebase } from "../Firebase";
import { List, PageHeader, Button } from "antd";

const INITIAL_STATE = { loading: true, results: [] };

export class SearchListBase extends Component {
  state = { ...INITIAL_STATE };
  componentDidMount() {
    const { firebase, searchQuery } = this.props;

    if (searchQuery) {
      firebase.todos().once("value", snapshot => {
        const todosObj = { ...snapshot.val() };
        const todosList = Object.keys(todosObj).map(key => ({ ...todosObj[key], key }));
        const results = todosList.filter(todo => todo.title.includes(searchQuery));

        firebase.lists().once("value", snapshot => {
          const TodoLists = snapshot.val();
          const updatedResults = results.map(todo => {
            const listDetails = Object.keys(todo.lists).map(key => ({ name: TodoLists[key].name, key }));
            return { ...todo, lists: listDetails };
          });

          this.setState({ results: updatedResults, loading: false });
        });
      });
    }
  }

  componentWillUnmount() {
    const { firebase, searchQuery } = this.props;
    firebase.todos().off();
  }

  listOnClickHandler = listId => {
    const { selectList, cancelSearch } = this.props;
    selectList(listId);
    cancelSearch();
  };

  render() {
    const { searchQuery, cancelSearch } = this.props;
    const { loading, results } = this.state;

    return (
      <div>
        <PageHeader
          title={`Search Term: ${searchQuery}`}
          extra={[
            <Button key="1" onClick={cancelSearch}>
              Cancel Search
            </Button>
          ]}
        ></PageHeader>
        <List
          itemLayout="horizontal"
          dataSource={results}
          loading={loading}
          renderItem={todo => (
            <List.Item
              key={todo.key}
              actions={todo.lists.map(list => (
                <a onClick={() => this.listOnClickHandler(list.key)}>{list.name}</a>
              ))}
            >
              <List.Item.Meta title={todo.title}></List.Item.Meta>
            </List.Item>
          )}
        ></List>
      </div>
    );
  }
}

const SearchList = compose(
  withFirebase,
  connect(
    null,
    { selectList, cancelSearch }
  )
)(SearchListBase);

export default withFirebase(SearchList);
