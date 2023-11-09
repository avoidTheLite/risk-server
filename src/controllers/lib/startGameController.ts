
//shuffle countries
//shuffle deck / deal shuffled deck
//load map

import { phase } from "./types"
import { GameState} from './types'
import GameStateController from '../../common/util/gameState'



async function gameStart() {
    const currentState: GameState = await GameStateController().get();
    const activePlayer: number = currentState.activePlayerId
    currentState.players[activePlayer].armies += 5;
    
    //check if player has cards to match
    //determine reinforcement count

    currentState.phase = 'deploy' 
    console.log(currentState.players[activePlayer].name + ' turn start')
    if (currentState.players[activePlayer].armies == 0) {
        currentState.phase = 'attack';
    }
    await GameStateController().update(currentState)
    return currentState
}

export default gameStart

