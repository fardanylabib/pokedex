import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri:'https://graphql-pokemon.now.sh/graphql'
});

//test 1
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//test 2
it('succsessfully load types with graphQL', async () => {
  const apolloTest = (myClient) => {
    const expected0 = ["Grass", "Poison"];
    const expected1 = ["Grass", "Poison"];
    const expected2 = ["Grass", "Poison"];
    const expected3 = ["Fire"];
    const expected11 = ["Bug","Flying"];
    
    return(
      <ApolloProvider client = {myClient}>
        <Query query = {gql`
          {
              pokemons(first:200){
                  types
              }
          }
        `}>
          {
            ({loading,error,data}) => {
              if(loading){
                return null;
              }
              if(error){
                return null;
              }
              
              expect(data.pokemons.types[0]).toBeEqual(expected0);
              expect(data.pokemons.types[1]).toBeEqual(expected1);
              expect(data.pokemons.types[2]).toBeEqual(expected2);
              expect(data.pokemons.types[3]).toBeEqual(expected3);
              expect(data.pokemons.types[11]).toBeEqual(expected11);
            }
          }
        </Query>
      </ApolloProvider>
    )
  }
  apolloTest(client);
})

//test 3
it('has 151 pokemons in database', async () => {
  const apolloTest = (myClient) => { 
    return(
      <ApolloProvider client = {myClient}>
        <Query query = {gql`
          {
              pokemons(first:200){
                  types
              }
          }
        `}>
          {
            ({loading,error,data}) => {
              if(loading){
                return null;
              }
              if(error){
                return null;
              }
              expect(data.pokemons.types.length).toBeEqual(151);
            }
          }
        </Query>
      </ApolloProvider>
    )
  }
  apolloTest(client);
})

//test 4
it('succsessfully load 20 pokemons with graphQL', async () => {
  const apolloTest = (myClient) => {
    const expected0 = "Bulbasaur";
    const expected1 = "Ivysaur";
    const expected2 = "Venusaur";
    const expected3 = "Charmander";
    const expected19 = "Raticate";
    
    return(
      <ApolloProvider client = {myClient}>
        <Query query = {gql`
          {
              pokemons(first:20){
                  name, types, image
              }
          }
        `}>
          {
            ({loading,error,data}) => {
              if(loading){
                return null;
              }
              if(error){
                return null;
              }
              
              expect(data.pokemons.name[0]).toBeEqual(expected0);
              expect(data.pokemons.name[1]).toBeEqual(expected1);
              expect(data.pokemons.name[2]).toBeEqual(expected2);
              expect(data.pokemons.name[3]).toBeEqual(expected3);
              expect(data.pokemons.types[19]).toBeEqual(expected19);
            }
          }
        </Query>
      </ApolloProvider>
    )
  }
  apolloTest(client);
})


//test 5
it('succsessfully load 20 pokemon images with graphQL', async () => {
  const apolloTest = (myClient) => {
    const expected0 = "https://img.pokemondb.net/artwork/bulbasaur.jpg";
    const expected1 = "https://img.pokemondb.net/artwork/ivysaur.jpg";
    const expected2 = "https://img.pokemondb.net/artwork/venusaur.jpg";
    const expected3 = "https://img.pokemondb.net/artwork/charmander.jpg";
    const expected19 = "https://img.pokemondb.net/artwork/raticate.jpg";
    
    return(
      <ApolloProvider client = {myClient}>
        <Query query = {gql`
          {
              pokemons(first:20){
                  name, types, image
              }
          }
        `}>
          {
            ({loading,error,data}) => {
              if(loading){
                return null;
              }
              if(error){
                return null;
              }
              
              expect(data.pokemons.image[0]).toBeEqual(expected0);
              expect(data.pokemons.image[1]).toBeEqual(expected1);
              expect(data.pokemons.image[2]).toBeEqual(expected2);
              expect(data.pokemons.image[3]).toBeEqual(expected3);
              expect(data.pokemons.image[19]).toBeEqual(expected19);
            }
          }
        </Query>
      </ApolloProvider>
    )
  }
  apolloTest(client);
})

//test 6
it('succsessfully load Charmeleon details with graphQL', async () => {
  const apolloTest = (myClient) => {
    const expectName = 'Charmeleon';
    const expectTypes = ['Fire'];
    const expectClass = 'Flame Pokémon';
    const expectWeak = ["Water","Ground","Rock"];
    const expectResist = ["Fire","Grass","Ice","Bug","Steel", "Fairy"];
    return(
      <ApolloProvider client = {myClient}>
        <Query query = {gql`
          {
            pokemon(name:"${expectName}"){
              name,
              weight {
                minimum
                maximum
              },
              height {
                minimum
                maximum
              },
              classification,
              types,
              resistant,
              weaknesses,
                attacks{
                fast {
                  name
                  type
                  damage
                },
                special {
                  name
                  type
                  damage
                }
              },
              fleeRate,
              maxCP,
              evolutions {
                id
              },
              evolutionRequirements {
                amount
                name
              },
              maxHP,
              image,
            }
          }
        `}>
          {
            ({loading,error,data}) => {
              if(loading){
                return null;
              }
              if(error){
                return null;
              }
              
              expect(data.pokemon.name).toBeEqual(expectTypes);
              expect(data.pokemon.types).toBeEqual(expectTypes);
              expect(data.pokemon.classification).toBeEqual(expectClass);
              expect(data.pokemon.weaknesses).toBeEqual(expectWeak);
              expect(data.pokemon.resistant).toBeEqual(expectResist);
            }
          }
        </Query>
      </ApolloProvider>
    )
  }
  apolloTest(client);
})


