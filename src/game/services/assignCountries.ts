
//shuffle countries
//shuffle deck / deal shuffled deck
//load map

import { GameStateRecord, phase } from "../../common/types"
import { GameState} from '../../common/types'
import GameStateController from '../gameState'
import { Country, Player } from "../../common/types";



async function assignCountries(countries: Country[], players: Player[]) {
    let totalCountries = countries.length
    let countriesDivided = Math.floor(totalCountries / players.length)
    let extraCountries = totalCountries % players.length
    countries.map(value => ({value, sort:Math.random()}))
    for (let i = 1; i < players.length + 1; i++) {
        for (let j = 1; j <= countriesDivided; j++, i++) {
            let newID = j+(i-1)*countriesDivided-1;
            countries[newID].ownerID = i;
        }
    }
    if (extraCountries === 0) return countries
    else{
        for (let i = 1; i <= extraCountries; i++) {
            let index =players.length*countriesDivided;
            countries[index+i-1].ownerID = i;
        }
         return countries
    }
}

export default assignCountries

