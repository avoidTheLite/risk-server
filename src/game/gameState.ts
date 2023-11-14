import config from '../config';
import {Player, Globe, Country, GameState, GameStateRecord} from '../common/types'
import { countrySeed } from '../db/seeds/models/seedData';
import Knex from 'knex';
import { default as knexConfig } from '../knexfile';
import ShortUniqueId from 'short-unique-id';
import { GAMESTATE_TABLE, COUNTRIES_TABLE, OWNERSHIP_TABLE, PLAYERS_TABLE, COUNTRIES_BASE_TABLE} from '../db/tables';
import RiskLogger from '../common/util/riskLogger'; 
import { NoRecordsError } from '../common/types/errors';
import game from './gameController';


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
        
        let data: GameStateRecord;    
        try {
            let players = await getPlayers("42");
            let countries = await getCountries(gameID);
            data = {
                players: players,
                country: countries,
                phase: "start",
                turn: 0,
                activePlayerId: 1,
                id: gameID
            }
            data.phase = "start"
            await db.select(
                "game.id",
                "game.turn",
                "game.phase",
                "game.activePlayerId",
                "game.created_at",
                "game.updated_at")
                .from(`${GAMESTATE_TABLE} as game`)
                .where("game.id", gameID)
                .orderBy("game.updated_at", "desc")
                .then((result) => {
                    if (result.length === 0 ){
                        throw new NoRecordsError({
                            message: `No records found for gameID: ${gameID}`,
                        })
                    }
                    data.turn = result[0].turn;
                    data.phase = result[0].phase;
                    data.activePlayerId = result[0].activePlayerId;
                    data.id = result[0].id;
                    data.created_at = result[0].created_at;
                    data.updated_at = result[0].updated_at;
                    return data
                })

        } catch (error) {
            console.log(error)
        }
        return data

    }
    async function getPlayers(gameID: string): Promise<Player[]> {
        let data: Player[] = await db.select(
            "player.id",
            "player.name",
            "player.armies",
            "player.created_at",
            "player.updated_at")
            .from(`${PLAYERS_TABLE} as player`)
            .where("player.gameID", gameID)
            .orderBy("player.id", "asc")
            .then((result) => {
                return result.map((row) => {
                    return {
                        id: row.id,
                        name: row.name,
                        // countriesOccupied: row.countriesOccupied,
                        // continentsControlled: row.continentsControlled,
                        armies: row.armies,
                        created_at: row.created_at,
                        updated_at: row.updated_at
                    }
                })
            })
        return data
    }
    async function getCountries(gameID: string): Promise<Country[]> {
        var data: Country[];
        data = await db.select(
            "country.id",
            "country.name",
            "country.continent",
            "country.armies",
            "country.created_at",
            "country.updated_at")
            .from(`${COUNTRIES_BASE_TABLE} as country`)
            // .join(`${OWNERSHIP_TABLE} as ownership`, {"ownership.countryId": "country.id"})
            // .where("gameID", gameID) TODO: add gameID to countriesBase
            .orderBy("country.id", "asc")
            .then((result) => {
                return result.map((row) => {
                    return {
                        id: row.id,
                        name: row.name,
                        continent: row.continent,
                        armies: row.armies,
                        created_at: row.created_at,
                        updated_at: row.updated_at
                    }
                })
            })
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
    async function update(currentState: GameStateRecord): Promise<GameStateRecord> {
        var data: GameStateRecord = currentState;
        let gameID = "42"
        
        return data
    }
return  {
    initialize,
    get,
    getPlayers,
    getCountries,
    list,
    update
    }
}

export default GameStateController;