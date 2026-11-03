# risk-server

A TypeScript/Express prototype backend for a Risk-style game. PostgreSQL stores game metadata, players, country armies and ownership; Knex manages the schema. A separate WebSocket listener currently handles connection greetings and message-format errors. This is an unfinished local prototype, not a complete multiplayer game.

## What works today

- Create a game with supplied players, randomly assign the seeded countries, and allocate the initial reserve armies using the current fixed 40-army formula.
- Read game metadata, players and countries; list games.
- Deploy armies, resolve a dice-based attack and persist casualties, and advance the active player/turn. The initial deployment phase changes to play when all players' reserve armies reach zero.
- Return command-availability flags based on phase and the supplied player ID. These flags are advisory; they do not enforce authorization on the mutation endpoints.
- Accept WebSocket connections, send a greeting, and report malformed messages. WebSocket gameplay commands and state broadcasts are not implemented.

## Run locally

Use Node.js with npm (Node 24.19.0 is the cleanup validation baseline), PostgreSQL 15, and Docker Compose if using the supplied database container. The lockfile pins dependencies. SQLite is a native test dependency; installation may require native build tools if a prebuilt binary is unavailable.

```sh
npm ci
```

Create `.env` in the repository root; no `example.env` is shipped. These values match the supplied local database container:

```dotenv
NODE_ENV=local
PORT=3001
SOCKET_PORT=8080
LOG_LEVEL=debug
DB_URL=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=risk-server
```

`DB_URL` is a host name, not a connection URL. All values above are the application defaults. Configuration loads `.env` from the working directory and then `../.env`; existing environment values take precedence. The supplied Compose file uses fixed database/user/password values shown above, so changing application credentials alone does not reconfigure that container.

From the repository root:

```sh
npm run docker:db
npm run db:migrate
npm run db:seed
npm run build
npm start
```

The database helper uses the legacy `docker-compose` command. With the newer Compose plugin, use `docker compose up -d` instead. Seeding deletes and replaces the seeded country, ownership and player data; use a disposable development database. `npm run db:rollback` rolls back all migrations.

`npm start` runs the compiled `dist/server.js`. For editing, run `npm run build` once, then `npm run dev` to watch TypeScript and restart the server. HTTP uses `PORT` (default `3001`); WebSockets use a separate HTTP listener bound to `127.0.0.1` at `SOCKET_PORT` (default `8080`). There is no health-check or homepage route. The server does not serve the browser files.

## HTTP API

Send JSON with `Content-Type: application/json` for POST requests. Paths below use the default base URL `http://localhost:3001`.

| Method | Path | Current behavior / input |
| --- | --- | --- |
| GET | `/game` | List game metadata records. |
| POST | `/game/new` | Create and initialize a game; body contains `players`, each with an `id`, `name` and `color`. Returns the new game's initial metadata, including `id`; fetch `/game/:id` for assembled state. |
| GET | `/game/:id` | Read game metadata plus `players` and `country` arrays. |
| GET | `/game/:id/countries` | Read countries and ownership. See the shared-state limitation below. |
| GET | `/game/:id/players` | Read players for the game. |
| GET | `/game/:id/commands` | Read availability flags; currently reads `player` from a JSON request body, even though the method is GET. |
| POST | `/game/:id/commands/deployTroops` | Body: `targetCountry`, `troopCount`. Add armies to the country and subtract from the active player's reserve. |
| POST | `/game/:id/commands/attack` | Body: `attackingCountry`, `defendingCountry`, `troopCount`. Resolve one dice engagement and save losses. |
| POST | `/game/:id/commands/endTurn` | Advance the active player and, during play, increment the turn; no body fields required. |

For example:

```sh
curl -X POST http://localhost:3001/game/new \
  -H 'Content-Type: application/json' \
  -d '{"players":[{"id":"1","name":"Alice","color":"red"},{"id":"2","name":"Bob","color":"blue"}]}'
```

The current implementation assumes sequential player IDs starting at `1` and seeded sequential country IDs. Use the returned game ID in subsequent URLs. A legacy `/command` router also exposes GET `/command` and POST `/command/attack`, `/command/deployTroops`, `/command/endTurn`, but those routes do not provide the game ID that their controllers require. Use the game-scoped routes above.

## WebSocket protocol

Connect to `ws://127.0.0.1:8080` with the default configuration. A new connection receives the plain-text greeting `...connected to Risk Server`.

| Input | Response |
| --- | --- |
| Invalid JSON | `{"error":"Invalid JSON format"}` |
| JSON without truthy `action` and `data` fields | `{"error":"Invalid message format"}` |
| JSON with truthy `action` and `data`, such as `{"action":"example","data":{}}` | Accepted by the format check, but no action, acknowledgement or broadcast follows. |

HTTP game commands do not currently publish WebSocket updates.

## Browser prototype

`src/client/index.html`, `index.js` and `style.css` contain a separate browser experiment. It can request a new game for two to four players, remember its ID in local storage, and manually refresh a text view of state. Its deploy, attack, move and end-turn buttons are placeholders. It has no WebSocket integration, and its HTTP URL is hard-coded to `http://localhost:3001`. Open or serve those files separately; `npm start` only starts the backend.

## Validation

```sh
npm run build
npm test -- --runInBand
```

The build compiles TypeScript into `dist/`. Jest uses an in-memory SQLite database, runs migrations, reseeds before each test and tears down its connections. Tests cover game-state services, country assignment, game initialization, troop deployment, combat and the real server's WebSocket listener. They do not require PostgreSQL or external services. Passing SQLite tests does not establish a working PostgreSQL installation or a complete HTTP gameplay flow.

## Current limits

- Country armies and ownership use shared tables without game-ID filtering. Multiple games are not isolated; creating or modifying one can affect another.
- There is no authentication or player authorization. Mutation handlers do not comprehensively validate phase, ownership, adjacency, troop counts or available reserves. CORS is enabled without an origin restriction. Keep this prototype on a trusted local environment.
- Combat saves casualties but does not complete territory conquest, ownership transfer or occupation movement. Complete Risk rules, victory handling, fortification/movement, card rewards/trading and undo are not implemented. Some command flags/types mention these operations without handlers.
- A reinforcement helper exists but is not wired into the HTTP end-turn flow. AI-named seed data does not implement an AI opponent.
- Error handling and database lifecycle management remain incomplete; some service errors are logged and swallowed, and middleware creates per-request Knex instances without closing them.
- The JavaScript CLI/startup sketches are not supported entry points. No hosted CI workflow or deployment configuration is included, and this cleanup does not verify a live deployment or PostgreSQL/browser end-to-end behavior.
