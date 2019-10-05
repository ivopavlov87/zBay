import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { ApolloConsumer } from 'react-apollo';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import zBayIcon from "../map/test1.ico"


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
                  <div className="navbar-left">
                    <Link className="navbar-link" to="/">Homes Index</Link>
                    <Link className="navbar-link" to="/homes/new">Create a Home</Link>
                  </div>
                  <div className="zbay-icon-main">
                    <img src={zBayIcon} alt="zBay"/> 
                  </div>
                  <div className="navbar-right">
                    <button className="logout-button-nav"
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