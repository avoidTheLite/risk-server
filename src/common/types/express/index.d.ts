import { Knex } from 'knex';
import RiskLogger from '../../util/riskLogger';

export {};

declare global {
  namespace Express {
    export interface Request {
      log: RiskLogger;
      db: Knex;
    }
  }
}
