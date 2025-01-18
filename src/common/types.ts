export interface Player {
    name: string;
    id: number;
    countriesOccupied?: Country[];
    continentsControlled?: Continent[];
    color?: string;
    armies: number;
    gameID?: string;
}

export interface Globe {
    name: string;
    id: string;
    continents: Continent[];
    playerMax: Number;
    countries: Country[];
}

export interface Country {
    name?: string;
    id: string;
    continent?: string;
    connectedTo?: string[];
    ownerID?: string;
    armies?: number;
}

export interface CountryRecord {
    name?: string;
    id: string;
    continent?: string;
    connectedTo?: string;
    armies?: number;

}

export interface CountryOwnershipRecord {
    countryId: string;
    ownerID: string;
}

export interface Continent {
    name: string;
    countries?: Country[];
    points: number;
}

export interface GameState {
    players: Player[],
    country: Country[],
    globe?: Globe,
    turn: Number,
    phase: phase,
    activePlayerId: number,
    id: string
    created_at?: string,
    updated_at?: string
}

export interface GameStateRecord {
    id: string;
    turn: number;
    phase: phase;
    activePlayerId: string;
    created_at?: string,
    updated_at?: string,
    died_at?: string,
    players?: Player[],
    country?: Country[],
}

export type phase = "start" | "deploy" | "play" | "end"

export interface combatResult {
    attackersLost: number;
    defendersLost: number;
}

export interface Engagement {
    attackingCountry: string;
    defendingCountry: string;
    troopCount: number;
    attackersLost?: number;
    defendersLost?: number;
    attackerRolls?: number[];
    defenderRolls?: number[];
}

interface Logger {
    debug: Function;
    error: Function;
    info: Function;
    warn: Function;
}

export interface LogRequest extends Request {
    log: Logger;
}
export enum LOG_LEVELS {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'debug',
}
  
export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface LoggerOptions {
    logLevel: any;
    doc: string;
}

export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
  }