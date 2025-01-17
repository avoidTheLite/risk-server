import {describe, expect, it} from '@jest/globals';
import CommandController from './commandController';
import GameStateController from '../game/services/gameState';
import db from '../db/db';
import { Request, Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';



describe('CommandController Integration Tests', () => {
    it('Should deploy troops to a country', async () => {
        
        let players = [
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

        const data = await GameStateController(db).initialize(players);
        const fetchedGame = await GameStateController(db).get(data.id);
        const req: Request = getMockReq(
            {
                params: {
                    id: data.id
                },
                body: {
                    targetCountry: 1,
                    troopCount: 1
                }
            }
        );
        const {res, next} = getMockRes()
        await CommandController().deployTroops(req, res);
        const updatedGame = await GameStateController(db).get(data.id);
        console.log(`Armies before: ${fetchedGame.country[0].armies} \nArmies after: ${updatedGame.country[0].armies} \nTroop Count: ${req.body.troopCount}`)
        expect(fetchedGame.country[0].armies).toEqual(updatedGame.country[0].armies-req.body.troopCount);
    });
    
})