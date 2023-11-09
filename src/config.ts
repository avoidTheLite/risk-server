import * as dotenv from 'dotenv';
import appConfig from './common/util/appconfig';

dotenv.config();
dotenv.config({ path: '../.env' });

const config = appConfig({
  env: {
    default: 'local',
    env: 'NODE_ENV',
  },
  serverPort: {
    default: 3001,
    env: 'PORT',
  },
  logLevel: {
    default: 'debug',
    env: 'LOG_LEVEL',
  },
  dbHost: {
    env: 'DB_URL',
  },
  dbPort: {
    default: 5433,
    env: 'DB_PORT',
  },
  dbUsername: {
    env: 'DB_USER',
  },
  dbPassword: {
    env: 'DB_PASSWORD',
  },
  dbName: {
    env: 'DB_NAME',
    default: 'oppity',
  },
});

export default config;
