// import React, { Component } from "react";
import gql from 'graphql-tag';
// import { Query } from "react-apollo";

export default {
  FETCH_HOUSES: gql`
  {
    houses {
      _id
      name
      description
      sqft
      bathrooms
    }
  }
  `,
  FETCH_HOUSE: gql`
    query FetchHouse($id: ID!) {
      house(_id: $id) {
        _id
        name
        description
        sqft
        bathrooms
    }
  }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `
}