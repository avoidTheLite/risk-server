import db from  "../../jest.setup"
import GameStateController from "./gameState"
import { describe, it, expect, beforeAll } from '@jest/globals';



describe('GameService Integration Tests', () => {
    let players: [
		{
			id: 1,
			name: "Justin",
			armies: 0,
			color: "Red"
		},
		{
			id: 2,
			name: "Joan",
			armies: 0,
			color: "Blue"
		}
	];
  
    // beforeAll(() => {
    //   gameService = new GameService(db);
    // });
  
    it('should create a new game', async () => {
      const data = await GameStateController(db).initialize(players);
      expect(data.id).toBeDefined();
    //   expect(data.players.length).toBe(players.length);
    });
  
    it('should fetch an existing game', async () => {
        const data = await GameStateController(db).initialize(players);
        const fetchedGame = await GameStateController(db).get(data.id);
      expect(fetchedGame.id).toEqual(data.id);
    });
  });