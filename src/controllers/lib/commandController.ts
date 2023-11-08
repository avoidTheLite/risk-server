import { Player, Globe, Country, combatResult} from './types'
import { DeployTroops, Attack, Move, Reward,} from './commandTypes'
import { GameState} from './types'
import GameStateController from './gameState'
import combat from './combat'



async function CommandController() {
    async function DeployTroopsController(countryName: string, troopCount: number) {
        const currentState: GameState = await GameStateController().get();
        const activePlayer: number = currentState.activePlayer
        currentState.country.find(value => value.name == countryName).armies += troopCount;
        currentState.players[activePlayer].armies -= troopCount;
        await GameStateController().update(currentState);

    }

    async function AttackController(attackingCountry: string, troopCount: number, defendingCountry: string) {
        const currentState: GameState = await GameStateController().get();
        const attackingArmies: number = Math.min(3, currentState.country.find(value => value.name === attackingCountry).armies);
        const defendingArmies: number = Math.min(2, currentState.country.find(value => value.name === defendingCountry).armies);
        const combatResult:combatResult =  await combat(attackingArmies, defendingArmies);
        currentState.country.find(value => value.name === attackingCountry).armies -= combatResult.attackersLost;
        currentState.country.find(value => value.name === defendingCountry).armies -= combatResult.defendersLost;

        await GameStateController().update(currentState);
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
        DeployTroopsController,
        AttackController,
        // MoveController,
        // RewardController,
        // UndoController
    }
}

export default CommandController