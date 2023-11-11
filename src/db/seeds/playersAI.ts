import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("playersAI").del();

  await knex("playersAI").insert([
    {
      id: "1",
      name: "Justin",
      color: "red",

    },
    {
      id: "2",
      name: "Ernie",
      color: "black",
    },
    {
        id: "3",
        name: "Joan",
        color: "blue",
    },
    {
        id: "4",
        name: "Diane",
        color: "yellow",
    }
  ]);
}
