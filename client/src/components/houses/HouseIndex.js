import React from "react";
// import React, { Component } from "react";
// import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom"

import Queries from "../../graphql/queries";
const { FETCH_HOUSES } = Queries;

const HouseIndex = () => {
  return (
    <Query query={FETCH_HOUSES}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <ul>
            {data.houses.map(house => (
              <Link key={house._id} to={`/houses/${house._id}`}>
                <li>{house.name}</li>
              </ Link>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default HouseIndex;
