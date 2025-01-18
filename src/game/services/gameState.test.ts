import db from  "../../db/db"
import GameStateController from "./gameState"
import { describe, it, expect, beforeAll } from '@jest/globals';
import { Country, CountryOwnershipRecord } from "../../common/types";



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
 
    it('should retrieve countries data', async() => {
      const gameID = "anyIDWillWork"
      const data: Country[] = await GameStateController(db).getCountries(gameID);
      expect(data.length).toEqual(42);
    })

    it('should update countries data and ownership data', async() => {
      const gameID = "42"
      let countries: Country[] = await GameStateController(db).getCountries(gameID);
      countries[0].ownerID = "42";

      await GameStateController(db).updateCountryOwnership(gameID, countries);

      countries = await GameStateController(db).getCountries(gameID);
      expect(countries[0].ownerID).toEqual("42");
    })
  });