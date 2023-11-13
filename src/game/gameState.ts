import config from '../config';
import {Player, Globe, Country, GameState, GameStateRecord} from '../common/types'
import { countrySeed } from '../db/seeds/models/seedData';
import Knex from 'knex';
import { default as knexConfig } from '../knexfile';
import ShortUniqueId from 'short-unique-id';
import { GAMESTATE_TABLE } from '../db/tables';


let uid = new ShortUniqueId({length: 10});


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
    const db = Knex(knexConfig[config.get('env')]);

    async function initialize(): Promise<GameStateRecord> {
        let data1: GameStateRecord = {
            id: uid.rnd(),
            turn: 0,
            phase: "start",
            activePlayerId: 1,
        };
        try{
            await db("gameState").insert(data1);
        }
        catch (err) {
            console.log(err)
        }
        return data1

    }
    async function get(gameID: string): Promise<GameStateRecord> {
        let data: GameState = {
            players: await db("players"),
            country: example_country,
            // globe: example_globe,
            phase: "start",
            turn: 0,
            activePlayerId: 1,
            id: gameID
        }
        try {
            await db("gameState").select(
                "game.id",
                "game.turn",
                "game.phase",
                "game.activePlayerId",
                "game.created_at",
                "game.updated_at")
                .from(`${GAMESTATE_TABLE} as game`)
                .where("id", gameID)
                .orderBy("updated_at", "desc")
                .then((result) => {
                    data.turn = result[0].turn;
                    data.phase = result[0].phase;
                    data.activePlayerId = result[0].activePlayerId;
                    data.id = result[0].id;
                    data.created_at = result[0].created_at;
                    data.updated_at = result[0].updated_at;
                    return data
                })

        } catch (error) {
            
        }
        return data

    }
    async function list(): Promise<GameStateRecord[]> {
        let data = await db("gameState")
        // let data: GameStateRecord[] = await db("gameState").select(
        //     "game.id",
        //     "game.turn",
        //     "game.phase",
        //     "game.activePlayerId",
        //     "game.created_at",
        //     "game.updated_at")
        //     .from(`${GAMESTATE_TABLE} as game`)
        //     .orderBy("updated_at", "desc")
        //     .then((result) => {
        //         return result.map((row) => {
        //             return {
        //                 id: row.id,
        //                 turn: row.turn,
        //                 phase: row.phase,
        //                 activePlayerId: row.activePlayerId,
        //                 died_at: row.created_at,
        //                 updated_at: row.updated_at
        //             }
        //         })
        //     })
        return data
    }
    async function update(currentState: GameState): Promise<GameState> {
        var data: GameState = currentState;
        let gameID = "42"
        
        return data
    }
return  {
    initialize,
    get,
    list,
    update
    }
}

export default GameStateController;