import { Server } from 'http';
import { WebSocketServer } from 'ws';

export default function createWebSocketServer(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    ws.send('...connected to Risk Server');
    console.log('WebSocket connection opened');
    ws.on('error', console.error);

    ws.on('message', (message) => {
      try {
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.action && parsedMessage.data) {
          // Action dispatch is not implemented yet.
        } else {
          ws.send(JSON.stringify({ error: 'Invalid message format' }));
        }
      } catch (err) {
        ws.send(JSON.stringify({ error: 'Invalid JSON format' }));
      }
    });
    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });

  return wss;
}
