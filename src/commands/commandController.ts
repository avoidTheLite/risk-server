import {Request, Response, NextFunction} from 'express'
import { Player, Globe, Country, combatResult, GameStateRecord} from '../common/types'
import { DeployTroops, Attack, Move, Reward,} from './commandTypes'
import { GameState} from '../common/types'
import GameStateController from '../game/gameState'
import combat from '../game/services/combat'
import { Engagement } from '../common/types'
import availableCommands from './services/availableCommands'
import turnStart from '../game/services/startTurn'



function CommandController() {
    async function get(req: Request, res: Response) {
        let currentState: GameStateRecord = await GameStateController().get(req.body.gameID);
        const launch = await turnStart(req.body.gameID);
        const commands = availableCommands(currentState.phase, req.body.player, currentState.activePlayerId);
        res.send(currentState);
        return commands;
    }

    async function deployTroops(req: Request, res: Response) {
        let currentState: GameStateRecord = await GameStateController().get(req.body.gameID);
        const activePlayer: number = currentState.activePlayerId;
        let targetCountry: number = req.body.targetCountry;
        currentState.country[targetCountry-1].armies += req.body.troopCount;
        if (currentState.players) {
        currentState.players[activePlayer].armies -= req.body.troopCount;
        }
        if (currentState.players[activePlayer].armies == 0) {
            currentState.phase = 'attack';
        }
        await GameStateController().update(currentState);
        res.send(currentState)

    }

    async function attack(req: Request, res: Response) {
        //Read state and get the attacking country, defending country, and troop count
        let currentState: GameStateRecord = await GameStateController().get(req.body.gameID);
        const attackingCountry: string = req.body.attackingCountry;
        const defendingCountry: string = req.body.defendingCountry;
        const troopCount: number = req.body.troopCount;
        
        
        //Check how many armies are attacking/defending within the engagement
        let attackTroopsAvailable: number = currentState.country.find(value => value.name === attackingCountry).armies-1;
        let defenderTroopsAvailable: number = currentState.country.find(value => value.name === defendingCountry).armies;
        let attackingArmies: number = Math.min(troopCount, 3, defenderTroopsAvailable);
        console.log("Defenders available - " + defenderTroopsAvailable);
        console.log("Attackers available - " + attackTroopsAvailable);
        let defendingArmies: number = Math.min(2, attackTroopsAvailable);
        const combatResult:combatResult =  await combat(attackingArmies, defendingArmies);
        console.log('attacking with ' + attackingArmies + ' armies')
        console.log('defending with ' + defendingArmies + ' armies')
        console.log(combatResult)

        //Save the state, then update it
        currentState.country.find(value => value.name === attackingCountry).armies -= combatResult.attackersLost;
        currentState.country.find(value => value.name === defendingCountry).armies -= combatResult.defendersLost;
        await GameStateController().update(currentState);
        res.send(combatResult);

        return combatResult;
    }
    // async function MoveController(sourceCountry, troopCount, destinationCountry) {
    //     const currentState: GameState = await GameStateController().get();

    //     await GameStateController().update(currentState);
    // }
    // async function RewardController(card1, card2, card3) {
    //     const currentState: GameState = await GameStateController().get();

    //     await GameStateController().update(currentState);
    // }
    // async function UndoController() {
        
    // }
    return {
        get,
        deployTroops,
        attack,
        // MoveController,
        // RewardController,
        // UndoController
    }
}

export default CommandController