import React from "react";
import "./App.css";
import axios from "axios";
import { BACKEND_URL } from "./constant";
import { HomePage, SignIn } from "./pages/";

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
          <SignIn
            className="sign-in"
            username={this.state.name}
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            password={this.state.password}
          />
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
