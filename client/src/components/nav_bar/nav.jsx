import { Query } from "react-apollo";
import Queries from "../../graphql/queries";
import { ApolloConsumer } from 'react-apollo';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import zBayIcon from "../map/test1.ico";
import { useQuery, useApolloClient } from 'react-apollo-hooks';
import Modal from 'react-modal';
import LoginContainer from "../Login";
import SignupContainer from "../Register";
import Social from "../Social";
import gql from 'graphql-tag';


const { IS_LOGGED_IN } = Queries;

const MODAL = gql`
  {
    modalOpen @client
    sessionForm @client
  }
`;

const Nav = props => {
  Modal.setAppElement("body");

  let { data } = useQuery(MODAL);
  const client = useApolloClient();

  if (data === undefined) {
    data = { modalOpen: false };
  }

  const changeState = (e, value) => {
    client.writeData({
      data: { modalOpen: value, sessionForm: e.target.innerText }
    });
  };

  const sessionForm = data.sessionForm === "Login" ? <LoginContainer /> : data.sessionForm === "Register" ? <SignupContainer /> : <Social />


  return (
    <ApolloConsumer>
      {client => (
        <Query query={IS_LOGGED_IN}>
          {(response) => {
            if (response.data.isLoggedIn) {
              return (
                <div className="nav-items">
                  <Modal className="nav-modal" isOpen={data.modalOpen} onRequestClose={(e) => changeState(e, false)}>{sessionForm}</Modal>
                  <div className="navbar-left">

                    <Link className="navbar-link logout-button-nav" to="/user">Your Homes</Link>

                    <Link className="navbar-link logout-button-nav" to="/homes/new">Create a Home</Link>
                  </div>
                  <div className="zbay-icon-main">
                    <Link className="zbay-icon-main" to="/">
                      <img src={zBayIcon} alt="zBay"/> 
                    </Link>
                  </div>
                  <div className="navbar-right">
                    <Link to="/watchlist" className="navbar-link logout-button-nav">Watchlist</Link>
                    <button className="social-link logout-button-nav" onClick={(e) => changeState(e, true)}>Creators</button>
                    <button className="nav-links logout-button-nav"
                      onClick={e => {
                        e.preventDefault();
                        localStorage.removeItem("auth-token");
                        client.writeData({ data: { isLoggedIn: false } });
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
                  <Modal className="nav-modal" isOpen={data.modalOpen} onRequestClose={(e) => changeState(e, false)}>{sessionForm}</Modal>
                  <div className="navbar-left">
                    <button className="navbar-link logout-button-nav" onClick={(e) => changeState(e, true)}>Login</button>
                    <button className="navbar-link logout-button-nav" onClick={(e) => changeState(e, true)}>Register</button>

                  </div>
                  <div className="zbay-icon-main">
                    <Link className="zbay-icon-main" to="/">
                      <img src={zBayIcon} alt="zBay" />
                    </Link>
                  </div>
                  <div className="navbar-right">
                    <button className="navbar-link logout-button-nav" onClick={(e) => changeState(e, true)}>Creators</button>
                  </div>
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