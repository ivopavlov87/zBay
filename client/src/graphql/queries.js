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
      yearBuilt
      streetAddress
      city
      state
      zipcode
      sqft
      stories
      bedrooms
      bathrooms
      garage
      basement
    }
  }
  `,
  FETCH_HOME: gql`
    query FetchHome($id: ID!) {
      home(_id: $id) {
        _id
        name
        description
        yearBuilt
        streetAddress
        city
        state
        zipcode
        sqft
        stories
        bedrooms
        bathrooms
        garage
        basement
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
      searchHomes(searchQuery: $searchQuery) {
        _id
        name
        description
        bedrooms
        bathrooms
        sqft
        stories
      }
    }
  `
}