import http, { Server } from 'http';
import app from './app';
import config from './config';
import turnStart from './game/services/startTurn';
import WebSocket, {WebSocketServer} from 'ws';
import wss from './common/services/webSocket';

const PORT = config.get('serverPort');
const wsPORT = config.get('socketPort');
const wsServer = http.createServer(app);
const wss = new WebSocketServer({ server: wsServer });



app.listen(PORT, () => {
    console.log('Log level', config.get('logLevel'));
    console.log(
      `Application listening on ${PORT} in environment ${config.get('env')}`
    );
  });

wsServer.listen(wsPORT, '127.0.0.1', () => {
  console.log(`Socket server started on port ${wsPORT}`);

});
