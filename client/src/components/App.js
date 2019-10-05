import React from "react";
// import React, { Component } from "react";
// import gql from "graphql-tag";
// import { Query } from "react-apollo";
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomeIndex from "./homes/HomeIndex";
import Login from "./Login";
import Register from "./Register";
import AuthRoute from '../util/route_util'
import Nav from "./Nav";
import HomeDetail from './homes/HomeDetail';
import CreateHome from './homes/CreateHome';
import Search from './search/Search'

const App = () => {
  return (
    <HashRouter>
      <div>
        <Nav />
        <h1>zBay Store</h1>
        <Switch>
          <Route exact path="/homes/new" component={CreateHome} />
          <Route exact path="/homes/:id" component={HomeDetail} />
          <AuthRoute exact path="/register" component={Register} routeType="auth" />
          <AuthRoute exact path="/login" component={Login} routeType="auth" />
          <Route path="/" component={HomeIndex} />
          <Redirect to="/" />
        </Switch>
       <Search />
      </div>
    </HashRouter>
  );
};

export default App;