import gql from 'graphql-tag';

export default {
  FETCH_HOMES: gql`
    query FetchHomes {
      results @client
      viewport @client
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
        price
        basement
        images
        date
        coordinates
        searchField
        bids {
          amount
          date
          user {
            username
            _id
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
        price
        images
        searchField
        date
        bids {
          amount
          date
          user {
            username
            _id
          }
        }
      }
    }
  `,
  FETCH_IMAGE: gql`
    query FetchImage($id: String!) {
      image(id: $id) {
        id
        name
        publicId
      }
    }
  `,
  FETCH_IMAGES: gql`
    query FetchImages {
      images {
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
        price
        bids {
          amount
          date
          user {
            username
            _id
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
  FETCH_USER_HOMES: gql`
    query FetchUserHomes($id: ID!) {
      userHomes(_userId: $id) {
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
        price
        basement
        images
        coordinates
        searchField
        bids {
          amount
          date
          user {
            username
            _id
          }
        }
      }
    }
  `,
  FETCH_HOME_BIDS: gql`
    query FetchHomeBids($homeId: ID) {
      homeBids(_homeId: $homeId) {
        _id
        amount
        user {
          username
          _id
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
  FETCH_USER: gql`
    query FetchUser($id: ID!) {
      user(_id: $id) {
        _id
        username
        email
        watchlist {
          _id
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
          price
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