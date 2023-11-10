import {Player, Globe, Country, GameState} from '../../controllers/lib/types'
import { countrySeed } from '../../models/seedData';



//examples for now
var example_players:Player[] = [
    {name: "steve",
    id: 0,
    countriesOccupied: [],
    continentsControlled: [],
    armies: 0,},
    {name: "bob",
    id: 1,
    countriesOccupied: [],
    continentsControlled: [],
    armies: 0},
];

var example_country:Country[] = countrySeed();

var example_globe:Globe = {
    name: "globe1",
    id: "1",
    continents: [],
    playerMax: 2,
    owner: undefined,
    countries: example_country
};

function GameStateController() {
async function initialize(): Promise<GameState> {
    const data: GameState = {
        players: example_players,
        country: example_country,
        globe: example_globe,
        phase: "start",
        turn: 0,
        activePlayerId: 1,
    }
    return data



}

async function get(): Promise<GameState> {
    const data: GameState = {
        players: example_players,
        country: example_country,
        globe: example_globe,
        phase: "start",
        turn: 0,
        activePlayerId: 1,
    }
    return data

}
async function update(currentState: GameState): Promise<GameState> {
    var data: GameState = currentState;

    return data
}
return  {
    initialize,
    get,
    update
    }
}

export default GameStateController;