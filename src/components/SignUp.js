import React from "react";

const SignUp = () => {
  return (
    <div>
      <form>
        <input type="text" data-testid="email-input" />
        <input type="password" data-testid="password-input" />
        <button type="submit" data-testid="signup-button">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
