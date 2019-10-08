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
      searchField
      bids{
        amount
        user{
          username
        }
      }
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
        searchField
        bids {
          amount
          user{
            username
          }
        }
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
  `,
  FETCH_RESULTS: gql`
    query FetchCartItems {
      results @client
    }
  `,
  FETCH_HOME_BIDS: gql`
    query FetchHomeBids($homeId: ID) {
      homeBids(_homeId: $homeId) {
        _id
        amount
        user{
          username
        }
      }
    }
  `,
  FETCH_BIDS: gql`
    query FetchBids {
      bids {
        _id
        homeId
        userId
        amount
      }
    }
  `,
  FETCH_BID: gql`
    query FetchBid($id: ID) {
      bid(_id: $id) {
        userId
        homeId
        amount
        date
      }
    }
  `,
  // GET_MODAL: gql`
  //   query IsModalOpen {
  //     modalOpen @client
  //   }
  // `
};