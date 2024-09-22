import config from '../../config';
import {Player, Globe, Country, GameState, GameStateRecord, CountryOwnershipRecord} from '../../common/types'
import { countrySeed } from '../../db/seeds/models/seedData';
import Knex from 'knex';
import { default as knexConfig } from '../../knexfile';
import ShortUniqueId from 'short-unique-id';
import { GAMESTATE_TABLE, COUNTRIES_TABLE, OWNERSHIP_TABLE, PLAYERS_TABLE, COUNTRIES_BASE_TABLE, PLAYERS_AI_TABLE} from '../../db/tables';
import RiskLogger from '../../common/util/riskLogger'; 
import { NoRecordsError, UpdateError } from '../../common/types/errors';
import game from '../gameController';
import { log } from 'console';



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

function GameStateController(db: Knex.Knex<any, unknown[]>) {

    async function initialize(players?: Player[]): Promise<GameStateRecord> {
        let data1: GameStateRecord = {
            id: uid.rnd(),
            turn: 0,
            phase: "deploy",
            activePlayerId: "1",
        };
        try{
            await db("gameState").insert(data1);
            let playersUpdate: Player[] = players;
            for (let i = 0; i < playersUpdate.length; i++) {
                const playerUpdate: Player = playersUpdate[i];
                playerUpdate.gameID = data1.id;
                playerUpdate.armies = 0;
                await db.from(`${PLAYERS_TABLE}`).insert(playerUpdate)  
            }

            
        }
        catch (err) {
            console.log(err)
        }
        return data1

    }
    async function get(gameID: string): Promise<GameStateRecord> {
        
        let data: GameStateRecord;    
        try {
            let players = await getPlayers(gameID);
            let countries = await getCountries(gameID);
            data = {
                players: players,
                country: countries,
                phase: null,
                turn: 0,
                activePlayerId: "", 
                id: gameID
            }
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
            "player.color",
            "player.gameID",
            // "player.created_at",
            // "player.updated_at"
            )
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
                        color: row.color,
                        // created_at: row.created_at,
                        // updated_at: row.updated_at
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
 
    async function updateCountryOwnership(gameID: string, countries: Country[]): Promise<void> {
        for (let i = 1; i <= countries.length; i++) {
            let countryUpdate: CountryOwnershipRecord = {
                countryId: countries[i-1].id.toString(),
                ownerId: countries[i-1].ownerID,
            }
            // countryUpdate.gameID = gameID;
            if (countryUpdate.ownerId !== undefined) {
                try {
                    let dbfun = await db("ownership")
                        // .from(`${OWNERSHIP_TABLE} as o`)
                        .where({countryId:countryUpdate.countryId})
                        .update({
                            ownerId: countryUpdate.ownerId,
                        // gameID: gameID,
                    })
                    console.log(dbfun)
                } catch (err: any) {
                    console.log('there was an error here man')
                }
            }
            else {
                console.debug(`Update failed for country ${countryUpdate.countryId} with PlayerID undefined.`)
            }
            
        }
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
        let countries: Country[] = currentState.country;
        let players: Player[] = currentState.players;
        let gameStateUpdate: GameStateRecord = {
            id: currentState.id,
            turn: currentState.turn,
            phase: currentState.phase,
            activePlayerId: currentState.activePlayerId,
        }

        try {
            await db.from(`${GAMESTATE_TABLE}`).where({id: gameStateUpdate.id}).update(gameStateUpdate)
        }
        catch (err: any) {
            throw new UpdateError({
                message: `Error updating gamestate table: ${err.message}`,
            })
        }
        try {
            for (let i = 0; i < countries.length; i++) {
                const countryUpdate: Country = countries[i];
                // countryUpdate.gameID = gameStateUpdate.id;
                delete countryUpdate.ownerID;
            await db.from(`${COUNTRIES_BASE_TABLE}`).where({id: countryUpdate.id}).update(countryUpdate)       
            
            }
        }
        catch (err: any) {
            throw new UpdateError({
                message: `Error updating countries table: ${err.message}`,
            })
        }
    return
    }

        //update countries table
        //update players table
        async function updatePlayers(gameID: string, players: Player[]): Promise<Player[]> {
            // let players: Player[] = currentState.players;
            let updated_players: Player[];
            console.log(`updating players with ${players}`)
            for (let i = 0; i<players.length; i++){
            try {
                updated_players = await db
                    .select(
                    "player.gameID",
                    "player.id",
                    "player.name",
                    "player.armies",
                    "player.color",
                    )
                    .from(`${PLAYERS_TABLE} as player`)
                    .where("player.gameID", gameID)
                    .where("player.id", players[i].id)
                    .orderBy("player.id", "asc")
                    .update({
                        gameID: gameID,
                        name: players[i].name,
                        color: players[i].color,
                        armies: players[i].armies,
                        id: players[i].id
            })

                console.log(`Returned from update function: ${updated_players}`); 

            }
        
            catch (err: any) {
                throw new UpdateError({
                    message: `Error updating player table: ${err.message}`,
                })
            }
        }
            return 
        }
        //update ownership table
        //update gamestate table
        

return  {
    initialize,
    get,
    getPlayers,
    getCountries,
    updateCountryOwnership,
    list,
    update,
    updatePlayers,
    }
}

export default GameStateController;