import React from 'react';
import Box from '@material-ui/core/Box';
import FilterSideBar from '../components/SideBar';
import Cards from '../components/Cards';
import {Query} from 'react-apollo';
import gql from 'graphql-tag'; 
import InfiniteScroll from 'react-infinite-scroller';
import BottomScrollListener from 'react-bottom-scroll-listener';


const MAX_COUNT = 200;
const INITIAL_COUNT = 20;
const STEP_COUNT = 20;

var pokemonCount = INITIAL_COUNT;
var pokemonList = []; //container of pokemons
var filter = []; //container of type-filter

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
                    return <p className = 'text-center'><br/>Loading Filters...</p>
                }
                if(error){
                    return <p className = 'text-center'><br/>Error.. :(</p>
                }
                var typeList=[];
                data.pokemons.map((pokemon)=>{
                   pokemon.types.map((type) => {
                       if(typeList.indexOf(type) == -1){
                            typeList.push(type);
                       }
                   })
                })
                
                return (
                    <FilterSideBar listFilter={typeList} handleFilter={props.handleFilter}/>
                )
            }
        }
    </Query>
)

const PokemonBrowser = () => {
    if(pokemonCount >= MAX_COUNT){
        return (
            <>
                <Cards content = {pokemonList} />
                <p className = 'text-center'><br/>No more monsters...</p>
            </>
        )
    }
    return(
        <Query query = {gql`
            {
                pokemons(first:${pokemonCount}) {
                    name,types,image
                }
            }
        `}>
        {
            ({loading,error,data}) => {
                if(loading){
                    return(
                        <>
                            <Cards content = {pokemonList} />
                            <p className = 'text-center'><br/>Loading Monsters...</p>
                        </>
                    )
                }
                if(error){
                    return <p className = 'text-center'><br/>Error.. :(</p>
                }
                var filteredData = [];
                if(filter !== null && filter.length > 0){
                    //apply filter to data.pokemons
                    data.pokemons.map((pokemon)=>{
                        filter.map((filterType) => {
                            if(pokemon.type.indexOf(filterType) >= 0){
                                if(filteredData.length === 0){
                                    filteredData.push(pokemon);
                                }else{
                                    for(let i = 0 ;i<filteredData.length;i++){
                                        if(filteredData[i].name !== pokemon.name){
                                            filteredData.push(pokemon);
                                        }
                                    }
                                }
                            }
                        })
                    })
                }else{
                    filteredData = data.pokemons;
                }
                pokemonList = filteredData;
                return (
                    <Cards content = {pokemonList} />
                )
            }
        }
        </Query>
    )
}


class Browser extends React.Component{
    state = {
        isBottom: false,
        isNewFilter: false,
    }

    handleFilter = (filterSet) => {
        if(filter === filterSet){
            return;
        }
        filter = filterSet;
        this.setState({isNewFilter:true});
    }

    handleAddList = () => {
        console.log('add list');
        pokemonCount += STEP_COUNT;
        this.setState({isBottom:false});
    }

    componentDidMount(){
        this.setState({
            isBottom:false,
            isNewFilter: false,
        })
    }

    render(){
        return(
            <div>
                <Box my={2}>
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={this.state.isBottom}
                        loadMore={this.handleAddList}
                        // loader={<div className="text">Loading ...</div>}
                    >
                        <PokemonBrowser/> 
                    </InfiniteScroll>                 
                </Box>
                <PokemonFilter handleFilter = {this.handleFilter}/>
                <BottomScrollListener onBottom={() => this.setState({isBottom:true})}/>
            </div>
        )
    }
}
export default Browser;