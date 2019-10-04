// import React, { Component } from "react";
import gql from 'graphql-tag';
// import { Query } from "react-apollo";

export default {
  FETCH_HOMES: gql`
  query FetchHomes {
    homes {
      _id

      description
      sqft
      bathrooms
    }
  }
  `,
  FETCH_HOME: gql`
    query FetchHome($id: ID!) {
      home(_id: $id) {
        _id

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
  `,
  SEARCH_HOMES: gql`
    query SearchHomes($searchQuery: String) {
      homes(filter: {
        searchField: {
          contains: $searchQuery
        }}) {
          _id
          streetAddress
          zipcode
          sqft
          stories
          bedrooms
          bathrooms
          description
          yearBuilt
          basement
          garage
        }
      }
  `
}