import GameStateController from "./services/gameState";
import { NextFunction, Request, Response } from 'express';
import gameStart from "./services/gameStart";
import {Player} from '../common/types'

function game() {
    async function newGame(
        req: Request,
        res: Response,
    ) {
        console.log('new game - initializing.')
        let players: Player[] = req.body.players;
        let data = await GameStateController().initialize(players);
        await gameStart(data.id);
        res.send(data)
        return data
    }
    async function get(
        req: Request,
        res: Response,
    ){
        console.log(`getting game state: game/${req.params.id}`)
        let data = await GameStateController().get(req.params.id);
        res.send(data)
        return data
    }
    async function getCountries(
        req: Request,
        res: Response,
    ){
        console.log(`getting countries: game/${req.params.id}/countries`)
        let data = await GameStateController().getCountries(req.params.id);
        res.send(data)
        return data
    }
    async function list(
        req: Request,
        res: Response,
    ){
        console.log('list game - getting game state.')
        let data = await GameStateController().list();
        res.send(data)
        return data
    }
    return {
        newGame,
        get,
        getCountries,
        list
    }
}

export default game