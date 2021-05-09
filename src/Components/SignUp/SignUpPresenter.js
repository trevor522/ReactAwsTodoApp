import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import "antd/dist/antd.css";
import "../../index.css";

const SignUpPresenter = ({ setIsSignUp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.passwordConfirm
    );
  }

  async function handleSubmit() {
    setIsLoading(true);
    try {
      await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      message.info("이메일 인증을 완료해주세요.", 5);
      setIsLoading(false);
      setIsSignUp(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="SignUp">
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
          <Input
            id="passwordConfirm"
            type="password"
            value={fields.passwordConfirm}
            onChange={handleFieldChange}
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="패스워드 확인"
            disabled={isLoading}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signup-form-button"
            loading={isLoading}
            disabled={!validateForm()}
          >
            가입하기
          </Button>
          <a
            href="#login"
            onClick={() => setIsSignUp(false)}
            disabled={isLoading}
          >
            로그인
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpPresenter;
