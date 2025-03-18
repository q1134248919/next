"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { LoginUserInput, loginUserSchema } from "@/lib/user-schema";
import { Button, Form, Input, message } from "antd";
const { Password } = Input;
const { Item } = Form;
export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });
  const getMsg = (error: string) => {
    let msg = "";
    switch (error) {
      case "CredentialsSignin":
        msg = "验证码错误";
        break;
      case "CallbackRouteError":
        msg = "验证码已经过期";
        break;
      case "AuthError":
        msg = "賬號密碼錯誤";
        break;
    }

    return msg;
  };
  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        // code: values.code,
        redirect: false,
      });
      console.log(res, "res");

      if (res?.error) {
        message.error(getMsg(res?.error));
      } else {
        router.push("/profile");
        message.success("successfully logged in");
      }
    } catch (error: any) {
      console.log(error, "1");
      message.error(error.message);
      setError(error.message);
    }
  };

  const [form] = Form.useForm();
  const email = Form.useWatch("email", form);

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onSubmitHandler}
      autoComplete="off"
    >
      <Item
        label="email"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Item>

      <Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Password />
      </Item>
      {/* <Item
        label="code"
        name="code"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          suffix={
            <Button
              size="small"
              onClick={() => {
                sendEmail(email);
              }}
              style={{
                border: "none",
                color: "#0270DF",

                padding: "0px",
                fontSize: 12,
              }}
            >
              发送验证码
            </Button>
          }
        />
      </Item> */}

      <Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Item>
    </Form>
  );
};
