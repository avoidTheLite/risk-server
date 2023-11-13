import { Request, Response, NextFunction } from 'express';
import RiskLogger from '../util/riskLogger';


export function logMiddleware(riskLogger: RiskLogger) {
    return (req: Request, res: Response, next: NextFunction): void => {
      req.log = riskLogger;
      next();
    };
}
   
export function logError() {
  return (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (err) {
      if (req.log) {
        req.log.error(`Error received: ${err.message}`, { error: err });
      } else {
        const logger = RiskLogger.configure();
        logger.error(`Error received: ${err.message}`, { error: err });
      }
    }

    next();
  };
}