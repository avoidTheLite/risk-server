import GameStateController from "./services/gameState";
import { NextFunction, Request, Response } from 'express';
import gameStart from "./services/gameStart";
import {Player} from '../common/types'
import Knex from 'knex'
import {default as knexConfig} from '../knexfile'



const db = Knex(knexConfig[process.env.NODE_ENV || 'development']); 
function game() {
    const gameStateController = GameStateController(db);
    async function newGame(
        req: Request,
        res: Response,
    ) {
        console.log('new game - initializing.')
        let players: Player[] = req.body.players;
        let data = await GameStateController(db).initialize(players);
        await gameStart(db, data.id);
        res.send(data)
        return data
    }
    async function get(
        req: Request,
        res: Response,
    ){
        console.log(`getting game state: game/${req.params.id}`)
        let data = await GameStateController(db).get(req.params.id);
        res.send(data)
        return data
    }
    async function getCountries(
        req: Request,
        res: Response,
    ){
        console.log(`getting countries: game/${req.params.id}/countries`)
        let data = await GameStateController(db).getCountries(req.params.id);
        res.send(data)
        return data
    }
    async function list(
        req: Request,
        res: Response,
    ){
        console.log('list game - getting game state.')
        let data = await GameStateController(db).list();
        res.send(data)
        return data
    }
    async function getPlayers(
        req: Request,
        res: Response,  
    ){
        console.log(`getting players: game/${req.params.id}/players`)
        let data = await GameStateController(db).getPlayers(req.params.id);
        res.send(data)
        return data
    }
    async function updatePlayers(
        req: Request,
        res: Response,  
    ){
        console.log(`Updating players: game/${req.params.id}/players`)
        let data = await GameStateController(db).updatePlayers(req.params.id, req.body.players);
        res.send(data)
        return data
    }
    return {
        newGame,
        get,
        getCountries,
        updatePlayers,
        list,
        getPlayers
    }
}

export default game