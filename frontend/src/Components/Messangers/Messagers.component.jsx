import React from "react";
import Style from "../style";

export const Sender = ({ el }) => (
  <span style={Style.SenderMain}>
    <span style={Style.SenderHighlight}>Me: </span>
    {el.message} <span style={Style.MessageSent}>sent</span>
  </span>
);

export const Reciever = ({ el, userFriend }) => (
  <span style={Style.RecieverMain}>
    <span style={Style.RecieverHighlight}>{userFriend.username}:</span>{" "}
    {el.message}
  </span>
);

export const MessagerContainer = ({ el, children }) => (
  <p key={el.id}>{children}</p>
);
