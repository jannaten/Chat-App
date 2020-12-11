import React from "react";
import { FormInput, SignInButton, SignInForm } from "../../Components/";

const SignIn = ({ onSubmit, username, password, onChange }) => (
  <SignInForm onSubmit={onSubmit}>
    <FormInput
      name="name"
      type="text"
      label="Username"
      value={username}
      onChange={onChange}
      required
    />
    <FormInput
      name="password"
      type="password"
      label="Password"
      value={password}
      onChange={onChange}
      required
    />
    <SignInButton />
  </SignInForm>
);

export default SignIn;
