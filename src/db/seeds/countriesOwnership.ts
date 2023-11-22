import { Knex } from "knex";
import { countrySeed } from "./models/seedData";
import { Country, CountryOwnershipRecord } from "../../common/types";
import { stringify } from "querystring";

export async function seed(knex: Knex): Promise<void> {
    await knex("ownership").del();// Deletes ALL existing entries

    var countries: Country[] = countrySeed();
    var ownershipTable: CountryOwnershipRecord[];
    
    for (let i=0; i<countries.length; i++) {{
      let row = {
        countryId: i.toString(),
        playerId: countries[i].ownerID
      }
      await knex("ownership").insert(row);
        
    } }
  
}