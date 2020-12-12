import React from "react";
import Style from "../style";

const MessageBoxHolder = ({ children }) => (
  <div style={Style.MessageBox}>
    <div style={Style.MessageBoxHolder}>{children}</div>
  </div>
);

export default MessageBoxHolder;
