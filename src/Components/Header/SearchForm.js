import React, { Component } from "react";
import { Form, Input, Icon } from "antd";
import { compose } from "recompose";
import { connect } from "react-redux";
import { onSearch } from "../../Utils/actions";
const { Search } = Input;

export class SearchFormBase extends Component {
  changeHandler = e => {
    const { validateFields, setFieldsValue } = this.props.form;

    validateFields("search", (error, value) => {
      if (!error) {
        this.props.onSearch(value.search);
      }
    });
  };

  submitHandler = () => {};

  render() {
    console.log(this.props.searchQuery);
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onChange={this.changeHandler}>
        <Form.Item>
          {getFieldDecorator("search", { setFieldsValue: this.props.searchQuery, trigger: "onChange" })(
            <Input
              prefix={<Icon type="search" style={{ color: "#fff" }} />}
              placeholder="input search text"
              className="search_bar"
              style={{ width: 200 }}
              allowClear={true}
            />
          )}
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return { searchQuery: state.searchQuery };
};

const SearchForm = compose(
  connect(
    mapStateToProps,
    { onSearch }
  ),
  Form.create({ name: "searchForm" })
)(SearchFormBase);

export default SearchForm;
