import Knex from "knex";
import { default as knexConfig } from "../knexfile"

// Initialize Knex instance for testing
const db = Knex(knexConfig.test);

export default db;