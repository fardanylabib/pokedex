import React from 'react';
import Grid from '@material-ui/core/Grid';
import PokemonCard from './PokemonCard';

function Cards(props){
    return(
        <div>
            <Grid container spacing={2} justify='space-evenly'>
            {
                (props.content !== null || props.content !== undefined) ?
                props.content.map((content)=>(
                    <Grid item key={content.name}>
                        <PokemonCard pokemon = {content}/>
                    </Grid>
                ))
                : <span className='text'>Ooops, there is no pokemon here</span>
            }
            </Grid>
        </div>
    )
}

export default Cards;