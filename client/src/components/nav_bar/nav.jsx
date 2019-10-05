import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { ApolloConsumer } from 'react-apollo';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import "./nav.css"

const { IS_LOGGED_IN } = Queries;

const Nav = props => {
  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <div className="nav-items">
                  <Link to="/">Homes Index</Link>
                  <Link to="/homes/new">Create a Home</Link>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      localStorage.removeItem("auth-token");
                      client.writeData({ data: { isLoggedIn: false } });
                      props.history.push("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
              );
            } else {
              return (
                <div className="nav-items">
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                  <Link to="/">Homes Index</Link>
                </div>
              );
            }
          }}
        </Query>
      )}
    </ApolloConsumer>
  );
};

export default withRouter(Nav);