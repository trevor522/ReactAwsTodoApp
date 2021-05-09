import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useAppContext } from "../../libs/contextLib";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import "antd/dist/antd.css";
import "../../index.css";
import SignUp from "../SignUp";

const LoginPresenter = () => {
  const { loggenIn } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);

  function validateform() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);
      setIsLoading(false);
      loggenIn();
    } catch (e) {
      setIsLoading(false);
      onError(e);
    }
  }

  return (
    <>
      {!isSignUp ? (
        <div className="Login">
          <Form onFinish={handleSubmit}>
            <Form.Item>
              <Input
                autoFocus
                id="email"
                type="email"
                value={fields.email}
                onChange={handleFieldChange}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="이메일"
                disabled={isLoading}
              />
            </Form.Item>
            <Form.Item>
              <Input
                id="password"
                type="password"
                value={fields.password}
                onChange={handleFieldChange}
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="패스워드"
                disabled={isLoading}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={isLoading}
                disabled={!validateform()}
              >
                로그인
              </Button>
              <a
                href="#signup"
                onClick={() => setIsSignUp(true)}
                disabled={isLoading}
              >
                회원가입
              </a>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <SignUp setIsSignUp={setIsSignUp} />
      )}
    </>
  );
};

export default LoginPresenter;
