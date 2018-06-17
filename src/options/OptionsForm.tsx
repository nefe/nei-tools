import Button from "antd/lib/button";
import Form, { FormComponentProps } from "antd/lib/form";
import Input from "antd/lib/input";
import message from "antd/lib/message";
import * as React from "react";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import "./OptionsForm.scss";

const FormItem = Form.Item;

class OptionsForm extends React.Component<FormComponentProps, any> {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      localStorage.setItem("source_url", values.source_url);
      message.success(chrome.i18n.getMessage("saved"));
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const title = (
      <>
        <img src="./icon48.png" alt={chrome.i18n.getMessage("name")} />
        <br />
        {chrome.i18n.getMessage("subTitle")}
      </>
    );
    return (
      <>
        <div className="main-container">
          <Header title={title} />
          <Form onSubmit={this.handleSubmit}>
            <FormItem label={chrome.i18n.getMessage("sourceUrlLabel")}>
              {getFieldDecorator("source_url", {
                initialValue: localStorage.getItem("source_url") || "",
                rules: [
                  {
                    type: "url",
                    message: chrome.i18n.getMessage("isUrlMessage")
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                {chrome.i18n.getMessage("ok")}
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                {chrome.i18n.getMessage("reset")}
              </Button>
            </FormItem>
          </Form>
        </div>
        <Footer />
      </>
    );
  }
}

export default Form.create()(OptionsForm);
