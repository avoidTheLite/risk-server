import { Knex } from "knex";
import { countrySeed } from "./models/seedData";
import { Country } from "../../common/types";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  console.log("seeding countries")
    await knex("countries").del();
    var countries: Country[] = countrySeed();
    let countriesTable: Country[];
    // for (let i=1;i<countries.length;i++) {
    //     countriesTable[i].id = countries[i].id;
    //     countriesTable[i].name = countries[i].name;
    //     countriesTable[i].continent = countries[i].continent;
    // };
    countriesTable = [{
      id: "1",
      name: "Alaska",
      continent: "North America",
      connectedTo: ["2", "6"]
  },
  {
      id: "2",
      name: "Alberta",
      continent: "North America",
      connectedTo: ["1", "3", "6", "9"]
  }]
  await knex("countries").insert(countriesTable);
}
