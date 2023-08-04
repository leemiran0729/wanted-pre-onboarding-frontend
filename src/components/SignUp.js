import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (email.includes("@")) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
    if (pw.length >= 8) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const handleSubmit = () => {
    if (emailValid && pwValid) {
      alert("회원가입이 완료되었습니다.");
      navigate("/signin");
    }
  };

  return (
    <Container>
      <Img
        src="https://cdn2.iconfinder.com/data/icons/ecommerce-line-pack/40/SignUp-512.png"
        alt="signup-icon"
      />
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          data-testid="email-input"
          placeholder="email"
          onChange={handleEmailChange}
          value={email}
        />
        {!emailValid && <Error>이메일을 제대로 입력해주세요 (@포함)</Error>}
        <Input
          type="password"
          data-testid="password-input"
          placeholder="password"
          onChange={handlePwChange}
          value={pw}
        />
        {!pwValid && <Error>비밀번호를 8글자 이상 입력해주세요</Error>}
        {emailValid && pwValid ? (
          <Button
            data-testid="signup-button"
            onSubmit={handleSubmit}
            disabled={false}
          >
            회원가입
          </Button>
        ) : (
          <Button data-testid="signup-button" disabled={true}>
            회원가입
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default SignUp;

const Container = styled.div``;

const Img = styled.img`
  padding-top: 60px;
  width: 100px;
  height: 100px;
`;

const Form = styled.form`
  padding-top: 50px;
  margin: 0 auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Input = styled.input`
  border: 1px solid gray;
  border-radius: 5px;
  height: 30px;
  margin: 10px;
`;

const Error = styled.p`
  color: #fe2e2e;
  font-size: 8px;
`;

const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: ${(props) => (props.disabled ? "#E6E0F8" : "#8258fa")};
  height: 30px;
  color: #fff;
  font-weight: 600;
`;
