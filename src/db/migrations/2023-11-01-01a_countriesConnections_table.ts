import {Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('connections', (table) => {
    table.increments('id');
    table.string('countryId')
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('connections');
}