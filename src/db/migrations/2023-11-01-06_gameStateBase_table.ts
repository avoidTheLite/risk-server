import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("gameState", (table) => {
    table.string("id").primary();
    table.integer('turn');
    table.string("phase");
    table.integer("activePlayerId");
    table.timestamps(true, true);
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("gameState");
}