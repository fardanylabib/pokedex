import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip'
import {Link } from 'react-router-dom';

export default function PokemonCard(props) {
  return (
    <Card className='card'>
      <Link to={`/pokemon/${props.pokemon.name}`} className = 'App-link'>
        <CardActionArea>
          <CardContent>
              <img alt='pokemon-img' src={props.pokemon.image} className = 'card-media'/>
              <h2 className = 'text-center'>
                  {
                      props.pokemon.name
                  }
              </h2>
              <div>
              {
                  props.pokemon.types.map((type)=>(
                      <Chip key = {type} 
                          label = {<span className = 'text'>{type}</span>}
                          variant='outlined'
                          color='primary'
                          className = 'chips'
                      />
                  ))
              }
              </div>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
