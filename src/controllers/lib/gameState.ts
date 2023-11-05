import {Player, Globe, Country, GameState} from './types'


//examples for now
var example_players:Player[] = [
    {name: "steve",
    id: 0,
    countriesOccupied: undefined,
    continentsControlled: undefined,
    armies: 0,},
    {name: "bob",
    id: 1,
    countriesOccupied: [],
    continentsControlled: [],
    armies: 0},
];

var example_country:Country[] = [{
    name: "country1",    continent: undefined,    connectedTo: undefined, armies : 0,
},
{   name: "country2",    continent: undefined,    connectedTo: undefined, armies : 0,
}];

var example_globe:Globe = {
    name: "globe1",
    id: "1",
    continents: [],
    playerMax: 2,
    owner: undefined,
    countries: example_country
};

function GameStateController() {
async function get(): Promise<GameState> {
    const data: GameState = {
        players: example_players,
        country: example_country,
        globe: example_globe,
        turn: 0,
        activePlayer: 0,
    }
    return data

}
async function update(currentState: GameState): Promise<GameState> {
    var data: GameState = currentState;

    return data
}
return  {
    get,
    update
    }
}

export default GameStateController;