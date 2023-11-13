import { Knex } from "knex";
import { countrySeed } from "./models/seedData";
import { Country, CountryRecord } from "../../common/types";

export async function seed(knex: Knex): Promise<void> {
    await knex("countriesBase").del();// Deletes ALL existing entries

    var countries: Country[] = countrySeed();
    let countriesConnectedToRemoved: Country[] = countries.filter((country) => {return {id: country.id, name: country.name, continent: country.continent}});
    let countriesTable: CountryRecord[] = countries.map(country => ({
        id: country.id, 
        name: country.name, 
        armies: 0,
        continent: country.continent, 
        connectedTo: JSON.stringify(country.connectedTo)} ));
  await knex("countriesBase").insert(countriesTable);
}
