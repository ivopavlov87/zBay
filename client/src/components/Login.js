import React, { Component } from "react";
import { Mutation } from "react-apollo";
import zBayIcon from "./map/test1.ico";
import Mutations from "../graphql/mutations";
const { LOGIN_USER } = Mutations;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    // this.handleDemo = this.handleDemo.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    console.log(data);
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  // handleDemo(e) {
  //   e.preventDefault();
  //   this.props
  //     .login({
  //       email: "demo@user.com",
  //       password: "password"
  //     });
  // }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token } = data.login;
          localStorage.setItem("auth-token", token);
          // this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {loginUser => (
          <div className="modal">
            <h1 className="modal-header">Welcome Back</h1>
              <div className="modal-container">
              <div className="modal-header-container">
                <div className="zbay-icon-modal">
                  <img className="zbay-logo" src={zBayIcon} alt="zBay" />
                </div>
              </div>
              <form
                className="modal-form"
                onSubmit={e => {
                  e.preventDefault();
                  loginUser({
                    variables: {
                      email: this.state.email,
                      password: this.state.password
                    }
                  });
                }}
              >
                <h3 className="modal-field">Email</h3>
                <input
                  className="modal-input"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                />
                <h3 className="modal-field">Password</h3>
                <input
                  className="modal-input"
                  value={this.state.password}
                  onChange={this.update("password")}
                  type="password"
                  placeholder="Password"
                />
                <button className="modal-button" type="submit">
                  Log In
                </button>
                <button
                  className="modal-button"
                  onClick={this.handleDemo}
                >
                  Demo Login
                </button>
              </form>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
export default Login;