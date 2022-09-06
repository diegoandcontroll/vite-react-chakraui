import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import App from './App';
import { theme } from './styles/theme';
import { setContext } from '@apollo/client/link/context';
import { token } from './utils/cookies';

import { AuthProvider } from './hooks/authContext';
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const tokenValue = token;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: tokenValue ? `Bearer ${tokenValue}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include',
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
