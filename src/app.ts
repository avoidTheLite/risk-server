import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './commands/commandRouter';
import gameRouter from './game/gameRouter';
//config

require('express-async-errors');

const app: Express = express();
app.use(cors());

app.use('/command', router);
app.use('/game', gameRouter);



export default app