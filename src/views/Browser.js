import React from 'react';
import Box from '@material-ui/core/Box';
import FilterSideBar from '../components/SideBar';
import Cards from '../components/Cards';
import {Query} from 'react-apollo';
import gql from 'graphql-tag'; 
import InfiniteScroll from 'react-infinite-scroller';
import BottomScrollListener from 'react-bottom-scroll-listener';


const MAX_COUNT = 200;
const INITIAL_COUNT_FILTER = 150;
const INITIAL_COUNT = 20;
const STEP_COUNT = 20;

var pokemonCount = INITIAL_COUNT; //how many pokemon will be get from GraphQL
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
                    //apply filter to data.pokemons using OR logic filter
                    for(const pokemon of data.pokemons){
                        var combineType = [...pokemon.types, ...filter];
                        const firstLength = combineType.length;
                        combineType = [...new Set(combineType)];
                        if(combineType.length < firstLength){
                            filteredData = [...filteredData, pokemon];
                        }
                    }
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
        filter = filterSet;
        console.log('filter = '+filter);
        pokemonList = [];
        if(filter.length == 0){
            pokemonCount = INITIAL_COUNT;
        }else{
            pokemonCount = INITIAL_COUNT_FILTER;
        }
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