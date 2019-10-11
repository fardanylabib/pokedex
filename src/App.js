import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Header from './components/AppHeader';
import Browser from './views/Browser';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
  uri:'https://graphql-pokemon.now.sh/graphql'
});

const App = () => (
  <div>
    <Header/>
    <ApolloProvider client = {client}>
      <Container>
        <Browser/>
      </Container>
    </ApolloProvider>
  </div>
)

export default App;