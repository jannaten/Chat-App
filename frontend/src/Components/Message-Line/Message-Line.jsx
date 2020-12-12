import React from "react";
import { Sender, Reciever, MessagerContainer } from "../";

const MessageLine = ({ el, userFriend }) => (
  <MessagerContainer el={el}>
    {el.userId === userFriend.id ? (
      <Sender el={el} />
    ) : (
      <Reciever el={el} userFriend={userFriend} />
    )}
  </MessagerContainer>
);

export default MessageLine;
