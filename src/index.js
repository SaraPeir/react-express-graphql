import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import client from './apollo';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
); 

/* import React from 'react';
import ReactDOM from 'react-dom';
import LOGO from './images/campania-logo.jpg';
import './styles.scss';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://graphql-pokemon.now.sh/'
})

const client = new ApolloClient({
  cache,
  link
})

const GET_POKEMON_INFO = gql`
{
  pokemons(first: 5) {
    name,
    image,
    evolutions {
      name,
      image
    }
  }
}`;

const Index = () => {

  const { data, loading, error } = useQuery(GET_POKEMON_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <React.Fragment>
      <h1>Pokémons</h1>
      <div className="container">
        {data &&
          data.pokemons &&
          data.pokemons.map((pokemon, index) => (
            <div key={index} className="card">
              <img src={pokemon.image} />
              <div>
                <h3>{pokemon.name}</h3>
                  {pokemon.evolutions && pokemon.evolutions.length !== 0 && (
                    <div>
                      {" "}
                      Evolutions:
                      {pokemon.evolutions.map((e, indx) => {
                        return <p key={indx}> {e.name} </p>;
                      })}
                    </div>
                  )}
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

ReactDOM.render(<ApolloProvider client={client}><Index /></ApolloProvider>, document.getElementById('root'));

// ReactDOM.render(<Index />, document.getElementById('root')); */