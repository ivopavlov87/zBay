import React from "react";
// import React, { Component } from "react";
// import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomeIndex from "./homes/HomeIndex";
import Login from "./Login";
import Register from "./Register";
import AuthRoute from '../util/route_util'
import Nav from "./nav_bar/nav";
import HomeDetail from './homes/HomeDetail';
import CreateHome from './homes/CreateHome';
import SearchBar from './search/SearchBar';
import MapSerchBar from "./map/map_search_2_0";
import { useQuery, useApolloClient } from 'react-apollo-hooks'

import Map from "./map/map_view";

require('dotenv').config()

const App = (props) => {
  const client = useApolloClient()
  return (
    <HashRouter>
      <ApolloConsumer >
      {(cache) => (
      <div className="main">
        <header>
          <Nav />
          <SearchBar />
        </header>
        <Switch>
          <Route exact path="/homes/new" component={CreateHome} />
          <Route exact path="/homes/:id" component={HomeDetail} />
          <AuthRoute exact path="/register" component={Register} routeType="auth" />
          <AuthRoute exact path="/login" component={Login} routeType="auth" />
          <Route eaxt path="/search" component={() => <MapSerchBar client={client}/>} />
          <Route path="/" component={() => <HomeIndex cache={cache} />} />
          <Redirect to="/" />
        </Switch>
      </div>
      )}
      </ApolloConsumer>
    </HashRouter>
  );
};

export default App;