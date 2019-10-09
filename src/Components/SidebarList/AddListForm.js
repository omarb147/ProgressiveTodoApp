import React, { Component } from "react";
import { Icon, Form, Input } from "antd";

class AddListForm extends Component {
  submitHandler = e => {
    const { form, addList } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        addList(values.name);
        form.setFields({ name: { value: "" } });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form layout="inline" onSubmit={this.submitHandler}>
        <Form.Item>{getFieldDecorator("name")(<Input style={{ color: "#fff" }} placeholder="Add List" />)}</Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "addList" })(AddListForm);
