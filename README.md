# Risk-server
Server side risk client

## Getting Started
### Running the application
1. Run `npm install`
2. Run `npm run dev`

### First Time Install
1. Run `npm install`
2. Copy `example.env` to `.env`
3. Update the values in `.env`
4. Start the database: `npm run docker:db`
5. Run migrations: `npm run db:migrate`
6. Seed the database: `npm run db:seed`
7. Start the application: `npm run dev`

```bash
knex migrate:make <migration-name> -x ts --knexfile src/knexfile.ts
```

