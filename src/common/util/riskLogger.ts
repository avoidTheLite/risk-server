import { LOG_LEVELS, LoggerOptions } from '../types';

export default class RiskLogger {
    private static instance?: RiskLogger;
    private options: LoggerOptions = {
      logLevel: LOG_LEVELS.INFO,
      doc: 'default',
    };
    private logInt: any = {
      error: 4,
      warn: 3,
      info: 2,
      debug: 1,
    };
  
    public static configure(options?: LoggerOptions) {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new RiskLogger(options);
      return this.instance;
    }
  
    private constructor(options: any) {
      this.options = { ...this.options, ...options };
    }
  
    private _shouldLog(type: string): boolean {
      const { logLevel } = this.options;
      return this.logInt[type] >= this.logInt[logLevel];
    }
  
    private _log(type: string, message: string, attrs?: object) {
      if (this._shouldLog(type)) {
        const msg = { type, message, ...attrs };
        console.log(msg);
      }
    }
    public debug(message: string, attrs?: object) {
      this._log('debug', message, attrs);
    }
    public error(message: string, attrs?: object) {
      this._log('error', message, attrs);
    }
    public info(message: string, attrs?: object) {
      this._log('info', message, attrs);
    }
    public warn(message: string, attrs?: object) {
      this._log('warn', message, attrs);
    }
  }
  