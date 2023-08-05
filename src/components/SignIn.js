import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo");
    }
  }, []);

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

  const handleSignIn = () => {
    axios({
      url: "https://www.pre-onboarding-selection-task.shop/auth/signin",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        email: email,
        password: pw,
      },
    })
      .then(function (response) {
        localStorage.setItem("access_token", response.data.access_token);
        alert("로그인 성공하였습니다.");
        navigate("/todo");
      })
      .catch((error) => alert("로그인에 실패하였습니다."));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailValid && pwValid) {
      handleSignIn();
    }
  };

  return (
    <Container>
      <Img
        src="https://cdn4.iconfinder.com/data/icons/hodgepodge-free/32/login_account_enter_door-512.png"
        alt="signin-icon"
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
            data-testid="signin-button"
            onSubmit={handleSubmit}
            disabled={false}
          >
            로그인
          </Button>
        ) : (
          <Button data-testid="signin-button" disabled={true}>
            로그인
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default SignIn;

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
