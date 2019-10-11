import React from 'react';
import Box from '@material-ui/core/Box';
import FilterSideBar from '../components/SideBar';
import Cards from '../components/Cards';
import {Query} from 'react-apollo';
import gql from 'graphql-tag'; 


const MAX_COUNT = 160;
const INITIAL_COUNT = 20;
const STEP_COUNT = 20;


const PokemonFilter = (props) =>(
    <Query query = {gql`
        {
            pokemons(first:${MAX_COUNT}){
                types
            }
        }
    `}>
        {
            ({loading,error,data}) => {
                if(loading){
                    return <p>Loading...</p>
                }
                if(error){
                    return <p>Error.. :(</p>
                }
                var list=[];
                data.pokemons.map((pokemon)=>{
                    list = [...list, ...pokemon.types];
                })
                const typeList = [...(new Set(list))];
                return (
                    <FilterSideBar listFilter={typeList} handleFilter={props.handleFilter}/>
                )
            }
        }
    </Query>
)

const PokemonBrowser = (props) => {
    if(props.count >= MAX_COUNT){
     
    }
    return(
        <Query query = {gql`
            {
                pokemons(first:${props.count}) {
                    name,types,image
                }
            }
        `}>
            {
                ({loading,error,data}) => {
                    if(loading){
                        return <p>Loading...</p>
                    }
                    if(error){
                        return <p>Error.. :(</p>
                    }
                    console.log('pokemons = '+ JSON.stringify(data.pokemons));
                    return (
                        <Cards content = {data.pokemons} />
                    )
                }
            }
        </Query>
    )
}

class Browser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filter:null,
            pokemonCount:INITIAL_COUNT,
            pokemonList:null,
        }
    }

    handleFilter = (filterSet) => {
        this.setState({filter:filterSet})
    }

    handleAddList = () => {

    }

    componentDidMount(){
        
    }

    render(){
        return(
            <div>
                <Box my={2}>
                    <PokemonBrowser count={this.state.pokemonCount}/>                  
                </Box>
                
                <PokemonFilter handleFilter = {this.handleFilter}/>
            </div>
        )
    }
}
/*
<FormControlLabel
control={
<Checkbox
    checked={state.checkedB}
    onChange={handleChange('checkedB')}
    value="checkedB"
    color="primary"
/>
}
label="Primary"
/>
*/
export default Browser;