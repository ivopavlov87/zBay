import gql from "graphql-tag";

export default {
  REGISTER_USER: gql`
    mutation RegisterUser($username: String!, $email: String!, $password: String!) {
      register(username: $username, email: $email, password: $password) { 
        token
        loggedIn
      }
    }
  `,
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,
  CREATE_HOME: gql`
    mutation CreateHome($name: String!, $description: String!, $sqft: Int!, $stories: Int!, $bedrooms: Int!, $bathrooms: Float!, $streetAddress: String!, $city: String!, $state: String!, $zipcode: Int!, $yearBuilt: Int!) {
      newHome(name: $name, description: $description, sqft: $sqft, stories: $stories, bedrooms: $bedrooms, bathrooms: $bathrooms, streetAddress: $streetAddress, city: $city, state: $state, zipcode: $zipcode, yearBuilt: $yearBuilt) { 
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
      }
    }
  `,
}