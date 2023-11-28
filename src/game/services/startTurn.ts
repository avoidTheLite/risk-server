
//shuffle countries
//shuffle deck / deal shuffled deck
//load map

import { GameStateRecord, phase } from "../../common/types"
import { GameState} from '../../common/types'
import GameStateController from './gameState'



async function turnStart(gameID: string) {
    const currentState: GameStateRecord = await GameStateController().get(gameID);
    const activePlayer: number = parseInt(currentState.activePlayerId, 10);
    currentState.players[activePlayer-1].armies += 5;

    //check if player has cards to match
    //await checkCards(cards, activePlayer)
    //determine reinforcement count

    currentState.phase = 'deploy';
    console.log(currentState.players[activePlayer].name + ' turn start');
    if (currentState.players[activePlayer].armies === 0) {
        currentState.phase = 'attack';
    }
    await GameStateController().update(currentState);
    return currentState;
}

export default turnStart

