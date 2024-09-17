import {describe, expect, it} from '@jest/globals';
import assignCountries from './assignCountries';
import {Country, Player} from '../../common/types';

describe('Sum of country assignment matches input country count', () => {
    it('sum of country assignment matches input country count', async () => {
        // create example objects for assignCountries function
        const gameID = "42";
        let countries: Country[] = [
            {
                id: "1",
                name: "country1", 
                continent: "continent1",
            },
            {
                id: "2",
                name: "country2",
                continent: "continent1",
            },
            {
                id: "3",
                name: "country3", 
                continent: "continent1",
            },
            {
                id: "4",
                name: "country4",
                continent: "continent1",
            },
            ];
        let players: Player[] = [
            {
                id: 1,
                name: "Justin",
                armies: 0,
                color: "Red"
            },
            {
                id: 2,
                name: "Diane",
                armies: 0,
                color: "Blue"
            },
            {
                id: 3,
                name: "Ernie",
                armies: 0,
                color: "Black"
            },
            {
                id: 4,
                name: "Joan",
                armies: 0,
                color: "Yellow"
            }
        ]
        let countryAssignment = await assignCountries(countries, players, gameID); 
        let countryCountChecker = 0 
        for (let i = 0; i < players.length; i++) {
            for (let j =0; j < countries.length; j++) {
                if (countryAssignment[j].ownerID == (players[i].id).toString()) {
                    countryCountChecker = countryCountChecker + 1
                    
                }
            }
        }  
        expect(countryCountChecker).toBe(countries.length);
    });
    
});