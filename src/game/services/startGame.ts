
//shuffle countries
//shuffle deck / deal shuffled deck
//load map

import { GameStateRecord, phase } from "../../common/types"
import { GameState} from '../../common/types'
import GameStateController from '../gameState'
import assignCountries from './assignCountries'



async function gameStart(gameID: string) {
    try {
        let currentState: GameStateRecord = await GameStateController().get(gameID);
        //country assignment

        let countries = currentState.country
        countries = await assignCountries(countries, currentState.players)
    
        // give each player X armies
        for (let i = 0; i < currentState.players.length; i++) {
        currentState.players[i].armies = 40 - countries.filter(value => value.ownerID === i+1).length;
    
        }
    } catch (error) {console.error = error}

    // currentState.phase = 'deploy' 
    // currentState.turn = 1

    // await GameStateController().update(currentState)
    return
}

export default gameStart

