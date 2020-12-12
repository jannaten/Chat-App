import React from "react";

const Header = ({ user, subText }) => (
  <div>
    <h5>{subText}</h5>
    <h2>{user.username.toUpperCase()}</h2>
  </div>
);

export default Header;
