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
    mutation CreateHome($name: String!, $description: String!, $sqft: Int!, $stories: Int!, $bedrooms: Int!, $bathrooms: Float!) {
      newHome(name: $name, description: $description, sqft: $sqft, stories: $stories, bedrooms: $bedrooms, bathrooms: $bathrooms) { 
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
}