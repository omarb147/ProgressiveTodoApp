import React, { Component } from "react";
import { Form, Icon, Input } from "antd";

class AddTodoForm extends Component {
  submitHandler = event => {
    event.preventDefault();
    const { form, addTodo } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        addTodo(values.title);
        form.setFields({ title: "" });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.submitHandler} style={{ display: "flex" }}>
        <Form.Item>
          <Icon type="plus-square" sytle={{ size: "2em" }} />
        </Form.Item>
        <Form.Item>{getFieldDecorator("title")(<Input placeholder="Add Todo" />)}</Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "addTodo" })(AddTodoForm);
