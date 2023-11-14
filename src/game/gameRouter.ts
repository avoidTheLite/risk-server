import { Router } from 'express';
import bodyParser from "body-parser";
import { Engagement } from '../common/types'
import game from './gameController';


const gameRouter = Router();
const controller = game();
gameRouter.use(bodyParser.json())

gameRouter.get('/:id', controller.get);
gameRouter.get('/', controller.list);
gameRouter.post('/new', controller.newGame);
gameRouter.post('/countries', controller.getCountries);
// router.post('game/end', controller.end);


export default gameRouter
