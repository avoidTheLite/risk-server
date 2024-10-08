import {Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('countriesBase', (table) => {
    table.string('id').primary();
    table.string('name')
    table.string('continent')
    table.integer('armies')
    table.jsonb('connectedTo')
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('countriesBase');
}