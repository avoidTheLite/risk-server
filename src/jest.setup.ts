import Knex from "knex";
import {default as knexConfig} from "./knexfile";
import config from "./config";
import { beforeAll, beforeEach, afterAll } from "@jest/globals";


const db = Knex(knexConfig.test);

beforeAll(async () => {
    // Run migrations to set up the schema
    await db.migrate.latest();
    console.log("db migrated")
  });
  
  beforeEach(async () => {
    // You can truncate tables or run seeds here before each test
    await db.seed.run();
  });
  
  afterAll(async () => {
    // Destroy the Knex instance to close SQLite connection
    await db.destroy();
  });
  

export default db