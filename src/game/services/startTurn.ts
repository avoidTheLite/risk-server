
//shuffle countries
//shuffle deck / deal shuffled deck
//load map

import { GameStateRecord, phase } from "../../common/types"
import { GameState} from '../../common/types'
import GameStateController from './gameState'



async function turnStart(gameID: string) {
    const currentState: GameStateRecord = await GameStateController().get(gameID);
    const activePlayer: number = parseInt(currentState.activePlayerId, 10);
    if (currentState.phase == 'play') {
        currentState.players[activePlayer-1].armies += 5;
        console.log(currentState.players[activePlayer-1].name + ' turn start');
    }
    await GameStateController().updatePlayers(gameID, currentState.players);
    return currentState;
}

export default turnStart

