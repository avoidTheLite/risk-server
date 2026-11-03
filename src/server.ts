import http from 'http';
import app from './app';
import config from './config';
import createWebSocketServer from './common/services/webSocket';

// Construct the same listeners for startup and integration tests without opening ports on import.
export function createServers() {
  const server = http.createServer(app);
  const wsServer = http.createServer(app);
  const wss = createWebSocketServer(wsServer);
  return { server, wsServer, wss };
}

export function startServers() {
  const listeners = createServers();
  const port = Number(config.get('serverPort'));
  const socketPort = Number(config.get('socketPort'));

  listeners.server.listen(port, () => {
    console.log('Log level', config.get('logLevel'));
    console.log(`Application listening on ${port} in environment ${config.get('env')}`);
  });
  listeners.wsServer.listen(socketPort, '127.0.0.1', () => {
    console.log(`Socket server started on port ${socketPort}`);
  });
  return listeners;
}

if (require.main === module) {
  startServers();
}
