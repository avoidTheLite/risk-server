import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("playersAI", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("color");
    table.timestamps(true, true);
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("playersAI");
}