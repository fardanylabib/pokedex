import React from 'react';
import Box from '@material-ui/core/Box';
import SideBar from '../components/SideBar';

class Browser extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <SideBar/>
                <Box my={2}>
                    Pokémon[a] (English: /ˈpoʊkɪˌmɒn, -ki-, -keɪ-/),[1][2][3] also known as Pocket Monsters[b] in Japan, is a media franchise managed by The Pokémon Company, a Japanese consortium between Nintendo, Game Freak, and Creatures.[4] The franchise copyright is shared by all three companies, but Nintendo is the sole owner of the trademark.[5] The franchise was created by Satoshi Tajiri in 1995,[6] and is centered on fictional creatures called "Pokémon", which humans, known as Pokémon Trainers, catch and train to battle each other for sport. The English slogan for the franchise is "Gotta Catch 'Em All".[7][8] Works within the franchise are set in the Pokémon universe.
                    The franchise began as Pokémon Red and Green (later released outside of Japan as Pokémon Red and Blue), a pair of video games for the original Game Boy that were developed by Game Freak and published by Nintendo in February 1996. It soon became a media mix franchise adapted into various different media.[9] Pokémon has since gone on to become the highest-grossing media franchise of all time,[10][11][12] with $90 billion in total franchise revenue.[13][14] The original video game series is the second best-selling video game franchise (behind Nintendo's Mario franchise)[15] with more than 340 million copies sold[16] and 1 billion mobile downloads,[17] and it spawned a hit anime television series that has become the most successful video game adaptation[18] with over 20 seasons and 1,000 episodes in 169 countries.[16] In addition, the Pokémon franchise includes the world's top-selling toy brand,[19] the top-selling trading card game[20] with over 27.2 billion cards sold,[16] an anime film series, a live-action film, books, manga comics, music, merchandise, and a theme park. The franchise is also represented in other Nintendo media, such as the Super Smash Bros. series.
                    In November 2005, 4Kids Entertainment, which had managed the non-game related licensing of Pokémon, announced that it had agreed not to renew the Pokémon representation agreement. The Pokémon Company International oversees all Pokémon licensing outside Asia.[21] The franchise celebrated its tenth anniversary in 2006.[22] In 2016, The Pokémon Company celebrated Pokémon's 20th anniversary by airing an ad during Super Bowl 50 in January, issuing re-releases of Pokémon Red and Blue and the 1998 Game Boy game Pokémon Yellow as downloads for the Nintendo 3DS in February, and redesigning the way the games are played.[23][24] The mobile augmented reality game Pokémon Go was released in July 2016.[25] The most recently released games in the main series, Pokémon: Let's Go, Pikachu! and Let's Go, Eevee!, were released worldwide on the Nintendo Switch on November 16, 2018. The first live-action film in the franchise, Pokémon Detective Pikachu, based on Detective Pikachu, was released in 2019.[10] The upcoming and latest games in the main series, Pokémon Sword and Shield, are scheduled to be released worldwide on the Nintendo Switch on November 15, 2019.[26]`
                </Box>
                
            </div>
        )
    }
}

export default Browser;