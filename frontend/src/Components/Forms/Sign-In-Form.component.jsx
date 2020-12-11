import React from "react";

const SignInForm = ({ children, onSubmit }) => (
  <div className="sign-in">
    <form onSubmit={onSubmit} className="sign-in-container">
      {children}
    </form>
  </div>
);

export default SignInForm;
