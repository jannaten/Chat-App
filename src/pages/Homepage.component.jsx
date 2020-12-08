import React from "react";
import axios from "axios";
import io from "socket.io-client";
import { BACKEND_URL } from "../constant";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
      allMessages: [],
      count: 0,
    };
    this.socket = io("localhost:5000");

    this.socket.on("RECEIVE_MESSAGE", function (data) {
      console.log(data);
      addMessage(data);
    });

    const addMessage = (data) => {
      this.setState({
        allMessages: data.slice(Math.max(data.length - 6, 0)),
      });
      // this.setState({ count : [...this.state.demo, data] });
      // console.log(this.state.demo);
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

  componentDidUpdate(pP, pS, SS) {
    // console.log(pP);
    // if (pS.allMessages.length !== this.state.allMessages) {
    //   this.getAllMessages();
    // }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKEND_URL}/createMessage/`, {
        friendsId: this.props.userFriend.id,
        message: this.state.message,
      })
      .then((res) => {
        console.log(res.data.id);
        this.socket.emit("SEND_MESSAGE", {
          friendsId: this.state.username,
          message: this.state.message,
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
            width: "65vw",
            height: "50vh",
            backgroundColor: "#fafafa",
            border: "1px solid #dfe6e9",
          }}
        >
          {this.state.allMessages.map((el) => {
            return (
              <p
                key={el.id}
                style={{ style: "black", display: "flex", paddingLeft: "10%" }}
              >
                {el.userId === this.props.userFriend.id ? (
                  <span
                    style={{
                      color: "#0984e3",
                      border: "1px solid #dfe6e9",
                      padding: "1%",
                    }}
                  >
                    Me: {el.message}{" "}
                    <span style={{ color: "#b2bec3", fontStyle: "italic" }}>
                      sent
                    </span>
                  </span>
                ) : (
                  <span
                    style={{
                      color: "#d63031",
                      border: "1px solid #dfe6e9",
                      padding: "1%",
                    }}
                  >
                    {this.props.userFriend.username}: {el.message}
                  </span>
                )}
              </p>
            );
          })}
          <p></p>
        </div>
        <div style={{ margin: "5% 0% " }}>
          <input
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Send</button>
        </div>
        <button onClick={() => this.props.onLogOut()}>SignOut</button>
      </div>
    );
  }
}

export default HomePage;
