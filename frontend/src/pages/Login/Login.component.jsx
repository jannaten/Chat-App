// import React from "react";

// class Login extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "",
//       password: "",
//     };
//   }

//   handleChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = async (event) => {
//     event.preventDefault();
//     await this.props.getUserInput(this.state.name, this.state.password);
//     await this.setState({ name: "", password: "" });
//   };

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <p>Username</p>
//           <input
//             name="name"
//             type="text"
//             onChange={this.handleChange}
//             required
//           />
//           <p>Password</p>
//           <input
//             name="password"
//             type="password"
//             onChange={this.handleChange}
//             required
//           />
//           <p />
//           <input type="submit" />
//         </form>
//       </div>
//     );
//   }
// }

// export default Login;
