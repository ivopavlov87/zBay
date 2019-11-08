import React from "react";
import { ApolloConsumer } from "react-apollo";
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomeIndex from "./homes/HomeIndex";

import AuthRoute from '../util/route_util'
import Nav from "./nav_bar/nav";
import HomeDetail from './homes/HomeDetail';
import CreateHome from './homes/CreateHome';
import SearchBar from './search/SearchBar';
import UserProfile from "./homes/UserProfile";
import MainPage from './homes/MainPage'

import MapSearchBar from "./map/map_search";

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
        <Switch>
          <AuthRoute exact path="/homes/new" component={CreateHome} routeType="protected"/>
          <Route exact path="/homes/:id" component={HomeDetail} />
          <AuthRoute exact path="/user" component={UserProfile} routeType="protected" />
          <Route exact path="/home" component={() => <MainPage cache={cache} />} />
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