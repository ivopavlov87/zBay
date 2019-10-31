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
      password: "",
      errors: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {

    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  render() {

    const errors = (this.state.errors && this.state.errors.graphQLErrors[0]) ? (
      <li className="modal-li-errors">
        {this.state.errors.graphQLErrors[0].message}
      </li>
    ) : (
      <li className="modal-li-errors"></li>
    );

    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token } = data.login;
          localStorage.setItem("auth-token", token);

        }}
        onError={err => {
          this.setState({ errors: err });
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
                <ul className="modal-ul-errors">{errors}</ul>
                <button className="modal-button" type="submit">
                  Log In
                </button>
                <button
                  className="modal-button"
                  onClick={e => {
                    e.preventDefault();
                    this.setState(
                      { email: "demo@user.com", password: "password" },
                      () => {
                        loginUser({
                          variables: {
                            email: this.state.email,
                            password: this.state.password
                          }
                        });
                      }
                    );
                  }}
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