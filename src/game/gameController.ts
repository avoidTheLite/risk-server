import GameStateController from "./gameState";
import { NextFunction, Request, Response } from 'express';

function game() {
    async function newGame(
        req: Request,
        res: Response,
    ) {
        console.log('new game - initializing.')
        let data = await GameStateController().initialize();
        res.send(data)
        return data
    }
    async function get(
        req: Request,
        res: Response,
    ){
        console.log('get game - getting game state.')
        let data = await GameStateController().get(req.params.id);
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
        list
    }
}

export default game