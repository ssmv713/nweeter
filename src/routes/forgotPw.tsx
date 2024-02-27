import { useState } from "react";

import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

import { Form, Input, Title, Wrapper } from "../components/auth-components";
import { auth } from "./firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setEmail(value);
  };
  const sendEmail = async () => {
    try {
      console.log("비밀번호 재설정 이메일 전송 전");
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Wrapper>
      <Title>Send a reset email</Title>
      <Form onSubmit={sendEmail}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        ></Input>

        <Input type="submit" value={"Send an email"}></Input>
      </Form>
      <Link to="/login"> Go to Login &rarr;</Link>
    </Wrapper>
  );
}
