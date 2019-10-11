import React from 'react';
import Box from '@material-ui/core/Box';
import FilterSideBar from '../components/SideBar';
import Cards from '../components/Cards';
import {Query} from 'react-apollo';
import gql from 'graphql-tag'; 
import InfiniteScroll from 'react-infinite-scroller';
import BottomScrollListener from 'react-bottom-scroll-listener';


const MAX_COUNT = 180;
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
        return (
            <>
                <Cards content = {props.pokemonList} />
                <p>No more monsters...</p>
            </>
        )
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
                        return(
                            <>
                                <Cards content = {props.pokemonList} />
                                <p>Loading...</p>
                            </>
                        )
                    }
                    if(error){
                        return <p>Error.. :(</p>
                    }
                    let filteredData = [];
                    if(props.filter !== null && props.filter.length > 0){
                        //apply filter to data.pokemons
                        data.pokemons.map((pokemon)=>{
                            props.filter.map((filterType) => {
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
                    props.setPokemonList(filteredData);
                    return (
                        <Cards content = {filteredData} />
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
            //application state
            filtersUpdated:false,
            pokemonsUpdated:false,
            isBottom:false,

            //application data
            filter:[],
            pokemonCount:INITIAL_COUNT,
            pokemonList:[],
        }
    }

    handleFilter = (filterSet) => {
        this.setState({filter:filterSet})
    }

    handleAddList = () => {
        console.log('add list');
        this.setState({
            pokemonCount: this.state.pokemonCount + STEP_COUNT, 
            pokemonsUpdated: false,
            isBottom:false
        })
    }

    setPokemonList = (newList) => {
        if(this.state.pokemonsUpdated){
            return;
        }
        this.setState({pokemonList:newList, pokemonsUpdated:true});
    }

    componentDidMount(){

    }

    componentDidUpdate(){

    }

    render(){
        const {filtersLoaded,pokemonsLoaded,isBottom} = this.state;
        return(
            <div>
                <PokemonFilter 
                    filter = {this.state.filter}
                    handleFilter = {this.handleFilter}
                />
                <Box my={2}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.handleAddList}
                        hasMore={this.state.isBottom}
                        // loader={<div className="text">Loading ...</div>}
                    >
                        <PokemonBrowser 
                            count ={this.state.pokemonCount}
                            pokemonList = {this.state.pokemonList}
                            filter ={this.state.filter}
                            setPokemonList = {this.setPokemonList}
                        /> 
                    </InfiniteScroll>                 
                </Box>
                <BottomScrollListener onBottom={() => this.setState({isBottom:true})}/>
            </div>
        )
    }
}
export default Browser;