import React from "react";
import Style from "../style";

export const MessageBoxHolder = ({ children }) => (
  <div style={Style.MessageBox}>
    <div style={Style.MessageBoxHolder}>{children}</div>
  </div>
);

export const FormContainer = ({ children }) => (
  <div style={Style.FormHolder}>{children}</div>
);

export const HomeScreenContainer = ({ children }) => (
  <div style={Style.HomeScreenHolder}>{children}</div>
);
