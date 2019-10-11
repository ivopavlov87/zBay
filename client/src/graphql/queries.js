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
      images
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
        images
        searchField
        date
        bids {
          amount
          date
          user{
            username
          }
        }
      }
    }
  `,
  FETCH_IMAGE: gql`
      query FetchImage($id: String!){
        image(id: $id){
          id
          name
          publicId
        }
      }
    `,
  FETCH_IMAGES: gql`
      query FetchImages{
        images{
          id
          name
          publicId
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
        coordinates
        images
        bids{
          amount
          date
          user{
            username
          }
        }
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
  ADVANCED_SEARCH: gql`
    query AdvancedSearch($nameQuery: String, $categoryQuery: String, $descriptionQuery: String, $streetAddressQuery: String, $cityQuery: String, $stateQuery: String, $yearBuiltQuery: Int, $sqftQuery: Int, $zipcodeQuery: Int, $storiesQuery: Int, $bedroomsQuery: Int, $bathroomsQuery: Int, $garageQuery: Boolean, $basementQuery: Boolean){
      advancedSearch(nameQuery: $nameQuery, categoryQuery: $categoryQuery, descriptionQuery: $descriptionQuery, streetAddressQuery: $streetAddressQuery, cityQuery: $cityQuery, stateQuery: $stateQuery, yearBuiltQuery: $yearBuiltQuery, sqftQuery: $sqftQuery, zipcodeQuery: $zipcodeQuery, storiesQuery: $storiesQuery, bedroomsQuery: $bedroomsQuery, bathroomsQuery: $bathroomsQuery, garageQuery: $garageQuery, basementQuery: $basementQuery){
        _id
        name
        category{
          name
        }
        description
        streetAddress
        city
        state
        zipcode
        yearBuilt
        garage
        basement
        images
        bedrooms
        bathrooms
        sqft
        stories
      }
    }
  `,
  FETCH_USER: gql`
    query FetchUser($id: ID!) {
      user(_id: $id){
        _id
        username
        email
        watchlist{
          _id
          homes{
            name
            streetAddress
            city
            state
            zipcode
            yearBuilt
            garage
            basement
            images
            bedrooms
            bathrooms
            sqft
            stories
          }
        }
      }
    }
  `,
  FETCH_USER_ID: gql`
    {
      _id @client
    }
  `
};