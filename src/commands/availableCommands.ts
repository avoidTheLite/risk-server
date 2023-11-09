

import { DeployPhaseCommands, attackerCommands, defenderCommands } from "./playerTurnCommandTypes";




function availableCommands(phase: string, player: number, activePlayerId: number) {
    let commands = {
        deployTroops: {
            available: false,
            command: 'deployTroops',
        },
        cardMatch: {
            available: false,
            command: 'cardMatch'
        },
        attack: {
            available: false,
            command: 'attack'
        },
        move: {
            available: false,
            command: 'move'
        },
        endTurn: {
            available: false,
            command: 'endTurn'
        },
        taunt: {
            available: true,
            command: 'taunt'
        },
        }
        
    
    if (player == activePlayerId) {
        if (phase == 'deploy') {
            commands.deployTroops.available = true;
            commands.cardMatch.available  = true;
        }
        if (phase == 'attack') {
            commands.attack.available = true;
            commands.move.available = true;
            commands.endTurn.available = true;
        }

    }
    return commands
}



export default availableCommands