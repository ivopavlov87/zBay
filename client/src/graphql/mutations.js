import gql from "graphql-tag";

export default {
  REGISTER_USER: gql`
    mutation RegisterUser($username: String!, $email: String!, $password: String!) {
      register(username: $username, email: $email, password: $password) { 
        token
        loggedIn
        _id
      }
    }
  `,
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
        _id
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
        _id
      }
    }
  `,
  CREATE_HOME: gql`
    mutation CreateHome($name: String!, $description: String!, $sqft: Int!, $stories: Int!, $bedrooms: Int!, $bathrooms: Float!, $streetAddress: String!, $city: String!, $state: String!, $zipcode: Int!, $yearBuilt: Int!, $garage: Boolean!, $basement: Boolean!, $searchField: String!, $images: [String], $coordinates: [Float], $price: Int!) {
      newHome(name: $name, description: $description, sqft: $sqft, stories: $stories, bedrooms: $bedrooms, bathrooms: $bathrooms, streetAddress: $streetAddress, city: $city, state: $state, zipcode: $zipcode, yearBuilt: $yearBuilt, garage: $garage, basement: $basement, searchField: $searchField, images: $images, coordinates: $coordinates, price: $price) { 
        _id
        name
        description
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
        yearBuilt
        searchField
      }
    }
  `,
  DELETE_HOME: gql`
    mutation DeleteHome($id: ID) {
      deleteHome(_id: $id) {
        _id
      }
    }
  `,
  // UPDATE_HOME: gql`
  //   mutation UpdateHome($id: ID, $name: String!, $description: String!, $sqft: Int!, $stories: Int!, $bedrooms: Int!, $bathrooms: Float!, $streetAddress: String!, $city: String!, $state: String!, $zipcode: Int!, $yearBuilt: Int!, $garage: Boolean!, $basement: Boolean!, $searchField: String!, $images: [String], $coordinates: [Float], $price: Int!) {
  //     updateHome(_id: $id, name: $name, description: $description, sqft: $sqft, stories: $stories, bedrooms: $bedrooms, bathrooms: $bathrooms, streetAddress: $streetAddress, city: $city, state: $state, zipcode: $zipcode, yearBuilt: $yearBuilt, garage: $garage, basement: $basement, searchField: $searchField, images: $images, coordinates: $coordinates, price: $price) { 
  //       _id
  //       name
  //       description
  //       streetAddress
  //       city
  //       state
  //       zipcode
  //       sqft
  //       stories
  //       bedrooms
  //       bathrooms
  //       garage
  //       basement
  //       yearBuilt
  //       searchField
  //       images
  //       price
  //     }
  //   }
  // `,
  CREATE_BID: gql`
    mutation CreateBid($homeId: ID!, $amount: Int!) {
      createBid(homeId: $homeId, amount: $amount) {
        _id
        user{
          username
        }
        home{
          streetAddress
        }
        amount
      }
    }
  `,
  CREATE_IMAGE: gql`
    mutation CreateImage($name: String!, $publicId: String!){
      createImage(name: $name, publicId: $publicId){
        id
        name
        publicId
      }
    }
  `,
  ADD_HOME: gql`
    mutation AddHome($userId: ID, $homeId: ID) {
      addHomeToWatchlist(userId: $userId, homeId: $homeId) {
        _id
        username
      }
    }
  `,
  REMOVE_HOME: gql`
    mutation RemoveHome($userId: ID, $homeId: ID) {
      removeHomeFromWatchlist(userId: $userId, homeId: $homeId) {
        _id
        username
      }
    }
  `
};