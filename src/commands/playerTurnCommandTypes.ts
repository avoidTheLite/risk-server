
export interface Commands {
    available: boolean;

}

export interface DeployPhaseCommands extends Commands {
    cardMatch: string;
    deployTroops: { country: string, number: number };

}

export interface attackerCommands extends Commands {
    attack: { attackingCountry: string, numberOfArmies: number , defendingCountry: string};
    move: { sourceCountry: string, numberOfArmies: number , destinationCountry: string};
    endTurn: boolean;
}

export interface defenderCommands extends Commands {
    defend: { defendingCountry: string, numberOfArmies: number };
}

