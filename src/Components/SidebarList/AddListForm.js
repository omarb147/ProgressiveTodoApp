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
      <Form layout="inline" onSubmit={this.submitHandler} className="add_list">
        <Form.Item sytle={{ padding: "10px", marginRight: "0px" }}>
          <Icon type="plus" />
        </Form.Item>
        <Form.Item>{getFieldDecorator("name")(<Input placeholder="Add List" />)}</Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "addList" })(AddListForm);
