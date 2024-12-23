import http, { Server } from 'http';
import app from '../../app';
import config from '../../config';
import {WebSocketServer} from 'ws';

const PORT = config.get('serverPort');
const wsPORT = config.get('socketPort');
const wsServer = http.createServer(app);
const wss = new WebSocketServer({ server: wsServer });


wss.on('connection', (ws) => {
  ws.send('...connected to Risk Server');
  console.log('WebSocket connection opened');
  ws.on('error', console.error);

  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());      

      if (parsedMessage.action && parsedMessage.data) {
          
      } else {
          ws.send(JSON.stringify({ error: 'Invalid message format' }));
      }
  } catch (err) {
      ws.send(JSON.stringify({ error: 'Invalid JSON format' }));
  }
  })
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

export default wss