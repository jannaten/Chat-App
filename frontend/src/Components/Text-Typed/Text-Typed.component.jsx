import React from "react";

const TypeText = ({ messagePrompts, user }) => (
  <div>
    {messagePrompts.map((el) => (
      <div key={el.id}>
        {user.id === el.rid && el.value.length > 1 ? (
          <p key={el.id}>
            <i>{el.sender} is typing</i>
          </p>
        ) : null}
      </div>
    ))}
  </div>
);

export default TypeText;
