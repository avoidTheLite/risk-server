import app from './app';
import config from './config';
import turnStart from './game/services/startPhaseController';

const PORT = config.get('serverPort');


app.listen(PORT, () => {
    console.log('Log level', config.get('logLevel'));
    console.log(
      `Application listening on ${PORT} in environment ${config.get('env')}`
    );
  });
