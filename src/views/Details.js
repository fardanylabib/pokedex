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

const MAX_ALLOWED_HP = 4500;
const MAX_ALLOWED_CP = 4500;
const MAX_ALLOWED_DMG = 130;

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
                let evolutionCount = 1;
                return (
                    <Grid container spacing={5} justify='space-evenly'>
                        <Grid item md={6} sm={12} xs={12}>
                            <img alt='pokemon-img' src={data.pokemon.image} className = 'card-media-large'/>
                            <h1 className = 'text-center'>{data.pokemon.name}</h1>
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
                            <h2 className='text'>MORE DETAILS</h2>
                            <table width='100%' id='table'>
                                <thead><h3 className='text'>DIMENSION</h3></thead>
                                <tbody>
                                    <tr>
                                        <td className='text'>Weight</td>
                                        <td className='text-right'>{`${data.pokemon.weight.minimum} - ${data.pokemon.weight.maximum}`}</td>
                                    </tr>
                                    <tr>
                                        <td className='text'>Height</td>
                                        <td className='text-right'>{`${data.pokemon.height.minimum} - ${data.pokemon.height.maximum}`}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Divider/>
                            <table width='100%' id='table'>
                                <thead><h3 className='text'>NATURE</h3></thead>
                                <tbody>
                                    <tr>
                                        <td className='text'>Resistant</td>
                                        <td className='text-right'>
                                            {
                                                data.pokemon.resistant.map((type)=>(
                                                    <Chip key = {type} 
                                                        label = {<span className = 'text'>{type}</span>}
                                                        variant='outlined'
                                                        color='primary'
                                                        className = 'chips'
                                                    />
                                                ))
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text'>Weaknesses</td>
                                        <td className='text-right'>
                                            {
                                                data.pokemon.weaknesses.map((type)=>(
                                                    <Chip key = {type} 
                                                        label = {<span className = 'text'>{type}</span>}
                                                        variant='outlined'
                                                        color='secondary'
                                                        className = 'chips'
                                                    />
                                                ))
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Divider/>
                            <table width='100%' id='table'>
                                <thead><h3 className='text'>ABILITY</h3></thead>
                                <tbody>
                                    <tr>
                                        <td className='text'><strong>Fast Attacks Damage</strong></td>
                                    </tr>
                                    {
                                        data.pokemon.attacks.fast.map((attacks)=>(
                                            <tr key={attacks.name}>
                                                <td className = 'text'>{`- ${attacks.name} (${attacks.type})`}</td>
                                                <td className = 'large-column'>
                                                    <a className = 'text'>{attacks.damage}</a>
                                                    <LinearProgress color='primary' variant='determinate' 
                                                        value={attacks.damage/MAX_ALLOWED_DMG*100}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td className='text'><br/><strong>Special Attacks Damage</strong></td>
                                    </tr>
                                    {
                                        data.pokemon.attacks.special.map((attacks)=>(
                                            <tr key={attacks.name}>
                                                <td className = 'text'>{`- ${attacks.name} (${attacks.type})`}</td>
                                                <td className = 'large-column'>
                                                    <a className = 'text'>{attacks.damage}</a>
                                                    <LinearProgress color='primary' variant='determinate' 
                                                        value={attacks.damage/MAX_ALLOWED_DMG*100}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td className='text'><br/><strong>Flee Rate</strong></td>
                                        <td className='text'><br/>{data.pokemon.fleeRate}</td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                            <Divider/>
                            <h3 className='text'>EVOLUTIONS</h3>
                            {
                                data.pokemon.evolutions !== null ?
                                data.pokemon.evolutions.map((evo)=>(
                                    <Evolutions
                                        key={evo.id} id={evo.id}
                                        count={evolutionCount++}
                                        requirements = {data.pokemon.evolutionRequirements}    
                                    />
                                ))
                                :
                                <p className = 'text'>No higher evolution</p>
                            } 
                        </Grid>
                    </Grid>
                )
            }
        }
    </Query>
)

const Evolutions = (props) =>(
    <Query query = {gql`
    {
        pokemon(id:"${props.id}"){
           name, image 
        }
    }
    `}>
     {
        ({loading,error,data})=> {
            if(loading){
                return <p className = 'text-center'><br/>Loading Monster...</p>
            }
            if(error){
                return <p className = 'text-center'><br/>Error.. :(</p>
            }
            return(
                <div>
                    <Link to = {`/pokemon/${data.pokemon.name}`}>
                        <img alt='evo-img' src={data.pokemon.image} className = 'card-media-left'/>
                    </Link>
                    <p className = 'text'>
                        { 
                            props.count === 1? 
                            `${props.count}. ${data.pokemon.name} (requires ${props.requirements.amount} ${props.requirements.name})`:
                            `${props.count}. ${data.pokemon.name}`
                        }
                    </p>
                </div>
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
