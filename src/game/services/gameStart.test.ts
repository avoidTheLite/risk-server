import db from  "../../db/db"
import GameStateController from "./gameState"
import gameStart from "./gameStart";
import { describe, it, expect, beforeAll } from '@jest/globals';



describe('GameStart Integration Tests', () => {
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
  
    it('Assign Countries at the start of a new game', async () => {
      const data = await GameStateController(db).initialize(players);
      await gameStart(db, data.id);
      expect(data.id).toBeDefined();
    //   expect(data.players.length).toBe(players.length);
    });
  
    it('should fetch an existing game', async () => {
        const data = await GameStateController(db).initialize(players);
        const fetchedGame = await GameStateController(db).get(data.id);
      expect(fetchedGame.id).toEqual(data.id);
    });
  });