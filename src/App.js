import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Header from './components/AppHeader';
import Browser from './views/Browser';
import Details from './views/Details';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {Route, Switch, BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
  uri:'https://graphql-pokemon.now.sh/graphql'
});

const App = () => (
  <div>
    <Header/>
    <ApolloProvider client = {client}>
      <BrowserRouter>
        <Container>
          <Switch>
            <Route exact path='/' component= {Browser}/>
            <Route path='/pokemon/:name' component= {Details}/>
          </Switch>
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  </div>
)

export default App;