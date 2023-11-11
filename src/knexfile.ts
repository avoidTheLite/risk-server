import type { Knex } from 'knex';

import { default as cfg } from './config';

// Update with your config settings.
const defaultConnection = {
  database: cfg.get('dbName'),
  user: cfg.get('dbUsername'),
  password: cfg.get('dbPassword'),
  host: cfg.get('dbHost'),
  port: cfg.get('dbPort'),
};

const config: { [key: string]: Knex.Config } = {
  local: {
    debug: true,
    client: 'pg',
    connection: defaultConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  development: {
    client: 'pg',
    connection: defaultConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: defaultConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
  },
};

export default config;
