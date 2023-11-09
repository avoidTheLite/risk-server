import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './commands/commandRouter';
//config

require('express-async-errors');

const app: Express = express();
app.use(cors());

app.use('/command', router);
// app.use('/newgame', newGame);



export default app