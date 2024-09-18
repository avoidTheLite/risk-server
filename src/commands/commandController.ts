import {Request, Response, NextFunction} from 'express'
import { Player, Globe, Country, combatResult, GameStateRecord} from '../common/types'
import { DeployTroops, Attack, Move, Reward,} from './commandTypes'
import { GameState} from '../common/types'
import GameStateController from '../game/services/gameState'
import combat from '../game/services/combat'
import { Engagement } from '../common/types'
import availableCommands from './services/availableCommands'
import turnStart from '../game/services/startTurn'
import { NoTroopError, AttackError } from '../common/types/errors'



function CommandController() {
    async function get(req: Request, res: Response) {
        let currentState: GameStateRecord = await GameStateController().get(req.body.gameID);
        const commands = availableCommands(currentState.phase, req.body.player, currentState.activePlayerId);
        //TODO validate the commands
        res.send(commands);
    }

    async function deployTroops(req: Request, res: Response) {
        let currentState: GameStateRecord = await GameStateController().get(req.body.gameID); //TODO: rework to not read DB so often
        const activePlayer: number = parseInt(currentState.activePlayerId);
        let targetCountry: number = req.body.targetCountry;
        currentState.country[targetCountry-1].armies += req.body.troopCount;
        currentState.players[activePlayer-1].armies -= req.body.troopCount;
        if (currentState.players[activePlayer-1].armies == 0) {
            currentState.phase = 'attack';
        }
        await GameStateController().update(currentState);
        await GameStateController().updatePlayers(req.body.gameID, currentState.players);
        res.send(currentState)

    }

    async function attack(req: Request, res: Response) {
        //Read state and get the attacking country, defending country, and troop count
        let currentState: GameStateRecord = await GameStateController().get(req.body.gameID);
        const attackingCountryID: number = parseInt(req.body.attackingCountry);
        const defendingCountryID: number = parseInt(req.body.defendingCountry);
        const troopCount: number = req.body.troopCount;
        
        
        //Check how many armies are attacking/defending within the engagement
        let combatInput = {
            attackingArmies: 0,
            defendingArmies: 0
        };
        try {
        var attackTroopsAvailable: number = currentState.country[attackingCountryID-1].armies-1;
        if (attackTroopsAvailable<=0) {
            throw new NoTroopError('no troops available to attack')
        }
        var defenderTroopsAvailable: number = currentState.country[defendingCountryID-1].armies;
        if (defenderTroopsAvailable<=0) {
            throw new NoTroopError('no troops available to defend')
        }
        combatInput.attackingArmies= Math.min(troopCount, 3, attackTroopsAvailable);
        console.log("Defenders available - " + defenderTroopsAvailable);
        console.log("Attackers available - " + attackTroopsAvailable);
        combatInput.defendingArmies= Math.min(2, defenderTroopsAvailable);
        console.log('attacking with ' + combatInput.attackingArmies + ' armies')
        console.log('defending with ' + combatInput.defendingArmies + ' armies')
        
        }
        catch (err:any){
            if (err.name === 'NoTroopError') {
            req.log.info("no troops for country", {combatInput})
            } else {return err
        }}
        
        const combatResult:combatResult =  await combat(combatInput.attackingArmies, combatInput.defendingArmies);
        console.log(combatResult)

        //Save the state, then update it
        currentState.country[attackingCountryID-1].armies -= combatResult.attackersLost;
        currentState.country[defendingCountryID-1].armies -= combatResult.defendersLost;
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