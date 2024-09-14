import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("players").del();

  await knex("players").insert([
    {
      id: "1",
      name: "Justin",
      color: "red",
      armies: 0,
      gameID: "42"

    },
    {
      id: "2",
      name: "Ernie",
      color: "black",
      armies: 0,
      gameID: "42"
    },
    {
        id: "3",
        name: "Joan",
        color: "blue",
        armies: 0,
        gameID: "42"
    },
    {
        id: "4",
        name: "Diane",
        color: "yellow",
        armies: 0,
        gameID: "42"
    }
  ]);
}
