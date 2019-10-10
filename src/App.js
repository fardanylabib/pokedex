import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Header from './components/AppHeader';
import Browser from './views/Browser';

export default function App(props) {
  return (
    <div>
      <Header/>
      <Container>
        <Browser/>
      </Container>
    </div>
  );
}