import React from "react";
import axios from "axios";
import io from "socket.io-client";
import { BACKEND_URL, PORT } from "../../constant";
import { FormInput, MessageForm } from "../../Components/";
import { ResetButton, SendButton, SignOutButton } from "../../Components/";
class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
      allMessages: [],
      messagePrompts: [],
    };
    this.socket = io(`localhost:${PORT}`);
    this.socket.on("RECEIVE_MESSAGE", function (data) {
      addMessage(data);
    });
    this.socket.on("RECEIVE_BY_RECIEVER", function (data) {
      addSenderDetails(data);
    });
    const addMessage = (data) => {
      if (this.state.allMessages.length !== data.length) {
        this.setState({ messagePrompts: [] });
      }
      this.setState({
        allMessages: data.slice(Math.max(data.length - 6, 0)),
      });
    };
    const addSenderDetails = (data) => {
      let arr = [];
      arr.push(data);
      this.setState({ messagePrompts: arr });
    };
  }

  getAllMessages = async () => {
    const Response = await axios.get(`${BACKEND_URL}/getAllMessages`);
    if (Response.data) {
      return this.setState({
        allMessages: Response.data.slice(Math.max(Response.data.length - 6, 0)),
      });
    }
  };

  componentDidMount() {
    this.getAllMessages();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { userFriend } = this.props;
    const { message, username } = this.state;
    if (this.state.message !== "") {
      axios
        .post(`${BACKEND_URL}/createMessage/`, {
          friendsId: userFriend.id,
          message,
        })
        .then(() => {
          this.socket.emit("SEND_MESSAGE", {
            friendsId: username,
            message,
          });
        })
        .then(() => this.setState({ message: "" }))
        .catch((e) => console.error(e.message));
    } else {
      alert("Message can't be empty");
    }
  };

  onReset = () => {
    this.setState({ message: "" });
  };

  handleChange = (event, data) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
    if (value !== "") {
      this.socket.emit("SEND_BY_SENDER", data);
    } else if (value === "") {
      this.setState({ messagePrompts: [] });
    }
  };

  render() {
    const { userFriend, user, onLogOut } = this.props;
    const { handleChange, handleSubmit, onReset } = this;
    const { message, allMessages, messagePrompts } = this.state;
    return (
      <div
        style={{
          width: "70vw",
          height: "100vh",
          display: "flex",
          margin: "0% auto",
          alignItems: "center",
          borderRadius: "1rem",
          flexDirection: "column",
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <SignOutButton onClick={() => onLogOut()} />
        <h5>Welcome!!!</h5>
        <h2>{user.username.toUpperCase()}</h2>
        <MessageForm userFriend={userFriend} allMessages={allMessages} />
        {messagePrompts.length !== 0 ? (
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
        ) : null}
        <div style={{ margin: "5% 0% " }}>
          <FormInput
            name="message"
            value={message}
            onChange={async (e) => {
              let obj = {};
              obj.id = user.id;
              obj.rid = userFriend.id;
              obj.sender = user.username;
              obj.value = e.target.value;
              obj.reciever = userFriend.username;
              await handleChange(e, obj);
            }}
            label="Type your message"
            style={{ margin: "1rem" }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SendButton onClick={handleSubmit} />
            <ResetButton onClick={onReset} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
