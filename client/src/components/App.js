import React from "react";
// import React, { Component } from "react";
// import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomeIndex from "./homes/HomeIndex";
// import Login from "./Login";
// import Register from "./Register";
// import AuthRoute from '../util/route_util'
import Nav from "./nav_bar/nav";
import HomeDetail from './homes/HomeDetail';
import CreateHome from './homes/CreateHome';
import SearchBar from './search/SearchBar';

import MapSearchBar from "./map/map_search";

import Map from "./map/map_view";
import DropdownMenu from './search/DropdownMenu';
import Watchlist from './watchlist/watchlist'

require('dotenv').config();

const App = (props) => {
  return (
    <HashRouter>
      <ApolloConsumer >
      {(cache) => (
      <div className="main">

          <Nav />
          <Route exact path="/home" component={SearchBar}/>

        <DropdownMenu />
        <Switch>
          <Route exact path="/homes/new" component={CreateHome} />
          <Route exact path="/homes/:id" component={HomeDetail} />

          <Route exact path="/home" component={() => <HomeIndex cache={cache} />} />
          <Route exact path="/" component={() => <MapSearchBar />} />
          <Route exact path="/watchlist" component={Watchlist} />
          <Redirect to="/" />
        </Switch>
      </div>
      )}
      </ApolloConsumer>
    </HashRouter>
  );
};

export default App;