import { Country } from "../common/types";

export interface Command {
    

}

export interface DeployTroops extends Command {
    country: string;
    troopCount: number;

}
export interface Reward extends Command {
    country: string[];

}

export interface Attack extends Command {
    attackingCountry: string; 
    troopCount: number;
    defendingCountry: string;
}

export interface Move extends Command {
    sourceCountry: string; 
    troopCount: number;
    destinationCountry: string;
    endTurn: boolean;
}

export interface Defend extends Command {
    defendingCountry: string;
    numberOfArmies: number;
}

export interface Undo extends Command {
}