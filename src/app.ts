import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './commands/commandRouter';
import gameRouter from './game/gameRouter';
import { logMiddleware, logError } from './common/middleware/log';
import RiskLogger from './common/util/riskLogger';
import config from './config';
import { dbMiddleware } from './common/middleware/database';
import {errorHandler} from './common/middleware/errorHandler';

require('express-async-errors');

const logger = RiskLogger.configure({
    logLevel: config.get('LOG_LEVEL'),
    doc: 'app.ts',
});

const app: Express = express();
app.use(cors());
app.use(logMiddleware(logger));
app.use(dbMiddleware());

app.use('/command', router);
app.use('/game', gameRouter);
app.use(logError());
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error('Middleware caught the error', err);
    errorHandler.handleError(err, req, res);
});

export default app