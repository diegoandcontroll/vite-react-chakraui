/* eslint-disable no-useless-catch */
/* eslint-disable no-case-declarations */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  createHttpLink,
  fromPromise,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import { theme } from './styles/theme';
import { AuthProvider } from './hooks/authContext';
import { CookiesProvider } from 'react-cookie';
import { cookies } from './utils/cookies';
import { getNewToken } from './utils/refreshToken';
import { onError } from '@apollo/client/link/error';
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});
const authLink = setContext((_, { headers }) => {
  const token = cookies.get('auth.token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          return fromPromise(
            getNewToken().catch((error) => {
              return;
            }),
          )
            .filter((value) => Boolean(value))
            .flatMap((accessToken) => {
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${accessToken}`,
                },
              });
              return forward(operation);
            });
      }
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ChakraProvider>
      </ApolloProvider>
    </CookiesProvider>
  </React.StrictMode>,
);
