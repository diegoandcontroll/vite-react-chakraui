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
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import App from './App';
import { theme } from './styles/theme';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { AuthProvider } from './hooks/authContext';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});
const authLink = setContext((operation, { headers }) => {
  const token: string = cookies.get('auth.token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
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
