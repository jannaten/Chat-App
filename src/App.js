// import React, { Component } from "react";
// import Chat from "./Chat";

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <Chat />
//       </div>
//     );
//   }
// }

// export default App;

import React from "react";
import "./App.css";
import axios from "axios";
import { BACKEND_URL } from "./constant";
import HomePage from "./pages/Homepage/Homepage.component";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      name: "",
      users: [],
      password: "",
      route: "Login",
      userFriends: {},
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getUsers = async () => {
    const Respond = await axios.get(`${BACKEND_URL}/getAllUser`);
    if (Respond.data) {
      return this.setState({ users: Respond.data });
    }
    return alert("Server error");
  };
  componentDidMount() {
    this.getUsers();
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const user = this.state.users.find(
      (el) =>
        el.username === this.state.name && el.password === this.state.password
    );
    const userFriend = this.state.users.find(
      (el) =>
        el.username !== this.state.name || el.password !== this.state.password
    );

    if (user) {
      this.setState({
        user,
        name: "",
        userFriend,
        password: "",
        route: "HomePage",
      });
    }
    if (!user) {
      alert("User name & Password not valid");
    }
  };

  onLogOut = () => {
    this.setState({ route: "Login", name: "", password: "" });
  };

  render() {
    return (
      <div className="App">
        {this.state.route === "Login" ? (
          <form onSubmit={this.handleSubmit}>
            <p>Username</p>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <p>Password</p>
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <p />
            <input type="submit" />
          </form>
        ) : this.state.route === "HomePage" ? (
          <HomePage
            user={this.state.user}
            onLogOut={this.onLogOut}
            userFriend={this.state.userFriend}
          />
        ) : null}
      </div>
    );
  }
}

export default App;

// <ChatBox
// user={this.state.user}
// onLogOut={this.onLogOut}
// userFriend={this.state.userFriend}
// />
