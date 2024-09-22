
//shuffle countries
//shuffle deck / deal shuffled deck
//load map

import { KeyExportOptions } from "crypto";
import { GameStateRecord, phase } from "../../common/types"
import { GameState} from '../../common/types'
import GameStateController from './gameState'
import Knex from "knex";



async function turnStart(db: Knex.Knex<any, unknown[]>, gameID: string) {
    const currentState: GameStateRecord = await GameStateController(db).get(gameID);
    const activePlayer: number = parseInt(currentState.activePlayerId, 10);
    if (currentState.phase == 'play') {
        currentState.players[activePlayer-1].armies += 5;
        console.log(currentState.players[activePlayer-1].name + ' turn start');
    }
    await GameStateController(db).updatePlayers(gameID, currentState.players);
    return currentState;
}

export default turnStart

