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
    };
    this.socket = io(`localhost:${PORT}`);
    this.socket.on("RECEIVE_MESSAGE", function (data) {
      addMessage(data);
    });
    const addMessage = (data) => {
      this.setState({
        allMessages: data.slice(Math.max(data.length - 6, 0)),
      });
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
        .catch((e) => console.log(e.message));
    } else {
      alert("Message can't be empty");
    }
  };

  onReset = () => {
    this.setState({ message: "" });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { message, allMessages } = this.state;
    const { userFriend, user, onLogOut } = this.props;
    const { handleChange, handleSubmit, onReset } = this;
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
        <div style={{ margin: "5% 0% " }}>
          <FormInput
            name="message"
            value={message}
            onChange={handleChange}
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
