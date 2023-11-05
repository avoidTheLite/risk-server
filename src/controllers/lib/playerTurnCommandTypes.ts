
export interface Commands {
    

}

export interface DeployPhaseCommands extends Commands {
    cardMatch: string;
    assignReinforcements: { country: string, number: number };

}

export interface attackerCommands extends Commands {
    attack: { attackingCountry: string, numberOfArmies: number , defendingCountry: string};
    move: { sourceCountry: string, numberOfArmies: number , destinationCountry: string};
    endTurn: boolean;
}

export interface defenderCommands extends Commands {
    defend: { defendingCountry: string, numberOfArmies: number };
    taunt: string;
}

