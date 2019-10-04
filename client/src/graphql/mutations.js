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
  CREATE_HOUSE: gql`
    mutation CreateHouse($name: String!, $description: String!, $sqft: Int!) {
      newHouse(name: $name, description: $description, sqft: $sqft) { 
        _id
        name
        description
        sqft
      }
    }
  `,
}