import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("card", (table) => {
    table.increments("id").primary();
    table.string("cardName");
    table.string("cardSymbol");
    table.timestamps(true, true);
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("card");
}