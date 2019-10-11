import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

const MAX_ALLOWED_HP = 5000;
const MAX_ALLOWED_CP = 50;

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
                    <Grid container spacing={2} justify='space-evenly'>
                        <Grid item md={5}>
                            <img src={data.pokemon.image}/>
                            <h2 className = 'text'>{data.pokemon.name}</h2>
                            <p className = 'text'>{data.pokemon.classification}</p>
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
                            <table>
                                <tr>
                                    <td>
                                        <p className='text'><strong>Max Hp</strong></p>
                                    </td>
                                    <td>
                                        <LinearProgress
                                            color="primary"
                                            variant="determinate" 
                                            value={data.pokemon.maxHp/MAX_ALLOWED_HP*100}
                                        />
                                    </td>
                                    <td>
                                        <p className='text'>{data.pokemon.maxHp}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className='text'><strong>Max CP</strong></p>
                                    </td>
                                    <td>
                                        <LinearProgress
                                            color="secondary"
                                            variant="determinate" 
                                            value={data.pokemon.maxCP/MAX_ALLOWED_CP*100}
                                        />
                                    </td>
                                    <td>
                                        <p className='text'>{data.pokemon.maxCP}</p>
                                    </td>
                                </tr>
                            </table>
                        </Grid>
                        <Grid item md={7}>
                            <h3 className='text'>More Details</h3>
                            <table>
                                <tr>
                                    <td><p className='text'><strong>Weight</strong></p></td>
                                    <td><p className='text'>{`${data.pokemon.weight.minimum} - ${data.pokemon.weight.maximum}`}</p></td>
                                </tr>
                                <tr>
                                    <td><p className='text'><strong>Height</strong></p></td>
                                    <td><p className='text'>{`${data.pokemon.height.minimum} - ${data.pokemon.height.maximum}`}</p></td>
                                </tr>
                            </table>
                        </Grid>
                    </Grid>
                )
            }
        }
    </Query>
)

class Details extends React.Component{
    state = {

    }

    render(){
        return(
            <div>
                <Box my={2}>
                    <PokemonDetail name='Pikachu'/>
                </Box>
            </div>
                
        );
    }
}