import http, { Server } from 'http';
import app from './app';
import config from './config';
import turnStart from './game/services/startTurn';
import WebSocket, {WebSocketServer} from 'ws';

const PORT = config.get('serverPort');
const wsPORT = config.get('socketPort');
const wsServer = http.createServer(app);
const wss = new WebSocketServer({ server: wsServer });

wss.on('connection', (ws) => {
  ws.send('...connected to Risk Server');
  console.log('WebSocket connection opened');
  ws.on('error', console.error);

  ws.on('message', (message) => {
    console.log('received: %s', message);  
  })
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

app.listen(PORT, () => {
    console.log('Log level', config.get('logLevel'));
    console.log(
      `Application listening on ${PORT} in environment ${config.get('env')}`
    );
  });

wsServer.listen(wsPORT, () => {
  console.log(`Socket server started on port ${wsPORT}`);

});
