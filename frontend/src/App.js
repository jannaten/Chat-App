import React from "react";
import axios from "axios";
import { BACKEND_URL } from "./constant";
import { HomePage, SignIn } from "./pages/";
import { AppContainer } from "./Components/";

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
    const { users, name, password } = this.state;
    event.preventDefault();
    const user = users.find(
      (el) => el.username === name && el.password === password
    );
    const userFriend = users.find(
      (el) => el.username !== name || el.password !== password
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
    const { handleSubmit, handleChange, onLogOut } = this;
    const { name, password, userFriend, user, route } = this.state;
    return (
      <AppContainer>
        {route === "Login" ? (
          <SignIn
            username={name}
            password={password}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        ) : route === "HomePage" ? (
          <HomePage user={user} onLogOut={onLogOut} userFriend={userFriend} />
        ) : null}
      </AppContainer>
    );
  }
}

export default App;
