import combat from '../../../src/controllers/lib/combat';
import { combatResult } from '../../../src/controllers/lib/types';

describe('combat validation', function(){
test('combat should return combatResult'), function(){
    const result: combatResult = combat(3, 2);
    expect(result.attackersLost).toBeLessThanOrEqual(3);
    expect(result.defendersLost).toBeLessThanOrEqual(2);
    expect(result.attackersLost).toBeGreaterThanOrEqual(0);
    expect(result.defendersLost).toBeGreaterThanOrEqual(0);
}
test('Total armies lost should be less than or equal to the greater number of armies between the attacker and defender'), function(){
    const result: combatResult = combat(3, 2);
    expect(result.attackersLost + result.defendersLost).toBeLessThanOrEqual(2);
}

// scenarios: mock out rollNSided to return combinations supporting the below
// 1. attacker wins 1
// 2. attacker wins 2
// 3. defender wins 1
// 4. defender wins 2
// 5. attacker and defender tie


})