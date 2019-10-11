import React from 'react';
import Grid from '@material-ui/core/Grid';
import PokemonCard from './PokemonCard';

class Cards extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div>
                <Grid container spacing={2} justify='space-evenly'>
                {
                    (this.props.content !== null || this.props.content !== undefined) ?
                    this.props.content.map((content)=>(
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
}

export default Cards;