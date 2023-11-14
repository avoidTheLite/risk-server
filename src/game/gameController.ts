import GameStateController from "./gameState";
import { NextFunction, Request, Response } from 'express';
import gameStart from "./services/startGame";

function game() {
    async function newGame(
        req: Request,
        res: Response,
    ) {
        console.log('new game - initializing.')
        let data = await GameStateController().initialize();
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