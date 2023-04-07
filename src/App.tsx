import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Router } from './router';
import { BrowserRouter } from 'react-router-dom';

const storedToken = localStorage.getItem('token');

const client = new ApolloClient({
  uri: 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql',
  cache: new InMemoryCache(),
});

console.log('token stored: ' + storedToken);

export function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}
