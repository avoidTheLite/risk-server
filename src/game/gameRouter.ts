import { Router } from 'express';
import bodyParser from "body-parser";
import { Engagement } from '../common/types'
import game from './gameController';


const gameRouter = Router();
const controller = game();
gameRouter.use(bodyParser.json())

// router.get('/game', controller.get);
gameRouter.post('/new', controller.newGame);
// router.post('game/end', controller.end);


export default gameRouter
