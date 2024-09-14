import { Request, Response, NextFunction } from 'express';
import knex from 'knex';
import {default as knexConfig} from '../../knexfile';
import config from '../../config';

export function dbMiddleware() {
    return (req: Request, res: Response, next: NextFunction): void => {
      const dbOptions = knexConfig[config.get('env')];
      const logOptions = {
        warn(message: string) {
          req.log.warn(message);
        },
        error(message: string) {
          req.log.error(message);
        },
        deprecate(message: string) {
          req.log.info(message);
        },
        debug(message: string) {
          req.log.debug(message);
        },
      };
      const db = knex({ ...dbOptions, log: logOptions});
      req.db = db;
      next();
    };
  }