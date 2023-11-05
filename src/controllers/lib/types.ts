export interface Player {
    name: string;
    id: number;
    countriesOccupied?: Country[];
    continentsControlled?: Continent[];
    color?: string;
    armies: number;
}

export interface Globe {
    name: string;
    id: string;
    continents: Continent[];
    playerMax: Number;
    owner?: Player;
    countries: Country[];
}

export interface Country {
    name: string;
    continent?: Continent;
    connectedTo?: Country[];
    armies: number;
}

export interface Continent {
    name: string;
    countries?: Country[];
    points: number;
}

export interface GameState {
    players: Player[],
    country: Country[],
    globe: Globe,
    turn: Number
    activePlayer: number
}

export interface combatResult {
    attackersLost: number;
    defendersLost: number;
}