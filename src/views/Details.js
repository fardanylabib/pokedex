import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import BackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import {Query} from 'react-apollo';
import gql from 'graphql-tag'; 
import {useParams,Link} from 'react-router-dom';

const MAX_ALLOWED_HP = 4000;
const MAX_ALLOWED_CP = 4000;

const useStyles = makeStyles({
    button:{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
    }
  });

const PokemonDetail = (props) =>(
    <Query query = {gql`
    {
        pokemon(name:"${props.name}"){
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
                    return <p className = 'text-center'><br/>Loading Monster...</p>
                }
                if(error){
                    return <p className = 'text-center'><br/>Error.. :(</p>
                }
                return (
                    <Grid container spacing={5} justify='space-evenly'>
                        <Grid item md={6} sm={12} xs={12}>
                            <img alt='pokemon-img' src={data.pokemon.image} className = 'card-media-large'/>
                            <h2 className = 'text-center'>{data.pokemon.name}</h2>
                            <p className = 'text-center'>{`(${data.pokemon.classification})`}</p>
                            <Divider/>
                            <br/>
                            <table width='100%'>
                                <tbody><tr>
                                    <td className='text'>
                                        <strong>Max HP</strong>
                                    </td>
                                    <td className='text-right'>
                                        {data.pokemon.maxHP}
                                    </td>
                                </tr></tbody>
                            </table>
                            <LinearProgress color='primary' variant='determinate' 
                                            value={data.pokemon.maxHP/MAX_ALLOWED_HP*100}
                            />
                            <br/>
                            <table width='100%'>
                                <tbody><tr>
                                    <td className='text'>
                                        <strong>Max CP</strong>
                                    </td>
                                    <td className='text-right'>
                                        {data.pokemon.maxCP}
                                    </td>
                                </tr></tbody>
                            </table>
                            <LinearProgress color='secondary' variant='determinate' 
                                        value={data.pokemon.maxCP/MAX_ALLOWED_CP*100}
                            />
                            <br/>
                            <table width='100%'>
                                <tbody><tr>
                                    <td className='text'>
                                        <strong>Type</strong>
                                    </td>
                                    <td className='text-right'>
                                    {
                                        data.pokemon.types.map((type)=>(
                                            <Chip key = {type} 
                                                label = {<span className = 'text'>{type}</span>}
                                                variant='outlined'
                                                color='primary'
                                                className = 'chips'
                                            />
                                        ))
                                    }
                                    </td>
                                </tr></tbody>
                            </table>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <h3 className='text'>More Details</h3>
                            <table width='100%'>
                                <tbody>
                                <tr>
                                    <td className='text'><strong>Weight</strong></td>
                                    <td className='text-right'>{`${data.pokemon.weight.minimum} - ${data.pokemon.weight.maximum}`}</td>
                                </tr>
                                <tr>
                                    <td className='text'><strong>Height</strong></td>
                                    <td className='text-right'>{`${data.pokemon.height.minimum} - ${data.pokemon.height.maximum}`}</td>
                                 </tr>
                                 </tbody>
                            </table>
                        </Grid>
                    </Grid>
                )
            }
        }
    </Query>
)

export default function Details(){
    const classes = useStyles();
    const {name} = useParams();
    return(
        <div>
            <Box my={2}>
                <PokemonDetail name={name}/>
            </Box>
            <Link to='/'>
                <Fab color='primary' aria-label='back' className = {classes.button}>
                    <BackIcon/>
                </Fab>
            </Link>
        </div>
            
    );
}
