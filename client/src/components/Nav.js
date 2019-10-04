import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import { ApolloConsumer } from 'react-apollo';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const { IS_LOGGED_IN } = Queries;

const Nav = props => {
  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return (
                <div>
                  <Link to="/">Houses Index</Link>
                  &nbsp;
                  &nbsp;
                  <Link to="/houses/new">Create a House</Link>
                  &nbsp;
                  &nbsp;
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
                <div>
                  <Link to="/login">Login</Link>
                  &nbsp;
                  &nbsp;
                  <Link to="/register">Register</Link>
                  &nbsp;
                  &nbsp;
                  <Link to="/">Houses Index</Link>
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