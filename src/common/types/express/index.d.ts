import { Knex } from 'knex';
import { Logger } from '../../util/riskLogger';

export {};

declare global {
  namespace Express {
    export interface Request {
      log: OppityLogger;
      db: Knex;
    }
  }
}
