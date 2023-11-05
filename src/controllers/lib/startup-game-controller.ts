
//shuffle countries
//shuffle deck / deal shuffled deck
//load map
interface Player {
    name: String,
    playerID: String,
    countriesOccupied?: Array<Country>
    continentsControlled?:Continent
}
interface globe {
    name: String,
    mapID: String,
    continents: Array<Continent>
    playerMax: Number,
    owner?: Player,
    countries: Array<Country>
  }
  
interface Country {
    name: String
    continent?: Continent
    connectedTo?: Array<Country>
}

interface Continent {
    name: String
    countries?: Array<Country>
    points: number
}


export function loadMap(globeID: string): Promise<globe>{
    
    //pull class
    // class: Globe
    // name: String
    // mapID: String
    // connectedTo: MapID
    // continent: Continent
    // playerMax: Number
    // owner: String
    // country: Countries
    
    //assign owner

return 
}


