// import React, { Component } from "react";
import gql from 'graphql-tag';
// import { Query } from "react-apollo";

export default {
  FETCH_HOMES: gql`
  query FetchHomes {
    homes {
      _id
      name
      description
      sqft
      stories
      bedrooms
      bathrooms
    }
  }
  `,
  FETCH_HOME: gql`
    query FetchHome($id: ID!) {
      home(_id: $id) {
        _id
        name
        description
        sqft
        stories
        bedrooms
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