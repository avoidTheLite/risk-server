import GameStateController from "./gameState";
import { NextFunction, Request, Response } from 'express';

function game() {
    async function newGame(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const players = req.body.players;
        const data = await GameStateController().initialize;

       
        res.send(data)
        return data
    }
    return {
        newGame
    }
}

export default game