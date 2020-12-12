import React from "react";
import { MessageBoxHolder, MessageLine } from "../";

const MessageForm = ({ allMessages, userFriend }) => (
  <MessageBoxHolder>
    {allMessages.map((el) => (
      <MessageLine key={el.id} el={el} userFriend={userFriend} />
    ))}
  </MessageBoxHolder>
);

export default MessageForm;
