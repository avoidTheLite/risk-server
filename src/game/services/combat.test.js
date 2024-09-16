
import {jest, describe, expect, it} from '@jest/globals';
// let { describe, expect, it } = require('@jest/globals');
import combat from './combat';
// let combat = require('./combat');





describe('Combat tests', () => {
    //verify that sum of army losses = min (defendingDice or attackingDice)
  it('3 attackers and 2 defenders always lose 2 total armies', () => {
    
    
    let attackingDice = 3;
    let defendingDice = 2;
    let losses = Math.min(attackingDice,defendingDice);
    let result = combat(attackingDice, defendingDice);
    // let result = jest.fn(() => combat(attackingDice, defendingDice));
    expect(result.attackersLost+result.defendersLost).toBe(losses);
  });
});