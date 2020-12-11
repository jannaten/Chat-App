import React from "react";
import axios from "axios";
import io from "socket.io-client";
import { BACKEND_URL, PORT } from "../../constant";

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
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div
        style={{
          width: "70vw",
          height: "100vh",
          display: "flex",
          margin: "0% auto",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <h5>Welcome!!!</h5>
        <h2>{this.props.user.username.toUpperCase()}</h2>
        <div
          style={{
            width: "30vw",
            height: "50vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#fafafa",
            border: "1px solid #dfe6e9",
          }}
        >
          <div>
            {this.state.allMessages.map((el) => {
              return (
                <p
                  key={el.id}
                  style={{
                    style: "black",
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                  }}
                >
                  {el.userId === this.props.userFriend.id ? (
                    <span
                      style={{
                        padding: "1%",
                        width: "500px",
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        alignContent: "center",
                        justifyContent: "flex-start",
                        borderBottom: "1px solid #dfe6e9",
                      }}
                    >
                      <span style={{ color: "#0984e3" }}>Me: </span>
                      {el.message}{" "}
                      <span style={{ color: "#b2bec3", fontStyle: "italic" }}>
                        sent
                      </span>
                    </span>
                  ) : (
                    <span
                      style={{
                        padding: "1%",
                        width: "500px",
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        alignContent: "center",
                        justifyContent: "flex-end",
                        borderBottom: "1px solid #dfe6e9",
                      }}
                    >
                      <span style={{ color: "#d63031" }}>
                        {this.props.userFriend.username}:
                      </span>{" "}
                      {el.message}
                    </span>
                  )}
                </p>
              );
            })}
          </div>
          <p></p>
        </div>
        <div
          style={{
            margin: "5% 0% ",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            name="message"
            style={{ margin: "1rem" }}
            value={this.state.message}
            onChange={this.handleChange}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{
                width: "50%",
                backgroundColor: "white",
                border: "1px solid #0984e3",
                borderRadius: "1rem",
                marginRight: "1rem",
              }}
              onClick={this.handleSubmit}
            >
              Send
            </button>

            <button
              style={{
                width: "50%",
                backgroundColor: "white",
                border: "1px solid #d63031",
                borderRadius: "1rem",
              }}
              onClick={this.handleSubmit}
            >
              Reset
            </button>
          </div>
        </div>
        <button onClick={() => this.props.onLogOut()}>SignOut</button>
      </div>
    );
  }
}

export default HomePage;
