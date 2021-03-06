/* eslint no-unused-vars: 0 */

import { navigate } from "gatsby";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import PropTypes from "prop-types";
import React from "react";

const FormItem = Form.Item;
const { TextArea } = Input;
import { ThemeContext } from "../../layouts";

const Contact = (props) => {
  const [form] = Form.useForm();
  function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const handleFinished = async (values) => {
    await form.validateFields();
    sendMessage(values);
  };

  function sendMessage(values) {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...values }),
    })
      .then(() => {
        console.log("Form submission success");
        navigate("/success");
      })
      .catch((error) => {
        console.error("Form submission error:", error);
        this.handleNetworkError();
      });
  }

  function handleNetworkError(e) {
    console.log("submit Error");
  }

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {(theme) => (
          <div className="form">
            <Form
              layout="vertical"
              form={form}
              name="contact"
              onFinish={handleFinished}
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <FormItem label="Name" name="name" rules={[{ whitespace: true }]}>
                <Input name="name" />
              </FormItem>
              <FormItem
                label="E-mail"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your e-mail address!",
                    whitespace: true,
                    type: "email",
                  },
                ]}
              >
                <Input name="email" />
              </FormItem>
              <FormItem
                label="Message"
                name="message"
                rules={[
                  { required: true, message: "Please input your message!", whitespace: true },
                ]}
              >
                <TextArea name="message" placeholder="" autosize={{ minRows: 4, maxRows: 10 }} />
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </FormItem>
            </Form>

            {/* --- STYLES --- */}
            <style jsx>{`
              .form {
                background: transparent;
              }
              .form :global(.ant-row.ant-form-item) {
                margin: 0 0 1em;
              }
              .form :global(.ant-row.ant-form-item:last-child) {
                margin-top: 1em;
              }
              .form :global(.ant-form-item-control) {
                line-height: 1em;
              }
              .form :global(.ant-form-item-label) {
                line-height: 1em;
                margin-bottom: 0.5em;
              }
              .form :global(.ant-form-item) {
                margin: 0;
              }
              .form :global(.ant-input) {
                appearance: none;
                height: auto;
                font-size: 1.2em;
                padding: 0.5em 0.6em;
              }
              .form :global(.ant-btn-primary) {
                height: auto;
                font-size: 1.2em;
                padding: 0.5em 3em;
                background: ${theme.color.brand.primary};
                border: 1px solid ${theme.color.brand.primary};
              }
              .form :global(.ant-form-explain) {
                margin-top: 0.2em;
              }

              @from-width desktop {
                .form :global(input) {
                  max-width: 50%;
                }
              }
            `}</style>
          </div>
        )}
      </ThemeContext.Consumer>
    </React.Fragment>
  );
};

Contact.propTypes = {
  form: PropTypes.object,
};

// const ContactForm = Form.create({})(Contact);

export default Contact;
