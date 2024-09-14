
//shuffle countries
//shuffle deck / deal shuffled deck
//load map

import { GameStateRecord, phase } from "../../common/types"
import { GameState} from '../../common/types'
import GameStateController from './gameState'
import { Country, Player } from "../../common/types";
import { UpdateError } from "../../common/types/errors";



async function assignCountries(countries: Country[], players: Player[], gameID: string) {
    console.log('assigning countries begin')
    let totalCountries = countries.length
    let countriesDivided = Math.floor(totalCountries / players.length)
    let extraCountries = totalCountries % players.length
    var countriesInsert: Country [];
    try {
    for (let i=0; i<totalCountries; i++){
        if (i===0) {
            countriesInsert = countries
        }
        countriesInsert[i].ownerID = ((i+players.length) % players.length + 1).toString();
        countriesInsert[i].armies = 1;
        console.log(countriesInsert[i].id + countriesInsert[i].ownerID)
        
    }} catch (error) {console.debug(error)
    console.debug(countriesInsert)}
    console.log('assigning countries')
    try {
    await GameStateController().updateCountryOwnership(gameID, countriesInsert);
    }
    catch (err: any) {
        throw new UpdateError({message: err.message})
        return err
    }
    return countries
}

export default assignCountries

