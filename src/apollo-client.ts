import { createUploadLink } from 'apollo-upload-client';
import { onError } from "@apollo/client/link/error";
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';


export const client = new ApolloClient({
  link: ApolloLink.from([
    // Report errors to console in a user friendly format
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path}) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    createUploadLink({
      uri: '/graphql'
    })
  ]),
  cache: new InMemoryCache({
    addTypename: false
  })
});