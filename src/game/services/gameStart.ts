
//shuffle countries
//shuffle deck / deal shuffled deck
//load map

import { GameStateRecord, phase } from "../../common/types"
import { GameState} from '../../common/types'
import GameStateController from './gameState'
import assignCountries from './assignCountries'
import { UpdateError } from "../../common/types/errors";
import { Country, Player } from "../../common/types";



async function gameStart(gameID: string) {
    try {
        let currentState: GameStateRecord = await GameStateController().get(gameID);
        currentState.country = await GameStateController().getCountries(gameID);
        currentState.turn = 0
        currentState.activePlayerId = "1"
        currentState.players = await GameStateController().getPlayers(gameID);
        // currentState.players = await GameStateController().getPlayers("42");//TODO: rework when players come from AI table.
            // await GameStateController().addPlayers(gameID, currentState.players)
        //country assignment

        let countries = currentState.country
        let countriesInsert: Country[] = []
        try {
            countries = await assignCountries(countries, currentState.players, gameID)
            await GameStateController().updateCountryOwnership(gameID, countriesInsert);
            }
            catch (err: any) {
                throw new UpdateError({message: err.message})
                return err
            }
    
        // give each player X armies
        for (let i = 0; i < currentState.players.length; i++) {
        

        currentState.players[i].armies = 40 - countries.filter(value => value.ownerID === (i+1).toString()).length; //TODO: vary starting armies based on player count
        
        }
        try{
        await GameStateController().updatePlayers(gameID, currentState.players)
    
        } catch (err: any) {
            throw new UpdateError({message: err.message})
            return err
        }
    } catch (error) {console.debug(error)}
    return
}

export default gameStart

