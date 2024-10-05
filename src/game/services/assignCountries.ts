
//shuffle countries
//shuffle deck / deal shuffled deck
//load map

import { GameStateRecord, phase } from "../../common/types"
import { GameState} from '../../common/types'
import GameStateController from './gameState'
import { Country, Player } from "../../common/types";



async function assignCountries(countries: Country[], players: Player[], gameID: string) {
    console.log('assigning countries begin')
    let totalCountries = countries.length
    let countriesDivided = Math.floor(totalCountries / players.length)
    let extraCountries = totalCountries % players.length
    let countriesInsert: Country [];
    try {
    for (let i=0; i<totalCountries; i++){
        if (i===0) {
            countriesInsert = countries
        }
        countriesInsert[i].ownerID = ((i+players.length) % players.length + 1).toString();
        countriesInsert[i].armies = 1;
        
    }} catch (error) {console.debug(error)
    console.debug(countriesInsert)}
    console.log('assigning countries')
    
    return countriesInsert
}

export default assignCountries

