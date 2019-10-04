import React from "react";
// import React, { Component } from "react";
// import gql from "graphql-tag";
// import { Query } from "react-apollo";
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import HouseIndex from "./houses/HouseIndex";
import Login from "./Login";
import Register from "./Register";
import AuthRoute from '../util/route_util'
import Nav from "./Nav";
import HouseDetail from './houses/HouseDetail';
import CreateHouse from './houses/CreateHouse';

const App = () => {
  return (
    <HashRouter>
      <div>
        <Nav />
        <h1>zBay Store</h1>
        <Switch>
          <Route exact path="/houses/new" component={CreateHouse} />
          <Route exact path="/houses/:id" component={HouseDetail} />
          <AuthRoute exact path="/register" component={Register} routeType="auth" />
          <AuthRoute exact path="/login" component={Login} routeType="auth" />
          <Route path="/" component={HouseIndex} />
          <Redirect to="/" />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default App;