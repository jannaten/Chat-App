import React from "react";

export const SignInButton = () => <input className="btn" type="submit" />;

export const SendButton = ({ onClick }) => (
  <button className="btn-send" onClick={onClick}>
    Send
  </button>
);

export const ResetButton = ({ onClick }) => (
  <button className="btn-reset" onClick={onClick}>
    Reset
  </button>
);

export const SignOutButton = ({ onClick }) => (
  <button onClick={onClick} className="btn-logout">
    SignOut
  </button>
);
