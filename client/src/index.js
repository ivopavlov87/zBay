import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import Mutations from "./graphql/mutations";
import configureStore from './store/store';
import { Provider } from 'react-redux';

const store = configureStore();

const { VERIFY_USER } = Mutations;

const token = localStorage.getItem("auth-token");

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

const httpLink = createHttpLink({
  uri: "https://the-zbay.herokuapp.com/graphql",
  headers: {
    // pass our token into the header of each request
    authorization: localStorage.getItem("auth-token")
  }
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
  resolvers: {},
  clientState: {
    defaults: {},
  },
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
    _id: "",
    results: [],
    viewport: ""
  }
});

const Root = ({ store }) => {
  return (
    <Provider store={store}>
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <App />
      </ApolloHooksProvider>
    </ApolloProvider>
    </Provider>
  );
};

// if we do have a token we'll go through with our mutation
if (token) {
  client

    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn,
          _id: data.verifyUser._id,
          results: [],
          viewport: ""
        }
      });
      ReactDOM.render(<Root store={store} />, document.getElementById('root'));
    });
} else {
  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
}




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
