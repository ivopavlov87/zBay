import React from "react";
// import React, { Component } from "react";
// import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom"

import Queries from "../../graphql/queries";
const { FETCH_HOMES } = Queries;

const HomeIndex = () => {
  return (
    <Query query={FETCH_HOMES}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <ul>
            {data.homes.map(home => (
              <Link key={home._id} to={`/homes/${home._id}`}>
                <li>{home.name}</li>
              </ Link>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default HomeIndex;
