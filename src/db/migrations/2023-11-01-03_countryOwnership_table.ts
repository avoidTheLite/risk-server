import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("ownership", (table) => {
    table.string("countryId").primary();
    table.string("ownerId");
    table.timestamps(true, true);
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("ownership");
}