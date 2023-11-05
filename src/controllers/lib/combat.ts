import { combatResult } from "./types";


function rollNSided(sides: number): number {
    let inputSides: number = sides
    console.log('rollNSided, inputSides = ' + inputSides);
    let rollResult = Math.ceil(inputSides*Math.random());
return rollResult
}


function combat(attackingDice: number, defendingDice: number) {
    let attackRolls: number[] = []
    let defendRolls: number[] = []
    let result: combatResult = { attackersLost: 0, defendersLost: 0 }
    
    for (let i = 0; i < attackingDice; i++) {
        attackRolls.push(rollNSided(6))
    }
    for (let i = 0; i < defendingDice; i++) {
        defendRolls.push(rollNSided(6))
    }
    attackRolls.sort();
    defendRolls.sort();
    let bouts: number = Math.min(attackingDice, defendingDice)
    for (let i = 0; i < bouts; i++) {
        if (attackRolls[i] > defendRolls[i]) {
            result.defendersLost += 1;
        } else {
            result.attackersLost += 1;
        }
    }
return result
}

export default combat